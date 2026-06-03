import { useState } from "react";
import { motion } from "framer-motion";
import { RiSettings4Line, RiPaletteLine, RiMoneyDollarCircleLine, RiCheckboxCircleLine, RiInformationLine } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AdminSettingsPage() {
  const [platformName, setPlatformName] = useState("Navakarana");
  const [logoUrl, setLogoUrl] = useState("/navakarana_logo.png");
  const [currency, setCurrency] = useState("USD");
  
  const [matPrice, setMatPrice] = useState("4900"); // $49.00 in cents
  const [teacherFee, setTeacherFee] = useState("4900"); // $49.00 in cents

  // Theme Colors
  const [colors, setColors] = useState({
    theme_color_forest: "#163a24",
    theme_color_saffron: "#df7a5e",
    theme_color_gold: "#e6b06c",
    theme_color_cream: "#fbf6f0",
    theme_color_parchment: "#f8f1e5",
    theme_color_sand: "#e5d3b3",
    theme_color_bark: "#664e3c",
    theme_color_charcoal: "#333333",
    theme_color_ink: "#111111",
    theme_color_forest_mid: "#234e36",
    theme_color_forest_lt: "#406e53",
    theme_color_saffron_lt: "#eba38e",
    theme_color_gold_lt: "#f2d3a7"
  });

  const [saved, setSaved] = useState(false);

  const handleColorChange = (key, val) => {
    setColors((prev) => ({ ...prev, [key]: val }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-5">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-foreground flex items-center gap-2">
            <RiSettings4Line /> System Settings
          </h1>
          <p className="text-muted-foreground text-xs mt-1">Configure global platform metadata, transaction fee policies, and visual theme colors.</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6 max-w-4xl">
        {/* Row 1: General & Fees */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* General settings */}
          <div className="bg-background border border-border p-6 rounded-3xl shadow-sm space-y-4">
            <h3 className="font-extrabold text-foreground text-sm uppercase tracking-wider border-b border-border pb-3">
              Platform General Config
            </h3>
            
            <div className="space-y-1.5">
              <Label htmlFor="platName" className="text-foreground font-semibold text-xs">Platform Name</Label>
              <Input
                id="platName"
                value={platformName}
                onChange={(e) => setPlatformName(e.target.value)}
                className="text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="logo" className="text-foreground font-semibold text-xs">Logo Assets URL</Label>
              <Input
                id="logo"
                value={logoUrl}
                onChange={(e) => setLogoUrl(e.target.value)}
                className="text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="currency" className="text-foreground font-semibold text-xs">Default Currency Code</Label>
              <Input
                id="currency"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="text-sm"
              />
            </div>
          </div>

          {/* Fees settings */}
          <div className="bg-background border border-border p-6 rounded-3xl shadow-sm space-y-4">
            <h3 className="font-extrabold text-foreground text-sm uppercase tracking-wider border-b border-border pb-3 flex items-center gap-1.5">
              <RiMoneyDollarCircleLine /> Pricing & Transaction Fees
            </h3>
            
            <div className="space-y-1.5">
              <Label htmlFor="matPrice" className="text-foreground font-semibold text-xs">Custom Mat Price (cents)</Label>
              <Input
                id="matPrice"
                type="number"
                value={matPrice}
                onChange={(e) => setMatPrice(e.target.value)}
                className="text-sm"
              />
              <p className="text-[10px] text-muted-foreground mt-1 flex items-start gap-1"><RiInformationLine className="size-3.5 mt-0.5 text-muted-foreground shrink-0" /> Value in cents. 100 = $1.00. Current: ${(matPrice/100).toFixed(2)}</p>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="teacherFee" className="text-foreground font-semibold text-xs">Teacher Dashboard Fee (cents)</Label>
              <Input
                id="teacherFee"
                type="number"
                value={teacherFee}
                onChange={(e) => setTeacherFee(e.target.value)}
                className="text-sm"
              />
              <p className="text-[10px] text-muted-foreground mt-1 flex items-start gap-1"><RiInformationLine className="size-3.5 mt-0.5 text-muted-foreground shrink-0" /> Value in cents. 0 = Free dashboard access. Current: ${(teacherFee/100).toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* Row 2: Theme Colors */}
        <div className="bg-background border border-border p-6 md:p-8 rounded-3xl shadow-sm space-y-4">
          <h3 className="font-extrabold text-foreground text-sm uppercase tracking-wider border-b border-border pb-3 flex items-center gap-1.5">
            <RiPaletteLine /> System Brand Theme Palette
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {Object.keys(colors).map((key) => (
              <div key={key} className="space-y-1.5">
                <Label htmlFor={key} className="text-foreground font-semibold text-[10px] truncate block capitalize">
                  {key.replace(/_/g, " ")}
                </Label>
                <div className="flex gap-2 items-center">
                  <input
                    id={`${key}-picker`}
                    type="color"
                    value={colors[key]}
                    onChange={(e) => handleColorChange(key, e.target.value)}
                    className="size-10 rounded-xl border border-border cursor-pointer shrink-0"
                  />
                  <Input
                    id={key}
                    type="text"
                    value={colors[key]}
                    onChange={(e) => handleColorChange(key, e.target.value)}
                    className="h-10 rounded-xl text-xs"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action button */}
        <div className="flex items-center gap-3 pt-2">
          <Button
            type="submit"
            className="bg-card hover:bg-card text-foreground font-bold h-14 px-8 rounded-2xl cursor-pointer text-base"
          >
            Save All Settings
          </Button>

          {saved && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-emerald-600 text-xs font-semibold flex items-center gap-1"
            >
              <RiCheckboxCircleLine className="size-4" /> Platform settings updated successfully!
            </motion.span>
          )}
        </div>
      </form>
    </div>
  );
}
