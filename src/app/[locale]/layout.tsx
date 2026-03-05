import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/navigation';

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  if (!locales.includes(locale as (typeof locales)[number])) {
    notFound();
  }

  const messages = await getMessages({ locale });
  const isArabic = locale === 'ar';

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <div
        lang={locale}
        dir={isArabic ? 'rtl' : 'ltr'}
        className={`${isArabic ? 'font-ar' : 'font-en'} min-h-screen`}
      >
        {children}
      </div>
    </NextIntlClientProvider>
  );
}
