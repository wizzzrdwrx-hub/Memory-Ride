"use client";

import React, { useState, useEffect } from "react";
import { ImageOff } from "lucide-react";

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackClassName?: string;
}

export default function ImageWithFallback({
  src,
  alt,
  className,
  fallbackClassName,
  ...props
}: ImageWithFallbackProps) {
  const [error, setError] = useState(false);

  // Reset the error state if the source URL changes
  useEffect(() => {
    setError(false);
  }, [src]);

  if (error || !src) {
    return (
      <div
        className={`w-full h-full bg-stone-200/60 border border-stone-300/40 rounded flex flex-col items-center justify-center text-stone-400 p-4 select-none ${
          fallbackClassName || ""
        }`}
      >
        <ImageOff className="w-8 h-8 text-stone-400/80 stroke-[1.5] mb-1.5" />
        <span className="text-[10px] font-sans font-semibold tracking-wider uppercase">
          No Preview Image
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setError(true)}
      className={className}
      {...props}
    />
  );
}
