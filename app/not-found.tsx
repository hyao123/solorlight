import Link from 'next/link'

export default function NotFound() {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col items-center justify-center bg-slate-950 text-slate-50 antialiased p-6">
        <span className="text-5xl mb-4" aria-hidden="true">☀️</span>
        <h1 className="text-4xl font-bold tracking-tight text-yellow-400">404</h1>
        <p className="mt-2 text-lg text-slate-200">Page Not Found / Страница не найдена</p>
        <p className="mt-1 text-sm text-slate-400 text-center max-w-md">
          The requested solar lighting solution, specification, or product page does not exist.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/en"
            className="rounded-full bg-yellow-400 px-6 py-2.5 text-sm font-bold text-slate-950 hover:bg-yellow-300 transition"
          >
            Home / Главная
          </Link>
          <Link
            href="/en/products"
            className="rounded-full border border-slate-700 bg-slate-900 px-6 py-2.5 text-sm font-semibold text-slate-200 hover:border-yellow-400 transition"
          >
            Products / Каталог
          </Link>
        </div>
      </body>
    </html>
  )
}
