import Hero from "./Hero";
import Stats from "./Stats";
import Features from "./Features";
import HowItWorks from "./HowItWorks";
import Teachers from "./Teachers";
import Testimonials from "./Testimonials";
import CTA from "./CTA";
import StreamShow from "./StreamShow";
import CustomMat from "./CustomMat";

export default function LandingPage() {
  return (
    <main>
      <Hero />
      <StreamShow/>
      <Stats />
      <CustomMat/>
      <Features />
      <HowItWorks />
      <Teachers />
      <Testimonials />
      <CTA />
    </main>
  );
}
