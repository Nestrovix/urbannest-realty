# Builds the placeholder-image spec files from the data files, then runs the kit generator.
# Usage (from site root):  python3 _build/gen_spec.py
import json, re, os, subprocess
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(ROOT)
props = re.findall(r'\{ id: "([^"]+)", title: "([^"]+)", type: "(\w+)"', open("js/properties-data.js", encoding="utf-8").read())
projects = re.findall(r'\{ id: "([^"]+)", name: "([^"]+)"', open("js/projects-data.js", encoding="utf-8").read())
agents = re.findall(r'\{ id: "(a\d)", name: "[^"]*", role: "([^"]+)"', open("js/agents-data.js", encoding="utf-8").read())

# moods = 3-colour sets derived from the palette (charcoal / gold / warm stone / slate)
DARK_MOODS = {
    "charcoal": ["#2E2E33", "#141416", "#55555C"],
    "gold":     ["#9C7A3C", "#4A3A1A", "#D3B274"],
    "stone":    ["#7F7A71", "#45413B", "#C2BBAE"],
    "slate":    ["#5A5E68", "#26282E", "#9AA0AC"],
    "bronze":   ["#7A6240", "#3A2E1C", "#B8924A"],
}
LIGHT_MOODS = {
    "ivory":    ["#D9D3C7", "#A39D91", "#F6F5F2"],
    "pearl":    ["#CFCBC4", "#8F8B84", "#EDEBE6"],
}
shots = {1: "exterior / facade", 2: "living room", 3: "master bedroom", 4: "kitchen / balcony view"}
type_mood = {"apartment": ["charcoal", "stone", "ivory", "slate"], "villa": ["gold", "stone", "ivory", "bronze"],
             "penthouse": ["slate", "charcoal", "ivory", "gold"], "plot": ["stone", "bronze", "pearl", "slate"],
             "commercial": ["slate", "charcoal", "pearl", "stone"]}
dark, light = [], []
def xml(s): return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
def add(name, w, h, mood, label, sub):
    (light if mood in LIGHT_MOODS else dark).append({"name": name, "w": w, "h": h, "mood": mood, "label": xml(label), "sub": xml(sub)})

# heroes
add("hero-home", 1920, 1080, "charcoal", "HERO — replace: dusk shot of a premium Noida tower skyline / luxury living room", "hero-home.jpg · 1920×1080")
add("hero-properties", 1920, 800, "slate", "PAGE HERO — replace: wide shot of a gated residential society", "hero-properties.jpg · 1920×800")
add("hero-projects", 1920, 800, "gold", "PAGE HERO — replace: new-launch tower render / construction site at sunset", "hero-projects.jpg · 1920×800")
add("hero-about", 1920, 800, "stone", "PAGE HERO — replace: the UrbanNest team in the office", "hero-about.jpg · 1920×800")
add("hero-agents", 1920, 800, "charcoal", "PAGE HERO — replace: consultant walking a client through a site", "hero-agents.jpg · 1920×800")
add("hero-contact", 1920, 800, "slate", "PAGE HERO — replace: UrbanNest office reception / meeting room", "hero-contact.jpg · 1920×800")
add("cta-consult", 1920, 800, "charcoal", "CTA BACKGROUND — replace: handshake / keys handover", "cta-consult.jpg · 1920×800")
# about / office
add("about-office", 1200, 900, "ivory", "ABOUT — replace: office interior with the team", "about-office.jpg · 1200×900")
add("about-site-visit", 900, 1200, "gold", "ABOUT — replace: consultant on a site visit", "about-site-visit.jpg · 900×1200")
add("office-exterior", 1200, 900, "stone", "LOCATION — replace: photo of the office building entrance", "office-exterior.jpg · 1200×900")
# categories
for slug, mood, lab in [("apartments", "charcoal", "high-rise apartment towers"), ("villas", "gold", "villa with garden"), ("penthouses", "slate", "penthouse terrace at dusk"), ("plots", "stone", "plotted township aerial"), ("commercial", "bronze", "office / retail building")]:
    add(f"categories/{slug}", 900, 1100, mood, f"CATEGORY — replace: {lab}", f"categories/{slug}.jpg · 900×1100")
# properties (4 each)
for i, (pid, title, ptype) in enumerate(props):
    moods = type_mood.get(ptype, type_mood["apartment"])
    for n in range(1, 5):
        add(f"properties/{pid}-{n}", 1200, 900, moods[(n - 1 + i) % 4], f"PHOTO {n}/4 — {title} — {shots[n]}", f"properties/{pid}-{n}.jpg · 1200×900")
# projects
pm = ["gold", "slate", "bronze", "ivory", "charcoal", "stone"]
for i, (pid, name) in enumerate(projects):
    add(f"projects/{pid}", 1200, 750, pm[i % len(pm)], f"PROJECT — replace: {name} elevation render", f"projects/{pid}.jpg · 1200×750")
# agents
for i, (aid, role) in enumerate(agents):
    add(f"agents/agent-{i+1}", 800, 1000, ["stone", "slate", "charcoal", "bronze", "stone", "slate"][i], f"PORTRAIT — replace: {role}", f"agents/agent-{i+1}.jpg · 800×1000")

json.dump({"out": "assets/images", "moods": DARK_MOODS, "labelColor": "#F6F5F2", "images": dark}, open("_build/images-dark.json", "w"), indent=0)
json.dump({"out": "assets/images", "moods": LIGHT_MOODS, "labelColor": "#1C1C1E", "images": light}, open("_build/images-light.json", "w"), indent=0)
subprocess.run(["python3", "/home/claude/sites/_kit/gen_images.py", "_build/images-dark.json"], check=True)
subprocess.run(["python3", "/home/claude/sites/_kit/gen_images.py", "_build/images-light.json"], check=True)

# hand-drawn floor-plan placeholder (line drawing, looks intentional)
os.makedirs("assets/images/floor-plans", exist_ok=True)
fp = '''<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1200" viewBox="0 0 1600 1200">
<rect width="1600" height="1200" fill="#F6F5F2"/>
<g fill="none" stroke="#1C1C1E" stroke-width="6" stroke-linejoin="round">
<rect x="220" y="160" width="1160" height="880"/>
<path d="M220 560h520M740 160v400M740 760v280M740 760h640M1040 560v200M1040 160v400M1380 560h-340"/>
<path d="M220 860h520"/>
</g>
<g fill="none" stroke="#B8924A" stroke-width="4"><path d="M560 560a80 80 0 0 1 80 80"/><path d="M640 560v80"/><path d="M1040 640a70 70 0 0 1 70 70"/><path d="M1110 640v70"/><path d="M400 860a70 70 0 0 0 -70 70"/><path d="M330 860v70"/><path d="M900 760a70 70 0 0 0 -70 -70"/><path d="M900 690v70"/></g>
<g font-family="Familjen Grotesk,system-ui,sans-serif" fill="#1C1C1E" font-size="24" font-weight="700" text-anchor="middle">
<text x="480" y="370">LIVING / DINING</text><text x="480" y="410" font-weight="400" fill="#6B6B70">22' × 14'</text>
<text x="890" y="370">MASTER BEDROOM</text><text x="890" y="410" font-weight="400" fill="#6B6B70">16' × 12'</text>
<text x="1210" y="370">BEDROOM 2</text><text x="1210" y="410" font-weight="400" fill="#6B6B70">13' × 11'</text>
<text x="480" y="720">KITCHEN</text><text x="480" y="760" font-weight="400" fill="#6B6B70">12' × 9'</text>
<text x="480" y="960">BALCONY</text>
<text x="890" y="670">BATH</text>
<text x="1210" y="670">BATH</text>
<text x="1060" y="920">BEDROOM 3</text><text x="1060" y="960" font-weight="400" fill="#6B6B70">12' × 11'</text>
</g>
<g font-family="ui-monospace,Menlo,Consolas,monospace" fill="#1C1C1E" opacity=".45" font-size="20"><text x="60" y="1140">FLOOR PLAN PLACEHOLDER — replace with the real floor plan (PNG/JPG 1600×1200) and link the PDF in properties-data.js</text></g>
</svg>'''
open("assets/images/floor-plans/floor-plan-placeholder.svg", "w").write(fp)
print("floor plan written;", len(dark) + len(light) + 1, "images total")
