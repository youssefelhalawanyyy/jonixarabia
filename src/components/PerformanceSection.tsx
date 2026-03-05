'use client';

import { motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { certifiedPerformance } from '@/data/catalog';

export default function PerformanceSection() {
  const t = useTranslations('performance');
  const locale = useLocale();

  return (
    <section className="section-spacer bg-[var(--jonix-surface)] grid-overlay">
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

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {certifiedPerformance.map((item, index) => (
            <motion.div
              key={item.en}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              className="soft-card rounded-2xl p-5"
            >
              <p className="text-sm leading-relaxed text-slate-700">
                {locale === 'ar' ? item.ar : item.en}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
