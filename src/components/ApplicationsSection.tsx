'use client';

import { motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { applications } from '@/data/catalog';
import { BuildingIcon, ShieldIcon, SparkIcon } from '@/components/icons';
import BlurText from '@/components/BlurText';

const ICONS = [BuildingIcon, ShieldIcon, SparkIcon, BuildingIcon, ShieldIcon, SparkIcon];
const COLORS = ['#1e5a96', '#2d7bb8', '#00c4ef', '#8eb2bb', '#1e5a96', '#2d7bb8'];

export default function ApplicationsSection() {
  const t = useTranslations('applications');
  const locale = useLocale();
  const isAr = locale === 'ar';

  return (
    <section id="applications" className="section-pad bg-white">
      <div className="container-shell">
        <p className="section-label">{isAr ? 'تطبيقات الصناعة' : 'Industry Applications'}</p>
        <h2 className="heading-xl">
          <BlurText text={t('title')} delay={80} animateBy="words" direction="top" />
        </h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.12 }}
          className="body-text mt-4 max-w-2xl"
        >
          {t('subtitle')}
        </motion.p>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {applications.map((item, i) => {
            const Icon = ICONS[i];
            const color = COLORS[i];
            return (
              <motion.article
                key={item.en}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="card p-6"
              >
                <div
                  className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl text-white"
                  style={{ background: color }}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <p className="text-[0.88rem] font-semibold leading-relaxed text-[#5a6a7a]">
                  {isAr ? item.ar : item.en}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
