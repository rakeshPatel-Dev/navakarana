import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  RiRulerLine, RiChatHeartLine, RiCheckboxCircleLine, 
  RiFileList3Line, RiShoppingBag3Line, RiShieldStarLine 
} from "react-icons/ri";
import { Button } from "@/components/ui/button";
import SectionBadge from "@/components/landing/components/SectionBadge";

export default function MatInfoPage() {
  return (
    <section className="bg-background min-h-screen py-20 relative overflow-hidden pb-16">
      {/* Decorative Blur and Shapes */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-brand/5 blob-shape pointer-events-none" />
      <div className="absolute bottom-40 left-10 w-80 h-80 bg-muted/60 blob-shape-2 pointer-events-none" />

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 pt-16 pb-20 text-center flex items-center flex-col relative z-10">
        <SectionBadge icon={RiShieldStarLine} text="Introducing Navakarana Mat" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          
          <h1 className="text-4xl md:text-6xl font-black text-foreground leading-tight max-w-4xl mx-auto">
            Your Perfect Yoga Mat, <span className="text-brand">Custom Made</span>
          </h1>
          
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto font-normal leading-relaxed">
            The world's first custom yoga mat tailored specifically to your body's skeletal measurements, finished with a personalized engraved motto and alignment layout lines.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              asChild
              className="px-8 h-12 bg-brand hover:bg-brand-light text-white font-bold rounded-xl cursor-pointer shadow-lg shadow-brand/25 text-base"
            >
              <Link to="/mat/order">
                <RiShoppingBag3Line className="mr-2" /> Order Custom Mat
              </Link>
            </Button>
            
            <a 
              href="#features"
              className="text-muted-foreground hover:text-foreground font-bold transition-all text-base border-b-2 border-transparent hover:border-border py-1"
            >
              Learn More ↓
            </a>
          </div>
        </motion.div>
      </div>

      {/* Product Highlight Grid */}
      <div id="features" className="max-w-6xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
        {/* Visual Mock Mat Layout */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-card border border-border p-8 rounded-4xl aspect-[4/6] max-w-md mx-auto w-full relative flex flex-col justify-between text-muted-foreground shadow-2xl overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff03_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
          
          {/* Mock alignment lines */}
          <div className="absolute inset-x-8 top-1/4 border-t border-brand/35 border-dashed" />
          <div className="absolute inset-x-8 top-1/2 border-t border-brand/50" />
          <div className="absolute inset-x-8 top-3/4 border-t border-brand/35 border-dashed" />
          <div className="absolute inset-y-12 left-1/2 border-l border-brand/20" />
          
          <div className="text-center">
            <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Symmetrical Guide Lines</span>
          </div>

          <div className="text-center z-10">
            <p className="text-brand font-serif italic text-lg tracking-wide uppercase">" BREATHE & FLOW "</p>
            <span className="text-[10px] text-muted-foreground block mt-1 uppercase font-semibold">Your Custom Engraving</span>
          </div>

          <div className="flex justify-between text-[10px] text-muted-foreground uppercase font-semibold">
            <span>Mat Width: Custom</span>
            <span>Mat Height: Custom</span>
          </div>
        </motion.div>

        {/* Feature Explanations */}
        <div className="space-y-8">
          <h2 className="text-3xl font-extrabold text-foreground">Engineered for Your Alignment</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Conventional yoga mats use static lengths, leaving taller practitioners cramped and shorter practitioners reaching too far. Navakarana customizes the dimensions and alignment marking guides to match your specific anatomical measurements.
          </p>

          <div className="space-y-6">
            {[
              {
                icon: <RiRulerLine className="size-6 text-brand" />,
                title: "Custom Fit to Your Body Measurements",
                desc: "We adjust the length, width, and alignment marks based on nine key bone measurements (shoulder width, height, arm length, and more)."
              },
              {
                icon: <RiChatHeartLine className="size-6 text-brand" />,
                title: "Personal Motto Engraved",
                desc: "Choose a personal affirmation or motivational quote (up to 18 characters) to be precisely engraved at the header of your mat."
              },
              {
                icon: <RiFileList3Line className="size-6 text-brand" />,
                title: "Choose Your Line Style",
                desc: "Select either a solid alignment path or border guidelines to match your preferred visual focus style during practice."
              },
              {
                icon: <RiCheckboxCircleLine className="size-6 text-brand" />,
                title: "Crafted with Precision",
                desc: "Manufactured using sustainable, non-slip rubber and laser-carved with extreme detail to ensure longevity and safety."
              }
            ].map((feature, idx) => (
              <div key={idx} className="flex gap-4 items-start">
                <div className="size-11 bg-background border border-border rounded-2xl flex items-center justify-center shrink-0 shadow-sm">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-bold text-foreground text-base">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm mt-1 leading-normal">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
