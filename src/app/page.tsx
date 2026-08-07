import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Experience } from "@/components/Experience";
import { Footer } from "@/components/Footer";
import { Gallery } from "@/components/Gallery";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { ScrollProgress } from "@/components/ScrollProgress";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <ScrollProgress />
      <Header />
      <main>
        <Hero />
        <Projects />
        <Gallery />
        <Experience />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
