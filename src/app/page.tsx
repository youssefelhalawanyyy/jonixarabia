import { redirect } from 'next/navigation';
import { headers } from 'next/headers';

export default async function Home() {
  const acceptLanguage = (await headers()).get('accept-language') ?? '';
  const targetLocale = acceptLanguage.toLowerCase().includes('ar') ? 'ar' : 'en';
  redirect(`/${targetLocale}`);
}
