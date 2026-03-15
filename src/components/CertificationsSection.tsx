'use client';

import { motion, useInView } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { certifications, standardsReferences } from '@/data/catalog';
import { ShieldIcon } from '@/components/icons';
import MediaImage from '@/components/MediaImage';
import { useRef } from 'react';

/* ─── Brand palette ─── */
const C = {
  teal:       '#8eb2bb',
  tealLight:  '#b8d0d6',
  tealDark:   '#5a8a96',
  tealGlow:   'rgba(142,178,187,0.15)',
  tealFaint:  'rgba(142,178,187,0.06)',
  charcoal:   '#646464',
  light:      '#dddddd',
  dark:       '#1c2329',
  navy:       '#101820',
  offWhite:   '#f4f6f8',
  white:      '#ffffff',
  muted:      'rgba(255,255,255,0.45)',
  mutedDark:  'rgba(255,255,255,0.22)',
  border:     'rgba(255,255,255,0.09)',
  borderHov:  'rgba(142,178,187,0.35)',
};

/* ─── Animated shield badge ─── */
function ShieldBadge({ size = 48 }: { size?: number }) {
  return (
    <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
      <motion.div
        style={{
          position: 'absolute', inset: 0,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${C.tealGlow}, transparent 70%)`,
        }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div style={{
        position: 'absolute', inset: 6,
        borderRadius: '50%',
        background: `linear-gradient(135deg, ${C.teal}22, ${C.tealDark}22)`,
        border: `1px solid ${C.teal}40`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <ShieldIcon style={{ width: size * 0.35, height: size * 0.35, color: C.teal }} />
      </div>
    </div>
  );
}

/* ─── Floating certification card ─── */
function CertCard({ item, i, isAr }: { item: any; i: number; isAr: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const accentColors = [C.teal, C.tealDark, C.tealLight, C.charcoal, C.teal, C.tealDark];
  const accent = accentColors[i % accentColors.length];

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 32, scale: 0.97 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'relative',
        background: 'rgba(255,255,255,0.04)',
        border: `1px solid ${C.border}`,
        borderRadius: 22,
        overflow: 'hidden',
        backdropFilter: 'blur(12px)',
        cursor: 'default',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease',
      }}
      whileHover={{
        borderColor: C.borderHov,
        boxShadow: `0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px ${C.teal}22`,
        y: -4,
      }}
    >
      {/* Accent top stripe — animated width */}
      <div style={{ position: 'relative', height: 3, background: 'rgba(255,255,255,0.05)' }}>
        <motion.div
          style={{ position: 'absolute', top: 0, left: 0, height: '100%', background: `linear-gradient(90deg, ${accent}, ${C.tealLight})`, borderRadius: 2 }}
          initial={{ width: 0 }}
          animate={inView ? { width: '100%' } : {}}
          transition={{ duration: 1.1, delay: 0.3 + i * 0.07, ease: 'easeOut' }}
        />
      </div>

      <div style={{ padding: '22px 22px 20px' }}>
        {/* Logo + name */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 16 }}>
          <div style={{
            width: 60, height: 60, flexShrink: 0,
            borderRadius: 16, overflow: 'hidden',
            background: C.white,
            border: `1px solid rgba(255,255,255,0.15)`,
            padding: 8,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
          }}>
            <MediaImage
              src={item.logo}
              alt={isAr ? item.name.ar : item.name.en}
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              fallbackLabel={isAr ? item.name.ar : item.name.en}
            />
          </div>

          <div style={{ flex: 1, paddingTop: 2 }}>
            <h3 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 16, fontWeight: 800,
              color: C.white, lineHeight: 1.25,
              marginBottom: 8,
            }}>
              {isAr ? item.name.ar : item.name.en}
            </h3>

            {/* Official badge */}
            <motion.span
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 5,
                padding: '3px 10px',
                background: `${C.teal}18`,
                border: `1px solid ${C.teal}35`,
                borderRadius: 100,
                fontSize: 9, fontWeight: 800,
                letterSpacing: '0.18em', textTransform: 'uppercase',
                color: C.teal,
              }}
              whileHover={{ background: `${C.teal}28` }}
            >
              <ShieldIcon style={{ width: 10, height: 10 }} />
              {isAr ? 'رسمي ✓' : 'Official ✓'}
            </motion.span>
          </div>
        </div>

        {/* Summary */}
        <p style={{
          fontSize: 13, lineHeight: 1.75,
          color: 'rgba(255,255,255,0.55)',
          fontWeight: 300, marginBottom: 18,
        }}>
          {isAr ? item.summary.ar : item.summary.en}
        </p>

        {/* Footer */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          paddingTop: 14,
          borderTop: `1px solid rgba(255,255,255,0.07)`,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
            <motion.span
              style={{ width: 6, height: 6, borderRadius: '50%', background: C.teal, display: 'block' }}
              animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.3 }}
            />
            <span style={{
              fontSize: 9, fontWeight: 700,
              letterSpacing: '0.18em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.3)',
            }}>
              {isAr ? 'معتمد ومختبر' : 'Tested & Certified'}
            </span>
          </div>
          <a
            href={item.officialPage}
            target="_blank"
            rel="noreferrer"
            style={{
              fontSize: 11, fontWeight: 600,
              color: 'rgba(255,255,255,0.3)',
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = C.teal)}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.3)')}
          >
            jonixair.com ↗
          </a>
        </div>
      </div>
    </motion.article>
  );
}

/* ─── Standards card ─── */
function StandardCard({ item, i, isAr }: { item: any; i: number; isAr: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
      style={{
        display: 'flex', alignItems: 'flex-start', gap: 14,
        padding: '18px 18px',
        background: 'rgba(255,255,255,0.035)',
        border: `1px solid ${C.border}`,
        borderRadius: 18,
        backdropFilter: 'blur(8px)',
        cursor: 'default',
        transition: 'border-color 0.3s, box-shadow 0.3s, transform 0.3s',
      }}
      whileHover={{
        borderColor: C.borderHov,
        boxShadow: `0 12px 40px rgba(0,0,0,0.3), 0 0 0 1px ${C.teal}18`,
        y: -3,
      }}
    >
      {/* Logo */}
      <div style={{
        width: 48, height: 48, flexShrink: 0,
        borderRadius: 12,
        background: C.white,
        border: '1px solid rgba(255,255,255,0.12)',
        padding: 6,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 3px 12px rgba(0,0,0,0.2)',
      }}>
        <MediaImage
          src={item.logo}
          alt={isAr ? item.name.ar : item.name.en}
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          fallbackLabel={isAr ? item.name.ar : item.name.en}
        />
      </div>

      <div>
        {/* Animated accent line */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5 }}>
          <motion.div
            style={{ height: 2, background: `linear-gradient(90deg, ${C.teal}, transparent)`, borderRadius: 2 }}
            initial={{ width: 0 }}
            animate={inView ? { width: 24 } : {}}
            transition={{ duration: 0.7, delay: 0.3 + i * 0.08 }}
          />
          <h4 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 14.5, fontWeight: 800,
            color: C.white,
          }}>
            {isAr ? item.name.ar : item.name.en}
          </h4>
        </div>
        <p style={{ fontSize: 12.5, lineHeight: 1.65, color: 'rgba(255,255,255,0.45)', fontWeight: 300 }}>
          {isAr ? item.summary.ar : item.summary.en}
        </p>
      </div>
    </motion.article>
  );
}

/* ─── Decorative trust counter ─── */
function TrustStat({ value, label, delay = 0, inView }: { value: string; label: string; delay?: number; inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay }}
      style={{ textAlign: 'center' }}
    >
      <p style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: 'clamp(28px, 3vw, 40px)',
        fontWeight: 900, color: C.white,
        lineHeight: 1, letterSpacing: '-0.02em',
      }}>
        {value}
      </p>
      <p style={{
        marginTop: 6,
        fontSize: 9, fontWeight: 700,
        letterSpacing: '0.22em', textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.28)',
      }}>
        {label}
      </p>
    </motion.div>
  );
}

/* ─── Main export ─── */
export default function CertificationsSection() {
  const t = useTranslations('certifications');
  const locale = useLocale();
  const isAr = locale === 'ar';

  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' });

  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: '-60px' });

  const standardsRef = useRef<HTMLDivElement>(null);
  const standardsInView = useInView(standardsRef, { once: true, margin: '-60px' });

  return (
    <section
      id="certifications"
      style={{
        position: 'relative',
        background: `linear-gradient(160deg, #0d1a24 0%, #101e28 40%, #0e1c26 70%, #0b1820 100%)`,
        padding: '110px 0',
        fontFamily: "'DM Sans', sans-serif",
        overflow: 'hidden',
      }}
      dir={isAr ? 'rtl' : 'ltr'}
    >
      {/* ── Background ambient orbs ── */}
      <motion.div
        style={{
          position: 'absolute', width: 700, height: 700,
          top: -200, right: -150,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${C.tealGlow} 0%, transparent 70%)`,
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        style={{
          position: 'absolute', width: 400, height: 400,
          bottom: -100, left: -80,
          borderRadius: '50%',
          background: `radial-gradient(circle, rgba(90,138,150,0.1) 0%, transparent 70%)`,
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      {/* ── Grid texture ── */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `linear-gradient(rgba(142,178,187,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(142,178,187,0.025) 1px, transparent 1px)`,
        backgroundSize: '56px 56px',
      }} />

      {/* ── Content ── */}
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 44px', position: 'relative', zIndex: 10 }}>

        {/* ── HEADER ── */}
        <div ref={headerRef} style={{ maxWidth: 720, marginBottom: 72 }}>
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              padding: '6px 16px',
              background: `${C.teal}14`,
              border: `1px solid ${C.teal}30`,
              borderRadius: 100, marginBottom: 20,
            }}
          >
            <motion.span
              style={{ width: 6, height: 6, borderRadius: '50%', background: C.teal, display: 'block' }}
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2.2, repeat: Infinity }}
            />
            <span style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase', color: C.tealLight }}>
              {isAr ? 'الاعتمادات والشهادات' : 'Certifications & Standards'}
            </span>
          </motion.div>

          {/* Headline — per-word slide up */}
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(36px, 4.5vw, 58px)',
            fontWeight: 900,
            color: C.white,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            overflow: 'hidden',
            marginBottom: 20,
          }}>
            {(() => {
              const words = t('title').split(' ');
              return words.map((word, wi) => (
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
              ));
            })()}
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.4 }}
            style={{ fontSize: 16, lineHeight: 1.8, color: 'rgba(255,255,255,0.45)', fontWeight: 300, maxWidth: 580 }}
          >
            {t('subtitle')}
          </motion.p>
        </div>

        {/* ── TRUST STATS BAR ── */}
        <div
          ref={statsRef}
          style={{
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 0,
            padding: '32px 0',
            marginBottom: 60,
            borderTop: '1px solid rgba(255,255,255,0.07)',
            borderBottom: '1px solid rgba(255,255,255,0.07)',
          }}
        >
          {[
            { value: '10+',  label: isAr ? 'سنوات من الاعتماد' : 'Years Certified' },
            { value: '6',    label: isAr ? 'شهادات دولية' : 'Global Certifications' },
            { value: '99.9999%', label: isAr ? 'كفاءة التعطيل' : 'Inactivation Rate' },
            { value: 'WHO',  label: isAr ? 'متوافق مع منظمة الصحة العالمية' : 'WHO Aligned' },
          ].map((s, i) => (
            <div
              key={i}
              style={{
                paddingRight: i < 3 ? 28 : 0,
                paddingLeft: i > 0 ? 28 : 0,
                borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.06)' : 'none',
              }}
            >
              <TrustStat value={s.value} label={s.label} delay={0.1 + i * 0.1} inView={statsInView} />
            </div>
          ))}
        </div>

        {/* ── CERTIFICATION CARDS ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: 18,
          marginBottom: 72,
        }}>
          {certifications.map((item, i) => (
            <CertCard key={item.id} item={item} i={i} isAr={isAr} />
          ))}
        </div>

        {/* ── STANDARDS SECTION ── */}
        <div ref={standardsRef}>
          {/* Standards header */}
          <div style={{ marginBottom: 36 }}>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={standardsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}
            >
              {/* Decorative line */}
              <motion.div
                style={{ height: 2, background: `linear-gradient(90deg, ${C.teal}, transparent)`, borderRadius: 2 }}
                initial={{ width: 0 }}
                animate={standardsInView ? { width: 40 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
              <h3 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(22px, 2.8vw, 32px)',
                fontWeight: 800, color: C.white,
                letterSpacing: '-0.01em',
              }}>
                {t('standardsTitle')}
              </h3>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={standardsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 }}
              style={{ fontSize: 14.5, lineHeight: 1.8, color: 'rgba(255,255,255,0.4)', maxWidth: 580, fontWeight: 300 }}
            >
              {t('standardsSubtitle')}
            </motion.p>
          </div>

          {/* Standards grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: 14,
          }}>
            {standardsReferences.map((item, i) => (
              <StandardCard key={item.id} item={item} i={i} isAr={isAr} />
            ))}
          </div>
        </div>

        {/* ── BOTTOM TRUST STRIP ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6 }}
          style={{
            marginTop: 72,
            padding: '28px 32px',
            background: `linear-gradient(135deg, ${C.tealFaint}, rgba(255,255,255,0.02))`,
            border: `1px solid ${C.teal}22`,
            borderRadius: 24,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            flexWrap: 'wrap', gap: 20,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <ShieldBadge size={52} />
            <div>
              <p style={{ fontSize: 15, fontWeight: 700, color: C.white, marginBottom: 3 }}>
                {isAr ? 'معتمد على المستوى الدولي' : 'Internationally Verified'}
              </p>
              <p style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.4)', fontWeight: 300 }}>
                {isAr
                  ? 'جميع الشهادات صادرة عن هيئات اعتماد مستقلة'
                  : 'All certifications issued by independent accreditation bodies'}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {['CE Mark', 'ISO Certified', 'Bio-Safe', 'WHO Aligned', 'MENA Ready'].map((chip, i) => (
              <motion.span
                key={chip}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.07 }}
                style={{
                  padding: '5px 13px',
                  fontSize: 9.5, fontWeight: 700,
                  letterSpacing: '0.16em', textTransform: 'uppercase',
                  color: C.teal,
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