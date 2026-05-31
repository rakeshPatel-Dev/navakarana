import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { RiUserLine, RiMailLine, RiLockLine, RiArrowRightLine, RiInformationLine } from "react-icons/ri";

export default function RegisterPage() {
  const navigate = useNavigate();
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [role, setRole] = useState("student"); // 'student' | 'teacher'
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    
    // Simple validation
    const newErrors = {};
    if (!name.trim()) {
      newErrors.name = "Full name is required";
    }
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
    if (password !== passwordConfirmation) {
      newErrors.passwordConfirmation = "Passwords do not match";
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API registration
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccessMsg("Registration successful! Redirecting to login...");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-50 px-4 py-12 relative overflow-hidden">
      {/* Decorative Blob Shapes */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-brand/5 blob-shape pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-stone-200/50 blob-shape-2 pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white border border-stone-100 p-8 rounded-4xl shadow-xl shadow-stone-200/50 z-10"
      >
        <div className="text-center mb-8">
          <Link to="/" className="inline-block text-2xl font-bold tracking-tight text-stone-900">
            Navakarana<span className="text-brand">.</span>
          </Link>
          <p className="text-stone-500 mt-2 text-sm">Create your account to start learning or teaching.</p>
        </div>

        {successMsg && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mb-6 p-3 bg-emerald-50 text-emerald-700 text-sm rounded-xl border border-emerald-100 text-center font-medium"
          >
            {successMsg}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Role Toggle */}
          <div className="space-y-1.5">
            <Label className="text-stone-700 font-medium">Join as a</Label>
            <div className="grid grid-cols-2 gap-2 p-1 bg-stone-100 rounded-xl">
              <button
                type="button"
                onClick={() => setRole("student")}
                className={`py-2 text-sm font-semibold rounded-lg transition-all cursor-pointer ${
                  role === "student"
                    ? "bg-white text-stone-900 shadow-sm"
                    : "text-stone-500 hover:text-stone-900"
                }`}
              >
                Student
              </button>
              <button
                type="button"
                onClick={() => setRole("teacher")}
                className={`py-2 text-sm font-semibold rounded-lg transition-all cursor-pointer ${
                  role === "teacher"
                    ? "bg-white text-stone-900 shadow-sm"
                    : "text-stone-500 hover:text-stone-900"
                }`}
              >
                Teacher
              </button>
            </div>
            {role === "teacher" && (
              <motion.div 
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-2 p-3 bg-brand/5 border border-brand/10 text-brand-dark rounded-xl mt-2 text-xs"
              >
                <RiInformationLine className="size-4 shrink-0 mt-0.5" />
                <p>Note: A welcome email will be sent after registration to guide you on setting up your streaming portal.</p>
              </motion.div>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="name" className="text-stone-700 font-medium">Full Name</Label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-stone-400">
                <RiUserLine className="size-4" />
              </span>
              <Input
                id="name"
                type="text"
                placeholder="Jane Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`pl-10 h-11 rounded-xl bg-stone-50 border-stone-200 focus:bg-white transition-all ${
                  errors.name ? "border-brand ring-3 ring-brand/10" : ""
                }`}
              />
            </div>
            {errors.name && (
              <p className="text-brand text-xs mt-1 font-medium">{errors.name}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-stone-700 font-medium">Email Address</Label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-stone-400">
                <RiMailLine className="size-4" />
              </span>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`pl-10 h-11 rounded-xl bg-stone-50 border-stone-200 focus:bg-white transition-all ${
                  errors.email ? "border-brand ring-3 ring-brand/10" : ""
                }`}
              />
            </div>
            {errors.email && (
              <p className="text-brand text-xs mt-1 font-medium">{errors.email}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="password" className="text-stone-700 font-medium">Password</Label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-stone-400">
                <RiLockLine className="size-4" />
              </span>
              <Input
                id="password"
                type="password"
                placeholder="At least 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`pl-10 h-11 rounded-xl bg-stone-50 border-stone-200 focus:bg-white transition-all ${
                  errors.password ? "border-brand ring-3 ring-brand/10" : ""
                }`}
              />
            </div>
            {errors.password && (
              <p className="text-brand text-xs mt-1 font-medium">{errors.password}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="passwordConfirmation" className="text-stone-700 font-medium">Confirm Password</Label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-stone-400">
                <RiLockLine className="size-4" />
              </span>
              <Input
                id="passwordConfirmation"
                type="password"
                placeholder="Repeat password"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                className={`pl-10 h-11 rounded-xl bg-stone-50 border-stone-200 focus:bg-white transition-all ${
                  errors.passwordConfirmation ? "border-brand ring-3 ring-brand/10" : ""
                }`}
              />
            </div>
            {errors.passwordConfirmation && (
              <p className="text-brand text-xs mt-1 font-medium">{errors.passwordConfirmation}</p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-11 bg-brand hover:bg-brand-light text-white rounded-xl font-medium transition-all flex justify-center items-center gap-2 cursor-pointer shadow-lg shadow-brand/20 mt-2"
          >
            {isSubmitting ? "Creating Account..." : "Create Account"}
            {!isSubmitting && <RiArrowRightLine />}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-stone-500">
            Already have an account?{" "}
            <Link to="/login" className="text-brand font-semibold hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
