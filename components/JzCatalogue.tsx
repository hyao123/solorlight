import Image from 'next/image'
import Link from 'next/link'
import catalogue from '@/content/catalogues/jz-split.json'
import type { Product } from '@/types/product'

type Locale = 'en' | 'ru'

const buttonClass = 'inline-flex items-center justify-center rounded-lg border border-yellow-400/50 px-4 py-3 text-sm font-semibold text-yellow-300 transition hover:bg-yellow-400 hover:text-slate-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-yellow-300'

export function JzCatalogueEntry({ locale }: { locale: Locale }) {
  const en = locale === 'en'
  return (
    <aside className="mb-10 grid gap-6 rounded-2xl border border-yellow-400/30 bg-slate-900 p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
      <div>
        <p className="font-mono text-xs tracking-[0.18em] text-yellow-400">JZ / 6–8 m / 60 W</p>
        <h2 className="mt-3 text-2xl font-bold text-slate-50">{catalogue.title[locale]}</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">{en ? 'Conch arm, A-arm, meander-pattern pole, clamp and wall mount. Compare installation styles, specifications and site suitability in one catalogue.' : 'Дуговой и А-образный кронштейны, опора с орнаментом, хомутовое и настенное крепления. Сравните монтаж, характеристики и условия применения.'}</p>
      </div>
      <div className="flex flex-wrap gap-3 lg:flex-col">
        <Link href={`/${locale}/catalogue/jz-split`} className={buttonClass}>{en ? 'Explore the five models →' : 'Смотреть пять моделей →'}</Link>
        <a href={`/downloads/jz-split-catalogue-${locale}.pdf`} download className="px-4 py-2 text-center text-sm text-slate-300 underline underline-offset-4 hover:text-yellow-300">{en ? 'Download catalogue (PDF)' : 'Скачать каталог (PDF)'}</a>
      </div>
    </aside>
  )
}

export function JzProductNotes({ product, locale }: { product: Product; locale: Locale }) {
  const en = locale === 'en'
  return (
    <section className="mt-12 space-y-6" aria-label={en ? 'JZ selection guide' : 'Подбор JZ'}>
      <div className="grid gap-6 rounded-2xl border border-slate-800 bg-slate-900 p-6 md:grid-cols-2">
        <div>
          <h2 className="text-xl font-semibold text-slate-50">{en ? 'Why this style' : 'Преимущества конструкции'}</h2>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-300">{product.highlights?.map((item) => <li key={item.en} className="flex gap-3"><span className="text-yellow-400" aria-hidden="true">✓</span><span>{item[locale]}</span></li>)}</ul>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-slate-50">{en ? 'Where to use it' : 'Области применения'}</h2>
          <p className="mt-4 text-sm leading-6 text-slate-300">{product.applications?.[locale]}</p>
          <p className="mt-3 text-sm leading-6 text-slate-400">{product.selectionNote?.[locale]}</p>
          <p className="mt-3 text-xs leading-5 text-slate-400">{product.imageNote?.[locale]}</p>
        </div>
      </div>
      <div className="rounded-xl border border-amber-400/30 bg-amber-400/5 p-5">
        <h2 className="font-semibold text-amber-200">{en ? 'Runtime & regional selection' : 'Автономность и местные условия'}</h2>
        <p className="mt-2 text-sm leading-6 text-slate-300">{catalogue.runtimeNote[locale]}</p>
      </div>
      <div className="flex flex-wrap gap-3">
        <Link href={`/${locale}/catalogue/jz-split#regions`} className={buttonClass}>{en ? 'Regional selection guide' : 'Подбор по условиям региона'}</Link>
        <a href={`/downloads/jz-split-catalogue-${locale}.pdf`} download className={buttonClass}>{en ? 'Download JZ catalogue (PDF)' : 'Скачать каталог JZ (PDF)'}</a>
      </div>
    </section>
  )
}

export function JzCatalogueContent({ locale, whatsappNumber }: { locale: Locale; whatsappNumber: string }) {
  const en = locale === 'en'
  const whatsapp = `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(en ? 'Hello, I would like a configuration for the JZ 6–8 m split solar street lights.' : 'Здравствуйте! Нужна комплектация раздельных солнечных фонарей JZ высотой 6–8 м.')}`
  return (
    <>
      <header className="border-b border-slate-800 bg-slate-900/70">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
          <Link href={`/${locale}/products`} className="text-sm text-slate-300 underline underline-offset-4 hover:text-yellow-300">← {en ? 'All solar street lights' : 'Все солнечные фонари'}</Link>
          <p className="mt-10 font-mono text-xs tracking-[0.2em] text-yellow-400">JIAZUN / JZ SERIES / 6–8 m</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight tracking-tight text-slate-50 sm:text-5xl">{catalogue.title[locale]}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">{catalogue.subtitle[locale]}</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#models" className={buttonClass}>{en ? 'Compare the models ↓' : 'Сравнить модели ↓'}</a>
            {(['en', 'ru', 'zh'] as const).map((lang) => <a key={lang} href={`/downloads/jz-split-catalogue-${lang}.pdf`} download className="rounded-lg border border-slate-600 px-4 py-3 text-sm text-slate-200 hover:border-yellow-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-yellow-300">{lang === 'zh' ? '中文 PDF ↓' : lang === 'ru' ? 'Русский PDF ↓' : 'English PDF ↓'}</a>)}
          </div>
          <div className="mt-10 grid max-w-3xl grid-cols-2 gap-4 border-t border-slate-700 pt-6 sm:grid-cols-4">
            {[[en ? 'Mounting height' : 'Высота монтажа', '6–8 m'], [en ? 'LED reference' : 'LED, ориентир', '60 W'], [en ? 'Battery energy' : 'Энергия батареи', '192 Wh'], [en ? 'Mounting styles' : 'Варианты монтажа', '5']].map(([label, value]) => <div key={label}><p className="text-xs text-slate-400">{label}</p><p className="mt-1 font-mono text-xl font-semibold text-yellow-300">{value}</p></div>)}
          </div>
        </div>
      </header>
      <div className="mx-auto max-w-7xl space-y-16 px-4 py-12 sm:px-6 sm:py-16">
        <section id="models" className="scroll-mt-24" aria-labelledby="jz-models-title">
          <h2 id="jz-models-title" className="text-2xl font-bold text-slate-50">{en ? 'Choose the mounting style' : 'Выберите конструкцию и монтаж'}</h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">{en ? 'Pole models suit new layouts. Clamp and wall models use an approved existing support; their 6–8 m dimension is the installation height.' : 'Модели с опорой подходят для новых объектов. Хомутовые и настенные модели используют подходящую существующую конструкцию; 6–8 м — высота их установки.'}</p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {catalogue.models.map((model) => <article key={model.model} className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
              <Link href={`/${locale}/products/${model.slug.current}`} className="group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-yellow-300">
                <div className="flex items-center justify-between gap-3 border-b border-slate-800 px-5 py-4"><p className="font-mono text-sm font-semibold text-yellow-400">{model.model}</p><span className="text-xs text-slate-400">6–8 m</span></div>
                <div className="relative aspect-[3/4] bg-slate-950"><Image src={model.images[0]} alt={`${model.model} — ${model.name[locale]}`} fill sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw" className="object-contain" /></div>
                <div className="px-5 pt-5"><p className="text-xs text-yellow-300">{model.badge[locale]}</p><h3 className="mt-2 text-xl font-semibold text-slate-50 group-hover:text-yellow-300">{model.name[locale]}</h3></div>
              </Link>
              <div className="p-5 pt-3">
                <p className="min-h-10 text-xs leading-5 text-slate-400">{model.imageNote[locale]}</p>
                <dl className="mt-4 space-y-2 border-y border-slate-800 py-4 text-sm">{[[en ? 'LED / Panel' : 'LED / Панель', `60 W / ${model.specs.solarPanel.includes('60 W') ? '60 W' : '80 W*'}`], [en ? 'Battery' : 'Батарея', '3.2 V / 60 Ah'], [en ? 'Installation' : 'Монтаж', model.badge[locale]]].map(([label, value]) => <div key={label} className="flex flex-wrap justify-between gap-x-4 gap-y-1"><dt className="text-slate-400">{label}</dt><dd className="text-slate-200">{value}</dd></div>)}</dl>
                <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-300">{model.highlights.map((item) => <li key={item.en} className="flex gap-2"><span className="text-yellow-400" aria-hidden="true">·</span><span>{item[locale]}</span></li>)}</ul>
                <h4 className="mt-5 text-sm font-semibold text-slate-100">{en ? 'Applications' : 'Применение'}</h4><p className="mt-1 text-sm leading-6 text-slate-400">{model.applications[locale]}</p>
                <p className="mt-4 text-xs leading-5 text-slate-400">{model.selectionNote[locale]}</p>
                <Link href={`/${locale}/products/${model.slug.current}`} className="mt-5 inline-block text-sm font-semibold text-yellow-300 underline underline-offset-4">{en ? 'View specifications →' : 'Характеристики →'}</Link>
              </div>
            </article>)}
          </div>
          <p className="mt-4 text-xs leading-5 text-slate-400">{en ? '*80 W is the pole-system reference. Final JZ-HW0001 panel and pole construction require confirmation. Photos show style references, not a measured photometric result.' : '*80 Вт — ориентир для системы с опорой. Панель и конструкцию JZ-HW0001 нужно подтвердить. Фотографии показывают дизайн, а не результаты фотометрических испытаний.'}</p>
        </section>
        <section aria-labelledby="jz-specs-title">
          <h2 id="jz-specs-title" className="text-2xl font-bold text-slate-50">{en ? 'Shared electrical reference' : 'Общие электрические параметры'}</h2>
          <dl className="mt-6 divide-y divide-slate-800 overflow-hidden rounded-xl border border-slate-800">{catalogue.sharedRows.map((row) => <div key={row.label.en} className="grid gap-2 bg-slate-900/60 p-5 sm:grid-cols-[220px_1fr]"><dt className="text-sm font-medium text-slate-400">{row.label[locale]}</dt><dd className="text-sm leading-6 text-slate-100">{row.value[locale]}</dd></div>)}</dl>
          <div className="mt-6 rounded-xl border border-amber-400/30 bg-amber-400/5 p-6"><h3 className="font-semibold text-amber-200">{en ? 'Read the runtime figures with the energy budget' : 'Оценивайте автономность по энергобалансу'}</h3><p className="mt-3 text-sm leading-7 text-slate-300">{catalogue.runtimeNote[locale]}</p></div>
        </section>
        <section aria-labelledby="jz-poles-title">
          <h2 id="jz-poles-title" className="text-2xl font-bold text-slate-50">{en ? 'Conch & A-arm: 6 m / 8 m pole references' : 'Дуговой и А-кронштейн: опоры 6 / 8 м'}</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">{catalogue.poleVariants.map((pole) => <div key={pole.height} className="rounded-xl border border-slate-800 bg-slate-900 p-6"><h3 className="font-mono text-3xl font-semibold text-yellow-300">{pole.height}</h3><dl className="mt-5 space-y-4">{[[en ? 'Pole body length' : 'Длина ствола', pole.body], [en ? 'Top / base diameter' : 'Диаметр верх / низ', pole.diameter], [en ? 'Wall thickness' : 'Толщина стенки', pole.wall], [en ? 'Base flange' : 'Опорный фланец', pole.flange], [en ? 'Anchors: diagonal / bolts / height' : 'Закладная: диагональ / болты / высота', pole.anchors]].map(([label, value]) => <div key={label}><dt className="text-xs text-slate-400">{label}</dt><dd className="mt-1 text-sm text-slate-100">{value}</dd></div>)}</dl></div>)}</div>
          <p className="mt-4 max-w-4xl text-sm leading-6 text-slate-400">{en ? 'Q235 steel, hot-dip galvanizing and powder coating. Foundation excavation depends on local soil, rain and wind loads. These dimensions apply to the supplied conch/A-arm references only; do not apply them to the decorative pole or interpolate a 7 m structure.' : 'Сталь Q235, горячее цинкование и порошковая окраска. Котлован рассчитывают по грунту, осадкам и ветру. Размеры относятся только к дуговой и А-образной конструкциям; не переносите их на декоративную опору или вариант 7 м.'}</p>
        </section>
        <section id="regions" className="scroll-mt-24" aria-labelledby="jz-regions-title">
          <h2 id="jz-regions-title" className="text-2xl font-bold text-slate-50">{en ? 'Select for the site, not only the country' : 'Выбирайте по условиям объекта'}</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">{catalogue.regions.map((region) => <div key={region.title.en} className="border-l-2 border-yellow-400 bg-slate-900/70 p-6"><h3 className="font-semibold text-slate-100">{region.title[locale]}</h3><p className="mt-3 text-sm leading-7 text-slate-300">{region.text[locale]}</p></div>)}</div>
        </section>
        <section className="rounded-2xl border border-slate-700 bg-slate-900 p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-slate-50">{en ? 'Confirm a configuration for your project' : 'Согласуйте комплектацию для объекта'}</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">{en ? 'Send the model code, quantity, installation height, location, road width and required lighting schedule. Prices, controller type, photometry and final structural drawings are confirmed with the quotation.' : 'Отправьте код модели, количество, высоту, место установки, ширину дороги и график освещения. Цена, контроллер, фотометрия и окончательные чертежи согласуются в предложении.'}</p>
          <a href={whatsapp} target="_blank" rel="noopener noreferrer" className={`${buttonClass} mt-6`}>{en ? 'Discuss the JZ configuration on WhatsApp' : 'Обсудить комплектацию JZ в WhatsApp'}</a>
          <details className="mt-8 border-t border-slate-700 pt-5"><summary className="cursor-pointer text-sm text-slate-300">{en ? 'View the supplied configuration sheets' : 'Исходные таблицы комплектации'}</summary><div className="mt-4 flex flex-wrap gap-4">{catalogue.sources.map((source) => <a key={source.code} href={source.image} target="_blank" rel="noopener noreferrer" className="text-sm text-yellow-300 underline underline-offset-4">{source.code === 'bracket' ? (en ? 'Clamp / wall sheet' : 'Хомут / стена') : `${source.code} ${en ? 'pole sheet' : 'опора'}`} ↗</a>)}</div></details>
        </section>
      </div>
    </>
  )
}
