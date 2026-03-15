'use client';

import { motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import heroImg from '@/app/jnj.jpg';
import { partnerLogo } from '@/data/catalog';
import MediaImage from '@/components/MediaImage';
import BlurText from '@/components/BlurText';
import LiquidEther from '@/components/LiquidEther';
import { useEffect, useRef } from 'react';

const STATS = [
  { value: '99.9999%', en: 'SARS-CoV-2 Inactivation',    ar: 'تعطيل فيروس كورونا' },
  { value: '99.99%',   en: 'Certified Pollutant Removal', ar: 'إزالة الملوثات المعتمدة' },
  { value: '10+',      en: 'Years of Innovation',          ar: 'سنوات من الابتكار' },
];

const CERT_CHIPS = ['CE Mark', 'ISO Certified', 'Bio-Safe', 'WHO Aligned'];

const CARD_SPECS = [
  { en: '6-log virus reduction in independent lab testing', ar: 'تقليل الفيروسات بمعدل 6 أضعاف في مختبرات مستقلة' },
  { en: 'Continuous air & surface decontamination', ar: 'تطهير مستمر للهواء والأسطح' },
  { en: 'Licensed from Jonix S.r.l. · Vicenza, Italy', ar: 'مرخص من Jonix S.r.l. · فيتشنتسا، إيطاليا' },
];

const HEADLINE_LINES = [
  { en: 'Breathe',           ar: 'تنفّس' },
  { en: 'Purified Air.',     ar: 'هواء نقي.' },
  { en: 'Live Protected.',   ar: 'عِش في أمان.' },
];

/* ── Floating particle component ── */
function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    let raf: number;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles = Array.from({ length: 36 }, () => ({
      x: Math.random() * canvas.width,
      y: canvas.height + Math.random() * 200,
      size: Math.random() < 0.3 ? 2.5 : 1.5,
      speed: 0.35 + Math.random() * 0.55,
      drift: (Math.random() - 0.5) * 0.3,
      alpha: 0.2 + Math.random() * 0.5,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,210,255,${p.alpha})`;
        ctx.fill();
        p.y  -= p.speed;
        p.x  += p.drift;
        p.alpha = 0.2 + 0.4 * Math.sin((canvas.height - p.y) / canvas.height * Math.PI);
        if (p.y < -10) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
        }
      });
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 2 }}
    />
  );
}

/* ── Scanline component ── */
function Scanline() {
  return (
    <motion.div
      className="absolute left-0 right-0 h-px pointer-events-none"
      style={{
        background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.35), transparent)',
        zIndex: 3,
      }}
      animate={{ top: ['-2px', '100%'] }}
      transition={{ duration: 5, repeat: Infinity, ease: 'linear', repeatDelay: 1 }}
    />
  );
}

export default function HeroSection() {
  const t = useTranslations('hero');
  const locale = useLocale();
  const isAr = locale === 'ar';

  return (
    <section
      className="relative flex flex-col overflow-hidden"
      style={{
        minHeight: '100svh',
        background: 'linear-gradient(135deg, #010a14 0%, #020f20 40%, #031529 70%, #051c35 100%)',
        fontFamily: "'DM Sans', sans-serif",
      }}
      dir={isAr ? 'rtl' : 'ltr'}
    >

      {/* ── Ambient orbs ── */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 600, height: 600,
          top: -200, right: -100,
          background: 'radial-gradient(circle, rgba(0,120,200,0.18) 0%, rgba(0,60,120,0.08) 60%, transparent 80%)',
          filter: 'blur(80px)',
        }}
        animate={{ scale: [1, 1.15, 1], x: [0, 10, 0], y: [0, -10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 400, height: 400,
          bottom: -100, left: -80,
          background: 'radial-gradient(circle, rgba(0,196,239,0.12) 0%, rgba(0,80,160,0.06) 60%, transparent 80%)',
          filter: 'blur(80px)',
        }}
        animate={{ scale: [1, 1.2, 1], x: [0, -8, 0], y: [0, 12, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
      />
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 300, height: 300,
          top: '40%', left: '30%',
          background: 'radial-gradient(circle, rgba(0,150,255,0.07) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
      />

      {/* ── Grid texture ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,160,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,160,255,0.03) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          zIndex: 1,
        }}
      />

      {/* ── Scanline ── */}
      <Scanline />

      {/* ── Particles ── */}
      <Particles />

      {/* ── LiquidEther (keep existing) ── */}
      <div className="absolute inset-0 pointer-events-none" style={{ mixBlendMode: 'screen', opacity: 0.2, zIndex: 4 }}>
        <LiquidEther
          colors={['#1e5a96', '#2d7bb8', '#00c4ef']}
          color0="#1e5a96"
          color1="#2d7bb8"
          color2="#00c4ef"
          mouseForce={20}
          cursorSize={100}
          iterationsPoisson={20}
          resolution={0.35}
          autoDemo={true}
          autoSpeed={0.3}
          autoIntensity={1.8}
          autoResumeDelay={2500}
        />
      </div>

      {/* ── Main content ── */}
      <div className="relative flex flex-1 items-center" style={{ zIndex: 10 }}>
        <div className="w-full py-24 lg:py-32" style={{ maxWidth: 1280, margin: '0 auto', padding: '80px 48px 40px' }}>
          <div className="grid items-center" style={{ gap: 60, gridTemplateColumns: '1.15fr 0.85fr' }}>

            {/* ════ LEFT ════ */}
            <div className="flex flex-col">

              {/* Eyebrow badge */}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.1 }}
                className="mb-7"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 10,
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: 'rgba(255,255,255,0.045)',
                  backdropFilter: 'blur(12px)',
                  borderRadius: 100, padding: '8px 18px',
                  width: 'fit-content',
                }}
              >
                <motion.span
                  animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5], boxShadow: ['0 0 0 0 rgba(0,212,255,0.4)', '0 0 0 6px rgba(0,212,255,0)', '0 0 0 0 rgba(0,212,255,0)'] }}
                  transition={{ duration: 2.2, repeat: Infinity }}
                  style={{ width: 7, height: 7, borderRadius: '50%', background: '#00d4ff', flexShrink: 0, display: 'block' }}
                />
                <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)' }}>
                  JONIX ARABIA — {isAr ? 'مصر والشرق الأوسط' : 'Egypt & Middle East'}
                </span>
              </motion.div>

              {/* Headline with per-line slide-up reveal */}
              <h1
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 'clamp(44px, 5.5vw, 72px)',
                  fontWeight: 900,
                  lineHeight: 1.05,
                  color: '#fff',
                  letterSpacing: '-0.01em',
                }}
              >
                {HEADLINE_LINES.map((line, i) => (
                  <span key={i} style={{ display: 'block', overflow: 'hidden' }}>
                    <motion.span
                      style={{ display: 'block' }}
                      initial={{ y: '110%' }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 + i * 0.15 }}
                    >
                      {i === 1
                        ? <>
                            {isAr ? 'هواء ' : 'Purified '}
                            <span style={{ color: '#00d4ff' }}>{isAr ? 'نقي.' : 'Air.'}</span>
                          </>
                        : (isAr ? line.ar : line.en)
                      }
                    </motion.span>
                  </span>
                ))}
              </h1>

              {/* Tagline */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.55 }}
                style={{ marginTop: 12, fontSize: 11, fontWeight: 600, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(0,212,255,0.6)' }}
              >
                ✦ {isAr ? 'حياة نقية — لأن الهواء يهم' : 'Pure Living — Because Air Matters'}
              </motion.p>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                style={{ marginTop: 24, maxWidth: 500, fontSize: 15.5, lineHeight: 1.85, color: 'rgba(255,255,255,0.5)', fontWeight: 300 }}
              >
                {t('subtitle')}
              </motion.p>

              {/* CTA buttons */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="flex flex-wrap"
                style={{ gap: 12, marginTop: 36 }}
              >
                <a
                  href={`/${locale}#contact`}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    padding: '14px 28px',
                    fontSize: 13, fontWeight: 600, letterSpacing: '0.05em',
                    color: '#fff',
                    background: 'linear-gradient(135deg, #0b6fca, #0a4fa0)',
                    border: '1px solid rgba(0,150,255,0.4)',
                    borderRadius: 100,
                    textDecoration: 'none',
                    boxShadow: '0 0 30px rgba(0,100,200,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 0 50px rgba(0,120,255,0.5), inset 0 1px 0 rgba(255,255,255,0.15)';
                    (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 0 30px rgba(0,100,200,0.3), inset 0 1px 0 rgba(255,255,255,0.1)';
                    (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)';
                  }}
                >
                  {isAr ? 'طلب استشارة' : 'Request Consultation'}
                </a>

                <a
                  href={`/${locale}/products`}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    padding: '14px 28px',
                    fontSize: 13, fontWeight: 500,
                    color: 'rgba(255,255,255,0.7)',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: 100,
                    textDecoration: 'none',
                    backdropFilter: 'blur(8px)',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.color = '#fff';
                    el.style.background = 'rgba(255,255,255,0.08)';
                    el.style.borderColor = 'rgba(255,255,255,0.25)';
                    el.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.color = 'rgba(255,255,255,0.7)';
                    el.style.background = 'rgba(255,255,255,0.04)';
                    el.style.borderColor = 'rgba(255,255,255,0.12)';
                    el.style.transform = 'translateY(0)';
                  }}
                >
                  {isAr ? 'استعرض المنتجات ←' : 'Explore Products →'}
                </a>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.05, duration: 0.7 }}
                style={{
                  marginTop: 48, paddingTop: 36,
                  borderTop: '1px solid rgba(255,255,255,0.08)',
                  display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
                }}
              >
                {STATS.map((s, i) => (
                  <motion.div
                    key={s.value}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.15 + i * 0.1 }}
                    style={{
                      paddingRight: i < 2 ? 28 : 0,
                      paddingLeft: i > 0 ? 28 : 0,
                      borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.07)' : 'none',
                    }}
                  >
                    <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(26px, 2.8vw, 36px)', fontWeight: 700, color: '#fff', lineHeight: 1, letterSpacing: '-0.01em' }}>
                      {s.value}
                    </p>
                    <p style={{ marginTop: 6, fontSize: 9.5, fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', lineHeight: 1.5 }}>
                      {isAr ? s.ar : s.en}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* ════ RIGHT CARD ════ */}
            <motion.div
              initial={{ opacity: 0, x: isAr ? -32 : 32, scale: 0.96 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ delay: 0.28, duration: 0.85, ease: [0.22, 0.1, 0.22, 1] }}
              style={{ position: 'relative' }}
            >
              {/* Ambient glow */}
              <div style={{
                position: 'absolute', inset: -30,
                background: 'radial-gradient(ellipse at center, rgba(0,130,220,0.18) 0%, rgba(0,60,140,0.08) 50%, transparent 80%)',
                borderRadius: '50%', filter: 'blur(20px)', pointerEvents: 'none',
              }} />

              {/* Glass card */}
              <div style={{
                position: 'relative',
                background: 'rgba(255,255,255,0.038)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 28, overflow: 'hidden',
                backdropFilter: 'blur(24px)',
                boxShadow: '0 40px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)',
              }}>
                {/* Top shimmer */}
                <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)' }} />

                <div style={{ padding: 28, position: 'relative' }}>

                  {/* LIVE badge */}
                  <motion.div
                    style={{
                      position: 'absolute', top: 20, right: isAr ? 'auto' : 20, left: isAr ? 20 : 'auto',
                      display: 'inline-flex', alignItems: 'center', gap: 6,
                      padding: '5px 12px',
                      background: 'rgba(0,212,255,0.1)',
                      border: '1px solid rgba(0,212,255,0.2)',
                      borderRadius: 100,
                      fontSize: 9, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase',
                      color: '#00d4ff',
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                  >
                    <motion.span
                      style={{ width: 5, height: 5, borderRadius: '50%', background: '#00d4ff', display: 'block' }}
                      animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.6, repeat: Infinity }}
                    />
                    Active
                  </motion.div>

                  {/* Brand row */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <div style={{
                      width: 52, height: 52,
                      background: 'rgba(255,255,255,0.93)',
                      borderRadius: 14, overflow: 'hidden',
                      border: '1px solid rgba(255,255,255,0.2)',
                      boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
                      flexShrink: 0, padding: 6,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <MediaImage src={partnerLogo} alt="Jonix Arabia" style={{ width: '100%', height: '100%', objectFit: 'contain' }} loading="eager" fallbackLabel="JA" />
                    </div>
                    <div>
                      <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)' }}>
                        {isAr ? 'الهوية الإقليمية' : 'Regional Partner'}
                      </p>
                      <p style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginTop: 2, letterSpacing: '0.02em' }}>JONIX ARABIA</p>
                      <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', marginTop: 1 }}>
                        {isAr ? 'مصر والشرق الأوسط' : 'Egypt & Middle East'}
                      </p>
                    </div>
                  </div>

                  <div style={{ height: 1, background: 'rgba(255,255,255,0.07)', margin: '20px 0' }} />

                  {/* Spec list */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {CARD_SPECS.map((spec, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: 12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 + i * 0.1 }}
                        style={{
                          display: 'flex', alignItems: 'flex-start', gap: 12,
                          padding: '12px 14px',
                          background: 'rgba(255,255,255,0.035)',
                          border: '1px solid rgba(255,255,255,0.06)',
                          borderRadius: 12,
                        }}
                      >
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'rgba(0,212,255,0.65)', flexShrink: 0, marginTop: 5, display: 'block' }} />
                        <p style={{ fontSize: 12.5, lineHeight: 1.65, color: 'rgba(255,255,255,0.5)' }}>
                          {isAr ? spec.ar : spec.en}
                        </p>
                      </motion.div>
                    ))}
                  </div>

                  {/* Pure Living banner */}
                  <div style={{
                    background: 'rgba(0,196,239,0.07)',
                    border: '1px solid rgba(0,196,239,0.18)',
                    borderRadius: 16, padding: '16px 18px', marginTop: 20,
                  }}>
                    <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.32em', textTransform: 'uppercase', color: '#00d4ff', marginBottom: 6 }}>
                      ✦ {isAr ? 'حياة نقية' : 'Pure Living'}
                    </p>
                    <p style={{ fontSize: 12.5, lineHeight: 1.7, color: 'rgba(255,255,255,0.45)' }}>
                      {isAr
                        ? 'تقنية البلازما غير الحرارية المرخصة من إيطاليا لأسواق الشرق الأوسط وشمال أفريقيا'
                        : 'Licensed Non-Thermal Plasma technology from Italy for MENA markets'}
                    </p>
                  </div>

                  {/* Cert chips */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginTop: 20 }}>
                    {CERT_CHIPS.map((c) => (
                      <span
                        key={c}
                        style={{
                          padding: '5px 12px',
                          fontSize: 9.5, fontWeight: 700,
                          letterSpacing: '0.18em', textTransform: 'uppercase',
                          color: 'rgba(255,255,255,0.3)',
                          background: 'rgba(255,255,255,0.04)',
                          border: '1px solid rgba(255,255,255,0.09)',
                          borderRadius: 100,
                        }}
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom shimmer */}
                <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(0,120,200,0.3), transparent)' }} />
              </div>
            </motion.div>

          </div>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, paddingBottom: 32 }}
      >
        <motion.div
          style={{ width: 1, height: 40, background: 'linear-gradient(to bottom, rgba(255,255,255,0.35), transparent)' }}
          animate={{ scaleY: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
        <p style={{ fontSize: 8.5, fontWeight: 600, letterSpacing: '0.38em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.22)' }}>
          {isAr ? 'اكتشف' : 'Scroll'}
        </p>
      </motion.div>

    </section>
  );
}