import { lazy, Suspense, useEffect, useMemo, useRef, useState } from 'react'

// Lazy-load Spline to avoid loading heavy 3D on first paint
const LazySpline = lazy(() => import('@splinetool/react-spline'))

function useInView(options = { root: null, rootMargin: '0px', threshold: 0.1 }) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), options)
    obs.observe(el)
    return () => obs.disconnect()
  }, [options.root, options.rootMargin, options.threshold])

  return { ref, inView }
}

export default function Hero({ lang }) {
  const t = {
    en: {
      title: 'AIO Technical Solutions',
      subtitle: 'Automation, Intelligence, and Outcomes — delivered.',
      cta: 'Explore our work',
    },
    ar: {
      title: 'حلول AIO التقنية',
      subtitle: 'أتمتة وذكاء ونتائج — نقدّمها لك.',
      cta: 'استكشف أعمالنا',
    },
  }[lang]

  const { ref, inView } = useInView({ threshold: 0.2 })

  // Respect user/device performance preferences
  const shouldAvoidHeavy = useMemo(() => {
    const reducedMotion = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const saveData = typeof navigator !== 'undefined' && 'connection' in navigator && navigator.connection && navigator.connection.saveData
    const lowPerf = typeof navigator !== 'undefined' && navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4
    return reducedMotion || saveData || lowPerf
  }, [])

  return (
    <section ref={ref} className="relative min-h-[80vh] flex items-center overflow-hidden bg-gradient-to-b from-orange-50 to-white dark:from-black dark:to-zinc-900">
      {/* Only render Spline when visible and device looks capable */}
      {!shouldAvoidHeavy && inView && (
        <div className="absolute inset-0" aria-hidden>
          <Suspense fallback={null}>
            <LazySpline scene="https://prod.spline.design/IWEIbUehLbfUBd3s/scene.splinecode" style={{ width: '100%', height: '100%' }} />
          </Suspense>
        </div>
      )}

      {/* Soft overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/70 to-white/10 dark:from-black/70 dark:to-black/20 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-black via-orange-600 to-black dark:from-white dark:via-orange-400 dark:to-white transition-opacity">
            {t.title}
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-black/70 dark:text-white/70">
            {t.subtitle}
          </p>
          <a
            href="#news"
            className="inline-block mt-8 px-5 py-3 rounded-lg bg-orange-600 text-white hover:bg-orange-500 transition-colors shadow-lg shadow-orange-600/20"
          >
            {t.cta}
          </a>
          {shouldAvoidHeavy && (
            <p className="mt-3 text-xs text-black/50 dark:text-white/50">
              Lightweight mode enabled for smoother performance.
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
