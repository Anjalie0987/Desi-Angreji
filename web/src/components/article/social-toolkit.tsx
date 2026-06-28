"use client";

import * as React from "react";
import { Check, Copy, Settings2 } from "lucide-react";
import { Button } from "../ui/button";
import type { ArticleDetail } from "@/lib/sanity";

interface SocialToolkitProps {
  article: ArticleDetail;
  url: string;
}

export function SocialToolkit({ article, url }: SocialToolkitProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [copiedItem, setCopiedItem] = React.useState<string | null>(null);

  // Only render in development mode
  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedItem(id);
      setTimeout(() => setCopiedItem(null), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const social = article.socialMedia;

  const tools = [
    { id: 'url', label: 'Copy Share URL', content: url },
    { id: 'preview', label: 'Copy Preview Story', content: `${article.title}\n\n${article.excerpt}\n\nRead more: ${url}` },
    { id: 'fb', label: 'Copy Facebook Caption', content: social?.facebookCaption || `${article.title}\n\n${url}` },
    { id: 'ig', label: 'Copy Instagram Caption', content: social?.instagramCaption || `${article.title}\n\nLink in bio!` },
    { id: 'threads', label: 'Copy Threads Caption', content: social?.threadsCaption || `${article.title}\n\n${url}` },
    { id: 'wa', label: 'Copy WhatsApp Caption', content: social?.whatsappCaption || `*${article.title}*\n\n${article.excerpt}\n\n${url}` },
  ];

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen && (
        <div className="mb-4 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden w-72 animate-in slide-in-from-bottom-4">
          <div className="bg-brand text-white p-3 font-semibold flex items-center justify-between">
            <span>Editor Toolkit</span>
            <span className="text-xs bg-black/20 px-2 py-1 rounded">DEV ONLY</span>
          </div>
          <div className="p-2 flex flex-col gap-1 max-h-[60vh] overflow-y-auto">
            {tools.map((tool) => (
              <Button
                key={tool.id}
                variant="ghost"
                className="justify-between w-full text-left font-normal"
                onClick={() => copyToClipboard(tool.content, tool.id)}
                suppressHydrationWarning
              >
                {tool.label}
                {copiedItem === tool.id ? (
                  <Check className="h-4 w-4 text-green-500 shrink-0" />
                ) : (
                  <Copy className="h-4 w-4 text-gray-400 shrink-0" />
                )}
              </Button>
            ))}
          </div>
        </div>
      )}
      
      <Button 
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-full w-12 h-12 shadow-xl bg-gray-900 hover:bg-gray-800 flex items-center justify-center float-right"
        aria-label="Toggle Editor Toolkit"
        suppressHydrationWarning
      >
        <Settings2 className="h-5 w-5 text-white" />
      </Button>
    </div>
  );
}
