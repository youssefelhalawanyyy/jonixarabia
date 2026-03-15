'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { useLocale } from 'next-intl';
import { Link } from '@/navigation';
import { productLines } from '@/data/catalog';
import { ArrowRightIcon } from '@/components/icons';
import MediaImage from '@/components/MediaImage';

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
};

/* ─── Product card ─── */
function ProductCard({
  line, i, locale, isAr, inView,
}: {
  line: any; i: number; locale: string; isAr: boolean; inView: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const accent = [C.teal, C.tealDark, C.charcoal, C.tealLight][i % 4];

  return (
    <motion.article
      initial={{ opacity: 0, y: 32, scale: 0.96 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        background: C.white,
        border: `1px solid ${hovered ? `${accent}40` : C.border}`,
        borderRadius: 24,
        overflow: 'hidden',
        boxShadow: hovered
          ? `0 20px 56px rgba(90,138,150,0.16), 0 0 0 1px ${accent}22`
          : '0 2px 18px rgba(90,138,150,0.07)',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        transition: 'box-shadow 0.35s ease, border-color 0.35s ease, transform 0.35s ease',
        cursor: 'pointer',
        display: 'flex', flexDirection: 'column',
      }}
    >
      {/* ── Animated top stripe ── */}
      <div style={{ position: 'relative', height: 3, background: C.offWhite, flexShrink: 0 }}>
        <motion.div
          style={{
            position: 'absolute', top: 0, left: 0, height: '100%',
            background: `linear-gradient(90deg, ${accent}, ${accent}66)`,
            borderRadius: 2,
          }}
          initial={{ width: 0 }}
          animate={inView ? { width: '100%' } : {}}
          transition={{ duration: 1.0, delay: 0.3 + i * 0.09, ease: 'easeOut' }}
        />
      </div>

      {/* ── Image ── */}
      <div style={{
        position: 'relative', height: 210, overflow: 'hidden',
        background: C.offWhite, flexShrink: 0,
      }}>
        <MediaImage
          src={line.image}
          alt={isAr ? line.name.ar : line.name.en}
          style={{
            width: '100%', height: '100%', objectFit: 'cover',
            objectPosition: line.imagePosition ?? '50% 50%',
            transform: hovered ? 'scale(1.07)' : 'scale(1)',
            transition: 'transform 0.55s ease',
          }}
          fallbackLabel={isAr ? line.name.ar : line.name.en}
        />

        {/* Gradient overlay — always subtle, stronger on hover */}
        <div style={{
          position: 'absolute', inset: 0,
          background: `linear-gradient(to top, ${C.dark}80 0%, ${C.dark}10 50%, transparent 100%)`,
          opacity: hovered ? 1 : 0.45,
          transition: 'opacity 0.35s ease',
        }} />

        {/* "Explore Line" tag — slides up on hover */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          padding: '14px 16px',
          transform: hovered ? 'translateY(0)' : 'translateY(8px)',
          opacity: hovered ? 1 : 0,
          transition: 'transform 0.3s ease, opacity 0.3s ease',
        }}>
          <p style={{
            fontSize: 9, fontWeight: 800,
            letterSpacing: '0.28em', textTransform: 'uppercase',
            color: C.tealLight,
          }}>
            {isAr ? '← استعرض الخط' : 'Explore Line →'}
          </p>
        </div>

        {/* Accent dot badge */}
        <div style={{
          position: 'absolute', top: 12, right: 12,
          width: 10, height: 10, borderRadius: '50%',
          background: accent,
          boxShadow: `0 0 0 3px rgba(255,255,255,0.6)`,
        }} />
      </div>

      {/* ── Card body ── */}
      <div style={{ padding: '20px 20px 22px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 17, fontWeight: 800,
          color: C.dark, lineHeight: 1.25,
          marginBottom: 8,
        }}>
          {isAr ? line.name.ar : line.name.en}
        </h3>

        <p style={{
          fontSize: 13, lineHeight: 1.7,
          color: C.muted, fontWeight: 300,
          flex: 1, marginBottom: 18,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        } as React.CSSProperties}>
          {isAr ? line.shortDescription.ar : line.shortDescription.en}
        </p>

        {/* Divider */}
        <div style={{ height: 1, background: C.border, marginBottom: 16 }} />

        {/* CTA link */}
        <Link
          href={`/products?line=${line.slug}` as '/products'}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 7,
            fontSize: 12, fontWeight: 800,
            letterSpacing: '0.06em',
            color: hovered ? accent : C.muted,
            textDecoration: 'none',
            transition: 'color 0.25s, gap 0.25s',
          }}
        >
          {isAr ? 'استعرض الخط' : 'Explore Line'}
          <motion.span
            animate={hovered ? { x: [0, 4, 0] } : { x: 0 }}
            transition={{ duration: 0.6, repeat: hovered ? Infinity : 0 }}
          >
            <ArrowRightIcon style={{ width: 14, height: 14 }} />
          </motion.span>
        </Link>
      </div>
    </motion.article>
  );
}

/* ─── Main export ─── */
export default function ProductsSection() {
  const locale = useLocale();
  const isAr   = locale === 'ar';

  const headerRef  = useRef<HTMLDivElement>(null);
  const gridRef    = useRef<HTMLDivElement>(null);
  const ctaRef     = useRef<HTMLDivElement>(null);

  const headerInView = useInView(headerRef, { once: true, margin: '-80px' });
  const gridInView   = useInView(gridRef,   { once: true, margin: '-60px' });
  const ctaInView    = useInView(ctaRef,    { once: true, margin: '-60px' });

  return (
    <section
      id="products"
      style={{
        background: `linear-gradient(160deg, #f8fafb 0%, #f2f6f9 50%, #edf2f5 100%)`,
        padding: '110px 0',
        fontFamily: "'DM Sans', sans-serif",
        position: 'relative',
        overflow: 'hidden',
      }}
      dir={isAr ? 'rtl' : 'ltr'}
    >
      {/* ── Ambient orbs ── */}
      <motion.div
        style={{
          position: 'absolute', width: 650, height: 650,
          top: -180, right: -120, borderRadius: '50%',
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

      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 44px', position: 'relative', zIndex: 10 }}>

        {/* ── HEADER ── */}
        <div ref={headerRef} style={{ maxWidth: 720, marginBottom: 64 }}>
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
              {isAr ? 'المنتجات' : 'Products'}
            </span>
          </motion.div>

          {/* Per-word headline */}
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(34px, 4.2vw, 56px)',
            fontWeight: 900, color: C.dark,
            lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 20,
          }}>
            {(isAr ? 'خطوط منتجاتنا' : 'Our Product Lines').split(' ').map((word: string, wi: number) => (
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
            style={{ fontSize: 16, lineHeight: 1.8, color: C.muted, maxWidth: 560, fontWeight: 300 }}
          >
            {isAr
              ? 'تصفح مجموعتنا الكاملة من أجهزة تنقية الهواء بالبلازما غير الحرارية'
              : 'Browse our complete range of non-thermal plasma air purifiers'}
          </motion.p>
        </div>

        {/* ── PRODUCT CARDS GRID ── */}
        <div
          ref={gridRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 18,
            marginBottom: 52,
          }}
        >
          {productLines.map((line, i) => (
            <ProductCard
              key={line.slug}
              line={line}
              i={i}
              locale={locale}
              isAr={isAr}
              inView={gridInView}
            />
          ))}
        </div>

        {/* ── FULL CATALOG CTA BANNER ── */}
        <div ref={ctaRef}>
          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.97 }}
            animate={ctaInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'relative',
              borderRadius: 28,
              overflow: 'hidden',
              background: `linear-gradient(135deg, #06101a 0%, #0d2040 45%, #1a3f6e 100%)`,
              boxShadow: '0 24px 64px rgba(6,16,26,0.28)',
            }}
          >
            {/* Animated grid overlay */}
            <div style={{
              position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.04,
              backgroundImage: `linear-gradient(rgba(142,178,187,1) 1px, transparent 1px), linear-gradient(90deg, rgba(142,178,187,1) 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
            }} />

            {/* Ambient glow blobs */}
            <motion.div
              style={{
                position: 'absolute', width: 400, height: 400,
                top: -100, right: -50, borderRadius: '50%',
                background: `radial-gradient(circle, ${C.tealGlow} 0%, transparent 70%)`,
                filter: 'blur(60px)', pointerEvents: 'none',
              }}
              animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              style={{
                position: 'absolute', width: 250, height: 250,
                bottom: -60, left: '25%', borderRadius: '50%',
                background: `radial-gradient(circle, rgba(30,90,150,0.18) 0%, transparent 70%)`,
                filter: 'blur(50px)', pointerEvents: 'none',
              }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 6, repeat: Infinity, delay: 2, ease: 'easeInOut' }}
            />

            {/* Top shimmer */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${C.teal}60, transparent)` }} />

            <div style={{
              position: 'relative', zIndex: 10,
              padding: '44px 52px',
              display: 'flex', alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap', gap: 28,
            }}>
              {/* Left content */}
              <div style={{ maxWidth: 520 }}>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={ctaInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.15 }}
                  style={{
                    fontSize: 9, fontWeight: 800,
                    letterSpacing: '0.3em', textTransform: 'uppercase',
                    color: `${C.teal}88`, marginBottom: 12,
                    display: 'flex', alignItems: 'center', gap: 8,
                  }}
                >
                  <motion.span
                    style={{ height: 1, width: 20, background: C.teal, display: 'block', opacity: 0.5 }}
                    animate={{ width: [20, 32, 20] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  {isAr ? 'كتالوج المنتجات' : 'Product Catalog'}
                </motion.p>

                <motion.h3
                  initial={{ opacity: 0, y: 14 }}
                  animate={ctaInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.22 }}
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 'clamp(22px, 2.8vw, 34px)',
                    fontWeight: 900, color: '#fff',
                    lineHeight: 1.2, letterSpacing: '-0.01em',
                    marginBottom: 12,
                  }}
                >
                  {isAr ? 'استعرض كتالوج المنتجات الكامل' : 'Explore the Full Product Catalog'}
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={ctaInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', lineHeight: 1.7, fontWeight: 300 }}
                >
                  {isAr
                    ? 'جميع الموديلات مع المواصفات التقنية الكاملة وإمكانية التحميل'
                    : 'All models with complete technical specifications and downloads'}
                </motion.p>

                {/* Stat chips */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={ctaInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.38 }}
                  style={{ display: 'flex', gap: 8, marginTop: 20, flexWrap: 'wrap' }}
                >
                  {[
                    isAr ? 'NTP مرخص' : 'Licensed NTP',
                    isAr ? 'شهادة CE' : 'CE Certified',
                    isAr ? 'إيطالي الصنع' : 'Made in Italy',
                  ].map((chip, ci) => (
                    <span
                      key={chip}
                      style={{
                        padding: '5px 12px',
                        fontSize: 9.5, fontWeight: 700,
                        letterSpacing: '0.14em', textTransform: 'uppercase',
                        color: C.teal,
                        background: `${C.teal}14`,
                        border: `1px solid ${C.teal}28`,
                        borderRadius: 100,
                      }}
                    >
                      {chip}
                    </span>
                  ))}
                </motion.div>
              </div>

              {/* CTA button */}
              <motion.div
                initial={{ opacity: 0, scale: 0.93 }}
                animate={ctaInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  href={'/products' as '/products'}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 12,
                    padding: '16px 32px',
                    background: C.white,
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: 18,
                    fontSize: 14, fontWeight: 800,
                    color: C.dark,
                    textDecoration: 'none',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                    transition: 'all 0.3s ease',
                    whiteSpace: 'nowrap',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.background = C.offWhite;
                    el.style.boxShadow = '0 16px 48px rgba(0,0,0,0.4)';
                    el.style.transform = 'translateY(-3px)';
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.background = C.white;
                    el.style.boxShadow = '0 8px 32px rgba(0,0,0,0.3)';
                    el.style.transform = 'translateY(0)';
                  }}
                >
                  {isAr ? 'استعرض الكتالوج الكامل' : 'Explore Full Catalog'}
                  <div style={{
                    width: 32, height: 32, borderRadius: 10,
                    background: `${C.tealDark}18`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    <ArrowRightIcon style={{ width: 14, height: 14, color: C.tealDark }} />
                  </div>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}