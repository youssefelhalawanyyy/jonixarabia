'use client';

import { useMemo, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import { productLines, partnerLogo } from '@/data/catalog';
import MediaImage from '@/components/MediaImage';
import { ChevronDownIcon, CloseIcon, MenuIcon } from '@/components/icons';

export default function Header() {
  const t = useTranslations('header');
  const locale = useLocale();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = useMemo(
    () => [
      { label: t('products'), href: `/${locale}#products` },
      { label: t('technology'), href: `/${locale}#technology` },
      { label: t('electrostatic'), href: `/${locale}#electrostatic` },
      { label: t('certifications'), href: `/${locale}#certifications` },
      { label: t('installations'), href: `/${locale}#installations` },
      { label: t('applications'), href: `/${locale}#applications` },
      { label: t('mena'), href: `/${locale}#mena` },
      { label: t('contact'), href: `/${locale}#contact` },
    ],
    [locale, t]
  );

  function changeLocale(targetLocale: 'en' | 'ar') {
    if (targetLocale === locale) {
      return;
    }

    const { pathname, search, hash } = window.location;
    const pathWithoutLocale = pathname.replace(/^\/(en|ar)(?=\/|$)/, '') || '/';
    const normalizedPath = pathWithoutLocale === '/' ? '' : pathWithoutLocale;
    const target = `/${targetLocale}${normalizedPath}${search}${hash}`;
    window.location.assign(target);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur-md shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
      <div className="container-shell">
        <div className="flex h-20 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3">
            <span className="relative h-10 w-10 overflow-hidden rounded-xl border border-slate-200 bg-white">
              <MediaImage
                src={partnerLogo}
                alt="Jonix Arabia"
                className="h-full w-full object-contain p-1"
                loading="eager"
                fallbackLabel="JA"
              />
            </span>
            <span className="hidden text-sm font-bold tracking-wide text-slate-900 lg:block">
              JONIX ARABIA
            </span>
          </Link>

          <div className="hidden items-center gap-6 lg:flex">
            {navItems
              .filter((item) => item.label !== t('products'))
              .map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-sm font-semibold text-slate-700 transition-colors hover:text-[var(--jonix-blue-700)]"
                >
                  {item.label}
                </a>
              ))}

            <div className="group relative">
              <button
                type="button"
                className="inline-flex items-center gap-1 text-sm font-semibold text-slate-700 transition-colors hover:text-[var(--jonix-blue-700)]"
              >
                {t('products')}
                <ChevronDownIcon className="h-4 w-4" />
              </button>
              <div className="pointer-events-none absolute end-0 top-[calc(100%+12px)] w-[360px] rounded-2xl border border-slate-200 bg-white p-4 opacity-0 shadow-xl transition-all duration-200 group-hover:pointer-events-auto group-hover:opacity-100">
                <p className="mb-3 text-xs font-bold uppercase tracking-wide text-slate-500">
                  {t('productMenuTitle')}
                </p>
                <div className="space-y-1">
                  {productLines.map((line) => (
                    <Link
                      key={line.slug}
                      href={`/products?line=${line.slug}`}
                      className="block rounded-xl px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-[var(--jonix-blue-100)] hover:text-[var(--jonix-blue-900)]"
                    >
                      {locale === 'ar' ? line.name.ar : line.name.en}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <div className="inline-flex items-center rounded-xl border border-slate-200 p-1">
              <button
                type="button"
                onClick={() => changeLocale('en')}
                className={`rounded-lg px-3 py-1 text-xs font-bold transition-colors ${
                  locale === 'en'
                    ? 'bg-[var(--jonix-blue-900)] text-white'
                    : 'text-slate-600 hover:text-[var(--jonix-blue-700)]'
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => changeLocale('ar')}
                className={`rounded-lg px-3 py-1 text-xs font-bold transition-colors ${
                  locale === 'ar'
                    ? 'bg-[var(--jonix-blue-900)] text-white'
                    : 'text-slate-600 hover:text-[var(--jonix-blue-700)]'
                }`}
              >
                AR
              </button>
            </div>

            <a
              href={`/${locale}#contact`}
              className="button-glow rounded-xl bg-[var(--jonix-blue-900)] px-5 py-2.5 text-[0.92rem] font-extrabold text-white transition-transform hover:scale-[1.02]"
            >
              {t('consultation')}
            </a>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700 lg:hidden"
            aria-label={mobileOpen ? t('closeMenu') : t('openMenu')}
          >
            {mobileOpen ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>

        {mobileOpen && (
          <div className="space-y-2 border-t border-slate-200 py-4 lg:hidden">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="block rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-[var(--jonix-blue-100)]"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </a>
            ))}

            <div className="flex items-center gap-3 pt-1">
              <div className="flex flex-1 items-center rounded-xl border border-slate-200 p-1">
                <button
                  type="button"
                  onClick={() => changeLocale('en')}
                  className={`flex-1 rounded-lg px-2 py-1 text-xs font-bold ${
                    locale === 'en' ? 'bg-[var(--jonix-blue-900)] text-white' : 'text-slate-700'
                  }`}
                >
                  EN
                </button>
                <button
                  type="button"
                  onClick={() => changeLocale('ar')}
                  className={`flex-1 rounded-lg px-2 py-1 text-xs font-bold ${
                    locale === 'ar' ? 'bg-[var(--jonix-blue-900)] text-white' : 'text-slate-700'
                  }`}
                >
                  AR
                </button>
              </div>
              <a
                href={`/${locale}#contact`}
                className="flex-1 rounded-xl bg-[var(--jonix-blue-900)] px-3 py-2 text-center text-[0.92rem] font-extrabold text-white"
                onClick={() => setMobileOpen(false)}
              >
                {t('consultation')}
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
