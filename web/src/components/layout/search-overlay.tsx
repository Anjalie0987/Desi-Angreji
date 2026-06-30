"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Search, X, Clock } from "lucide-react";
import { Button } from "../ui/button";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onClose();
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-background/95 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="flex items-center justify-between border-b px-4 py-4 sm:px-6 lg:px-8">
        <form 
          className="flex flex-1 items-center gap-2" 
          onSubmit={handleSearch}
        >
          <Search className="h-5 w-5 text-muted" />
          <input
            ref={inputRef}
            type="search"
            placeholder="Search news, topics, and authors..."
            className="flex-1 bg-transparent px-2 py-2 text-lg outline-none placeholder:text-muted focus:ring-0 sm:text-xl font-heading"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </form>
        <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close search">
          <X className="h-6 w-6" />
        </Button>
      </div>

      <div className="mx-auto w-full max-w-4xl p-6 sm:p-8">
        {!query ? (
          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted">
                Popular Categories
              </h3>
              <div className="flex flex-wrap gap-2">
                {["Technology", "Entertainment", "Politics", "Sports", "Business"].map((cat) => (
                  <Button key={cat} variant="outline" size="sm" className="rounded-full">
                    {cat}
                  </Button>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted">
                Recent Searches
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-sm text-foreground hover:text-brand cursor-pointer">
                  <Clock className="h-4 w-4 text-muted" /> Desi innovations 2024
                </li>
                <li className="flex items-center gap-2 text-sm text-foreground hover:text-brand cursor-pointer">
                  <Clock className="h-4 w-4 text-muted" /> Bollywood updates
                </li>
                <li className="flex items-center gap-2 text-sm text-foreground hover:text-brand cursor-pointer">
                  <Clock className="h-4 w-4 text-muted" /> Election results
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center text-muted">
            <Search className="h-10 w-10 mb-4 opacity-50" />
            <p>Press Enter to search for &quot;{query}&quot;</p>
          </div>
        )}
      </div>
    </div>
  );
}
