'use client';

import { motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { technologyHighlights } from '@/data/catalog';
import { SparkIcon } from '@/components/icons';

export default function TechnologySection() {
  const t = useTranslations('technology');
  const locale = useLocale();
  const isArabic = locale === 'ar';

  const steps = [t('step1'), t('step2'), t('step3'), t('step4')];
  const intakeStart = isArabic ? 500 : 20;
  const intakeEnd = isArabic ? 322 : 198;
  const outputStart = isArabic ? 322 : 198;
  const outputEnd = isArabic ? 40 : 480;

  return (
    <section id="technology" className="section-spacer">
      <div className="container-shell grid gap-12 lg:grid-cols-[1.15fr_0.85fr]">
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
            className="mt-4 max-w-3xl text-base leading-relaxed text-[var(--jonix-slate-600)]"
          >
            {t('subtitle')}
          </motion.p>

          <div className="mt-8 space-y-3">
            {technologyHighlights.map((item, index) => (
              <motion.article
                key={item.en}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
              className="soft-card rounded-2xl p-5"
              >
                <p className="text-sm leading-relaxed text-slate-700">
                  {locale === 'ar' ? item.ar : item.en}
                </p>
              </motion.article>
            ))}
          </div>
        </div>

        <motion.aside
          initial={{ opacity: 0, x: 18 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="soft-card relative overflow-hidden rounded-3xl p-6"
        >
          <p className="text-sm font-bold uppercase tracking-wide text-[var(--jonix-blue-700)]">
            {t('infographicTitle')}
          </p>

          <div className="relative mt-6 rounded-2xl border border-[var(--jonix-border)] bg-[linear-gradient(140deg,#ffffff_0%,#f0f5f7_50%,#ffffff_100%)] p-4">
            <div className="relative mx-auto h-[320px] max-w-[560px] overflow-hidden rounded-2xl border border-[var(--jonix-border)] bg-white">
              <div className="absolute inset-x-8 top-[102px] h-[2px] rounded-full bg-[linear-gradient(90deg,rgba(86,86,86,0)_0%,rgba(86,86,86,0.35)_18%,rgba(86,86,86,0.35)_82%,rgba(86,86,86,0)_100%)]" />
              <div className="absolute inset-x-8 top-[182px] h-[2px] rounded-full bg-[linear-gradient(90deg,rgba(142,178,187,0)_0%,rgba(142,178,187,0.6)_18%,rgba(142,178,187,0.6)_82%,rgba(142,178,187,0)_100%)]" />

              <motion.div
                initial={{ opacity: 0, x: isArabic ? 24 : -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5 }}
                className={`absolute top-10 h-16 w-40 rounded-2xl border border-[#d9d9d9] bg-[#f6f7f8] p-3 shadow-sm ${isArabic ? 'right-4' : 'left-4'}`}
              >
                <p className="text-[0.7rem] font-bold uppercase tracking-wide text-[#616161]">
                  {isArabic ? 'هواء غير معالج' : 'Untreated Air'}
                </p>
                <p className="mt-1 text-xs font-semibold text-slate-700">
                  {isArabic ? 'غبار • بكتيريا • فيروسات' : 'Dust • Bacteria • Viruses'}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: isArabic ? -24 : 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: 0.08 }}
                className={`absolute bottom-10 h-16 w-40 rounded-2xl border border-[#bad3d9] bg-[#eef5f7] p-3 shadow-sm ${isArabic ? 'left-4' : 'right-4'}`}
              >
                <p className="text-[0.7rem] font-bold uppercase tracking-wide text-[#3f6b75]">
                  {isArabic ? 'هواء معالج' : 'Sanitized Air'}
                </p>
                <p className="mt-1 text-xs font-semibold text-[#35545c]">
                  {isArabic ? 'تقليل الحمل الميكروبي والجسيمات' : 'Reduced microbial & particle load'}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.45, delay: 0.06 }}
                className="absolute left-1/2 top-1/2 h-[170px] w-[124px] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-[var(--jonix-border)] bg-[linear-gradient(180deg,#ffffff_0%,#eef3f5_100%)] p-3 shadow-[0_16px_30px_rgba(0,0,0,0.12)]"
              >
                <p className="text-center text-[0.62rem] font-bold uppercase tracking-wide text-[var(--jonix-blue-900)]">
                  {isArabic ? 'جهاز Jonix' : 'Jonix Device'}
                </p>
                <div className="mt-2 flex h-[108px] items-center justify-center rounded-xl border border-[#d9d9d9] bg-white">
                  <div className="relative flex h-16 w-16 items-center justify-center">
                    <div className="absolute h-16 w-16 rounded-full border border-[var(--jonix-blue-700)]/35 infographic-rotation" />
                    <div className="absolute h-11 w-11 rounded-full border border-[var(--jonix-blue-500)]/30" />
                    <div className="infographic-pulse flex h-8 w-8 items-center justify-center rounded-full bg-[var(--jonix-blue-700)] text-[#153038]">
                      <SparkIcon className="h-4 w-4" />
                    </div>
                  </div>
                </div>
                <p className="mt-2 text-center text-[0.62rem] font-semibold text-slate-600">
                  {isArabic ? 'DBD + ROS Ionization' : 'DBD + ROS Ionization'}
                </p>
              </motion.div>

              {Array.from({ length: 11 }).map((_, index) => (
                <motion.span
                  key={`input-ion-${index}`}
                  className="absolute h-2 w-2 rounded-full bg-[#7f8f95]"
                  style={{ top: 96 + (index % 4) * 12 }}
                  animate={{
                    x: [intakeStart, intakeEnd],
                    opacity: [0, 0.8, 0],
                    scale: [0.6, 1, 0.8],
                  }}
                  transition={{
                    duration: 2.2,
                    delay: index * 0.16,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
              ))}

              {Array.from({ length: 14 }).map((_, index) => (
                <motion.span
                  key={`output-ion-${index}`}
                  className="absolute h-2.5 w-2.5 rounded-full bg-[#8eb2bb]"
                  style={{ top: 176 + (index % 5) * 11 }}
                  animate={{
                    x: [outputStart, outputEnd],
                    opacity: [0, 1, 0],
                    scale: [0.75, 1.12, 0.85],
                  }}
                  transition={{
                    duration: 2.35,
                    delay: index * 0.14,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
              ))}
            </div>

            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {steps.map((step, index) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.35, delay: 0.05 + index * 0.07 }}
                  className="rounded-xl border border-[var(--jonix-border)] bg-white px-3 py-2 text-xs font-semibold text-slate-700"
                >
                  {step}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.aside>
      </div>
    </section>
  );
}
