import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { DownloadIcon } from '@/components/icons';
import { getProductBySlug, productModels } from '@/data/catalog';
import MediaImage from '@/components/MediaImage';

/* ─── Brand palette (matches the rest of the site) ─── */
const C = {
  teal:      '#8eb2bb',
  tealLight: '#b8d0d6',
  tealDark:  '#5a8a96',
  dark:      '#1c2329',
  offWhite:  '#f4f6f8',
  white:     '#ffffff',
  border:    '#e6ecf0',
  muted:     '#7a8a96',
};

type ProductDetailPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return productModels.map(p => ({ slug: p.slug }));
}

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
    <div
      style={{ minHeight: '100vh', background: '#f4f6f8', fontFamily: "'DM Sans', sans-serif" }}
      dir={isAr ? 'rtl' : 'ltr'}
    >
      <Header />

      <main>
        {/* ── Hero banner ── */}
        <div style={{ position: 'relative', height: 'clamp(260px, 38vw, 420px)', overflow: 'hidden', background: '#d8e4ea' }}>
          <MediaImage
            src={product.image}
            alt={product.modelName}
            className="h-full w-full object-cover"
            style={{ objectPosition: product.imagePosition ?? '50% 50%' }}
            fallbackLabel={product.modelName}
            loading="eager"
          />
          {/* gradient overlay */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, rgba(6,16,26,0.82) 0%, rgba(6,16,26,0.28) 55%, transparent 100%)',
          }} />

          {/* Text overlay — pinned to bottom */}
          <div style={{
            position: 'absolute', bottom: 0,
            insetInlineStart: 0, insetInlineEnd: 0,
            padding: 'clamp(20px, 4vw, 40px) clamp(16px, 5vw, 48px)',
          }}>
            <p style={{
              fontSize: 9.5, fontWeight: 800,
              letterSpacing: '0.3em', textTransform: 'uppercase',
              color: `${C.tealLight}cc`, marginBottom: 8,
            }}>
              {isAr ? product.lineName.ar : product.lineName.en}
            </p>
            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(1.6rem, 4.5vw, 3rem)',
              fontWeight: 900, lineHeight: 1.1,
              color: '#ffffff', letterSpacing: '-0.02em',
              marginBottom: 8,
            }}>
              {product.modelName}
            </h1>
            <p style={{ fontSize: 'clamp(13px, 1.8vw, 16px)', color: 'rgba(255,255,255,0.55)', fontWeight: 300 }}>
              {isAr ? product.installationType.ar : product.installationType.en}
            </p>
          </div>
        </div>

        {/* ── Page body ── */}
        <div style={{
          maxWidth: 1240, margin: '0 auto',
          padding: 'clamp(32px, 6vw, 60px) clamp(16px, 5vw, 44px)',
        }}>

          {/* Back button */}
          <a
            href={`/${locale}/products`}
            style={{
              display: 'inline-flex', alignItems: 'center',
              gap: 8, marginBottom: 40,
              padding: '10px 18px',
              background: C.white,
              border: `1px solid ${C.border}`,
              borderRadius: 14,
              fontSize: 13, fontWeight: 600,
              color: C.muted,
              textDecoration: 'none',
              boxShadow: '0 1px 6px rgba(90,138,150,0.08)',
              transition: 'border-color 0.2s, color 0.2s, box-shadow 0.2s',
            }}
          >
            <span style={{ fontSize: 16, lineHeight: 1 }}>{isAr ? '→' : '←'}</span>
            {t('back')}
          </a>

          {/* Two-column layout — stacks on mobile */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
            gap: 'clamp(16px, 3vw, 24px)',
            alignItems: 'start',
          }}>

            {/* ── LEFT: Tech specs ── */}
            <section style={{
              background: C.white,
              border: `1px solid ${C.border}`,
              borderRadius: 24,
              overflow: 'hidden',
              boxShadow: '0 3px 20px rgba(90,138,150,0.08)',
            }}>
              {/* Card top stripe */}
              <div style={{ height: 3, background: `linear-gradient(90deg, ${C.teal}, ${C.tealLight})` }} />

              <div style={{ padding: 'clamp(20px, 3vw, 28px)' }}>
                <p style={{
                  fontSize: 9.5, fontWeight: 800,
                  letterSpacing: '0.28em', textTransform: 'uppercase' as const,
                  color: C.tealDark, marginBottom: 6,
                }}>
                  {isAr ? 'المواصفات التقنية' : 'Technical Specifications'}
                </p>
                <h2 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 'clamp(18px, 2.5vw, 22px)',
                  fontWeight: 800, color: C.dark, marginBottom: 20,
                }}>
                  {t('techData')}
                </h2>

                {/* Specs table */}
                <div style={{ border: `1px solid ${C.border}`, borderRadius: 16, overflow: 'hidden' }}>
                  {specs.map((spec, i) => (
                    <div
                      key={spec.label}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                        gap: 16,
                        padding: '13px 18px',
                        background: i % 2 === 0 ? C.white : C.offWhite,
                        borderBottom: i < specs.length - 1 ? `1px solid ${C.border}` : 'none',
                      }}
                    >
                      <span style={{ fontSize: 13, fontWeight: 600, color: C.muted, flexShrink: 0 }}>
                        {spec.label}
                      </span>
                      <span style={{
                        fontSize: 13, fontWeight: 700, color: C.dark,
                        textAlign: isAr ? 'left' : 'right',
                      }}>
                        {spec.value ?? t('notPublished')}
                      </span>
                    </div>
                  ))}
                  {specs.length === 0 && (
                    <div style={{ padding: '24px', textAlign: 'center', fontSize: 13, color: C.muted }}>
                      {t('notPublished')}
                    </div>
                  )}
                </div>

                {/* Notes */}
                {product.notes && (
                  <div style={{
                    marginTop: 18,
                    padding: '14px 18px',
                    background: 'rgba(255,210,100,0.08)',
                    border: '1px solid rgba(220,170,60,0.3)',
                    borderRadius: 14,
                  }}>
                    <p style={{
                      fontSize: 9.5, fontWeight: 800,
                      letterSpacing: '0.2em', textTransform: 'uppercase' as const,
                      color: '#a07820', marginBottom: 6,
                    }}>
                      {isAr ? 'ملاحظة' : 'Note'}
                    </p>
                    <p style={{ fontSize: 13, lineHeight: 1.7, color: '#7a5c10' }}>
                      {isAr ? product.notes.ar : product.notes.en}
                    </p>
                  </div>
                )}
              </div>
            </section>

            {/* ── RIGHT: Info, downloads, certs ── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(14px, 2vw, 20px)' }}>

              {/* Product info card */}
              <section style={{
                background: C.white,
                border: `1px solid ${C.border}`,
                borderRadius: 24,
                overflow: 'hidden',
                boxShadow: '0 3px 20px rgba(90,138,150,0.08)',
              }}>
                <div style={{ height: 3, background: `linear-gradient(90deg, ${C.tealDark}, ${C.teal})` }} />
                <div style={{ padding: 'clamp(20px, 3vw, 28px)' }}>
                  <p style={{
                    fontSize: 9.5, fontWeight: 800,
                    letterSpacing: '0.28em', textTransform: 'uppercase' as const,
                    color: C.tealDark, marginBottom: 6,
                  }}>
                    {isAr ? 'خط المنتج' : 'Product Line'}
                  </p>
                  <h2 style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 'clamp(20px, 2.8vw, 28px)',
                    fontWeight: 900, color: C.dark,
                    lineHeight: 1.2, marginBottom: 6,
                  }}>
                    {product.modelName}
                  </h2>
                  <p style={{ fontSize: 14, color: C.muted, fontWeight: 300, lineHeight: 1.6 }}>
                    {isAr ? product.installationType.ar : product.installationType.en}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 16 }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: C.teal, display: 'block', flexShrink: 0 }} />
                    <span style={{ fontSize: 12.5, fontWeight: 600, color: C.muted }}>
                      {isAr ? product.lineName.ar : product.lineName.en}
                    </span>
                  </div>

                  <div style={{ marginTop: 20, paddingTop: 18, borderTop: `1px solid ${C.border}` }}>
                    <p style={{
                      fontSize: 9.5, fontWeight: 800,
                      letterSpacing: '0.25em', textTransform: 'uppercase' as const,
                      color: C.muted, marginBottom: 8,
                    }}>
                      {t('source')}
                    </p>
                    <a
                      href={product.officialPage}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        fontSize: 13, fontWeight: 600,
                        color: C.tealDark, wordBreak: 'break-all',
                        textDecoration: 'none',
                      }}
                    >
                      {product.officialPage} ↗
                    </a>
                  </div>
                </div>
              </section>

              {/* Downloads card */}
              <section style={{
                background: C.white,
                border: `1px solid ${C.border}`,
                borderRadius: 24,
                overflow: 'hidden',
                boxShadow: '0 3px 20px rgba(90,138,150,0.08)',
              }}>
                <div style={{ height: 3, background: `linear-gradient(90deg, ${C.teal}, ${C.tealLight})` }} />
                <div style={{ padding: 'clamp(20px, 3vw, 28px)' }}>
                  <p style={{
                    fontSize: 9.5, fontWeight: 800,
                    letterSpacing: '0.28em', textTransform: 'uppercase' as const,
                    color: C.tealDark, marginBottom: 6,
                  }}>
                    {isAr ? 'الملفات' : 'Resources'}
                  </p>
                  <h2 style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 18, fontWeight: 800,
                    color: C.dark, marginBottom: 16,
                  }}>
                    {t('downloads')}
                  </h2>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {product.downloads.length > 0 ? (
                      product.downloads.map((asset) => (
                        <a
                          key={asset.url}
                          href={asset.url}
                          target="_blank"
                          rel="noreferrer"
                          style={{
                            display: 'flex', alignItems: 'center',
                            justifyContent: 'space-between', gap: 12,
                            padding: '12px 16px',
                            background: C.offWhite,
                            border: `1px solid ${C.border}`,
                            borderRadius: 14,
                            fontSize: 13, fontWeight: 600,
                            color: C.tealDark,
                            textDecoration: 'none',
                            transition: 'background 0.2s, border-color 0.2s',
                          }}
                        >
                          <span>{isAr ? asset.label.ar : asset.label.en}</span>
                          <DownloadIcon style={{ width: 16, height: 16, flexShrink: 0 }} />
                        </a>
                      ))
                    ) : (
                      <p style={{ fontSize: 13, color: C.muted }}>{t('notPublished')}</p>
                    )}
                  </div>
                </div>
              </section>

              {/* Certifications card */}
              <section style={{
                background: C.white,
                border: `1px solid ${C.border}`,
                borderRadius: 24,
                overflow: 'hidden',
                boxShadow: '0 3px 20px rgba(90,138,150,0.08)',
              }}>
                <div style={{ height: 3, background: `linear-gradient(90deg, ${C.tealDark}, ${C.teal})` }} />
                <div style={{ padding: 'clamp(20px, 3vw, 28px)' }}>
                  <p style={{
                    fontSize: 9.5, fontWeight: 800,
                    letterSpacing: '0.28em', textTransform: 'uppercase' as const,
                    color: C.tealDark, marginBottom: 6,
                  }}>
                    {isAr ? 'الجودة والسلامة' : 'Quality & Safety'}
                  </p>
                  <h2 style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 18, fontWeight: 800,
                    color: C.dark, marginBottom: 16,
                  }}>
                    {t('certifications')}
                  </h2>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {product.certifications.map((cert) => (
                      <span
                        key={cert}
                        style={{
                          display: 'inline-flex', alignItems: 'center',
                          padding: '5px 14px',
                          fontSize: 10, fontWeight: 700,
                          letterSpacing: '0.16em', textTransform: 'uppercase' as const,
                          color: C.tealDark,
                          background: `${C.teal}14`,
                          border: `1px solid ${C.teal}30`,
                          borderRadius: 100,
                        }}
                      >
                        {cert}
                      </span>
                    ))}
                  </div>
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
