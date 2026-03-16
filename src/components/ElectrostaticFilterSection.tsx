'use client';

import { motion, useInView, animate } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { useLocale } from 'next-intl';

/* ─── Brand palette ─── */
const C = {
  teal:      '#8eb2bb',
  tealLight: '#b8d0d6',
  tealDark:  '#5a8a96',
  tealGlow:  'rgba(142,178,187,0.13)',
  tealFaint: 'rgba(142,178,187,0.06)',
  charcoal:  '#646464',
  dark:      '#1c2329',
  offWhite:  '#f4f6f8',
  white:     '#ffffff',
  border:    '#e6ecf0',
  muted:     '#7a8a96',
  green:     '#4caf85',
};

/* ─── Advantage card data ─── */
const ADVANTAGES = [
  {
    icon: '🧬',
    en_title: 'Biocidal Action',
    ar_title: 'تأثير مبيد للجراثيم',
    en_body: 'Reactive oxygen and nitrogen species actively destroy the cellular structure of pathogens — not just capture them. Virucidal and bactericidal action is confirmed by independent lab testing.',
    ar_body: 'الأنواع التفاعلية من الأكسجين والنيتروجين تدمر هياكل الخلايا الممرضة بشكل فعلي، وليس مجرد احتجازها. التأثير الفيروسي والبكتيري ثابت باختبارات مختبرية مستقلة.',
    accent: C.tealDark,
  },
  {
    icon: '🌬️',
    en_title: 'Safe in Occupied Spaces',
    ar_title: 'آمن في المساحات المأهولة',
    en_body: 'Cold plasma is generated at room temperature. Unlike UV-C or chemical fogging, Jonix devices operate continuously with people present — no evacuation, no downtime.',
    ar_body: 'تتولد البلازما الباردة عند درجة حرارة الغرفة. على عكس الأشعة فوق البنفسجية أو الضباب الكيميائي، تعمل أجهزة Jonix باستمرار في وجود الأشخاص، دون الحاجة لإخلاء المكان.',
    accent: C.teal,
  },
  {
    icon: '⚗️',
    en_title: 'No Chemical Residue',
    ar_title: 'لا متبقيات كيميائية',
    en_body: 'The process relies on plasma physics, not liquid or aerosol disinfectants. CEAM Valencia tests confirmed zero harmful byproducts from VOCs under tested conditions.',
    ar_body: 'تعتمد العملية على فيزياء البلازما وليس على معقمات سائلة أو رذاذية. أكدت اختبارات CEAM Valencia عدم وجود أي نواتج ضارة من المركبات العضوية المتطايرة.',
    accent: C.charcoal,
  },
  {
    icon: '⚡',
    en_title: 'Ultra-Low Power Use',
    ar_title: 'استهلاك طاقة منخفض للغاية',
    en_body: 'The Cube line runs on just 10 W while purifying up to 85 m². Plasma generation is highly efficient — no heating elements, no motors consuming hundreds of watts.',
    ar_body: 'يعمل خط Cube بـ 10 واط فقط لتنقية ما يصل إلى 85 م². توليد البلازما فعّال للغاية — لا عناصر تسخين ولا محركات تستهلك مئات الواط.',
    accent: C.tealLight,
  },
  {
    icon: '🔄',
    en_title: 'No Filter Replacement',
    ar_title: 'لا حاجة لاستبدال الفلاتر',
    en_body: 'NTP technology inactivates pollutants in the air stream. No HEPA filter cartridges to replace, no consumables to stock — dramatically lower lifetime operating cost.',
    ar_body: 'تقنية البلازما غير الحرارية تعطّل الملوثات في تيار الهواء. لا خراطيش HEPA للاستبدال، ولا مستهلكات للتخزين — مما يخفض تكلفة التشغيل الإجمالية بشكل كبير.',
    accent: C.tealDark,
  },
  {
    icon: '🏠',
    en_title: 'Surfaces + Air Simultaneously',
    ar_title: 'الأسطح والهواء في آنٍ واحد',
    en_body: 'Activated air disperses throughout the room and reaches exposed surfaces. A single device decontaminates both the air volume and hard surfaces without additional steps.',
    ar_body: 'الهواء المُنشَّط ينتشر في أرجاء الغرفة ويصل إلى الأسطح المكشوفة. جهاز واحد يُزيل التلوث من حجم الهواء والأسطح الصلبة معاً دون خطوات إضافية.',
    accent: C.teal,
  },
];

/* ─── Performance bar chart data ─── */
const PERFORMANCE_DATA = [
  {
    en_label: 'SARS-CoV-2 Viral Load Reduction',
    ar_label: 'خفض الحمل الفيروسي لـ SARS-CoV-2',
    en_source: 'Padua University — Molecular Medicine dept.',
    ar_source: 'جامعة بادوفا — قسم الطب الجزيئي',
    value: 99.9999,
    display: '99.9999%',
    color: C.tealDark,
  },
  {
    en_label: 'Pollutant Reduction (Cube Line)',
    ar_label: 'خفض الملوثات (خط Cube)',
    en_source: 'Published Cube line laboratory tests',
    ar_source: 'اختبارات مختبرية منشورة لخط Cube',
    value: 99.99,
    display: '99.99%',
    color: C.teal,
  },
  {
    en_label: 'Bacteria Removal Efficiency',
    ar_label: 'كفاءة إزالة البكتيريا',
    en_source: 'ON vs OFF comparative test',
    ar_source: 'اختبار مقارن: تشغيل مقابل إيقاف',
    value: 85,
    display: '85%',
    color: C.charcoal,
  },
  {
    en_label: 'Harmful VOC Byproducts Detected',
    ar_label: 'النواتج الضارة من المركبات العضوية المتطايرة',
    en_source: 'CEAM Valencia independent lab',
    ar_source: 'مختبر CEAM Valencia المستقل',
    value: 0,
    display: '0',
    color: C.green,
    isZero: true,
  },
];

/* ─── Comparison data ─── */
const COMPARISON = [
  { en: 'Kills pathogens (biocidal)',      ar: 'يقتل الممرضات (مبيد حيوي)',         ntp: true,  trad: false },
  { en: 'Works in occupied spaces',        ar: 'يعمل في المساحات المأهولة',          ntp: true,  trad: false },
  { en: 'Treats surfaces + air',           ar: 'يعالج الأسطح والهواء معاً',          ntp: true,  trad: false },
  { en: 'No filter cartridge replacement', ar: 'لا استبدال لخراطيش الفلاتر',         ntp: true,  trad: false },
  { en: 'No harmful byproducts',           ar: 'لا نواتج ضارة',                       ntp: true,  trad: null  },
  { en: 'Ultra-low power (10 W)',          ar: 'طاقة منخفضة جداً (10 واط)',          ntp: true,  trad: false },
  { en: 'Continuous 24/7 operation',       ar: 'تشغيل مستمر 24/7',                   ntp: true,  trad: null  },
];

/* ─── Animated counter ─── */
function AnimatedNumber({ value, decimals = 0, inView }: { value: number; decimals?: number; inView: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (!inView || !ref.current) return;
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate(v) {
        if (ref.current) ref.current.textContent = v.toFixed(decimals);
      },
    });
    return () => controls.stop();
  }, [inView, value, decimals]);
  return <span ref={ref}>0</span>;
}

/* ─── Animated bar ─── */
function PerformanceBar({
  item, i, locale, inView,
}: {
  item: typeof PERFORMANCE_DATA[number]; i: number; locale: string; inView: boolean;
}) {
  const isAr = locale === 'ar';
  const barTarget = item.isZero ? 0 : Math.max(item.value, 2); // minimum visual width

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
      style={{ marginBottom: 22 }}
    >
      {/* Label row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 8, gap: 12 }}>
        <div>
          <p style={{ fontSize: 13.5, fontWeight: 700, color: C.dark, lineHeight: 1.35 }}>
            {isAr ? item.ar_label : item.en_label}
          </p>
          <p style={{ fontSize: 11, color: C.muted, fontWeight: 300, marginTop: 2 }}>
            {isAr ? item.ar_source : item.en_source}
          </p>
        </div>
        <span style={{
          fontSize: 18, fontWeight: 900, color: item.color,
          fontFamily: "'Playfair Display', serif",
          letterSpacing: '-0.02em', flexShrink: 0,
        }}>
          {item.isZero
            ? <span>0 <span style={{ fontSize: 11, fontWeight: 600, color: C.green }}>{isAr ? 'لم يُرصد' : 'none detected'}</span></span>
            : <>{item.display}</>}
        </span>
      </div>

      {/* Bar track */}
      <div style={{
        position: 'relative', height: 10,
        background: `${item.color}18`,
        borderRadius: 100,
        overflow: 'hidden',
      }}>
        {item.isZero ? (
          <motion.div
            initial={{ width: 0 }}
            animate={inView ? { width: '100%' } : {}}
            transition={{ duration: 1.0, delay: i * 0.1 + 0.2, ease: 'easeOut' }}
            style={{
              height: '100%',
              background: `linear-gradient(90deg, ${C.green}40, ${C.green}18)`,
              borderRadius: 100,
              position: 'relative',
            }}
          >
            {/* "0 detected" stripe pattern */}
            <div style={{
              position: 'absolute', inset: 0,
              backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 4px, ${C.green}20 4px, ${C.green}20 8px)`,
              borderRadius: 100,
            }} />
          </motion.div>
        ) : (
          <motion.div
            initial={{ width: 0 }}
            animate={inView ? { width: `${barTarget}%` } : {}}
            transition={{ duration: 1.4, delay: i * 0.1 + 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{
              height: '100%',
              background: `linear-gradient(90deg, ${item.color}, ${item.color}88)`,
              borderRadius: 100,
              boxShadow: `0 0 8px ${item.color}50`,
            }}
          />
        )}
      </div>
    </motion.div>
  );
}

/* ─── Section label ─── */
function SectionLabel({ children, inView }: { children: React.ReactNode; inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
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
        style={{ width: 6, height: 6, borderRadius: '50%', background: C.teal, display: 'block', flexShrink: 0 }}
        animate={{ scale: [1, 1.5, 1], opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2.2, repeat: Infinity }}
      />
      <span style={{ fontSize: 9.5, fontWeight: 800, letterSpacing: '0.28em', textTransform: 'uppercase', color: C.tealDark }}>
        {children}
      </span>
    </motion.div>
  );
}

/* ─── Main export ─── */
export default function ElectrostaticFilterSection() {
  const locale = useLocale();
  const isAr   = locale === 'ar';

  const headerRef  = useRef<HTMLDivElement>(null);
  const cardsRef   = useRef<HTMLDivElement>(null);
  const chartRef   = useRef<HTMLDivElement>(null);
  const compareRef = useRef<HTMLDivElement>(null);
  const statsRef   = useRef<HTMLDivElement>(null);

  const headerInView  = useInView(headerRef,  { once: true, margin: '-80px' });
  const cardsInView   = useInView(cardsRef,   { once: true, margin: '-60px' });
  const chartInView   = useInView(chartRef,   { once: true, margin: '-60px' });
  const compareInView = useInView(compareRef, { once: true, margin: '-60px' });
  const statsInView   = useInView(statsRef,   { once: true, margin: '-60px' });

  return (
    <section
      id="ntp-advantages"
      style={{
        background: `linear-gradient(160deg, #f8fafb 0%, #f2f6f9 50%, #edf2f5 100%)`,
        padding: 'clamp(60px, 10vw, 110px) 0',
        fontFamily: "'DM Sans', sans-serif",
        position: 'relative',
        overflow: 'hidden',
      }}
      dir={isAr ? 'rtl' : 'ltr'}
    >
      {/* ── Static ambient orbs ── */}
      <div style={{
        position: 'absolute', width: 700, height: 700,
        top: -200, right: -150, borderRadius: '50%',
        background: `radial-gradient(circle, ${C.tealGlow} 0%, transparent 70%)`,
        filter: 'blur(80px)', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', width: 400, height: 400,
        bottom: 100, left: -100, borderRadius: '50%',
        background: `radial-gradient(circle, rgba(90,138,150,0.08) 0%, transparent 70%)`,
        filter: 'blur(60px)', pointerEvents: 'none',
      }} />

      {/* ── Dot grid ── */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `radial-gradient(${C.teal}28 1px, transparent 1px)`,
        backgroundSize: '32px 32px', opacity: 0.45,
      }} />

      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 clamp(16px, 4vw, 44px)', position: 'relative', zIndex: 10 }}>

        {/* ── HEADER ── */}
        <div ref={headerRef} style={{ maxWidth: 760, marginBottom: 68 }}>
          <SectionLabel inView={headerInView}>
            {isAr ? 'البلازما غير الحرارية' : 'Non-Thermal Plasma'}
          </SectionLabel>

          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(32px, 4.2vw, 56px)',
            fontWeight: 900, color: C.dark,
            lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 20,
          }}>
            {(isAr
              ? 'لماذا تغيّر تقنية Jonix قواعد اللعبة'
              : 'Why Jonix NTP Changes the Rules'
            ).split(' ').map((word, wi) => (
              <span key={wi} style={{ display: 'inline-block', overflow: 'hidden', marginRight: '0.25em' }}>
                <motion.span
                  style={{ display: 'inline-block' }}
                  initial={{ y: '110%' }}
                  animate={headerInView ? { y: 0 } : {}}
                  transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.15 + wi * 0.07 }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.45 }}
            style={{ fontSize: 16, lineHeight: 1.8, color: C.muted, maxWidth: 620, fontWeight: 300 }}
          >
            {isAr
              ? 'أجهزة Jonix تولّد بلازما باردة بدرجة حرارة الغرفة لإبطال المفعول الكامل للفيروسات والبكتيريا والعفن باستمرار في الهواء وعلى الأسطح، دون مواد كيميائية أو فلاتر استهلاكية.'
              : 'Jonix devices generate cold plasma at room temperature to continuously inactivate viruses, bacteria and mould in the air and on surfaces — no chemicals, no consumable filters.'}
          </motion.p>
        </div>

        {/* ── STATS STRIP ── */}
        <div ref={statsRef} style={{ marginBottom: 68 }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))',
            gap: 16,
          }}>
            {[
              { num: 99.9999, dec: 4, suffix: '%', en_label: 'Virus Reduction', ar_label: 'خفض الفيروسات', color: C.tealDark },
              { num: 99.99,   dec: 2, suffix: '%', en_label: 'Pollutants Removed', ar_label: 'إزالة الملوثات', color: C.teal },
              { num: 10,      dec: 0, suffix: ' W', en_label: 'Power Consumption', ar_label: 'استهلاك الطاقة', color: C.charcoal },
              { num: 85,      dec: 0, suffix: ' m²', en_label: 'Max Coverage (Cube)', ar_label: 'أقصى تغطية (Cube)', color: C.tealLight },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20, scale: 0.96 }}
                animate={statsInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  background: C.white,
                  border: `1px solid ${C.border}`,
                  borderRadius: 20,
                  padding: 'clamp(18px, 3vw, 24px)',
                  boxShadow: '0 2px 14px rgba(90,138,150,0.07)',
                  overflow: 'hidden',
                  position: 'relative',
                }}
              >
                {/* top stripe */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: stat.color }} />
                <p style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 'clamp(28px, 3.5vw, 40px)',
                  fontWeight: 900, color: stat.color,
                  letterSpacing: '-0.02em', lineHeight: 1, marginBottom: 8,
                }}>
                  <AnimatedNumber value={stat.num} decimals={stat.dec} inView={statsInView} />
                  <span style={{ fontSize: '0.55em', fontWeight: 700 }}>{stat.suffix}</span>
                </p>
                <p style={{ fontSize: 12, fontWeight: 600, color: C.muted, letterSpacing: '0.04em' }}>
                  {isAr ? stat.ar_label : stat.en_label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── ADVANTAGE CARDS 3×2 ── */}
        <div
          ref={cardsRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))',
            gap: 18, marginBottom: 68,
          }}
        >
          {ADVANTAGES.map((adv, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 28, scale: 0.97 }}
              animate={cardsInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              style={{
                background: C.white,
                border: `1px solid ${C.border}`,
                borderRadius: 22,
                overflow: 'hidden',
                boxShadow: '0 2px 16px rgba(90,138,150,0.07)',
                transition: 'box-shadow 0.3s, transform 0.3s, border-color 0.3s',
                cursor: 'default',
              }}
              whileHover={{
                boxShadow: `0 14px 44px rgba(90,138,150,0.14), 0 0 0 1px ${adv.accent}30`,
                borderColor: `${adv.accent}40`,
                y: -4,
              }}
            >
              {/* Animated top stripe */}
              <div style={{ position: 'relative', height: 3, background: C.offWhite }}>
                <motion.div
                  style={{ position: 'absolute', top: 0, left: 0, height: '100%', background: `linear-gradient(90deg, ${adv.accent}, ${adv.accent}55)`, borderRadius: 2 }}
                  initial={{ width: 0 }}
                  animate={cardsInView ? { width: '100%' } : {}}
                  transition={{ duration: 1.0, delay: 0.3 + i * 0.08, ease: 'easeOut' }}
                />
              </div>

              <div style={{ padding: 'clamp(18px, 3vw, 24px)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                  <motion.div
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={cardsInView ? { scale: 1, opacity: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.25 + i * 0.08, type: 'spring', bounce: 0.4 }}
                    style={{
                      width: 44, height: 44, borderRadius: 14, flexShrink: 0,
                      background: `${adv.accent}12`,
                      border: `1px solid ${adv.accent}28`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 20,
                    }}
                  >
                    {adv.icon}
                  </motion.div>
                  <h3 style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 16, fontWeight: 800, color: C.dark, lineHeight: 1.25,
                  }}>
                    {isAr ? adv.ar_title : adv.en_title}
                  </h3>
                </div>
                <p style={{ fontSize: 13, lineHeight: 1.75, color: C.muted, fontWeight: 300 }}>
                  {isAr ? adv.ar_body : adv.en_body}
                </p>
              </div>
            </motion.article>
          ))}
        </div>

        {/* ── PERFORMANCE CHART + COMPARISON ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))',
          gap: 24, marginBottom: 68,
          alignItems: 'start',
        }}>

          {/* LEFT — Bar chart */}
          <div ref={chartRef}>
            <motion.div
              initial={{ opacity: 0, x: isAr ? 24 : -24 }}
              animate={chartInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              style={{
                background: C.white,
                border: `1px solid ${C.border}`,
                borderRadius: 24,
                overflow: 'hidden',
                boxShadow: '0 3px 20px rgba(90,138,150,0.08)',
              }}
            >
              <div style={{ height: 3, background: `linear-gradient(90deg, ${C.teal}, ${C.tealLight})` }} />
              <div style={{ padding: 'clamp(20px, 3vw, 28px)' }}>
                <p style={{
                  fontSize: 9.5, fontWeight: 800, letterSpacing: '0.28em',
                  textTransform: 'uppercase', color: C.tealDark, marginBottom: 6,
                }}>
                  {isAr ? 'بيانات الأداء المعتمدة' : 'Certified Performance Data'}
                </p>
                <h3 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 'clamp(18px, 2.4vw, 22px)',
                  fontWeight: 800, color: C.dark, marginBottom: 28,
                }}>
                  {isAr ? 'نتائج الاختبارات المستقلة' : 'Independent Lab Results'}
                </h3>
                {PERFORMANCE_DATA.map((item, i) => (
                  <PerformanceBar key={i} item={item} i={i} locale={locale} inView={chartInView} />
                ))}
              </div>
            </motion.div>
          </div>

          {/* RIGHT — Comparison table */}
          <div ref={compareRef}>
            <motion.div
              initial={{ opacity: 0, x: isAr ? -24 : 24 }}
              animate={compareInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              style={{
                background: C.white,
                border: `1px solid ${C.border}`,
                borderRadius: 24,
                overflow: 'hidden',
                boxShadow: '0 3px 20px rgba(90,138,150,0.08)',
              }}
            >
              <div style={{ height: 3, background: `linear-gradient(90deg, ${C.tealDark}, ${C.teal})` }} />
              <div style={{ padding: 'clamp(20px, 3vw, 28px)' }}>
                <p style={{
                  fontSize: 9.5, fontWeight: 800, letterSpacing: '0.28em',
                  textTransform: 'uppercase', color: C.tealDark, marginBottom: 6,
                }}>
                  {isAr ? 'مقارنة التقنيات' : 'Technology Comparison'}
                </p>
                <h3 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 'clamp(18px, 2.4vw, 22px)',
                  fontWeight: 800, color: C.dark, marginBottom: 22,
                }}>
                  {isAr ? 'NTP مقابل الفلاتر التقليدية' : 'NTP vs Traditional Filters'}
                </h3>

                {/* Table header */}
                <div style={{
                  display: 'grid', gridTemplateColumns: '1fr auto auto',
                  gap: 12, paddingBottom: 10, marginBottom: 4,
                  borderBottom: `2px solid ${C.border}`,
                }}>
                  <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', color: C.muted }}>
                    {isAr ? 'الميزة' : 'Feature'}
                  </span>
                  <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: C.tealDark, textAlign: 'center', minWidth: 52 }}>
                    Jonix NTP
                  </span>
                  <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: C.muted, textAlign: 'center', minWidth: 52 }}>
                    {isAr ? 'تقليدي' : 'Traditional'}
                  </span>
                </div>

                {COMPARISON.map((row, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: isAr ? 14 : -14 }}
                    animate={compareInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.2 + i * 0.07 }}
                    style={{
                      display: 'grid', gridTemplateColumns: '1fr auto auto',
                      gap: 12, padding: '11px 0',
                      borderBottom: i < COMPARISON.length - 1 ? `1px solid ${C.border}` : 'none',
                      alignItems: 'center',
                    }}
                  >
                    <span style={{ fontSize: 13, color: C.dark, fontWeight: 500, lineHeight: 1.4 }}>
                      {isAr ? row.ar : row.en}
                    </span>
                    <div style={{ display: 'flex', justifyContent: 'center', minWidth: 52 }}>
                      <span style={{
                        width: 26, height: 26, borderRadius: '50%',
                        background: row.ntp ? `${C.tealDark}18` : `${C.charcoal}10`,
                        border: `1.5px solid ${row.ntp ? C.tealDark : C.border}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 13, fontWeight: 800, color: row.ntp ? C.tealDark : C.muted,
                      }}>
                        {row.ntp ? '✓' : '✗'}
                      </span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', minWidth: 52 }}>
                      <span style={{
                        width: 26, height: 26, borderRadius: '50%',
                        background: row.trad === null ? `${C.teal}10` : row.trad ? `${C.tealDark}18` : `rgba(200,60,60,0.08)`,
                        border: `1.5px solid ${row.trad === null ? C.border : row.trad ? C.tealDark : 'rgba(200,60,60,0.35)'}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: row.trad === null ? 11 : 13, fontWeight: 800,
                        color: row.trad === null ? C.muted : row.trad ? C.tealDark : 'rgb(180,60,60)',
                      }}>
                        {row.trad === null ? '—' : row.trad ? '✓' : '✗'}
                      </span>
                    </div>
                  </motion.div>
                ))}

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={compareInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.85 }}
                  style={{
                    marginTop: 16, fontSize: 11, color: C.muted,
                    lineHeight: 1.6, fontStyle: 'italic',
                  }}
                >
                  {isAr
                    ? '— تعني "غير قابل للتطبيق" أو متغير حسب المنتج. البيانات مستمدة من الصفحات الرسمية لـ Jonix ووثائق الشهادات.'
                    : '— indicates not applicable or variable by product. Data sourced from Jonix official pages and certification documents.'}
                </motion.p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── BOTTOM TRUST STRIP ── */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={compareInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.55 }}
          style={{
            padding: 'clamp(18px, 3vw, 24px) clamp(20px, 4vw, 32px)',
            background: `linear-gradient(135deg, ${C.tealFaint}, rgba(255,255,255,0.5))`,
            border: `1px solid ${C.teal}25`,
            borderRadius: 20,
            display: 'flex', alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap', gap: 16,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{
              width: 44, height: 44, borderRadius: 14, flexShrink: 0,
              background: `${C.teal}15`, border: `1px solid ${C.teal}30`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20,
            }}>
              🏛
            </div>
            <div>
              <p style={{ fontSize: 13.5, fontWeight: 700, color: C.dark, marginBottom: 2 }}>
                {isAr ? 'مُعتمد من مؤسسات مستقلة' : 'Validated by Independent Institutions'}
              </p>
              <p style={{ fontSize: 12, color: C.muted, fontWeight: 300 }}>
                {isAr
                  ? 'جامعة بادوفا · CEAM Valencia · Bio-Safe · CE · اختبارات مصر الميدانية'
                  : 'Padua University · CEAM Valencia · Bio-Safe · CE Marking · Egypt Field Reports'}
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
            {['NTP Patent', 'CE Certified', 'Bio-Safe', 'Italy Made'].map((chip) => (
              <span
                key={chip}
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
              </span>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
