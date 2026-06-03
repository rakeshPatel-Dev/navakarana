import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { RiLiveLine, RiMenuLine, RiCloseLine } from "react-icons/ri";
import { useState, useEffect } from "react";
import headerData from "./data/headerData";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";

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

        {/* Mobile toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden rounded-xl"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <RiCloseLine size={22} /> : <RiMenuLine size={22} />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="md:hidden bg-background border-t border-border px-6 py-4 flex flex-col gap-2"
        >
          {headerData.nav.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className="text-sm font-medium text-foreground py-2 border-b border-border"
            >
              {item.label}
            </Link>
          ))}
          <div className="flex gap-3 mt-2">
            {headerData.auth.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="text-sm font-medium text-muted-foreground"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to={headerData.cta.href}
              className="ml-auto inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-semibold bg-brand text-white"
            >
              {headerData.cta.label}
            </Link>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
