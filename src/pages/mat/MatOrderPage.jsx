import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  RiRuler2Line,  RiEyeLine,
  RiArrowRightLine, RiErrorWarningLine, RiInformationLine
} from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function MatOrderPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const cancelled = searchParams.get("cancelled") === "1";

  // Form State
  const [measurements, setMeasurements] = useState({
    fm1: "",
    fm2: "",
    fm3: "",
    fm4: "",
    fm5: "",
    fm6: "",
    fm7: "",
    fm8: "",
    fm9: "",
    fm10: "",
    fm11: "",
    fm12: ""
  });
  const [motto, setMotto] = useState("");
  const [fline, setFline] = useState("Solid"); // 'Solid' | 'Border'
  const [errors, setErrors] = useState({});

  const handleInputChange = (field, val) => {
    setMeasurements((prev) => ({ ...prev, [field]: val }));
  };

  const validateForm = () => {
    const newErrors = {};
    // fm1-fm9 are required
    const required = [
      { key: "fm1", label: "Shoulder Width" },
      { key: "fm2", label: "Chest Circumference" },
      { key: "fm3", label: "Waist Circumference" },
      { key: "fm4", label: "Hip Circumference" },
      { key: "fm5", label: "Height" },
      { key: "fm6", label: "Inseam Length" },
      { key: "fm7", label: "Arm Length" },
      { key: "fm8", label: "Wrist Circumference" },
      { key: "fm9", label: "Ankle Circumference" }
    ];

    required.forEach((item) => {
      const val = measurements[item.key];
      if (!val) {
        newErrors[item.key] = `${item.label} is required`;
      } else if (isNaN(val) || Number(val) <= 0) {
        newErrors[item.key] = "Must be a positive number";
      }
    });

    if (motto.length > 18) {
      newErrors.motto = "Motto cannot exceed 18 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePreviewMat = () => {
    if (!validateForm()) {
      alert("Please fill in the required fields correctly to preview.");
      return;
    }
    // Mock downloading or opening SVG preview
    alert(`Generating SVG preview...\nMotto: "${motto || "BREATHE & FLOW"}"\nLine Style: ${fline}\nDimensions calculated successfully!`);
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Simulate redirection to Stripe Checkout
    alert("Redirecting to Stripe Checkout securely...");
    // Mock checkout success state redirection with mock session id
    setTimeout(() => {
      navigate("/mat/checkout/success?session_id=cs_test_navakarana" + Math.random().toString(36).substr(2, 9));
    }, 800);
  };

  return (
    <div className="bg-background min-h-screen py-30 px-4 md:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="border-b border-border/60 pb-6">
          <span className="text-brand font-bold text-xs uppercase tracking-widest">Store Catalog</span>
          <h1 className="text-3xl font-extrabold text-foreground mt-1 flex items-center gap-2">
            <RiRuler2Line /> Order Your Custom Mat
          </h1>
          <p className="text-muted-foreground text-sm mt-2">Provide your measurements to customize your alignment lines, engrave your motto, and place your order.</p>
        </div>

        {/* Cancellation Notice */}
        {cancelled && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-brand/5 border border-brand/20 text-brand-dark rounded-2xl flex items-start gap-3"
          >
            <RiErrorWarningLine className="size-5 shrink-0 mt-0.5 text-brand" />
            <div>
              <p className="font-bold text-sm">Checkout Cancelled</p>
              <p className="text-xs text-muted-foreground mt-0.5">Your payment process was cancelled. You can review your details and try placing the order again below.</p>
            </div>
          </motion.div>
        )}

        <form onSubmit={handleCheckout} className="space-y-8">
          {/* Card 1: Required Measurements (fm1-fm9) */}
          <div className="bg-background border border-border p-8 md:p-10 rounded-4xl shadow-sm space-y-8">
            <div>
              <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-muted flex items-center justify-center text-xs text-muted-foreground font-bold">1</span>
                Required Body Measurements (cm)
              </h2>
              <p className="text-xs text-muted-foreground mt-1.5">Provide accurate bone and height measurements to construct the alignment layout.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[
                { key: "fm1", label: "Shoulder Width" },
                { key: "fm2", label: "Chest Circumference" },
                { key: "fm3", label: "Waist Circumference" },
                { key: "fm4", label: "Hip Circumference" },
                { key: "fm5", label: "Height" },
                { key: "fm6", label: "Inseam Length" },
                { key: "fm7", label: "Arm Length" },
                { key: "fm8", label: "Wrist Circumference" },
                { key: "fm9", label: "Ankle Circumference" }
              ].map((item) => (
                <div key={item.key} className="space-y-2">
                  <Label htmlFor={item.key} className="text-foreground text-xs font-semibold">{item.label}</Label>
                  <Input
                    id={item.key}
                    type="number"
                    step="0.1"
                    placeholder="e.g. 42.5"
                    value={measurements[item.key]}
                    onChange={(e) => handleInputChange(item.key, e.target.value)}
                    aria-invalid={!!errors[item.key]}
                  />
                  {errors[item.key] && (
                    <p className="text-brand text-[10px] font-medium mt-1">{errors[item.key]}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Card 2: Optional Measurements (fm10-fm12) */}
          <div className="bg-background border border-border p-8 md:p-10 rounded-4xl shadow-sm space-y-8">
            <div>
              <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-muted flex items-center justify-center text-xs text-muted-foreground font-bold">2</span>
                Optional Measurements (cm)
              </h2>
              <p className="text-xs text-muted-foreground mt-1.5">Additional details to fine-tune alignment guidance spacing.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { key: "fm10", label: "Neck Circumference" },
                { key: "fm11", label: "Calf Circumference" },
                { key: "fm12", label: "Thigh Circumference" }
              ].map((item) => (
                <div key={item.key} className="space-y-2">
                  <Label htmlFor={item.key} className="text-foreground text-xs font-semibold">{item.label} <span className="text-[10px] text-muted-foreground font-normal">(optional)</span></Label>
                  <Input
                    id={item.key}
                    type="number"
                    step="0.1"
                    placeholder="e.g. 38.0"
                    value={measurements[item.key]}
                    onChange={(e) => handleInputChange(item.key, e.target.value)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Card 3: Customization (Motto & Line Style) */}
          <div className="bg-background border border-border p-8 md:p-10 rounded-4xl shadow-sm space-y-8">
            <div>
              <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-muted flex items-center justify-center text-xs text-muted-foreground font-bold">3</span>
                Engraving & Aesthetics
              </h2>
              <p className="text-xs text-muted-foreground mt-1.5">Configure layout visuals and motto lettering.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Motto Field */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="motto" className="text-foreground font-semibold text-xs">Personal Motto Engraving</Label>
                  <span className="text-[10px] text-muted-foreground font-medium">{motto.length}/18 chars</span>
                </div>
                <Input
                  id="motto"
                  type="text"
                  placeholder="e.g. BREATHE & FLOW"
                  maxLength={18}
                  value={motto}
                  onChange={(e) => setMotto(e.target.value.toUpperCase())}
                  aria-invalid={!!errors.motto}
                />
                {errors.motto ? (
                  <p className="text-brand text-xs font-medium mt-1">{errors.motto}</p>
                ) : (
                  <p className="text-[10px] text-muted-foreground mt-1.5 flex items-start gap-1"><RiInformationLine className="size-3.5 mt-0.5 text-muted-foreground shrink-0" /> Will be lasered at the center-head of the mat in capital letters.</p>
                )}
              </div>

              {/* Line Style Selection */}
              <div className="space-y-2.5">
                <Label className="text-foreground font-semibold text-xs">Alignment Line Style</Label>
                <div className="grid grid-cols-2 gap-4">
                  {["Solid", "Border"].map((style) => (
                    <button
                      key={style}
                      type="button"
                      onClick={() => setFline(style)}
                      className={`h-11 font-semibold rounded-xl text-xs flex items-center justify-center border cursor-pointer transition-all ${fline === style
                          ? "bg-brand border-background text-white shadow-sm shadow-stone-900/10"
                          : "bg-foreground/5 border-border text-primary hover:text-primary/80 hover:bg-foreground/2"
                        }`}
                    >
                      {style} Line Guide
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Form Action Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-6">
            <Button
              type="button"
              onClick={handlePreviewMat}
              variant="outline"
              className="w-full sm:w-auto h-11 border-border hover:bg-background text-foreground font-bold rounded-xl gap-2 cursor-pointer"
            >
              <RiEyeLine /> Preview Custom SVG
            </Button>
            <Button
              type="submit"
              className="w-full sm:w-auto h-11 bg-brand hover:bg-brand-light text-white font-bold rounded-xl gap-1.5 shadow-lg shadow-brand/20 cursor-pointer px-6"
            >
              Proceed to Stripe Checkout <RiArrowRightLine />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
