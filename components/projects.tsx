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
  Cpu,
  Zap,
  ExternalLink,
  AirVent,
  Brain,
  BrainCircuit,
  BrainCircuitIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback } from "react";

// ProjectImage component for standardized project screenshots
interface ProjectImageProps {
  src: string | string[];
  alt: string;
}

function ImageCarousel({ images, alt }: { images: string[]; alt: string }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollPrev = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (emblaApi) emblaApi.scrollPrev();
    },
    [emblaApi]
  );

  const scrollNext = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (emblaApi) emblaApi.scrollNext();
    },
    [emblaApi]
  );

  return (
    <div className="relative" onClick={(e) => e.stopPropagation()}>
      <div className="overflow-hidden rounded-lg" ref={emblaRef}>
        <div className="flex">
          {images.map((src, index) => (
            <div key={index} className="relative aspect-[16/9] min-w-full">
              <Image
                src={src}
                alt={`${alt} ${index + 1}`}
                width={1200}
                height={675}
                className="object-cover w-full"
              />
            </div>
          ))}
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

function ProjectImage({ src, alt }: ProjectImageProps) {
  if (Array.isArray(src)) {
    return (
      <div className="mb-4" onClick={(e) => e.stopPropagation()}>
        <ImageCarousel images={src} alt={alt} />
      </div>
    );
  }

  return (
    <div
      className="relative aspect-[16/9] w-full overflow-hidden rounded-lg mb-4"
      onClick={(e) => e.stopPropagation()}
    >
      <Image
        src={src}
        alt={alt}
        width={1200}
        height={675}
        className="object-cover w-full"
      />
    </div>
  );
}

export function Projects() {
  const projects = [
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
      image: "/pics/websites/meshresearch.jpg",
    },
    {
      title: "Engineered BitChat",
      description: "Wrote a software for buying, selling, and sending Bitcoin. Also built bit-chat.me — the website for BitChat.",
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
      image: ["/pics/websites/bitchatme.jpg", "/pics/bitcoinbank2.png", "/pics/bitcoinbank3.png"],
    },
    {
      title: "Built an Electric ATV",
      description:
        "Custom-built electric atv (0-100km/h in ~3.6s; 60 kW with 6 kWh battery)",
      icon: <Car className="h-6 w-6" />,
      tags: ["Hardware", "Engineering", "Electric Vehicles", "Battery", "BMS"],
      date: "2019-2020",
      link: "https://endless-sphere.com/sphere/threads/my-60kw-electric-atv-quad-built.122397/#post-1787638",
      image: [
        "/pics/quad/quad11.jpeg",
        "/pics/quad/quad2.jpeg",
        "/pics/quad/quad7.jpg",
        "/pics/quad/quad9.jpeg",
        "/pics/quad/quad6.jpg",
      ],
    },
    {
      title: "Artifical Consciousness Model",
      icon: <Brain className="h-6 w-6" />,
      description:
        "Built a self-thinking consciousness (not a LLM or GPT wrapper or similar). Basically a try, to copy the systematic behavior of a human mind: It always tries to find the best 'path' to be happy by going along 'paths', depending on how much energy it has, what the predicted reward is, how much energy it takes to go there (e.g. the further away from the 'reward-honeypot' like eat, sleep, regerate, the higher the total energy cost is). It never stops thinking, has its own motivation and finds the best 'path' / next step to do through associative thoughts and also has emotions as model parameters. You can have a conversation with it, but it needs more data to know more.",
      link: "https://ai.eliaspfeffer.de",
      tags: ["AGI"],
      date: "2025-now",
      image: "/pics/ai.png",
    },
  ];

  return (
    <section id="projects" className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-12">Featured Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, i) =>
            project.link ? (
              <Card key={i} className="h-full">
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
              <Card key={i}>
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
