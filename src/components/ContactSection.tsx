'use client';

import { FormEvent, useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { MailIcon, PhoneIcon } from '@/components/icons';

/* ─── Brand palette ─── */
const C = {
  teal:      '#8eb2bb',
  tealLight: '#b8d0d6',
  tealDark:  '#5a8a96',
  tealGlow:  'rgba(142,178,187,0.13)',
  tealFaint: 'rgba(142,178,187,0.06)',
  charcoal:  '#646464',
  navy:      '#06101a',
  dark:      '#1c2329',
  white:     '#ffffff',
  border:    'rgba(255,255,255,0.09)',
  borderHov: 'rgba(142,178,187,0.32)',
  muted:     'rgba(255,255,255,0.4)',
  mutedDim:  'rgba(255,255,255,0.22)',
};

/* ─── Data ─── */
type FormState = {
  name: string; email: string; phone: string;
  company: string; sector: string; country: string; message: string;
};

const COUNTRIES = [
  'Egypt','Saudi Arabia','United Arab Emirates','Qatar','Kuwait',
  'Bahrain','Oman','Jordan','Lebanon','Morocco','Algeria','Tunisia','Iraq','Italy','Other',
];
const SECTORS = ['healthcare','hospitality','education','industrial','commercial','government','other'];

const OFFICES = [
  {
    titleEn: 'Cairo Office',      titleAr: 'مكتب القاهرة',
    icon: '🏙',
    addressEn: '5A Hafez Ramadan St, Behind City Center, Nasr City, Cairo, Egypt',
    addressAr: '٥ أ شارع حافظ رمضان، خلف سيتي سنتر، مدينة نصر، القاهرة، مصر',
  },
  {
    titleEn: 'Alexandria Office', titleAr: 'مكتب الإسكندرية',
    icon: '🌊',
    addressEn: '14 Heddaya Pacha St, Gleem, Alexandria, Egypt',
    addressAr: '١٤ شارع هداية باشا، جليم، الإسكندرية، مصر',
  },
  {
    titleEn: 'Italy Office',      titleAr: 'مكتب إيطاليا',
    icon: '🇮🇹',
    addressEn: 'Via XXV Aprile, 2 (41053) Modena, Maranello, Italia',
    addressAr: 'Via XXV Aprile, 2 (41053) Modena, Maranello, Italia',
  },
];

const INITIAL: FormState = {
  name: '', email: '', phone: '', company: '',
  sector: SECTORS[0], country: COUNTRIES[0], message: '',
};

/* ─── Styled input ─── */
function Field({
  label, value, onChange, type = 'text', required = false,
}: {
  label: string; value: string; onChange: (v: string) => void;
  type?: string; required?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <label style={{
        display: 'block', marginBottom: 7,
        fontSize: 9, fontWeight: 800,
        letterSpacing: '0.26em', textTransform: 'uppercase',
        color: focused ? C.teal : C.mutedDim,
        transition: 'color 0.2s',
      }}>
        {label}{required && <span style={{ color: C.teal, marginLeft: 3 }}>*</span>}
      </label>
      <input
        type={type}
        value={value}
        required={required}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: '100%',
          padding: '12px 14px',
          background: focused ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.035)',
          border: `1px solid ${focused ? `${C.teal}55` : C.border}`,
          borderRadius: 12,
          fontSize: 13.5,
          color: C.white,
          outline: 'none',
          transition: 'border-color 0.25s, background 0.25s, box-shadow 0.25s',
          boxShadow: focused ? `0 0 0 3px ${C.teal}18` : 'none',
          fontFamily: "'DM Sans', sans-serif",
        }}
      />
    </div>
  );
}

/* ─── Styled select ─── */
function Select({
  label, value, onChange, options,
}: {
  label: string; value: string; onChange: (v: string) => void;
  options: { val: string; label: string }[];
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <label style={{
        display: 'block', marginBottom: 7,
        fontSize: 9, fontWeight: 800,
        letterSpacing: '0.26em', textTransform: 'uppercase',
        color: focused ? C.teal : C.mutedDim,
        transition: 'color 0.2s',
      }}>
        {label}
      </label>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: '100%',
          padding: '12px 14px',
          background: focused ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.035)',
          border: `1px solid ${focused ? `${C.teal}55` : C.border}`,
          borderRadius: 12,
          fontSize: 13.5,
          color: C.white,
          outline: 'none',
          transition: 'border-color 0.25s, background 0.25s',
          fontFamily: "'DM Sans', sans-serif",
          cursor: 'pointer',
          appearance: 'none',
          WebkitAppearance: 'none',
        }}
      >
        {options.map(o => (
          <option key={o.val} value={o.val} style={{ background: '#0d1a26', color: C.white }}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

/* ─── Contact info card ─── */
function InfoCard({ icon, title, children, i, inView }: {
  icon: React.ReactNode; title: string; children: React.ReactNode;
  i: number; inView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.2 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
      style={{
        display: 'flex', alignItems: 'flex-start', gap: 14,
        padding: '16px 18px',
        background: 'rgba(255,255,255,0.035)',
        border: `1px solid ${C.border}`,
        borderRadius: 16,
        transition: 'border-color 0.3s, background 0.3s',
        cursor: 'default',
      }}
    >
      <div style={{
        width: 38, height: 38, borderRadius: 11, flexShrink: 0,
        background: `${C.teal}14`,
        border: `1px solid ${C.teal}28`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {icon}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.24em', textTransform: 'uppercase', color: C.mutedDim, marginBottom: 5 }}>
          {title}
        </p>
        {children}
      </div>
    </motion.div>
  );
}

/* ─── Office card ─── */
function OfficeCard({ office, i, isAr, inView }: { office: typeof OFFICES[0]; i: number; isAr: boolean; inView: boolean }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.45 + i * 0.09, ease: [0.22, 1, 0.36, 1] }}
      style={{
        padding: '15px 17px',
        background: 'rgba(255,255,255,0.03)',
        border: `1px solid ${C.border}`,
        borderRadius: 16,
        transition: 'border-color 0.3s, background 0.3s, transform 0.3s',
        cursor: 'default',
        display: 'flex', gap: 12, alignItems: 'flex-start',
      }}
    >
      {/* Animated accent line */}
      <div style={{
        width: 3, borderRadius: 3, flexShrink: 0,
        alignSelf: 'stretch',
        background: `linear-gradient(to bottom, ${C.teal}, ${C.tealDark})`,
        minHeight: 40,
      }} />
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 5 }}>
          <span style={{ fontSize: 14 }}>{office.icon}</span>
          <h3 style={{ fontSize: 12.5, fontWeight: 700, color: C.white }}>
            {isAr ? office.titleAr : office.titleEn}
          </h3>
        </div>
        <p style={{ fontSize: 12, lineHeight: 1.65, color: 'rgba(255,255,255,0.38)', fontWeight: 300 }}>
          {isAr ? office.addressAr : office.addressEn}
        </p>
      </div>
    </motion.article>
  );
}

/* ─── Main export ─── */
export default function ContactSection() {
  const t      = useTranslations('contact');
  const locale = useLocale();
  const isAr   = locale === 'ar';

  const [form, setForm]           = useState<FormState>(INITIAL);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const inView     = useInView(sectionRef, { once: true, margin: '-80px' });

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setForm(INITIAL);
      setTimeout(() => setSubmitted(false), 4000);
    }, 1000);
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: `linear-gradient(160deg, #07111c 0%, #06101a 50%, #050e17 100%)`,
        padding: 'clamp(60px, 10vw, 110px) 0',
        fontFamily: "'DM Sans', sans-serif",
      }}
      dir={isAr ? 'rtl' : 'ltr'}
    >
      {/* ── Ambient orbs ── */}
      <motion.div style={{
        position: 'absolute', width: 600, height: 600,
        top: -150, right: -100, borderRadius: '50%',
        background: `radial-gradient(circle, ${C.tealGlow} 0%, transparent 70%)`,
        filter: 'blur(80px)', pointerEvents: 'none',
      }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div style={{
        position: 'absolute', width: 400, height: 400,
        bottom: -80, left: '15%', borderRadius: '50%',
        background: `radial-gradient(circle, rgba(90,138,150,0.08) 0%, transparent 70%)`,
        filter: 'blur(70px)', pointerEvents: 'none',
      }}
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 8, repeat: Infinity, delay: 3, ease: 'easeInOut' }}
      />


      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 clamp(16px, 4vw, 44px)', position: 'relative', zIndex: 10 }}>

        {/* ── HEADER ── */}
        <div style={{ textAlign: 'center', marginBottom: 72 }}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
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
              animate={{ scale: [1, 1.5, 1], opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2.2, repeat: Infinity }}
            />
            <span style={{ fontSize: 9.5, fontWeight: 800, letterSpacing: '0.28em', textTransform: 'uppercase', color: C.tealLight }}>
              {isAr ? 'تواصل معنا' : 'Get In Touch'}
            </span>
          </motion.div>

          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(34px, 4.5vw, 58px)',
            fontWeight: 900, color: C.white,
            lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 18,
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
            style={{ fontSize: 16, lineHeight: 1.8, color: C.muted, maxWidth: 520, margin: '0 auto', fontWeight: 300 }}
          >
            {t('subtitle')}
          </motion.p>
        </div>

        {/* ── MAIN GRID ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))', gap: 'clamp(16px, 3vw, 28px)', alignItems: 'start' }}>

          {/* ══ LEFT — Info ══ */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: `1px solid ${C.border}`,
              borderRadius: 28,
              padding: '32px 28px',
              backdropFilter: 'blur(14px)',
            }}
          >
            {/* Contact info header */}
            <div style={{ marginBottom: 24 }}>
              <p style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.28em', textTransform: 'uppercase', color: C.teal, marginBottom: 8 }}>
                {isAr ? 'معلومات التواصل' : 'Contact Information'}
              </p>
              <p style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 22, fontWeight: 800, color: C.white, lineHeight: 1.25,
              }}>
                {isAr ? 'نحن هنا لمساعدتك' : 'We\'re here to help'}
              </p>
            </div>

            {/* Email + Phone */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
              <InfoCard
                i={0} inView={inView}
                icon={<MailIcon style={{ width: 16, height: 16, color: C.teal }} />}
                title={isAr ? 'البريد الإلكتروني' : 'Email'}
              >
                <p style={{ fontSize: 12.5, fontWeight: 600, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.03em' }}>
                  INFO@CLASS-ATRADING.COM
                </p>
              </InfoCard>

              <InfoCard
                i={1} inView={inView}
                icon={<PhoneIcon style={{ width: 16, height: 16, color: C.teal }} />}
                title={isAr ? 'هاتف' : 'Phone'}
              >
                <p style={{ fontSize: 12.5, fontWeight: 600, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.03em' }}>
                  +202-234-930-22
                </p>
              </InfoCard>

              <InfoCard
                i={2} inView={inView}
                icon={<span style={{ fontSize: 16 }}>🕐</span>}
                title={isAr ? 'ساعات العمل' : 'Opening Hours'}
              >
                <p style={{ fontSize: 12.5, fontWeight: 500, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>
                  {isAr ? 'الأحد – الخميس، ٩ صباحاً – ٥ مساءً' : 'Sunday – Thursday, 9AM – 5PM'}
                </p>
              </InfoCard>
            </div>

            {/* Divider */}
            <div style={{ position: 'relative', height: 1, marginBottom: 20 }}>
              <div style={{ position: 'absolute', inset: 0, background: C.border }} />
              <motion.div
                style={{ position: 'absolute', top: 0, left: 0, height: '100%', background: `linear-gradient(90deg, ${C.teal}50, transparent)` }}
                initial={{ width: 0 }}
                animate={inView ? { width: '60%' } : {}}
                transition={{ duration: 1.0, delay: 0.7 }}
              />
            </div>

            {/* Office label */}
            <p style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.28em', textTransform: 'uppercase', color: C.mutedDim, marginBottom: 12 }}>
              {isAr ? 'مكاتبنا' : 'Our Offices'}
            </p>

            {/* Office cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
              {OFFICES.map((o, i) => (
                <OfficeCard key={o.titleEn} office={o} i={i} isAr={isAr} inView={inView} />
              ))}
            </div>
          </motion.div>

          {/* ══ RIGHT — Form ══ */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            style={{
              background: 'rgba(255,255,255,0.035)',
              border: `1px solid ${C.border}`,
              borderRadius: 28,
              padding: '32px 28px',
              backdropFilter: 'blur(14px)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Shimmer top */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${C.teal}50, transparent)` }} />

            {/* Form header */}
            <div style={{ marginBottom: 26 }}>
              <p style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.28em', textTransform: 'uppercase', color: C.teal, marginBottom: 6 }}>
                {isAr ? 'نموذج الاستشارة' : 'Consultation Request'}
              </p>
              <p style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 20, fontWeight: 800, color: C.white, lineHeight: 1.25,
              }}>
                {isAr ? 'أرسل طلبك' : 'Send Your Request'}
              </p>
            </div>

            <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* Row 1 */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14 }}>
                <Field label={t('name')} value={form.name} onChange={v => setForm(p => ({ ...p, name: v }))} required />
                <Field label={t('email')} value={form.email} onChange={v => setForm(p => ({ ...p, email: v }))} type="email" required />
              </div>
              {/* Row 2 */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14 }}>
                <Field label={t('phone')} value={form.phone} onChange={v => setForm(p => ({ ...p, phone: v }))} />
                <Field label={t('company')} value={form.company} onChange={v => setForm(p => ({ ...p, company: v }))} />
              </div>
              {/* Row 3 */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14 }}>
                <Select
                  label={t('sector')}
                  value={form.sector}
                  onChange={v => setForm(p => ({ ...p, sector: v }))}
                  options={SECTORS.map(s => ({ val: s, label: t(`sectorOptions.${s}`) }))}
                />
                <Select
                  label={t('country')}
                  value={form.country}
                  onChange={v => setForm(p => ({ ...p, country: v }))}
                  options={COUNTRIES.map(c => ({ val: c, label: c }))}
                />
              </div>

              {/* Message */}
              <div>
                <label style={{
                  display: 'block', marginBottom: 7,
                  fontSize: 9, fontWeight: 800,
                  letterSpacing: '0.26em', textTransform: 'uppercase',
                  color: C.mutedDim,
                }}>
                  {t('message')} <span style={{ color: C.teal }}>*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  value={form.message}
                  onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    background: 'rgba(255,255,255,0.035)',
                    border: `1px solid ${C.border}`,
                    borderRadius: 12,
                    fontSize: 13.5,
                    color: C.white,
                    outline: 'none',
                    resize: 'vertical',
                    fontFamily: "'DM Sans', sans-serif",
                    lineHeight: 1.7,
                    transition: 'border-color 0.25s, background 0.25s',
                  }}
                  onFocus={e => {
                    e.currentTarget.style.borderColor = `${C.teal}55`;
                    e.currentTarget.style.background = 'rgba(255,255,255,0.07)';
                    e.currentTarget.style.boxShadow = `0 0 0 3px ${C.teal}18`;
                  }}
                  onBlur={e => {
                    e.currentTarget.style.borderColor = C.border;
                    e.currentTarget.style.background = 'rgba(255,255,255,0.035)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
              </div>

              {/* Submit button */}
              <motion.button
                type="submit"
                disabled={submitting}
                style={{
                  width: '100%',
                  padding: '15px 28px',
                  fontSize: 13, fontWeight: 700,
                  letterSpacing: '0.06em',
                  color: C.white,
                  background: submitting
                    ? 'rgba(142,178,187,0.3)'
                    : `linear-gradient(135deg, ${C.tealDark}, #3a7282)`,
                  border: `1px solid ${C.teal}50`,
                  borderRadius: 14,
                  cursor: submitting ? 'not-allowed' : 'pointer',
                  boxShadow: `0 0 28px ${C.teal}28, inset 0 1px 0 rgba(255,255,255,0.1)`,
                  position: 'relative', overflow: 'hidden',
                  fontFamily: "'DM Sans', sans-serif",
                  transition: 'all 0.3s ease',
                }}
                whileHover={!submitting ? {
                  boxShadow: `0 0 48px ${C.teal}44, inset 0 1px 0 rgba(255,255,255,0.15)`,
                  y: -2,
                } : {}}
                whileTap={!submitting ? { scale: 0.98 } : {}}
              >
                {/* Shimmer sweep */}
                <motion.div
                  style={{
                    position: 'absolute', top: 0, left: '-100%',
                    width: '60%', height: '100%',
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)',
                    transform: 'skewX(-20deg)',
                  }}
                  animate={{ left: ['−100%', '200%'] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: 1 }}
                />
                {submitting ? (
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
                    <motion.span
                      style={{ width: 16, height: 16, borderRadius: '50%', border: `2px solid rgba(255,255,255,0.3)`, borderTopColor: C.white, display: 'block' }}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                    />
                    {isAr ? 'جارٍ الإرسال...' : 'Sending...'}
                  </span>
                ) : (
                  t('submit')
                )}
              </motion.button>

              {/* Success message */}
              <AnimatePresence>
                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.97 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      display: 'flex', alignItems: 'flex-start', gap: 12,
                      padding: '14px 16px',
                      background: 'rgba(52,211,153,0.08)',
                      border: '1px solid rgba(52,211,153,0.25)',
                      borderRadius: 14,
                    }}
                  >
                    <span style={{ fontSize: 18, flexShrink: 0, lineHeight: 1.3 }}>✓</span>
                    <div>
                      <p style={{ fontSize: 13, fontWeight: 700, color: '#34d399', marginBottom: 3 }}>
                        {isAr ? 'تم الإرسال بنجاح!' : 'Request Submitted!'}
                      </p>
                      <p style={{ fontSize: 12, color: 'rgba(52,211,153,0.7)', lineHeight: 1.55, fontWeight: 300 }}>
                        {isAr
                          ? 'سيقوم الفريق بالتواصل معك قريباً.'
                          : 'The team will follow up shortly.'}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}