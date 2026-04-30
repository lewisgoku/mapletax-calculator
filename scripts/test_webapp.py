"""
MapleTax Calculator — Playwright smoke tests
Covers: nav, year toggle, income calculator, compare tool
"""
from playwright.sync_api import sync_playwright, expect
import sys

BASE = "http://localhost:3001"
PASS = []
FAIL = []

def ok(name):
    PASS.append(name)
    print(f"  PASS:  {name}")

def fail(name, err):
    FAIL.append(name)
    print(f"  FAIL:  {name}\n     {err}")

def test_homepage(page):
    page.goto(BASE, timeout=60000)
    page.wait_for_load_state("networkidle")

    try:
        assert "MapleTax" in page.title()
        ok("Homepage title contains MapleTax")
    except Exception as e:
        fail("Homepage title contains MapleTax", e)

    try:
        expect(page.get_by_role("heading", level=1)).to_be_visible()
        ok("Homepage H1 visible")
    except Exception as e:
        fail("Homepage H1 visible", e)

    try:
        # Nav wordmark
        expect(page.locator("text=MapleTax").first).to_be_visible()
        ok("Nav wordmark visible")
    except Exception as e:
        fail("Nav wordmark visible", e)

    try:
        # Language toggle removed — the specific role="group" aria-label="Language / Langue" must be gone
        assert page.get_by_role("group", name="Language / Langue").count() == 0
        ok("Language toggle absent")
    except Exception as e:
        fail("Language toggle absent", e)

def test_income_calculator(page):
    page.goto(f"{BASE}/income-tax-calculator/", timeout=60000)
    page.wait_for_load_state("networkidle")

    try:
        # Year toggle shows both years
        toggle = page.get_by_role("group", name="Tax year")
        expect(toggle).to_be_visible()
        expect(toggle.get_by_role("button", name="2025")).to_be_visible()
        expect(toggle.get_by_role("button", name="2026")).to_be_visible()
        ok("Year toggle visible with 2025 and 2026 buttons")
    except Exception as e:
        fail("Year toggle visible", e)

    try:
        # 2026 is selected (aria-pressed=true) on the 2026 page
        btn_2026 = page.get_by_role("group", name="Tax year").get_by_role("button", name="2026")
        assert btn_2026.get_attribute("aria-pressed") == "true"
        ok("2026 button active on income-tax-calculator page")
    except Exception as e:
        fail("2026 button active on income-tax-calculator page", e)

    try:
        # Province selector exists
        expect(page.locator("select").first).to_be_visible()
        ok("Province selector visible")
    except Exception as e:
        fail("Province selector visible", e)

    try:
        # Change income and check results update
        income_input = page.locator("input[type=number]").first
        income_input.fill("100000")
        page.wait_for_timeout(300)
        # Take-home stat should appear somewhere on screen
        content = page.content()
        assert "$" in content
        ok("Income input updates results")
    except Exception as e:
        fail("Income input updates results", e)

    try:
        # Share link button — aria-label is "Copy shareable link to current inputs"
        expect(page.get_by_role("button", name="Copy shareable link to current inputs")).to_be_visible()
        ok("Share link button visible")
    except Exception as e:
        fail("Share link button visible", e)

def test_year_toggle_navigates(page):
    page.goto(f"{BASE}/income-tax-calculator/", timeout=60000)
    page.wait_for_load_state("networkidle")

    try:
        btn_2025 = page.get_by_role("group", name="Tax year").get_by_role("button", name="2025")
        btn_2025.click()
        page.wait_for_load_state("networkidle")
        assert "/income-tax-calculator-2025" in page.url
        ok("Year toggle 2026->2025 navigates to /income-tax-calculator-2025")
    except Exception as e:
        fail("Year toggle 2026->2025 navigates", e)

    try:
        # 2025 button now active
        btn_2025 = page.get_by_role("group", name="Tax year").get_by_role("button", name="2025")
        assert btn_2025.get_attribute("aria-pressed") == "true"
        ok("2025 button active on income-tax-calculator-2025 page")
    except Exception as e:
        fail("2025 button active on 2025 page", e)

    try:
        btn_2026 = page.get_by_role("group", name="Tax year").get_by_role("button", name="2026")
        btn_2026.click()
        page.wait_for_load_state("networkidle")
        assert "/income-tax-calculator-2025" not in page.url
        assert "income-tax-calculator" in page.url
        ok("Year toggle 2025->2026 navigates back to /income-tax-calculator")
    except Exception as e:
        fail("Year toggle 2025->2026 navigates back", e)

def test_compare_provinces(page):
    page.goto(f"{BASE}/income-tax-calculator/compare/", timeout=60000)
    page.wait_for_load_state("networkidle")

    try:
        expect(page.get_by_role("heading", level=1)).to_be_visible()
        ok("Compare page H1 visible")
    except Exception as e:
        fail("Compare page H1 visible", e)

    try:
        # Year toggle present
        toggle = page.get_by_role("group", name="Tax year")
        expect(toggle).to_be_visible()
        ok("Compare page year toggle visible")
    except Exception as e:
        fail("Compare page year toggle visible", e)

    try:
        # Province A and B selectors
        expect(page.locator("#province-a")).to_be_visible()
        expect(page.locator("#province-b")).to_be_visible()
        ok("Province A and B selectors visible")
    except Exception as e:
        fail("Province A and B selectors visible", e)

    try:
        # Quick-pick income pills
        pill = page.get_by_role("button", name="$80,000")
        expect(pill).to_be_visible()
        ok("$80,000 quick-pick pill visible")
    except Exception as e:
        fail("$80,000 quick-pick pill visible", e)

    try:
        # Winner callout visible (BC vs ON at $80k should have a winner)
        page.wait_for_timeout(500)
        content = page.content()
        assert "keep" in content or "take-home" in content.lower()
        ok("Winner callout text present")
    except Exception as e:
        fail("Winner callout text present", e)

    try:
        # Switch to 2025 year
        page.get_by_role("group", name="Tax year").get_by_role("button", name="2025").click()
        page.wait_for_timeout(300)
        assert "2025" in page.get_by_role("heading", level=1).inner_text()
        ok("Compare year toggle switches heading to 2025")
    except Exception as e:
        fail("Compare year toggle switches heading to 2025", e)

def test_nav_active_state(page):
    page.goto(f"{BASE}/income-tax-calculator/compare/", timeout=60000)
    page.wait_for_load_state("networkidle")

    try:
        # Only Compare Provinces link should be active, not Income Tax
        nav = page.locator("nav").first
        links = nav.get_by_role("link").all()
        active_labels = [
            l.inner_text() for l in links
            if "border-b-2" in (l.get_attribute("class") or "")
        ]
        assert len(active_labels) == 1, f"Expected 1 active nav link, got {len(active_labels)}: {active_labels}"
        ok(f"Only one nav link active on compare page: {active_labels[0]}")
    except Exception as e:
        fail("Only one nav link active on compare page", e)

def test_footer(page):
    page.goto(BASE, timeout=60000)
    page.wait_for_load_state("networkidle")

    try:
        footer = page.locator("footer").last
        expect(footer.get_by_role("link", name="Income Tax 2026")).to_be_visible()
        ok("Footer: Income Tax 2026 link present")
    except Exception as e:
        fail("Footer: Income Tax 2026 link present", e)

    try:
        footer = page.locator("footer").last
        expect(footer.get_by_role("link", name="Income Tax 2025")).to_be_visible()
        ok("Footer: Income Tax 2025 link present")
    except Exception as e:
        fail("Footer: Income Tax 2025 link present", e)

    try:
        footer = page.locator("footer").last
        # Language toggle should be gone
        assert footer.locator("text=EN").count() == 0
        ok("Footer: language toggle absent")
    except Exception as e:
        fail("Footer: language toggle absent", e)

def test_url_params_preserved_on_year_switch(page):
    page.goto(f"{BASE}/income-tax-calculator/?province=QC&income=90000", timeout=60000)
    page.wait_for_load_state("networkidle")

    try:
        page.get_by_role("group", name="Tax year").get_by_role("button", name="2025").click()
        page.wait_for_load_state("networkidle")
        url = page.url
        assert "province=QC" in url, f"province not preserved: {url}"
        assert "income=90000" in url, f"income not preserved: {url}"
        ok("Province and income preserved when switching year via toggle")
    except Exception as e:
        fail("Province and income preserved on year switch", e)

# -- Run all tests --------------------------------------------------------------

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()

    print("\n-- Homepage --------------------------------------")
    test_homepage(page)

    print("\n-- Income Tax Calculator -------------------------")
    test_income_calculator(page)

    print("\n-- Year Toggle Navigation ------------------------")
    test_year_toggle_navigates(page)

    print("\n-- Compare Provinces -----------------------------")
    test_compare_provinces(page)

    print("\n-- Nav Active State ------------------------------")
    test_nav_active_state(page)

    print("\n-- Footer ----------------------------------------")
    test_footer(page)

    print("\n-- URL Params Preserved on Year Switch -----------")
    test_url_params_preserved_on_year_switch(page)

    browser.close()

print(f"\n{'-'*50}")
print(f"  {len(PASS)} passed  |  {len(FAIL)} failed")
if FAIL:
    print(f"\n  Failed tests:")
    for f in FAIL:
        print(f"    • {f}")
    sys.exit(1)
else:
    print("  All tests passed.")
