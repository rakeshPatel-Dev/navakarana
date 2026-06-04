import {
  Sparkles,
  Ruler,
  Zap,
  Users,
} from "lucide-react";
import CustomMatHeader from "./components/CustomMatHeader";
import CustomMatSvg from "./components/CustomMatSvg";
import CustomMatInfoCard from "./components/CustomMatInfoCard";
import { matInfo } from "./data/CustomMatInfo";

// Features listed under heading
const features = [
  {
    icon: Ruler,
    title: "12 Body Measurements",
  },
  {
    icon: Zap,
    title: "Algorithmic Precision",
  },
  {
    icon: Users,
    title: "Handmade Craftsmanship",
  },
];

const CustomMat = () => {
  return (
    <section id="features" className="py-24 bg-background relative overflow-hidden">
      {/* Subtle background shape */}
      <div
        aria-hidden
        className="absolute top-0 right-0 rounded-full bg-brand/5 blur-3xl opacity-60 pointer-events-none"
        style={{ width: 300, height: 300 }}
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header component */}
        <CustomMatHeader features={features} />

        {/* Dashboard layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch mt-12">
          {/* Left column: SVG Mat Preview (5 cols) */}
          <CustomMatSvg />

          {/* Right column: Topics Grid Explorer (7 cols) */}
          <div className="lg:col-span-7 flex flex-col bg-card/20 border border-border/40 p-6 md:p-8 rounded-3xl backdrop-blur-xs justify-between">
            <div>
              <div className="mb-6">
                <h3 className="text-base font-bold text-foreground tracking-tight flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-brand dark:text-brand-light" />
                  Explore Mat Features
                </h3>
              </div>

              {/* Grid layout for topics */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {matInfo.map((mat, i) => (
                  <CustomMatInfoCard
                    key={i}
                    icon={mat.icon}
                    title={mat.title}
                    description={mat.desc}
                    videoThumbnailUrl={mat.videoThumbnailUrl}
                    videoUrl={mat.videoUrl}
                    embedId={mat.embedId}
                  />
                ))}
              </div>
            </div>

            {/* Bottom mini notice */}
            <div className="mt-8 text-center lg:text-left text-[10px] text-muted-foreground/60 border-t border-border/40 pt-4">
              All guides and tutorials are recorded by certified Navakarana teachers.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomMat;
