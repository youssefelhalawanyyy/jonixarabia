import type { Metadata } from 'next';
import './globals.css';

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
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-white text-slate-900 antialiased">
        {children}
      </body>
    </html>
  );
}
