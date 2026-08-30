import os
from pathlib import Path
from playwright.sync_api import sync_playwright


BASE_URL = os.environ.get("SOLARLIGHT_TEST_BASE_URL", "http://localhost:3000")
OUTPUT_DIR = Path(r"C:\Users\24960\AppData\Local\Temp\solarlight-visual-review")
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)


def assert_page(page, route, expected, screenshot, width=1440, height=1000):
    page.set_viewport_size({"width": width, "height": height})
    page.goto(f"{BASE_URL}{route}", wait_until="networkidle")
    body = page.locator("body").inner_text()
    for text in expected:
        assert text in body, f"{route} is missing {text!r}"
    overflow = page.evaluate("document.documentElement.scrollWidth > document.documentElement.clientWidth")
    assert not overflow, f"{route} has horizontal overflow at {width}px"
    page.screenshot(path=str(OUTPUT_DIR / screenshot), full_page=True)


with sync_playwright() as playwright:
    browser = playwright.chromium.launch(
        headless=True,
        executable_path=r"C:\Program Files\Google\Chrome\Application\chrome.exe",
    )
    page = browser.new_page()
    page.set_default_navigation_timeout(90_000)
    errors = []
    page.on("console", lambda message: errors.append(message.text) if message.type == "error" else None)
    page.on("pageerror", lambda error: errors.append(str(error)))

    assert_page(
        page,
        "/en/products",
        [
            "Classic Split Solar Street Light 8m / 60W",
            "Classic Split Solar Street Light 6m / 60W",
            "Wall & Pole-Mount Solar Street Light 60W",
            "Pole & design options",
            "Request a matched configuration",
        ],
        "products-en-desktop.png",
    )
    assert page.locator('a[href="/en/contact"]', has_text="Request a matched configuration").count() == 1

    page.get_by_role("button", name="Rural Series").click()
    page.wait_for_timeout(200)
    assert "series=rural" in page.url
    wall_links = page.locator('a[href="/en/products/wall-pole-mount-60w"]')
    road_links = page.locator('a[href="/en/products/classic-split-8m-60w"]')
    assert any(wall_links.nth(index).is_visible() for index in range(wall_links.count()))
    assert not any(road_links.nth(index).is_visible() for index in range(road_links.count()))

    assert_page(
        page,
        "/en/products/classic-split-8m-60w",
        ["Construction & Installation", "Foundation Cage", "280 mm diagonal · M18 bolts · ≥500 mm height"],
        "product-8m-en-desktop.png",
    )
    assert "MPPT Controller" not in page.locator("body").inner_text()
    assert "CE & RoHS Certified" not in page.locator("body").inner_text()

    assert_page(
        page,
        "/ru/products/classic-split-6m-60w",
        ["Конструкция и монтаж", "Закладная деталь", "Диагональ 260 мм · болты M16 · высота ≥400 мм"],
        "product-6m-ru-mobile.png",
        width=390,
        height=844,
    )

    assert_page(
        page,
        "/en/solutions",
        ["Classic Split Solar Street Light 8m / 60W", "Classic Split Solar Street Light 6m / 60W"],
        "solutions-en-desktop.png",
    )

    assert_page(
        page,
        "/ru/products",
        ["Варианты опор и дизайна", "Запросить подходящую комплектацию"],
        "products-ru-mobile.png",
        width=390,
        height=844,
    )

    browser.close()
    assert not errors, f"Browser console errors: {errors}"

print(f"Visual checks passed; screenshots saved to {OUTPUT_DIR}")
