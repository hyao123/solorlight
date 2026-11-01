"""Build English/Russian full-range catalogues from the website's product records.

Requires PyMuPDF and Pillow, as does build-jz-catalogue.py. No inferred model
specifications, certifications or warranty periods are added.
"""
import json
from collections import Counter
from html import escape
from io import BytesIO
from pathlib import Path

import pymupdf as fitz
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
PRODUCTS = json.loads((ROOT / 'content/products/index.json').read_text(encoding='utf-8'))
JZ = json.loads((ROOT / 'content/catalogues/jz-split.json').read_text(encoding='utf-8'))
PRODUCTS = JZ['models'] + PRODUCTS
SETTINGS = json.loads((ROOT / 'content/settings.json').read_text(encoding='utf-8'))
SERIES = json.loads((ROOT / 'content/series/index.json').read_text(encoding='utf-8'))
SERIES_NAMES = {s['_id']: s['name'] for s in SERIES}
SERIES_NAMES['series-jz-split'] = {'en': 'JZ Split Series', 'ru': 'Раздельная серия JZ'}
VERSION = '2026-11-01'
OUTPUT = ROOT / 'public/downloads'
LABELS = {
    'power': ('LED power', 'Мощность LED'), 'lumens': ('Luminous flux', 'Световой поток'),
    'efficacy': ('Luminous efficacy', 'Световая отдача'), 'cct': ('Color temperature', 'Цветовая температура'),
    'ipRating': ('Protection', 'Класс защиты'), 'solarPanel': ('Solar panel', 'Солнечная панель'),
    'panelDimensions': ('Panel dimensions', 'Размеры панели'), 'panelEfficiency': ('Panel efficiency', 'КПД панели'),
    'battery': ('Battery', 'Аккумулятор'), 'batteryCycles': ('Battery cycles', 'Ресурс батареи'),
    'autonomy': ('Rainy-day reference', 'Автономность, ориентир'), 'nightlyRuntime': ('Nightly reference', 'Работа за ночь, ориентир'),
    'lightingTime': ('Runtime reference', 'Автономность, ориентир'), 'chargingTime': ('Charging reference', 'Зарядка, ориентир'),
    'ledLifetime': ('LED lifetime reference', 'Ресурс LED, ориентир'), 'mountHeight': ('Mounting height', 'Высота монтажа'),
    'controller': ('Controller', 'Контроллер'), 'motionSensor': ('Motion sensor', 'Датчик движения'),
    'poleConstruction': ('Pole construction', 'Конструкция опоры'), 'arm': ('Mounting arm', 'Кронштейн'),
    'flange': ('Base flange', 'Фланец'), 'foundation': ('Foundation cage', 'Закладная'),
    'installationNote': ('Installation note', 'Условия монтажа'),
}


def text(value, lang):
    return escape(str(value.get(lang, '') if isinstance(value, dict) else value))


def block(page, rect, html, size=10):
    css = f'body {{font-family:sans-serif;font-size:{size}pt;color:#203047;line-height:1.3}} p {{margin:0 0 7pt}} h1 {{font-size:27pt;margin:0 0 12pt}} h2 {{font-size:18pt;margin:0 0 10pt}} table {{width:100%;border-collapse:collapse}} td,th {{border-bottom:1px solid #d9e1eb;padding:3pt 4pt;text-align:left;vertical-align:top}}'
    spare, scale = page.insert_htmlbox(fitz.Rect(rect), html, css=css, scale_low=.82)
    if spare < 0:
        raise ValueError(f'Text overflow on page {page.number + 1}: {html[:100]}')
    return scale


def base(doc, title):
    page = doc.new_page(width=595, height=842)
    page.draw_rect(fitz.Rect(0, 0, 595, 56), fill=(.06, .10, .17), color=None)
    block(page, (32, 17, 563, 48), '<span style="color:#facc15"><b>JIAZUN / SOLARLIGHT</b> — PRODUCT CATALOGUE</span>', 10)
    block(page, (32, 74, 563, 128), f'<h2>{escape(title)}</h2>', 18)
    page.draw_line((32, 793), (563, 793), color=(.82, .86, .90))
    block(page, (32, 800, 515, 831), f'{VERSION} · {escape(SETTINGS["email"])}', 8)
    block(page, (520, 800, 563, 831), str(page.number + 1), 9)
    return page


def main():
    primary_counts = Counter(p['images'][0] for p in PRODUCTS)
    OUTPUT.mkdir(parents=True, exist_ok=True)
    for lang in ['en', 'ru']:
        en = lang == 'en'
        doc = fitz.open()
        p = base(doc, 'Full product range / 20 models' if en else 'Полный каталог / 20 моделей')
        block(p, (32, 145, 563, 285), '<h1>' + ('Solar street lighting' if en else 'Солнечное уличное освещение') + '</h1><p>' + ('Five series: JZ split, road, community, rural and industrial. Compare the existing model specifications and request a project-specific quotation.' if en else 'Пять серий: JZ, дорожная, общественная, сельская и промышленная. Сравните характеристики и запросите предложение для объекта.') + '</p>', 14)
        counts = Counter(p['series'] for p in PRODUCTS)
        block(p, (32, 315, 563, 490), '<table>' + ''.join(f'<tr><td>{text(SERIES_NAMES[k], lang)}</td><td>{v}</td></tr>' for k, v in counts.items()) + '</table>', 13)
        note_en = 'Selection reference, not a final engineering specification. Images may be shared series references. Runtime assumes a confirmed dimming schedule and solar yield. Warranty, certificate coverage, temperature limits and final structural drawings must be confirmed for each model and order. CE/RoHS marks do not replace model-specific documents; ISO 9001 concerns the manufacturer’s quality system.'
        note_ru = 'Материал для подбора, а не окончательный проект. Изображения могут быть общими для серии. Автономность требует согласованного диммирования и инсоляции. Гарантия, документы, температурные пределы и чертежи уточняются по модели и заказу. Знаки CE/RoHS не заменяют документы на модель; ISO 9001 относится к системе менеджмента производителя.'
        block(p, (32, 540, 563, 755), f'<p>{note_en if en else note_ru}</p>', 12)
        p = base(doc, 'Model comparison' if en else 'Сравнение моделей')
        rows = []
        page_number = 3
        for product in PRODUCTS:
            spec = product['specs']
            rows.append(f'<tr><td>{page_number}</td><td>{text(product.get("model", product["name"][lang]), lang)}</td><td>{text(spec.get("power", "—"), lang)}</td><td>{text(spec.get("battery", "—"), lang)}</td></tr>')
            page_number += (len(spec) + 10) // 11
        heads = ('Page', 'Model', 'LED', 'Battery') if en else ('Стр.', 'Модель', 'LED', 'Батарея')
        block(p, (32, 135, 563, 775), '<table><tr>' + ''.join(f'<th>{h}</th>' for h in heads) + '</tr>' + ''.join(rows) + '</table>', 9)
        for product in PRODUCTS:
            p = base(doc, product['name'][lang])
            slug = product['slug']['current']
            block(p, (32, 129, 563, 165), f'<b>{text(product.get("model", slug), lang)}</b> / {text(SERIES_NAMES[product["series"]], lang)}', 10)
            image_path = ROOT / 'public' / product['images'][0].lstrip('/')
            buffer = BytesIO()
            with Image.open(image_path) as image:
                image.convert('RGB').save(buffer, 'JPEG', quality=85)
            p.insert_image(fitz.Rect(32, 175, 205, 295), stream=buffer.getvalue(), keep_proportion=True)
            image_note = product.get('imageNote', {}).get(lang)
            if not image_note and primary_counts[product['images'][0]] > 1:
                image_note = 'Shared series appearance reference. Confirm the model housing and dimensions.' if en else 'Общий пример внешнего вида серии. Уточните корпус и размеры модели.'
            block(p, (223, 175, 563, 295), f'<p>{escape(image_note or ("Model appearance reference; final configuration follows the quotation." if en else "Внешний вид для подбора; комплектация по предложению."))}</p><p>jiazun6888.com/{lang}/products/{slug}</p>', 9)
            rows = []
            for key, value in product['specs'].items():
                if key not in LABELS:
                    raise ValueError(f'Unmapped specification: {key}')
                rows.append(f'<tr><td style="width:160pt">{LABELS[key][0 if en else 1]}</td><td>{text(value, lang)}</td></tr>')
            chunks = [rows[i:i + 11] for i in range(0, len(rows), 11)]
            block(p, (32, 310, 563, 665), '<table>' + ''.join(chunks[0]) + '</table>', 9)
            for chunk in chunks[1:]:
                p = base(doc, product['name'][lang])
                block(p, (32, 129, 563, 170), f'<b>{escape(slug)}</b> — ' + ('Specifications continued' if en else 'Продолжение характеристик'), 10)
                block(p, (32, 185, 563, 650), '<table>' + ''.join(chunk) + '</table>', 10)
            if product.get('catalogue') == 'jz-split' or '3.2 V / 60 Ah' in product['specs'].get('battery', ''):
                runtime = JZ['runtimeNote'][lang]
            else:
                runtime = 'Runtime and rainy-day figures are conditional, not continuous full-power guarantees. Confirm usable battery capacity, dimming, temperature limits and worst-month solar yield. Component lifetimes are not warranty periods.' if en else 'Автономность — условный ориентир, не гарантия постоянной полной мощности. Согласуйте полезную ёмкость, диммирование, температурные пределы и инсоляцию худшего месяца. Ресурс компонентов не является гарантией.'
            conditions = 'Warranty and compliance documents are confirmed for the selected model in the quotation.' if en else 'Гарантия и документы подтверждаются для выбранной модели в коммерческом предложении.'
            block(p, (32, 680, 563, 782), f'<p>{escape(runtime)}</p><p>{conditions}</p>', 9)
        doc.set_metadata({'title': 'SolarLight — ' + ('Full product catalogue' if en else 'Полный каталог продукции'), 'author': 'Jiazun / SolarLight Solutions', 'subject': f'20 models · {VERSION}'})
        target = OUTPUT / f'solarlight-full-catalogue-{lang}.pdf'
        doc.save(target, garbage=4, deflate=True)
        print(f'{lang}: {len(doc)} pages, {target.stat().st_size:,} bytes')
        doc.close()


if __name__ == '__main__':
    main()
