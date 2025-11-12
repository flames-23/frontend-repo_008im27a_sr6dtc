import Spline from '@splinetool/react-spline'
import { motion } from 'framer-motion'

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

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/IWEIbUehLbfUBd3s/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-white/80 to-white/10 dark:from-black/70 dark:to-black/30 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-black via-orange-600 to-black dark:from-white dark:via-orange-400 dark:to-white"
          >
            {t.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-4 text-lg sm:text-xl text-black/70 dark:text-white/70"
          >
            {t.subtitle}
          </motion.p>
          <motion.a
            href="#news"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="inline-block mt-8 px-5 py-3 rounded-lg bg-orange-600 text-white hover:bg-orange-500 transition shadow-lg shadow-orange-600/30"
          >
            {t.cta}
          </motion.a>
        </div>
      </div>
    </section>
  )
}
