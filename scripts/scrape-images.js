/**
 * scrape-images.js
 *
 * Uses Playwright to find product images from Open Beauty Facts API
 * and Open Beauty Facts website. Dry-run by default — prints results
 * to console without touching Supabase.
 *
 * Usage:
 *   node scripts/scrape-images.js          ← dry run (print only)
 *   node scripts/scrape-images.js --save   ← write image_url to Supabase
 */

import { chromium } from 'playwright'

const SAVE = process.argv.includes('--save')

// All 20 products — id + search terms tuned for best image match
const PRODUCTS = [
  // Baby Care
  { id: '225b1270-1bfc-4bb6-ba0b-797227d5b35c', name: 'Baby Laundry Detergent',       query: 'dreft baby laundry detergent'              },
  { id: '7f35e903-cbeb-4563-bf63-e33eee43134c', name: 'Baby Powder with Talc',         query: 'johnsons baby powder talc'                 },
  { id: '3428b7f2-f7bf-4955-b734-4de047059648', name: 'Baby Wash & Shampoo',           query: "burt's bees baby wash shampoo"             },
  { id: '3932e696-a31d-4982-bd81-7432698aabf6', name: 'Organic Diaper Cream',          query: 'organic diaper cream zinc oxide'           },
  { id: 'cb34f7da-f1ea-4695-b8e4-17a86b00fb90', name: 'Sensitive Baby Wipes',          query: 'water wipes sensitive baby wipes'          },
  // Home Cleaning
  { id: '253301e1-8b7f-4e0c-8094-7741e659ad2c', name: 'All-Purpose Cleaner Concentrate', query: 'branch basics all purpose cleaner concentrate' },
  { id: 'eee6cf62-e471-4262-9cd1-591c50d816c0', name: 'Bathroom Scrub Powder',         query: 'bon ami bathroom scrub powder'             },
  { id: '999a6c45-eeb6-4187-82d3-381cfa39ccf5', name: 'Dish Soap Free & Clear',        query: 'seventh generation dish soap free clear'   },
  { id: '6237df17-ae95-4fd6-b2e3-57a2bf6273b1', name: 'Disinfecting Spray',            query: 'lysol disinfecting spray'                  },
  { id: '94ff30b5-8418-4cb1-8910-f49d0c3886ae', name: 'Glass & Surface Cleaner',       query: 'method glass surface cleaner'              },
  { id: '6292581d-a3c7-4b72-aa6b-5be151bf39ce', name: 'Laundry Detergent Sheets',      query: 'laundry detergent eco sheets package'      },
  // Kitchen
  { id: 'd4d92e48-a764-49ca-98c6-e802cf0de537', name: 'Cast Iron Conditioner',         query: 'cast iron conditioner flaxseed beeswax'    },
  { id: '2f84fd8c-001d-4809-b066-eaf845bdea63', name: 'Compostable Dish Sponge',       query: 'compostable dish sponge cellulose'         },
  { id: '027b93e3-f01c-4f01-82c2-d3a3e534e364', name: 'Non-Stick Cookware Spray',      query: 'pam non stick cooking spray'               },
  // Personal Care
  { id: '08c31693-33f1-40e5-b62d-2f8257a88757', name: 'Charcoal Whitening Toothpaste', query: 'hello activated charcoal whitening toothpaste' },
  { id: 'ce2dbd8b-c6b3-4e42-91f4-44d9dfe164e2', name: 'Dry Shampoo Spray',             query: 'batiste dry shampoo spray'                 },
  { id: '34e32e13-59b3-4c34-834e-2002267af05a', name: 'Mineral Sunscreen SPF 30',      query: 'badger mineral sunscreen spf 30'           },
  { id: 'fdd346b5-d1e9-4d58-ba58-179c708e62e0', name: 'Pure Castile Liquid Soap',      query: 'castile liquid soap bottle dr bronners'    },
  { id: '6ef00544-e9b1-40d0-8d98-596c3b9022e7', name: 'Sensitive Skin Moisturiser',    query: 'cerave moisturising lotion sensitive skin' },
  { id: '75289ef4-399e-4a33-8192-7519aa0f55a8', name: 'Simply Unscented Shampoo',      query: 'free clear simply unscented shampoo'       },
]

// ── Try Open Beauty Facts JSON API first (no browser needed) ──────────────────

async function tryOpenBeautyFacts(query) {
  try {
    const url = `https://world.openbeautyfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(query)}&search_simple=1&action=process&json=1&page_size=1`
    const res  = await fetch(url)
    const json = await res.json()
    const product = json?.products?.[0]
    return product?.image_url || product?.image_front_url || null
  } catch {
    return null
  }
}

// ── Fallback: Bing Image Search (scrape first result) ─────────────────────────

async function tryBingImages(page, query) {
  try {
    await page.goto(
      `https://www.bing.com/images/search?q=${encodeURIComponent(query + ' product')}&form=HDRSC2`,
      { waitUntil: 'domcontentloaded', timeout: 15000 }
    )
    // First thumbnail src on Bing image results
    const src = await page.$eval('img.mimg', el => el.src).catch(() => null)
    return src && src.startsWith('http') ? src : null
  } catch {
    return null
  }
}

// ── Main ──────────────────────────────────────────────────────────────────────

const browser = await chromium.launch({ headless: true })
const context = await browser.newContext({
  userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36'
})
const page = await context.newPage()

const results = []

console.log(`\n🔍 Scraping images for ${PRODUCTS.length} products...\n`)

for (const product of PRODUCTS) {
  process.stdout.write(`  ${product.name.padEnd(35)}`)

  // 1. Try the Open Beauty Facts API (fast, no browser)
  let imageUrl = await tryOpenBeautyFacts(product.query)
  let source   = 'Open Beauty Facts'

  // 2. Fall back to Bing Images
  if (!imageUrl) {
    imageUrl = await tryBingImages(page, product.query)
    source   = 'Bing Images'
  }

  const status = imageUrl ? `✅  ${source}` : '❌  not found'
  console.log(status)

  results.push({ ...product, imageUrl })
}

await browser.close()

// ── Summary ───────────────────────────────────────────────────────────────────

const found   = results.filter(r => r.imageUrl)
const missing = results.filter(r => !r.imageUrl)

console.log(`\n📊 Results: ${found.length}/${PRODUCTS.length} images found\n`)

if (missing.length) {
  console.log('❌ Not found:')
  missing.forEach(r => console.log(`   - ${r.name}`))
  console.log()
}

// ── Save to Supabase (only with --save flag) ──────────────────────────────────

if (SAVE) {
  console.log('💾 Saving to Supabase...')
  const { createClient } = await import('@supabase/supabase-js')
  const supabase = createClient(
    process.env.VITE_SUPABASE_URL,
    process.env.VITE_SUPABASE_ANON_KEY
  )

  for (const r of found) {
    const { error } = await supabase
      .from('products')
      .update({ image_url: r.imageUrl })
      .eq('id', r.id)
    console.log(error ? `  ❌ ${r.name}: ${error.message}` : `  ✅ ${r.name}`)
  }
  console.log('\nDone.')
} else {
  console.log('ℹ️  Dry run — run with --save to write to Supabase.\n')
  console.log('Found URLs:')
  found.forEach(r => console.log(`  ${r.name}:\n    ${r.imageUrl}\n`))
}
