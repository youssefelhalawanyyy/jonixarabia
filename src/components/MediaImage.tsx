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
        className={`grid place-items-center bg-gradient-to-br from-[#8EB2BB] to-[#565656] text-center text-white ${className ?? ''}`}
        style={style}
        aria-label={label}
      >
        <span className="px-3 text-xs font-bold uppercase tracking-wide">{label}</span>
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
