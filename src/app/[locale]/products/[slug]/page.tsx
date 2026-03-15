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
  const isAr = locale === 'ar';

  const specs = [
    { label: t('installation'),   value: isAr ? product.installationType.ar : product.installationType.en },
    { label: t('coverageArea'),   value: product.coverageAreaM2 },
    { label: t('coverageVolume'), value: product.coverageVolumeM3 },
    { label: t('airflow'),        value: product.airflowM3h },
    { label: t('power'),          value: product.powerConsumptionW },
    { label: t('dimensions'),     value: product.dimensionsMm },
    { label: t('weight'),         value: product.weightKg },
    { label: t('voltage'),        value: product.voltage },
  ].filter((s) => s.value);

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.modelName,
    image: product.image,
    brand: { '@type': 'Brand', name: 'Jonix' },
    category: isAr ? product.lineName.ar : product.lineName.en,
    description: `${product.modelName} — ${isAr ? product.installationType.ar : product.installationType.en}`,
    additionalProperty: specs.map((s) => ({
      '@type': 'PropertyValue',
      name: s.label,
      value: s.value,
    })),
    url: `/${locale}/products/${product.slug}`,
  };

  return (
    <div className="min-h-screen bg-[#f7f9fc]">
      <Header />

      <main dir={isAr ? 'rtl' : 'ltr'}>
        {/* Hero banner */}
        <div className="relative h-[340px] w-full overflow-hidden bg-[#e4eaf0] md:h-[420px]">
          <MediaImage
            src={product.image}
            alt={product.modelName}
            className="h-full w-full object-cover"
            style={{ objectPosition: product.imagePosition ?? '50% 50%' }}
            fallbackLabel={product.modelName}
            loading="eager"
          />
          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#06101a]/80 via-[#06101a]/30 to-transparent" />

          {/* Product name overlay */}
          <div className="absolute bottom-0 left-0 right-0 px-6 py-8 md:px-10">
            <div className="container-shell">
              <p className="text-[0.62rem] font-extrabold uppercase tracking-[0.3em] text-[#00c4ef]/80 mb-1">
                {isAr ? product.lineName.ar : product.lineName.en}
              </p>
              <h1 className="text-[clamp(1.75rem,4vw,3rem)] font-extrabold leading-tight text-white">
                {product.modelName}
              </h1>
              <p className="mt-1 text-[0.9rem] text-white/55">
                {isAr ? product.installationType.ar : product.installationType.en}
              </p>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="container-shell section-spacer">
          {/* Back link */}
          <a
            href={`/${locale}/products`}
            className="inline-flex items-center gap-2 rounded-xl border border-[#e4eaf0] bg-white px-4 py-2.5 text-[0.82rem] font-semibold text-[#5a6a7a] shadow-sm transition-all hover:border-[#1e5a96]/30 hover:text-[#1e5a96] hover:bg-[#f0f6ff] mb-8"
          >
            <span>←</span>
            {t('back')}
          </a>

          {/* Two-column layout */}
          <div className="grid gap-6 lg:grid-cols-[1.05fr_1fr]">

            {/* LEFT — Tech specs */}
            <section className="soft-card rounded-3xl p-7">
              <div className="mb-6">
                <p className="text-[0.6rem] font-extrabold uppercase tracking-[0.3em] text-[#1e5a96] mb-1">
                  {isAr ? 'المواصفات التقنية' : 'Technical Specifications'}
                </p>
                <h2 className="text-[1.25rem] font-extrabold text-[#1a2332]">{t('techData')}</h2>
              </div>

              {/* Alternating rows table */}
              <div className="overflow-hidden rounded-2xl border border-[#e4eaf0]">
                {specs.map((spec, i) => (
                  <div
                    key={spec.label}
                    className={`flex items-start justify-between gap-4 px-5 py-3.5 text-sm ${
                      i % 2 === 0 ? 'bg-white' : 'bg-[#f7f9fc]'
                    } ${i < specs.length - 1 ? 'border-b border-[#e4eaf0]' : ''}`}
                  >
                    <span className="font-semibold text-[#5a6a7a] flex-shrink-0">{spec.label}</span>
                    <span className="text-right font-bold text-[#1a2332]">
                      {spec.value ?? t('notPublished')}
                    </span>
                  </div>
                ))}
                {specs.length === 0 && (
                  <div className="px-5 py-6 text-center text-sm text-[#5a6a7a]">
                    {t('notPublished')}
                  </div>
                )}
              </div>

              {/* Notes */}
              {product.notes && (
                <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4">
                  <p className="text-[0.62rem] font-extrabold uppercase tracking-[0.2em] text-amber-700 mb-1">
                    {isAr ? 'ملاحظة' : 'Note'}
                  </p>
                  <p className="text-[0.85rem] leading-relaxed text-amber-900">
                    {isAr ? product.notes.ar : product.notes.en}
                  </p>
                </div>
              )}
            </section>

            {/* RIGHT — Info, downloads, certs */}
            <div className="flex flex-col gap-6">

              {/* Product info card */}
              <section className="soft-card rounded-3xl p-7">
                <p className="text-[0.6rem] font-extrabold uppercase tracking-[0.3em] text-[#1e5a96] mb-1">
                  {isAr ? 'خط المنتج' : 'Product Line'}
                </p>
                <h2 className="text-[1.6rem] font-extrabold text-[#1a2332] leading-tight">
                  {product.modelName}
                </h2>
                <p className="mt-1.5 text-[0.92rem] text-[#5a6a7a]">
                  {isAr ? product.installationType.ar : product.installationType.en}
                </p>

                <div className="mt-5 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#00c4ef]" />
                  <span className="text-[0.78rem] font-semibold text-[#5a6a7a]">
                    {isAr ? product.lineName.ar : product.lineName.en}
                  </span>
                </div>

                {/* Official source */}
                <div className="mt-6 pt-5 border-t border-[#e4eaf0]">
                  <p className="text-[0.6rem] font-extrabold uppercase tracking-[0.25em] text-[#5a6a7a] mb-1.5">
                    {t('source')}
                  </p>
                  <a
                    href={product.officialPage}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[0.88rem] font-bold text-[#1e5a96] hover:underline break-all"
                  >
                    {product.officialPage} ↗
                  </a>
                </div>
              </section>

              {/* Downloads */}
              <section className="soft-card rounded-3xl p-7">
                <div className="mb-4">
                  <p className="text-[0.6rem] font-extrabold uppercase tracking-[0.3em] text-[#1e5a96] mb-1">
                    {isAr ? 'الملفات' : 'Resources'}
                  </p>
                  <h2 className="text-[1.1rem] font-extrabold text-[#1a2332]">{t('downloads')}</h2>
                </div>
                <div className="space-y-2.5">
                  {product.downloads.length > 0 ? (
                    product.downloads.map((asset) => (
                      <a
                        key={asset.url}
                        href={asset.url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-between rounded-xl border border-[#e4eaf0] bg-white px-4 py-3.5 text-[0.85rem] font-semibold text-[#1e5a96] transition-all hover:border-[#1e5a96]/30 hover:bg-[#f0f6ff] hover:shadow-sm"
                      >
                        <span>{isAr ? asset.label.ar : asset.label.en}</span>
                        <DownloadIcon className="h-4 w-4 flex-shrink-0" />
                      </a>
                    ))
                  ) : (
                    <p className="text-[0.85rem] text-[#5a6a7a]">{t('notPublished')}</p>
                  )}
                </div>
              </section>

              {/* Certifications */}
              <section className="soft-card rounded-3xl p-7">
                <div className="mb-4">
                  <p className="text-[0.6rem] font-extrabold uppercase tracking-[0.3em] text-[#1e5a96] mb-1">
                    {isAr ? 'الجودة والسلامة' : 'Quality & Safety'}
                  </p>
                  <h2 className="text-[1.1rem] font-extrabold text-[#1a2332]">{t('certifications')}</h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.certifications.map((cert) => (
                    <span key={cert} className="brand-chip">
                      {cert}
                    </span>
                  ))}
                </div>
              </section>
            </div>
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
