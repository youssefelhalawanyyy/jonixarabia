import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { DownloadIcon } from '@/components/icons';
import { getProductBySlug } from '@/data/catalog';
import MediaImage from '@/components/MediaImage';

type ProductDetailPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { locale, slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: 'productDetail' });

  const specs = [
    { label: t('installation'), value: locale === 'ar' ? product.installationType.ar : product.installationType.en },
    { label: t('coverageArea'), value: product.coverageAreaM2 },
    { label: t('coverageVolume'), value: product.coverageVolumeM3 },
    { label: t('airflow'), value: product.airflowM3h },
    { label: t('power'), value: product.powerConsumptionW },
    { label: t('dimensions'), value: product.dimensionsMm },
    { label: t('weight'), value: product.weightKg },
    { label: t('voltage'), value: product.voltage },
  ];

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.modelName,
    image: product.image,
    brand: {
      '@type': 'Brand',
      name: 'Jonix',
    },
    category: locale === 'ar' ? product.lineName.ar : product.lineName.en,
    description: `${product.modelName} - ${locale === 'ar' ? product.installationType.ar : product.installationType.en}`,
    additionalProperty: specs
      .filter((spec) => spec.value)
      .map((spec) => ({
        '@type': 'PropertyValue',
        name: spec.label,
        value: spec.value,
      })),
    url: `/${locale}/products/${product.slug}`,
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="section-spacer">
        <div className="container-shell">
          <a
            href={`/${locale}/products`}
            className="inline-flex rounded-full border border-[var(--jonix-border)] px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-[var(--jonix-blue-100)]"
          >
            {t('back')}
          </a>

          <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1.05fr]">
            <article className="soft-card overflow-hidden rounded-3xl">
              <div className="relative h-[420px] w-full bg-[var(--jonix-blue-100)]">
                <MediaImage
                  src={product.image}
                  alt={product.modelName}
                  className="h-full w-full object-cover"
                  style={{ objectPosition: product.imagePosition ?? '50% 50%' }}
                  fallbackLabel={product.modelName}
                  loading="eager"
                />
              </div>
            </article>

            <section className="soft-card rounded-3xl p-6">
              <p className="text-xs font-bold uppercase tracking-wide text-[var(--jonix-blue-700)]">
                {t('line')}: {locale === 'ar' ? product.lineName.ar : product.lineName.en}
              </p>
              <h1 className="mt-2 text-3xl font-extrabold text-slate-900">{product.modelName}</h1>
              <p className="mt-3 text-sm text-slate-600">
                {locale === 'ar' ? product.installationType.ar : product.installationType.en}
              </p>

              <h2 className="mt-6 text-lg font-bold text-slate-900">{t('techData')}</h2>
              <div className="mt-3 grid gap-2">
                {specs.map((spec) => (
                  <div key={spec.label} className="flex items-start justify-between gap-4 rounded-xl border border-[var(--jonix-border)] bg-white px-4 py-3 text-sm">
                    <span className="font-semibold text-slate-700">{spec.label}</span>
                    <span className="text-right text-slate-900">{spec.value ?? t('notPublished')}</span>
                  </div>
                ))}
              </div>

              {product.notes && (
                <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs leading-relaxed text-amber-900">
                  {locale === 'ar' ? product.notes.ar : product.notes.en}
                </p>
              )}
            </section>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <section className="soft-card rounded-3xl p-6">
              <h2 className="text-lg font-bold text-slate-900">{t('downloads')}</h2>
              <div className="mt-3 space-y-2">
                {product.downloads.map((asset) => (
                  <a
                    key={asset.url}
                    href={asset.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between rounded-xl border border-[var(--jonix-border)] bg-white px-4 py-3 text-sm font-semibold text-[var(--jonix-blue-700)] transition-colors hover:bg-[var(--jonix-blue-100)]"
                  >
                    <span>{locale === 'ar' ? asset.label.ar : asset.label.en}</span>
                    <DownloadIcon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </section>

            <section className="soft-card rounded-3xl p-6">
              <h2 className="text-lg font-bold text-slate-900">{t('certifications')}</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {product.certifications.map((certification) => (
                  <span key={certification} className="brand-chip rounded-full px-3 py-1 text-xs font-bold">
                    {certification}
                  </span>
                ))}
              </div>

              <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-slate-500">{t('source')}</p>
              <a
                href={product.officialPage}
                target="_blank"
                rel="noreferrer"
                className="mt-1 inline-block text-sm font-bold text-[var(--jonix-blue-700)] hover:underline"
              >
                {product.officialPage}
              </a>
            </section>
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
