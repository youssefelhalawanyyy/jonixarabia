'use client';
/* eslint-disable @next/next/no-img-element */

import { CSSProperties, useMemo, useState } from 'react';

type MediaImageProps = {
  src: string;
  alt: string;
  className?: string;
  style?: CSSProperties;
  fallbackLabel?: string;
  loading?: 'eager' | 'lazy';
};

export default function MediaImage({
  src,
  alt,
  className,
  style,
  fallbackLabel,
  loading = 'lazy',
}: MediaImageProps) {
  const [failed, setFailed] = useState(false);
  const label = useMemo(() => fallbackLabel ?? alt, [alt, fallbackLabel]);

  if (failed || !src) {
    return (
      <div
        className={`relative overflow-hidden ${className ?? ''}`}
        style={style}
        aria-label={label}
      >
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0d2d4a] via-[#1e5a96] to-[#2d7bb8]" />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'linear-gradient(rgba(0,212,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.3) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />
        {/* Radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,212,255,0.15),transparent_70%)]" />
        {/* Device icon SVG */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
          <svg
            className="h-10 w-10 text-white/20"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <span className="px-3 text-center text-[0.6rem] font-extrabold uppercase tracking-widest text-white/40 line-clamp-2">
            {label}
          </span>
        </div>
        {/* Jonix branding chip */}
        <div className="absolute bottom-2 end-2">
          <span className="rounded-full bg-white/8 px-2 py-0.5 text-[0.5rem] font-extrabold uppercase tracking-widest text-white/30">
            JONIX
          </span>
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      className={className}
      style={style}
      onError={() => setFailed(true)}
      referrerPolicy="no-referrer"
    />
  );
}
