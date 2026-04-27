'use client';

import { useEffect, useState } from 'react';

interface TocEntry {
  id: string;
  label: string;
}

interface Props {
  entries: TocEntry[];
}

export default function TableOfContents({ entries }: Props) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const headings = entries
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (observed) => {
        const visible = observed.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0 },
    );

    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [entries]);

  return (
    <nav aria-label="Page sections" className="space-y-1">
      <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
        On this page
      </p>
      {entries.map(({ id, label }) => {
        const isActive = activeId === id;
        return (
          <a
            key={id}
            href={`#${id}`}
            aria-current={isActive ? 'true' : undefined}
            className={[
              'block rounded px-2 py-1 text-sm transition-colors',
              isActive
                ? 'bg-neutral-100 font-medium text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100'
                : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100',
            ].join(' ')}
          >
            {label}
          </a>
        );
      })}
    </nav>
  );
}
