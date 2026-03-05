'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import { socialLinks } from '@/data/catalog';

export default function Footer() {
  const locale = useLocale();
  const t = useTranslations('footer');
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[#4f4f4f] bg-[#565656] py-10 text-white">
      <div className="container-shell">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="text-sm font-extrabold uppercase tracking-wide text-[#c7dde2]">Jonix Arabia</h3>
            <p className="mt-3 text-sm leading-relaxed text-[#ececec]">{t('note')}</p>
          </div>
          <div>
            <h3 className="text-sm font-extrabold uppercase tracking-wide text-[#c7dde2]">
              {locale === 'ar' ? 'روابط سريعة' : 'Quick Links'}
            </h3>
            <div className="mt-3 flex flex-col gap-2 text-sm text-white">
              <Link href="/">{locale === 'ar' ? 'الرئيسية' : 'Home'}</Link>
              <Link href="/products">{locale === 'ar' ? 'المنتجات' : 'Products'}</Link>
              <a href={`/${locale}#electrostatic`}>{locale === 'ar' ? 'الفلتر الكهروستاتيكي' : 'Electrostatic Filter'}</a>
              <a href={`/${locale}#certifications`}>{locale === 'ar' ? 'الاعتمادات' : 'Certifications'}</a>
              <a href={`/${locale}#installations`}>{locale === 'ar' ? 'أماكن التشغيل' : 'Installations'}</a>
              <a href={`/${locale}#contact`}>{locale === 'ar' ? 'التواصل' : 'Contact'}</a>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-extrabold uppercase tracking-wide text-[#c7dde2]">{t('socialTitle')}</h3>
            <p className="mt-2 text-xs text-[#ececec]">{t('socialSubtitle')}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-[#9cbcc3] bg-[#8eb2bb] px-3.5 py-1.5 text-[0.82rem] font-extrabold text-[#22343a] transition-colors hover:bg-[#d8e4e7]"
                >
                  {social.label}
                </a>
              ))}
            </div>
            <a
              href="https://jonixair.com/en"
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-block text-xs font-semibold text-[#c7dde2] hover:underline"
            >
              jonixair.com/en
            </a>
          </div>
        </div>

        <div className="mt-8 border-t border-[#7a7a7a] pt-5 text-xs text-[#f0f0f0]">
          © {year} Jonix Arabia. {t('rights')}
        </div>
      </div>
    </footer>
  );
}
