import { useState, useEffect } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  RiCheckboxCircleLine, RiLoader4Line, RiUserLine, 
  RiMapPinLine, RiClipboardLine, RiInboxArchiveLine 
} from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function MatCheckoutSuccessPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id") || "cs_test_mocksession123";

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Address form fields
  const [shipping, setShipping] = useState({
    name: "",
    line1: "",
    line2: "",
    city: "",
    country: "",
    postal: ""
  });
  const [errors, setErrors] = useState({});

  // Simulate confirming stripe session payment loading for 1s
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (field, val) => {
    setShipping((prev) => ({ ...prev, [field]: val }));
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    setErrors({});

    // Simple validation
    const newErrors = {};
    if (!shipping.name.trim()) newErrors.name = "Full name is required";
    if (!shipping.line1.trim()) newErrors.line1 = "Address line 1 is required";
    if (!shipping.city.trim()) newErrors.city = "City is required";
    if (!shipping.country.trim()) newErrors.country = "Country is required";
    if (!shipping.postal.trim()) newErrors.postal = "Postal code is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSubmitting(true);

    // Simulate submission of measurements and address details
    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
    }, 1500);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center gap-3">
        <RiLoader4Line className="animate-spin size-10 text-brand" />
        <p className="text-stone-550 text-sm font-semibold">Confirming Stripe payment authorization...</p>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white border border-stone-100 p-8 rounded-4xl text-center shadow-lg space-y-6"
        >
          <div className="size-16 bg-emerald-50 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto text-3xl shadow-sm">
            🎉
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-black text-stone-900">Order Placed Successfully!</h2>
            <p className="text-stone-500 text-sm">
              Your anatomical dimensions have been compiled and sent to manufacturing. You can monitor progress in your dashboard.
            </p>
          </div>
          <div className="pt-2 flex flex-col gap-2">
            <Button asChild className="w-full h-11 bg-stone-900 hover:bg-stone-850 rounded-xl text-white font-bold">
              <Link to="/mat/orders">View Mat Orders</Link>
            </Button>
            <Button asChild variant="ghost" className="w-full h-11 hover:bg-stone-50 text-stone-650 rounded-xl">
              <Link to="/">Back to Home</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-stone-50 min-h-screen py-10 px-4 md:px-8">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Success Banner Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-emerald-600 text-white rounded-3xl p-6 md:p-8 text-center space-y-3 shadow-md relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
          
          <div className="size-12 bg-white/10 border border-white/20 text-white flex items-center justify-center rounded-2xl mx-auto text-xl shrink-0 shadow-sm">
            <RiCheckboxCircleLine className="size-6" />
          </div>
          
          <div>
            <h1 className="text-2xl font-black">Payment Successful! 🎉</h1>
            <p className="text-emerald-100 text-xs mt-1">Stripe Session: {sessionId}</p>
          </div>
        </motion.div>

        {/* Shipping Form Card */}
        <div className="bg-white border border-stone-100 p-8 md:p-10 rounded-4xl shadow-sm space-y-8">
          <div>
            <h2 className="text-lg font-bold text-stone-900 flex items-center gap-2">
              <RiMapPinLine className="text-brand size-5" /> Shipping Information
            </h2>
            <p className="text-xs text-stone-400 mt-1.5">Complete your delivery address details to compile the customization bundle.</p>
          </div>

          <form onSubmit={handleSubmitOrder} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-stone-700 text-xs font-semibold">Recipient Full Name</Label>
              <Input
                id="name"
                placeholder="Jane Doe"
                value={shipping.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                aria-invalid={!!errors.name}
              />
              {errors.name && <p className="text-brand text-xs font-medium mt-1">{errors.name}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="line1" className="text-stone-700 text-xs font-semibold">Address Line 1</Label>
                <Input
                  id="line1"
                  placeholder="Street address, P.O. Box"
                  value={shipping.line1}
                  onChange={(e) => handleInputChange("line1", e.target.value)}
                  aria-invalid={!!errors.line1}
                />
                {errors.line1 && <p className="text-brand text-xs font-medium mt-1">{errors.line1}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="line2" className="text-stone-700 text-xs font-semibold">Address Line 2 <span className="text-[10px] text-stone-400 font-normal">(optional)</span></Label>
                <Input
                  id="line2"
                  placeholder="Apartment, suite, unit"
                  value={shipping.line2}
                  onChange={(e) => handleInputChange("line2", e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="city" className="text-stone-700 text-xs font-semibold">City</Label>
                <Input
                  id="city"
                  placeholder="San Francisco"
                  value={shipping.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  aria-invalid={!!errors.city}
                />
                {errors.city && <p className="text-brand text-xs font-medium mt-1">{errors.city}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="country" className="text-stone-700 text-xs font-semibold">Country</Label>
                <Input
                  id="country"
                  placeholder="United States"
                  value={shipping.country}
                  onChange={(e) => handleInputChange("country", e.target.value)}
                  aria-invalid={!!errors.country}
                />
                {errors.country && <p className="text-brand text-xs font-medium mt-1">{errors.country}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="postal" className="text-stone-700 text-xs font-semibold">Postal / ZIP Code</Label>
                <Input
                  id="postal"
                  placeholder="94103"
                  value={shipping.postal}
                  onChange={(e) => handleInputChange("postal", e.target.value)}
                  aria-invalid={!!errors.postal}
                />
                {errors.postal && <p className="text-brand text-xs font-medium mt-1">{errors.postal}</p>}
              </div>
            </div>

            <Button
              type="submit"
              disabled={submitting}
              className="w-full h-11 bg-brand hover:bg-brand-light text-white font-bold rounded-xl shadow-lg shadow-brand/15 cursor-pointer mt-4"
            >
              {submitting ? "Finalizing Order Spec..." : "Submit Customized Order"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
