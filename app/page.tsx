import { Nav } from "@/components/nav"
import { Hero } from "@/components/hero"
import { Projects } from "@/components/projects"
import { OtherProjects } from "@/components/other-projects"
import { Contact } from "@/components/contact"

export default function Home() {
  return (
    <main id="main">
      <Nav />
      <Hero />
      <Projects />
      <OtherProjects />
      <Contact />
    </main>
  )
}
