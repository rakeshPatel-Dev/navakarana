import { useState } from "react";
import { motion } from "framer-motion";
import { Play, ChevronRight } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const CustomMatInfoCard = ({
  icon: Icon,
  title,
  description,
  videoThumbnailUrl,
  videoUrl,
  embedId,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  // Parse Youtube ID if not explicitly provided
  const getEmbedUrl = () => {
    if (embedId) {
      return `https://www.youtube.com/embed/${embedId}?autoplay=1&rel=0`;
    }
    if (!videoUrl) return "";
    if (videoUrl.includes("/embed/")) return videoUrl;
    
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|v=)([^#?]*).*/;
    const match = videoUrl.match(regExp);
    
    if (match && match[2].length === 11) {
      return `https://www.youtube.com/embed/${match[2]}?autoplay=1&rel=0`;
    }
    return videoUrl;
  };

  return (
    <Dialog onOpenChange={(open) => { if (!open) setIsPlaying(false); }}>
      <DialogTrigger asChild>
        <motion.button
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="w-full flex items-center justify-between p-4 rounded-2xl border border-border/60 bg-card/40 hover:bg-brand/5 hover:border-brand/30 dark:border-white/5 dark:bg-white/5 dark:hover:bg-brand/10 transition-all duration-300 cursor-pointer text-left group"
        >
          <div className="flex items-center gap-3.5">
            <span className="flex items-center justify-center w-20 h-10 rounded-full bg-brand/10 text-brand dark:bg-brand/20 dark:text-brand-light group-hover:scale-105 transition-transform duration-300">
              {Icon && <Icon className="w-5 h-5" />}
            </span>
            <div>
              <h4 className="text-sm font-semibold text-foreground tracking-tight group-hover:text-brand dark:group-hover:text-brand-light transition-colors">
                {title}
              </h4>
              <p className="text-[11px] text-muted-foreground mt-0.5 line-clamp-1 max-w-50 sm:max-w-xs md:max-w-md">
                {description}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center w-15 h-10 rounded-xl border border-border/80 backdrop-blur-md bg-linear-to-br from-foreground/5 via-foreground/10 to-muted-foreground/5 text-muted-foreground m-1 p-2">
            <Play className="w-5 h-5 text-muted-foreground group-hover:text-brand dark:group-hover:text-brand-light transition-colors" />
          </div>
          {/* <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-brand dark:group-hover:text-brand-light group-hover:translate-x-0.5 transition-all" /> */}
        </motion.button>
      </DialogTrigger>

      <DialogContent 
      aria-describedby="custom-mat-info-description"
      className="sm:max-w-3xl w-full p-6 sm:p-8 border border-border/80 bg-background/95 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden">
      <DialogTitle className="sr-only">{title}</DialogTitle>
        {/* Info Header */}
        <div className="mb-6">
          <span className="text-[11px] uppercase font-bold tracking-widest text-brand dark:text-brand-light">
            Mat Guide & Details
          </span>
          <h3 className="text-2xl font-bold text-foreground mt-1.5 tracking-tight">
            {title}
          </h3>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mt-2.5">
            {description}
          </p>
        </div>

        {/* Video Wrapper */}
        <div className="relative aspect-video rounded-xl overflow-hidden bg-muted border border-border/60 shadow-inner group">
          {isPlaying ? (
            <iframe
              src={getEmbedUrl()}
              title={title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          ) : (
            <div 
              className="absolute inset-0 cursor-pointer flex items-center justify-center"
              onClick={() => setIsPlaying(true)}
            >
              <img
                src={videoThumbnailUrl}
                alt={title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
              />
              {/* Overlay with subtle dark-red tint */}
              <div className="absolute inset-0 bg-black/45 group-hover:bg-black/40 transition-colors duration-300" />
              
              {/* Play Button Container */}
              <div className="relative z-10 flex flex-col items-center gap-2">
                <span className="flex items-center justify-center w-14 h-14 rounded-full bg-brand text-white shadow-lg shadow-brand/30 group-hover:scale-110 group-hover:bg-brand-light transition-all duration-300">
                  <Play className="w-6 h-6 fill-current translate-x-0.5" />
                </span>
                <span className="text-xs font-semibold text-white/90 tracking-wide uppercase mt-1">
                  Play Video
                </span>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CustomMatInfoCard;
