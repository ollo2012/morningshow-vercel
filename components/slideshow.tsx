"use client";

import { Children, useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

export type ScrollRichtung = "horizontal" | "vertikal";

interface SlideshowProps {
  children: React.ReactNode;
  richtung?: ScrollRichtung;
  className?: string;
}

export default function Slideshow({
  children,
  richtung = "horizontal",
  className,
}: SlideshowProps) {
  const isHorizontal = richtung === "horizontal";
  const containerRef = useRef<HTMLDivElement>(null);
  const slideCount = Children.count(children);
  const [fortschritt, setFortschritt] = useState(0);

  const handleScroll = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;

    const scrollPos = isHorizontal ? el.scrollLeft : el.scrollTop;
    const scrollMax = isHorizontal
      ? el.scrollWidth - el.clientWidth
      : el.scrollHeight - el.clientHeight;

    if (scrollMax <= 0) {
      setFortschritt(100);
      return;
    }

    setFortschritt((scrollPos / scrollMax) * 100);
  }, [isHorizontal]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    handleScroll();
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const aktuelleSlide = Math.min(
    Math.round((fortschritt / 100) * (slideCount - 1)),
    slideCount - 1
  );

  const scrollToSlide = useCallback(
    (index: number) => {
      const el = containerRef.current;
      if (!el) return;
      if (isHorizontal) {
        el.scrollTo({ left: index * el.clientWidth, behavior: "smooth" });
      } else {
        el.scrollTo({ top: index * el.clientHeight, behavior: "smooth" });
      }
    },
    [isHorizontal]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === (isHorizontal ? "ArrowRight" : "ArrowDown")) {
        scrollToSlide(Math.min(aktuelleSlide + 1, slideCount - 1));
      } else if (e.key === (isHorizontal ? "ArrowLeft" : "ArrowUp")) {
        scrollToSlide(Math.max(aktuelleSlide - 1, 0));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [aktuelleSlide, slideCount, isHorizontal, scrollToSlide]);

  return (
    <div className="relative flex h-screen flex-col">
      {/* Progress bar */}
      <div className="px-2 pt-1 pb-0.5 sm:px-3 md:px-5">
        <Progress value={fortschritt} className="h-2" />
      </div>

      {/* Slides */}
      <div
        ref={containerRef}
        className={cn(
          "scrollbar-hide flex flex-1 snap-mandatory overflow-hidden",
          isHorizontal
            ? "flex-row snap-x overflow-x-auto"
            : "flex-col snap-y overflow-y-auto",
          className
        )}
      >
        {children}
      </div>

      {/* Bottom nav */}
      <nav className="flex items-center justify-center gap-6 px-2 pb-1 pt-0.5">
        <button
          onClick={() => scrollToSlide(aktuelleSlide - 1)}
          disabled={aktuelleSlide === 0}
          className="rounded-full bg-muted-foreground/30 p-2 text-background transition-opacity hover:opacity-80 disabled:opacity-10"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <button
          onClick={() => scrollToSlide(aktuelleSlide + 1)}
          disabled={aktuelleSlide === slideCount - 1}
          className="rounded-full bg-muted-foreground/30 p-2 text-background transition-opacity hover:opacity-80 disabled:opacity-10"
        >
          <ArrowRight className="h-5 w-5" />
        </button>
      </nav>
    </div>
  );
}
