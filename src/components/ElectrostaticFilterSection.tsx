'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import {
  electrostaticAdvantages,
  electrostaticGermicidalEffect,
  electrostaticOperation,
  electrostaticOverview,
  electrostaticPathogens,
  type LocalizedText,
} from '@/data/catalog';

/* ─── Helpers ─── */
const pick = (locale: string, item: LocalizedText) => locale === 'ar' ? item.ar : item.en;

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
  border:    '#e6ecf0',
  muted:     '#7a8a96',
};

/* Card accent colors mapped to brand */
const ACCENTS = [C.tealDark, C.teal, C.charcoal, C.tealLight];

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

/* ─── Info card (4 main cards) ─── */
function InfoCard({
  title, items, accent, i, locale, inView,
}: {
  title: string; items: LocalizedText[]; accent: string;
  i: number; locale: string; inView: boolean;
}) {
  const icons = ['◈', '◎', '⬡', '◇'];

  return (
    <motion.article
      initial={{ opacity: 0, y: 28, scale: 0.97 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'relative',
        background: C.white,
        border: `1px solid ${C.border}`,
        borderRadius: 24,
        overflow: 'hidden',
        boxShadow: '0 2px 18px rgba(90,138,150,0.07)',
        transition: 'box-shadow 0.3s ease, transform 0.3s ease, border-color 0.3s ease',
        cursor: 'default',
      }}
      whileHover={{
        boxShadow: `0 16px 48px rgba(90,138,150,0.14), 0 0 0 1px ${accent}30`,
        borderColor: `${accent}40`,
        y: -4,
      }}
    >
      {/* Animated top stripe */}
      <div style={{ position: 'relative', height: 3, background: C.offWhite }}>
        <motion.div
          style={{ position: 'absolute', top: 0, left: 0, height: '100%', background: `linear-gradient(90deg, ${accent}, ${accent}66)`, borderRadius: 2 }}
          initial={{ width: 0 }}
          animate={inView ? { width: '100%' } : {}}
          transition={{ duration: 1.0, delay: 0.3 + i * 0.09, ease: 'easeOut' }}
        />
      </div>

      <div style={{ padding: '22px 22px 20px' }}>
        {/* Card header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
          <motion.div
            style={{
              width: 38, height: 38, borderRadius: 12, flexShrink: 0,
              background: `${accent}12`,
              border: `1px solid ${accent}28`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 16, color: accent,
            }}
            whileHover={{ scale: 1.1, background: `${accent}20` }}
            transition={{ duration: 0.2 }}
          >
            {icons[i]}
          </motion.div>
          <h3 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 16, fontWeight: 800,
            color: C.dark, lineHeight: 1.2,
          }}>
            {title}
          </h3>
        </div>

        {/* Items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
          {items.map((item, j) => (
            <motion.div
              key={item.en}
              initial={{ opacity: 0, x: locale === 'ar' ? 12 : -12 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.35 + i * 0.09 + j * 0.055 }}
              style={{
                display: 'flex', alignItems: 'flex-start', gap: 11,
                padding: '11px 13px',
                background: C.offWhite,
                border: `1px solid ${C.border}`,
                borderRadius: 12,
                transition: 'background 0.2s, border-color 0.2s',
              }}
            >
              <motion.span
                style={{
                  width: 6, height: 6, borderRadius: '50%',
                  background: accent, flexShrink: 0, marginTop: 5, display: 'block',
                }}
                animate={{ scale: [1, 1.35, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: j * 0.2 }}
              />
              <p style={{ fontSize: 13, lineHeight: 1.65, color: C.muted, fontWeight: 400 }}>
                {pick(locale, item)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

/* ─── Pathogen group card ─── */
function PathogenCard({
  group, i, locale, inView,
}: {
  group: any; i: number; locale: string; inView: boolean;
}) {
  const accent = ACCENTS[i % 4];

  return (
    <motion.article
      initial={{ opacity: 0, y: 22, scale: 0.97 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'relative',
        background: C.white,
        border: `1px solid ${C.border}`,
        borderRadius: 20,
        overflow: 'hidden',
        boxShadow: '0 2px 14px rgba(90,138,150,0.06)',
        transition: 'box-shadow 0.3s, transform 0.3s, border-color 0.3s',
        cursor: 'default',
      }}
      whileHover={{
        boxShadow: `0 12px 36px rgba(90,138,150,0.13), 0 0 0 1px ${accent}28`,
        borderColor: `${accent}38`,
        y: -3,
      }}
    >
      {/* Animated top stripe */}
      <div style={{ position: 'relative', height: 3, background: C.offWhite }}>
        <motion.div
          style={{ position: 'absolute', top: 0, left: 0, height: '100%', background: accent }}
          initial={{ width: 0 }}
          animate={inView ? { width: '100%' } : {}}
          transition={{ duration: 0.9, delay: 0.25 + i * 0.08, ease: 'easeOut' }}
        />
      </div>

      <div style={{ padding: '18px 18px 16px' }}>
        {/* Group title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 13 }}>
          <motion.span
            style={{ width: 8, height: 8, borderRadius: '50%', background: accent, display: 'block', flexShrink: 0 }}
            animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.3 }}
          />
          <h4 style={{
            fontSize: 10, fontWeight: 800,
            letterSpacing: '0.22em', textTransform: 'uppercase',
            color: C.dark,
          }}>
            {pick(locale, group.title)}
          </h4>
        </div>

        {/* Pathogen pills */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
          {group.items.map((item: LocalizedText, j: number) => (
            <motion.div
              key={j}
              initial={{ opacity: 0, x: 10 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.35, delay: 0.3 + i * 0.08 + j * 0.05 }}
              style={{
                padding: '8px 12px',
                background: `${accent}08`,
                border: `1px solid ${accent}18`,
                borderRadius: 10,
                fontSize: 12, lineHeight: 1.5,
                color: C.muted,
                transition: 'background 0.2s, border-color 0.2s',
              }}
            >
              {pick(locale, item)}
            </motion.div>
          ))}
        </div>

        {/* Note */}
        {group.note && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 + i * 0.08 }}
            style={{
              marginTop: 10,
              padding: '9px 12px',
              background: `${C.teal}10`,
              border: `1px solid ${C.teal}25`,
              borderRadius: 10,
              fontSize: 11.5, lineHeight: 1.6,
              color: C.tealDark,
              fontStyle: 'italic',
            }}
          >
            {pick(locale, group.note)}
          </motion.p>
        )}
      </div>
    </motion.article>
  );
}

/* ─── Main export ─── */
export default function ElectrostaticFilterSection() {
  const t      = useTranslations('electrostatic');
  const locale = useLocale();
  const isAr   = locale === 'ar';

  const headerRef  = useRef<HTMLDivElement>(null);
  const cardsRef   = useRef<HTMLDivElement>(null);
  const pathRef    = useRef<HTMLDivElement>(null);

  const headerInView  = useInView(headerRef,  { once: true, margin: '-80px' });
  const cardsInView   = useInView(cardsRef,   { once: true, margin: '-60px' });
  const pathInView    = useInView(pathRef,    { once: true, margin: '-60px' });

  const cards = [
    { title: t('overviewTitle'),   items: electrostaticOverview,         accent: ACCENTS[0] },
    { title: t('operationTitle'),  items: electrostaticOperation,        accent: ACCENTS[1] },
    { title: t('germicidalTitle'), items: electrostaticGermicidalEffect, accent: ACCENTS[2] },
    { title: t('advantagesTitle'), items: electrostaticAdvantages,       accent: ACCENTS[3] },
  ];

  return (
    <section
      id="electrostatic"
      style={{
        background: `linear-gradient(160deg, #f8fafb 0%, #f2f6f9 50%, #edf2f5 100%)`,
        padding: '110px 0',
        fontFamily: "'DM Sans', sans-serif",
        position: 'relative',
        overflow: 'hidden',
      }}
      dir={isAr ? 'rtl' : 'ltr'}
    >
      {/* ── Subtle ambient orbs ── */}
      <motion.div
        style={{
          position: 'absolute', width: 700, height: 700,
          top: -200, right: -150,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${C.tealGlow} 0%, transparent 70%)`,
          filter: 'blur(80px)', pointerEvents: 'none',
        }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        style={{
          position: 'absolute', width: 400, height: 400,
          bottom: 100, left: -100,
          borderRadius: '50%',
          background: `radial-gradient(circle, rgba(90,138,150,0.08) 0%, transparent 70%)`,
          filter: 'blur(60px)', pointerEvents: 'none',
        }}
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 8, repeat: Infinity, delay: 2, ease: 'easeInOut' }}
      />

      {/* ── Dot grid texture ── */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `radial-gradient(${C.teal}28 1px, transparent 1px)`,
        backgroundSize: '32px 32px',
        opacity: 0.45,
      }} />

      {/* ── Content ── */}
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 44px', position: 'relative', zIndex: 10 }}>

        {/* ── HEADER ── */}
        <div ref={headerRef} style={{ maxWidth: 760, marginBottom: 68 }}>
          <SectionLabel inView={headerInView}>
            {isAr ? 'الفلتر الكهروستاتيكي' : 'Electrostatic Filter'}
          </SectionLabel>

          {/* Headline — per-word slide up */}
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(34px, 4.2vw, 56px)',
            fontWeight: 900, color: C.dark,
            lineHeight: 1.1, letterSpacing: '-0.02em',
            marginBottom: 20,
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
            style={{ fontSize: 16, lineHeight: 1.8, color: C.muted, maxWidth: 600, fontWeight: 300 }}
          >
            {t('subtitle')}
          </motion.p>
        </div>

        {/* ── 4 INFO CARDS 2×2 ── */}
        <div
          ref={cardsRef}
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, marginBottom: 80 }}
        >
          {cards.map(({ title, items, accent }, i) => (
            <InfoCard
              key={title}
              title={title}
              items={items}
              accent={accent}
              i={i}
              locale={locale}
              inView={cardsInView}
            />
          ))}
        </div>

        {/* ── PATHOGENS SECTION ── */}
        <div ref={pathRef}>
          {/* Pathogens header */}
          <div style={{ marginBottom: 40 }}>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={pathInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}
            >
              {/* Drawing accent line */}
              <motion.div
                style={{ height: 2, background: `linear-gradient(90deg, ${C.teal}, transparent)`, borderRadius: 2, flexShrink: 0 }}
                initial={{ width: 0 }}
                animate={pathInView ? { width: 36 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
              <h3 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(22px, 2.8vw, 34px)',
                fontWeight: 800, color: C.dark,
                letterSpacing: '-0.01em',
              }}>
                {t('pathogensTitle')}
              </h3>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={pathInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 }}
              style={{ fontSize: 14.5, lineHeight: 1.8, color: C.muted, maxWidth: 580, fontWeight: 300 }}
            >
              {isAr
                ? 'الكائنات الدقيقة الضارة التي تم اختبار فعالية أجهزة Jonix ضدها في ظروف موثقة ومعتمدة.'
                : 'Harmful microorganisms against which Jonix devices have been tested under documented, certified conditions.'}
            </motion.p>
          </div>

          {/* Pathogen cards grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 14,
          }}>
            {electrostaticPathogens.map((group, i) => (
              <PathogenCard
                key={group.id}
                group={group}
                i={i}
                locale={locale}
                inView={pathInView}
              />
            ))}
          </div>

          {/* ── Bottom trust strip ── */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={pathInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.55 }}
            style={{
              marginTop: 36,
              padding: '22px 28px',
              background: `linear-gradient(135deg, ${C.tealFaint}, rgba(255,255,255,0.5))`,
              border: `1px solid ${C.teal}25`,
              borderRadius: 20,
              display: 'flex', alignItems: 'center',
              justifyContent: 'space-between',
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
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                🛡
              </motion.div>
              <div>
                <p style={{ fontSize: 13.5, fontWeight: 700, color: C.dark, marginBottom: 2 }}>
                  {isAr ? 'اختبار معتمد بالكامل' : 'Fully Certified Testing'}
                </p>
                <p style={{ fontSize: 12, color: C.muted, fontWeight: 300 }}>
                  {isAr
                    ? 'جميع نتائج اختبار الممرضات موثقة من مختبرات مستقلة'
                    : 'All pathogen test results documented by independent laboratories'}
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
              {['Viruses', 'Bacteria', 'Molds', 'Spores'].map((chip, ci) => (
                <motion.span
                  key={chip}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={pathInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.6 + ci * 0.07 }}
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
      </div>
    </section>
  );
}