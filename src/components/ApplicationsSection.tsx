'use client';

import { motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { applications } from '@/data/catalog';
import { BuildingIcon, ShieldIcon, SparkIcon } from '@/components/icons';

const iconSet = [BuildingIcon, ShieldIcon, SparkIcon, BuildingIcon, ShieldIcon, SparkIcon];

export default function ApplicationsSection() {
  const t = useTranslations('applications');
  const locale = useLocale();

  return (
    <section id="applications" className="section-spacer">
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
          {applications.map((item, index) => {
            const Icon = iconSet[index];
            return (
              <motion.article
                key={item.en}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.36, delay: index * 0.04 }}
                className="soft-card rounded-2xl p-5"
              >
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--jonix-blue-100)] text-[var(--jonix-blue-700)]">
                  <Icon className="h-5 w-5" />
                </div>
                <p className="mt-3 text-sm font-semibold leading-relaxed text-slate-700">
                  {locale === 'ar' ? item.ar : item.en}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
