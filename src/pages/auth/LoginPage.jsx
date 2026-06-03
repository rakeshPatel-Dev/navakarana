import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { RiMailLine, RiLockLine, RiArrowRightLine } from "react-icons/ri";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    
    // Simple validation
    const newErrors = {};
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      // Hardcode some mock accounts:
      // student@test.com / password -> student
      // teacher@test.com / password -> teacher
      let role = "student";
      if (email.includes("teacher")) {
        role = "teacher";
      }
      
      const success = login({
        uuid: role === "teacher" ? "teacher-uuid-1" : "student-uuid-1",
        email,
        name: role === "teacher" ? "Arjun Mehta" : "Jane Doe",
        role,
        is_locked: role === "teacher" // Teachers are locked by default in mock if not unlocked
      }, "mock-jwt-token");
      
      if (success) {
        setSuccessMsg("Logged in successfully! Redirecting...");
        setTimeout(() => {
          if (role === "teacher") {
            navigate("/teacher/dashboard");
          } else {
            navigate("/");
          }
        }, 1500);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12 relative overflow-hidden">
      {/* Decorative Blob Shapes */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-brand/5 blob-shape pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-muted/50 blob-shape-2 pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-background border border-border p-8 rounded-4xl shadow-xl shadow-foreground/5 z-10"
      >
        <div className="text-center mb-8">
          <Link to="/" className="inline-block text-2xl font-bold tracking-tight text-foreground">
            Navakarana<span className="text-brand">.</span>
          </Link>
          <p className="text-muted-foreground mt-2 text-sm">Welcome back! Please enter your details.</p>
        </div>

        {successMsg && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mb-6 p-3 bg-green-500/10 text-green-600 dark:text-green-400 text-sm rounded-xl border border-green-500/20 text-center font-medium"
          >
            {successMsg}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-foreground font-medium">Email Address</Label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-muted-foreground">
                <RiMailLine className="size-5" />
              </span>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`pl-12 transition-all text-sm ${
                  errors.email ? "border-brand ring-3 ring-brand/10" : ""
                }`}
              />
            </div>
            {errors.email && (
              <p className="text-brand text-xs mt-1 font-medium">{errors.email}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <Label htmlFor="password" className="text-foreground font-medium">Password</Label>
              <a href="#" className="text-xs text-muted-foreground hover:text-brand transition-colors">Forgot password?</a>
            </div>
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
                className={`pl-12 transition-all text-sm ${
                  errors.password ? "border-brand ring-3 ring-brand/10" : ""
                }`}
              />
            </div>
            {errors.password && (
              <p className="text-brand text-xs mt-1 font-medium">{errors.password}</p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-14 bg-brand hover:bg-brand-light text-white rounded-2xl font-bold transition-all flex justify-center items-center gap-2 cursor-pointer shadow-lg shadow-brand/20 text-base"
          >
            {isSubmitting ? "Signing in..." : "Sign In"}
            {!isSubmitting && <RiArrowRightLine />}
          </Button>
        </form>

        <div className="mt-8 text-center space-y-4">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/register" className="text-brand font-semibold hover:underline">
              Sign up
            </Link>
          </p>
          <div className="border-t border-border pt-4">
            <Link to="/admin/login" className="text-xs text-muted-foreground hover:text-muted-foreground transition-colors">
              Are you an Admin? Sign in here
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
