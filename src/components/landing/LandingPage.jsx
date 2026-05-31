import Hero from "./Hero";
import Stats from "./Stats";
import Features from "./Features";
import LiveStreams from "./LiveStreams";
import HowItWorks from "./HowItWorks";
import Teachers from "./Teachers";
import Testimonials from "./Testimonials";
import CTA from "./CTA";

export default function LandingPage() {
  return (
    <main>
      <Hero />
      <Stats />
      <Features />
      <LiveStreams />
      <HowItWorks />
      <Teachers />
      <Testimonials />
      <CTA />
    </main>
  );
}
