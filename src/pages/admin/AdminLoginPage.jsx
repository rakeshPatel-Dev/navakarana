import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAdminAuth } from "@/context/AdminAuthContext";
import { RiShieldUserLine, RiMailLine, RiLockLine, RiArrowRightLine } from "react-icons/ri";

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const { adminLogin } = useAdminAuth();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    
    const newErrors = {};
    if (!email) {
      newErrors.email = "Email is required";
    }
    if (!password) {
      newErrors.password = "Password is required";
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate admin login
    setTimeout(() => {
      setIsSubmitting(false);
      // Hardcode dashboard roles for testing
      // admin@test.com -> admin role
      // mat@test.com -> mat_dashboard role
      let role = "admin";
      if (email.includes("mat")) {
        role = "mat_dashboard";
      }
      
      const success = adminLogin({
        uuid: "admin-uuid-1",
        email,
        name: role === "admin" ? "Super Admin" : "Mat Manager",
        role
      }, "mock-admin-token");
      
      if (success) {
        setSuccessMsg("Logged in successfully! Redirecting...");
        setTimeout(() => {
          if (role === "mat_dashboard") {
            navigate("/mat/dashboard");
          } else {
            navigate("/admin/dashboard");
          }
        }, 1500);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-card px-4 py-12 relative overflow-hidden">
      {/* Dark theme styled background grid/dots */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md bg-background border border-border p-8 rounded-4xl shadow-2xl shadow-black z-10 text-foreground"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-card border border-border text-brand rounded-2xl mb-4">
            <RiShieldUserLine className="size-6" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight">Admin Access</h2>
          <p className="text-muted-foreground mt-2 text-sm max-w-xs mx-auto">
            This login is for admin and mat_dashboard users only.
          </p>
        </div>

        {successMsg && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mb-6 p-3 bg-emerald-950/50 text-emerald-400 text-sm rounded-xl border border-emerald-900/50 text-center font-medium"
          >
            {successMsg}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-muted-foreground font-medium">Email Address</Label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-muted-foreground">
                <RiMailLine className="size-5" />
              </span>
              <Input
                id="email"
                type="email"
                placeholder="admin@navakarana.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-12 bg-card border-border text-foreground focus:bg-card focus:border-border transition-all placeholder:text-muted-foreground text-base"
              />
            </div>
            {errors.email && (
              <p className="text-brand text-xs mt-1 font-medium">{errors.email}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="password" className="text-muted-foreground font-medium">Password</Label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-muted-foreground">
                <RiLockLine className="size-5" />
              </span>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-12 bg-card border-border text-foreground focus:bg-card focus:border-border transition-all placeholder:text-muted-foreground text-base"
              />
            </div>
            {errors.password && (
              <p className="text-brand text-xs mt-1 font-medium">{errors.password}</p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-14 bg-card hover:bg-accent active:bg-card border border-border text-foreground rounded-2xl font-bold transition-all flex justify-center items-center gap-2 cursor-pointer shadow-lg text-base"
          >
            {isSubmitting ? "Verifying..." : "Enter Portal"}
            {!isSubmitting && <RiArrowRightLine />}
          </Button>
        </form>

        <div className="mt-8 text-center border-t border-border pt-4">
          <Link to="/login" className="text-xs text-muted-foreground hover:text-muted-foreground transition-colors">
            Back to Student Portal
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
