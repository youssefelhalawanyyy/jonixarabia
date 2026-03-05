'use client';

import { motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import {
  electrostaticAdvantages,
  electrostaticGermicidalEffect,
  electrostaticOperation,
  electrostaticOverview,
  electrostaticPathogens,
  type LocalizedText,
} from '@/data/catalog';

function pick(locale: string, item: LocalizedText) {
  return locale === 'ar' ? item.ar : item.en;
}

export default function ElectrostaticFilterSection() {
  const t = useTranslations('electrostatic');
  const locale = useLocale();

  return (
    <section id="electrostatic" className="section-spacer">
      <div className="container-shell">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.45 }}
          className="text-3xl font-extrabold text-slate-900 sm:text-4xl"
        >
          {t('title')}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.45, delay: 0.08 }}
          className="mt-3 max-w-4xl text-base text-[var(--jonix-slate-600)]"
        >
          {t('subtitle')}
        </motion.p>

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          <Card title={t('overviewTitle')} items={electrostaticOverview} locale={locale} delay={0.02} />
          <Card title={t('operationTitle')} items={electrostaticOperation} locale={locale} delay={0.08} />
          <Card title={t('germicidalTitle')} items={electrostaticGermicidalEffect} locale={locale} delay={0.14} />
          <Card title={t('advantagesTitle')} items={electrostaticAdvantages} locale={locale} delay={0.2} />
        </div>

        <motion.h3
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4 }}
          className="mt-10 text-2xl font-extrabold text-[var(--jonix-blue-900)]"
        >
          {t('pathogensTitle')}
        </motion.h3>

        <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {electrostaticPathogens.map((group, index) => (
            <motion.article
              key={group.id}
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.35, delay: index * 0.06 }}
              whileHover={{ y: -5 }}
              className="rounded-3xl border border-[var(--jonix-border)] bg-white p-5 shadow-[0_18px_35px_rgba(4,42,82,0.08)]"
            >
              <h4 className="text-sm font-extrabold uppercase tracking-wide text-[var(--jonix-blue-900)]">
                {pick(locale, group.title)}
              </h4>
              <div className="mt-3 space-y-2">
                {group.items.map((item, itemIndex) => (
                  <p key={itemIndex} className="rounded-xl border border-[var(--jonix-border)] bg-[#fafafa] px-3 py-2 text-xs leading-relaxed text-slate-700">
                    {pick(locale, item)}
                  </p>
                ))}
              </div>
              {group.note && (
                <p className="mt-3 rounded-xl border border-[#c7d7dc] bg-[#edf3f5] px-3 py-2 text-xs leading-relaxed text-[#43545a]">
                  {pick(locale, group.note)}
                </p>
              )}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Card({
  title,
  items,
  locale,
  delay,
}: {
  title: string;
  items: LocalizedText[];
  locale: string;
  delay: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.42, delay }}
      className="rounded-3xl border border-[var(--jonix-border)] bg-[linear-gradient(140deg,#ffffff,#f2f2f2)] p-6 shadow-[0_18px_35px_rgba(4,42,82,0.08)]"
    >
      <h3 className="text-lg font-extrabold text-[var(--jonix-blue-900)]">{title}</h3>
      <div className="mt-4 space-y-2">
        {items.map((item) => (
          <motion.p
            key={item.en}
            initial={{ opacity: 0, x: locale === 'ar' ? 10 : -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.24 }}
            className="rounded-xl border border-[var(--jonix-border)] bg-white px-3 py-2 text-sm leading-relaxed text-slate-700"
          >
            {pick(locale, item)}
          </motion.p>
        ))}
      </div>
    </motion.article>
  );
}
