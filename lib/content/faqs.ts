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

  // ── Province-specific FAQs ────────────────────────────────────────────────

  'bc-catc-cancelled': {
    id: 'bc-catc-cancelled',
    question: 'What happened to the BC Climate Action Tax Credit?',
    answer:
      "The BC Climate Action Tax Credit (CATC) was a quarterly refundable credit that offset the impact of the provincial carbon price on low- and moderate-income households. The federal government eliminated the consumer carbon pricing system in April 2025, and the CATC was cancelled at the same time. BC residents no longer receive this credit. The BC government has not introduced a direct replacement, though revenue from the industrial carbon pricing system remains in place.",
    tags: ['bc', 'credits', '2025'],
  },

  'bc-2026-changes': {
    id: 'bc-2026-changes',
    question: 'What changed in BC income tax for 2026?',
    answer:
      "BC made two notable changes for 2026. First, the bottom provincial tax rate increased from 5.06% to 5.60% — a meaningful jump that raises the effective rate on the first roughly $47,000 of income. Second, the provincial basic personal amount rose significantly from $11,981 to $13,216, partially offsetting the rate increase at lower incomes. BC also announced it is pausing bracket indexation for 2027 through 2030, so bracket thresholds will stay fixed rather than rising with inflation during that period.",
    tags: ['bc', '2026'],
  },

  'ab-no-pst': {
    id: 'ab-no-pst',
    question: "Why doesn't Alberta have a provincial sales tax?",
    answer:
      "Alberta is the only Canadian province without a provincial sales tax (PST) or a harmonized sales tax (HST). Residents and businesses pay only the federal 5% GST on most goods and services. Alberta's government has historically relied on resource royalties — particularly from oil and gas production — to fund public services, which reduced the need for a broad consumption tax. While that resource revenue is cyclical, there has been no serious legislative movement toward introducing a PST, making Alberta's tax structure uniquely light on consumption taxes within Canada.",
    tags: ['ab', 'sales-tax'],
  },

  'on-surtax': {
    id: 'on-surtax',
    question: "What is Ontario's provincial surtax and why isn't it in this calculator?",
    answer:
      "Ontario levies a surtax on top of its regular provincial income tax — a percentage charged on the provincial tax itself once it exceeds certain thresholds. For 2026, a 20% surtax applies when Ontario tax exceeds roughly $5,710, and a further 36% applies above roughly $7,307. In practice, this pushes the effective top provincial rate higher than the published bracket rates suggest. This calculator applies Ontario's published marginal brackets but does not model the surtax, which means take-home pay estimates for higher incomes will be slightly optimistic. Residents with Ontario tax near or above those thresholds should use the CRA's My Account or tax software for an accurate figure.",
    tags: ['on', 'surtax', 'accuracy'],
  },

  'qc-two-returns': {
    id: 'qc-two-returns',
    question: 'Do Quebec residents really file two separate tax returns?',
    answer:
      "Yes. Quebec residents file a federal return with the Canada Revenue Agency (T1) and a separate provincial return with Revenu Québec (TP-1 form) every year. The two returns use different forms, different software interfaces, and different phone lines for questions. Both are due April 30 for most filers. Many Quebec-based tax software products handle both returns in a single workflow, but they produce two distinct submissions and two separate assessments. Employers in Quebec also remit source deductions to both CRA and Revenu Québec under separate rules.",
    tags: ['qc', 'filing'],
  },

  'qc-federal-abatement': {
    id: 'qc-federal-abatement',
    question: 'Why does this calculator show higher federal tax for Quebec residents?',
    answer:
      "Because Quebec administers its own provincial tax system, the federal government applies a 16.5% abatement that reduces federal income tax owed by Quebec residents — effectively crediting back a portion of federal tax to help fund Quebec's independent administration. This calculator shows gross federal tax before the abatement. On your actual federal return, the abatement appears as a deduction that reduces the federal tax owing, making your real out-of-pocket federal bill noticeably lower than what appears here. For an accurate combined picture, use Revenu Québec-certified tax software that handles both returns.",
    tags: ['qc', 'federal', 'accuracy'],
  },

  'sk-affordability-credit': {
    id: 'sk-affordability-credit',
    question: "What is Saskatchewan's Affordability Tax Credit?",
    answer:
      "Saskatchewan introduced the Affordability Tax Credit (ATC) in 2022 as a quarterly refundable payment to offset cost-of-living pressures. Eligible residents receive $429 per person per year (delivered in four quarterly installments of about $107), with the same amount for each qualifying dependent child. The credit is income-tested and phases out above certain household income thresholds. It is administered through the CRA alongside other federal benefit payments and does not require a separate application beyond filing your tax return. The credit was Saskatchewan's direct response to the cancellation of the federal consumer carbon price rebate.",
    tags: ['sk', 'credits'],
  },

  'mb-hatc': {
    id: 'mb-hatc',
    question: "What is Manitoba's Home Affordability Tax Credit?",
    answer:
      "Manitoba replaced the Education Property Tax Credit (EPTC) with the Home Affordability Tax Credit (HATC) starting in 2025. The EPTC had been a refundable credit tied to education property taxes paid by renters and homeowners. The HATC provides a maximum of $1,500 in 2025, rising to $1,600 in 2026, and is available to qualifying renters and homeowners. Eligibility and income thresholds are set by Manitoba Finance. The switch reflects a broader restructuring of Manitoba's property tax relief programs under the current provincial government.",
    tags: ['mb', 'credits'],
  },

  'nb-four-brackets': {
    id: 'nb-four-brackets',
    question: 'Why does New Brunswick only have four provincial tax brackets?',
    answer:
      "New Brunswick consolidated from five to four provincial tax brackets in recent years as part of a tax simplification effort. The current structure has rates of 9.40%, 14.82%, 16.52%, and 19.50%, applying at thresholds roughly aligned with the federal bracket structure. The reduction in brackets was partly offset by adjusting rates to maintain similar revenue neutrality. New Brunswick also has a provincial low-income tax reduction that phases out as income rises, providing additional relief at the lower end of the income range.",
    tags: ['nb', 'brackets'],
  },

  'ns-low-bpa': {
    id: 'ns-low-bpa',
    question: 'Why does Nova Scotia have such a low basic personal amount?',
    answer:
      "Nova Scotia's provincial basic personal amount (BPA) has historically been among the lowest in Canada. For 2025, it stood at $8,481 — a level that means provincial income tax begins on a smaller base of income than most other provinces. However, the 2026 provincial budget included a substantial increase to $11,744, significantly narrowing the gap with other provinces. The low historical BPA reflected past fiscal constraints rather than a deliberate policy to tax lower incomes; the 2026 increase was positioned as part of a broader affordability package.",
    tags: ['ns', 'bpa'],
  },

  'pe-2026-bpa': {
    id: 'pe-2026-bpa',
    question: "Why did PEI's basic personal amount jump so much for 2026?",
    answer:
      "Prince Edward Island increased its provincial basic personal amount from $12,000 in 2025 to $14,250 in 2026 — an increase of $2,250 in a single year. This was a deliberate affordability measure included in PEI's 2025 provincial budget, designed to reduce the provincial tax burden on low- and middle-income earners. The increase means a full-year resident at the 9.65% bottom rate receives a credit worth roughly $217 more on their 2026 provincial tax bill. PEI has been gradually raising its BPA over several years as part of a longer-term affordability commitment.",
    tags: ['pe', 'bpa', '2026'],
  },

  'nl-eight-brackets': {
    id: 'nl-eight-brackets',
    question: 'Why does Newfoundland and Labrador have eight tax brackets?',
    answer:
      "Newfoundland and Labrador has more provincial tax brackets than any other province or territory — eight in total, compared to as few as three in some jurisdictions. The granular bracket structure was designed to make the provincial system more progressive, applying incrementally higher rates at each income level rather than jumping steeply between a small number of thresholds. The rates range from 8.70% on the first $43,198 up to 21.30% on income above $1,000,000. In practice, the additional brackets primarily affect higher earners; lower- and middle-income residents face rates similar to many other Atlantic provinces.",
    tags: ['nl', 'brackets'],
  },

  'yt-nrd': {
    id: 'yt-nrd',
    question: "How does the Northern Residents Deduction affect Yukon residents' taxes?",
    answer:
      "The federal Northern Residents Deduction (NRD) is available to individuals who lived in a prescribed northern zone — which includes all of Yukon — for at least six consecutive months beginning or ending in the tax year. The deduction has two parts: a residency deduction of $11 per day for the northern zone (up to $4,015 for a full year), and a travel deduction that can offset the cost of up to two trips per year (employee or their dependants) to destinations south of the northern zone. At a combined federal-Yukon marginal rate of around 34%, the full residency deduction can reduce annual tax by over $1,300 — a meaningful benefit for Yukon residents.",
    tags: ['yt', 'nrd', 'deductions'],
  },

  'yt-own-tax': {
    id: 'yt-own-tax',
    question: 'Does Yukon have its own provincial income tax system?',
    answer:
      "Yes, Yukon levies its own territorial income tax, but it is structured as a percentage of federal tax rather than a fully independent bracket system. The territory's rates mirror the federal brackets closely, with a 6.40% bottom rate scaling to 15.00% at the top. Unlike Quebec, Yukon does not administer its own tax collection — the CRA handles all Yukon territorial tax alongside the federal return. Yukon also offers a small business tax rate and a mineral exploration tax credit, but for most individuals the territory's system is the simplest among all Canadian jurisdictions.",
    tags: ['yt', 'territorial'],
  },

  'nt-colc-cancelled': {
    id: 'nt-colc-cancelled',
    question: "What happened to the Northwest Territories Cost of Living Tax Credit?",
    answer:
      "The NWT Cost of Living Tax Credit was a refundable territorial credit designed to help residents manage the high cost of living in northern communities. It was tied to the federal consumer carbon pricing system and was cancelled in April 2025 when the federal government eliminated consumer carbon pricing. The NWT government has not introduced a direct replacement. Residents who received the credit in prior years will find it absent from their 2025 and subsequent returns. The cancellation reduced after-tax income for lower- and moderate-income NWT residents who had previously qualified.",
    tags: ['nt', 'credits', '2025'],
  },

  'nt-nrd': {
    id: 'nt-nrd',
    question: 'Can Northwest Territories residents claim the Northern Residents Deduction?',
    answer:
      "Yes. All NWT residents qualify for the federal Northern Residents Deduction because the entire territory is a prescribed northern zone. The residency component is $11 per day ($4,015 for a full year), and the travel component can offset the cost of up to two trips south of the northern zone per year for the taxpayer and qualifying dependants. Many remote NWT communities also qualify for the intermediate zone designation, but most residents are in the northern zone. The NRD is a federal deduction that appears on your T1 return and reduces both federal and NWT territorial tax.",
    tags: ['nt', 'nrd', 'deductions'],
  },

  'nu-low-rates': {
    id: 'nu-low-rates',
    question: "Why does Nunavut have the lowest territorial income tax rates in Canada?",
    answer:
      "Nunavut's territorial income tax rates start at 4% on the first roughly $53,268 of income — the lowest bottom rate in Canada — and rise to 11.50% at the top bracket. The territory was created in 1999 and designed its tax system from scratch with low rates to attract workers to a region with very high living costs. The lower tax burden partially compensates for the absence of accessible roads, high food and housing costs, and other economic challenges of living in the territory. Nunavut does not have a provincial sales tax, and combined with the low income tax rates, after-tax pay compares favourably to most southern provinces for equivalent salaries.",
    tags: ['nu', 'rates'],
  },

  'nu-child-benefit': {
    id: 'nu-child-benefit',
    question: "What is the Nunavut Child Benefit?",
    answer:
      "The Nunavut Child Benefit (NUCB) is a territorial program that provides $348 per qualifying child per year to low- and modest-income families, delivered as part of the Canada Child Benefit payment. Eligibility and payment amounts depend on net family income and number of children. The benefit is non-taxable and is administered by the CRA alongside federal benefits, requiring no separate application beyond filing your annual tax return. It supplements the federal Canada Child Benefit and helps offset the exceptionally high cost of raising children in northern communities.",
    tags: ['nu', 'credits', 'family'],
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

/** Province-specific FAQ IDs, keyed by province code. */
export const PROVINCE_FAQS: Record<string, string[]> = {
  BC: ['bc-catc-cancelled', 'bc-2026-changes'],
  AB: ['ab-no-pst'],
  SK: ['sk-affordability-credit'],
  MB: ['mb-hatc'],
  ON: ['on-surtax'],
  QC: ['qc-two-returns', 'qc-federal-abatement'],
  NB: ['nb-four-brackets'],
  NS: ['ns-low-bpa'],
  PE: ['pe-2026-bpa'],
  NL: ['nl-eight-brackets'],
  YT: ['yt-nrd', 'yt-own-tax'],
  NT: ['nt-colc-cancelled', 'nt-nrd'],
  NU: ['nu-low-rates', 'nu-child-benefit'],
};

export function getProvinceFAQs(code: string): FAQ[] {
  const ids = PROVINCE_FAQS[code] ?? [];
  return getFAQs(ids);
}
