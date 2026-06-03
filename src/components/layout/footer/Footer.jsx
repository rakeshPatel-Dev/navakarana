import {  RiTwitterXLine, RiInstagramLine, RiLinkedinBoxLine, RiYoutubeLine } from "react-icons/ri";
import { Link } from "react-router-dom";

const links = {
  Platform: ["Browse Classes", "Live Now", "Styles", "Trending"],
  Instructors: ["Become a Teacher", "Dashboard", "Resources", "Pricing"],
  Company: ["About Us", "Blog", "Careers", "Press"],
  Support: ["Help Center", "Contact Us", "Privacy Policy", "Terms"],
};

export default function Footer() {
  return (
    <footer className="bg-background text-muted-foreground pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 pb-12 border-b border-border">
          {/* Brand */}
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <img src="/navakarana_logo.png" alt="Navakarana Logo" className="w-8 h-8" />
              <span className="text-foreground font-bold text-base">Navakarana</span>
            </Link>
            <p className="text-sm leading-relaxed mb-5 max-w-xs">
              The yoga-first platform for live classes, guided breathwork, and
              custom mats built around your practice.
            </p>
            <div className="flex gap-3">
              {[RiTwitterXLine, RiInstagramLine, RiLinkedinBoxLine, RiYoutubeLine].map(
                (Icon, i) => (
                  <Link
                    key={i}
                    to="#"
                    className="w-8 h-8 rounded-xl bg-card hover:bg-accent flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Icon size={15} />
                  </Link>
                )
              )}
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <p className="text-foreground text-xs font-semibold uppercase tracking-wider mb-4">
                {category}
              </p>
              <ul className="flex flex-col gap-2.5">
                {items.map((item) => (
                  <li key={item}>
                    <Link
                      to="#"
                      className="text-sm hover:text-foreground transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs">
          <p>© 2025 Navakarana. All rights reserved.</p>
          <p>
            Made with ❤️ by <a className="hover:underline decoration-2 underline-offset-2 text-blue-800" href="https://letslearn.asia" target="_blank" rel="noreferrer nopener">LetsLearn IT, Nepal </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
