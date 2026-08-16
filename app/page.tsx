import { Hero } from "@/components/sections/Hero";
import { Metrics } from "@/components/sections/Metrics";
import { About } from "@/components/sections/About";
import { Journey } from "@/components/sections/Journey";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Learning } from "@/components/sections/Learning";
import { Credentials } from "@/components/sections/Credentials";
import { WebPresence } from "@/components/sections/WebPresence";
import { Contact } from "@/components/sections/Contact";

/**
 * Narrative order (§35):
 *   who I am → the fastest proof → what kind of engineer → what I've worked on
 *   → what I built → what I know → what I'm learning → what I'm credentialled
 *   in → where to find me → how to reach me.
 *
 * Credentials sit late and deliberately so: the engineering evidence above it
 * is the argument, and the degree and certificates are corroboration.
 *
 * Every section here is a Server Component. Interactivity is pushed down into
 * the few leaves that need it (skill filter, magnetic buttons, count-up,
 * headline split), so almost none of this ships as client JavaScript.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Metrics />
      <About />
      <Journey />
      <Projects />
      <Skills />
      <Learning />
      <Credentials />
      <WebPresence />
      <Contact />
    </>
  );
}
