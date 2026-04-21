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
  GraduationCap,
  Wrench,
  ExternalLink,
  Play,
} from "lucide-react";
import Link from "next/link";
import { ImageGallery } from "./image-gallery";
import { ImageSlideshow } from "./image-slideshow";
import { useState } from "react";

// Add interface for experience object to fix type errors
interface ExperienceItem {
  title: string;
  description: string;
  icon: React.ReactNode;
  tags: string[];
  date: string;
  company?: string;
  link?: string;
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

// YouTube Video Component with lazy loading
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

// PDF Preview Component
function PDFPreview({ url, title }: { url: string; title: string }) {
  const handleOpenPDF = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(url, "_blank");
  };

  return (
    <div className="relative overflow-hidden rounded-lg mb-4 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 shadow-lg">
      <div className="cursor-pointer relative w-full" onClick={handleOpenPDF}>
        {/* PDF Header */}
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

        {/* PDF Content Area with Background Image */}
        <div className="relative p-6 min-h-[400px] bg-white dark:bg-gray-900 flex flex-col items-center justify-center text-center">
          {/* Background Image - Faded */}
          <div className="absolute inset-0 flex items-center justify-center opacity-10 dark:opacity-5">
            <img
              src="/pics/reutlingen_university.png"
              alt="Reutlingen University"
              className="max-w-full max-h-full object-contain"
            />
          </div>

          {/* Content Layer */}
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
      </div>
    </div>
  );
}

export function Experience() {
  const experiences: ExperienceItem[] = [
    {
      title: "Quantitative Bitcoin Trader",
      description:
        "Im managing a 6 figure Bitcoin amount for others via self built, backtested trading algorithms.",
      icon: <Bitcoin className="h-6 w-6" />,
      tags: ["Python", "Trading", "Bitcoin"],
      date: "2024 - Present",
      link: "https://meshresearch.xyz",
      images: [
        {
          url: "/pics/quant_trading_analysis.png",
          description:
            "Quantitative Analysis of my Bitcoin Trading Bot compared to classic trading strategies.",
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
            imageUrl:
              "/pics/skoda1.jpg",
            description: "The final Škoda Klement eBike",
          },
          {
            imageUrl:
              "/pics/skoda2.jpg",
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
          url: "pics/ebike/ebike_insideview.jpg",
          description: "Inside view of the bike",
        },
        {
          url: "pics/ebike/ebike_elias_spotwelding.jpg",
          description:
            "Me, spotwelding the battery pack with a DIY spot welder out of a microwave",
        },
      ],
    },
  ];

  return (
    <section id="experience" className="py-20 bg-zinc-100 dark:bg-zinc-800/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-12">Experience</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {experiences.map((experience, i) =>
            experience.link ? (
              <Card key={i} className="h-full">
                <div
                  className="cursor-pointer h-full"
                  onClick={() => window.open(experience.link, "_blank")}
                >
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      {experience.icon}
                      <div className="flex-1">
                        <CardTitle className="flex items-center gap-2">
                          {experience.title}
                          <ExternalLink className="h-4 w-4 inline-block" />
                        </CardTitle>
                        <CardDescription>
                          {experience.company
                            ? `${experience.company} • ${experience.date}`
                            : experience.date}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                      {experience.description}
                    </p>
                    {experience.videoUrl && (
                      <div onClick={(e) => e.stopPropagation()}>
                        <YouTubeVideo
                          url={experience.videoUrl}
                          title={`Video for ${experience.title}`}
                        />
                      </div>
                    )}
                    {experience.pdfUrl && (
                      <div
                        className="mb-4"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <PDFPreview
                          url={experience.pdfUrl}
                          title={experience.title}
                        />
                      </div>
                    )}
                    {experience.slideshow && (
                      <div
                        className="mb-4"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ImageSlideshow slides={experience.slideshow.slides} />
                      </div>
                    )}
                    {experience.images && (
                      <div
                        className="mb-4"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ImageGallery images={experience.images} />
                      </div>
                    )}
                    <div className="flex flex-wrap gap-2">
                      {experience.tags.map((tag, i) => (
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
                    {experience.icon}
                    <div className="flex-1">
                      <CardTitle className="flex items-center gap-2">
                        {experience.title}
                      </CardTitle>
                      <CardDescription>
                        {experience.company
                          ? `${experience.company} • ${experience.date}`
                          : experience.date}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                    {experience.description}
                  </p>
                  {experience.videoUrl && (
                    <YouTubeVideo
                      url={experience.videoUrl}
                      title={`Video for ${experience.title}`}
                    />
                  )}
                  {experience.pdfUrl && (
                    <div className="mb-4">
                      <PDFPreview
                        url={experience.pdfUrl}
                        title={experience.title}
                      />
                    </div>
                  )}
                  {experience.slideshow && (
                    <div className="mb-4">
                      <ImageSlideshow slides={experience.slideshow.slides} />
                    </div>
                  )}
                  {experience.images && (
                    <div className="mb-4">
                      <ImageGallery images={experience.images} />
                    </div>
                  )}
                  <div className="flex flex-wrap gap-2">
                    {experience.tags.map((tag, i) => (
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
