import { ArrowDown, ArrowUpRight } from "lucide-react";

export function Hero() {
  const tags = ["Bitcoin", "AGI", "Engineering", "Software Development", "Finance"];

  return (
    <section aria-labelledby="intro-title" className="portrait-intro">
      <div className="intro-identity">
        <h1 id="intro-title">Elias<br />Pfeffer.</h1>
        <p className="intro-role">Mechatronics Engineer</p>
        <a href="#projects" className="intro-link">Explore my projects <ArrowDown size={18} aria-hidden="true" /></a>
      </div>
      <div className="intro-details">
        <p className="intro-description">My public<br />project portfolio.</p>
        <ul className="intro-interests" aria-label="Interests">
          {tags.map((tag) => <li key={tag}>{tag}</li>)}
        </ul>
        <a href="#contact" className="intro-link">Get in touch <ArrowUpRight size={18} aria-hidden="true" /></a>
      </div>
    </section>
  );
}
