import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import { urlForImage } from "@/lib/sanity";
import { cn } from "@/lib/utils";

// Custom Block Renderers
const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="mb-6 text-lg leading-relaxed text-gray-800 text-justify">{children}</p>,
    h2: ({ children }) => <h2 className="mt-12 mb-6 text-3xl font-bold font-heading text-gray-900">{children}</h2>,
    h3: ({ children }) => <h3 className="mt-10 mb-4 text-2xl font-bold font-heading text-gray-900">{children}</h3>,
    h4: ({ children }) => <h4 className="mt-8 mb-4 text-xl font-bold font-heading text-gray-900">{children}</h4>,
    blockquote: ({ children }) => (
      <blockquote className="my-8 border-l-4 border-brand pl-6 italic text-gray-700 bg-gray-50 py-4 pr-4 rounded-r-lg">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="mb-6 ml-6 list-disc space-y-2 text-lg text-gray-800">{children}</ul>,
    number: ({ children }) => <ol className="mb-6 ml-6 list-decimal space-y-2 text-lg text-gray-800">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="pl-2">{children}</li>,
    number: ({ children }) => <li className="pl-2">{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-gray-900">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-sm text-brand">
        {children}
      </code>
    ),
    link: ({ children, value }) => {
      const rel = !value.href.startsWith("/") ? "noreferrer noopener" : undefined;
      const target = value.blank ? "_blank" : undefined;
      return (
        <Link 
          href={value.href} 
          rel={rel} 
          target={target} 
          className="font-medium text-brand underline decoration-brand/30 underline-offset-4 transition-colors hover:decoration-brand"
        >
          {children}
        </Link>
      );
    },
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <figure className="my-10 w-full overflow-hidden rounded-xl bg-gray-100">
          <div className="relative w-full aspect-video sm:aspect-[16/9]">
            <Image
              src={urlForImage(value).url()}
              alt={value.alt || "Article image"}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>
          {value.caption && (
            <figcaption className="mt-3 text-center text-sm text-gray-500 pb-3">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
    youtube: ({ value }) => {
      if (!value?.url) return null;
      
      // Extract video ID from YouTube URL
      const getYouTubeId = (url: string) => {
        const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&]{11})/);
        return match ? match[1] : null;
      };
      
      const videoId = getYouTubeId(value.url);
      
      if (!videoId) return null;

      return (
        <div className="my-10 aspect-video w-full overflow-hidden rounded-xl bg-black">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?rel=0`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="h-full w-full border-0"
          />
        </div>
      );
    },
    codeBlock: ({ value }) => {
      if (!value?.code) return null;
      return (
        <div className="my-8 overflow-hidden rounded-xl bg-gray-900">
          <div className="flex items-center justify-between bg-gray-800 px-4 py-2">
            <span className="text-xs font-medium text-gray-300 uppercase tracking-wider">
              {value.language || 'code'}
            </span>
          </div>
          <div className="overflow-x-auto p-4">
            <pre className="text-sm font-mono text-gray-100">
              <code>{value.code}</code>
            </pre>
          </div>
        </div>
      );
    },
    customTable: ({ value }) => {
      if (!value?.rows || value.rows.length === 0) return null;
      return (
        <div className="my-8 overflow-x-auto">
          <table className="w-full border-collapse border border-gray-200 text-left text-sm">
            <tbody>
              {value.rows.map((row: { _key?: string; cells?: string[] }, rIdx: number) => (
                <tr key={row._key || rIdx} className="border-b border-gray-200 hover:bg-gray-50">
                  {row.cells?.map((cell: string, cIdx: number) => {
                    const isHeader = rIdx === 0;
                    const CellTag = isHeader ? 'th' : 'td';
                    return (
                      <CellTag 
                        key={cIdx} 
                        className={cn(
                          "px-4 py-3 border-r border-gray-200 last:border-r-0",
                          isHeader && "bg-gray-100 font-semibold text-gray-900"
                        )}
                      >
                        {cell}
                      </CellTag>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
  },
};

interface RichTextProps {
  content: unknown[];
  className?: string;
}

export function RichText({ content, className }: RichTextProps) {
  if (!content) return null;
  return (
    <div className={cn("max-w-none break-words", className)}>
      <PortableText value={content} components={components} />
    </div>
  );
}
