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

  // ── Tax Filing 2025 — landing page ──────────────────────────────────────────

  'tf25-deadline': {
    id: 'tf25-deadline',
    question: 'When is the deadline to file my 2025 tax return?',
    answer:
      'Most Canadians must file by **April 30, 2026**. If you or your spouse/common-law partner had self-employment income in 2025, you have until **June 15, 2026** to file — but any balance owing is still due April 30. Interest starts accruing from May 1 on any unpaid amount.',
    tags: ['filing-2025', 'deadline'],
  },

  'tf25-must-file': {
    id: 'tf25-must-file',
    question: "Do I have to file if I didn't earn income in 2025?",
    answer:
      "You're not legally required to file a return if you have no income and no taxes owing — but you should still file. Filing is the only way to receive the GST/HST credit, Canada Child Benefit (CCB), and other income-tested benefits. TFSA contribution room also accumulates only from the year you file and turn 18. Filing a nil return takes minutes and keeps your benefit entitlements intact.",
    tags: ['filing-2025', 'basics'],
  },

  'tf25-late-penalty': {
    id: 'tf25-late-penalty',
    question: 'What happens if I file late?',
    answer:
      "If you have **no balance owing**, there is no late-filing penalty — just file as soon as you can. If you owe tax, the penalty is **5% of the balance owing immediately**, plus **1% per complete month late**, up to 12 months (maximum 17%). Repeat offenders who were penalized in any of the three prior years and received a CRA demand to file face a higher rate: 10% + 2% per month up to 20 months. Interest also compounds daily on the unpaid balance from May 1.",
    tags: ['filing-2025', 'penalty'],
  },

  'tf25-free-software': {
    id: 'tf25-free-software',
    question: 'Can I file my 2025 return for free?',
    answer:
      "Yes. **Wealthsimple Tax** is completely free for all situations with no income limit. **GenuTax Standard** and **StudioTax** (up to 20 returns per year) are also fully free. TurboTax Free and H&R Block Free offer free basic tiers but may prompt upgrades for more complex returns. All are NETFILE-certified for 2025.",
    tags: ['filing-2025', 'software'],
  },

  'tf25-cant-pay': {
    id: 'tf25-cant-pay',
    question: "What if I can't pay what I owe?",
    answer:
      "**File your return on time regardless.** Filing on time stops the 5% late-filing penalty — only interest accrues on an unpaid balance, and interest is far less expensive than penalty plus interest. After filing, pay what you can and contact CRA at 1-888-863-8657 or through My Account to set up a payment arrangement. CRA is generally cooperative with taxpayers who reach out proactively.",
    tags: ['filing-2025', 'payment'],
  },

  'tf25-amend': {
    id: 'tf25-amend',
    question: "I made a mistake on my already-filed return — what do I do?",
    answer:
      "Don't file a new return. Use **ReFILE** inside your existing NETFILE software — it's the fastest method and is available for 2022–2025 T1 returns. If your software doesn't support ReFILE, submit a **T1-ADJ** (Adjustment Request) through CRA My Account online or mail the paper form to your tax centre. Wait until you've received your Notice of Assessment before amending.",
    tags: ['filing-2025', 'amendment'],
  },

  // ── Tax Filing 2025 — slips checklist ────────────────────────────────────

  'tf25-missing-slip': {
    id: 'tf25-missing-slip',
    question: 'What if I\'m missing a slip?',
    answer:
      "Use **Auto-fill My Return** inside any NETFILE-certified software — it pulls all slips CRA has on file directly from the CRA system. If a slip is missing from Auto-fill, contact the issuer (employer, financial institution, government agency). You can also check CRA My Account under \"Tax information slips\" to see what slips have been filed. If you can't get a slip in time, you can still estimate the income and file, then amend later.",
    tags: ['filing-2025', 'slips'],
  },

  'tf25-t3-timing': {
    id: 'tf25-t3-timing',
    question: 'When do T3 slips arrive?',
    answer:
      "T3 slips (trust income from mutual funds, ETFs, and other trusts) are due to investors by **March 31**. In practice, many fund companies file them in late March or even early April. This is the most common reason for a late or amended return — T3 slips often arrive after other slips and are easy to miss. Set a reminder to check your investment accounts in late March before filing.",
    tags: ['filing-2025', 'slips', 't3'],
  },

  'tf25-file-without-slips': {
    id: 'tf25-file-without-slips',
    question: "Can I still file if I haven't received all my slips?",
    answer:
      "Yes — you can file using your best estimate of any missing income, then amend the return once the slip arrives. This is preferable to filing late if the deadline is approaching. Use Auto-fill My Return first; it often captures slips you haven't physically received. If you underestimate income, CRA will charge interest on the difference from the original due date — but filing on time avoids the late-filing penalty.",
    tags: ['filing-2025', 'slips'],
  },

  'tf25-autofill': {
    id: 'tf25-autofill',
    question: 'What is Auto-fill My Return?',
    answer:
      "Auto-fill My Return is a CRA service available inside any NETFILE-certified software. Once you authenticate with your CRA credentials (My Account login), the software automatically imports your T4, T5, T3, T4A, RRSP slips, and other data directly from the CRA database. It saves significant manual entry and catches slips you may have forgotten. CRA requires all employers and financial institutions to submit slips electronically, so most data is available by early March.",
    tags: ['filing-2025', 'software', 'slips'],
  },

  // ── Tax Filing 2025 — free software ──────────────────────────────────────

  'tf25-netfile-secure': {
    id: 'tf25-netfile-secure',
    question: 'Is NETFILE actually secure?',
    answer:
      "Yes. NETFILE transmits your return directly to CRA over an encrypted connection — the same standard used for online banking. CRA certifies each software product annually. Your return data is never stored on third-party servers when using NETFILE; the software sends the completed return file directly to CRA. Wealthsimple Tax, GenuTax, and StudioTax are widely used by millions of Canadians each year.",
    tags: ['filing-2025', 'software', 'security'],
  },

  'tf25-switch-software': {
    id: 'tf25-switch-software',
    question: 'Can I switch software after I\'ve started?',
    answer:
      "Yes, but you'll need to re-enter all your information from scratch — software doesn't export data between platforms. If you've already filed and want to use different software to amend, use ReFILE in your original software instead of switching. The most common reason to switch mid-preparation is discovering your situation requires a paid tier in the platform you started with; switching before filing is fine, just time-consuming.",
    tags: ['filing-2025', 'software'],
  },

  'tf25-complex-return': {
    id: 'tf25-complex-return',
    question: 'What if I have a complex return?',
    answer:
      "**Wealthsimple Tax** handles nearly all T1 situations for free — including rental income, self-employment (T2125), investment gains and losses (T5008), foreign income, and the T1135 foreign asset declaration. For returns requiring professional judgment (corporate structures, trusts, multi-year back-filing, CRA disputes), consult a tax professional. CRA also offers the **Community Volunteer Income Tax Program (CVITP)** for modest-income individuals with simple returns.",
    tags: ['filing-2025', 'software'],
  },

  'tf25-netfile-closes': {
    id: 'tf25-netfile-closes',
    question: 'When does NETFILE close for 2025?',
    answer:
      "NETFILE accepts 2025 T1 returns until **January 29, 2027**. After that date, you can still file a paper return or through a tax professional using the EFILE system (the professional version of NETFILE). The normal 10-year voluntary disclosure window still applies for very late returns. Filing before January 29, 2027 via NETFILE is the fastest path — refunds typically arrive within 8 business days via direct deposit.",
    tags: ['filing-2025', 'software', 'deadline'],
  },

  // ── Tax Filing 2025 — credits and deductions ─────────────────────────────

  'tf25-credit-vs-deduction': {
    id: 'tf25-credit-vs-deduction',
    question: "What's the difference between a tax credit and a deduction?",
    answer:
      "A **deduction** reduces your taxable income — so its value depends on your marginal rate. A $5,000 RRSP deduction at a 43% marginal rate saves $2,150 in tax; the same deduction at 20% saves $1,000. A **non-refundable tax credit** reduces tax owing directly at a fixed rate (usually 15% federal) — so a $1,000 credit saves you $150 regardless of your income. **Refundable credits** (like the GST/HST credit) can produce a refund even if you owe no tax at all.",
    tags: ['filing-2025', 'credits'],
  },

  'tf25-childcare-school': {
    id: 'tf25-childcare-school',
    question: 'Can I claim childcare if my children are in school?',
    answer:
      "Yes, for before- and after-school care, daycare, day camps, and boarding schools for children under 16. The **lower-income spouse must claim** the deduction in most cases — this is the most commonly missed rule. The 2025 limits are $8,000 per child under 7 and $5,000 per child ages 7–16. Overnight camps and language school fees count up to weekly limits. Keep all receipts — CRA may ask for them.",
    tags: ['filing-2025', 'credits', 'childcare'],
  },

  'tf25-dtc-apply': {
    id: 'tf25-dtc-apply',
    question: 'How do I apply for the Disability Tax Credit?',
    answer:
      "The Disability Tax Credit (DTC) requires prior CRA approval — you can't just claim it on your return without it. Have a qualified medical practitioner complete **Form T2201** and submit it to CRA. Approval is valid for a set period (or indefinitely for permanent conditions). Once approved, you can claim the credit retroactively for up to 10 years and transfer unused portions to a supporting person. Apply as early as possible — retroactive claims can recover significant tax.",
    tags: ['filing-2025', 'credits', 'disability'],
  },

  'tf25-caip-quebec': {
    id: 'tf25-caip-quebec',
    question: 'Are Quebec residents eligible for the Climate Action Incentive Payment?',
    answer:
      "No. The **Climate Action Incentive Payment (CAIP)** is only available to residents of provinces under the federal carbon pricing backstop: **Ontario, Manitoba, Saskatchewan, and Alberta** for 2025. Quebec, BC, and other provinces that have their own provincial carbon pricing systems do not receive the federal CAIP. Quebec residents had their own provincial carbon pricing credits; BC had the Climate Action Tax Credit, which was cancelled in April 2025 when federal consumer carbon pricing ended.",
    tags: ['filing-2025', 'credits', 'caip'],
  },

  // ── Tax Filing 2025 — life events ─────────────────────────────────────────

  'tf25-principal-residence': {
    id: 'tf25-principal-residence',
    question: 'Do I have to report the sale of my principal residence?',
    answer:
      "**Yes — always**, even if the full gain is exempt. Since 2016, CRA requires you to designate the property as your principal residence on **Schedule 3** of your T1 return in the year of sale. Failing to report can result in penalties and loss of the exemption for years not designated. If you forgot to report a prior-year sale, file an amendment immediately — the penalty for late designation is $100 per month, up to $8,000.",
    tags: ['filing-2025', 'property', 'capital-gains'],
  },

  'tf25-common-law': {
    id: 'tf25-common-law',
    question: 'When does common-law status start for CRA purposes?',
    answer:
      "CRA considers you common-law after you have **cohabited with a partner for 12 continuous months**, or immediately if you have a child together (by birth or adoption). You must update your marital status in CRA My Account or on your T1 return for the year the status changed. Common-law status affects GST/HST credit calculations, CCB, and spousal credit eligibility — all calculated on combined household income.",
    tags: ['filing-2025', 'life-events', 'marital-status'],
  },

  'tf25-home-office-employee': {
    id: 'tf25-home-office-employee',
    question: 'Can I deduct home office expenses as a salaried employee?',
    answer:
      "Yes, if your employer certifies your eligibility by signing **Form T2200** (Declaration of Conditions of Employment). You must use the space exclusively for work more than 50% of the time, or use it regularly and exclusively for meeting clients. The **detailed method** requires tracking actual costs (utilities, internet, rent for renters). The CRA's flat-rate method ($2/day, maximum $500/year) was a temporary COVID measure and is no longer available for 2025.",
    tags: ['filing-2025', 'employment-expenses', 'home-office'],
  },

  'tf25-ccb-stopped': {
    id: 'tf25-ccb-stopped',
    question: 'My CCB stopped — did filing late cause this?',
    answer:
      "Likely yes. The **Canada Child Benefit** is recalculated each July based on the prior year's net family income as reported on your tax return. If you or your spouse didn't file by the June processing cutoff, CRA may pause or stop CCB payments until returns are assessed. File immediately — payments are usually reinstated within a few weeks of assessment and any missed amounts are back-paid. This is one of the most urgent reasons to file on time.",
    tags: ['filing-2025', 'ccb', 'benefits'],
  },

  // ── Tax Filing 2025 — amend a return ─────────────────────────────────────

  'tf25-amendment-timeline': {
    id: 'tf25-amendment-timeline',
    question: 'How long does CRA take to process an amendment?',
    answer:
      "ReFILE (electronic amendment) typically takes **2 weeks**. A T1-ADJ submitted through CRA My Account takes approximately **4–8 weeks**. A paper T1-ADJ mailed to your tax centre can take **12+ weeks**, especially during peak filing season. CRA sends a **Notice of Reassessment** once the amendment is processed — this replaces your original Notice of Assessment for that year.",
    tags: ['filing-2025', 'amendment'],
  },

  'tf25-amend-5-years': {
    id: 'tf25-amend-5-years',
    question: 'Can I amend a return from 5 years ago?',
    answer:
      "Generally, the normal **3-year reassessment period** applies to both CRA and the taxpayer — meaning you can request adjustments to returns assessed within the last 3 years. For older returns (up to 10 years back), you can still request adjustments under the **Taxpayer Relief Provisions** (formerly Fairness Provisions) by submitting Form RC4288. Common reasons include unclaimed credits or overlooked deductions. CRA has discretion on whether to accept adjustments beyond the 3-year window.",
    tags: ['filing-2025', 'amendment'],
  },

  'tf25-amend-audit': {
    id: 'tf25-amend-audit',
    question: 'Will amending trigger an audit?',
    answer:
      "Amending a return does not automatically trigger an audit. CRA reviews a statistical sample of returns each year, selected on risk factors — amendments are one of many signals CRA weighs. If your amendment significantly changes your return (large additional deduction, change in income), CRA may request supporting documents. Filing an amendment to correct a genuine error — especially one that increases your taxes — is always the right move and demonstrates good faith.",
    tags: ['filing-2025', 'amendment', 'audit'],
  },

  'tf25-amend-balance-owing': {
    id: 'tf25-amend-balance-owing',
    question: 'What if my amendment creates a larger balance owing?',
    answer:
      "Pay the additional amount as quickly as possible. CRA will charge **daily-compounding interest from the original due date** (April 30, 2026 for the 2025 return) on any additional balance revealed by an amendment — not from the amendment date. There is no late-filing penalty for amendments, only interest on the underpaid amount. The sooner you pay, the less interest accrues.",
    tags: ['filing-2025', 'amendment', 'payment'],
  },

  // ── Tax Filing 2025 — can't pay ───────────────────────────────────────────

  'tf25-cra-court': {
    id: 'tf25-cra-court',
    question: "Will CRA take me to court if I can't pay?",
    answer:
      "CRA's preference is always to collect through payment arrangements rather than legal action. CRA can and does garnish wages, freeze bank accounts, and register liens on property — but these escalation steps take time and typically happen after other collection efforts have failed. **Calling CRA proactively** (1-888-863-8657) before collections contact you significantly increases the likelihood of an agreeable payment plan. Court action is a last resort used only in serious, prolonged cases.",
    tags: ['filing-2025', 'payment', 'collections'],
  },

  'tf25-arrangement-interest': {
    id: 'tf25-arrangement-interest',
    question: 'Does CRA charge interest on a payment arrangement?',
    answer:
      "Yes. CRA's **prescribed interest rate** continues to accrue on any unpaid balance during a payment arrangement — it doesn't pause. As of Q1 2026, the prescribed rate on overdue taxes is approximately 8% annually, compounding daily. This is why it's worth paying as much as possible upfront and setting up the largest monthly payment you can manage — each dollar paid reduces the balance interest accrues on.",
    tags: ['filing-2025', 'payment'],
  },

  'tf25-credit-card': {
    id: 'tf25-credit-card',
    question: 'Can I pay my tax bill with a credit card?',
    answer:
      "Not directly through CRA — CRA does not accept credit card payments. However, you can use **PaySimply** (a third-party service) or some financial institutions to pay CRA with a credit card or prepaid card, though a service fee applies (typically 2–3%). Most people pay CRA via **online banking** (pay to \"Canada Revenue Agency - Personal Income Tax\"), **My Payment** (Interac or debit card via the CRA website), or by mail. In-person payments at Canada Post are also accepted.",
    tags: ['filing-2025', 'payment'],
  },

  'tf25-cant-pay-anything': {
    id: 'tf25-cant-pay-anything',
    question: "What if I genuinely cannot afford to pay anything?",
    answer:
      "**File your return anyway** — the late-filing penalty is a separate and more expensive problem than interest on an unpaid balance. After filing, contact CRA to explain your situation. If your inability to pay is due to serious financial hardship, you may qualify for the **Taxpayer Relief Program** (Form RC4288) which can waive or cancel interest and penalties. CRA can also set a monthly payment as low as circumstances require. Document your financial situation thoroughly if applying for relief.",
    tags: ['filing-2025', 'payment', 'relief'],
  },

  // ── Tax Filing 2025 — late filing ─────────────────────────────────────────

  'tf25-no-penalty-refund': {
    id: 'tf25-no-penalty-refund',
    question: "Is there a penalty if I'm getting a refund?",
    answer:
      "No. The late-filing penalty is calculated as a percentage of your **balance owing**. If your balance owing is $0 — whether because you're getting a refund or because you have no taxes owing — the penalty is $0. Filing late with a refund only delays your refund; there is no financial penalty. However, late filing can temporarily pause benefit payments (CCB, GST/HST credit) until your return is assessed.",
    tags: ['filing-2025', 'penalty'],
  },

  'tf25-penalty-calc': {
    id: 'tf25-penalty-calc',
    question: 'How is the late-filing penalty calculated?',
    answer:
      "The standard penalty is **5% of the balance owing on the filing deadline**, plus **1% for each complete month the return is late**, up to a maximum of 12 months. So the maximum standard penalty is 17% of the balance. Complete months are counted from May 1 — a return filed June 29 is 1 complete month late; a return filed July 1 is 2 months late. Interest also accrues daily on both the unpaid balance and the assessed penalty from May 1, 2026.",
    tags: ['filing-2025', 'penalty'],
  },

  'tf25-repeat-offender': {
    id: 'tf25-repeat-offender',
    question: 'What if I was penalized last year too?',
    answer:
      "If CRA assessed a late-filing penalty on your return in **any of the three prior tax years** AND also issued a formal demand to file for the current return, the higher penalty rates apply: **10% of the balance owing plus 2% per complete month late**, up to 20 months. The maximum repeat-offender penalty is 50% of the balance owing. Both conditions (prior penalty AND CRA demand) must apply — a late return without a CRA demand still uses the standard 5% rate.",
    tags: ['filing-2025', 'penalty'],
  },

  'tf25-waiver': {
    id: 'tf25-waiver',
    question: 'Can CRA waive penalties for illness or hardship?',
    answer:
      "Yes. The **Taxpayer Relief Program** (Form RC4288) allows CRA to cancel or waive penalties and interest when circumstances beyond your control prevented timely filing or payment. Qualifying circumstances include: serious illness or accident, natural disaster, CRA processing error or delay, and extreme financial hardship. You must provide documentation (medical records, disaster declarations, etc.). CRA has discretion — approval is not guaranteed but is worth pursuing if your situation qualifies.",
    tags: ['filing-2025', 'penalty', 'relief'],
  },

  'tf25-netfile-late': {
    id: 'tf25-netfile-late',
    question: 'When does NETFILE close — can I still file online?',
    answer:
      "NETFILE accepts 2025 T1 returns until **January 29, 2027**. If you're filing after that date, you must either mail a paper T1 return to your tax centre or have a tax professional file via EFILE (the professional version, which has no closing date). NETFILE returns filed on time receive refunds in approximately 8 business days via direct deposit — paper returns take 4–8 weeks.",
    tags: ['filing-2025', 'software', 'deadline'],
  },

  'nu-child-benefit': {
    id: 'nu-child-benefit',
    question: "What is the Nunavut Child Benefit?",
    answer:
      "The Nunavut Child Benefit (NUCB) is a territorial program that provides $348 per qualifying child per year to low- and modest-income families, delivered as part of the Canada Child Benefit payment. Eligibility and payment amounts depend on net family income and number of children. The benefit is non-taxable and is administered by the CRA alongside federal benefits, requiring no separate application beyond filing your annual tax return. It supplements the federal Canada Child Benefit and helps offset the exceptionally high cost of raising children in northern communities.",
    tags: ['nu', 'credits', 'family'],
  },

  // ── RESP / Tax Planning 2026 ────────────────────────────────────────────────

  'resp-annual-deadline': {
    id: 'resp-annual-deadline',
    question: 'Is there an annual RESP contribution deadline?',
    answer:
      "No. Unlike an RRSP or FHSA, there is no year-end or 60-day contribution deadline for an RESP. You can contribute any time during the calendar year — but contributions must be made by December 31 to earn the CESG for that calendar year. The grant is calculated on contributions made within the calendar year, so a contribution on December 31 still qualifies; a contribution on January 1 of the following year does not.",
    tags: ['resp', 'tax-planning-2026'],
  },

  'resp-no-postsec': {
    id: 'resp-no-postsec',
    question: "What happens to an RESP if my child doesn't go to post-secondary?",
    answer:
      "If the beneficiary does not attend a qualifying post-secondary program, you have a few options. You can transfer the RESP to another eligible beneficiary (such as a sibling) or keep the account open for up to 35 years in case the beneficiary changes their mind. If you ultimately close the account, any government grants (CESG, CLB) must be repaid to the government. The investment growth — called an **Accumulated Income Payment (AIP)** — is taxed as ordinary income to the subscriber plus a 20% penalty tax. However, up to $50,000 of an AIP can be rolled into your RRSP (if you have sufficient unused room), which avoids the 20% penalty. Contributions are returned tax-free since they were made with after-tax dollars.",
    tags: ['resp', 'tax-planning-2026'],
  },

  'resp-cesg-catchup': {
    id: 'resp-cesg-catchup',
    question: 'Can I catch up missed CESG years by contributing more?',
    answer:
      "Yes — but only one missed year of CESG can be recovered per calendar year. The CESG is earned on the first $2,500 contributed per year, with a maximum of $500. If you missed contributing in a prior year, contributing $5,000 in a single year lets you earn $1,000 in CESG: $500 for the current year plus $500 to recover one prior missed year. The catch-up applies only to one missed year at a time — you cannot recover multiple missed years in a single year by contributing more than $5,000. The beneficiary must still be within the eligible age window.",
    tags: ['resp', 'tax-planning-2026'],
  },

  'resp-withdrawal-tax': {
    id: 'resp-withdrawal-tax',
    question: 'How are RESP withdrawals taxed when the child goes to school?',
    answer:
      "RESP withdrawals for educational purposes are called **Educational Assistance Payments (EAPs)**. EAPs consist of grants and investment growth — these are taxable income to the **student**, not the subscriber. Because most full-time students have little other income, the tax on EAPs is usually minimal or zero after the basic personal amount ($16,452 federal for 2026). The original contributions are returned to the subscriber tax-free, since they were made with after-tax dollars. This is the core tax advantage: contributions compound untaxed, and the grant and growth are ultimately taxed at the student's low rate.",
    tags: ['resp', 'tax-planning-2026'],
  },

  'resp-fhsa-same-child': {
    id: 'resp-fhsa-same-child',
    question: 'Can I have both an RESP and an FHSA for the same child?',
    answer:
      "An RESP and an FHSA are entirely separate account types serving different purposes. An RESP belongs to the subscriber (parent or grandparent) for the benefit of a named child-beneficiary. An FHSA must be opened by the individual who intends to buy a home — it cannot be opened in a child's name. You cannot open an FHSA for your child. However, once your child reaches adulthood and is a first-time buyer, they can open their own FHSA while also potentially drawing on RESP funds if they're enrolled in post-secondary education. There is no restriction on having both types of accounts across generations.",
    tags: ['resp', 'fhsa', 'tax-planning-2026'],
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
