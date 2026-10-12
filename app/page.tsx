import { Nav } from "@/components/nav"
import Image from "next/image"
import { Hero } from "@/components/hero"
import { Projects } from "@/components/projects"
import { OtherProjects } from "@/components/other-projects"
import { Contact } from "@/components/contact"

export default function Home() {
  return (
    <main id="main">
      <Nav />
      <div className="portrait-portfolio">
        <div className="portrait-track">
          <div className="portrait-frame">
            <Image src="/elias-frankfurt.webp" alt="Elias Pfeffer standing in front of the Frankfurt skyline" fill priority sizes="100vw" className="portrait-photo" />
          </div>
        </div>
        <div className="portfolio-content">
          <Hero />
          <Projects />
          <OtherProjects />
        </div>
      </div>
      <Contact />
    </main>
  )
}
