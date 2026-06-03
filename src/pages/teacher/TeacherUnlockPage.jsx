import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { RiLockPasswordLine, RiCheckboxCircleLine, RiExternalLinkLine, RiShieldUserLine } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

export default function TeacherUnlockPage() {
  const navigate = useNavigate();
  const { user, unlockTeacher } = useAuth();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Check if admin granted free access
  const hasAdminFreeAccess = user?.admin_free_access || false;

  const handleUnlock = () => {
    setLoading(true);
    // Simulate Stripe payment checkout process
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);

      // Update local storage / AuthContext
      unlockTeacher();

      setTimeout(() => {
        navigate("/teacher/dashboard");
      }, 1500);
    }, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12 relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-brand/5 blob-shape pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-muted/50 blob-shape-2 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-background border border-border p-8 rounded-4xl shadow-xl shadow-stone-200/50 z-10 text-center space-y-6"
      >
        <div className="size-16 bg-brand/5 text-brand rounded-3xl flex items-center justify-center mx-auto text-3xl shadow-sm border border-brand/5">
          <RiLockPasswordLine />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-black text-foreground leading-tight">Unlock Your Teacher Dashboard</h2>
          <p className="text-muted-foreground text-sm max-w-sm mx-auto">
            Get instant access to scheduling live yoga classes, selling class recordings, tracking student purchases, and customizing your channel.
          </p>
        </div>

        {success ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-4 bg-emerald-50 border border-emerald-100 text-emerald-800 text-sm rounded-2xl flex items-center justify-center gap-2 font-semibold"
          >
            <RiCheckboxCircleLine className="size-5 text-emerald-600" /> Unlock Authorized! Redirecting...
          </motion.div>
        ) : (
          <div className="space-y-4 pt-2">
            {/* Features summary list */}
            <div className="text-left text-xs text-muted-foreground space-y-2.5 bg-background p-4 rounded-2xl border border-border">
              <div className="flex items-center gap-2">
                <RiCheckboxCircleLine className="text-brand size-4 shrink-0" />
                <span>Host high-definition live classes with real-time chat.</span>
              </div>
              <div className="flex items-center gap-2">
                <RiCheckboxCircleLine className="text-brand size-4 shrink-0" />
                <span>Publish and set prices for class recordings.</span>
              </div>
              <div className="flex items-center gap-2">
                <RiCheckboxCircleLine className="text-brand size-4 shrink-0" />
                <span>Interactive student dashboard & community growth.</span>
              </div>
            </div>

            {hasAdminFreeAccess ? (
              <div className="space-y-3">
                <div className="p-3 bg-emerald-50 border border-emerald-100 text-emerald-800 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5">
                  <RiShieldUserLine className="size-4" /> Access Granted Free by Administrator
                </div>
                <Button
                  onClick={handleUnlock}
                  disabled={loading}
                  className="w-full h-11 bg-card hover:bg-card text-foreground font-bold rounded-xl shadow-md cursor-pointer"
                >
                  {loading ? "Authorizing..." : "Initialize Free Dashboard Access"}
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-between items-baseline border-b border-border pb-3">
                  <span className="text-muted-foreground text-sm font-semibold">One-time Registration Fee</span>
                  <span className="text-3xl font-black text-foreground">$49.00</span>
                </div>

                <Button
                  onClick={handleUnlock}
                  disabled={loading}
                  className="w-full h-11 bg-brand hover:bg-brand-light text-white font-bold rounded-xl shadow-lg shadow-brand/20 cursor-pointer"
                >
                  {loading ? "Processing..." : "Pay $49 to Unlock Dashboard"}
                </Button>
              </div>
            )}
          </div>
        )}

        <div className="text-center pt-2">
          <Link to="/" className="text-xs text-muted-foreground hover:text-muted-foreground transition-colors font-medium">
            Back to Public Homepage
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
