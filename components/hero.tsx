import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import Image from "next/image";

export function Hero() {
  const tags = ["Bitcoin", "AGI", "Engineering", "Software Development", "Finance"];

  return (
    <section aria-labelledby="intro-title" className="pt-32 pb-16 sm:pt-40 sm:pb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid items-center gap-10 md:grid-cols-[1fr_240px] lg:grid-cols-[1fr_300px]">
        <div>
          <h1 id="intro-title" className="max-w-2xl text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08] text-balance">
            Mechatronics Engineer
          </h1>
          <p className="mt-6 text-xl text-zinc-600 dark:text-zinc-400">
            My public project portfolio
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild className="h-12 px-5">
              <a href="#projects">Explore projects <ArrowDown className="ml-2 h-4 w-4" aria-hidden="true" /></a>
            </Button>
            <Button asChild variant="outline" className="h-12 px-5">
              <a href="#contact">Get in touch <ArrowUpRight className="ml-2 h-4 w-4" aria-hidden="true" /></a>
            </Button>
          </div>
          <div className="mt-9 text-sm text-zinc-600 dark:text-zinc-400">
            <p className="mb-3 font-medium text-zinc-900 dark:text-zinc-100">Interests</p>
            <ul className="flex flex-wrap gap-x-5 gap-y-2" aria-label="Interests">
              {tags.map((tag) => <li key={tag}>{tag}</li>)}
            </ul>
          </div>
        </div>
        <div className="relative row-start-1 md:row-auto w-32 h-32 sm:w-40 sm:h-40 md:w-60 md:h-60 lg:w-[300px] lg:h-[300px] md:justify-self-end overflow-hidden rounded-full">
          <Image src="/elias.png" alt="Elias Pfeffer" fill sizes="(min-width: 1024px) 300px, (min-width: 768px) 240px, (min-width: 640px) 160px, 128px" priority className="object-cover" />
        </div>
      </div>
    </section>
  );
}
