'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { menaAdaptationPoints } from '@/data/catalog';
import { GlobeIcon } from '@/components/icons';

/* ─── Brand palette ─── */
const C = {
  teal:      '#8eb2bb',
  tealLight: '#b8d0d6',
  tealDark:  '#5a8a96',
  tealGlow:  'rgba(142,178,187,0.13)',
  tealFaint: 'rgba(142,178,187,0.06)',
  charcoal:  '#646464',
  light:     '#dddddd',
  dark:      '#1c2329',
  offWhite:  '#f4f6f8',
  white:     '#ffffff',
  border:    '#e4ecf0',
  muted:     '#7a8a96',
  navy:      '#06101a',
};

const REGIONS = [
  { flag: '🇪🇬', name_en: 'Egypt',        name_ar: 'مصر' },
  { flag: '🇸🇦', name_en: 'Saudi Arabia', name_ar: 'السعودية' },
  { flag: '🇦🇪', name_en: 'UAE',          name_ar: 'الإمارات' },
  { flag: '🇶🇦', name_en: 'Qatar',        name_ar: 'قطر' },
  { flag: '🇰🇼', name_en: 'Kuwait',       name_ar: 'الكويت' },
  { flag: '🇯🇴', name_en: 'Jordan',       name_ar: 'الأردن' },
  { flag: '🇲🇦', name_en: 'Morocco',      name_ar: 'المغرب' },
  { flag: '🇮🇹', name_en: 'Italy',        name_ar: 'إيطاليا' },
];

const SECTORS = [
  { icon: '🏥', en: 'Healthcare',   ar: 'الرعاية الصحية' },
  { icon: '🏨', en: 'Hospitality',  ar: 'الضيافة' },
  { icon: '🎓', en: 'Education',    ar: 'التعليم' },
  { icon: '🏭', en: 'Industrial',   ar: 'الصناعة' },
  { icon: '🏢', en: 'Commercial',   ar: 'التجاري' },
  { icon: '🏛', en: 'Government',   ar: 'الحكومة' },
];

/* ─── Animated globe ─── */
function AnimatedGlobe() {
  return (
    <div style={{ position: 'relative', width: 72, height: 72 }}>
      {/* Outer ring */}
      <div
        style={{
          position: 'absolute', inset: 0, borderRadius: '50%',
          border: `1.5px solid ${C.teal}`,
          opacity: 0.2,
        }}
      />
      {/* Mid ring */}
      <motion.div
        style={{
          position: 'absolute', inset: 10, borderRadius: '50%',
          border: `1px dashed ${C.teal}`,
          opacity: 0.3,
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
      />
      {/* Core */}
      <div style={{
        position: 'absolute', inset: 18,
        borderRadius: '50%',
        background: `linear-gradient(135deg, ${C.teal}22, ${C.tealDark}22)`,
        border: `1px solid ${C.teal}40`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <GlobeIcon style={{ width: 22, height: 22, color: C.teal }} />
      </div>
    </div>
  );
}

/* ─── Main export ─── */
export default function MENASection() {
  const t      = useTranslations('mena');
  const locale = useLocale();
  const isAr   = locale === 'ar';

  const headerRef = useRef<HTMLDivElement>(null);
  const leftRef   = useRef<HTMLDivElement>(null);
  const rightRef  = useRef<HTMLDivElement>(null);

  const headerInView = useInView(headerRef, { once: true, margin: '-80px' });
  const leftInView   = useInView(leftRef,   { once: true, margin: '-60px' });
  const rightInView  = useInView(rightRef,  { once: true, margin: '-60px' });

  return (
    <section
      id="mena"
      style={{
        background: `linear-gradient(160deg, #f8fafb 0%, #f2f6f9 50%, #edf2f5 100%)`,
        padding: 'clamp(60px, 10vw, 110px) 0',
        fontFamily: "'DM Sans', sans-serif",
        position: 'relative',
        overflow: 'hidden',
      }}
      dir={isAr ? 'rtl' : 'ltr'}
    >
      {/* ── Ambient orbs ── */}
      <div
        style={{
          position: 'absolute', width: 600, height: 600,
          top: -150, right: -100, borderRadius: '50%',
          background: `radial-gradient(circle, ${C.tealGlow} 0%, transparent 70%)`,
          filter: 'blur(80px)', pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute', width: 400, height: 400,
          bottom: 0, left: -80, borderRadius: '50%',
          background: `radial-gradient(circle, rgba(90,138,150,0.08) 0%, transparent 70%)`,
          filter: 'blur(60px)', pointerEvents: 'none',
        }}
      />

      {/* ── Dot grid ── */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `radial-gradient(${C.teal}28 1px, transparent 1px)`,
        backgroundSize: '32px 32px', opacity: 0.4,
      }} />

      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 clamp(16px, 4vw, 44px)', position: 'relative', zIndex: 10 }}>

        {/* ── HEADER ── */}
        <div ref={headerRef} style={{ textAlign: 'center', marginBottom: 72 }}>
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              padding: '6px 16px',
              background: `${C.teal}14`,
              border: `1px solid ${C.teal}35`,
              borderRadius: 100, marginBottom: 20,
            }}
          >
            <motion.span
              style={{ width: 6, height: 6, borderRadius: '50%', background: C.teal, display: 'block' }}
              animate={{ scale: [1, 1.5, 1], opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2.2, repeat: Infinity }}
            />
            <span style={{ fontSize: 9.5, fontWeight: 800, letterSpacing: '0.28em', textTransform: 'uppercase', color: C.tealDark }}>
              {isAr ? 'الشرق الأوسط وشمال أفريقيا' : 'MENA Region'}
            </span>
          </motion.div>

          {/* Per-word headline */}
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(34px, 4.2vw, 56px)',
            fontWeight: 900, color: C.dark,
            lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 20,
          }}>
            {t('title').split(' ').map((word: string, wi: number) => (
              <span key={wi} style={{ display: 'inline-block', overflow: 'hidden', marginRight: '0.25em' }}>
                <motion.span
                  style={{ display: 'inline-block' }}
                  initial={{ y: '110%' }}
                  animate={headerInView ? { y: 0 } : {}}
                  transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.15 + wi * 0.08 }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.42 }}
            style={{ fontSize: 16, lineHeight: 1.8, color: C.muted, maxWidth: 560, margin: '0 auto', fontWeight: 300 }}
          >
            {t('subtitle')}
          </motion.p>
        </div>

        {/* ── MAIN GRID ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))', gap: 28, alignItems: 'start' }}>

          {/* ══ LEFT — Adaptation points ══ */}
          <div ref={leftRef}>
            {/* Section sub-label */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={leftInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45 }}
              style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 22 }}
            >
              <motion.div
                style={{ height: 2, background: `linear-gradient(90deg, ${C.teal}, transparent)`, borderRadius: 2 }}
                initial={{ width: 0 }}
                animate={leftInView ? { width: 32 } : {}}
                transition={{ duration: 0.8, delay: 0.15 }}
              />
              <h3 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 20, fontWeight: 800, color: C.dark,
              }}>
                {isAr ? 'نقاط التكيف الإقليمي' : 'Regional Adaptation Points'}
              </h3>
            </motion.div>

            {/* Adaptation point cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {menaAdaptationPoints.map((item, i) => {
                const accent = [C.teal, C.tealDark, C.charcoal, C.tealLight][i % 4];
                return (
                  <motion.div
                    key={item.en}
                    initial={{ opacity: 0, x: isAr ? 20 : -20 }}
                    animate={leftInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      position: 'relative',
                      display: 'flex', alignItems: 'flex-start', gap: 14,
                      padding: '14px 18px',
                      background: C.white,
                      border: `1px solid ${C.border}`,
                      borderRadius: 16,
                      overflow: 'hidden',
                      boxShadow: '0 2px 12px rgba(90,138,150,0.06)',
                      transition: 'box-shadow 0.3s, border-color 0.3s, transform 0.3s',
                      cursor: 'default',
                    }}
                    whileHover={{
                      boxShadow: `0 10px 32px rgba(90,138,150,0.13), 0 0 0 1px ${accent}28`,
                      borderColor: `${accent}38`,
                      y: -2,
                    }}
                  >
                    {/* Animated left accent bar */}
                    <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: 3, background: C.offWhite }}>
                      <motion.div
                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', background: accent, borderRadius: 2 }}
                        initial={{ height: 0 }}
                        animate={leftInView ? { height: '100%' } : {}}
                        transition={{ duration: 0.7, delay: 0.3 + i * 0.07, ease: 'easeOut' }}
                      />
                    </div>

                    {/* Index badge */}
                    <div style={{
                      width: 26, height: 26, borderRadius: 8, flexShrink: 0,
                      background: `${accent}14`,
                      border: `1px solid ${accent}28`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 10, fontWeight: 800, color: accent,
                      marginLeft: 8,
                    }}>
                      {i + 1}
                    </div>

                    <p style={{ fontSize: 13.5, lineHeight: 1.7, color: C.muted, fontWeight: 400, paddingTop: 2 }}>
                      {isAr ? item.ar : item.en}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* ══ RIGHT — Regional presence card ══ */}
          <div ref={rightRef} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>

            {/* Globe card */}
            <motion.div
              initial={{ opacity: 0, x: isAr ? -24 : 24, scale: 0.97 }}
              animate={rightInView ? { opacity: 1, x: 0, scale: 1 } : {}}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              style={{
                background: C.white,
                border: `1px solid ${C.border}`,
                borderRadius: 24,
                overflow: 'hidden',
                boxShadow: '0 4px 24px rgba(90,138,150,0.09)',
                transition: 'box-shadow 0.3s, border-color 0.3s',
              }}
              whileHover={{ boxShadow: `0 14px 44px rgba(90,138,150,0.14), 0 0 0 1px ${C.teal}28`, borderColor: `${C.teal}38` }}
            >
              {/* Animated top stripe */}
              <div style={{ position: 'relative', height: 3, background: C.offWhite }}>
                <motion.div
                  style={{ position: 'absolute', top: 0, left: 0, height: '100%', background: `linear-gradient(90deg, ${C.teal}, ${C.tealLight})` }}
                  initial={{ width: 0 }}
                  animate={rightInView ? { width: '100%' } : {}}
                  transition={{ duration: 1.0, delay: 0.2, ease: 'easeOut' }}
                />
              </div>
              <div style={{ padding: '24px 22px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 18 }}>
                  <AnimatedGlobe />
                  <div style={{ paddingTop: 6 }}>
                    <p style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.28em', textTransform: 'uppercase', color: C.teal, marginBottom: 5 }}>
                      {isAr ? 'التواجد الإقليمي' : 'Regional Presence'}
                    </p>
                    <h3 style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: 18, fontWeight: 800, color: C.dark, lineHeight: 1.25,
                    }}>
                      {isAr ? 'مصر والشرق الأوسط' : 'Egypt & Middle East'}
                    </h3>
                  </div>
                </div>

                <p style={{ fontSize: 13, lineHeight: 1.75, color: C.muted, fontWeight: 300, marginBottom: 14 }}>
                  {isAr
                    ? 'تركز هذه المنصة على مصر والشرق الأوسط مع محتوى ثنائي اللغة ودعم قطاعات الرعاية الصحية والضيافة والتعليم والصناعة والمكاتب.'
                    : 'This platform focuses on Egypt and the Middle East with bilingual content and sector-ready positioning for healthcare, hospitality, education, industry and offices.'}
                </p>
                <p style={{ fontSize: 13, lineHeight: 1.75, color: C.muted, fontWeight: 300 }}>
                  {isAr
                    ? 'بيانات التقنية والمواصفات المعروضة مأخوذة من صفحات Jonix الرسمية والملفات القابلة للتحميل.'
                    : 'Displayed technical and product data are mapped from official Jonix public pages and downloadable materials.'}
                </p>
              </div>
            </motion.div>

            {/* Region flags grid */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={rightInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
              style={{
                background: C.white,
                border: `1px solid ${C.border}`,
                borderRadius: 20,
                padding: '18px 18px',
                boxShadow: '0 2px 16px rgba(90,138,150,0.07)',
              }}
            >
              <p style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.26em', textTransform: 'uppercase', color: C.teal, marginBottom: 14 }}>
                {isAr ? 'دول التغطية' : 'Coverage Countries'}
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(70px, 1fr))', gap: 8 }}>
                {REGIONS.map((r, i) => (
                  <motion.div
                    key={r.name_en}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={rightInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.055 }}
                    style={{
                      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5,
                      padding: '10px 6px',
                      background: `${C.teal}07`,
                      border: `1px solid ${C.teal}18`,
                      borderRadius: 12,
                      cursor: 'default',
                      transition: 'background 0.2s, border-color 0.2s, transform 0.2s',
                    }}
                    whileHover={{ background: `${C.teal}14`, borderColor: `${C.teal}32`, y: -2 }}
                  >
                    <span style={{ fontSize: 20 }}>{r.flag}</span>
                    <span style={{ fontSize: 9, fontWeight: 700, color: C.charcoal, textAlign: 'center', lineHeight: 1.3 }}>
                      {isAr ? r.name_ar : r.name_en}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Sectors card */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={rightInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
              style={{
                background: `linear-gradient(135deg, ${C.tealFaint}, rgba(255,255,255,0.5))`,
                border: `1px solid ${C.teal}25`,
                borderRadius: 20,
                padding: '18px 18px',
                boxShadow: `0 2px 14px rgba(90,138,150,0.07)`,
              }}
            >
              <p style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.26em', textTransform: 'uppercase', color: C.teal, marginBottom: 14 }}>
                {isAr ? 'القطاعات المستهدفة' : 'Target Sectors'}
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 7 }}>
                {SECTORS.map((s, i) => (
                  <motion.div
                    key={s.en}
                    initial={{ opacity: 0, x: 10 }}
                    animate={rightInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.38, delay: 0.4 + i * 0.06 }}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 8,
                      padding: '9px 11px',
                      background: C.white,
                      border: `1px solid ${C.border}`,
                      borderRadius: 11,
                      transition: 'background 0.2s, border-color 0.2s',
                      cursor: 'default',
                    }}
                    whileHover={{ background: `${C.teal}07`, borderColor: `${C.teal}28` }}
                  >
                    <span style={{ fontSize: 15, flexShrink: 0 }}>{s.icon}</span>
                    <p style={{ fontSize: 11.5, fontWeight: 600, color: C.dark }}>
                      {isAr ? s.ar : s.en}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>

        {/* ── BOTTOM STRIP ── */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={rightInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.45 }}
          style={{
            marginTop: 48,
            padding: '22px 28px',
            background: `linear-gradient(135deg, ${C.tealFaint}, rgba(255,255,255,0.5))`,
            border: `1px solid ${C.teal}25`,
            borderRadius: 20,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            flexWrap: 'wrap', gap: 16,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div
              style={{
                width: 40, height: 40, borderRadius: 12,
                background: `${C.teal}15`,
                border: `1px solid ${C.teal}30`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 18, flexShrink: 0,
              }}
            >
              🌍
            </div>
            <div>
              <p style={{ fontSize: 13.5, fontWeight: 700, color: C.dark, marginBottom: 2 }}>
                {isAr ? 'نطاق إقليمي متوسع' : 'Expanding Regional Reach'}
              </p>
              <p style={{ fontSize: 12, color: C.muted, fontWeight: 300 }}>
                {isAr
                  ? 'توزيع حصري لأجهزة Jonix في منطقة الشرق الأوسط وشمال أفريقيا'
                  : 'Exclusive distribution of Jonix devices across the MENA region'}
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
            {['Bilingual', 'MENA Focus', 'Multi-sector', 'Italy Licensed'].map((chip, ci) => (
              <motion.span
                key={chip}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={rightInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.5 + ci * 0.07 }}
                style={{
                  padding: '5px 13px',
                  fontSize: 9.5, fontWeight: 700,
                  letterSpacing: '0.16em', textTransform: 'uppercase',
                  color: C.tealDark,
                  background: `${C.teal}12`,
                  border: `1px solid ${C.teal}28`,
                  borderRadius: 100,
                }}
              >
                {chip}
              </motion.span>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}