import FAQAccordion from '@/components/FAQAccordion';
import FAQSchema from '@/components/FAQSchema';
import TableOfContents from '@/components/TableOfContents';

export interface SubPageTemplateProps {
  breadcrumbs: { label: string; href: string }[];
  h1: string;
  intro: string;
  tableOfContents: { id: string; label: string }[];
  children: React.ReactNode;
  miniTool?: React.ReactNode;
  commonMistakes: { title: string; body: string }[];
  quickWins: { title: string; body: string }[];
  relatedSubPages: { title: string; description: string; href: string }[];
  faqs: { id: string; question: string; answer: string }[];
  pageMetadata: { title: string; description: string; canonical: string };
}

export default function SubPageTemplate({
  breadcrumbs,
  h1,
  intro,
  tableOfContents,
  children,
  miniTool,
  commonMistakes,
  quickWins,
  relatedSubPages,
  faqs,
}: SubPageTemplateProps) {
  return (
    <main>
      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="mx-auto max-w-[1200px] px-6 pt-6 pb-2 text-sm text-neutral-500 dark:text-neutral-400"
      >
        <ol
          className="flex flex-wrap items-center gap-1"
          itemScope
          itemType="https://schema.org/BreadcrumbList"
        >
          {breadcrumbs.map((crumb, i) => (
            <li
              key={crumb.href}
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
              className="flex items-center gap-1"
            >
              {i > 0 && <span aria-hidden="true">/</span>}
              {i < breadcrumbs.length - 1 ? (
                <a
                  href={crumb.href}
                  itemProp="item"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-neutral-700 dark:hover:text-neutral-200"
                >
                  <span itemProp="name">{crumb.label}</span>
                </a>
              ) : (
                <span
                  aria-current="page"
                  itemProp="name"
                  className="text-neutral-900 dark:text-neutral-100"
                >
                  {crumb.label}
                </span>
              )}
              <meta itemProp="position" content={String(i + 1)} />
            </li>
          ))}
        </ol>
      </nav>

      {/* Two-column layout wrapper */}
      <div className="mx-auto max-w-[1200px] px-6 py-6 lg:grid lg:grid-cols-[240px_1fr] lg:gap-12">
        {/* Left: sticky TOC (desktop only) */}
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <TableOfContents entries={tableOfContents} />
          </div>
        </aside>

        {/* Right: main content */}
        <div className="min-w-0">
          {/* H1 + intro */}
          <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
            {h1}
          </h1>
          <div className="mt-4 space-y-3 text-neutral-700 dark:text-neutral-300 leading-relaxed">
            {intro.split('\n\n').map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          {/* Mobile TOC — collapsible */}
          <details className="lg:hidden mt-6 rounded-2xl border border-neutral-200 dark:border-neutral-800">
            <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-sm font-medium text-neutral-900 dark:text-neutral-100 [&::-webkit-details-marker]:hidden">
              <span>On this page</span>
              <svg
                className="h-4 w-4 text-neutral-400 transition-transform duration-200 group-open:rotate-180"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M4 6l4 4 4-4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </summary>
            <nav className="px-4 pb-4 pt-1 space-y-1" aria-label="Page sections">
              {tableOfContents.map(({ id, label }) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className="block py-1 text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
                >
                  {label}
                </a>
              ))}
            </nav>
          </details>

          {/* Optional mini-tool */}
          {miniTool && (
            <div className="mt-8 rounded-2xl border border-neutral-200 bg-neutral-50 px-6 py-6 dark:border-neutral-800 dark:bg-neutral-900">
              {miniTool}
            </div>
          )}

          {/* Prose sections */}
          <div className="mt-8 space-y-10">{children}</div>

          {/* Common Mistakes */}
          {commonMistakes.length > 0 && (
            <section className="mt-10" aria-labelledby="common-mistakes-heading">
              <h2
                id="common-mistakes-heading"
                className="text-xl font-medium text-neutral-900 dark:text-neutral-100"
              >
                Common mistakes
              </h2>
              <div className="mt-4 space-y-4">
                {commonMistakes.map((item, i) => (
                  <div
                    key={i}
                    role="note"
                    aria-label={`Common mistake: ${item.title}`}
                    className="border-l-4 border-red-500 pl-4 dark:border-red-600"
                  >
                    <p className="text-xs font-semibold uppercase tracking-widest text-red-600 dark:text-red-400">
                      Mistake
                    </p>
                    <p className="mt-1 text-sm font-medium text-neutral-900 dark:text-neutral-100">
                      {item.title}
                    </p>
                    <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Quick Wins */}
          {quickWins.length > 0 && (
            <section className="mt-10" aria-labelledby="quick-wins-heading">
              <h2
                id="quick-wins-heading"
                className="text-xl font-medium text-neutral-900 dark:text-neutral-100"
              >
                Quick wins
              </h2>
              <div className="mt-4 space-y-4">
                {quickWins.map((item, i) => (
                  <div
                    key={i}
                    role="note"
                    aria-label={`Quick win: ${item.title}`}
                    className="border-l-4 border-emerald-500 pl-4 dark:border-emerald-600"
                  >
                    <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                      Quick win
                    </p>
                    <p className="mt-1 text-sm font-medium text-neutral-900 dark:text-neutral-100">
                      {item.title}
                    </p>
                    <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      {item.body}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* FAQ */}
          {faqs.length > 0 && (
            <div className="mt-10">
              <FAQSchema faqs={faqs} />
              <FAQAccordion faqs={faqs} />
            </div>
          )}

          {/* Related sub-pages */}
          {relatedSubPages.length > 0 && (
            <section className="mt-10" aria-labelledby="related-heading">
              <h2
                id="related-heading"
                className="text-xl font-medium text-neutral-900 dark:text-neutral-100"
              >
                Related topics
              </h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                {relatedSubPages.map((page) => (
                  <a
                    key={page.href}
                    href={page.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col justify-between rounded-2xl border border-neutral-200 bg-white px-5 py-4 transition-colors hover:border-neutral-400 dark:border-neutral-800 dark:bg-neutral-950 dark:hover:border-neutral-600"
                  >
                    <div>
                      <p className="font-medium text-neutral-900 dark:text-neutral-100">
                        {page.title}
                      </p>
                      <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                        {page.description}
                      </p>
                    </div>
                    <svg
                      className="mt-3 h-4 w-4 text-neutral-400 transition-transform group-hover:translate-x-0.5 dark:text-neutral-500"
                      viewBox="0 0 16 16"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M3 8h10M9 4l4 4-4 4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                ))}
              </div>
            </section>
          )}

          {/* Disclaimer */}
          <footer className="mt-10 border-t border-neutral-200 pt-6 dark:border-neutral-800">
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Estimates based on 2026 CRA-published rates. Your actual tax may differ based on
              additional deductions and credits. Not tax advice — consult a professional before
              making financial decisions.
            </p>
          </footer>
        </div>
      </div>

      {/* BreadcrumbList JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: breadcrumbs.map((crumb, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              name: crumb.label,
              item: crumb.href.startsWith('http')
                ? crumb.href
                : `https://mapletaxcalculator.ca${crumb.href}`,
            })),
          }).replace(/</g, '\\u003c'),
        }}
      />
    </main>
  );
}
