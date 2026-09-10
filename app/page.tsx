import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Showcase from "@/components/Showcase";
import Intro from "@/components/Intro";
import Work from "@/components/Work";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <Showcase />
      <Intro />
      <Work />
      <About />
      <Contact />
      <Footer />
      <ScrollReveal />
    </>
  );
}
