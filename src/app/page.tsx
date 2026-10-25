import { ViewTransition } from "react";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Experience } from "@/components/Experience";
import { Footer } from "@/components/Footer";
import { Gallery } from "@/components/Gallery";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { HeroStage } from "@/components/HeroStage";
import { Manifesto } from "@/components/Manifesto";
import { Marquee } from "@/components/Marquee";
import { Projects } from "@/components/Projects";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Showcase } from "@/components/Showcase";

const pageTransition = {
  "nav-forward": "nav-forward",
  "nav-back": "nav-back",
  default: "none",
};

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <ScrollProgress />
      <Header />
      <ViewTransition enter={pageTransition} exit={pageTransition} default="none">
        <div className="curtain">
          <main className="curtain-main">
            {/* The WebGL sculpture stays pinned across the hero and the manifesto. */}
            <div className="stage-wrap">
              <HeroStage />
              <Hero />
              <Manifesto />
            </div>
            <Marquee />
            <Showcase />
            <Projects />
            <Gallery />
            <Experience />
            <About />
            <Contact />
          </main>
          <Footer />
        </div>
      </ViewTransition>
    </div>
  );
}
