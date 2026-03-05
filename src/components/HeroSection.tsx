'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import heroBackground from '@/app/jnj.jpg';
import { partnerLogo } from '@/data/catalog';
import MediaImage from '@/components/MediaImage';

export default function HeroSection() {
  const t = useTranslations('hero');
  const locale = useLocale();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 100]);

  return (
    <section className="relative overflow-hidden pt-16">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBackground.src})` }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(25,36,41,0.78)_0%,rgba(37,49,55,0.65)_38%,rgba(28,36,40,0.84)_100%)]" />
      <div className="absolute inset-0 grid-overlay opacity-20" />
      <motion.div
        style={{ y }}
        className="pointer-events-none absolute -top-24 start-[-6rem] h-72 w-72 rounded-full bg-[radial-gradient(circle,_rgba(142,178,187,0.45)_0%,_rgba(142,178,187,0)_72%)]"
      />
      <motion.div
        style={{ y: useTransform(scrollY, [0, 500], [0, -80]) }}
        className="pointer-events-none absolute end-[-9rem] top-4 h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,_rgba(86,86,86,0.24)_0%,_rgba(86,86,86,0)_72%)]"
      />

      <div className="container-shell section-spacer relative z-10">
        <div className="grid items-end gap-8 lg:grid-cols-[1.08fr_0.92fr]">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="mb-5 inline-flex rounded-full border border-white/60 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-wide text-white backdrop-blur-sm"
            >
              {t('eyebrow')}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="max-w-4xl text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl"
            >
              {t('title')}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.16 }}
              className="mt-6 max-w-3xl text-base leading-relaxed text-[#e8f0f2] sm:text-lg"
            >
              {t('subtitle')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.22 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <a
                href={`/${locale}#contact`}
                className="button-glow rounded-xl bg-white px-6 py-3 text-sm font-extrabold text-[#1f353d] transition-transform hover:scale-[1.02]"
              >
                {t('ctaPrimary')}
              </a>
              <a
                href={`/${locale}/products`}
                className="rounded-xl border border-white/80 bg-white/10 px-6 py-3 text-sm font-extrabold text-white backdrop-blur-sm transition-colors hover:bg-white/20"
              >
                {t('ctaSecondary')}
              </a>
            </motion.div>
          </div>

          <motion.aside
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.65, delay: 0.15 }}
            className="rounded-[2rem] border border-white/30 bg-white/12 p-5 shadow-[0_24px_60px_rgba(0,0,0,0.28)] backdrop-blur-md"
          >
            <div className="relative overflow-hidden rounded-[1.4rem] border border-white/30 bg-[linear-gradient(135deg,rgba(255,255,255,0.16),rgba(255,255,255,0.06))] p-5">
              <motion.div
                animate={{ opacity: [0.55, 1, 0.55] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(142,178,187,0.28),transparent_55%)]"
              />
              <div className="relative flex items-center gap-4">
                <div className="h-16 w-16 overflow-hidden rounded-2xl border border-white/50 bg-white p-2">
                  <MediaImage
                    src={partnerLogo}
                    alt="Jonix Arabia"
                    className="h-full w-full object-contain"
                    loading="eager"
                    fallbackLabel="JA"
                  />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-[#cde5ea]">
                    {locale === 'ar' ? 'الهوية الإقليمية' : 'Regional Identity'}
                  </p>
                  <p className="mt-1 text-lg font-extrabold text-white">JONIX ARABIA</p>
                  <p className="text-xs text-[#e3eff2]">Egypt & Middle East</p>
                </div>
              </div>

              <div className="relative mt-5 grid gap-3 md:grid-cols-3">
                {['s1', 's2', 's3'].map((key, index) => (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.26 + index * 0.09 }}
                    className="rounded-xl border border-white/30 bg-white/12 p-3"
                  >
                    <p className="text-xs font-semibold leading-relaxed text-[#edf6f8]">{t(`stats.${key}`)}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
