// Close-up screenshots for visual review: node _build/shoot.js <port> <page> <selector-or-y> <out> [width]
const { chromium } = require('/home/claude/webcloudnest/node_modules/playwright');
const http = require('http'), fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '..'); const PORT = +(process.argv[2] || 4205);
const MIME = { '.html':'text/html', '.css':'text/css', '.svg':'image/svg+xml', '.woff2':'font/woff2', '.png':'image/png', '.js':'text/javascript' };
const server = http.createServer((req, res) => { let p = decodeURIComponent(req.url.split('?')[0]); if (p === '/') p = '/index.html'; const f = path.join(ROOT, p); if (fs.existsSync(f) && fs.statSync(f).isFile()) { res.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'application/octet-stream' }); fs.createReadStream(f).pipe(res); } else { res.writeHead(404); res.end(); } }).listen(PORT);
const jobs = JSON.parse(process.argv[3]); // [{url, sel|y, out, w, h, full, actions:[['click',sel],['wait',ms],['fill',sel,val],['select',sel,val]]}]
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  for (const j of jobs) {
    const p = await b.newPage({ viewport: { width: j.w || 1440, height: j.h || 900 } });
    await p.addInitScript(() => { window.open = () => null; });
    await p.goto(`http://localhost:${PORT}/${j.url}`, { waitUntil: 'networkidle' }); await p.waitForTimeout(300);
    await p.evaluate(() => { document.documentElement.style.scrollBehavior = 'auto'; document.querySelectorAll('.reveal').forEach((e) => e.classList.add('in')); });
    for (const a of (j.actions || [])) { if (a[0] === 'click') await p.click(a[1]); if (a[0] === 'wait') await p.waitForTimeout(a[1]); if (a[0] === 'fill') await p.fill(a[1], a[2]); if (a[0] === 'select') await p.selectOption(a[1], a[2]); if (a[0] === 'press') await p.keyboard.press(a[1]); if (a[0] === 'scroll') await p.evaluate((y) => scrollTo(0, y), a[1]); }
    if (j.sel) { await p.evaluate((s) => { document.querySelector(s).scrollIntoView({ block: 'start' }); window.scrollBy(0, -80); }, j.sel); await p.waitForTimeout(500); }
    else if (j.y !== undefined) { await p.evaluate((y) => scrollTo(0, y), j.y); await p.waitForTimeout(400); }
    await p.screenshot({ path: path.join(ROOT, '_build/shots', j.out), fullPage: !!j.full });
    await p.close(); console.log('shot', j.out);
  }
  await b.close(); server.close();
})();
