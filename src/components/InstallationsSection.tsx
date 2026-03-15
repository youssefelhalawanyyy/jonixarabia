'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import {
  egyptAuthorization,
  egyptFieldValidation,
  installationGroups,
  installationsNow,
  regionSummary,
} from '@/data/catalog';

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
  mutedDark: '#a0b0b8',
};

const ACCENT_CYCLE = [C.teal, C.tealDark, C.charcoal, C.tealLight];

/* ─── Helpers ─── */
const pick = (locale: string, item: { en: string; ar: string }) =>
  locale === 'ar' ? item.ar : item.en;

/* ─── Section eyebrow label ─── */
function EyebrowLabel({ children, inView }: { children: React.ReactNode; inView: boolean }) {
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
        style={{ width: 6, height: 6, borderRadius: '50%', background: C.teal, display: 'block' }}
        animate={{ scale: [1, 1.5, 1], opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2.2, repeat: Infinity }}
      />
      <span style={{
        fontSize: 9.5, fontWeight: 800,
        letterSpacing: '0.28em', textTransform: 'uppercase',
        color: C.tealDark,
      }}>
        {children}
      </span>
    </motion.div>
  );
}

/* ─── "Now" installation card ─── */
function NowCard({ item, i, locale, inView }: { item: { en: string; ar: string }; i: number; locale: string; inView: boolean }) {
  const accent = ACCENT_CYCLE[i % 4];
  return (
    <motion.article
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.55, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'relative',
        background: C.white,
        border: `1px solid ${C.border}`,
        borderRadius: 18,
        overflow: 'hidden',
        boxShadow: '0 2px 16px rgba(90,138,150,0.07)',
        transition: 'box-shadow 0.3s, transform 0.3s, border-color 0.3s',
        cursor: 'default',
      }}
      whileHover={{
        boxShadow: `0 12px 36px rgba(90,138,150,0.14), 0 0 0 1px ${accent}28`,
        borderColor: `${accent}40`,
        y: -3,
      }}
    >
      {/* Animated left accent bar */}
      <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: 3, background: C.offWhite }}>
        <motion.div
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', background: accent, borderRadius: 2 }}
          initial={{ height: 0 }}
          animate={inView ? { height: '100%' } : {}}
          transition={{ duration: 0.8, delay: 0.3 + i * 0.07, ease: 'easeOut' }}
        />
      </div>
      <div style={{ padding: '14px 16px 14px 20px', display: 'flex', alignItems: 'flex-start', gap: 12 }}>
        <motion.span
          style={{ width: 7, height: 7, borderRadius: '50%', background: accent, flexShrink: 0, marginTop: 5, display: 'block' }}
          animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.15 }}
        />
        <p style={{ fontSize: 13, lineHeight: 1.7, color: C.muted, fontWeight: 400 }}>
          {pick(locale, item)}
        </p>
      </div>
    </motion.article>
  );
}

/* ─── Authorization / Field validation card ─── */
function InfoPanelCard({
  title, items, locale, i, inView, accent,
}: {
  title: string; items: { en: string; ar: string }[];
  locale: string; i: number; inView: boolean; accent: string;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, x: i === 0 ? -24 : 24, scale: 0.97 }}
      animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
      style={{
        background: C.white,
        border: `1px solid ${C.border}`,
        borderRadius: 22,
        overflow: 'hidden',
        boxShadow: '0 3px 20px rgba(90,138,150,0.08)',
        transition: 'box-shadow 0.3s, border-color 0.3s, transform 0.3s',
        cursor: 'default',
      }}
      whileHover={{
        boxShadow: `0 14px 44px rgba(90,138,150,0.13), 0 0 0 1px ${accent}28`,
        borderColor: `${accent}38`,
        y: -3,
      }}
    >
      {/* Animated top stripe */}
      <div style={{ position: 'relative', height: 3, background: C.offWhite }}>
        <motion.div
          style={{ position: 'absolute', top: 0, left: 0, height: '100%', background: `linear-gradient(90deg, ${accent}, ${accent}66)`, borderRadius: 2 }}
          initial={{ width: 0 }}
          animate={inView ? { width: '100%' } : {}}
          transition={{ duration: 0.9, delay: 0.3 + i * 0.1, ease: 'easeOut' }}
        />
      </div>
      <div style={{ padding: '22px 22px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 10, flexShrink: 0,
            background: `${accent}12`,
            border: `1px solid ${accent}28`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ fontSize: 14 }}>{i === 0 ? '🏛' : '🔬'}</span>
          </div>
          <h3 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 15.5, fontWeight: 800, color: C.dark, lineHeight: 1.2,
          }}>
            {title}
          </h3>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
          {items.map((item, j) => (
            <motion.div
              key={item.en}
              initial={{ opacity: 0, x: locale === 'ar' ? 10 : -10 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.38, delay: 0.4 + i * 0.1 + j * 0.055 }}
              style={{
                display: 'flex', alignItems: 'flex-start', gap: 10,
                padding: '10px 12px',
                background: C.offWhite,
                border: `1px solid ${C.border}`,
                borderRadius: 11,
              }}
            >
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: accent, flexShrink: 0, marginTop: 6, display: 'block' }} />
              <p style={{ fontSize: 12.5, lineHeight: 1.65, color: C.muted, fontWeight: 400 }}>
                {pick(locale, item)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

/* ─── Installation group card ─── */
function GroupCard({
  group, i, locale, inView,
}: {
  group: any; i: number; locale: string; inView: boolean;
}) {
  const accent = ACCENT_CYCLE[i % 4];
  return (
    <motion.article
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
      style={{
        background: C.white,
        border: `1px solid ${C.border}`,
        borderRadius: 22,
        overflow: 'hidden',
        boxShadow: '0 3px 18px rgba(90,138,150,0.07)',
        transition: 'box-shadow 0.3s, border-color 0.3s, transform 0.3s',
        cursor: 'default',
      }}
      whileHover={{
        boxShadow: `0 16px 48px rgba(90,138,150,0.13), 0 0 0 1px ${accent}28`,
        borderColor: `${accent}35`,
        y: -3,
      }}
    >
      {/* Animated top stripe */}
      <div style={{ position: 'relative', height: 3, background: C.offWhite }}>
        <motion.div
          style={{ position: 'absolute', top: 0, left: 0, height: '100%', background: `linear-gradient(90deg, ${accent}, ${accent}55)` }}
          initial={{ width: 0 }}
          animate={inView ? { width: '100%' } : {}}
          transition={{ duration: 0.95, delay: 0.25 + i * 0.09, ease: 'easeOut' }}
        />
      </div>
      <div style={{ padding: '22px 22px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
          <motion.span
            style={{ width: 9, height: 9, borderRadius: '50%', background: accent, display: 'block', flexShrink: 0 }}
            animate={{ scale: [1, 1.35, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.25 }}
          />
          <h3 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 17, fontWeight: 800, color: C.dark, lineHeight: 1.2,
          }}>
            {pick(locale, group.title)}
          </h3>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 7 }}>
          {group.items.map((item: { en: string; ar: string }, j: number) => (
            <motion.div
              key={`${group.id}-${j}`}
              initial={{ opacity: 0, x: locale === 'ar' ? 12 : -12 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.38, delay: 0.35 + i * 0.09 + j * 0.04 }}
              style={{
                padding: '9px 12px',
                background: `${accent}07`,
                border: `1px solid ${accent}18`,
                borderRadius: 11,
                fontSize: 12, lineHeight: 1.55, color: C.muted,
                transition: 'background 0.2s, border-color 0.2s',
              }}
            >
              {pick(locale, item)}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

/* ─── Sticky region summary sidebar ─── */
function RegionSidebar({
  items, locale, inView, title,
}: {
  items: { en: string; ar: string }[]; locale: string; inView: boolean; title: string;
}) {
  return (
    <motion.aside
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'sticky', top: 80,
        background: `linear-gradient(160deg, ${C.tealFaint}, rgba(255,255,255,0.5))`,
        border: `1px solid ${C.teal}28`,
        borderRadius: 22,
        overflow: 'hidden',
        boxShadow: `0 4px 28px rgba(90,138,150,0.1)`,
      }}
    >
      {/* Animated top stripe */}
      <div style={{ position: 'relative', height: 3, background: C.offWhite }}>
        <motion.div
          style={{
            position: 'absolute', top: 0, left: 0, height: '100%',
            background: `linear-gradient(90deg, ${C.teal}, ${C.tealLight})`,
          }}
          initial={{ width: 0 }}
          animate={inView ? { width: '100%' } : {}}
          transition={{ duration: 1.0, delay: 0.35, ease: 'easeOut' }}
        />
      </div>
      <div style={{ padding: '22px 20px 20px' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 18 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 10, flexShrink: 0,
            background: `${C.teal}14`,
            border: `1px solid ${C.teal}30`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 14,
          }}>🌍</div>
          <h3 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 14.5, fontWeight: 800, color: C.dark, lineHeight: 1.25,
          }}>
            {title}
          </h3>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {items.map((item, i) => (
            <motion.div
              key={item.en}
              initial={{ opacity: 0, x: 10 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.45 + i * 0.06 }}
              style={{
                display: 'flex', alignItems: 'flex-start', gap: 10,
                padding: '10px 12px',
                background: C.white,
                border: `1px solid ${C.border}`,
                borderRadius: 12,
                boxShadow: '0 1px 4px rgba(90,138,150,0.05)',
              }}
            >
              <motion.span
                style={{ width: 6, height: 6, borderRadius: '50%', background: C.teal, flexShrink: 0, marginTop: 5, display: 'block' }}
                animate={{ scale: [1, 1.35, 1], opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.18 }}
              />
              <p style={{ fontSize: 12, lineHeight: 1.65, color: C.muted, fontWeight: 400 }}>
                {pick(locale, item)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.aside>
  );
}

/* ─── Main export ─── */
export default function InstallationsSection() {
  const t      = useTranslations('installations');
  const locale = useLocale();
  const isAr   = locale === 'ar';

  const headerRef = useRef<HTMLDivElement>(null);
  const nowRef    = useRef<HTMLDivElement>(null);
  const authRef   = useRef<HTMLDivElement>(null);
  const groupRef  = useRef<HTMLDivElement>(null);

  const headerInView = useInView(headerRef, { once: true, margin: '-80px' });
  const nowInView    = useInView(nowRef,    { once: true, margin: '-60px' });
  const authInView   = useInView(authRef,   { once: true, margin: '-60px' });
  const groupInView  = useInView(groupRef,  { once: true, margin: '-60px' });

  return (
    <section
      id="installations"
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
      <motion.div
        style={{
          position: 'absolute', width: 700, height: 700,
          top: -200, right: -150, borderRadius: '50%',
          background: `radial-gradient(circle, ${C.tealGlow} 0%, transparent 70%)`,
          filter: 'blur(80px)', pointerEvents: 'none',
        }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        style={{
          position: 'absolute', width: 400, height: 400,
          bottom: 100, left: -80, borderRadius: '50%',
          background: `radial-gradient(circle, rgba(90,138,150,0.08) 0%, transparent 70%)`,
          filter: 'blur(60px)', pointerEvents: 'none',
        }}
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 8, repeat: Infinity, delay: 2.5, ease: 'easeInOut' }}
      />

      {/* ── Dot grid ── */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `radial-gradient(${C.teal}28 1px, transparent 1px)`,
        backgroundSize: '32px 32px', opacity: 0.4,
      }} />

      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 clamp(16px, 4vw, 44px)', position: 'relative', zIndex: 10 }}>

        {/* ── HEADER ── */}
        <div ref={headerRef} style={{ maxWidth: 780, marginBottom: 68 }}>
          <EyebrowLabel inView={headerInView}>
            {isAr ? 'التركيبات والتوزيع' : 'Installations & Deployments'}
          </EyebrowLabel>

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
            transition={{ duration: 0.55, delay: 0.4 }}
            style={{ fontSize: 16, lineHeight: 1.8, color: C.muted, maxWidth: 620, fontWeight: 300 }}
          >
            {t('subtitle')}
          </motion.p>
        </div>

        {/* ── INSTALLATIONS NOW 2-col ── */}
        <div ref={nowRef} style={{ marginBottom: 52 }}>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={nowInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45 }}
            style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 22 }}
          >
            <motion.div
              style={{ height: 2, background: `linear-gradient(90deg, ${C.teal}, transparent)`, borderRadius: 2 }}
              initial={{ width: 0 }}
              animate={nowInView ? { width: 32 } : {}}
              transition={{ duration: 0.8, delay: 0.15 }}
            />
            <h3 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 22, fontWeight: 800, color: C.dark,
            }}>
              {isAr ? 'التركيبات الحالية' : 'Current Installations'}
            </h3>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))', gap: 12 }}>
            {installationsNow.map((item, i) => (
              <NowCard key={item.en} item={item} i={i} locale={locale} inView={nowInView} />
            ))}
          </div>
        </div>

        {/* ── AUTH + FIELD 2-col ── */}
        <div ref={authRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))', gap: 18, marginBottom: 52 }}>
          <InfoPanelCard
            title={t('authorizationTitle')}
            items={egyptAuthorization}
            locale={locale} i={0} inView={authInView}
            accent={C.tealDark}
          />
          <InfoPanelCard
            title={t('fieldTitle')}
            items={egyptFieldValidation}
            locale={locale} i={1} inView={authInView}
            accent={C.teal}
          />
        </div>

        {/* ── GROUPS + SIDEBAR ── */}
        <div ref={groupRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))', gap: 22, alignItems: 'start' }}>

          {/* Groups */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            {installationGroups.map((group, i) => (
              <GroupCard key={group.id} group={group} i={i} locale={locale} inView={groupInView} />
            ))}
          </div>

          {/* Sticky sidebar */}
          <RegionSidebar
            items={regionSummary}
            locale={locale}
            inView={groupInView}
            title={isAr ? 'ملخص الانتشار الإقليمي' : 'Regional Deployment Summary'}
          />
        </div>

        {/* ── BOTTOM TRUST STRIP ── */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={groupInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
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
            <motion.div
              style={{
                width: 40, height: 40, borderRadius: 12,
                background: `${C.teal}15`,
                border: `1px solid ${C.teal}30`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 18, flexShrink: 0,
              }}
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              📍
            </motion.div>
            <div>
              <p style={{ fontSize: 13.5, fontWeight: 700, color: C.dark, marginBottom: 2 }}>
                {isAr ? 'تغطية إقليمية موسعة' : 'Expanding Regional Coverage'}
              </p>
              <p style={{ fontSize: 12, color: C.muted, fontWeight: 300 }}>
                {isAr
                  ? 'تركيبات نشطة في مصر والشرق الأوسط وإيطاليا'
                  : 'Active installations across Egypt, Middle East & Italy'}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
            {['Egypt', 'Saudi Arabia', 'UAE', 'Italy', 'MENA+'].map((chip, ci) => (
              <motion.span
                key={chip}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={groupInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.55 + ci * 0.07 }}
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