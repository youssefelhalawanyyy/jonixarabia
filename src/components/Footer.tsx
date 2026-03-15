'use client';

import { motion, useInView } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import { socialLinks, partnerLogo } from '@/data/catalog';
import MediaImage from '@/components/MediaImage';
import { useRef } from 'react';

/* ─── Brand palette ─── */
const C = {
  teal:       '#8eb2bb',
  tealLight:  '#b8d0d6',
  tealDark:   '#5a8a96',
  tealGlow:   'rgba(142,178,187,0.12)',
  tealFaint:  'rgba(142,178,187,0.06)',
  charcoal:   '#646464',
  navy:       '#06101a',
  navyLight:  '#091522',
  white:      '#ffffff',
  border:     'rgba(255,255,255,0.07)',
  borderHov:  'rgba(142,178,187,0.3)',
  muted:      'rgba(255,255,255,0.32)',
  mutedHov:   'rgba(255,255,255,0.7)',
};

/* ─── Animated teal dot ─── */
function PulseDot({ delay = 0 }: { delay?: number }) {
  return (
    <motion.span
      style={{ width: 5, height: 5, borderRadius: '50%', background: C.teal, display: 'inline-block', flexShrink: 0 }}
      animate={{ scale: [1, 1.5, 1], opacity: [0.4, 1, 0.4] }}
      transition={{ duration: 2.4, repeat: Infinity, delay, ease: 'easeInOut' }}
    />
  );
}

/* ─── Column heading ─── */
function ColHeading({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28 }}>
      <PulseDot />
      <p style={{
        fontSize: 9, fontWeight: 800,
        letterSpacing: '0.3em', textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.25)',
      }}>
        {children}
      </p>
    </div>
  );
}

export default function Footer() {
  const locale = useLocale();
  const t = useTranslations('footer');
  const year = new Date().getFullYear();
  const isAr = locale === 'ar';

  const footerRef = useRef<HTMLElement>(null);
  const inView = useInView(footerRef, { once: true, margin: '-80px' });

  const navLinks = [
    { href: '/' as '/',                  label: isAr ? 'الرئيسية'             : 'Home',                  isRouter: true  },
    { href: '/products' as '/products',  label: isAr ? 'المنتجات'             : 'Products',              isRouter: true  },
    { href: `/${locale}#technology`,     label: isAr ? 'التكنولوجيا'          : 'Technology',            isRouter: false },
    { href: `/${locale}#electrostatic`,  label: isAr ? 'الفلتر الكهروستاتيكي' : 'Electrostatic Filter',  isRouter: false },
    { href: `/${locale}#certifications`, label: isAr ? 'الاعتمادات'           : 'Certifications',        isRouter: false },
    { href: `/${locale}#contact`,        label: isAr ? 'تواصل معنا'           : 'Contact',               isRouter: false },
  ];

  const certChips = ['CE Mark', 'ISO 9001', 'Bio-Safe', 'WHO Aligned'];

  return (
    <footer
      ref={footerRef}
      style={{
        background: `linear-gradient(175deg, #07111c 0%, #06101a 50%, #050e17 100%)`,
        fontFamily: "'DM Sans', sans-serif",
        position: 'relative',
        overflow: 'hidden',
      }}
      dir={isAr ? 'rtl' : 'ltr'}
    >
      {/* ── Ambient glow orbs ── */}
      <motion.div
        style={{
          position: 'absolute', width: 600, height: 600,
          top: -200, right: -100,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${C.tealGlow} 0%, transparent 70%)`,
          filter: 'blur(80px)', pointerEvents: 'none',
        }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        style={{
          position: 'absolute', width: 350, height: 350,
          bottom: 0, left: '30%',
          borderRadius: '50%',
          background: `radial-gradient(circle, rgba(90,138,150,0.07) 0%, transparent 70%)`,
          filter: 'blur(60px)', pointerEvents: 'none',
        }}
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 8, repeat: Infinity, delay: 3, ease: 'easeInOut' }}
      />


      {/* ── TOP ACCENT BAR ── */}
      <div style={{ position: 'relative', height: 3, background: 'rgba(255,255,255,0.04)' }}>
        <motion.div
          style={{
            position: 'absolute', top: 0, left: 0, height: '100%',
            background: `linear-gradient(90deg, ${C.tealDark}, ${C.teal}, ${C.tealLight}, ${C.teal})`,
            backgroundSize: '200% 100%',
          }}
          initial={{ width: 0 }}
          animate={inView ? { width: '100%', backgroundPosition: ['0% 0%', '100% 0%', '0% 0%'] } : {}}
          transition={{ width: { duration: 1.4, ease: 'easeOut' }, backgroundPosition: { duration: 4, repeat: Infinity, ease: 'linear', delay: 1.4 } }}
        />
      </div>

      {/* ── MAIN GRID ── */}
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: 'clamp(40px, 7vw, 72px) clamp(16px, 4vw, 44px) 0', position: 'relative', zIndex: 10 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 'clamp(32px, 5vw, 56px)',
          paddingBottom: 'clamp(32px, 5vw, 56px)',
        }}>

          {/* ══ COL 1 — BRAND ══ */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Logo row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
              <motion.div
                style={{
                  width: 48, height: 48, flexShrink: 0,
                  borderRadius: 14,
                  background: 'rgba(255,255,255,0.95)',
                  border: '1px solid rgba(255,255,255,0.18)',
                  padding: 7,
                  boxShadow: `0 4px 20px rgba(0,0,0,0.4), 0 0 0 1px ${C.teal}22`,
                  overflow: 'hidden',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
                whileHover={{ boxShadow: `0 8px 32px rgba(0,0,0,0.5), 0 0 0 2px ${C.teal}44` }}
              >
                <MediaImage src={partnerLogo} alt="Jonix Arabia" style={{ width: '100%', height: '100%', objectFit: 'contain' }} fallbackLabel="JA" />
              </motion.div>

              <div>
                <p style={{ fontSize: 17, fontWeight: 800, letterSpacing: '0.06em', color: C.white, lineHeight: 1 }}>
                  JONIX ARABIA
                </p>
                <motion.p
                  style={{ marginTop: 5, fontSize: 9, fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase' }}
                  animate={{ color: [C.teal, C.tealLight, C.teal] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                >
                  {isAr ? '✦ حياة نقية' : '✦ Pure Living'}
                </motion.p>
              </div>
            </div>

            {/* Tagline */}
            <p style={{ fontSize: 13.5, lineHeight: 1.85, color: 'rgba(255,255,255,0.35)', maxWidth: 280, fontWeight: 300, marginBottom: 28 }}>
              {t('note')}
            </p>

            {/* Cert chips */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
              {certChips.map((c, i) => (
                <motion.span
                  key={c}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.07 }}
                  style={{
                    padding: '5px 13px',
                    fontSize: 9, fontWeight: 800,
                    letterSpacing: '0.18em', textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.28)',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.09)',
                    borderRadius: 100,
                    transition: 'all 0.2s ease',
                    cursor: 'default',
                  }}
                  whileHover={{
                    color: C.teal,
                    borderColor: `${C.teal}40`,
                    background: `${C.teal}10`,
                  }}
                >
                  {c}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* ══ COL 2 — NAVIGATION ══ */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <ColHeading>{isAr ? 'روابط سريعة' : 'Navigation'}</ColHeading>

            <nav style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {navLinks.map(({ href, label, isRouter }, i) => {
                const linkStyle: React.CSSProperties = {
                  fontSize: 13.5,
                  fontWeight: 500,
                  color: C.muted,
                  textDecoration: 'none',
                  padding: '7px 0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  borderBottom: '1px solid rgba(255,255,255,0.04)',
                  transition: 'color 0.25s ease, gap 0.25s ease',
                };

                const inner = (
                  <>
                    <motion.span
                      style={{ width: 14, height: 1, background: C.teal, display: 'block', flexShrink: 0, transformOrigin: isAr ? 'right' : 'left' }}
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                    />
                    {label}
                  </>
                );

                return isRouter ? (
                  <Link
                    key={href}
                    href={href as '/'}
                    style={linkStyle}
                    onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = C.mutedHov; (e.currentTarget as HTMLAnchorElement).style.gap = '14px'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = C.muted; (e.currentTarget as HTMLAnchorElement).style.gap = '10px'; }}
                  >
                    {inner}
                  </Link>
                ) : (
                  <a
                    key={href}
                    href={href}
                    style={linkStyle}
                    onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = C.mutedHov; (e.currentTarget as HTMLAnchorElement).style.gap = '14px'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = C.muted; (e.currentTarget as HTMLAnchorElement).style.gap = '10px'; }}
                  >
                    {inner}
                  </a>
                );
              })}
            </nav>
          </motion.div>

          {/* ══ COL 3 — SOCIAL + CONTACT ══ */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <ColHeading>{t('socialTitle')}</ColHeading>

            {/* Social pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
              {socialLinks.map((s, i) => (
                <motion.a
                  key={s.id}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  initial={{ opacity: 0, y: 10 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.07 }}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 7,
                    padding: '8px 16px',
                    fontSize: 12, fontWeight: 700,
                    color: 'rgba(255,255,255,0.35)',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.09)',
                    borderRadius: 100,
                    textDecoration: 'none',
                    transition: 'all 0.25s ease',
                  }}
                  whileHover={{
                    color: C.teal,
                    borderColor: `${C.teal}40`,
                    background: `${C.teal}10`,
                    y: -2,
                  }}
                >
                  {s.label}
                </motion.a>
              ))}
            </div>

            {/* Official site link */}
            <motion.a
              href="https://jonixair.com/en"
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                fontSize: 12, fontWeight: 600,
                color: `${C.teal}70`,
                textDecoration: 'none',
                marginBottom: 22,
                transition: 'color 0.2s',
              }}
              whileHover={{ color: C.teal }}
            >
              <motion.span
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              >
                ↗
              </motion.span>
              jonixair.com
            </motion.a>

            {/* Contact card */}
            <motion.div
              style={{
                padding: '20px 20px',
                background: 'rgba(255,255,255,0.03)',
                border: `1px solid rgba(255,255,255,0.07)`,
                borderRadius: 18,
                backdropFilter: 'blur(8px)',
                transition: 'border-color 0.3s, box-shadow 0.3s',
              }}
              whileHover={{
                borderColor: `${C.teal}30`,
                boxShadow: `0 8px 32px rgba(0,0,0,0.25), 0 0 0 1px ${C.teal}15`,
              }}
            >
              <p style={{ fontSize: 8.5, fontWeight: 800, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)', marginBottom: 14 }}>
                {isAr ? 'تواصل معنا' : 'Contact Us'}
              </p>

              {[
                { icon: '✉', val: 'INFO@CLASS-ATRADING.COM' },
                { icon: '✆', val: '+202-234-930-22' },
              ].map(({ icon, val }, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: i === 0 ? 10 : 0 }}>
                  <span style={{ fontSize: 11, color: C.teal, opacity: 0.6, flexShrink: 0 }}>{icon}</span>
                  <p style={{ fontSize: 12.5, fontWeight: 500, color: 'rgba(255,255,255,0.38)', letterSpacing: '0.02em' }}>
                    {val}
                  </p>
                </div>
              ))}
            </motion.div>
          </motion.div>

        </div>

        {/* ── DIVIDER ── */}
        <div style={{ position: 'relative', height: 1 }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.06)' }} />
          <motion.div
            style={{
              position: 'absolute', top: 0, left: 0, height: '100%',
              background: `linear-gradient(90deg, transparent, ${C.teal}40, transparent)`,
            }}
            initial={{ width: 0, left: '50%' }}
            animate={inView ? { width: '100%', left: 0 } : {}}
            transition={{ duration: 1.2, delay: 0.8, ease: 'easeOut' }}
          />
        </div>

        {/* ── BOTTOM BAR ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.9 }}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            flexWrap: 'wrap', gap: 16,
            padding: '22px 0 28px',
          }}
        >
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.18)', fontWeight: 400 }}>
            © {year} Jonix Arabia —{' '}
            <span style={{ color: 'rgba(255,255,255,0.12)' }}>{t('rights')}</span>
          </p>

          {/* Center word mark */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <motion.span
              style={{ height: 1, width: 20, background: C.teal, display: 'block', opacity: 0.35 }}
              animate={{ width: [20, 32, 20], opacity: [0.35, 0.7, 0.35] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />
            <p style={{ fontSize: 8, fontWeight: 800, letterSpacing: '0.38em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.14)' }}>
              {isAr ? 'حياة نقية' : 'Pure Living'}
            </p>
            <motion.span
              style={{ height: 1, width: 20, background: C.teal, display: 'block', opacity: 0.35 }}
              animate={{ width: [20, 32, 20], opacity: [0.35, 0.7, 0.35] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
            />
          </div>

          {/* Powered by */}
          <p style={{ fontSize: 10.5, color: 'rgba(255,255,255,0.14)', fontWeight: 400 }}>
            {isAr ? 'مرخص من Jonix S.r.l. إيطاليا' : 'Licensed from Jonix S.r.l. Italy'}
          </p>
        </motion.div>
      </div>
    </footer>
  );
}