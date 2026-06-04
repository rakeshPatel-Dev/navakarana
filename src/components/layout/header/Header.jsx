import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { RiLiveLine, RiMenuLine } from "react-icons/ri";
import { useState, useEffect } from "react";
import headerData from "./data/headerData";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled
        ? "bg-background/90 backdrop-blur-md shadow-sm shadow-brand/10 border-b border-border"
        : "bg-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">

          <img src={headerData.logo.src} alt={headerData.logo.alt} className="w-8 h-8 rounded-xl" />
          <span className="text-[1.05rem] font-bold tracking-tight text-foreground">
            {headerData.platformName}
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {headerData.nav.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className="px-4 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground rounded-full hover:bg-muted transition-colors"
            >
              {item.label}
            </Link>
          ))}
          {headerData.protected.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className="px-4 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground rounded-full hover:bg-muted transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Auth */}
        <div className="hidden md:flex items-center gap-3">
          <AnimatedThemeToggler className="text-muted-foreground" />

          <Separator orientation="vertical" className="hidden md:block bg-muted-foreground" />

          {headerData.auth.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.label}
            </Link>
          ))}

          <Separator orientation="vertical" className="hidden md:block bg-muted-foreground" />

          <Link
            to={headerData.cta.href}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold bg-brand text-white hover:bg-brand-light transition-colors shadow-sm"
          >
            <RiLiveLine className="text-xs" />
            {headerData.cta.label}
          </Link>
        </div>
{/* Mobile toggle & Sheet */}
        <div className="md:hidden flex items-center gap-2">
          <AnimatedThemeToggler className="text-muted-foreground mr-1" />
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-xl"
                aria-label="Toggle menu"
              >
                <RiMenuLine size={22} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-75 sm:w-90 p-6 flex flex-col justify-between border-l border-border/80 bg-background/95 backdrop-blur-md">
              <div className="flex flex-col gap-6">
                <SheetHeader className="p-0 flex flex-row items-center gap-2.5">
                  <img src={headerData.logo.src} alt={headerData.logo.alt} className="w-8 h-8 rounded-xl" />
                  <SheetTitle className="text-lg font-bold text-foreground">
                    {headerData.platformName}
                  </SheetTitle>
                </SheetHeader>
                
                <nav className="flex flex-col gap-1.5 mt-4">
                  {headerData.nav.map((item) => (
                    <Link
                      key={item.label}
                      to={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="px-4 py-3 text-sm font-semibold text-foreground hover:text-brand hover:bg-brand/5 dark:hover:bg-brand/10 rounded-xl transition-all duration-200"
                    >
                      {item.label}
                    </Link>
                  ))}
                  {headerData.protected.map((item) => (
                    <Link
                      key={item.label}
                      to={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="px-4 py-3 text-sm font-semibold text-foreground hover:text-brand hover:bg-brand/5 dark:hover:bg-brand/10 rounded-xl transition-all duration-200"
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </div>
              <div className="flex flex-col gap-4 border-t border-border/40 pt-6">
                <div className="flex items-center justify-between px-2">
                  <span className="text-xs text-muted-foreground font-medium">Authentication</span>
                </div>
                <div className="flex flex-col gap-2">
                  {headerData.auth.map((item) => (
                    <Link
                      key={item.label}
                      to={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="w-full text-center py-2.5 rounded-full text-sm font-semibold text-muted-foreground hover:text-foreground border border-border/60 hover:border-border hover:bg-muted/50 transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                  <Link
                    to={headerData.cta.href}
                    onClick={() => setMobileOpen(false)}
                    className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-full text-sm font-semibold bg-brand text-white hover:bg-brand-light transition-colors shadow-sm shadow-brand/20 mt-1"
                  >
                    <RiLiveLine className="text-xs" />
                    {headerData.cta.label}
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}
