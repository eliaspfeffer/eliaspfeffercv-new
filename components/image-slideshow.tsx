"use client";

import { useState, useEffect } from "react";
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
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesLoaded, setSlidesLoaded] = useState<boolean[]>([]);

  // Initialize slides loaded state
  useEffect(() => {
    setSlidesLoaded(new Array(slides.length).fill(false));
  }, [slides.length]);

  const nextSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const previousSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Preload all slides when component mounts
  useEffect(() => {
    slides.forEach((slide, index) => {
      const imgElement = document.createElement("img");
      imgElement.src = slide.imageUrl;
      imgElement.onload = () => {
        setSlidesLoaded((prev) => {
          const newState = [...prev];
          newState[index] = true;
          return newState;
        });
      };
    });
  }, [slides]);

  return (
    <div className="relative w-full" onClick={(e) => e.stopPropagation()}>
      <div className="relative w-full overflow-hidden rounded-lg">
        <div
          className="relative"
          style={{
            width: "100%",
            paddingBottom: "0",
            height: "auto",
            minHeight: "300px",
          }}
        >
          <Image
            src={slides[currentSlide].imageUrl || "/placeholder.svg"}
            alt={`Slide ${currentSlide + 1}`}
            fill={false}
            width={1200}
            height={800}
            className="w-full h-auto rounded-lg"
            style={{
              maxWidth: "100%",
              height: "auto",
              objectFit: "contain",
              background: "transparent",
            }}
            priority={true}
          />

          {/* Hidden preloader for all slides */}
          <div className="hidden">
            {slides.map(
              (slide, index) =>
                index !== currentSlide && (
                  <Image
                    key={`preload-${index}`}
                    src={slide.imageUrl}
                    alt="Preloaded slide"
                    width={1}
                    height={1}
                    priority={index === (currentSlide + 1) % slides.length}
                    loading="eager"
                  />
                )
            )}
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
