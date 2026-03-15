'use client';

import { useLocale } from 'next-intl';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MediaImage from '@/components/MediaImage';
import { productModels, productLines } from '@/data/catalog';
import { Link } from '@/navigation';

export default function ProductsPage() {
  const locale = useLocale();
  const isAr = locale === 'ar';

  const grouped = productLines
    .map(line => ({
      line,
      models: productModels.filter(m => m.lineSlug === line.slug),
    }))
    .filter(g => g.models.length > 0);

  return (
    <div className={`min-h-screen bg-[#f7f9fc] ${isAr ? 'rtl' : 'ltr'}`}>
      <Header />

      <main
        dir={isAr ? 'rtl' : 'ltr'}
        style={{
          padding: 'clamp(60px, 10vw, 100px) 0',
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 clamp(16px, 4vw, 44px)' }}>

          {/* ── Page header ── */}
          <div style={{ marginBottom: 56 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              padding: '6px 16px',
              background: 'rgba(142,178,187,0.08)',
              border: '1px solid rgba(142,178,187,0.3)',
              borderRadius: 100, marginBottom: 18,
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#8eb2bb', display: 'block' }} />
              <span style={{ fontSize: 9.5, fontWeight: 800, letterSpacing: '0.28em', textTransform: 'uppercase' as const, color: '#5a8a96' }}>
                {isAr ? 'كتالوج المنتجات' : 'Product Catalog'}
              </span>
            </div>

            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(30px, 4vw, 52px)',
              fontWeight: 900, color: '#1c2329',
              lineHeight: 1.1, letterSpacing: '-0.02em',
              marginBottom: 16,
            }}>
              {isAr ? 'الكتالوج الكامل' : 'Full Product Catalog'}
            </h1>

            <p style={{ fontSize: 16, lineHeight: 1.8, color: '#7a8a96', maxWidth: 560, fontWeight: 300 }}>
              {isAr
                ? 'تصفح جميع موديلات أجهزة Jonix مع المواصفات التقنية الكاملة'
                : 'Browse all Jonix device models with complete technical specifications'}
            </p>
          </div>

          {/* ── Product groups ── */}
          {grouped.map(({ line, models }) => (
            <div key={line.slug} style={{ marginBottom: 56 }}>

              {/* Line heading */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 22 }}>
                <div style={{
                  height: 2, width: 28,
                  background: 'linear-gradient(90deg, #8eb2bb, transparent)',
                  borderRadius: 2, flexShrink: 0,
                }} />
                <h2 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 22, fontWeight: 800, color: '#1c2329',
                }}>
                  {isAr ? line.name.ar : line.name.en}
                </h2>
              </div>

              {/* Model cards */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 220px), 1fr))',
                gap: 16,
              }}>
                {models.map(model => (
                  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                  <Link
                    key={model.slug}
                    href={`/products/${model.slug}` as any}
                    style={{
                      textDecoration: 'none',
                      display: 'flex', flexDirection: 'column',
                      background: '#ffffff',
                      border: '1px solid #e4ecf0',
                      borderRadius: 20,
                      overflow: 'hidden',
                      boxShadow: '0 2px 14px rgba(90,138,150,0.07)',
                      transition: 'box-shadow 0.25s, transform 0.25s, border-color 0.25s',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLAnchorElement;
                      el.style.boxShadow = '0 12px 36px rgba(90,138,150,0.15)';
                      el.style.transform = 'translateY(-4px)';
                      el.style.borderColor = 'rgba(90,138,150,0.35)';
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLAnchorElement;
                      el.style.boxShadow = '0 2px 14px rgba(90,138,150,0.07)';
                      el.style.transform = 'translateY(0)';
                      el.style.borderColor = '#e4ecf0';
                    }}
                  >
                    {/* Product image */}
                    <div style={{ height: 160, overflow: 'hidden', background: '#e8eff3', flexShrink: 0 }}>
                      <MediaImage
                        src={model.image}
                        alt={model.modelName}
                        className="h-full w-full object-cover"
                        style={{ objectPosition: model.imagePosition ?? '50% 50%' }}
                        fallbackLabel={model.modelName}
                      />
                    </div>

                    {/* Card body */}
                    <div style={{ padding: '16px 18px 18px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <p style={{
                        fontSize: 9, fontWeight: 800,
                        letterSpacing: '0.2em', textTransform: 'uppercase' as const,
                        color: '#8eb2bb', marginBottom: 6,
                      }}>
                        {isAr ? line.name.ar : line.name.en}
                      </p>

                      <h3 style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: 16, fontWeight: 800,
                        color: '#1c2329', lineHeight: 1.25, marginBottom: 6,
                      }}>
                        {model.modelName}
                      </h3>

                      <p style={{ fontSize: 12.5, color: '#7a8a96', fontWeight: 400, lineHeight: 1.5, flex: 1 }}>
                        {isAr ? model.installationType.ar : model.installationType.en}
                      </p>

                      {model.coverageAreaM2 && (
                        <div style={{
                          marginTop: 12, paddingTop: 12,
                          borderTop: '1px solid #e6ecf0',
                          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        }}>
                          <span style={{ fontSize: 10.5, color: '#7a8a96', fontWeight: 400 }}>
                            {isAr ? 'مساحة التغطية' : 'Coverage'}
                          </span>
                          <span style={{ fontSize: 12, fontWeight: 700, color: '#1c2329' }}>
                            {model.coverageAreaM2}
                          </span>
                        </div>
                      )}

                      <div style={{
                        marginTop: 14,
                        display: 'inline-flex', alignItems: 'center', gap: 6,
                        fontSize: 11.5, fontWeight: 700,
                        color: '#5a8a96',
                        letterSpacing: '0.04em',
                      }}>
                        {isAr ? 'عرض التفاصيل ←' : 'View Details →'}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}

        </div>
      </main>

      <Footer />
    </div>
  );
}
