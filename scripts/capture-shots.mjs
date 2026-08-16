/**
 * Captures a viewport screenshot of each owned project's live site into
 * public/images/projects/.
 *
 *   node scripts/capture-shots.mjs
 *
 * Re-run whenever a project's design changes. Slugs must match
 * lib/content/projects.ts so <ProjectsSection/> can resolve the image.
 */
import { chromium } from "playwright"
import { mkdir } from "node:fs/promises"
import path from "node:path"

const OUT = path.join(process.cwd(), "public", "images", "projects")

// Production domains — not the Vercel preview URLs, which drift or expire.
const TARGETS = [
  { slug: "dinely", url: "https://www.dinely.co.uk" },
  { slug: "ielts-grader", url: "https://ieltsgrader.com" },
  { slug: "carmazium", url: "https://carmazium.com" },
  { slug: "finacc", url: "https://finaccsolutions.com" },
  { slug: "whisperoo", url: "https://whisperoo.app" },
  { slug: "overlap", url: "https://overlap-gules.vercel.app" },
]

const run = async () => {
  await mkdir(OUT, { recursive: true })

  const browser = await chromium.launch()
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
    // Sites built with scroll animations hide content until motion runs.
    // Asking for reduced motion makes them paint their final state.
    reducedMotion: "reduce",
  })

  for (const { slug, url } of TARGETS) {
    const page = await ctx.newPage()
    try {
      // `networkidle` never settles on sites with polling or live analytics,
      // so wait for the document and give the page time to paint instead.
      await page.goto(url, { waitUntil: "domcontentloaded", timeout: 45_000 })
      await page
        .waitForLoadState("load", { timeout: 20_000 })
        .catch(() => {})
      // Let fonts settle and any entrance state resolve.
      await page.waitForTimeout(2500)

      // Hide consent banners and marketing interstitials rather than clicking
      // through them — a screenshot shouldn't involve agreeing to anything on
      // anyone's behalf, and a promo modal isn't the product.
      await page.addStyleTag({
        content: `[class*="cookie" i],[id*="cookie" i],[class*="consent" i],
                  [id*="consent" i],[class*="gdpr" i],[aria-label*="cookie" i],
                  [role="dialog"],[aria-modal="true"],
                  [class*="popup" i],[id*="popup" i],
                  [class*="modal" i],[id*="modal" i],
                  [class*="newsletter" i],[class*="subscribe" i],
                  [class*="promo" i],[class*="interstitial" i]
                  { display: none !important; }
                  html, body { overflow: visible !important; }`,
      })
      await page.waitForTimeout(400)
      const file = path.join(OUT, `${slug}.png`)
      await page.screenshot({ path: file })
      console.log(`ok   ${slug}  ->  ${path.relative(process.cwd(), file)}`)
    } catch (err) {
      console.error(`FAIL ${slug}  ${err.message}`)
    } finally {
      await page.close()
    }
  }

  await browser.close()
}

run()
