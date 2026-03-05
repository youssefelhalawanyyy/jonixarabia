'use client';

import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from '@/navigation';
import { productModels, productLines } from '@/data/catalog';
import { ArrowRightIcon } from '@/components/icons';
import MediaImage from '@/components/MediaImage';

export default function ProductsPage() {
  const t = useTranslations('products');
  const locale = useLocale();
  const searchParams = useSearchParams();
  const selectedLine = searchParams.get('line');

  const filteredModels = selectedLine
    ? productModels.filter((model) => model.lineSlug === selectedLine)
    : productModels;

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: filteredModels.map((model, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Product',
        name: model.modelName,
        url: `/${locale}/products/${model.slug}`,
        image: model.image,
      },
    })),
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="section-spacer">
        <div className="container-shell">
          <h1 className="text-4xl font-extrabold text-slate-900">{t('title')}</h1>
          <p className="mt-3 max-w-3xl text-base text-[var(--jonix-slate-600)]">{t('subtitle')}</p>

          <div className="mt-8 flex flex-wrap gap-2">
            <Link
              href="/products"
              className={`rounded-full border px-5 py-2.5 text-[0.92rem] font-extrabold transition-colors ${
                !selectedLine
                  ? 'border-[var(--jonix-blue-700)] bg-[var(--jonix-blue-700)] text-[#16323b]'
                  : 'border-[var(--jonix-border)] text-[#2f4249] hover:bg-[#d5e3e6]'
              }`}
            >
              {t('allModels')}
            </Link>
            {productLines.map((line) => (
              <Link
                key={line.slug}
                href={`/products?line=${line.slug}`}
                className={`rounded-full border px-5 py-2.5 text-[0.92rem] font-extrabold transition-colors ${
                  selectedLine === line.slug
                    ? 'border-[var(--jonix-blue-700)] bg-[var(--jonix-blue-700)] text-[#16323b]'
                    : 'border-[var(--jonix-border)] text-[#2f4249] hover:bg-[#d5e3e6]'
                }`}
              >
                {locale === 'ar' ? line.name.ar : line.name.en}
              </Link>
            ))}
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filteredModels.map((model, index) => (
              <motion.article
                key={model.slug}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.03 }}
                className="soft-card group rounded-2xl p-4"
              >
                <div className="relative h-48 overflow-hidden rounded-xl bg-[var(--jonix-blue-100)]">
                  <MediaImage
                    src={model.image}
                    alt={model.modelName}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    style={{ objectPosition: model.imagePosition ?? '50% 50%' }}
                    fallbackLabel={model.modelName}
                  />
                </div>
                <p className="mt-4 text-xs font-bold uppercase tracking-wide text-[var(--jonix-blue-700)]">
                  {locale === 'ar' ? model.lineName.ar : model.lineName.en}
                </p>
                <h2 className="mt-1 text-lg font-extrabold text-slate-900">{model.modelName}</h2>
                <p className="mt-2 text-sm text-slate-600">
                  {locale === 'ar' ? model.installationType.ar : model.installationType.en}
                </p>

                <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                  <div className="rounded-lg border border-[var(--jonix-border)] p-2">
                    <p className="text-slate-500">{locale === 'ar' ? 'تدفق الهواء' : 'Airflow'}</p>
                    <p className="font-semibold text-slate-800">{model.airflowM3h ?? '-'}</p>
                  </div>
                  <div className="rounded-lg border border-[var(--jonix-border)] p-2">
                    <p className="text-slate-500">{locale === 'ar' ? 'القدرة' : 'Power'}</p>
                    <p className="font-semibold text-slate-800">{model.powerConsumptionW ?? '-'}</p>
                  </div>
                </div>

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
      </main>

      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </div>
  );
}
