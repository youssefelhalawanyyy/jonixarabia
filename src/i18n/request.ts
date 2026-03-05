import { getRequestConfig } from 'next-intl/server';
import { locales } from '@/navigation';
import en from '../messages/en.json';
import ar from '../messages/ar.json';

const messages: Record<(typeof locales)[number], Record<string, unknown>> = {
  en: en as Record<string, unknown>,
  ar: ar as Record<string, unknown>,
};

function isAppLocale(locale: string): locale is (typeof locales)[number] {
  return locales.includes(locale as (typeof locales)[number]);
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = (await requestLocale) ?? 'en';
  const locale = isAppLocale(requested) ? requested : 'en';

  return {
    locale,
    messages: messages[locale],
  };
});
