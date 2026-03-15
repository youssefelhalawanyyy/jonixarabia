'use client';

import { motion, useInView } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { technologyHighlights } from '@/data/catalog';
import { SparkIcon } from '@/components/icons';
import { useRef, memo, useState, useEffect } from 'react';

/* ─── Brand palette ─── */
const C = {
  teal:      '#8eb2bb',
  tealLight: '#b8d0d6',
  tealDark:  '#5a8a96',
  tealGlow:  'rgba(142,178,187,0.18)',
  tealFaint: 'rgba(142,178,187,0.07)',
  charcoal:  '#646464',
  light:     '#dddddd',
  dark:      '#2b2b2b',
  white:     '#ffffff',
  offWhite:  '#f4f6f8',
};

const HIGHLIGHT_COLORS = [C.teal, C.tealDark, C.charcoal, C.tealLight];

/* ─── Plasma orb — memoized, spinning ring via CSS ─── */
const PlasmaOrb = memo(function PlasmaOrb({ size = 120, active = true }: { size?: number; active?: boolean }) {
  return (
    <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
      {/* Outer rings */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            inset: `${i * 14}px`,
            borderRadius: '50%',
            border: `1px solid ${C.teal}`,
            opacity: 0.15 + i * 0.08,
          }}
          animate={active ? { scale: [1, 1.06, 1], opacity: [0.15 + i * 0.08, 0.35 + i * 0.08, 0.15 + i * 0.08] } : {}}
          transition={{ duration: 2.8 + i * 0.6, repeat: Infinity, delay: i * 0.4, ease: 'easeInOut' }}
        />
      ))}
      {/* Spinning dashed ring — CSS animation (compositor thread) */}
      <div
        className="plasma-spin-ring"
        style={{
          position: 'absolute',
          inset: 12,
          borderRadius: '50%',
          border: `1.5px dashed ${C.teal}`,
          opacity: 0.3,
        }}
      />
      {/* Glow pulse */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 24,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${C.teal}40 0%, transparent 70%)`,
        }}
        animate={active ? { scale: [0.85, 1.15, 0.85], opacity: [0.6, 1, 0.6] } : {}}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Core */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 32,
          borderRadius: '50%',
          background: `linear-gradient(135deg, ${C.teal}, ${C.tealDark})`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: `0 0 24px ${C.teal}66`,
        }}
        animate={active ? { boxShadow: [`0 0 16px ${C.teal}44`, `0 0 40px ${C.teal}88`, `0 0 16px ${C.teal}44`] } : {}}
        transition={{ duration: 2.2, repeat: Infinity }}
      >
        <SparkIcon style={{ width: 18, height: 18, color: '#fff' }} />
      </motion.div>
    </div>
  );
});

/* ─── Animated plasma diagram — fully responsive ─── */
function PlasmaDiagram({ isAr }: { isAr: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [w, setW] = useState(0);

  useEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(entries => setW(entries[0].contentRect.width));
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  const isMini = w > 0 && w < 400;
  const cardW = isMini ? Math.floor(w * 0.28) : 148;
  const centerGap = 70; // half-width of center device
  const pxIn  = isAr ? w - cardW - 12 : cardW + 12;
  const pxOut = isAr ? centerGap : w - centerGap;

  return (
    <div
      ref={ref}
      style={{
        position: 'relative',
        width: '100%',
        height: isMini ? 260 : 340,
        borderRadius: 20,
        background: C.offWhite,
        border: `1px solid ${C.light}`,
        overflow: 'hidden',
      }}
    >
      {/* ── INTAKE SIDE ── */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1 }}
        style={{
          position: 'absolute',
          top: 16, left: isAr ? 'auto' : 10, right: isAr ? 10 : 'auto',
          width: cardW, padding: isMini ? '8px 10px' : '12px 14px',
          background: '#fff',
          border: `1px solid ${C.light}`,
          borderRadius: 14,
          boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
          zIndex: 5,
        }}
      >
        <p style={{ fontSize: isMini ? 7.5 : 9, fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: C.charcoal, marginBottom: 3 }}>
          {isAr ? 'هواء ملوث' : 'Contaminated'}
        </p>
        {!isMini && <p style={{ fontSize: 10, color: '#888', lineHeight: 1.4, marginBottom: 6 }}>
          {isAr ? 'فيروسات · ملوثات' : 'Viruses · Pollutants'}
        </p>}
        <div style={{ display: 'flex', gap: 4 }}>
          {['#ef4444', '#f59e0b', '#94a3b8'].map((c, i) => (
            <motion.span key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: c, display: 'block' }}
              animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }} />
          ))}
        </div>
      </motion.div>

      {/* ── OUTPUT SIDE ── */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        style={{
          position: 'absolute',
          bottom: 16, right: isAr ? 'auto' : 10, left: isAr ? 10 : 'auto',
          width: cardW, padding: isMini ? '8px 10px' : '12px 14px',
          background: `linear-gradient(135deg, ${C.tealFaint}, #fff)`,
          border: `1px solid ${C.tealLight}`,
          borderRadius: 14,
          boxShadow: `0 2px 16px ${C.tealGlow}`,
          zIndex: 5,
        }}
      >
        <p style={{ fontSize: isMini ? 7.5 : 9, fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: C.tealDark, marginBottom: 3 }}>
          {isAr ? 'هواء نقي' : 'Purified Air'}
        </p>
        {!isMini && <p style={{ fontSize: 10, color: C.tealDark, lineHeight: 1.4, marginBottom: 6 }}>
          {isAr ? '٩٩.٩٩٩٩٪' : '99.9999% Inactivation'}
        </p>}
        <div style={{ display: 'flex', gap: 4 }}>
          {['#34d399', '#60a5fa', C.teal].map((c, i) => (
            <motion.span key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: c, display: 'block' }}
              animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.18 }} />
          ))}
        </div>
      </motion.div>

      {/* ── CENTER DEVICE ── */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 10 }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          style={{
            width: isMini ? 100 : 130, padding: isMini ? '12px 10px' : '16px 12px',
            background: '#fff',
            border: `1.5px solid ${C.teal}`,
            borderRadius: 22,
            boxShadow: `0 8px 40px ${C.tealGlow}, 0 2px 12px rgba(0,0,0,0.08)`,
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
          }}
        >
          <p style={{ fontSize: 7.5, fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: C.tealDark, textAlign: 'center' }}>
            Jonix Device
          </p>
          <PlasmaOrb size={isMini ? 68 : 90} active={inView} />
          <p style={{ fontSize: 8, fontWeight: 600, color: C.charcoal, textAlign: 'center' }}>DBD + ROS</p>
        </motion.div>
      </div>

      {/* ── Particles (rendered only when width is known) ── */}
      {inView && w > 0 && Array.from({ length: isMini ? 4 : 8 }).map((_, i) => {
        const yPos = 36 + (i % 4) * 20;
        return (
          <motion.span key={`in-${i}`}
            style={{ position: 'absolute', top: yPos, left: 0, width: 5, height: 5, borderRadius: '50%',
              background: i % 3 === 0 ? '#ef4444' : i % 3 === 1 ? '#f59e0b' : '#94a3b8' }}
            animate={{ x: [pxIn, pxOut], opacity: [0, 0.85, 0] }}
            transition={{ duration: 2.2, delay: i * 0.22, repeat: Infinity, ease: 'linear' }}
          />
        );
      })}
      {inView && w > 0 && Array.from({ length: isMini ? 4 : 8 }).map((_, i) => {
        const yPos = (isMini ? 140 : 180) + (i % 4) * 18;
        return (
          <motion.span key={`out-${i}`}
            style={{ position: 'absolute', top: yPos, left: 0, width: 5, height: 5, borderRadius: '50%',
              background: i % 2 === 0 ? C.teal : '#60a5fa' }}
            animate={{ x: [pxOut, pxIn], opacity: [0, 1, 0] }}
            transition={{ duration: 2.4, delay: i * 0.2, repeat: Infinity, ease: 'linear' }}
          />
        );
      })}
    </div>
  );
}

/* ─── Cold Plasma explanation diagram ─── */
function PlasmaExplainerGraph({ isAr }: { isAr: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const stages = [
    {
      en: 'Electrical Field', ar: 'المجال الكهربائي',
      desc_en: 'High-voltage DBD electrode energizes molecules',
      desc_ar: 'القطب الكهربائي عالي الجهد يُنشّط الجزيئات',
      icon: '⚡', color: '#f59e0b',
    },
    {
      en: 'Plasma Generation', ar: 'توليد البلازما',
      desc_en: 'Non-thermal plasma state forms at room temperature',
      desc_ar: 'تتشكل البلازما الباردة عند درجة حرارة الغرفة',
      icon: '🌀', color: C.teal,
    },
    {
      en: 'ROS Release', ar: 'إطلاق ROS',
      desc_en: 'Reactive oxygen species break molecular bonds',
      desc_ar: 'أنواع الأكسجين التفاعلية تكسر الروابط الجزيئية',
      icon: '💥', color: C.tealDark,
    },
    {
      en: 'Pathogen Elimination', ar: 'القضاء على الممرضات',
      desc_en: '6-log reduction — virus & bacteria inactivated',
      desc_ar: 'تقليل ٦ أضعاف — تعطيل الفيروسات والبكتيريا',
      icon: '✓', color: '#34d399',
    },
  ];

  return (
    <div ref={ref} style={{ marginTop: 24 }}>
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        style={{ marginBottom: 16 }}
      >
        <p style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.3em', textTransform: 'uppercase', color: C.teal, marginBottom: 4 }}>
          {isAr ? 'كيف تعمل البلازما الباردة' : 'How Cold Plasma Works'}
        </p>
        <p style={{ fontSize: 15, fontWeight: 700, color: C.dark }}>
          {isAr ? 'عملية التعطيل المكوّنة من ٤ مراحل' : '4-Stage Inactivation Process'}
        </p>
      </motion.div>

      {/* Stage flow */}
      <div style={{ position: 'relative' }}>
        {/* Connecting line */}
        <motion.div
          style={{
            position: 'absolute',
            top: 28,
            left: isAr ? 'auto' : 28,
            right: isAr ? 28 : 'auto',
            width: 4,
            height: '100%',
            background: `linear-gradient(to bottom, #f59e0b, ${C.teal}, ${C.tealDark}, #34d399)`,
            borderRadius: 4,
            transformOrigin: 'top',
          }}
          initial={{ scaleY: 0 }}
          animate={inView ? { scaleY: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.3, ease: 'easeInOut' }}
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingLeft: isAr ? 0 : 44, paddingRight: isAr ? 44 : 0 }}>
          {stages.map((stage, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: isAr ? 20 : -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.12 }}
              style={{
                position: 'relative',
                display: 'flex', alignItems: 'flex-start', gap: 14,
                padding: '14px 16px',
                background: '#fff',
                border: `1px solid ${C.light}`,
                borderRadius: 16,
                boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
                transition: 'box-shadow 0.25s ease',
                cursor: 'default',
              }}
              whileHover={{ boxShadow: `0 6px 24px ${stage.color}22` }}
            >
              {/* Node dot on line */}
              <div style={{
                position: 'absolute',
                top: 22,
                left: isAr ? 'auto' : -32,
                right: isAr ? -32 : 'auto',
                width: 12, height: 12,
                borderRadius: '50%',
                background: stage.color,
                border: '2px solid #fff',
                boxShadow: `0 0 0 3px ${stage.color}33`,
              }} />

              {/* Icon */}
              <div style={{
                width: 40, height: 40, borderRadius: 12, flexShrink: 0,
                background: `${stage.color}15`,
                border: `1px solid ${stage.color}30`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 17,
              }}>
                {stage.icon}
              </div>

              {/* Text */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                  <span style={{
                    width: 18, height: 18, borderRadius: '50%',
                    background: stage.color, color: '#fff',
                    fontSize: 9, fontWeight: 800,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>{i + 1}</span>
                  <p style={{ fontSize: 13, fontWeight: 700, color: C.dark, letterSpacing: '0.01em' }}>
                    {isAr ? stage.ar : stage.en}
                  </p>
                </div>
                <p style={{ fontSize: 11.5, color: '#888', lineHeight: 1.6 }}>
                  {isAr ? stage.desc_ar : stage.desc_en}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Animated efficiency bar ─── */
function EfficiencyBar({ label, value, color, delay = 0, inView }: { label: string; value: number; color: string; delay?: number; inView: boolean }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
        <span style={{ fontSize: 11.5, fontWeight: 600, color: C.charcoal }}>{label}</span>
        <span style={{ fontSize: 11.5, fontWeight: 700, color: color }}>{value}%</span>
      </div>
      <div style={{ height: 6, background: C.light, borderRadius: 6, overflow: 'hidden' }}>
        <motion.div
          style={{ height: '100%', borderRadius: 6, background: `linear-gradient(90deg, ${color}, ${color}aa)` }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${value}%` } : {}}
          transition={{ duration: 1.2, delay, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}

/* ─── Main export ─── */
export default function TechnologySection() {
  const t = useTranslations('technology');
  const locale = useLocale();
  const isAr = locale === 'ar';

  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-60px' });

  const steps = [t('step1'), t('step2'), t('step3'), t('step4')];

  const efficiencyData = [
    { label: isAr ? 'تعطيل فيروس كورونا' : 'SARS-CoV-2 Inactivation', value: 99.9999, color: C.teal },
    { label: isAr ? 'إزالة الملوثات' : 'Pollutant Removal', value: 99.99, color: C.tealDark },
    { label: isAr ? 'تقليل البكتيريا' : 'Bacterial Reduction', value: 99.97, color: C.charcoal },
    { label: isAr ? 'القضاء على الجراثيم' : 'Spore Elimination', value: 98.5, color: C.tealLight },
  ];

  return (
    <section
      id="technology"
      style={{
        background: `linear-gradient(160deg, #f8fafb 0%, #f1f5f8 50%, #eaf0f3 100%)`,
        padding: 'clamp(60px, 10vw, 100px) 0',
        fontFamily: "'DM Sans', sans-serif",
      }}
      dir={isAr ? 'rtl' : 'ltr'}
    >
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 clamp(16px, 4vw, 40px)' }} ref={sectionRef}>

        {/* ── SECTION HEADER ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 72 }}
        >
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '6px 16px',
            background: `${C.teal}18`,
            border: `1px solid ${C.teal}40`,
            borderRadius: 100,
            marginBottom: 16,
          }}>
            <motion.span
              style={{ width: 6, height: 6, borderRadius: '50%', background: C.teal, display: 'block' }}
              animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase', color: C.tealDark }}>
              {isAr ? 'تقنية NTP' : 'NTP Technology'}
            </span>
          </div>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(32px, 4vw, 52px)',
            fontWeight: 900, color: C.dark,
            lineHeight: 1.1, letterSpacing: '-0.02em',
            maxWidth: 700, margin: '0 auto 16px',
          }}>
            {t('title')}
          </h2>
          <p style={{ fontSize: 16, color: '#888', lineHeight: 1.75, maxWidth: 560, margin: '0 auto', fontWeight: 300 }}>
            {t('subtitle')}
          </p>
        </motion.div>

        {/* ── MAIN GRID ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 460px), 1fr))', gap: 'clamp(24px, 4vw, 40px)', alignItems: 'start' }}>

          {/* ══ LEFT COLUMN ══ */}
          <div>
            {/* Highlight cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 36 }}>
              {technologyHighlights.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: isAr ? 24 : -24 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.45, delay: 0.1 + i * 0.08 }}
                  style={{
                    display: 'flex', alignItems: 'flex-start', gap: 14,
                    padding: '16px 18px',
                    background: '#fff',
                    border: `1px solid ${C.light}`,
                    borderRadius: 18,
                    boxShadow: '0 2px 14px rgba(90,138,150,0.06)',
                    transition: 'box-shadow 0.3s ease, transform 0.3s ease',
                    cursor: 'default',
                  }}
                  whileHover={{
                    boxShadow: `0 8px 32px ${HIGHLIGHT_COLORS[i % 4]}22`,
                    y: -2,
                  }}
                >
                  <div style={{
                    width: 38, height: 38, borderRadius: 12, flexShrink: 0,
                    background: `${HIGHLIGHT_COLORS[i % 4]}15`,
                    border: `1px solid ${HIGHLIGHT_COLORS[i % 4]}30`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <SparkIcon style={{ width: 16, height: 16, color: HIGHLIGHT_COLORS[i % 4] }} />
                  </div>
                  <p style={{ fontSize: 13.5, lineHeight: 1.65, color: '#5a6a7a', fontWeight: 400, paddingTop: 2 }}>
                    {isAr ? item.ar : item.en}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Efficiency bars */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.35 }}
              style={{
                padding: '24px 22px',
                background: '#fff',
                border: `1px solid ${C.light}`,
                borderRadius: 20,
                boxShadow: '0 2px 16px rgba(90,138,150,0.07)',
              }}
            >
              <p style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.28em', textTransform: 'uppercase', color: C.teal, marginBottom: 18 }}>
                {isAr ? 'كفاءة التعطيل' : 'Inactivation Efficiency'}
              </p>
              {efficiencyData.map((bar, i) => (
                <EfficiencyBar key={i} {...bar} delay={0.5 + i * 0.12} inView={inView} />
              ))}
            </motion.div>
          </div>

          {/* ══ RIGHT COLUMN ══ */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

            {/* Animated flow diagram */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.15 }}
              style={{
                padding: 20,
                background: '#fff',
                border: `1px solid ${C.light}`,
                borderRadius: 24,
                boxShadow: '0 4px 28px rgba(90,138,150,0.09)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                <div>
                  <p style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.28em', textTransform: 'uppercase', color: C.teal }}>
                    {isAr ? 'الجهاز النشط' : 'Live Device Model'}
                  </p>
                  <p style={{ fontSize: 14, fontWeight: 700, color: C.dark, marginTop: 2 }}>
                    {isAr ? 'كيف يعمل جهاز Jonix' : 'How Jonix Works'}
                  </p>
                </div>
                <motion.div
                  style={{
                    display: 'flex', alignItems: 'center', gap: 5,
                    padding: '4px 10px',
                    background: `${C.teal}18`,
                    border: `1px solid ${C.teal}40`,
                    borderRadius: 100,
                    fontSize: 9, fontWeight: 700,
                    letterSpacing: '0.15em', textTransform: 'uppercase',
                    color: C.tealDark,
                  }}
                >
                  <motion.span
                    style={{ width: 5, height: 5, borderRadius: '50%', background: C.teal, display: 'block' }}
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.6, repeat: Infinity }}
                  />
                  {isAr ? 'نشط' : 'Live'}
                </motion.div>
              </div>
              <PlasmaDiagram isAr={isAr} />
            </motion.div>

            {/* Process steps 2×2 */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.4 }}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 10 }}
            >
              {steps.map((step, i) => (
                <motion.div
                  key={i}
                  style={{
                    display: 'flex', alignItems: 'flex-start', gap: 10,
                    padding: '12px 14px',
                    background: '#fff',
                    border: `1px solid ${C.light}`,
                    borderRadius: 14,
                    boxShadow: '0 1px 6px rgba(90,138,150,0.05)',
                  }}
                  whileHover={{ boxShadow: `0 4px 16px ${C.teal}22`, y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <span style={{
                    width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
                    background: `linear-gradient(135deg, ${C.teal}, ${C.tealDark})`,
                    color: '#fff', fontSize: 9.5, fontWeight: 800,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: `0 2px 8px ${C.teal}44`,
                  }}>
                    {i + 1}
                  </span>
                  <p style={{ fontSize: 12, fontWeight: 600, color: '#5a6a7a', lineHeight: 1.45 }}>{step}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* ── COLD PLASMA EXPLAINER GRAPH ── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.5 }}
          style={{
            marginTop: 60,
            padding: '36px 36px',
            background: '#fff',
            border: `1px solid ${C.light}`,
            borderRadius: 28,
            boxShadow: '0 8px 40px rgba(90,138,150,0.09)',
          }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: 'clamp(24px, 4vw, 48px)', alignItems: 'start' }}>
            {/* Left: explainer */}
            <PlasmaExplainerGraph isAr={isAr} />

            {/* Right: What is Cold Plasma */}
            <div>
              <p style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.3em', textTransform: 'uppercase', color: C.teal, marginBottom: 6 }}>
                {isAr ? 'علم البلازما الباردة' : 'The Science'}
              </p>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 800, color: C.dark, lineHeight: 1.25, marginBottom: 16 }}>
                {isAr ? 'ما هي البلازما الباردة؟' : 'What is Cold Plasma?'}
              </p>
              <p style={{ fontSize: 13.5, color: '#777', lineHeight: 1.85, marginBottom: 24, fontWeight: 300 }}>
                {isAr
                  ? 'البلازما الباردة هي الحالة الرابعة للمادة — تتشكل عند تعريض الغاز لمجال كهربائي عالي الجهد، مما يُنتج أيونات تفاعلية وجذور حرة تُدمر الكائنات الدقيقة.'
                  : 'Cold plasma is the fourth state of matter — formed when gas is exposed to a high-voltage electric field, producing reactive ions and free radicals that destroy microorganisms at a molecular level.'}
              </p>

              {/* Three comparison cards */}
              {[
                {
                  title: isAr ? 'البلازما الحرارية' : 'Thermal Plasma',
                  desc: isAr ? 'حرارة عالية جداً > ١٠٫٠٠٠ درجة — خطرة للاستخدام المباشر' : 'Extreme heat > 10,000°C — dangerous for direct use',
                  icon: '🔥', bg: '#fff5f0', border: '#fdc9b4', col: '#c05228',
                },
                {
                  title: isAr ? 'البلازما الباردة (NTP)' : 'Cold Plasma (NTP)',
                  desc: isAr ? 'درجة حرارة الغرفة · آمن · فعّال ضد الفيروسات والبكتيريا' : 'Room temperature · Safe · Effective against viruses & bacteria',
                  icon: '❄', bg: `${C.tealFaint}`, border: C.tealLight, col: C.tealDark,
                  featured: true,
                },
                {
                  title: isAr ? 'جهاز Jonix DBD' : 'Jonix DBD Device',
                  desc: isAr ? 'تقنية التفريغ الحاجز العازل — البلازما الباردة المرخصة من إيطاليا' : 'Dielectric Barrier Discharge — licensed Italian cold plasma tech',
                  icon: '⚙', bg: '#f6f8fa', border: C.light, col: C.charcoal,
                },
              ].map((card, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.45, delay: 0.6 + i * 0.1 }}
                  style={{
                    display: 'flex', gap: 12,
                    padding: '14px 16px',
                    background: card.bg,
                    border: `1px solid ${card.border}`,
                    borderRadius: 14,
                    marginBottom: 10,
                    boxShadow: card.featured ? `0 4px 20px ${C.teal}20` : 'none',
                  }}
                >
                  <span style={{ fontSize: 20, flexShrink: 0, lineHeight: 1.3 }}>{card.icon}</span>
                  <div>
                    <p style={{ fontSize: 12.5, fontWeight: 700, color: card.col, marginBottom: 3 }}>{card.title}</p>
                    <p style={{ fontSize: 11.5, color: '#888', lineHeight: 1.55 }}>{card.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}