export interface FAQ {
  id: string;
  question: string;
  answer: string; // plain text; **bold** and [link](url) markdown supported
  tags?: string[];
}

export const FAQS: Record<string, FAQ> = {
  'marginal-vs-average-rate': {
    id: 'marginal-vs-average-rate',
    question: "What's the difference between my marginal and average tax rate?",
    answer:
      "Your **marginal rate** is the rate that applies to the next dollar you earn — it's set by whichever federal and provincial bracket the top slice of your income falls into. Your **average rate** is simply total income tax divided by gross income, expressed as a percentage. Canada uses a graduated bracket system, so only the income above each threshold is taxed at the higher rate — not your entire income. For most people, the marginal rate is noticeably higher than the average rate.",
    tags: ['basics', 'rates'],
  },

  'taxable-income-calculation': {
    id: 'taxable-income-calculation',
    question: 'How is taxable income calculated?',
    answer:
      "Taxable income starts with your total income from all sources — employment, self-employment, investments, and other amounts reported on your T4 and other CRA slips. From that you subtract permitted deductions: RRSP contributions, union and professional dues, pension adjustments, child care expenses, and a few others the CRA allows above the line. The result is your net income, which is what federal and provincial tax rates are applied to before non-refundable credits like the basic personal amount further reduce the bill.",
    tags: ['basics', 'income'],
  },

  'basic-personal-amount': {
    id: 'basic-personal-amount',
    question: 'What is the basic personal amount (BPA)?',
    answer:
      "The basic personal amount is a non-refundable tax credit available to every Canadian taxpayer, effectively sheltering a baseline slice of income from tax. For 2026, the federal BPA is $16,452, though it gradually phases down for incomes above roughly $181,440. Each province sets its own BPA on top of the federal one — ranging from about $10,818 in Newfoundland and Labrador to $22,323 in Alberta. Because it works as a credit rather than a deduction, it reduces the tax you owe directly rather than simply lowering the income that gets taxed.",
    tags: ['basics', 'credits'],
  },

  'cpp-cpp2-2026': {
    id: 'cpp-cpp2-2026',
    question: 'How do CPP and CPP2 contributions work in 2026?',
    answer:
      "The Canada Pension Plan (CPP) requires employees to contribute 5.95% on earnings between $3,500 (the basic exemption) and $74,600 (the Year's Maximum Pensionable Earnings) for 2026. CPP2 is a second tier introduced in 2024: a separate 4% contribution applies to earnings between that first ceiling and a second ceiling of $85,000. Employers match both tiers; self-employed individuals pay the full employee-plus-employer share for each. Quebec residents contribute to the Quebec Pension Plan (QPP) instead, which follows similar but distinct rules.",
    tags: ['cpp', 'deductions'],
  },

  'ei-premiums': {
    id: 'ei-premiums',
    question: 'When am I required to pay EI premiums?',
    answer:
      "Most employees pay Employment Insurance (EI) premiums on insurable earnings up to the annual ceiling — $65,700 in 2026 — at a rate of 1.64% for the employee share. Quebec residents pay a lower rate of 1.31% because they contribute separately to the Quebec Parental Insurance Plan (QPIP). Self-employed individuals are generally exempt from EI unless they've voluntarily opted into the program. Once your earnings reach the annual ceiling, no further premiums are deducted for the rest of that calendar year.",
    tags: ['ei', 'deductions'],
  },

  'quebec-tax-system': {
    id: 'quebec-tax-system',
    question: "Why is Quebec's income tax calculated differently?",
    answer:
      "Quebec is the only province that operates its own independent tax administration, handled by Revenu Québec rather than the Canada Revenue Agency. Residents therefore file two separate returns each year: a federal return with the CRA and a provincial return with Revenu Québec. To prevent double-taxation, the federal government applies an abatement that reduces federal income tax owed by Quebec residents by approximately 16.5%. Quebec's top provincial marginal rate of 25.75% is the highest of any province, which pushes its combined marginal rates near the top of the Canadian range.",
    tags: ['quebec', 'provincial'],
  },

  'rrsp-tax-reduction': {
    id: 'rrsp-tax-reduction',
    question: 'How do RRSP contributions reduce my tax?',
    answer:
      "Contributing to a Registered Retirement Savings Plan (RRSP) reduces your net income dollar-for-dollar, directly lowering both federal and provincial income tax for that year. The tax saving depends on your marginal rate — at a 43% combined marginal rate, a $5,000 contribution saves about $2,150 in tax. Contribution room equals 18% of your prior year's earned income up to an annual maximum, plus any unused room carried forward. Growth inside an RRSP is tax-deferred; you pay income tax only when funds are withdrawn, typically in retirement when your marginal rate may be lower.",
    tags: ['rrsp', 'planning'],
  },

  'calculator-vs-cra-bill': {
    id: 'calculator-vs-cra-bill',
    question: "Will the calculator's result match my actual CRA tax bill?",
    answer:
      "This calculator estimates federal and provincial income tax, CPP contributions, and EI premiums using CRA-published 2026 rates — it produces a reliable ballpark for the most common employment income scenario. It does not account for Ontario's provincial surtax, additional non-refundable credits beyond the basic personal amount (medical expenses, charitable donations, the disability tax credit, tuition), dividend tax credits, the capital gains inclusion rate, or the alternative minimum tax. If any of those apply to you, your actual Notice of Assessment may differ materially. Use this tool for planning and year-over-year comparisons, not as a substitute for reviewing your completed T1 return or consulting a tax professional.",
    tags: ['accuracy', 'disclaimer'],
  },
};

export function getFAQs(ids: string[]): FAQ[] {
  return ids.map((id) => {
    const faq = FAQS[id];
    if (!faq) {
      throw new Error(
        `FAQ id "${id}" not found. Check lib/content/faqs.ts for valid IDs: ${Object.keys(FAQS).join(', ')}`
      );
    }
    return faq;
  });
}
