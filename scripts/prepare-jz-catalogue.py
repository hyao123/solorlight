"""Prepare user-supplied JZ photos and source-backed catalogue content."""
import argparse
import json
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]


def tr(en, ru, zh):
    return dict(en=en, ru=ru, zh=zh)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--source', type=Path, required=True)
    args = parser.parse_args()
    dest = ROOT / 'public/images/jz'
    dest.mkdir(parents=True, exist_ok=True)
    photos = {
        'jz-hl0001': '微信图片_20261101110459.jpg',
        'jz-az0001': '微信图片_20261101110518.jpg',
        'jz-hw0001': '微信图片_20261101110530.jpg',
        'jz-xq0001': '微信图片_20261101110538.jpg',
    }
    for slug, name in photos.items():
        with Image.open(args.source / name) as photo:
            photo.convert('RGB').save(dest / f'{slug}.webp', 'WEBP', quality=88)
    with Image.open(args.source / '微信图片_20261101110328.png') as sheet:
        sheet.crop((798, 292, 959, 527)).convert('RGB').save(dest / 'jz-bg0001.webp', 'WEBP', quality=92)
    sources = [
        ('6m', '微信图片_20261101110327.png'),
        ('8m', '微信图片_202611011103271.png'),
        ('bracket', '微信图片_20261101110328.png'),
    ]
    for code, name in sources:
        with Image.open(args.source / name) as sheet:
            sheet.convert('RGB').save(dest / f'source-{code}.webp', 'WEBP', quality=94)

    runtime = tr(
        'The supplied sheet states 8–10 h/night and 5–7 rainy days. These are conditional references, not 60 W full-output guarantees. A 3.2 V × 60 Ah battery stores 192 Wh: about 3.2 h at 60 W before losses. Confirm dimming, usable capacity and local solar yield before ordering.',
        'В исходной таблице указаны 8–10 ч/ночь и 5–7 пасмурных дней. Это условные ориентиры, а не гарантия работы на полной мощности 60 Вт. Батарея 3,2 В × 60 А·ч хранит 192 Вт·ч: около 3,2 ч при 60 Вт без учёта потерь. До заказа согласуйте диммирование, полезную ёмкость и местную инсоляцию.',
        '原表标注每晚8–10小时、连续5–7个阴雨天，仅作有条件的选型参考，不代表60 W满功率承诺。3.2 V × 60 Ah电池的标称能量为192 Wh，按60 W计算理论约3.2小时，尚未扣除损耗。订购前需确认调光曲线、可用电量和当地有效日照。',
    )
    common = dict(
        power='60 W', efficacy='100–120 lm/W', cct='5700–6000 K',
        ipRating='IP65 (LED) / IP67 (battery)',
        battery='LiFePO4 · 3.2 V / 60 Ah · 192 Wh',
        batteryCycles=tr('≥2,000 cycles (sheet reference; test conditions to confirm)', '≥2 000 циклов (по таблице; условия испытаний уточняются)', '≥2,000次循环（资料参考，测试条件待确认）'),
        panelEfficiency='19–21%',
        ledLifetime='30,000 h (sheet reference)', mountHeight='6–8 m',
        nightlyRuntime=tr('8–10 h/night stated; depends on a verified dimming profile', 'Заявлено 8–10 ч/ночь; требуется проверенный профиль диммирования', '原表8–10小时/晚；取决于经核实的调光策略'),
        autonomy=tr('5–7 rainy days stated; conditional, not at continuous 60 W', 'Заявлено 5–7 пасмурных дней; условно, не при постоянных 60 Вт', '原表5–7个阴雨天；有条件参考，非连续60 W运行'),
    )
    model_defs = [
        dict(model='JZ-HL0001', name=tr('Conch-arm solar street light', 'Солнечный фонарь с дуговым кронштейном', '海螺杆分体式太阳能路灯'),
             kind='pole', badge=tr('Curved conch arm', 'Дуговой кронштейн', '海螺造型灯臂'),
             highlights=[tr('Recognisable curved arm for coordinated streetscapes.', 'Выразительный дуговой кронштейн для единого облика улицы.', '海螺弧形灯臂，便于统一街道景观风格。'), tr('Separate panel and luminaire allow independent orientation.', 'Панель и светильник можно ориентировать независимо.', '面板与灯头分离布置，可分别优化朝向。'), tr('6 m and 8 m reference pole configurations available.', 'Предусмотрены опорные комплектации высотой 6 и 8 м.', '提供6米、8米两套参考灯杆配置。')],
             applications=tr('Village streets, community lanes and scenic access roads.', 'Сельские улицы, жилые проезды и подъездные дороги к туристическим объектам.', '乡村道路、社区支路、景区连接道路。')),
        dict(model='JZ-AZ0001', name=tr('A-arm solar street light', 'Солнечный фонарь с А-образным кронштейном', 'A字臂分体式太阳能路灯'),
             kind='pole', badge=tr('Triangular A-arm', 'А-образный кронштейн', '三角A字灯臂'),
             highlights=[tr('Simple triangular arm suits repeatable road layouts.', 'Простой треугольный кронштейн удобен для типовых дорожных проектов.', '三角灯臂造型简洁，适合道路批量布点。'), tr('Independent solar panel placement helps avoid lamp-direction compromises.', 'Независимая ориентация панели не привязана к направлению освещения.', '采光朝向与照明方向可分开调整。'), tr('Galvanized, powder-coated Q235 pole reference.', 'Опорная конструкция Q235: горячее цинкование и порошковая окраска.', '参考杆材为Q235，热镀锌加喷塑。')],
             applications=tr('Rural access roads, farm routes and neighbourhood lanes.', 'Сельские подъездные дороги, фермерские маршруты и жилые проезды.', '乡村进出道路、农田道路、居民区支路。')),
        dict(model='JZ-HW0001', name=tr('Meander-pattern solar street light', 'Солнечный фонарь с орнаментом «меандр»', '回纹杆分体式太阳能路灯'),
             kind='decorative', badge=tr('Meander-pattern pole', 'Опора с орнаментом', '回纹装饰灯杆'),
             highlights=[tr('Geometric meander detailing adds a distinct visual identity.', 'Геометрический орнамент формирует узнаваемый облик пространства.', '几何回纹装饰，增强道路与社区辨识度。'), tr('Separate solar panel keeps lighting independent of grid trenching.', 'Раздельная солнечная панель позволяет обойтись без прокладки сетевого кабеля.', '独立太阳能系统，减少照明供电电缆开挖需求。'), tr('6–8 m project height; pole structure agreed per order.', 'Высота проекта 6–8 м; конструкция опоры согласуется при заказе.', '项目高度6–8米，杆体结构按订单确认。')],
             applications=tr('Residential developments, town streets and landscape-oriented public spaces.', 'Жилые кварталы, улицы посёлков и общественные пространства с единым дизайном.', '住宅社区、特色街道、注重景观统一的公共空间。')),
        dict(model='JZ-BG0001', name=tr('Clamp-mounted solar street light', 'Солнечный фонарь с хомутовым креплением', '抱箍式分体式太阳能路灯'),
             kind='clamp', badge=tr('Existing-pole retrofit', 'Монтаж на существующую опору', '利用现有杆体改造'),
             highlights=[tr('Reuses a suitable existing pole without a new freestanding pole.', 'Использует подходящую существующую опору без установки новой.', '利用适配的现有杆体，减少新立杆需求。'), tr('1,200 mm outreach arm places the luminaire clear of its support.', 'Выносной кронштейн 1 200 мм отводит светильник от опоры.', '1200毫米外挑臂，使灯头与支撑杆保持距离。'), tr('Split panel and light head make component access more direct.', 'Раздельные панель и светильник упрощают доступ к узлам.', '面板与灯头分体，便于分部件检查维护。')],
             applications=tr('Existing village poles, access roads and retrofit projects with approved supports.', 'Существующие сельские опоры, подъездные дороги и реконструкция с согласованными креплениями.', '具备合格支撑杆的村道、支路、照明改造项目。')),
        dict(model='JZ-XQ0001', name=tr('Wall-mounted solar street light', 'Настенный раздельный солнечный фонарь', '吸墙式分体式太阳能路灯'),
             kind='wall', badge=tr('Wall-mounted bracket', 'Настенный кронштейн', '墙面支架安装'),
             highlights=[tr('Uses a suitable wall where a new ground pole would obstruct circulation.', 'Крепится на подходящую стену, сохраняя свободное пространство на земле.', '利用合适墙体，减少独立灯杆对通行空间的占用。'), tr('Separate panel can be oriented toward unobstructed sunlight.', 'Отдельную панель можно направить на открытый солнечный участок.', '面板可朝向无遮挡的采光方向。'), tr('1,200 mm curved outreach arm suits courtyards and entrances.', 'Изогнутый вынос 1 200 мм подходит для дворов и входных зон.', '1200毫米弯臂，适合院落和出入口布置。')],
             applications=tr('Courtyards, building entrances, warehouse approaches and narrow lanes.', 'Дворы, входные зоны, подъезды к складам и узкие проезды.', '院落、建筑入口、仓库周边、狭窄通道。')),
    ]
    models = []
    for entry in model_defs:
        code=entry['model']; slug=code.lower(); kind=entry['kind']
        bracket=kind in ('clamp', 'wall')
        specs={**common, 'solarPanel': 'Mono-Si · 60 W / 6 V' if bracket else 'Mono-Si · 80 W / 6 V', 'panelDimensions': '600 × 670 × 25 mm' if bracket else '800 × 670 × 25 mm'}
        note=tr('Confirm the local worst-month solar yield, road layout and dimming programme before selection.', 'До выбора проверьте инсоляцию худшего месяца, геометрию дороги и программу диммирования.', '选型前核实当地最差月份日照、道路尺寸与调光方案。')
        if kind in ('pole',):
            specs['poleConstruction']=tr('Q235 · hot-dip galvanized + powder coated. 6 m: Ø60/130 × 2.0 mm; 8 m: Ø60/140 × 2.5 mm.', 'Q235 · горячее цинкование + порошковая окраска. 6 м: Ø60/130 × 2,0 мм; 8 м: Ø60/140 × 2,5 мм.', 'Q235热镀锌加喷塑。6 m：上/下口径60/130 mm、壁厚2.0 mm；8 m：60/140 mm、壁厚2.5 mm。')
            specs['flange']='6 m: 250 × 250 × 10 mm; 8 m: 270 × 270 × 10 mm'
            specs['foundation']=tr('6 m: 260 mm diagonal / M16 / ≥400 mm; 8 m: 280 mm / M18 / ≥500 mm.', '6 м: диагональ 260 мм / M16 / ≥400 мм; 8 м: 280 мм / M18 / ≥500 мм.', '6 m：对角距260 mm / M16 / 高≥400 mm；8 m：280 mm / M18 / 高≥500 mm。')
            specs['installationNote']=tr('Foundation excavation requires local soil, rainfall and wind-load design. Intermediate heights need a separate structural drawing.', 'Котлован рассчитывают по грунту, осадкам и ветровой нагрузке. Для промежуточной высоты нужен отдельный чертёж.', '基础开挖需结合当地土质、降雨及风荷载设计；中间高度须单独出具结构图。')
        elif kind=='decorative':
            specs['solarPanel']='Mono-Si · 80 W / 6 V (reference configuration)'
            specs['poleConstruction']=tr('Meander-pattern pole; section, material, wall thickness and foundation to be agreed.', 'Опора с орнаментом; сечение, материал, толщина стенки и фундамент согласуются отдельно.', '回纹装饰杆；截面、材质、壁厚及基础尺寸须单独确认。')
            note=tr('The photo identifies the style. Electrical values use the split-system reference; confirm the final panel, pole structure and foundation for JZ-HW0001.', 'Фото показывает дизайн. Электрика приведена по типовой раздельной системе; панель, конструкцию опоры и фундамент JZ-HW0001 нужно подтвердить.', '图片用于确认款式；电气参数沿用分体式参考配置，JZ-HW0001的最终面板、杆体与基础须单独确认。')
        else:
            specs['mountHeight']='6–8 m (installation height)'
            specs['arm']=tr('1,200 mm · Q235 galvanized + powder coated · Ø50 × 1.3 mm', '1 200 мм · Q235, цинкование + порошковая окраска · Ø50 × 1,3 мм', '长度1200 mm · Q235热镀锌加喷塑 · 外径50 mm × 壁厚1.3 mm')
            note=tr('6–8 m is the installation height, not an included pole. Verify support strength, fixings, clearances and panel shading; work near power lines requires authorised installation.', '6–8 м — высота монтажа, опора в комплект не подразумевается. Проверьте несущую способность, крепёж, зазоры и затенение; работы у ЛЭП выполняют уполномоченные специалисты.', '6–8米指安装高度，不代表配套新灯杆；需核查支撑强度、紧固件、安全间距和面板遮挡，临近电力线路须由授权人员安装。')
        description=tr(f'{code} · 60 W split solar lighting, 6–8 m mounting height. {entry["applications"]["en"]}', f'{code} · раздельное солнечное освещение 60 Вт, высота монтажа 6–8 м. {entry["applications"]["ru"]}', f'{code} · 60 W分体式太阳能路灯，安装高度6–8米。{entry["applications"]["zh"]}')
        models.append(dict(_id=f'prod-{slug}', model=code, brand='Jiazun', catalogue='jz-split', slug=dict(current=slug), name=entry['name'], series='series-jz-split', images=[f'/images/jz/{slug}.webp'], specs=specs, certificates=[], isHotProduct=False, seoTitle=tr(f'{code} | {entry["name"]["en"]}', f'{code} | {entry["name"]["ru"]}', f'{code} | {entry["name"]["zh"]}'), seoDescription=description, badge=entry['badge'], highlights=entry['highlights'], applications=entry['applications'], selectionNote=note, imageNote=tr('Installation reference cropped from the supplied configuration sheet.', 'Монтажный пример из предоставленной таблицы комплектации.', '由提供的参数表裁取，作为抱箍安装参考。') if kind=='clamp' else tr('Style reference photo; final supply follows the confirmed configuration.', 'Фото для выбора дизайна; поставка по согласованной комплектации.', '款式实景参考，实际供货以确认配置为准。')))
    catalogue=dict(title=tr('JZ split solar street lights', 'Раздельные солнечные фонари JZ', 'JZ分体式太阳能路灯产品目录'), subtitle=tr('Five mounting styles. One clear selection guide.', 'Пять вариантов монтажа. Единый каталог для выбора.', '五种款式，一份清晰的选型目录。'), runtimeNote=runtime,
        sharedRows=[
            dict(label=tr('LED head', 'LED-светильник', 'LED灯头'), value=tr('60 W · 100–120 lm/W · 5700–6000 K · IP65', '60 Вт · 100–120 лм/Вт · 5700–6000 K · IP65', '60 W · 100–120 lm/W · 5700–6000 K · IP65')),
            dict(label=tr('Luminaire housing', 'Корпус светильника', '灯头壳体'),value=tr('Die-cast aluminium or industrial stamped steel; confirm the supplied option.', 'Литой алюминий или промышленная штампованная сталь; вариант согласуется.', '全铝压铸或工业级冲压钢，供货材质需确认。')),
            dict(label=tr('Battery', 'Аккумулятор', '储能电池'), value=tr('LiFePO4 · 3.2 V / 60 Ah · 192 Wh · IP67 battery assembly', 'LiFePO4 · 3,2 В / 60 А·ч · 192 Вт·ч · батарейный блок IP67', 'LiFePO4 · 3.2 V / 60 Ah · 192 Wh · 电池组件IP67')),
            dict(label=tr('Solar panel', 'Солнечная панель', '光伏组件'), value=tr('Mono-Si · 6 V · 19–21% · 80 W pole reference / 60 W bracket reference', 'Монокристалл · 6 В · 19–21% · 80 Вт для опор / 60 Вт для кронштейнов', '单晶硅 · 6 V · 转换效率19–21% · 杆装参考80 W / 支架参考60 W')),
            dict(label=tr('Panel size', 'Размеры панели', '面板尺寸'), value=tr('80 W: 800 × 670 × 25 mm; 60 W: 600 × 670 × 25 mm', '80 Вт: 800 × 670 × 25 мм; 60 Вт: 600 × 670 × 25 мм', '80 W：800 × 670 × 25 mm；60 W：600 × 670 × 25 mm')),
            dict(label=tr('Sheet life references', 'Ресурс по таблице', '资料寿命参考'), value=tr('LED 30,000 h · panel 15 years · battery ≥2,000 cycles. Not warranty periods; test conditions require confirmation.', 'LED 30 000 ч · панель 15 лет · батарея ≥2 000 циклов. Не гарантийные сроки; условия испытаний уточняются.', 'LED 30,000小时 · 面板15年 · 电池≥2,000次循环；不等同于保修期，测试条件需确认。')),
        ],
        regions=[
            dict(title=tr('Sunny rural & residential sites', 'Солнечные сельские и жилые районы', '日照充足的乡村与社区'), text=tr('A candidate for villages, community lanes and courtyards with open sky. Check the worst-month sun hours and road illumination requirements.', 'Подходит для предварительного подбора в сёлах, жилых проездах и дворах без затенения. Проверьте инсоляцию худшего месяца и нормы освещения.', '可用于无遮挡的村道、社区支路和院落选型；需核实最差月份日照与道路照度要求。')),
            dict(title=tr('Central Asia & cold winters', 'Центральная Азия и холодная зима', '中亚及寒冷冬季地区'), text=tr('For Kazakhstan, Uzbekistan and similar markets, review winter yield and battery charging temperature. Low-temperature protection or heating is not specified in these sheets.', 'Для Казахстана, Узбекистана и похожих рынков оцените зимнюю выработку и температуру зарядки. Низкотемпературная защита и обогрев в таблицах не указаны.', '哈萨克斯坦、乌兹别克斯坦等市场需核算冬季发电及电池充电温度；资料未明确低温保护或加热配置。')),
            dict(title=tr('Hot, dusty or persistently cloudy sites', 'Жара, пыль или длительная облачность', '高温、多尘或持续阴雨地区'), text=tr('For Middle Eastern or tropical projects, confirm thermal limits, cleaning access and the seasonal energy budget. A larger panel or battery may be needed.', 'Для Ближнего Востока и тропиков уточните температурные пределы, очистку и сезонный энергобаланс. Может потребоваться увеличение панели или батареи.', '中东、热带项目需核查温度限值、清洁维护与季节能量收支；可能需要扩大面板或电池配置。')),
            dict(title=tr('Coastal & exposed locations', 'Побережье и открытые ветреные места', '沿海及强风暴露区域'), text=tr('Confirm corrosion treatment, fasteners, wind loads and anchorage. IP ratings alone do not establish salt-spray or storm resistance.', 'Уточните антикоррозионную защиту, крепёж, ветровые нагрузки и анкеровку. Класс IP не подтверждает стойкость к солевому туману или шторму.', '需核查防腐处理、紧固件、风荷载及锚固；IP防护等级不等同于耐盐雾或抗台风能力。')),
        ],
        poleVariants=[dict(height='6 m', body='5.7 m', diameter='Ø60 / 130 mm', wall='2.0 mm', flange='250 × 250 × 10 mm', anchors='260 mm / M16 / ≥400 mm'),dict(height='8 m', body='7.7 m',diameter='Ø60 / 140 mm',wall='2.5 mm',flange='270 × 270 × 10 mm',anchors='280 mm / M18 / ≥500 mm')],
        models=models,
        sources=[dict(code=code,image=f'/images/jz/source-{code}.webp',file=name) for code,name in sources],
        photoSources={**photos,'jz-bg0001':'微信图片_20261101110328.png · crop 798,292,959,527'},
    )
    output=ROOT/'content/catalogues/jz-split.json'
    output.parent.mkdir(parents=True,exist_ok=True)
    output.write_text(json.dumps(catalogue,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    print(f'Prepared {len(models)} models and {len(photos)+1} photos.')


if __name__=='__main__':
    main()
