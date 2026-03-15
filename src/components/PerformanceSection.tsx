'use client';

import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { certifiedPerformance } from '@/data/catalog';

/* ─── Brand palette ─── */
const C = {
  teal:      '#8eb2bb',
  tealLight: '#b8d0d6',
  tealDark:  '#5a8a96',
  tealGlow:  'rgba(142,178,187,0.14)',
  charcoal:  '#646464',
  light:     '#dddddd',
  navy:      '#06101a',
  white:     '#ffffff',
  border:    'rgba(255,255,255,0.07)',
  muted:     'rgba(255,255,255,0.38)',
};

/* ─── Count-up hook ─── */
function useCountUp(target: number, duration = 1600, trigger: boolean) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let raf: number;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 4);
      setVal(Math.floor(eased * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, trigger]);
  return val;
}

/* ─── Animated arc ring ─── */
function ArcRing({ pct, color, size = 110 }: { pct: number; color: string; size?: number }) {
  const radius = (size - 14) / 2;
  const circ   = 2 * Math.PI * radius;
  const dash   = (pct / 100) * circ;
  const cx     = size / 2;

  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)', flexShrink: 0 }}>
      {/* Track */}
      <circle cx={cx} cy={cx} r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={7} />
      {/* Glow ring */}
      <circle
        cx={cx} cy={cx} r={radius}
        fill="none"
        stroke={color}
        strokeWidth={7}
        strokeLinecap="round"
        strokeDasharray={`${dash} ${circ}`}
        style={{ filter: `drop-shadow(0 0 6px ${color}88)`, transition: 'stroke-dasharray 1.4s cubic-bezier(0.22,1,0.36,1)' }}
      />
    </svg>
  );
}

/* ─── Animated arc ring — scroll-triggered ─── */
function AnimatedArcRing({ pct, color, size, inView }: { pct: number; color: string; size?: number; inView: boolean }) {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    if (inView) setCurrent(pct);
  }, [inView, pct]);
  return <ArcRing pct={current} color={color} size={size} />;
}

/* ─── Metric card ─── */
type Metric = { pct: number; suffix: string; en: string; ar: string; color: string; desc_en: string; desc_ar: string };

function MetricCard({ m, i, inView, isAr }: { m: Metric; i: number; inView: boolean; isAr: boolean }) {
  const whole = Math.floor(m.pct);
  const dec   = m.pct % 1 !== 0 ? '.' + String(m.pct).split('.')[1] : '';
  const count = useCountUp(whole, 1500, inView);

  return (
    <motion.div
      initial={{ opacity: 0, y: 32, scale: 0.97 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'relative',
        background: 'rgba(255,255,255,0.04)',
        border: `1px solid ${C.border}`,
        borderRadius: 24,
        padding: '28px 24px 24px',
        overflow: 'hidden',
        backdropFilter: 'blur(14px)',
        cursor: 'default',
        transition: 'border-color 0.3s, box-shadow 0.3s, transform 0.3s',
      }}
      whileHover={{
        borderColor: `${m.color}50`,
        boxShadow: `0 24px 60px rgba(0,0,0,0.4), 0 0 0 1px ${m.color}22`,
        y: -4,
      }}
    >
      {/* Top shimmer */}
      <motion.div
        style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 2,
          background: `linear-gradient(90deg, transparent, ${m.color}80, transparent)`,
        }}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.4 + i * 0.1 }}
      />

      {/* Corner glow */}
      <div style={{
        position: 'absolute', top: -20, right: -20,
        width: 80, height: 80, borderRadius: '50%',
        background: `${m.color}18`, filter: 'blur(20px)',
        pointerEvents: 'none',
      }} />

      {/* Arc + number row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
        <div style={{ position: 'relative', flexShrink: 0 }}>
          <AnimatedArcRing pct={Math.min(m.pct, 100)} color={m.color} size={80} inView={inView} />
          {/* Center number in ring */}
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ fontSize: 11, fontWeight: 800, color: m.color, letterSpacing: '-0.02em' }}>
              {i === 0 ? '6-log' : `${Math.round(m.pct / 10) * 10}%`}
            </span>
          </div>
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(28px, 3vw, 38px)',
            fontWeight: 900,
            color: m.color,
            lineHeight: 1,
            letterSpacing: '-0.03em',
            tabularNums: true,
          } as any}>
            {count}{dec}{m.suffix}
          </p>
        </div>
      </div>

      {/* Label */}
      <p style={{
        fontSize: 12, fontWeight: 700,
        letterSpacing: '0.04em',
        color: 'rgba(255,255,255,0.65)',
        marginBottom: 6,
      }}>
        {isAr ? m.ar : m.en}
      </p>

      {/* Desc */}
      <p style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.32)', lineHeight: 1.6, fontWeight: 300 }}>
        {isAr ? m.desc_ar : m.desc_en}
      </p>

      {/* Animated progress bar */}
      <div style={{ marginTop: 16, height: 3, background: 'rgba(255,255,255,0.06)', borderRadius: 3, overflow: 'hidden' }}>
        <motion.div
          style={{ height: '100%', borderRadius: 3, background: `linear-gradient(90deg, ${m.color}, ${m.color}66)` }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${Math.min(m.pct, 100)}%` } : {}}
          transition={{ duration: 1.4, delay: 0.4 + i * 0.1, ease: 'easeOut' }}
        />
      </div>
    </motion.div>
  );
}

/* ─── Performance detail row ─── */
function DetailRow({ item, i, inView, isAr }: { item: any; i: number; inView: boolean; isAr: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: isAr ? 16 : -16 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.45, delay: 0.1 + i * 0.055, ease: [0.22, 1, 0.36, 1] }}
      style={{
        display: 'flex', alignItems: 'flex-start', gap: 14,
        padding: '14px 18px',
        background: 'rgba(255,255,255,0.03)',
        border: `1px solid ${C.border}`,
        borderRadius: 14,
        transition: 'border-color 0.25s, background 0.25s, transform 0.25s',
        cursor: 'default',
      }}
      whileHover={{
        borderColor: `${C.teal}30`,
        background: 'rgba(255,255,255,0.05)',
        y: -2,
      }}
    >
      {/* Animated dot */}
      <motion.span
        style={{
          width: 7, height: 7, borderRadius: '50%',
          background: C.teal, flexShrink: 0,
          marginTop: 5, display: 'block',
        }}
        animate={{ scale: [1, 1.35, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2.6, repeat: Infinity, delay: i * 0.15 }}
      />
      <p style={{ fontSize: 13, lineHeight: 1.7, color: 'rgba(255,255,255,0.48)', fontWeight: 300 }}>
        {isAr ? item.ar : item.en}
      </p>
    </motion.div>
  );
}

/* ─── Main export ─── */
const METRICS: Metric[] = [
  {
    pct: 99.9999, suffix: '%',
    en: 'SARS-CoV-2 Inactivation',   ar: 'تعطيل فيروس كورونا',
    color: C.teal,
    desc_en: '6-log reduction in independent certified lab testing',
    desc_ar: 'تقليل ٦ أضعاف في مختبرات مستقلة معتمدة',
  },
  {
    pct: 99.99, suffix: '%',
    en: 'Certified Pollutant Removal', ar: 'إزالة الملوثات المعتمدة',
    color: C.tealLight,
    desc_en: 'Continuous decontamination of airborne particulates',
    desc_ar: 'تطهير مستمر للجسيمات المحمولة جواً',
  },
  {
    pct: 99.9, suffix: '%',
    en: 'Bacterial Reduction',         ar: 'تقليل البكتيريا',
    color: C.tealDark,
    desc_en: 'Broad-spectrum antimicrobial effectiveness verified',
    desc_ar: 'فاعلية مضادة للميكروبات واسعة الطيف موثقة',
  },
  {
    pct: 100, suffix: '%',
    en: 'Pure Living Commitment',       ar: 'التزام الحياة النقية',
    color: '#b8d0d6',
    desc_en: 'Italian-licensed NTP technology for MENA markets',
    desc_ar: 'تقنية NTP مرخصة من إيطاليا لأسواق الشرق الأوسط',
  },
];

export default function PerformanceSection() {
  const t        = useTranslations('performance');
  const locale   = useLocale();
  const isAr     = locale === 'ar';
  const ref      = useRef<HTMLElement>(null);
  const inView   = useInView(ref, { once: true, margin: '-100px' });

  const detailRef    = useRef<HTMLDivElement>(null);
  const detailInView = useInView(detailRef, { once: true, margin: '-60px' });

  return (
    <section
      ref={ref}
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: `linear-gradient(160deg, #060f18 0%, #09141e 40%, #0b1a26 70%, #071018 100%)`,
        padding: '110px 0',
        fontFamily: "'DM Sans', sans-serif",
      }}
      dir={isAr ? 'rtl' : 'ltr'}
    >
      {/* ── Ambient orbs ── */}
      <motion.div
        style={{
          position: 'absolute', width: 700, height: 700,
          top: -200, left: '20%',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${C.tealGlow} 0%, transparent 65%)`,
          filter: 'blur(80px)', pointerEvents: 'none',
        }}
        animate={{ scale: [1, 1.12, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        style={{
          position: 'absolute', width: 400, height: 400,
          bottom: 0, right: '10%',
          borderRadius: '50%',
          background: `radial-gradient(circle, rgba(90,138,150,0.09) 0%, transparent 70%)`,
          filter: 'blur(70px)', pointerEvents: 'none',
        }}
        animate={{ scale: [1, 1.18, 1] }}
        transition={{ duration: 8, repeat: Infinity, delay: 3, ease: 'easeInOut' }}
      />

      {/* ── Grid texture ── */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `linear-gradient(${C.tealGlow} 1px, transparent 1px), linear-gradient(90deg, ${C.tealGlow} 1px, transparent 1px)`,
        backgroundSize: '52px 52px',
      }} />

      {/* ── Scanline ── */}
      <motion.div
        style={{
          position: 'absolute', left: 0, right: 0, height: 1,
          background: `linear-gradient(90deg, transparent, ${C.teal}30, transparent)`,
          pointerEvents: 'none', zIndex: 2,
        }}
        animate={{ top: ['-2px', '100%'] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'linear', repeatDelay: 2 }}
      />

      {/* ── Content ── */}
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 44px', position: 'relative', zIndex: 10 }}>

        {/* ── HEADER ── */}
        <div style={{ textAlign: 'center', marginBottom: 72 }}>

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 12,
              marginBottom: 22,
            }}
          >
            <motion.div
              style={{ height: 1, background: `linear-gradient(90deg, transparent, ${C.teal})`, width: 32 }}
              animate={{ width: [32, 48, 32] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />
            <span style={{
              fontSize: 9.5, fontWeight: 800,
              letterSpacing: '0.3em', textTransform: 'uppercase',
              color: `${C.teal}`,
            }}>
              {isAr ? 'بيانات الأداء المعتمدة' : 'Certified Performance Data'}
            </span>
            <motion.div
              style={{ height: 1, background: `linear-gradient(90deg, ${C.teal}, transparent)`, width: 32 }}
              animate={{ width: [32, 48, 32] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
            />
          </motion.div>

          {/* Headline — per-word slide up */}
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(36px, 4.5vw, 60px)',
            fontWeight: 900, color: C.white,
            lineHeight: 1.1, letterSpacing: '-0.02em',
            marginBottom: 20,
          }}>
            {t('title').split(' ').map((word: string, wi: number) => (
              <span key={wi} style={{ display: 'inline-block', overflow: 'hidden', marginRight: '0.25em' }}>
                <motion.span
                  style={{ display: 'inline-block' }}
                  initial={{ y: '110%' }}
                  animate={inView ? { y: 0 } : {}}
                  transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.15 + wi * 0.08 }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.4 }}
            style={{
              fontSize: 16, lineHeight: 1.8,
              color: 'rgba(255,255,255,0.38)',
              maxWidth: 540, margin: '0 auto',
              fontWeight: 300,
            }}
          >
            {t('subtitle')}
          </motion.p>
        </div>

        {/* ── BIG METRIC CARDS ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 16,
          marginBottom: 20,
        }}>
          {METRICS.map((m, i) => (
            <MetricCard key={m.en} m={m} i={i} inView={inView} isAr={isAr} />
          ))}
        </div>

        {/* ── HIGHLIGHT BAND ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.55 }}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexWrap: 'wrap', gap: 0,
            padding: '20px 32px',
            background: `linear-gradient(135deg, rgba(142,178,187,0.06), rgba(90,138,150,0.04))`,
            border: `1px solid ${C.teal}20`,
            borderRadius: 20,
            marginBottom: 20,
          }}
        >
          {[
            { val: '6-log',   label: isAr ? 'تقليل الفيروسات' : 'Virus Reduction' },
            { val: 'DBD',     label: isAr ? 'تقنية التفريغ' : 'Discharge Tech' },
            { val: 'Italy',   label: isAr ? 'مرخص من إيطاليا' : 'Licensed From' },
            { val: '10+',     label: isAr ? 'سنوات' : 'Years' },
            { val: 'MENA',    label: isAr ? 'التغطية الجغرافية' : 'Market Coverage' },
          ].map((s, i) => (
            <div key={i} style={{
              flex: 1, minWidth: 120,
              textAlign: 'center',
              padding: '8px 16px',
              borderLeft: i > 0 ? `1px solid rgba(255,255,255,0.06)` : 'none',
            }}>
              <motion.p
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 22, fontWeight: 900,
                  color: C.white, lineHeight: 1, marginBottom: 4,
                }}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.6 + i * 0.07 }}
              >
                {s.val}
              </motion.p>
              <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)' }}>
                {s.label}
              </p>
            </div>
          ))}
        </motion.div>

        {/* ── DETAIL CARDS ── */}
        <div
          ref={detailRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 10,
          }}
        >
          {certifiedPerformance.map((item, i) => (
            <DetailRow key={i} item={item} i={i} inView={detailInView} isAr={isAr} />
          ))}
        </div>

        {/* ── BOTTOM NOTE ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
          style={{
            marginTop: 36,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
          }}
        >
          <motion.div
            style={{ height: 1, width: 28, background: `linear-gradient(90deg, transparent, ${C.teal}50)` }}
          />
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)', fontWeight: 400, textAlign: 'center' }}>
            {isAr
              ? 'جميع البيانات صادرة عن مختبرات معتمدة ومستقلة — Jonix S.r.l.، فيتشنتسا، إيطاليا'
              : 'All data from certified independent laboratories — Jonix S.r.l., Vicenza, Italy'}
          </p>
          <motion.div
            style={{ height: 1, width: 28, background: `linear-gradient(90deg, ${C.teal}50, transparent)` }}
          />
        </motion.div>

      </div>
    </section>
  );
}