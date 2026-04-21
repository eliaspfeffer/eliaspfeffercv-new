"use client";

import { useState, useEffect } from "react";
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
  const [currentImage, setCurrentImage] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>([]);

  // Initialize images loaded state
  useEffect(() => {
    setImagesLoaded(new Array(images.length).fill(false));
  }, [images.length]);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const previousImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  // Preload all images when component mounts
  useEffect(() => {
    images.forEach((image, index) => {
      const imgElement = document.createElement("img");
      imgElement.src = image.url;
      imgElement.onload = () => {
        setImagesLoaded((prev) => {
          const newState = [...prev];
          newState[index] = true;
          return newState;
        });
      };
    });
  }, [images]);

  return (
    <div className="space-y-4" onClick={(e) => e.stopPropagation()}>
      <div className="relative w-full overflow-hidden rounded-lg">
        {images.length > 0 ? (
          <>
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
                src={images[currentImage].url || "/placeholder.svg"}
                alt={images[currentImage].description || "Project image"}
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

              {/* Hidden preloader for the next images */}
              <div className="hidden">
                {images.map(
                  (image, index) =>
                    index !== currentImage && (
                      <Image
                        key={`preload-${index}`}
                        src={image.url}
                        alt="Preloaded image"
                        width={1}
                        height={1}
                        priority={index === (currentImage + 1) % images.length}
                        loading="eager"
                      />
                    )
                )}
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
