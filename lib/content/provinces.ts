import type { TaxYear } from '@/lib/rates';

export interface ProvinceContent {
  code: string;
  year: TaxYear;
  /** 1–2 sentence opener. */
  intro: string;
  /** 2–3 paragraphs on bracket mechanics. Use \n\n between paragraphs. */
  howItWorks: string;
  /** 1–2 paragraphs on what makes this province distinctive. */
  provincialQuirks: string;
  /** 1 paragraph on notable changes specific to this tax year. Omit if nothing significant. */
  recentChanges?: string;
  /** 1–2 paragraphs on province-specific credits and deductions. */
  creditsAndDeductions: string;
}

const CONTENT: Record<string, ProvinceContent> = {

  // ─── British Columbia ────────────────────────────────────────────────────────

  'BC-2025': {
    code: 'BC',
    year: 2025,
    intro:
      "British Columbia taxes personal income through seven progressive brackets, with rates from 5.06% to 20.5%. A low-income tax reduction can eliminate some or all provincial tax for earners below roughly $40,000.",
    howItWorks:
      "For 2025, the first $45,654 of taxable income is taxed at 5.06%. The next slice — from $45,654 to $91,310 — is taxed at 7.7%. Three intermediate brackets then step through rates of 10.5%, 12.29%, and 14.7% on progressively higher income bands, with 16.8% applying between $172,602 and $240,716. The top rate of 20.5% applies to everything above $240,716.\n\nBC's basic personal amount for 2025 is $11,981, which generates a non-refundable credit at the 5.06% rate — worth approximately $606. The credit is calculated at the bottom bracket rate regardless of where your income falls, so both a $50,000 earner and a $300,000 earner reduce their provincial bill by the same $606.\n\nThe province also offers a low-income tax reduction of up to $611. This phases out above $23,179 at a clawback rate of 3.56% per dollar, reaching zero at approximately $40,342. For earners below that threshold, the effective provincial rate is lower than the stated bracket rates suggest.",
    provincialQuirks:
      "BC's seven-bracket structure gives it more graduations than most provinces, which typically use three to five. The bracket bands are relatively narrow, so earners moving through the $45,000–$175,000 range step through multiple rate increases within a moderate income span.\n\nBC has historically indexed its brackets and BPA to an annual cost-of-living factor, so thresholds rise each year to prevent bracket creep. However, BC announced that indexation will pause from 2027 through 2030 — meaning after the 2026 update, thresholds will remain frozen unless policy changes.",
    recentChanges:
      "No structural rate changes apply specifically for 2025. Thresholds reflect standard annual indexation. The BC Climate Action Tax Credit — previously a quarterly benefit tied to the federal carbon pricing backstop — was discontinued when BC eliminated its consumer carbon tax on April 1, 2025. The final CATC payment was issued in April 2025.",
    creditsAndDeductions:
      "The BC Family Benefit is a monthly non-taxable payment for families with children under 18. It is delivered alongside the Canada Child Benefit and is income-tested, phasing out at higher family net incomes. Single-parent families receive an additional supplement.\n\nBeyond the BPA and low-income reduction, BC offers the standard suite of non-refundable provincial credits — disability amounts, medical expenses, charitable donations, and the tuition transfer — all calculated at the 5.06% credit rate.",
  },

  'BC-2026': {
    code: 'BC',
    year: 2026,
    intro:
      "For 2026, British Columbia raised its bottom bracket rate from 5.06% to 5.60% while increasing the basic personal amount to $13,216. Whether this produces a higher or lower bill depends on income level.",
    howItWorks:
      "BC's 2026 brackets begin at 5.60% on the first $50,363. The 7.7% rate runs from $50,363 to $100,728. Three intermediate brackets step through 10.5%, 12.29%, and 14.7%, with 16.8% applying between $190,405 and $265,545. The top rate of 20.5% applies above $265,545.\n\nThe basic personal amount for 2026 is $13,216, generating a non-refundable credit at 5.60% — worth approximately $740. This is substantially larger than 2025's $606, because both the BPA and the credit rate increased simultaneously. For lower earners, the larger credit largely or fully offsets the higher bottom rate. For higher earners, more income in the first bracket is taxed at the higher rate.\n\nThe low-income tax reduction rises to $690 and begins phasing out above $25,570.",
    provincialQuirks:
      "The simultaneous increase in both the bottom rate and the BPA is uncommon. BC's stated rationale was replacing revenue from the eliminated carbon tax while softening the impact for lower earners through the enlarged BPA. Those earning below roughly $60,000 typically see little net change; those above see a modest increase.\n\nBC also announced a freeze on bracket indexation from 2027 through 2030. After 2026, thresholds will remain unchanged through 2030 unless policy is revised — meaning workers whose wages keep pace with inflation will gradually face a higher effective rate without any legislative action.",
    recentChanges:
      "The bottom bracket rate rose from 5.06% to 5.60% and the basic personal amount jumped from $11,981 to $13,216 for 2026. Bracket thresholds were also indexed upward. BC simultaneously announced a pause on indexation from 2027 through 2030, so the 2026 thresholds will be locked in place for four years.",
    creditsAndDeductions:
      "The BC Family Benefit continues in 2026 with income-tested monthly payments for families with children. The BC Climate Action Tax Credit is no longer available — it was cancelled when BC removed its consumer carbon tax in April 2025.\n\nOther non-refundable provincial credits remain available at the 5.60% credit rate.",
  },

  // ─── Alberta ─────────────────────────────────────────────────────────────────

  'AB-2025': {
    code: 'AB',
    year: 2025,
    intro:
      "Alberta applies an 8% rate — the lowest provincial bottom bracket in Canada — to the first $60,000 of income, effective for the 2025 tax year. Alberta is also the only province with no provincial sales tax of any kind.",
    howItWorks:
      "For 2025, Alberta's six brackets run: 8% on the first $60,000, 10% from $60,000 to $148,269, 12% from $148,269 to $177,922, 13% from $177,922 to $237,230, 14% from $237,230 to $355,845, and 15% above $355,845.\n\nThe Alberta BPA for 2025 is $21,003, generating a non-refundable credit at the 8% rate — worth approximately $1,680. Because the entire first $60,000 sits in the 8% bracket, the BPA credit directly shelters a meaningful portion of that income tranche.\n\nOne practical note: the 8% rate is effective for the full 2025 tax year, but Alberta payroll withholding tables were not updated until mid-2025. If your employer used the old 10% tables through June 2025, your T4 may reflect higher deductions than your actual tax liability — you may receive a larger-than-expected refund on assessment.",
    provincialQuirks:
      "Alberta's position as the only province in Canada without any form of sales tax is significant for residents. No PST and no HST means goods and services are subject only to the federal 5% GST — a material spending-power advantage compared to provinces levying 8–15% combined sales taxes.\n\nThe six-bracket structure introduced in 2025 replaced a simpler system where all income below $148,269 was taxed at a flat 10%. The new design is more progressive at lower incomes while keeping Alberta's top rate at 15% — still among the lowest in Canada.",
    recentChanges:
      "The 8% bottom bracket on the first $60,000 is the defining change for 2025. Prior to this year, all taxable income below $148,269 was taxed at 10%. The introduction of the lower rate represents a targeted reduction for earners in that income band.",
    creditsAndDeductions:
      "The Alberta Child and Family Benefit (ACFB) is a quarterly supplement for families with children under 18. A base component phases out above $27,565 of adjusted family net income; a working income component requires at least $2,760 in working income and phases out above $46,191. ACFB payments are made in August, November, February, and May — separately from the Canada Child Benefit — and are non-taxable.\n\nAlberta does not operate a separate low-income tax reduction program. Non-refundable credits for medical expenses, disability, and donations are calculated at the provincial credit rate.",
  },

  'AB-2026': {
    code: 'AB',
    year: 2026,
    intro:
      "Alberta's six-bracket structure continues for 2026 with the 8% rate still applying to the first $60,000 and a higher basic personal amount of $22,323.",
    howItWorks:
      "For 2026, Alberta's six brackets are: 8% on the first $60,000, 10% from $60,000 to $151,234, 12% from $151,234 to $181,481, 13% from $181,481 to $241,974, 14% from $241,974 to $362,961, and 15% above $362,961. The thresholds above $60,000 are indexed upward from 2025 by roughly 2%.\n\nThe BPA rises to $22,323 for 2026, generating a non-refundable credit at the 8% rate — worth approximately $1,786, about $106 more than 2025. Because the credit rate equals the bottom bracket rate, the BPA shelter is especially efficient in Alberta: the entire $22,323 is effectively tax-free at the provincial level for residents at any income.\n\nAlberta continues to be the only province without a provincial or harmonized sales tax. No PST, no RST, no HST — only the federal 5% GST applies to most goods and services purchased in the province.",
    provincialQuirks:
      "Alberta's no-PST status remains unchanged. The federal 5% GST is the only sales tax Alberta residents pay on most purchases.\n\nThe six-bracket schedule introduced in 2025 continues in 2026. The 8% first bracket, wide 10% band, and relatively low top rate of 15% keep Alberta's overall provincial tax burden well below most other provinces at similar income levels.",
    recentChanges:
      "No structural changes for 2026. The 8% bracket introduced in 2025 continues with indexed thresholds. The BPA increases to $22,323 from $21,003, providing a modest additional benefit to all Alberta taxpayers.",
    creditsAndDeductions:
      "The Alberta Child and Family Benefit (ACFB) continues in 2026 with quarterly payments for families with children under 18. A base component phases out above adjusted family net income of roughly $28,200, and a working income component requires at least $2,760 in working income, phasing out above approximately $47,300. Payments arrive in August, November, February, and May alongside the Canada Child Benefit.\n\nAlberta does not levy its own low-income tax reduction. Non-refundable provincial credits for medical expenses, disability, charitable donations, and the age amount are calculated at the 8% provincial credit rate.",
  },

  // ─── Ontario ─────────────────────────────────────────────────────────────────

  'ON-2025': {
    code: 'ON',
    year: 2025,
    intro:
      "Ontario uses five progressive brackets from 5.05% to 13.16%, but also applies a surtax on higher provincial bills — an extra layer of tax that this calculator does not model. Actual Ontario tax for higher earners will exceed the displayed estimate.",
    howItWorks:
      "For 2025, Ontario's five brackets run: 5.05% on the first $51,446, 9.15% to $102,894, 11.16% to $150,000, 12.16% to $220,000, and 13.16% above $220,000.\n\nThe Ontario BPA is $11,865 for 2025, generating a non-refundable credit at the 5.05% rate — worth approximately $599. The provincial credit for the BPA is one of the more modest in Canada due to the relatively low BPA amount.\n\nOntario uniquely levies a provincial surtax on top of its base income tax: 20% on Ontario tax exceeding approximately $5,315, and a further 36% on Ontario tax exceeding approximately $6,802. This surtax effectively pushes marginal Ontario rates well above the stated bracket rates for earners above roughly $75,000–$80,000. This calculator shows Ontario tax based on the bracket rates only — it does not apply the surtax.",
    provincialQuirks:
      "The Ontario surtax is the province's most distinctive and least intuitive feature. Because it layers a percentage charge on top of base provincial tax rather than directly on income, the effective marginal rate calculations are complex. For an earner at $100,000, the combined surtax effect can add 3–4 percentage points to the effective Ontario rate beyond what the 9.15% bracket suggests.\n\nOntario's Low-income Individuals and Families Tax (LIFT) Credit provides a non-refundable credit of up to $875 for individuals with employment income. It phases in at 5.05% of employment income, meaning the full $875 credit is reached at approximately $17,326 of earnings.",
    recentChanges:
      "For 2025, bracket thresholds reflect standard annual indexation. No structural changes to the rate schedule or surtax structure.",
    creditsAndDeductions:
      "The Ontario Trillium Benefit (OTB) combines three credits into a single monthly payment: the Ontario Energy and Property Tax Credit (OEPTC) for property tax or rent paid, the Ontario Sales Tax Credit (OSTC) for general sales tax relief, and the Northern Ontario Energy Credit (NOEC) for residents of northern Ontario. The OTB is particularly valuable for renters and lower-income homeowners.\n\nThe LIFT Credit reduces Ontario provincial tax by up to $875 for workers with employment income. It is non-refundable and claimed on the provincial Schedule ON428-A.",
  },

  'ON-2026': {
    code: 'ON',
    year: 2026,
    intro:
      "Ontario's five-bracket structure carries into 2026 with indexed thresholds and a higher BPA of $12,747. The provincial surtax continues and is not reflected in this calculator.",
    howItWorks:
      "For 2026, Ontario's five brackets are: 5.05% on the first $52,886, 9.15% from $52,886 to $105,775, 11.16% from $105,775 to $150,000, 12.16% from $150,000 to $220,000, and 13.16% above $220,000. Thresholds are indexed upward from 2025.\n\nThe BPA rises to $12,747 for 2026, generating a non-refundable credit at the 5.05% rate — worth approximately $644. This is an increase of about $45 over 2025.\n\nOntario's surtax continues for 2026 with indexed thresholds: the first layer of 20% applies to Ontario provincial tax above approximately $5,554, and a further 36% applies to provincial tax above approximately $7,108. This calculator shows Ontario tax based on the bracket rates only and does not include the surtax, which means estimates for earners above roughly $80,000 will be somewhat optimistic relative to the actual assessment.",
    provincialQuirks:
      "The Ontario surtax remains the most significant structural complexity in the Ontario tax system. Earners between roughly $78,000 and $150,000 are most likely to be meaningfully affected.\n\nThe LIFT Credit continues for lower-income workers with employment income, providing up to $875 in provincial tax relief.",
    recentChanges:
      "For 2026, the main changes are the indexed first bracket ceiling rising to $52,886 (from $51,446) and the BPA increasing to $12,747 from $11,865. Surtax thresholds are adjusted upward proportionally.",
    creditsAndDeductions:
      "The Ontario Trillium Benefit (OTB) continues in 2026, combining three credits — the Ontario Energy and Property Tax Credit (OEPTC) for property tax or rent, the Ontario Sales Tax Credit (OSTC) for general cost-of-living relief, and the Northern Ontario Energy Credit (NOEC) for residents of northern Ontario — into a single monthly payment.\n\nThe LIFT Credit (Low-income Individuals and Families Tax Credit) continues with a maximum of $875 for workers with employment income. Standard non-refundable provincial credits for medical expenses, disability, donations, and the age amount are available at the 5.05% Ontario credit rate.",
  },

  // ─── Saskatchewan ────────────────────────────────────────────────────────────

  'SK-2025': {
    code: 'SK',
    year: 2025,
    intro:
      "Saskatchewan applies three flat brackets — 10.5%, 12.5%, and 14.5% — one of the simplest provincial tax structures in Canada, combined with a high basic personal amount of $17,661.",
    howItWorks:
      "For 2025, the first $49,720 of taxable income is taxed at 10.5%. Income from $49,720 to $142,058 is taxed at 12.5%. Income above $142,058 is taxed at 14.5%.\n\nThe BPA is $17,661 for 2025, generating a non-refundable credit at the 10.5% rate — worth approximately $1,854. This is among the higher BPA credits in Canada, reflecting both the elevated BPA amount and the 10.5% credit rate.\n\nThe wide middle bracket — covering nearly $92,000 of income — means a significant portion of the working population in Saskatchewan faces the same 12.5% marginal rate. The spread between the bottom (10.5%) and top (14.5%) rates is narrow compared to most provinces.",
    provincialQuirks:
      "Saskatchewan is actively expanding its basic personal amount on a policy-driven schedule, separate from inflation indexation. The province committed to increasing the BPA by $500 each year for four years, targeting approximately $20,381 by 2028. For taxpayers in any bracket, each $500 BPA increase translates to roughly $52 in additional annual tax relief.\n\nSaskatchewan's three-bracket structure with a wide middle band makes it behave somewhat like a flat tax for earners between $50,000 and $142,000. This simplicity is both its strength (easy to plan around) and a critique (limited progressivity for that large income range).",
    recentChanges:
      "For 2025, the BPA increased to $17,661 as part of the province's planned four-year BPA expansion. Bracket thresholds reflect standard indexation.",
    creditsAndDeductions:
      "The Saskatchewan Affordability Tax Credit provides $429 per individual, $429 for a spouse or common-law partner, and $169 per dependent child (maximum two children) for 2025, for a maximum of $1,196 for a family of four. The credit was introduced through the Saskatchewan Affordability Act as a cost-of-living offset.\n\nThe Saskatchewan Low-Income Tax Credit (SLITC) is a refundable benefit for lower-income households, calculated based on the number of family members. Standard non-refundable provincial credits for medical expenses, donations, disability, and age are available at the 10.5% provincial credit rate.",
  },

  'SK-2026': {
    code: 'SK',
    year: 2026,
    intro:
      "Saskatchewan's three-bracket structure continues for 2026, with the BPA rising to $18,491 as part of the province's multi-year planned expansion.",
    howItWorks:
      "For 2026, Saskatchewan taxes the first $54,064 of taxable income at 10.5%. Income from $54,064 to $154,459 is taxed at 12.5%. Income above $154,459 is taxed at 14.5%. Bracket thresholds are indexed upward from 2025, with the first ceiling rising from $49,720 to $54,064 — a substantial jump that shifts a wider band of income to the lower 10.5% rate.\n\nThe BPA rises to $18,491 for 2026, generating a non-refundable credit of approximately $1,942 at the 10.5% rate. The credit is calculated at the bottom rate regardless of where the taxpayer's income falls, so the $1,942 reduction applies equally to someone earning $30,000 and someone earning $300,000.\n\nSaskatchewan's narrow rate spread — from 10.5% at the bottom to 14.5% at the top — makes the province one of Canada's more consistent earners' tax environments. There are no supplementary surtaxes or clawback mechanisms that push effective marginal rates above the stated brackets for most incomes.",
    provincialQuirks:
      "The BPA expansion continues toward the target of $20,381 in 2028. Each year's $500 increase delivers consistent, predictable tax relief that is easy to factor into financial planning.\n\nThe wide middle bracket running from $54,064 to $154,459 continues to create a near-flat-tax effect for most middle-income Saskatchewan residents.",
    recentChanges:
      "The BPA increases to $18,491 for 2026, continuing the multi-year expansion. Bracket thresholds are indexed upward; the first bracket ceiling rises from $49,720 to $54,064.",
    creditsAndDeductions:
      "The Saskatchewan Affordability Tax Credit (ATC) continues in 2026 with quarterly payments of $429 per adult and $169 per dependent child (maximum two children) — up to $1,196 per year for a family of four. Payments are income-tested and delivered through the CRA alongside other benefit payments.\n\nThe Saskatchewan Low-Income Tax Credit (SLITC) is a refundable benefit for households with lower net family income. It phases in with the number of family members and phases out above the income ceiling. Standard non-refundable provincial credits for disability, medical expenses, donations, and the age amount are calculated at the 10.5% provincial credit rate.",
  },

  // ─── Manitoba ────────────────────────────────────────────────────────────────

  'MB-2025': {
    code: 'MB',
    year: 2025,
    intro:
      "Manitoba applies three brackets from 10.8% to 17.4%, with the top rate applying above $100,000. The province replaced its long-running Education Property Tax Credit with a larger Homeowners Affordability Tax Credit in 2023.",
    howItWorks:
      "For 2025, the first $47,000 of taxable income is taxed at 10.8%. Income from $47,000 to $100,000 is taxed at 12.75%. Income above $100,000 is taxed at 17.4%.\n\nThe BPA is $15,780 for 2025, generating a non-refundable credit at the 10.8% rate — worth approximately $1,704. Non-refundable credits for disability, medical expenses, donations, and age are also calculated at the 10.8% rate, making them slightly more valuable than in lower-rate provinces.\n\nThe jump from 12.75% to 17.4% at $100,000 is one of the steeper single-bracket step-ups in Canadian provincial tax. An earner crossing the $100,000 threshold faces an additional 4.65 percentage points on each marginal dollar above it. Combined with the 26% federal bracket that applies above the same range, this produces a combined marginal rate of approximately 43.4% on income between $100,000 and $114,750.",
    provincialQuirks:
      "Manitoba replaced its Education Property Tax Credit (EPTC) — which provided relief of up to around $350 on school taxes — with the Homeowners Affordability Tax Credit (HATC) starting in 2023. The HATC is significantly larger: up to $1,500 for 2025. It is based on actual school taxes paid on a principal residence and is refundable, meaning it can exceed the tax otherwise owed.\n\nManitoba's three-bracket structure is simpler than most provinces. For earners between $47,000 and $100,000, the 12.75% rate applies uniformly — a wide band with no intermediate steps.",
    recentChanges:
      "For 2025, the HATC maximum is $1,500. Bracket thresholds and the BPA reflect standard annual indexation.",
    creditsAndDeductions:
      "The Homeowners Affordability Tax Credit (HATC) is worth up to $1,500 in 2025 for homeowners with a principal residence in Manitoba. It is based on school taxes paid and is refundable.\n\nManitoba also maintains a Primary Caregiver Tax Credit for individuals who provide unpaid care to someone with a severe disability, and a Family Tax Benefit for low-income families. Standard non-refundable provincial credits are available at the 10.8% rate.",
  },

  'MB-2026': {
    code: 'MB',
    year: 2026,
    intro:
      "Manitoba's three-bracket structure continues for 2026, with the Homeowners Affordability Tax Credit maximum rising to $1,600 and the BPA increasing to $15,969.",
    howItWorks:
      "For 2026, Manitoba's three brackets are: 10.8% on the first $47,564, 12.75% from $47,564 to $101,569, and 17.4% above $101,569. Thresholds are indexed from the 2025 amounts.\n\nThe BPA is $15,969 for 2026, generating a non-refundable credit of approximately $1,725 at the 10.8% rate. This is an increase of $21 in credit value over 2025 — modest, but consistent with annual indexation.\n\nThe top rate of 17.4% applies beginning just above $100,000 in 2026. Combined with the 26% federal bracket that kicks in at $117,045, the combined marginal rate for Manitoba earners above $117,045 is approximately 43.4%. The bracket structure has remained unchanged in design since 2025 — only the thresholds move with indexation.",
    provincialQuirks:
      "The HATC rises to $1,600 for 2026 (and is scheduled to reach $1,700 in 2027), continuing the upward trajectory. The primary caregiver and family tax benefit programs also continue.\n\nManitoba's three-bracket structure and the wide 12.75% middle band are unchanged for 2026.",
    recentChanges:
      "The Homeowners Affordability Tax Credit maximum increases from $1,500 to $1,600 for 2026. The BPA increases to $15,969 and bracket thresholds are indexed.",
    creditsAndDeductions:
      "The Homeowners Affordability Tax Credit (HATC) rises to $1,600 for 2026. The credit is available to homeowners who pay school taxes on a principal residence in Manitoba and is refundable — it can reduce your net provincial tax below zero. Renters also qualify through a component tied to the school taxes embedded in rent.\n\nThe Primary Caregiver Tax Credit provides up to $1,400 for an individual who provides unpaid care to a person with a severe disability. The Manitoba Family Tax Benefit supplements income for lower-income families with dependent children. Non-refundable provincial credits for medical expenses, donations, disability, and the age amount are calculated at the 10.8% credit rate.",
  },

  // ─── Quebec ──────────────────────────────────────────────────────────────────

  'QC-2025': {
    code: 'QC',
    year: 2025,
    intro:
      "Quebec residents file two separate income tax returns to two separate agencies — federal to the CRA and provincial to Revenu Québec — and benefit from a federal abatement that reduces their federal bill by approximately 16.5%.",
    howItWorks:
      "For 2025, Quebec's four provincial brackets run: 14% on the first $51,780, 19% from $51,780 to $103,545, 24% from $103,545 to $126,000, and 25.75% above $126,000.\n\nThe BPA is $17,183 for 2025, generating a non-refundable credit at the 14% rate — worth approximately $2,406. Because Quebec's bottom rate is significantly higher than most provinces, the BPA credit is larger in absolute dollar terms than it appears for provinces with 5–8% rates.\n\nNote on federal tax: this calculator estimates federal income tax using the standard federal bracket schedule. Quebec residents are entitled to a federal abatement of approximately 16.5% on basic federal tax, reflecting the fact that Quebec administers its own complete tax system. The federal tax shown here does not include that abatement — actual federal tax for Quebec residents will be lower than the estimate shown.",
    provincialQuirks:
      "Quebec operates its own complete tax administration through Revenu Québec. Quebec residents file two annual returns: a federal T1 with the CRA and a provincial TP-1 with Revenu Québec. The two agencies apply different deductions, credits, and benefit structures — the rules are similar in concept but differ in specifics.\n\nQuebec residents contribute to the Quebec Pension Plan (QPP) rather than CPP, and pay into the Quebec Parental Insurance Plan (QPIP) in lieu of federal EI parental benefits. Because QPIP provides parental benefits separately, Quebec residents pay a lower EI rate (1.31% vs. 1.64%) but also pay QPIP premiums which are not reflected in this calculator.",
    recentChanges:
      "For 2025, bracket thresholds are indexed to Quebec's inflation measure. The BPA increases to $17,183. No structural changes to the rate schedule.",
    creditsAndDeductions:
      "The Solidarity Tax Credit is Quebec's main refundable benefit for lower and middle-income households. It replaces several older credits and combines housing, sales tax, and a component for residents north of the 50th parallel into a single income-tested monthly payment.\n\nQuebec also offers credits specific to the provincial return: amounts for seniors, disability, medical expenses, and union dues at rates that may differ from the federal system. Contributions to certain Quebec-specific investment vehicles, such as the Fonds de solidarité FTQ, carry an additional 15% provincial tax credit.",
  },

  'QC-2026': {
    code: 'QC',
    year: 2026,
    intro:
      "Quebec's four-bracket system continues for 2026 with the BPA rising substantially to $18,571 — an increase of nearly $1,400 from 2025. The dual-return filing requirement and the federal abatement remain unchanged.",
    howItWorks:
      "For 2026, Quebec's four provincial brackets are: 14% on the first $53,255, 19% from $53,255 to $106,495, 24% from $106,495 to $129,590, and 25.75% above $129,590. These thresholds are indexed from 2025.\n\nThe BPA rises to $18,571 for 2026, generating a non-refundable credit at the 14% rate — worth approximately $2,600, about $194 more than 2025. Because Quebec's bottom rate is 14% (compared to 5–10% in many other provinces), the absolute value of the BPA credit in Quebec is among the highest in the country, even though the BPA amount is moderate by national standards.\n\nNote on federal tax: Quebec residents are entitled to a federal abatement of approximately 16.5% on basic federal income tax, reflecting the province's independent tax administration. This calculator shows gross federal tax before the abatement — your actual CRA assessment will reflect the lower, post-abatement amount. The two-return filing process (T1 with CRA, TP-1 with Revenu Québec) handles this automatically.",
    provincialQuirks:
      "Quebec's dual-return structure, QPP, and QPIP continue unchanged for 2026. The province remains the only jurisdiction in Canada with a fully independent provincial tax administration.\n\nQuebec's top combined marginal rate — approximately 53.3% (33% federal + 25.75% Quebec, before the abatement adjustment) — is among the highest in Canada, making it particularly valuable to model RRSP deductions for high earners in Quebec.",
    recentChanges:
      "The BPA increases significantly to $18,571 for 2026, up from $17,183. The first bracket ceiling rises from $51,780 to $53,255. No changes to the rates or the Quebec abatement mechanism.",
    creditsAndDeductions:
      "The Solidarity Tax Credit (Crédit d'impôt pour solidarité) continues in 2026 as Quebec's main income-tested refundable benefit. It combines housing, sales tax, and northern supplement components into a single monthly payment administered by Revenu Québec.\n\nRRSP contributions (referred to as REER in French) reduce both federal and Quebec net income, making them especially effective for Quebec residents at higher marginal rates. Non-refundable credits on the Quebec TP-1 for medical expenses, disability, and union dues may differ in amount or structure from the federal equivalents. The Fonds de solidarité FTQ and Fondaction investment vehicles carry an additional 15% Quebec tax credit, available to residents who contribute through payroll deductions.",
  },

  // ─── New Brunswick ───────────────────────────────────────────────────────────

  'NB-2025': {
    code: 'NB',
    year: 2025,
    intro:
      "New Brunswick uses four income tax brackets from 9.4% to 19.5% — the result of a consolidation from an earlier five-bracket structure — alongside a 15% Harmonized Sales Tax.",
    howItWorks:
      "For 2025, New Brunswick taxes the first $47,715 of taxable income at 9.4%. From $47,715 to $95,431, the rate is 14%. From $95,431 to $176,756, the rate is 16%. Income above $176,756 is taxed at 19.5%.\n\nThe BPA is $12,458 for 2025, generating a non-refundable credit at the 9.4% rate — worth approximately $1,171. Most working-age earners at typical New Brunswick incomes will land in the 14% bracket for the majority of their income.\n\nNew Brunswick's four-bracket schedule is the product of a consolidation that merged two intermediate brackets from an earlier five-bracket design. The practical effect is a somewhat larger rate jump at lower thresholds.",
    provincialQuirks:
      "New Brunswick's 15% HST applies to most goods and services, adding to the overall tax picture for residents. Combined with an income tax structure that reaches 19.5% at the top bracket, NB sits mid-range among Atlantic provinces for total tax burden.\n\nNB provides a low-income tax reduction that can reduce or eliminate provincial tax for eligible lower-income residents. The reduction is calculated on Form NB428 and can be transferred to a spouse if not fully used.",
    recentChanges:
      "For 2025, thresholds reflect standard annual indexation. No structural changes to the rate schedule.",
    creditsAndDeductions:
      "New Brunswick's low-income tax reduction is available to residents whose net income falls below the phase-out threshold. Standard non-refundable provincial credits for disability, medical expenses, donations, and the age amount are available at the 9.4% rate. New Brunswick does not operate a major province-specific refundable credit comparable to Ontario's Trillium Benefit or Quebec's Solidarity Tax Credit.",
  },

  'NB-2026': {
    code: 'NB',
    year: 2026,
    intro:
      "New Brunswick's four-bracket structure carries into 2026, with the BPA rising to $13,396 and thresholds indexed upward.",
    howItWorks:
      "For 2026, New Brunswick taxes the first $49,958 of taxable income at 9.4%. From $49,958 to $99,916 the rate is 14%. From $99,916 to $185,064 the rate is 16%. Income above $185,064 is taxed at 19.5%. These thresholds are indexed upward from 2025.\n\nThe BPA is $13,396 for 2026, generating a non-refundable credit of approximately $1,259 at the 9.4% rate. Because the credit rate equals the bottom bracket rate, it is applied uniformly regardless of the earner's actual income bracket.\n\nNew Brunswick's four-bracket design produces a meaningful rate jump at the first threshold — from 9.4% to 14% at just below $50,000 — which affects a wide range of working residents. The top 19.5% rate, combined with the 26% federal bracket that applies at similar income levels, produces a combined marginal rate above 45% for higher earners. The province levies a 15% HST on most goods and services, adding to the overall tax picture.",
    provincialQuirks:
      "The low-income tax reduction continues to provide relief for lower earners, and the HST continues to apply to most goods and services. New Brunswick's mid-range position among Atlantic provinces for income tax rates is unchanged.",
    recentChanges:
      "The BPA rises to $13,396 for 2026. The first bracket ceiling increases from $47,715 to $49,958 due to indexation.",
    creditsAndDeductions:
      "New Brunswick's low-income tax reduction continues in 2026, calculated on Schedule NB428. The reduction phases out as net income rises above the threshold, and any unused portion may be transferred to a spouse or common-law partner.\n\nStandard non-refundable provincial credits are available at the 9.4% rate: disability, medical expenses, charitable donations, the caregiver amount, and the age amount for seniors. New Brunswick does not operate a major province-specific refundable benefit program comparable to Ontario's Trillium Benefit.",
  },

  // ─── Nova Scotia ─────────────────────────────────────────────────────────────

  'NS-2025': {
    code: 'NS',
    year: 2025,
    intro:
      "Nova Scotia combines the lowest bottom bracket rate of any province at 8.79% with one of the highest top rates at 21%, creating a wide spread that makes effective rate comparisons with other provinces nuanced.",
    howItWorks:
      "For 2025, Nova Scotia's five brackets run: 8.79% on the first $29,590, 14.95% from $29,590 to $59,180, 16.67% from $59,180 to $93,000, 17.5% from $93,000 to $150,000, and 21% above $150,000.\n\nNova Scotia has the lowest basic personal amount in Canada at $8,481. The BPA credit at 8.79% is worth approximately $746. The low BPA means provincial income tax starts accruing at a lower income threshold than any other province — there is very little tax-free base, so nearly every dollar above roughly $8,500 attracts provincial tax.\n\nThe rate jump from the first bracket (8.79%) to the second bracket (14.95%) is one of the sharpest in Canada — nearly 70% higher on a proportional basis. A taxpayer whose income crosses $29,590 faces that step-up on every additional dollar.",
    provincialQuirks:
      "The combination of a low BPA and a steep first bracket step-up means Nova Scotia is not as low-tax as the 8.79% bottom rate might suggest. A median earner landing in the 14.95% or 16.67% bracket will find the effective rate meaningfully higher than the floor implies. For most residents, only a narrow initial slice of income is taxed at 8.79%.\n\nNova Scotia applies a 15% HST on most goods and services, which adds to the total tax picture for residents.",
    recentChanges:
      "For 2025, rates and thresholds are unchanged from published amounts. No structural changes.",
    creditsAndDeductions:
      "Nova Scotia offers an Affordable Living Tax Credit — a quarterly refundable payment for lower-income households, income-tested based on family composition and administered through the CRA alongside federal benefit payments.\n\nStandard non-refundable provincial credits for medical expenses, disability, donations, and the age amount are available at the 8.79% credit rate. Despite the low BPA of $8,481 in 2025 — the lowest in Canada — the credit still reduces provincial tax by approximately $746 for every resident. Nova Scotia applies a 15% HST on most goods and services throughout the province.",
  },

  'NS-2026': {
    code: 'NS',
    year: 2026,
    intro:
      "For 2026, Nova Scotia significantly increased its basic personal amount from $8,481 to $11,744 — the largest BPA increase in Atlantic Canada — while leaving the five bracket rates unchanged.",
    howItWorks:
      "Nova Scotia's five bracket rates are unchanged for 2026: 8.79% on the first $29,590, 14.95% from $29,590 to $59,180, 16.67% from $59,180 to $93,000, 17.5% from $93,000 to $154,650, and 21% above $154,650. The top threshold is indexed from 2025's $150,000.\n\nThe BPA rises from $8,481 to $11,744 for 2026 — a policy-driven increase that goes well beyond standard indexation. This increases the non-refundable credit at 8.79% from approximately $746 to approximately $1,033, an improvement of $287. For lower earners whose income is close to the old BPA level, the increase may eliminate some or all of their provincial tax.\n\nDespite the improvement, Nova Scotia's 2026 BPA of $11,744 remains below the Canadian median among all provinces and territories. The increase narrows the historic gap but does not close it. The wide rate spread — from 8.79% at the bottom to 21% at the top — continues to characterize the province's graduated tax structure.",
    provincialQuirks:
      "The 2026 BPA increase is a policy-driven change, not standard indexation. It represents the most notable shift in Nova Scotia's tax structure in recent years and meaningfully improves the effective rate for all earners, with the largest proportional impact for those with income close to the BPA threshold.\n\nThe wide rate spread (8.79% to 21%) and low BPA continue to characterize Nova Scotia's tax structure even after the 2026 improvement.",
    recentChanges:
      "The BPA increased substantially to $11,744 for 2026, up from $8,481 in 2025. This is a deliberate policy increase and one of the more significant provincial BPA changes for the 2026 tax year.",
    creditsAndDeductions:
      "The Affordable Living Tax Credit continues in 2026 as a quarterly refundable payment for lower-income Nova Scotia households. The credit is income-tested based on family composition and administered through the CRA alongside federal benefits.\n\nThe substantial BPA increase to $11,744 provides meaningful new base relief for all earners — the non-refundable credit is now worth approximately $1,033, up from $746 in 2025. Standard non-refundable provincial credits for medical expenses, disability, donations, and the age amount continue at the 8.79% credit rate. The 15% HST applies to most goods and services in Nova Scotia.",
  },

  // ─── Prince Edward Island ────────────────────────────────────────────────────

  'PE-2025': {
    code: 'PE',
    year: 2025,
    intro:
      "Prince Edward Island operates five income tax brackets from 9.5% to 19%, following a restructuring that moved the province from a simpler schedule to a more graduated system with multiple intermediate rates.",
    howItWorks:
      "For 2025, PEI's five brackets run: 9.5% on the first $32,656, 13.47% from $32,656 to $64,313, 16.6% from $64,313 to $105,000, 17.62% from $105,000 to $140,000, and 19% above $140,000.\n\nThe BPA is $12,000 for 2025, generating a non-refundable credit at the 9.5% rate — worth approximately $1,140. The credit applies uniformly regardless of the taxpayer's income bracket, so both low and high earners benefit by the same $1,140. Like Nova Scotia and New Brunswick, PEI applies a 15% HST on most goods and services.\n\nThe five-bracket structure was introduced to create more progressive graduation across income levels. The jump from 9.5% to 13.47% at $32,656 is the sharpest step-up in the schedule. For most PEI residents whose income falls between the first and fourth brackets, the effective rate is meaningfully higher than the 9.5% floor suggests. The top 19% bracket applies only to income above $140,000.",
    provincialQuirks:
      "PEI is Canada's smallest province by population and geography, with a tax base that relies significantly on equalization transfers from the federal government. The province's five-bracket reform was part of a broader effort to align its tax structure with larger provinces.\n\nThe low-income tax reduction on the PEI return can reduce or eliminate provincial tax for residents below the phase-out threshold.",
    recentChanges:
      "For 2025, thresholds reflect standard indexation. No structural changes.",
    creditsAndDeductions:
      "Prince Edward Island offers a low-income tax reduction on provincial Form PE428, which phases out as net income rises above the applicable threshold. Any unused portion may be transferred to a spouse or common-law partner.\n\nStandard non-refundable provincial credits for medical expenses, disability, charitable donations, the caregiver amount, and the age amount are available at the 9.5% credit rate. PEI applies a 15% HST on most goods and services throughout the province. The province does not operate a major province-specific refundable credit program comparable to Ontario's Trillium Benefit.",
  },

  'PE-2026': {
    code: 'PE',
    year: 2026,
    intro:
      "For 2026, Prince Edward Island increased its basic personal amount to $14,250 — a jump of $2,250 from 2025's $12,000, one of the larger proportional BPA increases among Canadian provinces.",
    howItWorks:
      "For 2026, PEI's five brackets continue with indexed thresholds: 9.5% on the first $33,328, 13.47% from $33,328 to $64,656, 16.6% from $64,656 to $105,000, 17.62% from $105,000 to $140,000, and 19% above $140,000. The top two thresholds are not indexed and remain unchanged from 2025.\n\nThe BPA rises from $12,000 to $14,250 for 2026 — a $2,250 increase representing the most significant policy change in PEI's tax structure for the year. This generates a non-refundable credit of approximately $1,354 at the 9.5% rate, an increase of $214 over 2025. Every PEI taxpayer benefits from this change, with the largest proportional effect for those with income close to or below the new BPA threshold.\n\nThe 15% HST remains unchanged, applying to most goods and services throughout PEI. The five-bracket rate schedule is also unchanged; only the BPA and the first bracket ceiling moved for 2026.",
    provincialQuirks:
      "The 2026 BPA increase is a policy-driven change that exceeds standard indexation. For a lower earner, the additional $214 in credit meaningfully reduces their PEI provincial bill.\n\nPEI's five-bracket structure and the low-income tax reduction remain unchanged for 2026.",
    recentChanges:
      "The BPA increases to $14,250 for 2026, up from $12,000. This is a deliberate policy increase, not standard indexation, and represents the most significant change to PEI's tax structure for the 2026 year.",
    creditsAndDeductions:
      "Prince Edward Island's low-income tax reduction continues in 2026, providing relief for residents whose net income falls below the phase-out threshold. The reduction is calculated on provincial Form PE428 and can be transferred to a spouse if not fully used.\n\nWith the BPA now at $14,250, the base non-refundable credit at 9.5% is worth approximately $1,354 — up from $1,140 in 2025. Standard non-refundable credits for medical expenses, disability, charitable donations, and the age amount remain available at the 9.5% credit rate. PEI applies a 15% HST on most goods and services.",
  },

  // ─── Newfoundland and Labrador ───────────────────────────────────────────────

  'NL-2025': {
    code: 'NL',
    year: 2025,
    intro:
      "Newfoundland and Labrador applies eight income tax brackets — more than any other province — with rates from 8.7% to 21.8%, producing the highest combined marginal income tax rate in Canada for top earners.",
    howItWorks:
      "For 2025, NL's eight brackets run: 8.7% on the first $43,198, 14.5% to $86,395, 15.8% to $154,244, 17.8% to $215,943, 19.8% to $275,870, 20.8% to $551,739, 21.3% to $1,103,478, and 21.8% above $1,103,478.\n\nThe BPA is $10,818 — one of the lower amounts in Canada — generating a non-refundable credit at 8.7%, worth approximately $941. With the low BPA, provincial tax begins accumulating at relatively modest income levels.\n\nFor high earners, NL's 21.8% top rate combines with the 33% federal rate to produce a combined marginal rate above 54% — the highest of any Canadian province. For most residents whose income falls below $100,000, only the first two or three brackets are relevant.",
    provincialQuirks:
      "Eight brackets is unusual — most provinces use three to five. The additional brackets above $275,870 exist primarily to progressively increase tax on very high earners; the three top brackets only apply above $275,870, $551,739, and $1,103,478 respectively. For the vast majority of NL residents, those tiers are academic.\n\nNL applies a 15% HST on most goods and services. The province has historically relied on offshore oil revenues to supplement its budget.",
    recentChanges:
      "For 2025, thresholds reflect standard annual indexation. No structural changes to the rate schedule.",
    creditsAndDeductions:
      "Newfoundland and Labrador provides an Income Supplement for lower-income residents. For seniors, the Seniors' Benefit pays up to approximately $1,551 annually for those with net income at or below $30,078, phasing out at 11.66% above that threshold until it reaches zero around $43,380.\n\nStandard non-refundable provincial credits are available at the 8.7% rate. A low-income tax reduction is also available on the provincial return.",
  },

  'NL-2026': {
    code: 'NL',
    year: 2026,
    intro:
      "Newfoundland and Labrador's eight-bracket structure continues for 2026 with indexed thresholds. The BPA remains at $10,818 — one of the few provinces that did not increase its BPA for 2026.",
    howItWorks:
      "For 2026, Newfoundland and Labrador maintains its eight-bracket structure: 8.7% on the first $44,192, 14.5% from $44,192 to $88,382, 15.8% from $88,382 to $157,792, 17.8% from $157,792 to $220,910, 19.8% from $220,910 to $282,214, 20.8% from $282,214 to $564,429, 21.3% from $564,429 to $1,128,858, and 21.8% above $1,128,858. Rates are unchanged from 2025; only the thresholds are indexed upward.\n\nThe BPA remains $10,818 for 2026 — unchanged from 2025. NL is unusual in not increasing its BPA for 2026 when most provinces made at least a small upward adjustment. The credit at 8.7% is worth approximately $941, the same as in 2025.\n\nFor the large majority of NL residents whose income falls below $88,000, only the first two brackets are relevant: 8.7% and 14.5%. The top five brackets — from 15.8% upward — apply to a relatively small portion of the province's tax filers. The combined marginal rate at the top (33% federal + 21.8% NL = 54.8%) is the highest of any Canadian province.",
    provincialQuirks:
      "Newfoundland and Labrador continues to have both the most brackets and the highest top combined marginal rate of any province. The 15% HST also continues.\n\nFor the highest earners, the 2026 combined rate (33% federal + 21.8% NL) remains above 54%.",
    recentChanges:
      "For 2026, bracket thresholds are indexed upward from 2025. The BPA is unchanged at $10,818 — NL did not increase the amount for 2026, unlike most other provinces.",
    creditsAndDeductions:
      "Newfoundland and Labrador's Income Supplement continues in 2026 for lower-income residents. The Seniors' Benefit pays up to approximately $1,551 annually for seniors with net income at or below roughly $30,000, phasing out above that threshold.\n\nA low-income tax reduction is also available on the provincial NL428 form. Standard non-refundable credits for medical expenses, disability, charitable donations, and the age amount are calculated at the 8.7% credit rate. NL applies a 15% HST on most goods and services, and the province continues to levy one of the highest combined top marginal income tax rates in Canada.",
  },

  // ─── Yukon ───────────────────────────────────────────────────────────────────

  'YT-2025': {
    code: 'YT',
    year: 2025,
    intro:
      "Yukon mirrors the federal bracket thresholds in its territorial income tax — an approach that keeps Yukon's schedule synchronized with federal changes each year — with rates ranging from 6.4% to 15%.",
    howItWorks:
      "For 2025, Yukon's five brackets align with the federal thresholds: 6.4% on the first $57,375, 9% from $57,375 to $114,750, 10.9% from $114,750 to $177,882, 12.8% from $177,882 to $500,000, and 15% above $500,000. Because Yukon mirrors the federal schedule, the territorial brackets and the federal brackets step in and out at exactly the same income levels.\n\nThe Yukon BPA mirrors the federal BPA at $16,129, generating a non-refundable credit at 6.4% — worth approximately $1,032. For lower earners, this territorial credit combines with the federal BPA credit (at 14.5% for 2025) to produce a combined base-income shelter worth over $3,000.\n\nThe top combined marginal rate (33% federal + 15% Yukon) is 48% for earners above $500,000. This compares favourably to southern provinces, where top combined rates range from 47.5% (AB) to approximately 58% (QC). Most Yukon residents — whose median income is in the $60,000–$90,000 range — are in the federal 20.5% bracket and the Yukon 9% bracket for most of their income.",
    provincialQuirks:
      "Yukon's bracket mirroring is a practical approach for a small territory: by tying to the federal schedule, Yukon automatically adjusts each year without independent indexation decisions. The federal and territorial thresholds remain synchronized.\n\nFor Yukon residents, the Northern Residents Deduction (NRD) — federal Form T2222 — is the most impactful tax provision available. Residents of prescribed northern zones may deduct a fixed amount per day of residency. For 2025, the basic residency amount in the northern zone is $11 per day, yielding up to $4,015 for a full year of residency. Travel deductions for trips outside Yukon for personal or medical purposes can add substantially more. The NRD reduces net income before both federal and territorial rates apply.",
    recentChanges:
      "For 2025, Yukon's bracket thresholds reflect the 2.0% federal indexation. No structural changes.",
    creditsAndDeductions:
      "The Yukon Child Benefit provides a quarterly supplement for families with children. The benefit is income-tested and paid through the CRA alongside the Canada Child Benefit.\n\nThe Northern Residents Deduction (federal T2222) is not a territorial credit but is the most valuable tax provision for full-year Yukon residents. The basic residency deduction alone can exceed $4,000 annually, reducing both federal and territorial tax simultaneously.",
  },

  'YT-2026': {
    code: 'YT',
    year: 2026,
    intro:
      "Yukon's bracket thresholds mirror the 2026 federal schedule, with the bottom ceiling rising to $58,523 and the BPA matching the federal amount at $16,452.",
    howItWorks:
      "For 2026, Yukon's five brackets mirror the 2026 federal thresholds: 6.4% on the first $58,523, 9% from $58,523 to $117,045, 10.9% from $117,045 to $181,440, 12.8% from $181,440 to $500,000, and 15% above $500,000. Each threshold reflects the 2026 federal indexation increase.\n\nThe BPA increases to $16,452, matching the federal BPA, and generates a non-refundable credit of approximately $1,053 at the 6.4% rate. Earners at every income level benefit from this increase, which is worth about $21 more in credit than the 2025 amount.\n\nYukon continues to have the lowest combined top marginal rate of any province or territory in Canada: 48% (33% federal + 15% Yukon). This makes Yukon particularly competitive for high-income earners relative to provinces like BC, QC, and NL, where top combined rates approach or exceed 54%. The federal bottom rate reduction from 14.5% (2025) to 14% (2026) also reduces Yukon residents' federal bill slightly.",
    provincialQuirks:
      "Yukon's federal-mirror structure means 2026 territorial thresholds automatically match the 2026 federal schedule. The NRD continues as the most impactful available deduction for full-year residents.\n\nFor 2026, the NRD basic residency amount for the northern zone is $11 per day — unchanged from 2025.",
    recentChanges:
      "For 2026, Yukon's bracket thresholds rise with the federal 2.0% indexation. The BPA increases to $16,452.",
    creditsAndDeductions:
      "The Yukon Child Benefit continues in 2026, providing a quarterly income-tested payment for families with children delivered through the CRA alongside the Canada Child Benefit.\n\nThe federal Northern Residents Deduction (T2222) remains the most valuable tax tool for Yukon residents — the basic residency component is $11 per day ($4,015 for a full year), plus a travel deduction for up to two trips per year south of the northern zone. Yukon also offers a small business tax credit and a territorial political contribution tax credit. Standard non-refundable territorial credits for medical expenses, disability, donations, and the age amount are available at the 6.4% territorial rate.",
  },

  // ─── Northwest Territories ───────────────────────────────────────────────────

  'NT-2025': {
    code: 'NT',
    year: 2025,
    intro:
      "The Northwest Territories applies four income tax brackets from 5.9% to 14.05%, with one of the highest basic personal amounts in Canada at $16,593 — reflecting the territory's recognition of high northern living costs.",
    howItWorks:
      "For 2025, the Northwest Territories has four income tax brackets: 5.9% on the first $50,597, 8.6% from $50,597 to $101,198, 12.2% from $101,198 to $164,525, and 14.05% above $164,525.\n\nThe BPA is $16,593 for 2025, generating a non-refundable credit at the 5.9% rate — worth approximately $979. Because the BPA is high relative to many provinces and the credit rate is low, the BPA credit in NWT shelters a large nominal amount of income while yielding a moderate absolute reduction in territorial tax.\n\nNWT's top combined marginal rate (33% federal + 14.05% NWT) is approximately 47.05% — among the lowest in Canada. Earners in the broad middle bracket ($50,597 to $101,198) face a combined marginal rate of roughly 34.6% (26% federal + 8.6% NWT), which is competitive with rates in the southern provinces at similar income levels.",
    provincialQuirks:
      "Like the other territories, the Northwest Territories has a significant proportion of its residents eligible for the Northern Residents Deduction (federal T2222). All NWT communities qualify for either the northern or intermediate zone, making the deduction broadly available. The basic residency deduction for the northern zone is $11 per day in 2025, providing up to $4,015 annually for full-year residents. Combined with the NRD travel component and NWT's relatively low territorial rates, the effective tax burden for NWT residents is competitive.\n\nThe NWT eliminated its Cost of Living Tax Credit on April 1, 2025, when the territory removed the consumer carbon tax. This quarterly credit had previously provided approximately $416 per adult and $480 per child; those payments are no longer being issued.",
    recentChanges:
      "The NWT Cost of Living Tax Credit was discontinued in April 2025 following the territory's removal of the consumer carbon tax. Residents who previously received this quarterly credit will not receive further payments.",
    creditsAndDeductions:
      "The Northern Residents Deduction (federal T2222) is the most significant available deduction for NWT residents and is a federal provision applicable across all three territories. It reduces net income before both federal and territorial rates are applied.\n\nNWT offers standard non-refundable territorial credits on the T2 equivalent at the 5.9% rate.",
  },

  'NT-2026': {
    code: 'NT',
    year: 2026,
    intro:
      "The Northwest Territories continues with four income tax brackets for 2026, with a substantially higher BPA of $17,842 — up from $16,593 in 2025.",
    howItWorks:
      "For 2026, the Northwest Territories continues with four income tax brackets: 5.9% on the first $51,964, 8.6% from $51,964 to $103,930, 12.2% from $103,930 to $168,967, and 14.05% above $168,967. Thresholds are indexed upward from 2025.\n\nThe BPA rises substantially to $17,842 for 2026 — an increase of $1,249 from $16,593. This generates a non-refundable credit of approximately $1,053 at the 5.9% rate, about $74 more than 2025. The larger BPA means the first $17,842 of income is effectively tax-free at the territorial level for all NWT residents.\n\nNWT's top combined rate (33% federal + 14.05% NWT = 47.05%) remains among the lowest in Canada and is well below the top rates in provinces such as BC, QC, and NL. The bottom combined rate — for earners whose income stays within the first bracket — is just under 20% federal and territorial combined.",
    provincialQuirks:
      "The Northern Residents Deduction continues for 2026. All NWT communities remain in the northern or intermediate zone, making the deduction broadly applicable.\n\nThe Cost of Living Tax Credit, discontinued in 2025, is not reinstated for 2026.",
    recentChanges:
      "The BPA increases to $17,842 for 2026 (from $16,593). Bracket thresholds are indexed. The Cost of Living Tax Credit, cancelled in 2025, remains discontinued.",
    creditsAndDeductions:
      "The federal Northern Residents Deduction (T2222) continues to be the most valuable available deduction for NWT residents. All NWT communities qualify for either the northern or intermediate zone, making the basic residency deduction of $11 per day ($4,015 for a full year) broadly accessible. The travel component can significantly increase the total deduction for residents who travel for personal or medical reasons.\n\nThe NWT Cost of Living Tax Credit, which provided quarterly payments to offset the consumer carbon tax, was discontinued in April 2025 and is not reinstated for 2026. Standard non-refundable territorial credits for medical expenses, disability, donations, and the age amount are available at the 5.9% territorial credit rate.",
  },

  // ─── Nunavut ──────────────────────────────────────────────────────────────────

  'NU-2025': {
    code: 'NU',
    year: 2025,
    intro:
      "Nunavut levies the lowest personal income tax of any Canadian jurisdiction — a 4% bottom rate and an 11.5% top rate — alongside significant federal credits and deductions tailored to northern residents.",
    howItWorks:
      "For 2025, Nunavut's four brackets run: 4% on the first $53,268, 7% from $53,268 to $106,537, 9% from $106,537 to $173,205, and 11.5% above $173,205.\n\nThe BPA is $18,799 for 2025, generating a non-refundable credit at the 4% rate — worth approximately $752. The unusually low credit rate means that despite a high BPA, the absolute dollar value of the BPA credit is modest compared with provinces where the bottom rate is 8–10%. Nunavut's tax saving from the BPA is similar in dollar terms to a province with a lower BPA but a higher bottom rate.\n\nThe top combined marginal rate (33% federal + 11.5% Nunavut) is approximately 44.5% — the lowest of any province or territory in Canada. For a median-income Nunavut earner, the combined federal and territorial income tax rate is well below the Canadian average, a deliberate policy offset for the territory's exceptionally high cost of living.",
    provincialQuirks:
      "Nunavut's extremely low tax rates reflect an economic policy aimed at offsetting some of the highest cost-of-living conditions in the country. Most communities are accessible only by air or winter road, and consumer prices for food, housing, and goods far exceed southern Canadian averages.\n\nVirtually all Nunavut communities qualify for the Northern Residents Deduction (federal T2222) at the northern zone rate. For a full-year resident, the basic residency deduction is $11 per day — $4,015 annually — and travel deduction claims for trips outside the territory can be substantial. Because Nunavut is a fly-in-or-nothing territory for most residents, travel expense claims are especially impactful here compared to other northern jurisdictions.",
    recentChanges:
      "For 2025, thresholds reflect standard indexation. No structural changes.",
    creditsAndDeductions:
      "The Nunavut Child Benefit provides $348 per year per eligible child for families with net income at or below $22,065. A Territorial Workers' Supplement adds up to $290 for the first child and $79 for the second child, for families earning at least $3,955 in working income. Both are paid monthly as part of the Canada Child Benefit payment.\n\nThe Northern Residents Deduction (T2222) is the most valuable deduction available to Nunavut residents. The combination of the NRD, the high BPA, and low territorial rates means effective territorial tax for many full-year Nunavut residents is minimal.",
  },

  'NU-2026': {
    code: 'NU',
    year: 2026,
    intro:
      "Nunavut's four-bracket structure continues for 2026 with the lowest rates in the country and a modestly higher BPA of $19,297.",
    howItWorks:
      "For 2026, Nunavut's four brackets are: 4% on the first $54,707, 7% from $54,707 to $109,413, 9% from $109,413 to $177,881, and 11.5% above $177,881. Thresholds are indexed upward from 2025.\n\nThe BPA rises to $19,297 for 2026, generating a non-refundable credit of approximately $772 at the 4% rate. The $498 BPA increase over 2025 translates to approximately $20 in additional tax savings — modest in dollar terms because the 4% credit rate is the lowest in Canada.\n\nThe top combined rate (33% federal + 11.5% Nunavut = 44.5%) remains the lowest in Canada, unchanged from 2025. Nunavut's rate structure has been stable for several years: the rates and relative ordering of the four brackets have not changed, though thresholds move with indexation. For most Nunavut residents, the most significant tax provision is not the territorial rate schedule itself but the federal Northern Residents Deduction, which reduces net income before any rates are applied.",
    provincialQuirks:
      "Nunavut's low-rate structure continues unchanged. The Northern Residents Deduction (T2222) remains a key federal provision for all Nunavut residents, and the Nunavut Child Benefit provides supplemental income support for families.\n\nThe 4% bottom rate and 11.5% top rate are both unchanged from 2025.",
    recentChanges:
      "The BPA increases to $19,297 for 2026 (from $18,799). Bracket thresholds are indexed upward.",
    creditsAndDeductions:
      "The Nunavut Child Benefit continues in 2026, providing $348 per eligible child annually for families with net income at or below approximately $22,065. The Territorial Workers' Supplement adds up to $290 for the first child and $79 for the second for working families. Both components are delivered monthly alongside the Canada Child Benefit and are non-taxable.\n\nThe federal Northern Residents Deduction (T2222) remains the most impactful available deduction for Nunavut residents. With the basic residency deduction at $11 per day and travel deductions for trips outside the territory, the total NRD claim can significantly reduce net income. Standard non-refundable territorial credits for medical expenses, disability, charitable donations, and the age amount are available at the 4% territorial credit rate.",
  },

};

export function getProvinceContent(code: string, year: TaxYear): ProvinceContent {
  const content = CONTENT[`${code}-${year}`];
  if (!content) {
    throw new Error(`No province content for ${code}-${year}`);
  }
  return content;
}

/** All province codes that have content defined (both years). */
export const CONTENT_PROVINCE_CODES = [
  'BC', 'AB', 'ON', 'SK', 'MB', 'QC', 'NB', 'NS', 'PE', 'NL', 'YT', 'NT', 'NU',
] as const;
