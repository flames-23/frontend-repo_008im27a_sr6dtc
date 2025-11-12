import { useEffect, useMemo, useState } from 'react'

export default function News({ lang }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const t = useMemo(() => ({
    en: { title: 'Latest News', empty: 'No news yet. Seed to preview.', seed: 'Load demo news' },
    ar: { title: 'أحدث الأخبار', empty: 'لا توجد أخبار بعد. قم بالتحميل التجريبي.', seed: 'تحميل أخبار تجريبية' },
  })[lang], [lang])

  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const fetchNews = async () => {
    try {
      setLoading(true)
      const controller = new AbortController()
      const id = setTimeout(() => controller.abort(), 8000)
      const res = await fetch(`${baseUrl}/api/news?limit=9`, { signal: controller.signal })
      clearTimeout(id)
      if (!res.ok) throw new Error('Failed to load news')
      const data = await res.json()
      setItems(Array.isArray(data) ? data : [])
    } catch (e) {
      setError(e.message || 'Error')
    } finally {
      setLoading(false)
    }
  }

  const seed = async () => {
    try {
      const res = await fetch(`${baseUrl}/api/news/seed`, { method: 'POST' })
      if (!res.ok) throw new Error('Seed failed')
      fetchNews()
    } catch (e) {
      setError(e.message)
    }
  }

  useEffect(() => { fetchNews() }, [])

  return (
    <section id="news" className="py-16 bg-gradient-to-b from-transparent to-black/[0.02] dark:to-white/[0.03]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-black dark:text-white">{t.title}</h2>
          <button onClick={seed} className="text-xs px-3 py-2 rounded-md bg-black/5 dark:bg-white/10 text-black dark:text-white hover:bg-black/10 dark:hover:bg-white/20">
            {t.seed}
          </button>
        </div>

        {loading ? (
          <p className="text-black/60 dark:text-white/60">Loading...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : items.length === 0 ? (
          <p className="text-black/60 dark:text-white/60">{t.empty}</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((n, idx) => (
              <article
                key={n.id || idx}
                className="group rounded-xl overflow-hidden border border-black/5 dark:border-white/10 bg-white/70 dark:bg-black/40 backdrop-blur hover:shadow-xl hover:shadow-orange-500/10 transition-colors"
              >
                {n.image_url && (
                  <div className="aspect-[16/9] overflow-hidden">
                    <img loading="lazy" src={n.image_url} alt="news" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                )}
                <div className="p-5">
                  <div className="text-[10px] uppercase tracking-wider text-orange-600 dark:text-orange-400 font-semibold">{n.tag}</div>
                  <h3 className="mt-2 text-lg font-semibold text-black dark:text-white line-clamp-2">{lang === 'en' ? n.title_en : n.title_ar}</h3>
                  {(n.body_en || n.body_ar) && (
                    <p className="mt-2 text-sm text-black/70 dark:text-white/70 line-clamp-3">{lang === 'en' ? n.body_en : n.body_ar}</p>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
