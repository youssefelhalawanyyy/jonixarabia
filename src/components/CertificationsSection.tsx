'use client';

import { motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { certifications, standardsReferences } from '@/data/catalog';
import { ShieldIcon } from '@/components/icons';
import MediaImage from '@/components/MediaImage';

export default function CertificationsSection() {
  const t = useTranslations('certifications');
  const locale = useLocale();

  return (
    <section id="certifications" className="section-spacer bg-[var(--jonix-surface)]">
      <div className="container-shell">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.45 }}
          className="text-3xl font-extrabold text-slate-900 sm:text-4xl"
        >
          {t('title')}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.45, delay: 0.08 }}
          className="mt-3 max-w-3xl text-base text-[var(--jonix-slate-600)]"
        >
          {t('subtitle')}
        </motion.p>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {certifications.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.38, delay: index * 0.05 }}
              className="soft-card rounded-2xl p-5"
            >
              <div className="flex items-start gap-4">
                <div className="relative h-14 w-14 overflow-hidden rounded-xl border border-[var(--jonix-border)] bg-white">
                  <MediaImage
                    src={item.logo}
                    alt={locale === 'ar' ? item.name.ar : item.name.en}
                    className="h-full w-full object-contain p-1"
                    fallbackLabel={locale === 'ar' ? item.name.ar : item.name.en}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-base font-bold text-slate-900">
                    {locale === 'ar' ? item.name.ar : item.name.en}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {locale === 'ar' ? item.summary.ar : item.summary.en}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-[var(--jonix-border)] pt-3">
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--jonix-blue-700)]">
                  <ShieldIcon className="h-4 w-4" />
                  {locale === 'ar' ? 'رسمي' : 'Official'}
                </span>
                <a
                  href={item.officialPage}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-semibold text-[var(--jonix-blue-700)] hover:underline"
                >
                  jonixair.com
                </a>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.h3
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.4 }}
          className="mt-10 text-2xl font-extrabold text-slate-900"
        >
          {t('standardsTitle')}
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.4, delay: 0.08 }}
          className="mt-2 max-w-3xl text-sm text-[var(--jonix-slate-600)]"
        >
          {t('standardsSubtitle')}
        </motion.p>

        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {standardsReferences.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.35, delay: index * 0.06 }}
              className="rounded-2xl border border-[var(--jonix-border)] bg-white p-5 shadow-[0_10px_25px_rgba(4,42,82,0.06)]"
            >
              <div className="flex items-start gap-3">
                <div className="relative h-10 w-10 overflow-hidden rounded-lg border border-[var(--jonix-border)] bg-white">
                  <MediaImage
                    src={item.logo}
                    alt={locale === 'ar' ? item.name.ar : item.name.en}
                    className="h-full w-full object-contain p-1"
                    fallbackLabel={locale === 'ar' ? item.name.ar : item.name.en}
                  />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{locale === 'ar' ? item.name.ar : item.name.en}</h4>
                  <p className="mt-1 text-xs leading-relaxed text-slate-600">
                    {locale === 'ar' ? item.summary.ar : item.summary.en}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
