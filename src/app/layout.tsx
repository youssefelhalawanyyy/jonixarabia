import type { Metadata } from 'next';
import { Playfair_Display, DM_Sans } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['700', '900'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-playfair',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-dm-sans',
});

export const metadata: Metadata = {
  title: 'Jonix Arabia | Egypt & Middle East',
  description:
    'Professional bilingual corporate website for Jonix Arabia in Egypt & Middle East based on official Jonix technology, products and certifications.',
  keywords: [
    'Jonix Arabia',
    'Jonix Air',
    'Non-Thermal Plasma',
    'Indoor Air Quality',
    'Air Sanitization Egypt',
    'HVAC Air Treatment',
    'Medical Air Purification',
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${playfair.variable} ${dmSans.variable}`}>
      <body className="min-h-screen bg-white text-slate-900 antialiased">
        {children}
      </body>
    </html>
  );
}
