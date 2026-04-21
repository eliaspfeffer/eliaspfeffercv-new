"use client";

import { Button } from "@/components/ui/button";
import { Github, Mail } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import Image from "next/image";

export function Hero() {
  const router = useRouter();
  const tags = [
    "Interests:",
    "Bitcoin",
    "AGI",
    "Engineering",
    "Software Development",
    "Finance",
  ];

  const handleTagClick = (tag: string) => {
    const element = document.getElementById("other-projects");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      // Optionally, you can add logic here to select the clicked tag in the OtherProjects component
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex justify-center mb-8">
          <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-zinc-200 dark:border-zinc-700 shadow-lg">
            <Image
              src="/elias.png"
              alt="Elias Pfeffer"
              fill
              sizes="(max-width: 768px) 100vw, 192px"
              priority
              className="object-cover"
            />
          </div>
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
          Mechatronics Engineer
        </h1>
        <p className="mt-6 text-xl text-zinc-600 dark:text-zinc-400">
          My public project portfolio
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {tags.map((tag, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
              // onClick={() => handleTagClick(tag)}
              onClick={() =>
                document
                  .getElementById("projects")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              {tag}
            </Badge>
          ))}
        </div>
        {/* <div className="mt-8 flex justify-center gap-4">
          <Button variant="outline" asChild>
            <a href="https://github.com/eliaspfeffer" target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-4 w-4" />
              Projects
            </a>
          </Button>
          <Button asChild>
            <a href="mailto:eliaspfeffer@gmail.com">
              <Mail className="mr-2 h-4 w-4" />
              Contact
            </a>
          </Button>
        </div> */}
      </div>
    </div>
  );
}
