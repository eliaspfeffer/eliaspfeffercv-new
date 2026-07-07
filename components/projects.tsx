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
  Briefcase,
  Car,
  Zap,
  ExternalLink,
  Brain,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Play,
  Wrench,
} from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { ImageGallery } from "./image-gallery";
import { ImageSlideshow } from "./image-slideshow";

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
  company?: string;
  link?: string;
  image?: ProjectImageProps["src"];
  videoUrl?: string;
  pdfUrl?: string;
  slideshow?: {
    slides: {
      imageUrl: string;
      description: string;
    }[];
  };
  images?: {
    url: string;
    description: string;
  }[];
}

function YouTubeVideo({ url, title }: { url: string; title: string }) {
  const videoId = url.split("v=")[1]?.split("&")[0];
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  const handleOpenVideo = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(url, "_blank");
  };

  return (
    <div className="relative overflow-hidden rounded-lg aspect-video mb-4">
      <div
        className="cursor-pointer relative w-full h-full"
        onClick={handleOpenVideo}
      >
        <img
          src={thumbnailUrl}
          alt={`Thumbnail for ${title}`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
          <div className="bg-red-600 rounded-full p-4 shadow-lg">
            <Play className="h-8 w-8 text-white" fill="white" />
          </div>
          <span className="absolute bottom-4 text-white font-medium bg-black/50 px-3 py-1 rounded-full text-sm">
            Auf YouTube ansehen
          </span>
        </div>
      </div>
    </div>
  );
}

function PDFPreview({ url, title }: { url: string; title: string }) {
  const pdfHref = encodeURI(url);
  const handlePDFClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className="relative overflow-hidden rounded-lg mb-4 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 shadow-lg">
      <a
        href={pdfHref}
        target="_blank"
        rel="noopener noreferrer"
        className="cursor-pointer relative block w-full"
        onClick={handlePDFClick}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-red-600 rounded flex items-center justify-center">
              <span className="text-white text-xs font-bold">PDF</span>
            </div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {title}
            </span>
          </div>
          <ExternalLink className="h-4 w-4 text-gray-500" />
        </div>
        <div className="relative p-6 min-h-[400px] bg-white dark:bg-gray-900 flex flex-col items-center justify-center text-center">
          <div className="absolute inset-0 flex items-center justify-center opacity-10 dark:opacity-5">
            <img
              src="/pics/reutlingen_university.png"
              alt="Reutlingen University"
              className="max-w-full max-h-full object-contain"
            />
          </div>
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-4">
              <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center">
                <span className="text-white text-sm font-bold">PDF</span>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2 bg-white/80 dark:bg-gray-900/80 px-3 py-1 rounded">
              Bachelor Degree Certificate
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4 bg-white/80 dark:bg-gray-900/80 px-3 py-1 rounded">
              Click here to open the full certificate
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors shadow-lg">
              <ExternalLink className="h-4 w-4" />
              open PDF
            </div>
          </div>
        </div>
      </a>
    </div>
  );
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

function ProjectMedia({
  project,
  paused,
}: {
  project: Project;
  paused: boolean;
}) {
  return (
    <>
      {project.image && (
        <div className="mb-4" onClick={(e) => e.stopPropagation()}>
          <ProjectImage
            src={project.image}
            alt={`Screenshot of ${project.title}`}
            paused={paused}
          />
        </div>
      )}
      {project.videoUrl && (
        <div onClick={(e) => e.stopPropagation()}>
          <YouTubeVideo
            url={project.videoUrl}
            title={`Video for ${project.title}`}
          />
        </div>
      )}
      {project.pdfUrl && (
        <div className="mb-4" onClick={(e) => e.stopPropagation()}>
          <PDFPreview url={project.pdfUrl} title={project.title} />
        </div>
      )}
      {project.slideshow && (
        <div className="mb-4" onClick={(e) => e.stopPropagation()}>
          <ImageSlideshow slides={project.slideshow.slides} />
        </div>
      )}
      {project.images && (
        <div className="mb-4" onClick={(e) => e.stopPropagation()}>
          <ImageGallery images={project.images} />
        </div>
      )}
    </>
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
      title: "Built an Embodied World Model Architecture",
      icon: <Brain className="h-6 w-6" />,
      description:
        "Built a self-thinking consciousness / embodied world model architecture for humanoid robots (not a LLM or GPT wrapper or similar)",
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
      image: [
        "/pics/screening-screenshot.png",
        {
          url: "/pics/quant_trading_analysis.png",
          objectFit: "contain",
        },
      ],
    },
    {
      title: "Engineered BitChat",
      description:
        "Wrote a software for buying, selling, and sending money / bitcoin / stablecoins by simply writing a text message.",
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
    {
      title: "Škoda Klement eBike Project",
      company: "BFO Mobility / ŠKODA",
      description:
        "Helped with the development of the first prototype and built the battery system for the Škoda Klement eBike project.",
      icon: <Wrench className="h-6 w-6" />,
      tags: ["Hardware", "Prototyping", "Engineering"],
      date: "2018 - 2019",
      slideshow: {
        slides: [
          {
            imageUrl: "/pics/skoda1.jpg",
            description: "The final Škoda Klement eBike",
          },
          {
            imageUrl: "/pics/skoda2.jpg",
            description:
              "Škoda Klement eBike prototype. My part at this stage: everything around the (double-) battery",
          },
        ],
      },
    },
    {
      title: "Built a DIY eBike Kit",
      company: "Personal Project",
      description: "Developed and sold a custom eBike conversion kit",
      icon: <Wrench className="h-6 w-6" />,
      tags: ["Hardware", "Engineering", "Entrepreneurship"],
      date: "2017 - 2018",
      link: "https://www.linkedin.com/in/eliaspfeffer/details/projects/243288495/multiple-media-viewer/?profileId=ACoAADJpVdABKWLKeH7pZl3V_mP7bDRdpWwDyzM&treasuryMediaId=1722620527942",
      images: [
        {
          url: "/pics/DIY_ebike_kit.png",
          description: "The DIY eBike Kit",
        },
        {
          url: "/pics/DIY_ebike_kit2.jpg",
          description:
            "Here you can see cooling fins for the rear motor for faster cooling",
        },
      ],
    },
    {
      title: "Built a High-Performance DIY Electric Bike",
      company: "Personal Project",
      description:
        "Built a custom electric bike achieving 0-100km/h in ~4s with 22kW power and a custom 3kWh 20s15p Li-Ion Battery",
      icon: <Wrench className="h-6 w-6" />,
      tags: ["Hardware", "Engineering"],
      date: "2016 - 2017",
      link: "https://www.linkedin.com/in/eliaspfeffer/details/projects/urn:li:fsd_profileProject:(ACoAADJpVdABKWLKeH7pZl3V_mP7bDRdpWwDyzM,403655932)/treasury/",
      images: [
        {
          url: "/pics/ebike_hp1.jpg",
          description: "The completed high-performance electric bike",
        },
        {
          url: "/pics/ebike_hp2.jpg",
          description: "Close-up view of the bike",
        },
        {
          url: "/pics/ebike_spotwelding.jpg",
          description:
            "Custom battery pack assembly with nickel strips and 18650 cells",
        },
        {
          url: "/pics/ebike/ebike_insideview.jpg",
          description: "Inside view of the bike",
        },
        {
          url: "/pics/ebike/ebike_elias_spotwelding.jpg",
          description:
            "Me, spotwelding the battery pack with a DIY spot welder out of a microwave",
        },
      ],
    },
    {
      title: 'TESLA "25 Guns Taskforce" Working Student',
      company: "TESLA - Berlin",
      description:
        "I've met Elon & asked him for a job, then got hired for the 25 Guns Taskforce and saved Tesla €1.1M in construction damage prevention. Then I've helped accelerate the construction of the GIGA Berlin Factory, reported directly to E, assisted in the IPCEI-funding program setup for Tesla and helped hiring the other 25 Guns Taskforce members.",
      icon: <Briefcase className="h-6 w-6" />,
      tags: ["Project Management", "Construction", "Problem Solving"],
      date: "10/2020 - 02/2021",
      link: "https://www.tesla.com/",
      videoUrl: "https://www.youtube.com/watch?v=My6_QzM-Tlk",
    },
    {
      title: "Bachelor of Engineering (B.Eng.)",
      company: "Mechatronics with focus on automation",
      description:
        "I'm an Engineer in Mechatronics: combining mechanical engineering, electronics, and computer science.",
      icon: <GraduationCap className="h-6 w-6" />,
      tags: [
        "Mechatronics",
        "Automation",
        "Engineering",
        "C++",
        "CAD (SolidWorks)",
        "Assembler",
        "Verilog",
      ],
      date: "2019 - 2025",
      pdfUrl: "/pics/Elias Bachelor Degree.pdf",
    },
    {
      title: "Designed and 3D printed a Janko Piano",
      description:
        "A 3d printed Janko Piano with 3d printed keys and a 3d printed frame",
      icon: <Wrench className="h-6 w-6" />,
      tags: ["Engineering", "3D Printing", "CAD"],
      date: "2025",
      link: "https://en.wikipedia.org/wiki/Jank%C3%B3_keyboard",
      image: [
        {
          url: "/pics/janko_piano_solid_works_3D_print1.png",
          objectFit: "contain",
        },
        {
          url: "/pics/janko_piano_solid_works_3D_rendering.png",
          objectFit: "contain",
        },
        {
          url: "/pics/janko_piano_solid_works_3D_print2.png",
          objectFit: "contain",
        },
      ],
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
                        <CardDescription>
                          {project.company
                            ? `${project.company} • ${project.date}`
                            : project.date}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ProjectMedia
                      project={project}
                      paused={hoveredProject === i}
                    />
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
                      <CardDescription>
                        {project.company
                          ? `${project.company} • ${project.date}`
                          : project.date}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ProjectMedia
                    project={project}
                    paused={hoveredProject === i}
                  />
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
