"use client";

import * as React from "react";

export function ArticleProgress() {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const updateScroll = () => {
      // Calculate scroll progress
      const currentScrollY = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      
      if (scrollHeight - clientHeight === 0) {
        setProgress(100);
      } else {
        const scrolled = (currentScrollY / (scrollHeight - clientHeight)) * 100;
        setProgress(scrolled);
      }
    };

    window.addEventListener("scroll", updateScroll, { passive: true });
    updateScroll();

    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-1 z-[100] bg-transparent">
      <div 
        className="h-full bg-brand transition-all duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
