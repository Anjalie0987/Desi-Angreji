"use client";

import * as React from "react";
import { generateShareLink } from "@/lib/utils";
import { Link2, Download, Check } from "lucide-react";
import type { SocialDistributionData } from "@/lib/sanity";

interface ArticleShareProps {
  url: string;
  title: string;
  socialData?: SocialDistributionData;
}

export function ArticleShare({ url, title, socialData }: ArticleShareProps) {
  const [copiedLink, setCopiedLink] = React.useState(false);
  const [copiedCaption, setCopiedCaption] = React.useState(false);

  const fbLink = generateShareLink('facebook', url, title);
  const twLink = generateShareLink('twitter', url, socialData?.xCaption || title);
  const waLink = generateShareLink('whatsapp', url, socialData?.whatsappCaption || title);
  const inLink = generateShareLink('linkedin', url, socialData?.linkedinCaption || title);
  // Telegram doesn't have a specific generator in our utils, let's use a standard one
  const tgLink = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;

  const copyToClipboard = async (text: string, type: 'link' | 'caption') => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === 'link') {
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2000);
      } else {
        setCopiedCaption(true);
        setTimeout(() => setCopiedCaption(false), 2000);
      }
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const downloadImage = async (imageUrl: string) => {
    if (!imageUrl) return;
    try {
      // In a real app, you'd fetch the image as blob to force download, 
      // or open it in a new tab if CORS blocks it.
      window.open(imageUrl, '_blank');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="sticky top-24 flex flex-col gap-6">
      <div>
        <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Share</h4>
        <div className="flex flex-row lg:flex-col gap-2">
          {/* Facebook */}
          <a href={fbLink} target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors" aria-label="Share on Facebook">
            <span className="font-bold text-sm">f</span>
          </a>
          
          {/* X / Twitter */}
          <a href={twLink} target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white hover:bg-gray-800 transition-colors" aria-label="Share on X">
            <span className="font-bold text-sm">𝕏</span>
          </a>

          {/* WhatsApp */}
          <a href={waLink} target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500 text-white hover:bg-green-600 transition-colors" aria-label="Share on WhatsApp">
            <span className="font-bold text-lg leading-none">✆</span>
          </a>

          {/* LinkedIn */}
          <a href={inLink} target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-700 text-white hover:bg-blue-800 transition-colors" aria-label="Share on LinkedIn">
            <span className="font-bold text-sm">in</span>
          </a>

          {/* Native Web Share API (Mobile) */}
          <button 
            suppressHydrationWarning
            onClick={async () => {
              if (typeof navigator !== 'undefined' && navigator.share) {
                try {
                  await navigator.share({
                    title: title,
                    text: socialData?.xCaption || title,
                    url: url,
                  });
                } catch (err) {
                  // Usually user cancelled
                }
              } else {
                copyToClipboard(url, 'link');
              }
            }}
            className="flex lg:hidden h-10 w-10 items-center justify-center rounded-full bg-brand text-white hover:bg-brand/90 transition-colors"
            aria-label="Share via device"
          >
            <span className="font-bold text-lg leading-none">⇪</span>
          </button>

          {/* Copy Link (Desktop mostly) */}
          <button 
            suppressHydrationWarning
            onClick={() => copyToClipboard(url, 'link')}
            className="hidden lg:flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
            aria-label="Copy link"
          >
            {copiedLink ? <Check className="h-4 w-4" /> : <Link2 className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Instagram Workflow (If social image exists) */}
      {socialData?.socialThumbnail && (
        <div className="hidden lg:block pt-6 border-t border-gray-100">
          <h4 className="text-xs font-bold uppercase tracking-widest text-brand mb-4 flex items-center gap-2">
            Instagram
          </h4>
          <div className="flex flex-col gap-2">
            <button 
              onClick={() => downloadImage(socialData.socialThumbnail!)}
              className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-brand transition-colors p-2 rounded hover:bg-brand/5"
            >
              <Download className="h-4 w-4" /> Download Image
            </button>
            <button 
              onClick={() => copyToClipboard(socialData.instagramCaption || title, 'caption')}
              className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-brand transition-colors p-2 rounded hover:bg-brand/5"
            >
              {copiedCaption ? <Check className="h-4 w-4" /> : <Link2 className="h-4 w-4" />} 
              {copiedCaption ? 'Caption Copied!' : 'Copy Caption'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
