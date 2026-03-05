'use client';

import { motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import {
  egyptAuthorization,
  egyptFieldValidation,
  installationGroups,
  installationsNow,
  regionSummary,
} from '@/data/catalog';

export default function InstallationsSection() {
  const t = useTranslations('installations');
  const locale = useLocale();
  const pick = (item: { en: string; ar: string }) =>
    locale === 'ar' ? item.ar : item.en;

  return (
    <section id="installations" className="section-spacer bg-[var(--jonix-surface)]">
      <div className="container-shell">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-extrabold text-slate-900 sm:text-4xl"
        >
          {t('title')}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="mt-3 max-w-4xl text-base leading-relaxed text-[var(--jonix-slate-600)]"
        >
          {t('subtitle')}
        </motion.p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {installationsNow.map((item, index) => (
            <motion.article
              key={item.en}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.36, delay: index * 0.06 }}
              className="rounded-2xl border border-[var(--jonix-border)] bg-white p-5 shadow-[0_12px_35px_rgba(4,42,82,0.08)]"
            >
              <p className="text-sm font-semibold leading-relaxed text-slate-700">{pick(item)}</p>
            </motion.article>
          ))}
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          <motion.article
            initial={{ opacity: 0, x: -18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.42 }}
            className="rounded-3xl border border-[var(--jonix-border)] bg-white p-6 shadow-[0_12px_35px_rgba(4,42,82,0.08)]"
          >
            <h3 className="text-lg font-extrabold text-[var(--jonix-blue-900)]">{t('authorizationTitle')}</h3>
            <div className="mt-3 space-y-2">
              {egyptAuthorization.map((item) => (
                <p key={item.en} className="text-sm leading-relaxed text-slate-700">
                  {pick(item)}
                </p>
              ))}
            </div>
          </motion.article>

          <motion.article
            initial={{ opacity: 0, x: 18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.42 }}
            className="rounded-3xl border border-[var(--jonix-border)] bg-white p-6 shadow-[0_12px_35px_rgba(4,42,82,0.08)]"
          >
            <h3 className="text-lg font-extrabold text-[var(--jonix-blue-900)]">{t('fieldTitle')}</h3>
            <div className="mt-3 space-y-2">
              {egyptFieldValidation.map((item) => (
                <p key={item.en} className="text-sm leading-relaxed text-slate-700">
                  {pick(item)}
                </p>
              ))}
            </div>
          </motion.article>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
          <div className="space-y-5">
            {installationGroups.map((group, groupIndex) => (
              <motion.article
                key={group.id}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.18 }}
                transition={{ duration: 0.42, delay: groupIndex * 0.03 }}
                className="rounded-3xl border border-[var(--jonix-border)] bg-white p-6 shadow-[0_15px_35px_rgba(4,42,82,0.08)]"
              >
                <h3 className="text-xl font-extrabold text-[var(--jonix-blue-900)]">
                  {pick(group.title)}
                </h3>

                <div className="mt-4 grid gap-2">
                  {group.items.map((item, itemIndex) => (
                    <motion.div
                      key={`${group.id}-${itemIndex}`}
                      initial={{ opacity: 0, x: locale === 'ar' ? 14 : -14 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.1 }}
                      transition={{ duration: 0.28, delay: itemIndex * 0.012 }}
                      className="rounded-xl border border-[var(--jonix-border)] bg-[#fafafa] px-3 py-2 text-sm text-slate-700"
                    >
                      {pick(item)}
                    </motion.div>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>

          <motion.aside
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.45 }}
            className="sticky top-28 h-max rounded-3xl border border-[var(--jonix-border)] bg-gradient-to-b from-white to-[#f2f2f2] p-6 shadow-[0_15px_35px_rgba(4,42,82,0.08)]"
          >
            <h3 className="text-lg font-extrabold text-[var(--jonix-blue-900)]">
              {locale === 'ar' ? 'ملخص الانتشار الإقليمي' : 'Regional Deployment Summary'}
            </h3>
            <div className="mt-4 space-y-2">
              {regionSummary.map((item) => (
                <p key={item.en} className="rounded-xl border border-[var(--jonix-border)] bg-white px-3 py-2 text-sm leading-relaxed text-slate-700">
                  {pick(item)}
                </p>
              ))}
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
