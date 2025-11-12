import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import News from './components/News'
import Footer from './components/Footer'

function App() {
  const [theme, setTheme] = useState('dark')
  const [lang, setLang] = useState('en')

  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
  }, [lang])

  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white transition-colors">
      <Navbar theme={theme} setTheme={setTheme} lang={lang} setLang={setLang} />
      <main className="pt-16">
        <Hero lang={lang} />
        <section id="services" className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold">{lang === 'en' ? 'What we do' : 'ماذا نقدم'}</h2>
            <p className="mt-3 text-black/70 dark:text-white/70 max-w-2xl">
              {lang === 'en' ?
                'We design, build, and scale AI-powered automation systems tailored to your business outcomes.' :
                'نصمم ونبني ونوسع أنظمة أتمتة مدعّمة بالذكاء الاصطناعي ومخصصة لنتائج عملك.'
              }
            </p>
            <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[{
                en: { t: 'Process Automation', d: 'RPA + AI to streamline operations.' },
                ar: { t: 'أتمتة العمليات', d: 'دمج RPA والذكاء لتبسيط العمليات.' }
              },{
                en: { t: 'Data Platforms', d: 'Pipelines, lakes, and realtime analytics.' },
                ar: { t: 'منصات البيانات', d: 'أنابيب بيانات وبحيرات وتحليلات فورية.' }
              },{
                en: { t: 'Intelligent Apps', d: 'Copilots, chat, and decision systems.' },
                ar: { t: 'تطبيقات ذكية', d: 'مساعدون، محادثات، وأنظمة قرارات.' }
              }].map((s, i) => (
                <div key={i} className="rounded-xl border border-black/5 dark:border-white/10 p-6 bg-white/70 dark:bg-black/40 backdrop-blur hover:shadow-lg hover:shadow-orange-500/10 transition">
                  <div className="h-10 w-10 rounded-md bg-gradient-to-br from-orange-500 to-orange-600 shadow-inner" />
                  <h3 className="mt-4 font-semibold">{lang === 'en' ? s.en.t : s.ar.t}</h3>
                  <p className="mt-2 text-sm text-black/70 dark:text-white/70">{lang === 'en' ? s.en.d : s.ar.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <News lang={lang} />
      </main>
      <Footer lang={lang} />
    </div>
  )
}

export default App
