// Renders assets/og-image.png (1200×630) from _build/og.html over http so self-hosted fonts load.
const { chromium } = require('/home/claude/webcloudnest/node_modules/playwright');
const http = require('http'), fs = require('fs'), path = require('path');
const ROOT = path.resolve(__dirname, '..'); const PORT = +(process.argv[2] || 4205);
const MIME = { '.html':'text/html', '.css':'text/css', '.svg':'image/svg+xml', '.woff2':'font/woff2', '.png':'image/png', '.js':'text/javascript' };
const server = http.createServer((req, res) => { const f = path.join(ROOT, decodeURIComponent(req.url.split('?')[0])); if (fs.existsSync(f) && fs.statSync(f).isFile()) { res.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'application/octet-stream' }); fs.createReadStream(f).pipe(res); } else { res.writeHead(404); res.end(); } }).listen(PORT);
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  const p = await b.newPage({ viewport: { width: 1200, height: 630 } });
  await p.goto(`http://localhost:${PORT}/_build/og.html`, { waitUntil: 'networkidle' }); await p.waitForTimeout(400);
  await p.screenshot({ path: path.join(ROOT, 'assets', 'og-image.png') });
  await b.close(); server.close(); console.log('og-image.png written');
})();
