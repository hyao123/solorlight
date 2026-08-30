import Image from 'next/image'
import Link from 'next/link'

interface CatalogueShowcaseProps {
  locale: 'en' | 'ru'
}

const ITEMS = [
  {
    code: 'A / ROAD',
    image: '/images/catalogue/road-light-options.jpg',
    en: 'Road & avenue configurations',
    ru: 'Конфигурации для дорог и проспектов',
    noteEn: 'Single- and double-arm forms for road projects.',
    noteRu: 'Одно- и двухрожковые решения для дорожных проектов.',
    span: 'lg:col-span-5',
  },
  {
    code: 'B / PARK',
    image: '/images/catalogue/decorative-light-options.jpg',
    en: 'Decorative park lighting',
    ru: 'Декоративное освещение парков',
    noteEn: 'Coordinated lamp heads and poles for public spaces.',
    noteRu: 'Согласованные светильники и опоры для общественных пространств.',
    span: 'lg:col-span-4',
  },
  {
    code: 'C / LANDSCAPE',
    image: '/images/catalogue/landscape-light-options.jpg',
    en: 'Landscape & courtyard forms',
    ru: 'Ландшафтные и дворовые решения',
    noteEn: 'Compact forms for paths, entrances and courtyards.',
    noteRu: 'Компактные решения для дорожек, входных зон и дворов.',
    span: 'lg:col-span-3',
  },
] as const

export function CatalogueShowcase({ locale }: CatalogueShowcaseProps) {
  const en = locale === 'en'

  return (
    <section className="border-y border-slate-800 bg-slate-950 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto]">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-yellow-400">
              <span className="h-px w-10 bg-yellow-400" aria-hidden="true" />
              03 / {en ? 'Configuration library' : 'Библиотека конфигураций'}
            </div>
            <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-50 sm:text-4xl">
              {en ? 'Pole & design options' : 'Варианты опор и дизайна'}
            </h2>
            <p className="mt-4 max-w-2xl leading-7 text-slate-400">
              {en
                ? 'Match the pole form, arm, luminaire, solar panel and finish to the project. These catalogue views show representative directions; our engineers confirm the final configuration for your site.'
                : 'Подберите форму опоры, кронштейн, светильник, солнечную панель и покрытие под проект. В каталоге показаны примеры направлений; окончательную комплектацию инженеры согласуют для вашего объекта.'}
            </p>
          </div>
          <Link
            href={`/${locale}/contact`}
            className="inline-flex w-fit items-center gap-2 rounded-xl border border-yellow-400/60 px-5 py-3 text-sm font-semibold text-yellow-300 transition hover:border-yellow-300 hover:bg-yellow-400 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
          >
            {en ? 'Request a matched configuration' : 'Запросить подходящую комплектацию'}
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="relative mt-12">
          <div className="absolute left-0 right-0 top-0 h-px bg-yellow-400/70" aria-hidden="true" />
          <div className="grid gap-5 pt-6 lg:grid-cols-12">
            {ITEMS.map((item, index) => (
              <article
                key={item.code}
                className={`group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 ${item.span}`}
              >
                <div className="absolute left-5 top-0 z-10 h-3 w-px bg-yellow-400" aria-hidden="true" />
                <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4 font-mono text-[11px] uppercase tracking-[0.18em]">
                  <span className="text-yellow-400">{item.code}</span>
                  <span className="text-slate-500">0{index + 1}</span>
                </div>
                <div className="relative aspect-[4/5] overflow-hidden bg-white">
                  <Image
                    src={item.image}
                    alt={en ? item.en : item.ru}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-contain transition duration-500 group-hover:scale-[1.025] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-slate-100">{en ? item.en : item.ru}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{en ? item.noteEn : item.noteRu}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
