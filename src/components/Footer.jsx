export default function Footer({ lang }) {
  const year = new Date().getFullYear()
  const t = {
    en: { rights: `All rights reserved.`, made: 'Crafted with care.' },
    ar: { rights: `جميع الحقوق محفوظة.`, made: 'صُنع بإتقان.' },
  }[lang]

  return (
    <footer id="contact" className="py-10 border-t border-black/5 dark:border-white/10 bg-white/60 dark:bg-black/40 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-black/70 dark:text-white/70">© {year} AIO Technical Solutions. {t.rights}</p>
        <p className="text-sm text-black/70 dark:text-white/70">{t.made}</p>
      </div>
    </footer>
  )
}
