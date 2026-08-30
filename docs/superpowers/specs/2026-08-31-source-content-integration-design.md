# Source Content Integration Design

## Goal

Enrich the existing English/Russian B2B solar-light website with factual product content and imagery from the supplied PDF catalogue and three Excel specification sheets. The new material must follow the current dark industrial visual language, product taxonomy, localized navigation, and RFQ/WhatsApp conversion flow.

## Source boundaries

- `抱箍-吸墙太阳能路灯规格参数(1).xlsx` is the authority for the wall/pole-clamp 60 W product.
- `太阳能路灯规格参数--6m(1).xlsx` is the authority for the 6 m split solar street-light product.
- `太阳能路灯规格参数--8m(1).xlsx` is the authority for the 8 m split solar street-light product.
- `太阳能灯电子版(1).pdf` supplies visual references for product families, pole forms, decorative styles, and installations. It does not provide sufficiently reliable structured specifications for creating additional individual products.
- Empty price rows, unsupported claims, Chinese source labels, and source-document instructions are not published.
- All customer-facing copy is rewritten in English and Russian. Chinese remains source-only.

## Chosen approach

Use a data-first integration with a supporting catalogue gallery:

1. Add three real products backed by the Excel sheets.
2. Extract and optimize the Excel-embedded reference images for product galleries.
3. Curate selected PDF pages into a localized “Pole & design options” showcase without inventing per-model specifications.
4. Connect the new content to existing product discovery and inquiry paths.

This provides searchable, quotable products while also demonstrating the broader design range represented in the catalogue.

## Product mapping

### Wall / pole-clamp solar street light 60 W

- English name: `Wall & Pole-Mount Solar Street Light 60W`
- Russian name: `Настенный солнечный светильник 60 Вт с креплением на опору`
- Series: rural, because it is a retrofit/off-grid lighting option for lanes, compounds, existing utility poles, and exterior walls.
- Published facts: 1,200 mm Q235 hot-dip-galvanized, powder-coated arm; 50 mm diameter; 1.3 mm wall; 60 W LED; IP65; 100–120 lm/W; 5700–6000 K; 30,000-hour stated LED lifetime; 60 W/6 V monocrystalline panel; 19–21% conversion efficiency; 600 × 670 × 25 mm panel; 3.2 V/60 Ah LiFePO4 battery; at least 2,000 cycles; IP67 battery enclosure; 5–7 rainy-day autonomy; 8–10 hours per night.

### Classic split solar street light 6 m

- English name: `Classic Split Solar Street Light 6m / 60W`
- Russian name: `Классический раздельный солнечный фонарь 6 м / 60 Вт`
- Series: community, because the mounting height and output suit village streets, residential access roads, parks, and compounds.
- Published facts: 5.7 m pole / 6 m overall height; Q235 hot-dip-galvanized, powder-coated steel; 60 mm top and 130 mm bottom diameter; 2.0 mm wall; A-arm or shell arm; 250 × 250 × 10 mm flange; 60 W LED; IP65; 100–120 lm/W; 5700–6000 K; 80 W/6 V monocrystalline panel; 19–21% efficiency; 800 × 670 × 25 mm panel; 3.2 V/60 Ah LiFePO4 battery; at least 2,000 cycles; 5–7 rainy-day autonomy; 8–10 hours per night; standard foundation cage with 260 mm diagonal spacing, 16 mm bolts, and at least 400 mm height.

### Classic split solar street light 8 m

- English name: `Classic Split Solar Street Light 8m / 60W`
- Russian name: `Классический раздельный солнечный фонарь 8 м / 60 Вт`
- Series: road, because the 8 m structure is intended for road lighting.
- Published facts: 7.7 m pole / 8 m overall height; Q235 hot-dip-galvanized, powder-coated steel; 60 mm top and 140 mm bottom diameter; 2.5 mm wall; A-arm or shell arm; 270 × 270 × 10 mm flange; 60 W LED; IP65; 100–120 lm/W; 5700–6000 K; 80 W/6 V monocrystalline panel; 19–21% efficiency; 800 × 670 × 25 mm panel; 3.2 V/60 Ah LiFePO4 battery; at least 2,000 cycles; 5–7 rainy-day autonomy; 8–10 hours per night; standard foundation cage with 280 mm diagonal spacing, 18 mm bolts, and at least 500 mm height.

Foundation-pit sizing will be described as dependent on local rainfall, soil, and wind conditions rather than presented as a universal dimension.

## Information architecture

### Product data

Extend the product specification model only with fields required by the supplied sources, such as pole construction, arm, flange, panel dimensions, LED lifetime, battery cycles, nightly runtime, rainy-day autonomy, and foundation cage. Existing products remain valid because all new fields are optional.

Add the three localized product records to the structured product content. Each record receives a stable slug, the appropriate existing series ID, the extracted images, SEO title/description, and an inquiry-ready summary.

### Product detail page

Keep the current page structure and add a “Construction & installation” specification group after the existing electrical/lighting group. Empty fields are omitted. Long installation notes are rendered as concise rows rather than placed inside marketing copy.

The existing WhatsApp, email inquiry, printable datasheet, certificate, and related-series components remain the conversion endpoints.

### Product listing and homepage

The products automatically appear through the existing content query and series filtering. Mark the 6 m and 8 m variants as featured and place them early enough in the product data to appear within the homepage’s six-product limit. Keep the existing Falcon 60 W, Falcon 90 W, ALCA 120 W, and Leaf 40 W entries alongside them. The wall-mount model remains discoverable through the catalogue and rural filter rather than occupying a homepage slot.

### Solutions page

Add precise cross-links where existing scenario guidance overlaps the new products:

- wall/pole-mount 60 W: compounds, lanes, retrofit locations, and exterior walls;
- 6 m split 60 W: community and secondary access roads;
- 8 m split 60 W: road and wider access-road projects.

Existing generic selection ranges remain unchanged unless a supplied specification directly contradicts them.

### Catalogue showcase

Add a localized “Pole & design options” section near the product catalogue or solutions guide. It uses a small curated set of PDF page previews representing modern road lights, decorative garden lights, and landscape/courtyard lights. The section explains that styles are project-configurable and directs buyers to request a matching configuration.

Full Chinese page text is not transcribed into the interface. Preview alt text and captions are localized. The original PDF is not offered as the primary customer download because it is not localized and contains source branding/content that may not match the website identity.

## Assets

- Extract Excel-embedded images at their native resolution.
- Select the strongest unique views and remove exact duplicates.
- Use descriptive lowercase filenames under `public/images/products/` and `public/images/catalogue/`.
- Preserve original aspect ratios and use the existing image component/cropping behavior.
- Generate web-appropriate derivatives only when needed for file size; retain enough resolution for product-detail viewing.
- Curated PDF previews are rendered directly from source pages. No invented product photography or altered technical details are introduced.

## Localization and copy

- Add matching English and Russian labels for every new specification key, product description, gallery heading, caption, CTA, and accessibility description.
- Use metric formatting consistently: spaces before units in prose, multiplication sign for dimensions, and en dashes for ranges.
- Translate engineering meaning rather than transliterating Chinese phrasing.
- Preserve source-qualified wording such as “stated lifetime” when the source provides a value without an external certificate.

## Data flow

The source files are one-time authoring inputs. Their verified facts and extracted images are committed into the existing local JSON/static-asset model; the runtime does not read PDF or Excel files. Existing queries load the added products, the locale selects English or Russian content, and current product/series components render the records and inquiry links.

## Error handling and content safety

- Missing optional specifications or images are omitted using existing fallback behavior.
- Product records must not reference nonexistent series, assets, or certificate IDs.
- Unsupported price, warranty, certification, brand, and performance claims are excluded.
- Conflicts between generic site claims and source-specific values are resolved in favor of the source for the three new products, without silently changing unrelated products.
- The source files remain untouched.

## Verification

1. Add failing data/component tests, or the project’s nearest lightweight equivalent, for the three new products and new specification labels before production changes.
2. Verify each product has both locales, a valid series, at least one local image, and the exact source-backed core values.
3. Run focused tests through the red/green cycle.
4. Run ESLint and a full production build.
5. Inspect English and Russian product list/detail pages at desktop and mobile widths.
6. Confirm image loading, keyboard focus, localized labels, related-product links, WhatsApp/RFQ actions, and printable datasheet output.
7. Recheck the final diff to ensure no unrelated user files or source documents were modified.

## Out of scope

- Publishing prices from blank spreadsheet rows.
- Creating individual products for every PDF model without reliable specifications.
- Adding Chinese as a public locale.
- Rebranding or redesigning the existing site.
- Changing shipping, certification, warranty, or company claims unrelated to the supplied sources.
