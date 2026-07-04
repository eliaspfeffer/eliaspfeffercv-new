"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ImageOff } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Image {
  url: string;
  description?: string;
}

interface ImageGalleryProps {
  images: Image[];
}

export function ImageGallery({ images }: ImageGalleryProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hasCompletedAutoplay, setHasCompletedAutoplay] = useState(false);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const previousImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
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
      images.length <= 1 ||
      currentImage >= images.length - 1
    ) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setCurrentImage((prev) => {
        const nextIndex = prev + 1;

        return nextIndex;
      });
    }, 2000);

    return () => window.clearTimeout(timeoutId);
  }, [currentImage, hasCompletedAutoplay, images.length, isHovered, isInView]);

  useEffect(() => {
    if (
      !isInView ||
      isHovered ||
      hasCompletedAutoplay ||
      images.length <= 1 ||
      currentImage !== images.length - 1
    ) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setCurrentImage(0);
      setHasCompletedAutoplay(true);
    }, 2000);

    return () => window.clearTimeout(timeoutId);
  }, [currentImage, hasCompletedAutoplay, images.length, isHovered, isInView]);

  return (
    <div
      ref={rootRef}
      className="space-y-4"
      onClick={(e) => e.stopPropagation()}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-full overflow-hidden rounded-lg">
        {images.length > 0 ? (
          <>
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
                style={{ transform: `translateX(-${currentImage * 100}%)` }}
              >
                {images.map((image, index) => (
                  <div
                    key={image.url}
                    className="relative flex min-w-full items-center justify-center"
                    style={{ minHeight: "300px" }}
                  >
                    <Image
                      src={image.url || "/placeholder.svg"}
                      alt={image.description || `Project image ${index + 1}`}
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
            {images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white/90 dark:bg-zinc-800/80 dark:hover:bg-zinc-800/90"
                  onClick={previousImage}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white/90 dark:bg-zinc-800/80 dark:hover:bg-zinc-800/90"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </>
            )}
          </>
        ) : (
          <div className="flex h-64 items-center justify-center">
            <ImageOff className="h-12 w-12 text-zinc-400" />
          </div>
        )}
      </div>
      {images[currentImage]?.description && (
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          {images[currentImage].description}
        </p>
      )}
      {images.length > 1 && (
        <div className="flex justify-center gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              className={`h-1.5 w-1.5 rounded-full transition-all ${
                index === currentImage
                  ? "bg-primary w-3"
                  : "bg-zinc-300 dark:bg-zinc-600"
              }`}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentImage(index);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
