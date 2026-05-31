import { RiLiveLine, RiTwitterXLine, RiInstagramLine, RiLinkedinBoxLine, RiYoutubeLine } from "react-icons/ri";
import { Link } from "react-router-dom";

const links = {
  Platform: ["Browse Classes", "Live Now", "Styles", "Trending"],
  Instructors: ["Become a Teacher", "Dashboard", "Resources", "Pricing"],
  Company: ["About Us", "Blog", "Careers", "Press"],
  Support: ["Help Center", "Contact Us", "Privacy Policy", "Terms"],
};

export default function Footer() {
  return (
    <footer className="bg-stone-950 text-stone-400 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 pb-12 border-b border-stone-800">
          {/* Brand */}
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-brand text-white">
                <RiLiveLine className="text-base" />
              </span>
              <span className="text-white font-bold text-base">Navakarana</span>
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
                    className="w-8 h-8 rounded-xl bg-stone-800 hover:bg-stone-700 flex items-center justify-center text-stone-400 hover:text-white transition-colors"
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
              <p className="text-white text-xs font-semibold uppercase tracking-wider mb-4">
                {category}
              </p>
              <ul className="flex flex-col gap-2.5">
                {items.map((item) => (
                  <li key={item}>
                    <Link
                      to="#"
                      className="text-sm hover:text-stone-200 transition-colors"
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
            Made for yogis everywhere
          </p>
        </div>
      </div>
    </footer>
  );
}
