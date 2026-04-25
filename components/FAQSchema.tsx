import type { FAQ } from '@/lib/content/faqs';

interface SchemaAnswer {
  '@type': 'Answer';
  text: string;
}

interface SchemaQuestion {
  '@type': 'Question';
  name: string;
  acceptedAnswer: SchemaAnswer;
}

interface FAQPageSchema {
  '@context': 'https://schema.org';
  '@type': 'FAQPage';
  mainEntity: SchemaQuestion[];
}

function stripMarkdown(text: string): string {
  return text.replace(/\*\*(.+?)\*\*/g, '$1').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
}

export function buildFAQSchema(faqs: FAQ[]): FAQPageSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: stripMarkdown(faq.answer),
      },
    })),
  };
}

interface Props {
  faqs: FAQ[];
}

export default function FAQSchema({ faqs }: Props) {
  const schema = buildFAQSchema(faqs);
  // Escape '</script>' sequences that would break the inline script tag
  const json = JSON.stringify(schema).replace(/</g, '\\u003c');
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
  );
}
