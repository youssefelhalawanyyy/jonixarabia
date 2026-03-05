'use client';

import { motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { menaAdaptationPoints } from '@/data/catalog';
import { GlobeIcon } from '@/components/icons';

export default function MENASection() {
  const t = useTranslations('mena');
  const locale = useLocale();

  return (
    <section id="mena" className="section-spacer bg-[var(--jonix-surface)]">
      <div className="container-shell grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
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

          <div className="mt-7 space-y-3">
            {menaAdaptationPoints.map((item, index) => (
              <motion.div
                key={item.en}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.35, delay: index * 0.06 }}
                className="soft-card rounded-2xl p-4"
              >
                <p className="text-sm leading-relaxed text-slate-700">{locale === 'ar' ? item.ar : item.en}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.aside
          initial={{ opacity: 0, x: 14 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45 }}
          className="soft-card rounded-3xl p-6"
        >
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--jonix-blue-100)] text-[var(--jonix-blue-700)]">
            <GlobeIcon className="h-6 w-6" />
          </div>
          <h3 className="mt-4 text-lg font-extrabold text-slate-900">
            {locale === 'ar' ? 'التواجد الإقليمي' : 'Regional Presence'}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-700">
            {locale === 'ar'
              ? 'تركز هذه المنصة على مصر والشرق الأوسط مع محتوى ثنائي اللغة ودعم قطاعات الرعاية الصحية والضيافة والتعليم والصناعة والمكاتب.'
              : 'This platform focuses on Egypt and the Middle East with bilingual content and sector-ready positioning for healthcare, hospitality, education, industry and offices.'}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-slate-700">
            {locale === 'ar'
              ? 'بيانات التقنية والمواصفات المعروضة مأخوذة من صفحات Jonix الرسمية والملفات القابلة للتحميل.'
              : 'Displayed technical and product data are mapped from official Jonix public pages and downloadable materials.'}
          </p>
        </motion.aside>
      </div>
    </section>
  );
}
