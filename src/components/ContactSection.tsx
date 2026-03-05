'use client';

import { FormEvent, useState } from 'react';
import { motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { MailIcon, PhoneIcon } from '@/components/icons';

type FormState = {
  name: string;
  email: string;
  phone: string;
  company: string;
  sector: string;
  country: string;
  message: string;
};

const countries = [
  'Egypt',
  'Saudi Arabia',
  'United Arab Emirates',
  'Qatar',
  'Kuwait',
  'Bahrain',
  'Oman',
  'Jordan',
  'Lebanon',
  'Morocco',
  'Algeria',
  'Tunisia',
  'Iraq',
  'Italy',
  'Other',
];

const sectors = ['healthcare', 'hospitality', 'education', 'industrial', 'commercial', 'government', 'other'];

const offices = [
  {
    titleEn: 'Cairo Office',
    titleAr: 'مكتب القاهرة',
    addressEn:
      '5A Hafez Ramadan St, Behind City Center, Nasr City, Cairo, Egypt',
    addressAr:
      '٥ أ شارع حافظ رمضان، خلف سيتي سنتر، مدينة نصر، القاهرة، مصر',
  },
  {
    titleEn: 'Alexandria Office',
    titleAr: 'مكتب الإسكندرية',
    addressEn: '14 Heddaya Pacha St, Gleem, Alexandria, Egypt',
    addressAr: '١٤ شارع هداية باشا، جليم، الإسكندرية، مصر',
  },
  {
    titleEn: 'Italy Office',
    titleAr: 'مكتب إيطاليا',
    addressEn: 'Via XXV Aprile, 2 (41053) Modena, Maranello, Italia',
    addressAr: 'Via XXV Aprile, 2 (41053) Modena, Maranello, Italia',
  },
];

const initialForm: FormState = {
  name: '',
  email: '',
  phone: '',
  company: '',
  sector: sectors[0],
  country: countries[0],
  message: '',
};

export default function ContactSection() {
  const t = useTranslations('contact');
  const locale = useLocale();
  const [form, setForm] = useState<FormState>(initialForm);
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    setForm(initialForm);
    window.setTimeout(() => setSubmitted(false), 3000);
  }

  return (
    <section id="contact" className="section-spacer">
      <div className="container-shell grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.45 }}
          className="soft-card rounded-3xl p-6"
        >
          <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">{t('title')}</h2>
          <p className="mt-3 text-base text-[var(--jonix-slate-600)]">{t('subtitle')}</p>

          <div className="mt-6 grid gap-3">
            <div className="rounded-2xl border border-[var(--jonix-border)] bg-white p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                {locale === 'ar' ? 'البريد الإلكتروني' : 'Email'}
              </p>
              <div className="mt-2 flex items-center gap-2 text-sm font-semibold text-[var(--jonix-blue-900)]">
                <MailIcon className="h-4 w-4" />
                INFO@CLASS-ATRADING.COM
              </div>
            </div>
            <div className="rounded-2xl border border-[var(--jonix-border)] bg-white p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                {locale === 'ar' ? 'هاتف' : 'Phone'}
              </p>
              <div className="mt-2 flex items-center gap-2 text-sm font-semibold text-[var(--jonix-blue-900)]">
                <PhoneIcon className="h-4 w-4" />
                +202-234-930-22
              </div>
            </div>
            <div className="rounded-2xl border border-[var(--jonix-border)] bg-white p-4 text-sm text-slate-700">
              <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                {locale === 'ar' ? 'ساعات العمل' : 'Opening Hours'}
              </p>
              <p className="mt-2 font-semibold">Open 9AM-5PM: Sunday - Thursday</p>
              <p className="mt-1 font-semibold">{locale === 'ar' ? 'الأحد - الخميس، ٩ ص إلى ٥ م' : 'Sunday - Thursday, 9AM to 5PM'}</p>
            </div>
          </div>

          <div className="mt-5 space-y-3">
            {offices.map((office) => (
              <article key={office.titleEn} className="rounded-2xl border border-[var(--jonix-border)] bg-white p-4">
                <h3 className="text-sm font-bold text-[var(--jonix-blue-900)]">
                  {locale === 'ar' ? office.titleAr : office.titleEn}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">
                  {locale === 'ar' ? office.addressAr : office.addressEn}
                </p>
              </article>
            ))}
          </div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.5 }}
          onSubmit={onSubmit}
          className="soft-card rounded-3xl p-6"
        >
          <div className="grid gap-4 md:grid-cols-2">
            <LabelInput
              label={t('name')}
              value={form.name}
              onChange={(value) => setForm((prev) => ({ ...prev, name: value }))}
              required
            />
            <LabelInput
              label={t('email')}
              value={form.email}
              onChange={(value) => setForm((prev) => ({ ...prev, email: value }))}
              type="email"
              required
            />
            <LabelInput
              label={t('phone')}
              value={form.phone}
              onChange={(value) => setForm((prev) => ({ ...prev, phone: value }))}
            />
            <LabelInput
              label={t('company')}
              value={form.company}
              onChange={(value) => setForm((prev) => ({ ...prev, company: value }))}
            />
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
                {t('sector')}
              </label>
              <select
                value={form.sector}
                onChange={(event) => setForm((prev) => ({ ...prev, sector: event.target.value }))}
                className="w-full rounded-xl border border-[var(--jonix-border)] bg-white px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-[var(--jonix-blue-500)]"
              >
                {sectors.map((sector) => (
                  <option key={sector} value={sector}>
                    {t(`sectorOptions.${sector}`)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
                {t('country')}
              </label>
              <select
                value={form.country}
                onChange={(event) => setForm((prev) => ({ ...prev, country: event.target.value }))}
                className="w-full rounded-xl border border-[var(--jonix-border)] bg-white px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-[var(--jonix-blue-500)]"
              >
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4">
            <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">
              {t('message')}
            </label>
            <textarea
              rows={5}
              required
              value={form.message}
              onChange={(event) => setForm((prev) => ({ ...prev, message: event.target.value }))}
              className="w-full resize-y rounded-xl border border-[var(--jonix-border)] bg-white px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-[var(--jonix-blue-500)]"
            />
          </div>

          <button
            type="submit"
            className="button-glow mt-5 w-full rounded-xl bg-[var(--jonix-blue-900)] px-4 py-3 text-sm font-bold text-white transition-transform hover:scale-[1.01]"
          >
            {t('submit')}
          </button>

          {submitted && (
            <p className="mt-3 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700">
              {locale === 'ar'
                ? 'تم إرسال الطلب بنجاح. سيقوم الفريق بالتواصل معك قريباً.'
                : 'Consultation request captured successfully. The team will follow up shortly.'}
            </p>
          )}
        </motion.form>
      </div>
    </section>
  );
}

function LabelInput({
  label,
  value,
  onChange,
  type = 'text',
  required,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate-500">{label}</label>
      <input
        type={type}
        value={value}
        required={required}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-xl border border-[var(--jonix-border)] bg-white px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-[var(--jonix-blue-500)]"
      />
    </div>
  );
}
