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

### Session 4 (2026-04-25)
- Built: pay period selector (annual/monthly/biweekly/weekly/daily/hourly) in IncomeTaxCalculator; annualises via PAY_PERIODS factor map
- Built: 2025 tax rates — `lib/rates/2025.ts` with all 13 provinces; `lib/rates/index.ts` with `RATES_BY_YEAR`, `TaxYear`, `SUPPORTED_YEARS`, `DEFAULT_YEAR=2026`
- CORRECTIONS vs task spec: EI 2025 rate is 1.64% (not 1.66% which was 2024); AB 8% bracket was NEW in 2025 (not 2026)
- IncomeTaxCalculator: added `defaultYear` prop; segmented year toggle (2025 / 2026) below H1; year persisted to `mapletax:tax-year` localStorage; H1 and disclaimer use dynamic year; toggle hidden when page passes a specific year
- Created `app/income-tax-calculator-2025/page.tsx` — unique metadata, canonical URL, passes `defaultYear={2025}`
- Added `lib/tax/calculate.2025.test.ts` — 19 tests covering 4 hand-computed scenarios (BC $60k, AB $80k, ON $120k+RRSP, QC $80k self-employed) plus BPA phase-out
- 69 tests pass; `npm run build` clean — both `/income-tax-calculator` and `/income-tax-calculator-2025` generated as static pages
- TODO next session: Tax Filing 2025 sub-pages; province-specific pages for 2025

### Session 5 (2026-04-25)
- Built: per-province pages for all 13 provinces × 2 years (26 total static pages)
- `lib/content/provinces.ts` — `ProvinceContent` interface, 26 content blocks keyed as `'BC-2025'` etc.; `getProvinceContent(code, year)` throws on missing
- `lib/content/faqs.ts` — added 17 province-specific FAQs; `PROVINCE_FAQS` map (all 13 provinces, territories/QC/BC get 2 each); `getProvinceFAQs(code)` helper
- `components/BracketTable.tsx` — semantic `<table>`, `buildBracketRows()` exported for testing, plain English ranges ("First $X", "Over $X to $Y", "Over $X")
- `components/RelatedProvinces.tsx` — hardcoded NEIGHBORS map, 3 cards per province linking to correct year URL
- `components/ProvincePage.tsx` — shared template: breadcrumb, H1, IncomeTaxCalculator, bracket table, 4 prose sections, QC/ON callout boxes, FAQ (province-specific + general), RelatedProvinces, disclaimer
- `app/income-tax-calculator/[province]/page.tsx` — 2026 route: `generateStaticParams`, async `generateMetadata`, per-province canonical URLs
- `app/income-tax-calculator-2025/[province]/page.tsx` — 2025 route: same structure, different year and canonical base
- `app/sitemap.ts` — covers homepage (1.0), two calculator index pages (0.9), 26 province pages (0.8); `export const dynamic = 'force-static'` required for static export
- `lib/content/provinces.test.ts` — 214 pure data tests: 26 blocks exist, required fields non-empty, howItWorks ≥100 words, creditsAndDeductions ≥50 words, province FAQs resolve
- 283 tests pass; `npm run build` clean — 26 province pages + sitemap generated as static HTML
- Spot-checked QC (abatement note, Revenu Québec), AB (8% bracket, no PST), YT (NRD, $11/day) in generated HTML

### Session 6 (2026-04-26)
- Built: full French language support via next-intl 4.9.1
- Architecture: `app/(en)/` route group (English, URLs unchanged) + `app/fr/` directory (French at `/fr/...`); no middleware needed for static export
- `i18n/config.ts` — `locales = ['en', 'fr']`, `defaultLocale = 'en'`, `Locale` type
- `i18n/request.ts` — `getRequestConfig` loading messages from `messages/{locale}.json`
- `next.config.ts` — wrapped with `createNextIntlPlugin`
- `messages/en.json` + `messages/fr.json` — CRA-official French terminology: RPC, AE, REER, Taux marginal, Taux moyen, Salaire net, Revenu annuel brut, cotisations
- `app/(en)/layout.tsx` — `NextIntlClientProvider locale="en"` + ProvinceProvider + Nav + Footer; calls `setRequestLocale('en')`
- `app/fr/layout.tsx` — same pattern with `locale="fr"` and French messages
- `app/layout.tsx` — stripped to minimal html/body/fonts shell (locale-specific content in sub-layouts)
- Moved all English route files from `app/` to `app/(en)/` — URLs unchanged (route group is transparent)
- Created French route files: `app/fr/page.tsx`, `app/fr/income-tax-calculator/`, `app/fr/income-tax-calculator-2025/` with matching `[province]` routes
- `components/IncomeTaxCalculator.tsx` — `useTranslations('Calculator')` replaces all hardcoded labels; PAY_PERIODS built inside component so labels react to locale
- `components/Nav.tsx` — `useTranslations('Nav')` + `useLocale()`; links prefixed with `/fr` for French
- `components/Footer.tsx` — converted to `'use client'`; `useTranslations('Footer')` + `useLocale()`; `t.rich('geoNotice')` renders ipapi.co link
- `components/LanguageToggle.tsx` — real routing via `usePathname` + `useRouter`; toggles between EN/FR counterpart of current page
- `components/ProvincePage.tsx` — accepts `locale` prop; French pages show calculator in French + "coming soon" notice instead of English prose; `getTranslations` for breadcrumb strings
- `components/RelatedProvinces.tsx` — accepts `locale` prop; locale-aware base paths and heading/subtitle
- `app/sitemap.ts` — expanded to include all `/fr/` URLs (52 province pages total + 6 index pages)
- `hreflang` alternates on all 62 pages (en + fr + x-default pointing to English)
- 283 tests pass; `npm run build` clean — 62 static pages generated (26 EN + 26 FR province pages + homepage/calculator index pages in both locales)
- Fix: 8 Nav/Footer links pointed to unbuilt roadmap pages (guides, tax-filing-2025, tax-planning-2026, compare-provinces, whats-new-2026, disclaimer, privacy, terms) — caused 404s
- `components/Placeholder.tsx` — bilingual minimal placeholder: EN "This page does not exist yet." / FR "Cette page n'existe pas encore."; links back to home
- Created 16 placeholder route files (8 routes × 2 locales) under `app/(en)/` and `app/fr/` — each renders `<Placeholder />` or `<Placeholder locale="fr" />`
- Total build: 78 static pages (62 + 16 placeholder pages)

### Session 7 (2026-04-27) 
- Built: SubPageTemplate component (reusable for Sessions 8+)
- Built: /tax-planning-2026 landing with 9-card grid (3 live, 6 "coming soon")
- Built: RRSP, TFSA, FHSA sub-pages with mini-calculators
- Built: lib/registered-accounts/2026.ts + room.ts + tests
- Stubbed: French versions at /fr/tax-planning-2026/* with placeholder
- Updated: nav resolves "Tax Planning 2026" to live page; sitemap includes new URLs
- TODO next session: Tax Filing 2025 landing + sub-pages, reusing SubPageTemplate
- Known issues: [anything you noticed but didn't fix]

### Session 8 (2026-04-28)
- Built: /tax-filing-2025 landing + 7 sub-pages
- Built: lib/filing/deadlines.ts + penalty.ts + tests
- Built: DeadlineStatusBanner (dynamic, date-computed)
- Built: LatePenaltyCalculator component
- Stubbed: French versions at /fr/tax-filing-2025/*
- Updated: nav resolves "Tax Filing 2025" to live page; sitemap updated
- TODO next session: remaining Tax Planning 2026 sub-pages (RESP, Credits, Life Events, Self-Employed, Year-End Checklist, Key Dates)
- Known issues: none

### Session 9 (2026-04-28) [9A + 9B]
- Built: /tax-planning-2026/resp with CESG projection calculator
- Built: /tax-planning-2026/credits-and-deductions (reference page, capital gains editorial disclaimer added)
- Built: /tax-planning-2026/life-events (8 accordion sections, 2026 planning focus)
- Built: /tax-planning-2026/self-employed with quarterly instalment calculator
- Built: /tax-planning-2026/year-end-checklist with interactive checklist (localStorage key mapletax_yearend_2026)
- Built: /tax-planning-2026/key-dates with dynamic timeline component (past dimmed, next highlighted maple-red)
- Built: lib/registered-accounts/resp.ts + lib/tax/instalments.ts + tests (22 new tests)
- Built: CesgCalculator.tsx (age-17 meetsAge17Requirements logic: 0 contributions → false, ≥$2,000 → true, unknown → warning)
- Built: InstalmentCalculator.tsx, YearEndChecklist.tsx, KeyDatesTimeline.tsx
- Updated: /tax-planning-2026 landing — all 9 cards now live
- Stubbed: French versions at /fr/tax-planning-2026/* for all 6 new sub-pages (fixed apostrophe-in-single-quote parse errors)
- Updated: sitemap includes all 12 new URLs (6 EN + 6 FR)
- Updated: /tax-filing-2025/late-filing cross-links to Key Dates 2026
- Tests: 348 pass (10 files); build: 108 static HTML pages clean
- TODO next session: Session 10 — Compare Provinces feature, share-URL functionality, print stylesheet, and deployment checklist for v1 launch
- Known issues: capital gains 2/3 rate legislative status uncertain as of knowledge cutoff — editorial disclaimer added to all mentions

### Session 10 (2026-04-28)
- Built: /income-tax-calculator/compare — side-by-side provincial tax comparison tool
- Built: components/ProvinceCompare.tsx — shareable URL (`?compare=BC,ON&income=80000`), winner callout, ✓ markers on better values, tie-safe neutral rendering, province bracket tables, quick-pick income pills
- Updated: components/IncomeTaxCalculator.tsx — URL param sync (`?province=&income=&rrsp=&deductions=&selfEmployed=`), Share link button in header, `data-input-panel` / `data-output-section` data attributes, "Compare this province →" link below self-employed checkbox
- Bug fix: province localStorage effect now checks `userHasChosenRef.current` so URL params win over saved localStorage province (previously localStorage could clobber a shared link on the main calculator page)
- Updated: Nav.tsx — "Compare provinces" secondary link in desktop nav + mobile sheet; added `compareProvinces` key to en.json and fr.json
- Created: styles/print.css — `@media print` only; hides nav/inputs/buttons/.no-print; shows output sections full width; greyscale-safe stacked bar segments; A4 page setup; imported in app/layout.tsx
- Created: public/robots.txt — `Allow: /` + Sitemap pointer
- Created: public/sitemap.xml — 111 URLs covering all EN pages + FR stubs; hreflang alternates; priorities per spec
- Wired: Plausible Analytics script in app/layout.tsx (`strategy="afterInteractive"`, data-domain="mapletaxcalculator.ca")
- Wired: OG default image metadata in app/layout.tsx (`og-default.png` placeholder — create 1200×630px in Figma/Canva before DNS flip)
- Created: DEPLOYMENT_CHECKLIST.md — 8-section pre-launch checklist (robots/sitemap, Plausible, OG audit, Lighthouse targets, canonical audit, pre-launch checks, DNS/HTTPS, post-launch 48h)
- Tests: 348 pass (10 files); build: 111 static HTML pages clean
- TODO next session: Session 11 — Paycheck Calculator (pay-period selector + gross-up from net)
- Known issues: `public/og-default.png` not yet created — metadata is wired but file must be manually created in Figma/Canva (1200×630px, #FAF8F3 background, #C41E3A accent) before launch

### Minor updates after Session 10 (2026-04-28)
- Fixed: /tax-filing-2025/deadlines-and-penalties — page was missing (404 from Guides card); created full sub-page with deadline table, penalty rules, interest, self-employed extension, who-must-file, and can't-pay sections; build went from 111 → 112 pages
- Updated: all `<a href>` links across content pages, SubPageTemplate breadcrumbs, related-page cards, Guides card grid, landing page breadcrumbs, and ProvincePage breadcrumbs now open with `target="_blank" rel="noopener noreferrer"`; TOC anchor links (#id) excluded (same-page anchors)
- Updated: Footer.tsx — added "Developed and managed by NZM Tech" line below copyright; NZM Tech is a mailto link to tech@nzmgroup.ca
- Created: app/icon.svg — SVG favicon with maple-red (#C41E3A) rounded-square background, MT text in a display area, and a 3-row calculator keypad pattern; Next.js App Router picks this up automatically over the existing favicon.ico fallback
- Build: 113 static HTML pages clean; 348 tests pass (no new logic)

### Session 7 (2026-04-27) Extension
- Layout alignment: all sections in `components/ProvincePage.tsx` changed from `max-w-3xl` to `max-w-5xl` — breadcrumb, H1/intro, bracket table, prose, FAQ, related provinces, and disclaimer footer now align with the calculator's container
- Layout alignment: `app/(en)/page.tsx` and `app/(en)/income-tax-calculator/page.tsx` — FAQ and "Calculators for each province" sections changed from `max-w-3xl` to `max-w-5xl` to match calculator width
- Province grid: "Calculators for each province" changed from `sm:grid-cols-2 md:grid-cols-3` to fixed `grid-cols-2` on both the homepage and `/income-tax-calculator` page
- New tab links: province links in "Calculators for each province" on both homepage and `/income-tax-calculator` page now open with `target="_blank" rel="noopener noreferrer"`
- New tab links: "Compare other provinces" cards in `components/RelatedProvinces.tsx` now open with `target="_blank" rel="noopener noreferrer"`