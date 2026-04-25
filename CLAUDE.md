@AGENTS.md
# MapleTax Calculator

Canadian personal finance calculator at mapletaxcalculator.ca.
Bilingual (EN/FR), multi-year (2025/2026), no sign-up, no backend.

## Stack

- Next.js 14+ App Router with TypeScript
- Tailwind CSS for styling
- Static export (`output: 'export'` in next.config.js)
- Deployed to Cloudflare Pages
- Plausible or Cloudflare Web Analytics (no cookie banner needed)
- next-intl for EN/FR routing
- Vitest for tests

## Architecture

- All tax calculations run in the browser. No API routes for tax math.
- Rates live in `lib/rates/[year].ts` — one file per tax year. Never modify
  past-year files; fork forward instead.
- Calculation engine in `lib/tax/calculate.ts` — pure functions, no React,
  no framework dependencies. Runs in tests, on server, in browser.
- Tests in `lib/tax/calculate.test.ts` are the moat. Must pass before any
  rate change ships. Run with `npx vitest run`.
- Province pages generated programmatically via `app/income-tax-calculator/[province]/page.tsx`
  with `generateStaticParams` returning all 13 province slugs.

## Routing

English (default):
- `/` — homepage
- `/income-tax-calculator` — 2026 calculator
- `/income-tax-calculator-2025` — 2025 calculator
- `/income-tax-calculator/[province]` — 13 per-province pages
- `/tax-filing-2025` — landing + sub-pages
- `/tax-planning-2026` — landing + sub-pages
- `/compare-provinces` — comparison tool
- `/whats-new-2026` — what changed
- `/guides` — content hub

French mirrors all of above under `/fr/...`.

## Geolocation

- User's province defaults via client-side IP geolocation after page load.
- Uses a free, privacy-respecting IP API. Falls back to BC if API fails.
- Cache the result in `localStorage` so repeat visitors don't re-fetch.
- Acceptable to show BC briefly (~200ms) before geolocation resolves.
- Future upgrade: move to Cloudflare Edge Middleware for instant detection
  via `cf-ipcountry` / `cf-region` request headers.

## Internationalization

- next-intl with `/fr/` URL prefix
- Translation files in `messages/en.json` and `messages/fr.json`
- Starting with machine translation, then human editing for tax-specific
  terminology. French Canadian conventions: "revenu imposable",
  "régime enregistré", "cotisation REER", etc.
- Currency formatting per locale: `Intl.NumberFormat('en-CA', ...)` produces
  "$75,000", `Intl.NumberFormat('fr-CA', ...)` produces "75 000 $"
- `hreflang` tags on every page pointing to its EN/FR counterpart

## Conventions

- Currency: `Intl.NumberFormat(locale, { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 })`
- Never round intermediate calculations
- Always use `font-variant-numeric: tabular-nums` (Tailwind: `tabular-nums`) on currency displays
- Every form input needs an associated `<label>`
- Dark mode required for every component (use Tailwind `dark:` variants)
- Province pages, sub-pages, and language variants must each have unique
  `<title>`, meta description, and canonical URL
- Add FAQPage schema.org JSON-LD wherever there's a FAQ accordion
- Bar charts and visual elements need `role="img"` and descriptive `aria-label`

## Brand

- Background: #FAF8F3 light, #0F0F0F dark
- Primary text: #1A1A1A light, #F5F5F0 dark
- Maple red accent: #C41E3A (primary CTAs only — sparingly)
- Positive amounts (take-home): #059669 emerald
- Data viz: #2563EB federal, #4F46E5 provincial, #D97706 CPP, #E11D48 EI
- Typography: Inter or Geist sans-serif
- Card corners: 16px (Tailwind `rounded-2xl`)
- Borders: 1px hairline, no shadows beyond this

## What NOT to do

- No sign-in, no email capture, no newsletter modals, no exit popups
- No stock photos, AI illustrations, decorative icons, or emoji in content
- No gradients, 3D effects, glassmorphism, neumorphism, neon glows
- No USD currency or American tax terminology anywhere
- No chatbot or live-chat widget
- No autoplay anything
- Do not round intermediate calculations
- Do not require a "Calculate" button — outputs update as user types
- Functional icons only: dropdown chevrons, close X, checkmarks. Nothing else.

## Roadmap

1. ✅ Income tax calculator 2026 + 13 province pages (existing files)
2. Layout shell, nav with provinces dropdown, FAQ component, geolocation
3. 2025 rates + year toggle + Tax Filing 2025 sub-pages
4. Tax Planning 2026 sub-pages (RRSP, TFSA, FHSA first)
5. French translation (machine-translated, then edited)
6. Compare provinces tool, print/PDF export, share-URL feature

## Disclaimer (required on every calculator page)

> Estimates based on [year] CRA-published rates. Your actual tax may differ
> based on additional deductions and credits. Not tax advice — consult a
> professional before making financial decisions.

## When updating rates each November

1. Copy `lib/rates/[current].ts` to `lib/rates/[next].ts`
2. Update brackets, BPAs, CPP/EI ceilings, and rates with verified CRA numbers
3. Run `npx vitest run` — fix tests by updating expected values, not by
   weakening assertions
4. Add new year option to year toggle
5. Update default year on calculator pages
6. Keep prior-year pages live for late filers and historical reference

## Session log

### Session 1 (2026-04-24)
- Built: layout shell, Nav, ProvincesDropdown, Footer, LanguageToggle (stubbed)
- ProvinceContext wired up, IncomeTaxCalculator reads from it
- Mobile nav sheet works

### Session 2 (2026-04-24)
- Built: client-side geolocation via ipapi.co (`hooks/useGeoProvince.ts`)
- `resolveGeoProvince` (pure async fn), `readGeoCache`/`writeGeoCache` (localStorage TTL 30d), `mapIpapiResponse` all exported for testing
- `GeoProvinceInit` component mounted in root layout; updates ProvinceContext once on first load, skipping if `mapletax:user-province` is set
- ProvinceContext extended with `geoSource` / `setGeoSource`
- IncomeTaxCalculator: user province choice persisted to `mapletax:user-province`, overrides geo; "Detected: [Province]" hint fades after 3s on first geo visit
- Footer: ipapi.co privacy note added
- `vitest.config.ts` added with `@/` alias for test resolution
- All 37 tests pass; `npm run build` clean

### Session 3 (2026-04-24)
- Built: FAQ system — `lib/content/faqs.ts` (typed `FAQ` interface, `FAQS` dict, `getFAQs` helper that throws on unknown ID)
- 8 starter FAQs for the income tax calculator covering marginal/average rates, taxable income, BPA, CPP/CPP2, EI, Quebec, RRSP, and calculator accuracy
- `components/FAQAccordion.tsx` — server component using `<details>`/`<summary>` for native a11y; CSS-only chevron via Tailwind `group-open:rotate-180`; `**bold**` markdown rendered inline
- `components/FAQSchema.tsx` — server component rendering FAQPage JSON-LD; exports `buildFAQSchema` (pure fn) for testing; `<` escaped to `<` to prevent script injection
- FAQ section added to `app/income-tax-calculator/page.tsx` — schema rendered into static HTML, verified in `out/income-tax-calculator/index.html`
- Extension point: province pages should pass `getFAQs([...GENERAL_IDS, ...provinceSpecificIds])` to both components
- 50 tests pass (1 snapshot written); `npm run build` clean
- TODO next session: 2025 rates + year toggle + Tax Filing 2025 sub-pages