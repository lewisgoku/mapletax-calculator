import { describe, it, expect } from 'vitest';
import { FAQS, getFAQs } from './faqs';
import { buildFAQSchema } from '@/components/FAQSchema';

// ---------------------------------------------------------------------------
// FAQS dictionary
// ---------------------------------------------------------------------------

describe('FAQS dictionary', () => {
  it('has no duplicate IDs', () => {
    const ids = Object.keys(FAQS);
    expect(ids.length).toBe(new Set(ids).size);
  });

  it('each FAQ id field matches its dictionary key', () => {
    for (const [key, faq] of Object.entries(FAQS)) {
      expect(faq.id).toBe(key);
    }
  });

  it('every FAQ has a non-empty question and answer', () => {
    for (const faq of Object.values(FAQS)) {
      expect(faq.question.trim().length).toBeGreaterThan(0);
      expect(faq.answer.trim().length).toBeGreaterThan(0);
    }
  });
});

// ---------------------------------------------------------------------------
// getFAQs helper
// ---------------------------------------------------------------------------

const ALL_IDS = Object.keys(FAQS);

describe('getFAQs', () => {
  it('returns an empty array for empty input', () => {
    expect(getFAQs([])).toEqual([]);
  });

  it('returns FAQs in the requested order', () => {
    const ids = ALL_IDS.slice(0, 4);
    const result = getFAQs(ids);
    expect(result.map((f) => f.id)).toEqual(ids);
  });

  it('returns FAQs in a reversed order when asked', () => {
    const reversed = [...ALL_IDS].reverse();
    const result = getFAQs(reversed);
    expect(result.map((f) => f.id)).toEqual(reversed);
  });

  it('returns a single FAQ by id', () => {
    const [firstId] = ALL_IDS;
    const result = getFAQs([firstId]);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(firstId);
  });

  it('throws a descriptive error for an unknown ID', () => {
    expect(() => getFAQs(['nonexistent-faq-id'])).toThrow('nonexistent-faq-id');
  });

  it('throws even when only one ID in a list is unknown', () => {
    const [firstId] = ALL_IDS;
    expect(() => getFAQs([firstId, 'also-bad'])).toThrow('also-bad');
  });

  it('does not throw for all known IDs', () => {
    expect(() => getFAQs(ALL_IDS)).not.toThrow();
  });
});

// ---------------------------------------------------------------------------
// FAQSchema builder — snapshot to catch accidental schema changes
// ---------------------------------------------------------------------------

describe('buildFAQSchema', () => {
  it('produces a valid FAQPage schema structure', () => {
    const faqs = getFAQs(['marginal-vs-average-rate', 'basic-personal-amount']);
    const schema = buildFAQSchema(faqs);

    expect(schema['@context']).toBe('https://schema.org');
    expect(schema['@type']).toBe('FAQPage');
    expect(schema.mainEntity).toHaveLength(2);

    const first = schema.mainEntity[0];
    expect(first['@type']).toBe('Question');
    expect(first.name).toBe(faqs[0].question);
    expect(first.acceptedAnswer['@type']).toBe('Answer');
    expect(typeof first.acceptedAnswer.text).toBe('string');
  });

  it('strips markdown bold markers from answer text in the schema', () => {
    const faqs = getFAQs(['marginal-vs-average-rate']);
    const schema = buildFAQSchema(faqs);
    expect(schema.mainEntity[0].acceptedAnswer.text).not.toContain('**');
  });

  it('matches snapshot', () => {
    const faqs = getFAQs(['marginal-vs-average-rate']);
    expect(buildFAQSchema(faqs)).toMatchSnapshot();
  });
});
