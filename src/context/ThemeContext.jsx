import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext(null);

// Mock settings — replace with GET /settings/public when backend is ready
const mockSettings = {
  platform_name: "Navakarana",
  logo_url: "/navakarana_logo.png",
  theme_color_forest: "#2d6a4f",
  theme_color_saffron: "#961919",
  theme_color_gold: "#c9a84c",
  theme_color_cream: "#fdf8f0",
  theme_color_parchment: "#f5efe0",
  theme_color_sand: "#e8dcc8",
  theme_color_bark: "#8b6914",
  theme_color_charcoal: "#2c2c2c",
  theme_color_ink: "#111111",
  theme_color_forest_mid: "#4a8c6e",
  theme_color_forest_lt: "#a8d5be",
  theme_color_saffron_lt: "#c05050",
  theme_color_gold_lt: "#e8d08c",
};

export function ThemeProvider({ children }) {
  const [settings, setSettings] = useState(mockSettings);

  useEffect(() => {
    // Apply theme colors as CSS custom properties
    const root = document.documentElement;
    Object.entries(settings).forEach(([key, value]) => {
      if (key.startsWith("theme_color_")) {
        const varName = `--${key.replace(/_/g, "-")}`;
        root.style.setProperty(varName, value);
      }
    });
  }, [settings]);

  return (
    <ThemeContext.Provider value={{ settings, platform_name: settings.platform_name, logo_url: settings.logo_url }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
