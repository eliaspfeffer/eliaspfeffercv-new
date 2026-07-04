"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

// Definiere Schnittstellen für die Bildtypen
interface ImageObject {
  url: string;
  position?: string;
  objectFit?: "cover" | "contain";
}

// Definiere ein Interface für die Projekt-Objekte
interface Project {
  title: string;
  description: string;
  link?: string;
  tags: string[];
  isFromOtherSection?: boolean;
  image?: string | ImageObject | (string | ImageObject)[];
}

// Füge die ImageCarousel-Komponente hinzu
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
            const position =
              typeof image === "string"
                ? "center center"
                : image.position || "center center";

            return (
              <div
                key={index}
                className="relative min-w-full"
                style={{
                  minHeight: "300px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  src={src}
                  alt={`${alt} ${index + 1}`}
                  width={1200}
                  height={800}
                  className="w-auto h-auto rounded-lg max-w-full max-h-[500px]"
                  style={{ objectFit: "contain", objectPosition: position }}
                  loading="lazy"
                />
              </div>
            );
          })}
        </div>
      </div>

      {images.length > 1 && (
        <>
          <button
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-black/80 rounded-full p-2 hover:bg-white/90 dark:hover:bg-black/90 z-30"
            onClick={scrollPrev}
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-black/80 rounded-full p-2 hover:bg-white/90 dark:hover:bg-black/90 z-30"
            onClick={scrollNext}
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}
    </div>
  );
}

export function OtherProjects({ filterTag }: { filterTag?: string } = {}) {
  const allTags = [
    "Bitcoin",
    "AGI",
    "Engineering",
    "Software Development",
    "other",
  ];
  // Separate state for project filtering and newsletter
  const [selectedProjectTags, setSelectedProjectTags] = useState<string[]>([]);
  const [selectedNewsletterTags, setSelectedNewsletterTags] = useState<
    string[]
  >([]);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  // Combined projects including those from Experience and Featured Projects sections
  const projects: Project[] = [
    // === TOP IMPORTANT ===
    {
      title: "Built an AI-CTO",
      description: "Get a complete AI-powered technical department — frontend, backend, DevOps, and QA — with Claude Code as your Chief Technology Officer. One invoice. Ships to production. You only hear from us when it's done.",
      link: "https://cto.eliaspfeffer.de/",
      tags: ["Software Development"],
      image: "/pics/websites/cto.jpg",
    },
    {
      title: "Designed and 3D printed a Janko Piano",
      description:
        "A 3d printed Janko Piano with 3d printed keys and a 3d printed frame",
      tags: ["Engineering", "other"],
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
    {
      title: "Built an Aquaponic System",
      description:
        "Built an aquaponic system combining fish farming with hydroponic plant cultivation in a closed-loop ecosystem.",
      tags: ["Engineering", "other"],
      link: "https://www.ghanaverein-allensbach.de/index.php/en/our-projects/projects-to-date/64-fishery-and-aquaponics-in-allensbach-too",
      image: [
        {
          url: "/pics/aquaponic3.jpg",
          objectFit: "contain",
        },
        {
          url: "/pics/aquaponic.jpg",
          objectFit: "contain",
        },
        {
          url: "/pics/aquaponic2.jpg",
          objectFit: "contain",
        },
      ],
    },
    {
      title: "Wrote a Book about self repeating systems",
      description: "My summary of the most common systems of the world",
      link: "https://docs.google.com/document/d/13zCmPsjzuSZhTZ4gD9OR0kGw3jC52drX1SdriTpYrUo/edit?usp=sharing",
      tags: ["other"],
      image: [
        {
          url: "/pics/systeme_book.png",
          position: "center",
          objectFit: "contain",
        },
      ],
    },
    // === VERY IMPORTANT ===
    {
      title: "Minecraft HUD",
      description: "Minecraft-style HUD overlay for Mac and Windows that displays system info (battery, apps, activity) in a gaming interface with sound effects.",
      link: "https://minecrafthud.vercel.app",
      tags: ["Software Development"],
      image: "/pics/websites/minecrafthud.jpg",
    },
    {
      title: "Calendar365",
      description: "Year-at-a-glance planner with a zoomable 365-day view, sticky notes, optional Google Calendar sync, and Supabase-backed sharing.",
      link: "https://calendar365.app/",
      tags: ["Software Development"],
      image: "/pics/websites/calendar365.jpg",
    },
    {
      title: "NATO Early Warning System",
      description:
        "Scrapes latest NATO news, creates president-level summaries and gives back a threat level.",
      link: "https://natowatch.eliaspfeffer.de",
      tags: ["Software Development"],
      image: [
        {
          url: "/pics/natowatch_website_screenshot.png",
          position: "center center",
        },
        {
          url: "/pics/natowatch_report_demo.png",
          position: "center top",
        },
      ],
    },
    {
      title: "Built a Tesla solar charging automation",
      description:
        "Built a repository to start/stop charging your Tesla when your solar panel produces more energy than you need. It reads out the power production via the Poweropti sensor",
      link: "https://github.com/eliaspfeffer/Tesla-Tessie-Poweropti_Powerfox-Automation",
      tags: ["other", "Software Development"],
      image: [
        {
          url: "/pics/tesla_charging_automation.png",
          position: "contain",
        },
        {
          url: "/pics/tesla_charging_automation_poweropti.jpg",
          position: "contain",
        },
      ],
    },
    {
      title: "Nostr Relay Speed",
      description: "Benchmarks Nostr relay speeds using NIP-66 discovery, displaying response times and latencies in a live leaderboard.",
      link: "https://nostr-relay-speed.vercel.app",
      tags: ["Software Development"],
      image: "/pics/websites/nostr-relay-speed.jpg",
    },
    {
      title: "My Container Space",
      description: "Investor- and customer-facing website for a container storage rental business with availability tracking, mapping, and investment info.",
      link: "http://mycontainer.space/",
      tags: ["Software Development"],
      image: "/pics/websites/mycontainerspace.jpg",
    },
    {
      title: "Blackstock Fund",
      description: "Black Stock Capital — algorithmic portfolio management with risk-adjusted alpha generation and historical performance metrics.",
      link: "https://www.blackstock.capital/",
      tags: ["Software Development"],
      image: "/pics/websites/blackstock.png",
    },
    // === IMPORTANT ===
    {
      title: "AI Orchestrator",
      description: "Mindmap and canvas app with embedded interactive terminal nodes — build visual workflows by connecting terminal sessions and notes on an infinite canvas.",
      link: "https://orchestrator.eliaspfeffer.de/",
      tags: ["Software Development"],
      image: "/pics/websites/orchestrator.jpg",
    },
    {
      title: "Mesh Research",
      description: "A profitable trading algorithm — outperforms DCA, HODL, and Lump Sum strategies.",
      link: "https://meshresearch.xyz/",
      tags: ["Bitcoin", "Software Development"],
      image: "/pics/websites/meshresearch.jpg",
    },
    {
      title: "Longevity Protocol",
      description: "Web app exploring longevity protocols and health optimization strategies with interactive content.",
      link: "https://longevityprotocolof.vercel.app",
      tags: ["Software Development"],
      image: "/pics/websites/longevityprotocol.jpg",
    },
    {
      title: "FoundersMap",
      description: "Co-founder matching platform that visualizes and connects founders based on skills, expertise, and team status.",
      link: "https://foundersmap.vercel.app",
      tags: ["Software Development"],
      image: "/pics/websites/foundersmap.jpg",
    },
    {
      title: "TikTok Skill Page",
      description: "Landing page showcasing TikTok-ready skills and content formats.",
      link: "https://tiktok.eliaspfeffer.de/",
      tags: ["Software Development"],
      image: "/pics/websites/tiktok.jpg",
    },
    // === MEDIUM TO IMPORTANT ===
    {
      title: "A possible solution to Climate Change",
      description:
        "Problem Statement: The global atmosphere is shared by all, owned by none. Without accountability, each country has incentive to pollute while hoping others won't - leading to collective destruction. The Solution: This conceptual model of a satellite-monitored CO2 transparency system with democratic voting and economic enforcement, which would make emissions as trackable as Bitcoin transactions, solving the tragedy of the commons through blockchain-inspired accountability and transparency.",
      link: "https://co2.eliaspfeffer.de",
      tags: ["other"],
      image: "/pics/co2_solution.png",
    },
    {
      title: "Prepared a Kickstarter Campaign",
      description:
        "Wanted to sell a charger for phone addicts which charges less and less until a certain limit. Ended up filming and cutting the kickstarter video but scrapped everything after realizing the calculation was wrong (3 hours per day = 11 years of life and != 15 years) and a friend thought it could harm people if their phone battery dies when they need it in an emergency. But for the protocol, here is the link to the website and the kickstarter video (was a lot of work).",
      link: "https://eliaspfeffer.wixsite.com/un-charger",
      tags: ["other"],
      image: [
        {
          url: "/pics/uncharger4.gif",
          position: "center center",
        },
        {
          url: "/pics/uncharger5.png",
          position: "center center",
        },
        {
          url: "/pics/uncharger3.png",
          position: "center center",
        },
        {
          url: "/pics/uncharger2.png",
          position: "center center",
        },
      ],
    },
    {
      title: "Reasoning model for AGI",
      description:
        "Mathematical logic for linking contexts in a knowledge graph (german)",
      link: "https://docs.google.com/document/d/1SPT6Ntyyktxl8JeWWu43HpPA9vp3kctC-zsahMVe5HI/edit?usp=sharing",
      tags: ["AGI"],
      isFromOtherSection: true,
    },
    // === MEDIUM ===
    {
      title: "LifePathPlaner",
      description:
        "Plan long-term life paths and see what events (e.g., lifestyle changes) would impact.",
      link: "https://github.com/eliaspfeffer/lifepathplaner",
      tags: ["Software Development"],
    },
    {
      title: "Programmed an Android App Prototype",
      description: "An app to buy Bitcoin at a gas filling station",
      tags: ["Bitcoin", "Software Development"],
      link: "https://tidal-sovereign-a85.notion.site/Bitcoin-Tankstelle-Laborprojekt-17d37e51768180d08cfedca837d8be1e",
      image: [
        {
          url: "/pics/gasfillingstationapp/bitcoin_app_gasfillingstation1.png",
          objectFit: "contain",
        },
        {
          url: "/pics/gasfillingstationapp/bitcoin_app_gasfillingstation2.png",
          objectFit: "contain",
        },
        {
          url: "/pics/gasfillingstationapp/bitcoin_app_gasfillingstation3.png",
          objectFit: "contain",
        },
        {
          url: "/pics/gasfillingstationapp/bitcoin_app_gasfillingstation4.png",
          objectFit: "contain",
        },
        {
          url: "/pics/gasfillingstationapp/bitcoin_app_gasfillingstation5.png",
          objectFit: "contain",
        },
      ],
    },
    // === LOWER TO MEDIUM ===
    {
      title: "make-fetch-json-pick-easy",
      description:
        "Minimal TS helper for extracting specific fields from any JSON API.",
      link: "https://github.com/eliaspfeffer/make-fetch-json-pick-easy",
      tags: ["Software Development"],
    },
    {
      title: "Cursor Ubuntu 24.04 Install/Update Script",
      description:
        "Shell script to install and update Cursor on Ubuntu 24.04.",
      link: "https://github.com/eliaspfeffer/CursorUbuntu-24.04-install-update-script",
      tags: ["Software Development"],
    },
    // === FROM OTHER SECTIONS ===
    {
      title: "BitcoinAlgoTra.de",
      description:
        "The Bitcoin Algo Trading bot with the highest profitability ever.",
      link: "https://meshresearch.xyz",
      tags: ["Bitcoin", "Software Development"],
      isFromOtherSection: true,
    },
    {
      title: "Quantitative Bitcoin Trading",
      description:
        "Im managing a 6 figure Bitcoin amount for others via self built, backtested trading algorithms.",
      tags: ["Bitcoin", "Software Development"],
      isFromOtherSection: true,
      image: [
        {
          url: "/pics/quant_trading_analysis.png",
          objectFit: "contain",
        },
      ],
    },
    {
      title: "Škoda Klement eBike Project",
      description:
        "Helped with the development of the first prototype and built the battery system for the Škoda Klement eBike project.",
      tags: ["Engineering"],
      isFromOtherSection: true,
    },
    {
      title: "Built a High-Performance DIY Electric Bike",
      description:
        "Built a custom electric bike achieving 0-100km/h in ~4s with 22kW power and a custom 3kWh 20s15p Li-Ion Battery",
      link: "https://www.linkedin.com/in/eliaspfeffer/details/projects/urn:li:fsd_profileProject:(ACoAADJpVdABKWLKeH7pZl3V_mP7bDRdpWwDyzM,403655932)/treasury/",
      tags: ["Engineering"],
      isFromOtherSection: true,
    },
    {
      title: "Built a DIY eBike Kit",
      description: "Developed and commercialized a custom eBike conversion kit",
      link: "https://www.linkedin.com/in/eliaspfeffer/details/projects/243288495/multiple-media-viewer/?profileId=ACoAADJpVdABKWLKeH7pZl3V_mP7bDRdpWwDyzM&treasuryMediaId=1722620527942",
      tags: ["Engineering"],
      isFromOtherSection: true,
    },
    {
      title: "Bitcoin Bank CBE",
      description:
        "Bitcoin software for buying, selling, and sending Bitcoin (Beta Phase)",
      tags: ["Bitcoin", "Software Development"],
      isFromOtherSection: true,
    },
    {
      title: "DIY Electric ATV",
      description:
        "Custom-built electric ATV (0-100km/h in ~3.6s; 60 kW with 6 kWh battery)",
      link: "https://endless-sphere.com/sphere/threads/my-60kw-electric-atv-quad-built.122397/#post-1787638",
      tags: ["Engineering"],
      isFromOtherSection: true,
    },
  ];

  // Separate toggle functions
  const toggleProjectTag = (tag: string) => {
    setSelectedProjectTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const toggleNewsletterTag = (tag: string) => {
    setSelectedNewsletterTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const filteredProjects = filterTag
    ? projects.filter((project) => project.tags.includes(filterTag))
    : selectedProjectTags.length === 0
    ? projects.filter((project) => !project.isFromOtherSection)
    : projects.filter((project) =>
        selectedProjectTags.some((tag) => project.tags.includes(tag))
      );

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          tags: selectedNewsletterTags,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Subscription failed");
      }

      setStatus("success");
      setEmail("");
      setSelectedNewsletterTags([]);
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "An error occurred"
      );
    }
  };

  return (
    <section id="other-projects" className="pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-6">
          {filterTag ? `${filterTag} Projects` : "Other Projects & Publications"}
        </h2>

        {!filterTag && <div className="mb-8 flex flex-wrap gap-2">
          {allTags.map((tag) => (
            <Badge
              key={tag}
              variant={
                selectedProjectTags.includes(tag) ? "default" : "outline"
              }
              className="cursor-pointer"
              onClick={() => toggleProjectTag(tag)}
            >
              {tag}
            </Badge>
          ))}
        </div>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {filteredProjects.map((project, i) =>
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
                    <CardTitle className="flex items-center gap-2">
                      {project.title}
                      <ExternalLink className="h-4 w-4 inline-block" />
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {project.image && (
                      <div
                        className="mb-4"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {Array.isArray(project.image) ? (
                          <ImageCarousel
                            images={project.image}
                            alt={`Screenshots of ${project.title}`}
                            paused={hoveredProject === i}
                          />
                        ) : (
                          <div
                            className="relative overflow-hidden rounded-lg"
                            style={{
                              minHeight: "300px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Image
                              src={
                                typeof project.image === "string"
                                  ? project.image
                                  : project.image.url
                              }
                              alt={`Screenshot of ${project.title}`}
                              width={1200}
                              height={800}
                              className="w-auto h-auto rounded-lg max-w-full max-h-[500px]"
                              style={{
                                objectFit: "contain",
                                objectPosition:
                                  typeof project.image === "string"
                                    ? "center center"
                                    : project.image.position || "center center",
                              }}
                              loading="lazy"
                            />
                          </div>
                        )}
                      </div>
                    )}
                    <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, j) => (
                        <Badge key={j} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="text-xs mt-2 text-zinc-500">
                      {project.isFromOtherSection
                        ? "See details in " +
                          (project.tags.includes("Bitcoin") ||
                          project.tags.includes("Software Development")
                            ? "Featured Projects"
                            : "Experience")
                        : ""}
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
                  <CardTitle>{project.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, j) => (
                      <Badge key={j} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="text-xs mt-2 text-zinc-500">
                    {project.isFromOtherSection
                      ? "See details in " +
                        (project.tags.includes("Bitcoin") ||
                        project.tags.includes("Software Development")
                          ? "Featured Projects"
                          : "Experience")
                      : ""}
                  </div>
                </CardContent>
              </Card>
            )
          )}
        </div>

        {/* Newsletter Section with reduced margin */}
        <div className="mt-12 border-t pt-12 mb-12">
          <div className="max-w-6xl">
            <h2 className="text-3xl font-bold mb-12">
              Get notified when I have a new project about a specific topic
            </h2>
            <Card className="p-6">
              <CardContent>
                <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="w-full px-4 py-2 border rounded-md dark:bg-zinc-800 dark:border-zinc-700"
                    required
                  />

                  <div className="space-y-2">
                    <div className="flex gap-2 mb-2">
                      <Badge
                        variant="outline"
                        className="cursor-pointer"
                        onClick={() => {
                          if (
                            selectedNewsletterTags.length === allTags.length
                          ) {
                            setSelectedNewsletterTags([]);
                          } else {
                            setSelectedNewsletterTags([...allTags]);
                          }
                        }}
                      >
                        {selectedNewsletterTags.length === allTags.length
                          ? "Deselect all"
                          : "Select all"}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {allTags.map((tag) => (
                        <Badge
                          key={tag}
                          variant={
                            selectedNewsletterTags.includes(tag)
                              ? "default"
                              : "outline"
                          }
                          className="cursor-pointer"
                          onClick={() => toggleNewsletterTag(tag)}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={
                      status === "loading" ||
                      selectedNewsletterTags.length === 0
                    }
                    className="bg-primary text-primary-foreground px-6 py-2 rounded-md hover:bg-primary/90 disabled:bg-primary/50 disabled:cursor-not-allowed"
                  >
                    {status === "loading" ? "Subscribing..." : "Subscribe"}
                  </button>

                  {status === "success" && (
                    <p className="text-green-600 dark:text-green-400">
                      Successfully subscribed! (No spam = NO confirmation mail)
                    </p>
                  )}
                  {status === "error" && (
                    <p className="text-red-600 dark:text-red-400">
                      {errorMessage}
                    </p>
                  )}
                </form>
                <p className="text-sm text-muted-foreground mb-4">
                  No spam - I promise. 1 mail per month maximum.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
