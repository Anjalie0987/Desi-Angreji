import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Advertisement } from "@/lib/ads";

interface AdvertisementBannerProps extends React.HTMLAttributes<HTMLDivElement> {
  ad: Advertisement | null;
}

export function AdvertisementBanner({ ad, className, ...props }: AdvertisementBannerProps) {
  if (!ad || !ad.active) {
    return null;
  }

  return (
    <div 
      className={cn("w-full flex items-center justify-center py-4", className)} 
      {...props}
    >
      <Link 
        href={ad.targetUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full max-w-4xl relative"
        title={ad.title}
      >
        <span className="sr-only">{ad.title}</span>
        {/* We use standard img for ads to avoid Next.js image optimization costs 
            for volatile 3rd party ad images, or next/image if it's from our own CMS.
            Assuming CMS for now, so next/image is fine if configured. 
            We'll use a standard img tag with responsive classes for maximum flexibility 
            without needing to whitelist arbitrary ad domains. */}
        <img 
          src={ad.image} 
          alt={ad.title} 
          className="w-full h-auto object-contain bg-gray-50 rounded"
        />
        <div className="absolute -top-4 right-0 text-[10px] text-muted-foreground uppercase tracking-wider">
          Advertisement
        </div>
      </Link>
    </div>
  );
}
