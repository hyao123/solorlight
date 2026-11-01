"""Build shareable JZ catalogues from the same data used by the website (PyMuPDF)."""
import json
from pathlib import Path
import pymupdf as fitz
from PIL import Image
from io import BytesIO

ROOT = Path(__file__).resolve().parents[1]
DATA = json.loads((ROOT / 'content/catalogues/jz-split.json').read_text(encoding='utf-8'))
SETTINGS = json.loads((ROOT / 'content/settings.json').read_text(encoding='utf-8'))
OUTPUT = ROOT / 'public/downloads'
OUTPUT.mkdir(parents=True, exist_ok=True)
W, H = 595, 842


def photo_bytes(model):
    buffer = BytesIO()
    with Image.open(ROOT / 'public' / model['images'][0].lstrip('/')) as image:
        image.convert('RGB').save(buffer, 'JPEG', quality=90)
    return buffer.getvalue()


def label(lang, en, ru, zh):
    return {'en': en, 'ru': ru, 'zh': zh}[lang]


def block(page, rect, html, size=11, color='#203047'):
    css = f'body {{font-family: sans-serif; font-size:{size}pt; color:{color}; line-height:1.45;}} p {{margin:0 0 9pt}} h1 {{font-size:30pt;line-height:1.1;margin:0 0 14pt}} h2 {{font-size:21pt;line-height:1.2;margin:0 0 12pt}} h3 {{font-size:12pt;margin:10pt 0 6pt}} ul {{padding-left:14pt;margin:0}} li {{margin-bottom:7pt}} strong {{font-weight:bold}} table {{width:100%;border-collapse:collapse;font-size:10pt}} td,th {{border-bottom:1px solid #d9e1eb;padding:4pt 4pt;text-align:left;vertical-align:top}}'
    spare, scale = page.insert_htmlbox(fitz.Rect(rect), html, css=css, scale_low=.88)
    if spare < 0 or scale < .88:
        raise ValueError(f'Text overflow on page {page.number + 1}: {html[:100]}')


def page_base(doc, lang, title):
    page = doc.new_page(width=W, height=H)
    page.draw_rect(fitz.Rect(0, 0, W, 58), color=None, fill=(.06,.10,.17))
    block(page, (32,16,565,48), f'<b>JIAZUN</b> &nbsp; / &nbsp; JZ SPLIT SOLAR LIGHTING', 10, '#facc15')
    page.draw_line((32,793),(563,793),color=(.82,.86,.9))
    block(page,(32,800,515,829),f'jiazun6888.com · {SETTINGS["email"]}',8)
    block(page,(520,800,563,829),f'{page.number+1:02d}',9)
    block(page,(32,76,563,133),title,20)
    return page


for lang in ['zh','en','ru']:
    doc=fitz.open()
    p=page_base(doc,lang,label(lang,'Product catalogue','Каталог продукции','产品目录'))
    block(p,(32,150,563,275),f'<h1>{DATA["title"][lang]}</h1><p>{DATA["subtitle"][lang]}</p>',14)
    block(p,(32,290,563,350),'<b>6–8 m</b> &nbsp; / &nbsp; <b>60 W LED</b> &nbsp; / &nbsp; <b>192 Wh LiFePO4</b>',17)
    for idx,model in enumerate(DATA['models']):
        x=32+idx*107
        p.insert_image(fitz.Rect(x,380,x+99,550),stream=photo_bytes(model),keep_proportion=True)
        block(p,(x,564,x+102,650),f'<b>{model["model"]}</b><p>{model["badge"][lang]}</p>',9)
    block(p,(32,665,563,768),label(lang,'<b>Selection reference · November 2026</b><p>Images and component values are based on the supplied material. Final engineering, runtime and price are agreed for each project.</p>','<b>Каталог для подбора · Ноябрь 2026</b><p>Фотографии и параметры основаны на предоставленных материалах. Конструкция, автономность и цена согласуются для объекта.</p>','<b>选型参考 · 2026年11月</b><p>图片及组件参数依据提供的资料整理。工程结构、续航策略及报价需结合具体项目确认。</p>'),11)

    for model in DATA['models']:
        p=page_base(doc,lang,model['model'])
        block(p,(32,132,563,215),f'<h2>{model["name"][lang]}</h2>',20)
        p.insert_image(fitz.Rect(32,225,265,594),stream=photo_bytes(model),keep_proportion=True)
        block(p,(32,608,265,670),model['imageNote'][lang],9,'#526277')
        spec=model['specs']
        pairs=[(label(lang,'Height','Высота','高度'),spec['mountHeight']),(label(lang,'LED power','Мощность LED','灯头功率'),spec['power']),(label(lang,'Panel','Панель','光伏面板'),spec['solarPanel']),(label(lang,'Panel size','Размер панели','面板尺寸'),spec['panelDimensions']),(label(lang,'Battery','Аккумулятор','储能电池'),spec['battery']),(label(lang,'Protection','Защита','防护等级'),spec['ipRating'])]
        block(p,(285,218,563,470),'<table>'+''.join(f'<tr><td>{k}</td><td>{v}</td></tr>' for k,v in pairs)+'</table>',10)
        block(p,(285,478,563,680),f'<h3>{label(lang,"Advantages","Преимущества","突出优点")}</h3><ul>'+''.join(f'<li>{item[lang]}</li>' for item in model['highlights'])+'</ul>',10)
        block(p,(32,687,563,785),f'<b>{label(lang,"Applications","Применение","适用场景")}</b> {model["applications"][lang]}<p>{model["selectionNote"][lang]}</p>',9)

    p=page_base(doc,lang,label(lang,'Electrical & mounting reference','Электрика и монтаж','电气与安装参数对照'))
    block(p,(32,139,563,475),'<table>'+''.join(f'<tr><td><b>{row["label"][lang]}</b></td><td>{row["value"][lang]}</td></tr>' for row in DATA['sharedRows'])+'</table>',10)
    block(p,(32,490,563,650),f'<h3>{label(lang,"Conch / A-arm pole references","Опоры с дуговым / А-кронштейном","海螺杆 / A字臂参考杆型")}</h3><table><tr><th></th><th>6 m</th><th>8 m</th></tr>'+''.join(f'<tr><td>{name}</td><td>{DATA["poleVariants"][0][key]}</td><td>{DATA["poleVariants"][1][key]}</td></tr>' for key,name in [('diameter',label(lang,'Top / base diameter','Диаметр верх / низ','上/下口径')),('wall',label(lang,'Wall thickness','Толщина стенки','壁厚')),('flange',label(lang,'Flange','Фланец','法兰')),('anchors',label(lang,'Diagonal / bolt / height','Диагональ / болт / высота','对角距 / 螺栓 / 高度'))])+'</table>',10)
    block(p,(32,670,563,781),label(lang,'Q235 hot-dip galvanized + powder coated. Pole bodies: 5.7 m / 7.7 m; total heights: 6 m / 8 m. Clamp/wall arms: 1,200 mm, Ø50 × 1.3 mm Q235. Decorative pole dimensions are confirmed separately. All supports and foundations require local structural design.','Q235: горячее цинкование + порошковая окраска. Стволы: 5,7 / 7,7 м, полная высота: 6 / 8 м. Кронштейн хомут/стена: 1 200 мм, Ø50 × 1,3 мм, Q235. Размеры декоративной опоры уточняются. Все крепления и фундаменты рассчитываются для объекта.','Q235热镀锌加喷塑。杆体长度5.7 m / 7.7 m，总高6 m / 8 m。抱箍、吸墙支架长1200 mm，Q235外径50 mm、壁厚1.3 mm。回纹杆的结构尺寸单独确认。各类基础、支撑及锚固均需按当地条件设计。'),10)

    p=page_base(doc,lang,label(lang,'Runtime & regional selection','Автономность и выбор региона','续航说明与适宜地区'))
    block(p,(32,137,563,292),f'<h3>192 Wh ÷ 60 W ≈ 3.2 h</h3><p>{DATA["runtimeNote"][lang]}</p>',11)
    y=310
    for region in DATA['regions']:
        block(p,(32,y,563,y+98),f'<b>{region["title"][lang]}</b><p>{region["text"][lang]}</p>',10)
        y+=107
    block(p,(32,747,563,787),label(lang,'Quote request: model, quantity, location, height, road width and lighting schedule.','Для запроса: модель, количество, место, высота, ширина дороги и график освещения.','询价请提供：型号、数量、项目地区、安装高度、道路宽度及每晚照明需求。'),10)
    doc.set_metadata(dict(title=DATA['title'][lang],author='Jiazun / SolarLight Solutions',subject='JZ-HL0001 · JZ-AZ0001 · JZ-HW0001 · JZ-BG0001 · JZ-XQ0001'))
    target=OUTPUT/f'jz-split-catalogue-{lang}.pdf'
    doc.save(target,garbage=4,deflate=True)
    print(f'{lang}: {len(doc)} pages, {target.stat().st_size:,} bytes')
    doc.close()

