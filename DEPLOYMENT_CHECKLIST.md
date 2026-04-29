# MapleTax Calculator — Pre-Launch Deployment Checklist

> Living document. Not part of the build output. Update as each item is verified.

---

## 1. robots.txt and sitemap.xml

- [ ] `public/robots.txt` exists and contains `Allow: /` + `Sitemap:` line
- [ ] `public/sitemap.xml` exists and is valid XML
- [ ] After deploy: `curl https://mapletaxcalculator.ca/robots.txt` returns correct content
- [ ] After deploy: `curl https://mapletaxcalculator.ca/sitemap.xml` returns valid XML
- [ ] Validate sitemap at https://www.xml-sitemaps.com/validate-xml-sitemap.html
- [ ] No `<loc>` URL in sitemap returns a 404 (spot-check a sample of ~10 URLs)
- [ ] Submit sitemap to **Google Search Console**: Site > Sitemaps > Add new sitemap URL
- [ ] Submit sitemap to **Bing Webmaster Tools**: Sitemaps > Submit sitemap

---

## 2. Analytics — Plausible

- [ ] Plausible account created at https://plausible.io — add domain `mapletaxcalculator.ca`
- [ ] Script tag present in `app/layout.tsx` with `data-domain="mapletaxcalculator.ca"`
- [ ] After deploy: Open DevTools Network tab, filter `plausible.io` — confirm `script.js` loads (200 OK)
- [ ] Check Plausible dashboard shows live visitors within 60s of first page load
- [ ] No Google Analytics, Meta Pixel, or other third-party scripts present (check Network tab)

---

## 3. Open Graph verification

Check these 5 key pages using View Source (`Ctrl+U`) or the tools below:

| Page | og:title | og:description | og:image | og:url |
|---|---|---|---|---|
| `/` | MapleTax Calculator... | Free Canadian income... | /og-default.png | mapletaxcalculator.ca/ |
| `/income-tax-calculator` | Canadian income tax... | Calculate your 2026... | /og-default.png | .../income-tax-calculator |
| `/income-tax-calculator/compare` | Compare province taxes... | Side-by-side 2026... | /og-default.png | .../compare |
| `/tax-planning-2026` | | | | |
| `/tax-filing-2025` | | | | |

**Tools:**
- Facebook OG Debugger: https://developers.facebook.com/tools/debug/
- Twitter Card Validator: https://cards-dev.twitter.com/validator
- LinkedIn Post Inspector: https://www.linkedin.com/post-inspector/

- [ ] `og-default.png` exists at `public/og-default.png` (1200×630px)
- [ ] OG image URL is absolute (`https://mapletaxcalculator.ca/og-default.png`)
- [ ] All 5 pages pass Facebook OG Debugger with no errors

---

## 4. Lighthouse audit

Target scores: **Performance 95+, Accessibility 100, Best Practices 100, SEO 100**

Run in Chrome DevTools > Lighthouse tab, Mobile preset, no extensions.

| Page | Performance | Accessibility | Best Practices | SEO |
|---|---|---|---|---|
| `/` | | | | |
| `/income-tax-calculator` | | | | |
| `/income-tax-calculator/british-columbia` | | | | |

**Common fixes:**
- Performance < 95: Check LCP (hero image?), unused JS, render-blocking resources
- Accessibility < 100: Missing `<label>` on inputs, low contrast, missing `aria-label`
- SEO < 100: Missing meta description, canonical not set, non-indexable pages

---

## 5. Canonical URL audit

- [ ] No page has a `canonical` pointing to `localhost`, a Cloudflare preview URL, or a staging domain
- [ ] Each English page canonical matches its own URL (not the French version)
- [ ] Each French page has `hreflang` pointing to its English counterpart as `x-default`
- [ ] The compare page canonical is `/income-tax-calculator/compare` (bare path, no query params)

Spot-check method: View Source > search `canonical`.

---

## 6. Final pre-launch checks

### Build and tests
- [ ] `npm run build` passes with zero TypeScript errors
- [ ] `npx vitest run` — all tests pass

### Share URL round-trip
- [ ] Open `/income-tax-calculator`, set income $120,000, province QC, RRSP $10,000
- [ ] Click "Share link" — button shows "Copied!" for ~2 seconds
- [ ] Paste URL in new tab — calculator opens with all values pre-filled
- [ ] URL format: `?province=QC&income=120000&rrsp=10000`

### Compare tool
- [ ] `/income-tax-calculator/compare` loads with BC vs ON at $80,000
- [ ] Changing provinces updates table instantly
- [ ] Quick-pick pills update income and URL
- [ ] URL format: `?compare=BC,ON&income=80000`
- [ ] Same provinces → no winner callout, no ✓ markers

### Dark mode
- [ ] All pages render correctly in dark mode (OS preference or DevTools emulation)
- [ ] No white flash on load in dark mode

### Mobile (375px)
- [ ] No horizontal scroll on any page at 375px width
- [ ] Calculator inputs are usable on mobile
- [ ] Nav mobile sheet opens and closes correctly

### Print
- [ ] `/income-tax-calculator?province=ON&income=90000` → Ctrl+P:
  - Inputs hidden, Share button hidden, compare link hidden
  - Stat cards visible, breakdown card visible, bar chart visible
- [ ] `/income-tax-calculator/compare?compare=BC,ON&income=80000` → Ctrl+P:
  - Controls hidden, comparison table visible, bracket tables visible

### Disclaimer
- [ ] Disclaimer footer present on all calculator pages
- [ ] Disclaimer text mentions current year and "not tax advice"

---

## 7. DNS and HTTPS

- [ ] A record points to Cloudflare Pages IP (or CNAME to `*.pages.dev`)
- [ ] `www.mapletaxcalculator.ca` redirects to `mapletaxcalculator.ca` (301)
- [ ] `http://mapletaxcalculator.ca` redirects to `https://mapletaxcalculator.ca` (301)
- [ ] SSL certificate valid (browser shows lock icon, no mixed-content warnings)
- [ ] HSTS header present (Cloudflare sets this automatically)

---

## 8. Post-launch (48h window)

- [ ] **Search Console**: Use URL Inspection tool on 3 URLs — request indexing if not already queued
- [ ] **Analytics**: Confirm Plausible dashboard shows real-time visitors
- [ ] **`site:` check**: `site:mapletaxcalculator.ca` in Google — may take 24–72h to show results
- [ ] Monitor Cloudflare Pages build logs for any deploy errors
- [ ] Check browser console on live site — zero `console.error` output
