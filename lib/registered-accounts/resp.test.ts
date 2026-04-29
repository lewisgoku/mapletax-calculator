import { describe, it, expect } from 'vitest';
import { projectCesg } from './resp';
import { RESP_2026 } from './2026';

const D = RESP_2026;

describe('projectCesg', () => {
  it('age 5, $2,500 contribution → $500 CESG, $6,700 lifetime remaining', () => {
    const result = projectCesg(
      {
        beneficiaryBirthYear: 2021,
        currentYear: 2026,
        annualContribution: 2500,
        totalContributionsToDate: 0,
        totalCesgReceivedToDate: 0,
      },
      D,
    );
    expect(result.isEligibleThisYear).toBe(true);
    expect(result.cesgThisYear).toBe(500);
    expect(result.additionalCesgThisYear).toBe(0);
    expect(result.cesgRemainingLifetime).toBe(6700);
    expect(result.warningMessage).toBeNull();
  });

  it('age 10, $1,000 contribution → $200 CESG (20% × $1,000)', () => {
    const result = projectCesg(
      {
        beneficiaryBirthYear: 2016,
        currentYear: 2026,
        annualContribution: 1000,
        totalContributionsToDate: 0,
        totalCesgReceivedToDate: 0,
      },
      D,
    );
    expect(result.cesgThisYear).toBe(200);
    expect(result.isEligibleThisYear).toBe(true);
  });

  it('age 3, $5,000 contribution → $500 CESG (capped at 20% × $2,500)', () => {
    const result = projectCesg(
      {
        beneficiaryBirthYear: 2023,
        currentYear: 2026,
        annualContribution: 5000,
        totalContributionsToDate: 0,
        totalCesgReceivedToDate: 0,
      },
      D,
    );
    expect(result.cesgThisYear).toBe(500);
  });

  it('beneficiary turns 18 this year → not eligible, $0 CESG', () => {
    // Born 2008, turns 18 in 2026 — last eligible year was 2025 (age 17)
    const result = projectCesg(
      {
        beneficiaryBirthYear: 2008,
        currentYear: 2026,
        annualContribution: 2500,
        totalContributionsToDate: 0,
        totalCesgReceivedToDate: 0,
      },
      D,
    );
    expect(result.isEligibleThisYear).toBe(false);
    expect(result.cesgThisYear).toBe(0);
    expect(result.yearsOfEligibilityRemaining).toBe(0);
  });

  it('beneficiary turns 17, meetsAge17Requirements false → $0 CESG with warning', () => {
    // Born 2009, turns 17 in 2026 — last eligible year, but conditions not met
    const result = projectCesg(
      {
        beneficiaryBirthYear: 2009,
        currentYear: 2026,
        annualContribution: 2500,
        totalContributionsToDate: 500,
        totalCesgReceivedToDate: 0,
        meetsAge17Requirements: false,
      },
      D,
    );
    expect(result.cesgThisYear).toBe(0);
    expect(result.warningMessage).not.toBeNull();
    expect(result.isEligibleThisYear).toBe(true);
  });

  it('family income below low-income threshold → Additional CESG on first $500', () => {
    const result = projectCesg(
      {
        beneficiaryBirthYear: 2020,
        currentYear: 2026,
        annualContribution: 2500,
        totalContributionsToDate: 0,
        totalCesgReceivedToDate: 0,
        familyNetIncome: 40000,
      },
      D,
    );
    expect(result.cesgThisYear).toBe(500);
    // 20% on first $500 = $100
    expect(result.additionalCesgThisYear).toBe(100);
    expect(result.totalCesgThisYear).toBe(600);
  });

  it('family income in mid-income band → 10% Additional CESG on first $500', () => {
    const result = projectCesg(
      {
        beneficiaryBirthYear: 2020,
        currentYear: 2026,
        annualContribution: 2500,
        totalContributionsToDate: 0,
        totalCesgReceivedToDate: 0,
        familyNetIncome: 80000,
      },
      D,
    );
    // 10% on first $500 = $50
    expect(result.additionalCesgThisYear).toBe(50);
    expect(result.totalCesgThisYear).toBe(550);
  });

  it('CESG already at $7,000 lifetime, $1,000 contribution → only $200 CESG (capped at $200 remaining)', () => {
    const result = projectCesg(
      {
        beneficiaryBirthYear: 2016,
        currentYear: 2026,
        annualContribution: 1000,
        totalContributionsToDate: 30000,
        totalCesgReceivedToDate: 7000,
      },
      D,
    );
    // 20% × $1,000 = $200; lifetime room = 7200 − 7000 = $200; min($200, $200) = $200
    expect(result.cesgThisYear).toBe(200);
    expect(result.cesgRemainingLifetime).toBe(0);
  });

  it('CESG already at $7,200 lifetime → $0 CESG even with contribution', () => {
    const result = projectCesg(
      {
        beneficiaryBirthYear: 2016,
        currentYear: 2026,
        annualContribution: 2500,
        totalContributionsToDate: 40000,
        totalCesgReceivedToDate: 7200,
      },
      D,
    );
    expect(result.cesgThisYear).toBe(0);
    expect(result.cesgRemainingLifetime).toBe(0);
  });

  it('yearsOfEligibilityRemaining counts correctly for young beneficiary', () => {
    // Born 2020, current year 2026, age 6. Last eligible year = 2037.
    // Years remaining = 2037 − 2026 + 1 = 12
    const result = projectCesg(
      {
        beneficiaryBirthYear: 2020,
        currentYear: 2026,
        annualContribution: 2500,
        totalContributionsToDate: 0,
        totalCesgReceivedToDate: 0,
      },
      D,
    );
    expect(result.yearsOfEligibilityRemaining).toBe(12);
  });

  it('lifetimeContributionRemaining reflects contributions to date', () => {
    const result = projectCesg(
      {
        beneficiaryBirthYear: 2015,
        currentYear: 2026,
        annualContribution: 2500,
        totalContributionsToDate: 15000,
        totalCesgReceivedToDate: 0,
      },
      D,
    );
    expect(result.lifetimeContributionRemaining).toBe(35000);
  });
});
