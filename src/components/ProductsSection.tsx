'use client';

import { motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import { productLines, productModels } from '@/data/catalog';
import { ArrowRightIcon } from '@/components/icons';
import MediaImage from '@/components/MediaImage';

export default function ProductsSection() {
  const t = useTranslations('products');
  const locale = useLocale();

  const featuredModels = productModels.slice(0, 8);

  return (
    <section id="products" className="section-spacer">
      <div className="container-shell">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.45 }}
          className="text-3xl font-extrabold text-slate-900 sm:text-4xl"
        >
          {t('title')}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.45, delay: 0.08 }}
          className="mt-3 max-w-3xl text-base text-[var(--jonix-slate-600)]"
        >
          {t('subtitle')}
        </motion.p>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {productLines.map((line, index) => (
            <motion.article
              key={line.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="soft-card group overflow-hidden rounded-2xl"
            >
              <div className="relative h-40 overflow-hidden">
                <MediaImage
                  src={line.image}
                  alt={locale === 'ar' ? line.name.ar : line.name.en}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  style={{ objectPosition: line.imagePosition ?? '50% 50%' }}
                  fallbackLabel={locale === 'ar' ? line.name.ar : line.name.en}
                />
              </div>
              <div className="p-4">
                <h3 className="text-base font-bold text-slate-900">{locale === 'ar' ? line.name.ar : line.name.en}</h3>
                <p className="mt-2 text-sm text-[var(--jonix-slate-600)]">
                  {locale === 'ar' ? line.shortDescription.ar : line.shortDescription.en}
                </p>
                <Link
                  href={`/products?line=${line.slug}`}
                  className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[var(--jonix-blue-700)]"
                >
                  {t('lineCta')}
                  <ArrowRightIcon className="h-4 w-4" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-12 flex items-center justify-between gap-4">
          <h3 className="text-xl font-bold text-slate-900">{t('allModels')}</h3>
          <Link
            href="/products"
            className="rounded-xl border border-[var(--jonix-blue-500)] px-4 py-2 text-sm font-bold text-[var(--jonix-blue-700)] transition-colors hover:bg-[var(--jonix-blue-100)]"
          >
            {t('modelCta')}
          </Link>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {featuredModels.map((model, index) => (
            <motion.article
              key={model.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.36, delay: index * 0.04 }}
              className="soft-card group rounded-2xl p-4"
            >
              <div className="relative h-28 overflow-hidden rounded-xl bg-[var(--jonix-blue-100)]">
                <MediaImage
                  src={model.image}
                  alt={model.modelName}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  style={{ objectPosition: model.imagePosition ?? '50% 50%' }}
                  fallbackLabel={model.modelName}
                />
              </div>
              <p className="mt-4 text-sm font-semibold text-[var(--jonix-blue-700)]">
                {locale === 'ar' ? model.lineName.ar : model.lineName.en}
              </p>
              <h4 className="mt-1 text-base font-bold text-slate-900">{model.modelName}</h4>
              <p className="mt-2 text-xs text-slate-600">
                {locale === 'ar' ? model.installationType.ar : model.installationType.en}
              </p>
              <Link
                href={`/products/${model.slug}`}
                className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[var(--jonix-blue-700)]"
              >
                {t('modelCta')}
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
