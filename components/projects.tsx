"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Bitcoin,
  Car,
  Zap,
  ExternalLink,
  Brain,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

// ProjectImage component for standardized project screenshots
interface ProjectImageProps {
  src: string | ImageObject | (string | ImageObject)[];
  alt: string;
  paused?: boolean;
}

interface ImageObject {
  url: string;
  objectFit?: "cover" | "contain";
}

interface Project {
  title: string;
  description: string;
  icon: ReactNode;
  tags: string[];
  date: string;
  link?: string;
  image?: ProjectImageProps["src"];
}

function ImageCarousel({
  images,
  alt,
  paused = false,
}: {
  images: (string | ImageObject)[];
  alt: string;
  paused?: boolean;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasCompletedAutoplay, setHasCompletedAutoplay] = useState(false);

  const scrollPrev = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    },
    [images.length]
  );

  const scrollNext = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      setCurrentIndex((prev) => (prev + 1) % images.length);
    },
    [images.length]
  );

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
      paused ||
      !isInView ||
      hasCompletedAutoplay ||
      images.length <= 1 ||
      currentIndex >= images.length - 1
    ) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setCurrentIndex((prev) => {
        const nextIndex = prev + 1;

        return nextIndex;
      });
    }, 2000);

    return () => window.clearTimeout(timeoutId);
  }, [currentIndex, hasCompletedAutoplay, images.length, isInView, paused]);

  useEffect(() => {
    if (
      paused ||
      !isInView ||
      hasCompletedAutoplay ||
      images.length <= 1 ||
      currentIndex !== images.length - 1
    ) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setCurrentIndex(0);
      setHasCompletedAutoplay(true);
    }, 2000);

    return () => window.clearTimeout(timeoutId);
  }, [currentIndex, hasCompletedAutoplay, images.length, isInView, paused]);

  return (
    <div
      ref={rootRef}
      className="relative"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="overflow-hidden rounded-lg">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => {
            const src = typeof image === "string" ? image : image.url;
            const objectFit =
              typeof image === "string" ? "cover" : image.objectFit || "cover";

            return (
              <div
                key={index}
                className={`relative min-w-full overflow-hidden rounded-lg ${
                  objectFit === "contain" ? "aspect-[4/3]" : "aspect-[16/9]"
                }`}
              >
                <Image
                  src={src}
                  alt={`${alt} ${index + 1}`}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className={
                    objectFit === "contain"
                      ? "rounded-lg object-contain"
                      : "rounded-lg object-cover"
                  }
                />
              </div>
            );
          })}
        </div>
      </div>
      <button
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-black/80 rounded-full p-2 hover:bg-white/90 dark:hover:bg-black/90"
        onClick={scrollPrev}
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-black/80 rounded-full p-2 hover:bg-white/90 dark:hover:bg-black/90"
        onClick={scrollNext}
      >
        <ChevronRight className="h-6 w-6" />
      </button>
    </div>
  );
}

function ProjectImage({ src, alt, paused = false }: ProjectImageProps) {
  if (Array.isArray(src)) {
    return (
      <div className="mb-4" onClick={(e) => e.stopPropagation()}>
        <ImageCarousel images={src} alt={alt} paused={paused} />
      </div>
    );
  }

  return (
    <div
      className="relative aspect-[16/9] w-full overflow-hidden rounded-lg mb-4"
      onClick={(e) => e.stopPropagation()}
    >
      <Image
        src={typeof src === "string" ? src : src.url}
        alt={alt}
        width={1200}
        height={675}
        className={`w-full ${
          typeof src !== "string" && src.objectFit === "contain"
            ? "object-contain"
            : "object-cover"
        }`}
      />
    </div>
  );
}

export function Projects() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const projects: Project[] = [
    {
      title: "Built an Electric ATV",
      description:
        "Custom-built electric atv (0-100km/h in ~3.6s; 60 kW with 6 kWh battery)",
      icon: <Car className="h-6 w-6" />,
      tags: ["Hardware", "Engineering", "Electric Vehicles", "Battery", "BMS"],
      date: "2019-2020",
      link: "https://endless-sphere.com/sphere/threads/my-60kw-electric-atv-quad-built.122397/#post-1787638",
      image: [
        {
          url: "/pics/quad/quad11.jpeg",
          objectFit: "contain",
        },
        {
          url: "/pics/quad/quad2.jpeg",
          objectFit: "contain",
        },
        {
          url: "/pics/quad/quad7.jpg",
          objectFit: "contain",
        },
        {
          url: "/pics/quad/quad9.jpeg",
          objectFit: "contain",
        },
        {
          url: "/pics/quad/quad6.jpg",
          objectFit: "contain",
        },
      ],
    },
    {
      title: "Built Embodied World Model Architecture",
      icon: <Brain className="h-6 w-6" />,
      description:
        "Built a self-thinking consciousness (not a LLM or GPT wrapper or similar) architecture for humanoids / embodied world model architecture",
      link: "https://dontkillmy.computer",
      tags: ["AGI"],
      date: "2025-now",
      image: "/pics/dkmc-screenshot.png",
    },
    {
      title: "Built a profitable trading algorithm",
      description:
        "Wrote a Trading Algorithm, which outperforms every other commonly known trading strategy like DCA (Dollar Cost Averaging), Hodl (buy and never sell), Lump Summing (buy all at once), etc..",
      icon: <Bitcoin className="h-6 w-6" />,
      tags: [
        "Python",
        "Trading",
        "JavaScript",
        "CSS",
        "HTML",
        "Next.js",
        "Tailwind CSS",
        "MongoDB",
      ],
      date: "2024-now",
      link: "https://meshresearch.xyz",
      image: "/pics/screening-screenshot.png",
    },
    {
      title: "Engineered BitChat",
      description: "Wrote a software for buying, selling, and sending Bitcoin by writing a text message. Also built bit-chat.me — the website for BitChat.",
      icon: <Zap className="h-6 w-6" />,
      tags: [
        "Java",
        "Python",
        "Backend",
        "Frontend",
        "Server",
        "Golang",
        "Spring-Boot",
      ],
      date: "2023-now",
      link: "https://bit-chat.me",
      image: "/pics/websites/bitchatme.jpg",
    },
  ];

  return (
    <section id="projects" className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-12">Featured Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, i) =>
            project.link ? (
              <Card
                key={i}
                className="h-full"
                onMouseEnter={() => setHoveredProject(i)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <div
                  className="cursor-pointer h-full"
                  onClick={() => window.open(project.link, "_blank")}
                >
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      {project.icon}
                      <div className="flex-grow">
                        <CardTitle className="flex items-center gap-2">
                          {project.title}
                          <ExternalLink className="h-4 w-4 inline-block" />
                        </CardTitle>
                        <CardDescription>{project.date}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {project.image && (
                      <div
                        className="mb-4"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ProjectImage
                          src={project.image}
                          alt={`Screenshot of ${project.title}`}
                          paused={hoveredProject === i}
                        />
                      </div>
                    )}
                    <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, i) => (
                        <Badge key={i} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </div>
              </Card>
            ) : (
              <Card
                key={i}
                onMouseEnter={() => setHoveredProject(i)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <CardHeader>
                  <div className="flex items-center gap-2">
                    {project.icon}
                    <div className="flex-grow">
                      <CardTitle className="flex items-center gap-2">
                        {project.title}
                      </CardTitle>
                      <CardDescription>{project.date}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {project.image && (
                    <ProjectImage
                      src={project.image}
                      alt={`Screenshot of ${project.title}`}
                      paused={hoveredProject === i}
                    />
                  )}
                  <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, i) => (
                      <Badge key={i} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )
          )}
        </div>
      </div>
    </section>
  );
}
