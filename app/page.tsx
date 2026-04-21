import { Nav } from "@/components/nav"
import { Hero } from "@/components/hero"
import { Projects } from "@/components/projects"
import { Experience } from "@/components/experience"
import { OtherProjects } from "@/components/other-projects"
import { Contact } from "@/components/contact"

export default function Home() {
  return (
    <main className="scroll-smooth">
      <Nav />
      <Hero />
      <Projects />
      <Experience />
      <OtherProjects />
      <Contact />
    </main>
  )
}

