/* ============================================================
   URBANNEST REALTY — Property listings (sample data)
   ⚠️  Replace these 22 sample records with real listings.
   Fields:
     id          unique slug → property.html?id=<id>
     title       listing title
     type        apartment | villa | penthouse | plot | commercial
     purpose     buy | rent
     location    filter key (sector / area) — must match an entry in LOCATIONS below
     locality    display string + Google Maps search query (no API key needed)
     price       number in ₹ (for rent: ₹ per month)
     area        super built-up area in sq ft
     beds/baths  numbers (0 for plots / commercial where not applicable)
     furnishing  text · possession text · featured true/false
     images[4]   assets/images/properties/<id>-1.svg … -4.svg (replace with JPG/WebP, same names)
     amenities[8]· description · agentId (see agents-data.js) · listed (YYYY-MM-DD, used by "Newest" sort)
     floorPlan   image path · floorPlanPdf "" → set to a PDF URL when available
   ============================================================ */
window.LOCATIONS = ["Sector 150", "Sector 137", "Sector 128", "Sector 76", "Sector 62", "Noida Expressway", "Greater Noida West", "Gurgaon", "Ghaziabad"];
window.PROPERTY_TYPES = [
  { id: "apartment",  label: "Apartment",  plural: "Apartments",  blurb: "High-rise homes in gated towers with clubhouses and green decks." },
  { id: "villa",      label: "Villa",      plural: "Villas",      blurb: "Independent and row villas with private gardens and pools." },
  { id: "penthouse",  label: "Penthouse",  plural: "Penthouses",  blurb: "Top-floor duplexes with terraces and uninterrupted skylines." },
  { id: "plot",       label: "Plot",       plural: "Plots",       blurb: "Residential plots in planned sectors and gated townships." },
  { id: "commercial", label: "Commercial", plural: "Commercial",  blurb: "Retail shops, office floors and investment-grade spaces." }
];
const PIMG = (id) => [1, 2, 3, 4].map((n) => `assets/images/properties/${id}-${n}.svg`);
const FP = "assets/images/floor-plans/floor-plan-placeholder.svg";
window.PROPERTIES = [
  { id: "skyline-3bhk-sector-150", title: "Skyline 3 BHK with Golf-Course Views", type: "apartment", purpose: "buy", location: "Sector 150", locality: "Sector 150, Noida", price: 18500000, area: 1850, beds: 3, baths: 3, furnishing: "Semi-furnished", possession: "Ready to move", featured: true, listed: "2026-08-02", agentId: "a1",
    images: PIMG("skyline-3bhk-sector-150"), floorPlan: FP, floorPlanPdf: "",
    amenities: ["Swimming pool", "Clubhouse", "Gymnasium", "24×7 security", "Power backup", "Covered parking", "Children's play area", "Landscaped gardens"],
    description: "A bright, east-facing 3 BHK on a high floor of a low-density tower in Noida's sports-city belt. The living and dining open onto a deep balcony overlooking the golf course, the kitchen is modular with a separate utility, and all three bedrooms are en-suite. Two covered car parks and club membership are included." },
  { id: "corner-4bhk-sector-137", title: "Corner 4 BHK Residence with Study", type: "apartment", purpose: "buy", location: "Sector 137", locality: "Sector 137, Noida", price: 23500000, area: 2450, beds: 4, baths: 4, furnishing: "Unfurnished", possession: "Ready to move", featured: true, listed: "2026-07-20", agentId: "a2",
    images: PIMG("corner-4bhk-sector-137"), floorPlan: FP, floorPlanPdf: "",
    amenities: ["Clubhouse", "Swimming pool", "Tennis court", "Jogging track", "24×7 security", "Power backup", "Piped gas", "High-speed lifts"],
    description: "Three-side-open corner residence in an established Sector 137 society, steps from the Aqua Line metro. Generous 2,450 sq ft layout with a study, servant room and two large balconies. Well-maintained tower with full power backup and a mature clubhouse." },
  { id: "garden-2bhk-sector-76", title: "Garden-facing 2 BHK near Sector 76 Metro", type: "apartment", purpose: "buy", location: "Sector 76", locality: "Sector 76, Noida", price: 9200000, area: 1150, beds: 2, baths: 2, furnishing: "Semi-furnished", possession: "Ready to move", featured: false, listed: "2026-07-28", agentId: "a3",
    images: PIMG("garden-2bhk-sector-76"), floorPlan: FP, floorPlanPdf: "",
    amenities: ["Landscaped gardens", "Gymnasium", "Children's play area", "24×7 security", "Power backup", "Covered parking", "Lift", "Intercom"],
    description: "A low-floor 2 BHK opening onto the society's central green, ideal for a first home. Wardrobes, modular kitchen and ACs stay. Five minutes' walk to Sector 76 metro station and the local market." },
  { id: "expressway-3bhk-study", title: "Expressway-facing 3 BHK + Study", type: "apartment", purpose: "buy", location: "Noida Expressway", locality: "Noida-Greater Noida Expressway, Sector 143, Noida", price: 16200000, area: 1725, beds: 3, baths: 3, furnishing: "Unfurnished", possession: "Possession Dec 2026", featured: false, listed: "2026-08-10", agentId: "a1",
    images: PIMG("expressway-3bhk-study"), floorPlan: FP, floorPlanPdf: "",
    amenities: ["Clubhouse", "Swimming pool", "Gymnasium", "Amphitheatre", "24×7 security", "Power backup", "EV charging", "Rainwater harvesting"],
    description: "Under-construction 3 BHK + study in a new-generation tower on the Expressway with a 70% open layout. Large-format living room, wide balconies and a dedicated study nook. Construction-linked payment plan available; possession expected December 2026." },
  { id: "pool-villa-sector-128", title: "Luxury Villa with Private Pool", type: "villa", purpose: "buy", location: "Sector 128", locality: "Sector 128, Noida", price: 87500000, area: 5400, beds: 5, baths: 6, furnishing: "Furnished", possession: "Ready to move", featured: true, listed: "2026-07-05", agentId: "a4",
    images: PIMG("pool-villa-sector-128"), floorPlan: FP, floorPlanPdf: "",
    amenities: ["Private pool", "Home automation", "Private terrace", "Servant room", "Modular kitchen", "24×7 security", "Power backup", "Covered parking"],
    description: "A fully furnished five-bedroom villa in a gated Expressway enclave, built around a private courtyard pool. Double-height living, a family lounge on the first floor, a roof terrace with a bar counter and staff quarters with a separate entrance. Four-car parking." },
  { id: "duplex-penthouse-sector-150", title: "Duplex Penthouse with Terrace Garden", type: "penthouse", purpose: "buy", location: "Sector 150", locality: "Sector 150, Noida", price: 64000000, area: 4800, beds: 4, baths: 5, furnishing: "Semi-furnished", possession: "Ready to move", featured: true, listed: "2026-08-12", agentId: "a2",
    images: PIMG("duplex-penthouse-sector-150"), floorPlan: FP, floorPlanPdf: "",
    amenities: ["Private terrace", "Clubhouse", "Swimming pool", "Gymnasium", "Home automation", "High-speed lifts", "24×7 security", "Power backup"],
    description: "Top two floors of a premium tower with a 1,200 sq ft private terrace garden and 270° views across the sector's greens. Four en-suite bedrooms, a home theatre room and a double-height living area. Private lift lobby and three parking bays." },
  { id: "plot-sector-150-corner", title: "Corner Residential Plot, 300 sq yd", type: "plot", purpose: "buy", location: "Sector 150", locality: "Sector 150, Noida", price: 32000000, area: 2700, beds: 0, baths: 0, furnishing: "—", possession: "Immediate", featured: false, listed: "2026-06-30", agentId: "a5",
    images: PIMG("plot-sector-150-corner"), floorPlan: FP, floorPlanPdf: "",
    amenities: ["Gated township", "Wide internal roads", "Parks & open spaces", "Underground cabling", "24×7 security", "Water supply", "Sewer connection", "Street lighting"],
    description: "A 300 sq yd (2,700 sq ft) corner plot on a 24 m road inside a planned township, with clear title and possession available immediately. Permitted for stilt + 4 construction. Ideal for an independent home or a builder-floor project." },
  { id: "retail-shop-sector-62", title: "High-Street Retail Shop, Ground Floor", type: "commercial", purpose: "buy", location: "Sector 62", locality: "Sector 62, Noida", price: 14500000, area: 620, beds: 0, baths: 1, furnishing: "Bare shell", possession: "Ready to move", featured: false, listed: "2026-07-15", agentId: "a6",
    images: PIMG("retail-shop-sector-62"), floorPlan: FP, floorPlanPdf: "",
    amenities: ["Road-facing frontage", "Ample visitor parking", "24×7 security", "Power backup", "Fire safety", "Lift access", "CCTV", "Signage space"],
    description: "Ground-floor shop with 18 ft frontage in a high-footfall commercial complex opposite IT offices in Sector 62. Suits F&B, pharmacy or a bank branch. Currently vacant; leasing support available for investors." },
  { id: "office-it-park-sector-62", title: "Furnished Office Space in IT Park", type: "commercial", purpose: "buy", location: "Sector 62", locality: "Sector 62, Noida", price: 29000000, area: 2100, beds: 0, baths: 2, furnishing: "Warm shell", possession: "Ready to move", featured: false, listed: "2026-08-01", agentId: "a6",
    images: PIMG("office-it-park-sector-62"), floorPlan: FP, floorPlanPdf: "",
    amenities: ["Central air-conditioning", "100% power backup", "High-speed lifts", "Cafeteria", "Covered parking", "24×7 security", "Fire safety", "Fibre connectivity"],
    description: "A 2,100 sq ft warm-shell office in a Grade-A IT park with a corporate lobby and basement parking. Column-free floor plate that seats 30–35 workstations plus cabins. Strong rental demand from IT/ITES occupiers." },
  { id: "smart-2bhk-greater-noida-west", title: "Smart 2 BHK near Upcoming Metro", type: "apartment", purpose: "buy", location: "Greater Noida West", locality: "Greater Noida West, Greater Noida", price: 5800000, area: 985, beds: 2, baths: 2, furnishing: "Unfurnished", possession: "Ready to move", featured: true, listed: "2026-08-14", agentId: "a3",
    images: PIMG("smart-2bhk-greater-noida-west"), floorPlan: FP, floorPlanPdf: "",
    amenities: ["Clubhouse", "Swimming pool", "Gymnasium", "Children's play area", "24×7 security", "Power backup", "Covered parking", "Jogging track"],
    description: "Efficient 2 BHK with two balconies in a ready society on the Greater Noida West link road. Vastu-compliant layout, wide internal roads and a clubhouse with pool. Well-suited to young families and rental investors." },
  { id: "premium-3bhk-greater-noida-west", title: "Premium 3 BHK in New Tower", type: "apartment", purpose: "buy", location: "Greater Noida West", locality: "Greater Noida West, Greater Noida", price: 8400000, area: 1390, beds: 3, baths: 2, furnishing: "Unfurnished", possession: "Possession Mar 2027", featured: false, listed: "2026-08-05", agentId: "a3",
    images: PIMG("premium-3bhk-greater-noida-west"), floorPlan: FP, floorPlanPdf: "",
    amenities: ["Clubhouse", "Swimming pool", "Gymnasium", "Indoor games", "24×7 security", "Power backup", "EV charging", "Rainwater harvesting"],
    description: "A 3 BHK in a newly launched phase with a 12-acre central green. Optimised 1,390 sq ft layout with no wasted passage area, premium vitrified flooring and UPVC windows. Subvention and construction-linked plans available." },
  { id: "independent-villa-sector-128", title: "Independent Villa on the Expressway", type: "villa", purpose: "buy", location: "Sector 128", locality: "Sector 128, Noida", price: 56000000, area: 4200, beds: 4, baths: 5, furnishing: "Semi-furnished", possession: "Ready to move", featured: false, listed: "2026-06-12", agentId: "a4",
    images: PIMG("independent-villa-sector-128"), floorPlan: FP, floorPlanPdf: "",
    amenities: ["Private garden", "Servant room", "Modular kitchen", "Clubhouse access", "24×7 security", "Power backup", "Covered parking", "Piped gas"],
    description: "A 4-bedroom independent villa with a south-facing lawn in a low-rise gated community. Ground-floor master suite, a family room on the first floor and a terrace deck. Close to the Expressway and Sector 128's schools and hospitals." },
  { id: "sky-deck-penthouse-sector-137", title: "Penthouse with Sky Deck", type: "penthouse", purpose: "buy", location: "Sector 137", locality: "Sector 137, Noida", price: 41000000, area: 3650, beds: 4, baths: 4, furnishing: "Furnished", possession: "Ready to move", featured: false, listed: "2026-07-09", agentId: "a2",
    images: PIMG("sky-deck-penthouse-sector-137"), floorPlan: FP, floorPlanPdf: "",
    amenities: ["Private terrace", "Clubhouse", "Swimming pool", "Gymnasium", "High-speed lifts", "24×7 security", "Power backup", "Home automation"],
    description: "A fully furnished single-level penthouse with a wraparound sky deck on the 26th floor. Italian marble flooring, a walk-in wardrobe in the master suite and an open kitchen with island. Sold with all furniture and appliances." },
  { id: "4bhk-golf-course-road-gurgaon", title: "4 BHK on Golf Course Road", type: "apartment", purpose: "buy", location: "Gurgaon", locality: "Golf Course Road, Gurugram, Haryana", price: 47500000, area: 3100, beds: 4, baths: 4, furnishing: "Semi-furnished", possession: "Ready to move", featured: false, listed: "2026-07-25", agentId: "a5",
    images: PIMG("4bhk-golf-course-road-gurgaon"), floorPlan: FP, floorPlanPdf: "",
    amenities: ["Clubhouse", "Swimming pool", "Spa & sauna", "Tennis court", "Concierge", "24×7 security", "Power backup", "High-speed lifts"],
    description: "A 3,100 sq ft residence in a premium Golf Course Road condominium with concierge services. Four bedrooms plus staff room, two private balconies and dual parking. Walking distance to the Rapid Metro and Gurgaon's best restaurants." },
  { id: "township-plot-ghaziabad", title: "Plot in Gated Township, 200 sq yd", type: "plot", purpose: "buy", location: "Ghaziabad", locality: "Raj Nagar Extension, Ghaziabad", price: 6800000, area: 1800, beds: 0, baths: 0, furnishing: "—", possession: "Immediate", featured: false, listed: "2026-06-20", agentId: "a5",
    images: PIMG("township-plot-ghaziabad"), floorPlan: FP, floorPlanPdf: "",
    amenities: ["Gated township", "Clubhouse", "Parks & open spaces", "24×7 security", "Water supply", "Sewer connection", "Street lighting", "Wide internal roads"],
    description: "Freehold 200 sq yd plot inside a developed gated township on the Raj Nagar Extension road, with paved roads, parks and an operational clubhouse. Registry-ready with clear title." },
  { id: "furnished-3bhk-rent-sector-137", title: "Fully Furnished 3 BHK for Rent", type: "apartment", purpose: "rent", location: "Sector 137", locality: "Sector 137, Noida", price: 42000, area: 1650, beds: 3, baths: 3, furnishing: "Furnished", possession: "Available now", featured: true, listed: "2026-08-15", agentId: "a1",
    images: PIMG("furnished-3bhk-rent-sector-137"), floorPlan: FP, floorPlanPdf: "",
    amenities: ["Clubhouse", "Swimming pool", "Gymnasium", "24×7 security", "Power backup", "Covered parking", "Piped gas", "Children's play area"],
    description: "Move-in-ready 3 BHK with beds, wardrobes, sofas, dining set, refrigerator, washing machine and ACs in every room. Society has a pool and a gym; metro is a 6-minute walk. Family or working professionals preferred; 2 months' deposit." },
  { id: "2bhk-rent-sector-76", title: "2 BHK for Rent near Metro", type: "apartment", purpose: "rent", location: "Sector 76", locality: "Sector 76, Noida", price: 28000, area: 1050, beds: 2, baths: 2, furnishing: "Semi-furnished", possession: "Available now", featured: false, listed: "2026-08-11", agentId: "a3",
    images: PIMG("2bhk-rent-sector-76"), floorPlan: FP, floorPlanPdf: "",
    amenities: ["Gymnasium", "Children's play area", "24×7 security", "Power backup", "Covered parking", "Lift", "Intercom", "Landscaped gardens"],
    description: "Semi-furnished 2 BHK (modular kitchen, wardrobes, geysers, fans & lights) in a well-run society five minutes from Sector 76 metro. Park-facing balcony, reserved parking. Available immediately." },
  { id: "villa-rent-sector-128", title: "Furnished Villa for Rent", type: "villa", purpose: "rent", location: "Sector 128", locality: "Sector 128, Noida", price: 185000, area: 4200, beds: 4, baths: 5, furnishing: "Furnished", possession: "Available now", featured: false, listed: "2026-07-30", agentId: "a4",
    images: PIMG("villa-rent-sector-128"), floorPlan: FP, floorPlanPdf: "",
    amenities: ["Private garden", "Servant room", "Modular kitchen", "Clubhouse access", "24×7 security", "Power backup", "Covered parking", "Home automation"],
    description: "A tastefully furnished 4-bedroom villa with a private lawn in a gated Expressway community. Suits expat families and senior executives; company lease welcome. Includes staff quarters and two covered parking bays." },
  { id: "office-floor-lease-sector-62", title: "Fitted Office Floor for Lease", type: "commercial", purpose: "rent", location: "Sector 62", locality: "Sector 62, Noida", price: 240000, area: 3200, beds: 0, baths: 2, furnishing: "Fully fitted", possession: "Available Oct 2026", featured: false, listed: "2026-08-08", agentId: "a6",
    images: PIMG("office-floor-lease-sector-62"), floorPlan: FP, floorPlanPdf: "",
    amenities: ["Plug-and-play workstations", "Central air-conditioning", "100% power backup", "Cafeteria", "Covered parking", "24×7 security", "Fire safety", "Fibre connectivity"],
    description: "A plug-and-play 3,200 sq ft office floor with 48 workstations, three cabins, a conference room and pantry, in a Grade-A building in Sector 62's IT corridor. Lock-in and lease terms negotiable; available from October 2026." },
  { id: "studio-rent-noida-expressway", title: "1 BHK Studio for Rent", type: "apartment", purpose: "rent", location: "Noida Expressway", locality: "Sector 143, Noida Expressway, Noida", price: 19500, area: 620, beds: 1, baths: 1, furnishing: "Furnished", possession: "Available now", featured: false, listed: "2026-08-16", agentId: "a1",
    images: PIMG("studio-rent-noida-expressway"), floorPlan: FP, floorPlanPdf: "",
    amenities: ["Clubhouse", "Gymnasium", "Swimming pool", "24×7 security", "Power backup", "Lift", "Housekeeping on request", "Visitor parking"],
    description: "A compact furnished studio with a kitchenette, AC and balcony, ideal for a single professional working along the Expressway. Society has a gym and pool; maintenance included in rent." },
  { id: "penthouse-rent-sector-150", title: "Penthouse for Rent with Terrace", type: "penthouse", purpose: "rent", location: "Sector 150", locality: "Sector 150, Noida", price: 150000, area: 3900, beds: 4, baths: 4, furnishing: "Furnished", possession: "Available now", featured: false, listed: "2026-08-03", agentId: "a2",
    images: PIMG("penthouse-rent-sector-150"), floorPlan: FP, floorPlanPdf: "",
    amenities: ["Private terrace", "Clubhouse", "Swimming pool", "Gymnasium", "High-speed lifts", "24×7 security", "Power backup", "Covered parking"],
    description: "A furnished duplex penthouse with a landscaped terrace in Sector 150's greenest enclave. Four en-suite bedrooms, a home office and a dedicated lift lobby. Company lease preferred; 3 months' deposit." },
  { id: "3bhk-rent-greater-noida-west", title: "3 BHK for Rent in Ready Society", type: "apartment", purpose: "rent", location: "Greater Noida West", locality: "Greater Noida West, Greater Noida", price: 22000, area: 1250, beds: 3, baths: 2, furnishing: "Unfurnished", possession: "Available now", featured: false, listed: "2026-08-13", agentId: "a3",
    images: PIMG("3bhk-rent-greater-noida-west"), floorPlan: FP, floorPlanPdf: "",
    amenities: ["Clubhouse", "Swimming pool", "Gymnasium", "Children's play area", "24×7 security", "Power backup", "Covered parking", "Jogging track"],
    description: "Unfurnished 3 BHK with modular kitchen and wardrobes in a ready, fully occupied society. Park-facing, mid floor, with reserved parking. Schools and a shopping complex within the township." }
];
