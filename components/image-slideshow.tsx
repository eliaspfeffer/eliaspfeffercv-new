"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Slide {
  imageUrl: string;
  description?: string;
}

interface ImageSlideshowProps {
  slides: Slide[];
}

export function ImageSlideshow({ slides }: ImageSlideshowProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hasCompletedAutoplay, setHasCompletedAutoplay] = useState(false);

  const nextSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const previousSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const element = rootRef.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.35 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (
      !isInView ||
      isHovered ||
      hasCompletedAutoplay ||
      slides.length <= 1 ||
      currentSlide >= slides.length - 1
    ) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setCurrentSlide((prev) => {
        const nextIndex = prev + 1;

        return nextIndex;
      });
    }, 2000);

    return () => window.clearTimeout(timeoutId);
  }, [currentSlide, hasCompletedAutoplay, isHovered, isInView, slides.length]);

  useEffect(() => {
    if (
      !isInView ||
      isHovered ||
      hasCompletedAutoplay ||
      slides.length <= 1 ||
      currentSlide !== slides.length - 1
    ) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setCurrentSlide(0);
      setHasCompletedAutoplay(true);
    }, 2000);

    return () => window.clearTimeout(timeoutId);
  }, [currentSlide, hasCompletedAutoplay, isHovered, isInView, slides.length]);

  return (
    <div
      ref={rootRef}
      className="relative w-full"
      onClick={(e) => e.stopPropagation()}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-full overflow-hidden rounded-lg">
        <div
          className="relative overflow-hidden rounded-lg"
          style={{
            width: "100%",
            paddingBottom: "0",
            minHeight: "300px",
          }}
        >
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slides.map((slide, index) => (
              <div
                key={slide.imageUrl}
                className="relative flex min-w-full items-center justify-center"
                style={{ minHeight: "300px" }}
              >
                <Image
                  src={slide.imageUrl || "/placeholder.svg"}
                  alt={`Slide ${index + 1}`}
                  width={1200}
                  height={800}
                  className="h-auto w-full rounded-lg"
                  style={{
                    maxWidth: "100%",
                    objectFit: "contain",
                    background: "transparent",
                  }}
                  priority={index === 0}
                />
              </div>
            ))}
          </div>
        </div>
        {slides.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white/90 dark:bg-zinc-800/80 dark:hover:bg-zinc-800/90"
              onClick={previousSlide}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white/90 dark:bg-zinc-800/80 dark:hover:bg-zinc-800/90"
              onClick={nextSlide}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </>
        )}
      </div>
      {slides[currentSlide].description && (
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          {slides[currentSlide].description}
        </p>
      )}
      {slides.length > 1 && (
        <div className="mt-2 flex justify-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`h-1.5 w-1.5 rounded-full transition-all ${
                index === currentSlide
                  ? "bg-primary w-3"
                  : "bg-zinc-300 dark:bg-zinc-600"
              }`}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentSlide(index);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
