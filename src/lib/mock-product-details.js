/**
 * mock-product-details.js
 *
 * Temporary mock data for ingredients and key concerns per product.
 * Keyed by product UUID from the Supabase products table.
 *
 * Data shape:
 *   key_concerns : string[]   — flagged issues, plain language
 *   ingredients  : { name: string, level: 'clean' | 'caution' | 'avoid' }[]
 *
 * TODO: Replace with real Supabase columns (ingredients jsonb, key_concerns text[])
 *       once data is seeded.
 */

const MOCK = {

  // ── Baby Care ────────────────────────────────────────────────────────────────

  '225b1270-1bfc-4bb6-ba0b-797227d5b35c': { // Baby Laundry Detergent
    key_concerns: ['Synthetic fragrance', 'PEG surfactants', 'Optical brighteners'],
    ingredients: [
      { name: 'Water',                            level: 'clean'   },
      { name: 'Sodium Lauryl Sulfate',            level: 'caution' },
      { name: 'Fragrance (Parfum)',               level: 'avoid'   },
      { name: 'PEG-6 Methyl Ether',               level: 'caution' },
      { name: 'Optical Brighteners',              level: 'caution' },
      { name: 'Sodium Carbonate',                 level: 'clean'   },
      { name: 'Citric Acid',                      level: 'clean'   },
      { name: 'Methylisothiazolinone',            level: 'avoid'   },
    ],
  },

  '7f35e903-cbeb-4563-bf63-e33eee43134c': { // Baby Powder with Talc
    key_concerns: ['Talc (contamination risk)', 'Synthetic fragrance', 'Not recommended for infants'],
    ingredients: [
      { name: 'Talc',                             level: 'avoid'   },
      { name: 'Fragrance (Parfum)',               level: 'avoid'   },
      { name: 'Zinc Oxide',                       level: 'clean'   },
      { name: 'Magnesium Carbonate',              level: 'clean'   },
      { name: 'Triethanolamine',                  level: 'caution' },
    ],
  },

  '3428b7f2-f7bf-4955-b734-4de047059648': { // Baby Wash & Shampoo
    key_concerns: [],
    ingredients: [
      { name: 'Water',                            level: 'clean'   },
      { name: 'Cocamidopropyl Betaine',           level: 'clean'   },
      { name: 'Glycerin',                         level: 'clean'   },
      { name: 'Sodium Lauroyl Methyl Isethionate',level: 'clean'   },
      { name: 'Panthenol (Vitamin B5)',           level: 'clean'   },
      { name: 'Chamomile Extract',                level: 'clean'   },
      { name: 'Citric Acid',                      level: 'clean'   },
      { name: 'Sodium Benzoate',                  level: 'clean'   },
    ],
  },

  '3932e696-a31d-4982-bd81-7432698aabf6': { // Organic Diaper Cream
    key_concerns: [],
    ingredients: [
      { name: 'Zinc Oxide',                       level: 'clean'   },
      { name: 'Shea Butter',                      level: 'clean'   },
      { name: 'Calendula Extract',                level: 'clean'   },
      { name: 'Beeswax',                          level: 'clean'   },
      { name: 'Coconut Oil',                      level: 'clean'   },
      { name: 'Sunflower Seed Oil',               level: 'clean'   },
      { name: 'Tocopherol (Vitamin E)',           level: 'clean'   },
    ],
  },

  'cb34f7da-f1ea-4695-b8e4-17a86b00fb90': { // Sensitive Baby Wipes
    key_concerns: [],
    ingredients: [
      { name: 'Water',                            level: 'clean'   },
      { name: 'Fruit Extract',                    level: 'clean'   },
      { name: 'Citric Acid',                      level: 'clean'   },
      { name: 'Sodium Citrate',                   level: 'clean'   },
    ],
  },

  // ── Home Cleaning ────────────────────────────────────────────────────────────

  '253301e1-8b7f-4e0c-8094-7741e659ad2c': { // All-Purpose Cleaner Concentrate
    key_concerns: [],
    ingredients: [
      { name: 'Water',                            level: 'clean'   },
      { name: 'Decyl Glucoside',                  level: 'clean'   },
      { name: 'Coco-Glucoside',                   level: 'clean'   },
      { name: 'Citric Acid',                      level: 'clean'   },
      { name: 'Lemon Essential Oil',              level: 'clean'   },
      { name: 'Sodium Citrate',                   level: 'clean'   },
    ],
  },

  'eee6cf62-e471-4262-9cd1-591c50d816c0': { // Bathroom Scrub Powder
    key_concerns: ['Oxalic acid (skin irritant)', 'Feldspar (inhalation risk)'],
    ingredients: [
      { name: 'Sodium Bicarbonate',               level: 'clean'   },
      { name: 'Oxalic Acid',                      level: 'caution' },
      { name: 'Feldspar',                         level: 'caution' },
      { name: 'Sodium Carbonate',                 level: 'clean'   },
      { name: 'Tea Tree Essential Oil',           level: 'clean'   },
    ],
  },

  '999a6c45-eeb6-4187-82d3-381cfa39ccf5': { // Dish Soap — Free & Clear
    key_concerns: [],
    ingredients: [
      { name: 'Water',                            level: 'clean'   },
      { name: 'Sodium Lauryl Sulfate',            level: 'clean'   },
      { name: 'Cocamidopropyl Betaine',           level: 'clean'   },
      { name: 'Glycerin',                         level: 'clean'   },
      { name: 'Sodium Chloride',                  level: 'clean'   },
      { name: 'Citric Acid',                      level: 'clean'   },
    ],
  },

  '6237df17-ae95-4fd6-b2e3-57a2bf6273b1': { // Disinfecting Spray
    key_concerns: ['Quaternary ammonium compounds', 'Synthetic fragrance', 'Propellant gases'],
    ingredients: [
      { name: 'Water',                            level: 'clean'   },
      { name: 'Alkyl Dimethyl Benzyl Ammonium Chloride', level: 'avoid' },
      { name: 'Fragrance (Parfum)',               level: 'avoid'   },
      { name: 'Isopropanol',                      level: 'caution' },
      { name: 'Isobutane (Propellant)',           level: 'caution' },
      { name: 'Sodium Hydroxide',                 level: 'clean'   },
    ],
  },

  '94ff30b5-8418-4cb1-8910-f49d0c3886ae': { // Glass & Surface Cleaner
    key_concerns: [],
    ingredients: [
      { name: 'Water',                            level: 'clean'   },
      { name: 'Isopropanol',                      level: 'clean'   },
      { name: 'White Vinegar',                    level: 'clean'   },
      { name: 'Decyl Glucoside',                  level: 'clean'   },
      { name: 'Lavender Essential Oil',           level: 'clean'   },
    ],
  },

  '6292581d-a3c7-4b72-aa6b-5be151bf39ce': { // Laundry Detergent Sheets
    key_concerns: [],
    ingredients: [
      { name: 'Polyvinyl Alcohol (PVA)',          level: 'clean'   },
      { name: 'Sodium Coco-Sulfate',              level: 'clean'   },
      { name: 'Glycerin',                         level: 'clean'   },
      { name: 'Sodium Carbonate',                 level: 'clean'   },
      { name: 'Citric Acid',                      level: 'clean'   },
      { name: 'Lavender Essential Oil',           level: 'clean'   },
    ],
  },

  // ── Kitchen ──────────────────────────────────────────────────────────────────

  'd4d92e48-a764-49ca-98c6-e802cf0de537': { // Cast Iron Conditioner
    key_concerns: [],
    ingredients: [
      { name: 'Organic Flaxseed Oil',             level: 'clean'   },
      { name: 'Beeswax',                          level: 'clean'   },
      { name: 'Carnauba Wax',                     level: 'clean'   },
    ],
  },

  '2f84fd8c-001d-4809-b066-eaf845bdea63': { // Compostable Dish Sponge
    key_concerns: [],
    ingredients: [
      { name: 'Plant-Based Cellulose',            level: 'clean'   },
      { name: 'Loofah Fiber',                     level: 'clean'   },
      { name: 'Natural Binding Agents',           level: 'clean'   },
    ],
  },

  '027b93e3-f01c-4f01-82c2-d3a3e534e364': { // Non-Stick Cookware Spray
    key_concerns: ['Propellant gases', 'Soy lecithin (allergen risk)', 'High-heat PTFE concerns'],
    ingredients: [
      { name: 'Canola Oil',                       level: 'clean'   },
      { name: 'Soy Lecithin',                     level: 'caution' },
      { name: 'Dimethyl Silicone',                level: 'caution' },
      { name: 'Isobutane (Propellant)',           level: 'caution' },
      { name: 'Propane (Propellant)',             level: 'caution' },
    ],
  },

  // ── Personal Care ────────────────────────────────────────────────────────────

  '08c31693-33f1-40e5-b62d-2f8257a88757': { // Charcoal Whitening Toothpaste
    key_concerns: [],
    ingredients: [
      { name: 'Calcium Carbonate',                level: 'clean'   },
      { name: 'Activated Charcoal',               level: 'clean'   },
      { name: 'Coconut Oil',                      level: 'clean'   },
      { name: 'Peppermint Essential Oil',         level: 'clean'   },
      { name: 'Xylitol',                          level: 'clean'   },
      { name: 'Sodium Cocoyl Glutamate',          level: 'clean'   },
      { name: 'Glycerin',                         level: 'clean'   },
    ],
  },

  'ce2dbd8b-c6b3-4e42-91f4-44d9dfe164e2': { // Dry Shampoo Spray
    key_concerns: ['Synthetic fragrance', 'Butane/propane propellants', 'Aluminium starch'],
    ingredients: [
      { name: 'Butane (Propellant)',              level: 'caution' },
      { name: 'Propane (Propellant)',             level: 'caution' },
      { name: 'Aluminium Starch Octenylsuccinate', level: 'caution' },
      { name: 'Fragrance (Parfum)',               level: 'avoid'   },
      { name: 'Rice Starch',                      level: 'clean'   },
      { name: 'Tocopherol (Vitamin E)',           level: 'clean'   },
    ],
  },

  '34e32e13-59b3-4c34-834e-2002267af05a': { // Mineral Sunscreen SPF 30
    key_concerns: [],
    ingredients: [
      { name: 'Zinc Oxide 20%',                   level: 'clean'   },
      { name: 'Jojoba Oil',                       level: 'clean'   },
      { name: 'Shea Butter',                      level: 'clean'   },
      { name: 'Coconut Oil',                      level: 'clean'   },
      { name: 'Vitamin E',                        level: 'clean'   },
      { name: 'Rosehip Seed Oil',                 level: 'clean'   },
      { name: 'Carnauba Wax',                     level: 'clean'   },
      { name: 'Beeswax',                          level: 'clean'   },
    ],
  },

  'fdd346b5-d1e9-4d58-ba58-179c708e62e0': { // Pure Castile Liquid Soap
    key_concerns: [],
    ingredients: [
      { name: 'Water',                            level: 'clean'   },
      { name: 'Organic Coconut Oil',              level: 'clean'   },
      { name: 'Potassium Hydroxide',              level: 'clean'   },
      { name: 'Organic Palm Kernel Oil',          level: 'clean'   },
      { name: 'Organic Olive Oil',                level: 'clean'   },
      { name: 'Organic Hemp Oil',                 level: 'clean'   },
      { name: 'Organic Jojoba Oil',               level: 'clean'   },
      { name: 'Citric Acid',                      level: 'clean'   },
      { name: 'Tocopherol (Vitamin E)',           level: 'clean'   },
    ],
  },

  '6ef00544-e9b1-40d0-8d98-596c3b9022e7': { // Sensitive Skin Moisturiser
    key_concerns: [],
    ingredients: [
      { name: 'Water',                            level: 'clean'   },
      { name: 'Glycerin',                         level: 'clean'   },
      { name: 'Shea Butter',                      level: 'clean'   },
      { name: 'Oat Kernel Extract',               level: 'clean'   },
      { name: 'Ceramide NP',                      level: 'clean'   },
      { name: 'Niacinamide',                      level: 'clean'   },
      { name: 'Allantoin',                        level: 'clean'   },
      { name: 'Xanthan Gum',                      level: 'clean'   },
      { name: 'Sodium Hyaluronate',               level: 'clean'   },
    ],
  },

  '75289ef4-399e-4a33-8192-7519aa0f55a8': { // Simply Unscented Shampoo
    key_concerns: [],
    ingredients: [
      { name: 'Water',                            level: 'clean'   },
      { name: 'Sodium Coco-Sulfate',              level: 'clean'   },
      { name: 'Cocamidopropyl Betaine',           level: 'clean'   },
      { name: 'Glycerin',                         level: 'clean'   },
      { name: 'Panthenol (Vitamin B5)',           level: 'clean'   },
      { name: 'Citric Acid',                      level: 'clean'   },
      { name: 'Sodium Benzoate',                  level: 'clean'   },
    ],
  },

}

/**
 * Returns { key_concerns, ingredients } for a given product ID.
 * Falls back to empty arrays if no mock data exists for the ID.
 */
export function getMockProductDetails(productId) {
  return MOCK[productId] ?? { key_concerns: [], ingredients: [] }
}
