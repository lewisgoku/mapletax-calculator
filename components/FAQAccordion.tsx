import type { FAQ } from '@/lib/content/faqs';

// Server component — uses <details>/<summary> for native keyboard accessibility
// and Tailwind's group-open: variant for CSS-only chevron rotation. No JS needed.

interface Props {
  faqs: FAQ[];
  title?: string;
  headingId?: string;
}

function renderAnswer(text: string): React.ReactNode[] {
  // Render **bold** markdown. Split on bold markers and alternate plain/strong.
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? <strong key={i}>{part}</strong> : part
  );
}

export default function FAQAccordion({
  faqs,
  title = "FAQ's",
  headingId = 'faq-heading',
}: Props) {
  return (
    <section aria-labelledby={headingId}>
      <h2
        id={headingId}
        className="text-2xl font-medium tracking-tight text-neutral-900 dark:text-neutral-100"
      >
        {title}
      </h2>

      <ul className="mt-6 divide-y divide-neutral-200 dark:divide-neutral-800">
        {faqs.map((faq) => (
          <li key={faq.id}>
            <details className="group">
              <summary
                className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-sm font-medium text-neutral-900 hover:text-neutral-600 dark:text-neutral-100 dark:hover:text-neutral-300 [&::-webkit-details-marker]:hidden"
              >
                <span>{faq.question}</span>
                {/* Inline chevron SVG — rotates 180° when details is open */}
                <svg
                  className="h-4 w-4 shrink-0 text-neutral-400 transition-transform duration-200 group-open:rotate-180"
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

              <div className="pb-5 pr-8 text-sm leading-relaxed text-neutral-600 tabular-nums dark:text-neutral-400">
                {renderAnswer(faq.answer)}
              </div>
            </details>
          </li>
        ))}
      </ul>
    </section>
  );
}
