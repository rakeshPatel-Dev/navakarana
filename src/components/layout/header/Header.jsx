import { motion } from "framer-motion";
import { RiLiveLine, RiMenuLine, RiCloseLine } from "react-icons/ri";
import { useState, useEffect } from "react";
import headerData from "./data/headerData";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

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
        ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-stone-100"
        : "bg-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">

          <img src={headerData.logo.src} alt={headerData.logo.alt} className="w-8 h-8 rounded-xl" />
          <span className="text-[1.05rem] font-bold tracking-tight text-stone-900">
            {headerData.platformName}
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {headerData.nav.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className="px-4 py-1.5 text-sm font-medium text-stone-600 hover:text-stone-900 rounded-full hover:bg-stone-100 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Auth */}
        <div className="hidden md:flex items-center gap-3">
          {headerData.auth.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className="text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors"
            >
              {item.label}
            </Link>
          ))}

          <Separator orientation="vertical" className="hidden md:block h-6 bg-primary/50" />

          <Link
            to={headerData.cta.href}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold bg-brand text-white hover:bg-brand-light transition-colors shadow-sm"
          >
            <RiLiveLine className="text-xs" />
            {headerData.cta.label}
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 rounded-xl text-stone-600 hover:bg-stone-100 transition"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <RiCloseLine size={22} /> : <RiMenuLine size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="md:hidden bg-white border-t border-stone-100 px-6 py-4 flex flex-col gap-2"
        >
          {headerData.nav.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className="text-sm font-medium text-stone-700 py-2 border-b border-stone-50"
            >
              {item.label}
            </Link>
          ))}
          <div className="flex gap-3 mt-2">
            {headerData.auth.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="text-sm font-medium text-stone-600"
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
