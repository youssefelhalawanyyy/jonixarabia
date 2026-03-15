'use client';

import { useMemo, useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useLocale } from 'next-intl';
import { Link } from '@/navigation';
import { partnerLogo } from '@/data/catalog';
import MediaImage from '@/components/MediaImage';
import { CloseIcon, MenuIcon } from '@/components/icons';

/* ─── Brand palette ─── */
const C = {
  teal:      '#8eb2bb',
  tealLight: '#b8d0d6',
  tealDark:  '#5a8a96',
  tealGlow:  'rgba(142,178,187,0.18)',
  charcoal:  '#646464',
  navy:      '#0d1a24',
  navyMid:   '#101e28',
  white:     '#ffffff',
  border:    'rgba(255,255,255,0.09)',
  borderHov: 'rgba(142,178,187,0.3)',
  muted:     'rgba(255,255,255,0.45)',
  mutedDim:  'rgba(255,255,255,0.22)',
};

/* ─── Animated active dot for nav item ─── */
function ActiveDot() {
  return (
    <motion.span
      layoutId="nav-active-dot"
      style={{
        position: 'absolute',
        bottom: 4, left: '50%', transform: 'translateX(-50%)',
        width: 4, height: 4, borderRadius: '50%',
        background: C.teal,
        display: 'block',
      }}
      transition={{ type: 'spring', bounce: 0.3, duration: 0.4 }}
    />
  );
}

export default function Header() {
  const locale = useLocale();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>('');
  const [scrolled, setScrolled] = useState(false);
  const isAr = locale === 'ar';

  const { scrollY } = useScroll();
  const headerOpacity = useTransform(scrollY, [0, 60], [0.92, 0.98]);

  /* Track scroll position for header style change */
  useEffect(() => {
    const unsub = scrollY.on('change', (v) => setScrolled(v > 20));
    return unsub;
  }, [scrollY]);

  /* Intersection observer for active section */
  useEffect(() => {
    const ids = ['technology', 'electrostatic', 'certifications', 'applications', 'contact'];
    const observers: IntersectionObserver[] = [];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.35 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const navItems = useMemo(
    () => [
      { label: isAr ? 'التكنولوجيا' : 'Technology',         href: `/${locale}#technology`,      id: 'technology' },
      { label: isAr ? 'الفلتر الكهروستاتيكي' : 'Electrostatic', href: `/${locale}#electrostatic`, id: 'electrostatic' },
      { label: isAr ? 'الاعتمادات' : 'Certifications',      href: `/${locale}#certifications`,  id: 'certifications' },
      { label: isAr ? 'التطبيقات' : 'Applications',         href: `/${locale}#applications`,    id: 'applications' },
      { label: isAr ? 'المنتجات' : 'Products',               href: `/${locale}/products`,        id: 'products' },
      { label: isAr ? 'تواصل معنا' : 'Contact',             href: `/${locale}#contact`,          id: 'contact' },
    ],
    [locale, isAr]
  );

  function changeLocale(tl: 'en' | 'ar') {
    if (tl === locale) return;
    const { pathname, search, hash } = window.location;
    const clean = pathname.replace(/^\/(en|ar)(?=\/|$)/, '') || '/';
    window.location.assign(`/${tl}${clean === '/' ? '' : clean}${search}${hash}`);
  }

  return (
    <>
      {/* ── HEADER ── */}
      <motion.header
        style={{
          position: 'sticky', top: 0, zIndex: 50,
          fontFamily: "'DM Sans', sans-serif",
        }}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      >
        {/* Animated top accent bar */}
        <motion.div
          style={{
            height: 2,
            background: `linear-gradient(90deg, ${C.tealDark}, ${C.teal}, ${C.tealLight}, ${C.teal})`,
            backgroundSize: '200% 100%',
          }}
          animate={{ backgroundPosition: ['0% 0%', '100% 0%', '0% 0%'] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
        />

        {/* Glass bar */}
        <motion.div
          style={{
            background: scrolled
              ? `linear-gradient(135deg, rgba(13,26,36,0.97), rgba(16,30,40,0.95))`
              : `linear-gradient(135deg, rgba(13,26,36,0.88), rgba(16,30,40,0.85))`,
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            borderBottom: `1px solid ${scrolled ? 'rgba(142,178,187,0.14)' : 'rgba(255,255,255,0.06)'}`,
            boxShadow: scrolled ? '0 4px 40px rgba(0,0,0,0.4)' : 'none',
            transition: 'background 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease',
          }}
        >
          <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px' }}>
            <div style={{
              display: 'flex', height: 76,
              alignItems: 'center', justifyContent: 'space-between',
              gap: 24,
            }}>

              {/* ── LOGO ── */}
              <Link href={'/' as '/'} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
                <motion.div
                  style={{
                    position: 'relative',
                    width: 44, height: 44, borderRadius: 14,
                    background: C.white,
                    border: `1px solid rgba(255,255,255,0.2)`,
                    overflow: 'hidden', flexShrink: 0,
                    boxShadow: `0 4px 20px rgba(0,0,0,0.3), 0 0 0 0 ${C.tealGlow}`,
                    padding: 6,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                  whileHover={{
                    boxShadow: `0 4px 24px rgba(0,0,0,0.35), 0 0 0 6px ${C.tealGlow}`,
                    scale: 1.04,
                  }}
                  transition={{ duration: 0.25 }}
                >
                  <MediaImage
                    src={partnerLogo}
                    alt="Jonix Arabia"
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    loading="eager"
                    fallbackLabel="JA"
                  />
                </motion.div>

                <div style={{ lineHeight: 1 }}>
                  <motion.p
                    style={{
                      fontSize: 15, fontWeight: 800,
                      letterSpacing: '0.08em', color: C.white,
                      lineHeight: 1, marginBottom: 4,
                    }}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    JONIX ARABIA
                  </motion.p>
                  <motion.p
                    style={{
                      fontSize: 9, fontWeight: 700,
                      letterSpacing: '0.3em', textTransform: 'uppercase',
                      color: C.teal, lineHeight: 1,
                    }}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                  >
                    {isAr ? 'حياة نقية' : 'Pure Living'}
                  </motion.p>
                </div>
              </Link>

              {/* ── DESKTOP NAV ── */}
              <nav
                style={{ display: 'flex', alignItems: 'center', gap: 2 }}
                dir={isAr ? 'rtl' : 'ltr'}
              >
                {navItems.map((item, i) => {
                  const isActive = activeSection === item.id;
                  const isHovered = hoveredNav === item.href;

                  return (
                    <motion.div
                      key={item.href}
                      style={{ position: 'relative' }}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + i * 0.06, duration: 0.4 }}
                      onHoverStart={() => setHoveredNav(item.href)}
                      onHoverEnd={() => setHoveredNav(null)}
                    >
                      <a
                        href={item.href}
                        style={{
                          position: 'relative',
                          display: 'block',
                          padding: '8px 14px',
                          fontSize: 13, fontWeight: isActive ? 700 : 500,
                          color: isActive ? C.teal : isHovered ? C.white : C.muted,
                          textDecoration: 'none',
                          borderRadius: 12,
                          transition: 'color 0.2s ease',
                          letterSpacing: '0.01em',
                        }}
                      >
                        {/* Hover bg pill */}
                        <AnimatePresence>
                          {isHovered && (
                            <motion.span
                              style={{
                                position: 'absolute', inset: 0,
                                borderRadius: 12,
                                background: 'rgba(255,255,255,0.06)',
                                border: `1px solid ${C.border}`,
                              }}
                              initial={{ opacity: 0, scale: 0.92 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.92 }}
                              transition={{ duration: 0.18 }}
                            />
                          )}
                        </AnimatePresence>

                        {/* Active underline dot */}
                        {isActive && (
                          <motion.span
                            layoutId="nav-active"
                            style={{
                              position: 'absolute', bottom: 2, left: '50%',
                              transform: 'translateX(-50%)',
                              width: 4, height: 4, borderRadius: '50%',
                              background: C.teal, display: 'block',
                            }}
                            transition={{ type: 'spring', bounce: 0.3, duration: 0.4 }}
                          />
                        )}

                        <span style={{ position: 'relative', zIndex: 1 }}>{item.label}</span>
                      </a>
                    </motion.div>
                  );
                })}
              </nav>

              {/* ── RIGHT CONTROLS ── */}
              <motion.div
                style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                {/* Language toggle */}
                <div style={{
                  display: 'flex',
                  background: 'rgba(255,255,255,0.05)',
                  border: `1px solid ${C.border}`,
                  borderRadius: 12, padding: 3, gap: 2,
                }}>
                  {(['en', 'ar'] as const).map((l) => (
                    <motion.button
                      key={l}
                      type="button"
                      onClick={() => changeLocale(l)}
                      style={{
                        padding: '5px 13px',
                        borderRadius: 9,
                        fontSize: 10.5, fontWeight: 800,
                        letterSpacing: '0.12em', textTransform: 'uppercase',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'color 0.2s ease',
                        background: locale === l
                          ? `linear-gradient(135deg, ${C.tealDark}, ${C.teal})`
                          : 'transparent',
                        color: locale === l ? C.white : C.mutedDim,
                        boxShadow: locale === l ? `0 2px 10px ${C.tealGlow}` : 'none',
                      }}
                      whileHover={locale !== l ? { color: C.white } : {}}
                      whileTap={{ scale: 0.95 }}
                    >
                      {l.toUpperCase()}
                    </motion.button>
                  ))}
                </div>

                {/* CTA button */}
                <motion.a
                  href={`/${locale}#contact`}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    padding: '9px 20px',
                    fontSize: 12.5, fontWeight: 700,
                    letterSpacing: '0.04em',
                    color: C.white,
                    background: `linear-gradient(135deg, ${C.tealDark}, ${C.teal})`,
                    border: `1px solid ${C.teal}50`,
                    borderRadius: 12,
                    textDecoration: 'none',
                    boxShadow: `0 0 20px ${C.tealGlow}, inset 0 1px 0 rgba(255,255,255,0.1)`,
                    transition: 'box-shadow 0.3s ease, transform 0.2s ease',
                    whiteSpace: 'nowrap',
                  }}
                  whileHover={{
                    boxShadow: `0 0 40px ${C.tealGlow}, inset 0 1px 0 rgba(255,255,255,0.15)`,
                    scale: 1.03,
                  }}
                  whileTap={{ scale: 0.97 }}
                >
                  <motion.span
                    style={{ width: 5, height: 5, borderRadius: '50%', background: 'rgba(255,255,255,0.8)', display: 'block' }}
                    animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  {isAr ? 'طلب استشارة' : 'Get Consultation'}
                </motion.a>

                {/* Mobile hamburger */}
                <motion.button
                  type="button"
                  onClick={() => setMobileOpen((v) => !v)}
                  aria-label="Toggle menu"
                  style={{
                    display: 'none', // shown via @media in the wrapping div below
                    width: 40, height: 40,
                    alignItems: 'center', justifyContent: 'center',
                    borderRadius: 12,
                    background: 'rgba(255,255,255,0.05)',
                    border: `1px solid ${C.border}`,
                    color: C.muted,
                    cursor: 'pointer',
                  }}
                  whileHover={{ background: 'rgba(255,255,255,0.09)', color: C.white }}
                  whileTap={{ scale: 0.93 }}
                  className="lg:hidden !flex"
                >
                  <AnimatePresence mode="wait">
                    {mobileOpen ? (
                      <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                        <CloseIcon style={{ width: 18, height: 18 }} />
                      </motion.span>
                    ) : (
                      <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                        <MenuIcon style={{ width: 18, height: 18 }} />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* ── MOBILE DRAWER ── */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 0.1, 0.22, 1] }}
              style={{
                overflow: 'hidden',
                background: `linear-gradient(160deg, rgba(13,26,36,0.98), rgba(16,30,40,0.97))`,
                backdropFilter: 'blur(24px)',
                borderBottom: `1px solid ${C.border}`,
                boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
              }}
            >
              <div style={{ maxWidth: 1280, margin: '0 auto', padding: '16px 24px 24px' }} dir={isAr ? 'rtl' : 'ltr'}>

                {/* Nav items */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2, marginBottom: 20 }}>
                  {navItems.map((item, i) => {
                    const isActive = activeSection === item.id;
                    return (
                      <motion.a
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        initial={{ opacity: 0, x: isAr ? 16 : -16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05, duration: 0.3 }}
                        style={{
                          display: 'flex', alignItems: 'center', gap: 12,
                          padding: '12px 14px',
                          fontSize: 14.5, fontWeight: isActive ? 700 : 500,
                          color: isActive ? C.teal : C.muted,
                          textDecoration: 'none',
                          borderRadius: 14,
                          background: isActive ? `${C.tealGlow}` : 'transparent',
                          border: isActive ? `1px solid ${C.teal}25` : '1px solid transparent',
                          transition: 'all 0.2s ease',
                        }}
                        whileHover={{ background: 'rgba(255,255,255,0.05)', color: C.white }}
                      >
                        {isActive && (
                          <span style={{ width: 5, height: 5, borderRadius: '50%', background: C.teal, display: 'block', flexShrink: 0 }} />
                        )}
                        {item.label}
                      </motion.a>
                    );
                  })}
                </div>

                {/* Mobile bottom row */}
                <div style={{ display: 'flex', gap: 10, paddingTop: 16, borderTop: `1px solid ${C.border}` }}>
                  {/* Language */}
                  <div style={{
                    flex: 1, display: 'flex',
                    background: 'rgba(255,255,255,0.05)',
                    border: `1px solid ${C.border}`,
                    borderRadius: 12, padding: 4, gap: 4,
                  }}>
                    {(['en', 'ar'] as const).map((l) => (
                      <button
                        key={l}
                        type="button"
                        onClick={() => changeLocale(l)}
                        style={{
                          flex: 1, padding: '8px 0',
                          borderRadius: 9,
                          fontSize: 11, fontWeight: 800,
                          letterSpacing: '0.1em', textTransform: 'uppercase',
                          border: 'none', cursor: 'pointer',
                          background: locale === l ? `linear-gradient(135deg, ${C.tealDark}, ${C.teal})` : 'transparent',
                          color: locale === l ? C.white : C.mutedDim,
                          boxShadow: locale === l ? `0 2px 8px ${C.tealGlow}` : 'none',
                          transition: 'all 0.2s',
                        }}
                      >
                        {l.toUpperCase()}
                      </button>
                    ))}
                  </div>

                  {/* CTA */}
                  <motion.a
                    href={`/${locale}#contact`}
                    onClick={() => setMobileOpen(false)}
                    style={{
                      flex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                      padding: '10px 20px',
                      fontSize: 13, fontWeight: 700,
                      color: C.white, textDecoration: 'none',
                      background: `linear-gradient(135deg, ${C.tealDark}, ${C.teal})`,
                      border: `1px solid ${C.teal}50`,
                      borderRadius: 12,
                      boxShadow: `0 4px 20px ${C.tealGlow}`,
                    }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {isAr ? 'طلب استشارة' : 'Get Consultation'}
                  </motion.a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}