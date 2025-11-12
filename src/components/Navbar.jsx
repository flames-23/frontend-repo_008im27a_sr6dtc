import { useEffect } from 'react'
import { Sun, Moon, Globe2 } from 'lucide-react'

export default function Navbar({ theme, setTheme, lang, setLang }) {
  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') root.classList.add('dark')
    else root.classList.remove('dark')
  }, [theme])

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark')
  const toggleLang = () => setLang(lang === 'en' ? 'ar' : 'en')

  const t = {
    en: { company: 'AIO Technical Solutions', news: 'News', services: 'Services', contact: 'Contact' },
    ar: { company: 'حلول AIO التقنية', news: 'الأخبار', services: 'الخدمات', contact: 'تواصل' },
  }[lang]

  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-black/40 border-b border-black/5 dark:border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-md bg-gradient-to-br from-orange-500 to-orange-600 shadow-inner"></div>
          <span className="font-semibold tracking-tight text-black dark:text-white">
            {t.company}
          </span>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm text-black/70 dark:text-white/70">
          <a href="#news" className="hover:text-orange-600 dark:hover:text-orange-400 transition">{t.news}</a>
          <a href="#services" className="hover:text-orange-600 dark:hover:text-orange-400 transition">{t.services}</a>
          <a href="#contact" className="hover:text-orange-600 dark:hover:text-orange-400 transition">{t.contact}</a>
        </nav>
        <div className="flex items-center gap-2">
          <button onClick={toggleLang} aria-label="toggle language" className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-black/5 dark:bg-white/10 text-black dark:text-white hover:bg-black/10 dark:hover:bg-white/20 transition">
            <Globe2 className="h-4 w-4" />
            <span className="text-xs font-medium">{lang === 'en' ? 'EN' : 'AR'}</span>
          </button>
          <button onClick={toggleTheme} aria-label="toggle theme" className="p-2 rounded-md bg-black/5 dark:bg-white/10 text-black dark:text-white hover:bg-black/10 dark:hover:bg-white/20 transition">
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </header>
  )
}
