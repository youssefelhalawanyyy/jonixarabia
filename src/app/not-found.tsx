import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="grid min-h-screen place-items-center bg-white px-4">
      <div className="max-w-md text-center">
        <p className="text-6xl font-extrabold text-[var(--jonix-blue-700)]">404</p>
        <h1 className="mt-3 text-2xl font-bold text-slate-900">Page Not Found</h1>
        <p className="mt-2 text-sm text-slate-600">The requested page could not be located.</p>
        <Link
          href="/en"
          className="mt-6 inline-flex rounded-xl bg-[var(--jonix-blue-700)] px-5 py-3 text-sm font-bold text-white"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
