import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useAdminAuth } from "@/context/AdminAuthContext";
import PageLoader from "./PageLoader";

/** Requires student/teacher login. Waits for initialized before rendering. */
export function AuthRequired({ children }) {
  const { user, initialized } = useAuth();
  const location = useLocation();
  if (!initialized) return <PageLoader />;
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;
  return children;
}

/** Logged-in students only. Teachers → /teacher/dashboard. Admins → /admin/login. */
export function NonTeacherRoute({ children }) {
  const { user, initialized } = useAuth();
  const location = useLocation();
  if (!initialized) return <PageLoader />;
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;
  if (user.role === "teacher") return <Navigate to="/teacher/dashboard" replace />;
  if (user.role === "admin" || user.role === "mat_dashboard")
    return <Navigate to="/admin/login" replace />;
  return children;
}

/** Student can access but not admin/teacher. */
export function StudentRoute({ children }) {
  const { user, initialized } = useAuth();
  const location = useLocation();
  if (!initialized) return <PageLoader />;
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;
  if (user.role === "teacher") return <Navigate to="/teacher/dashboard" replace />;
  if (user.role === "admin" || user.role === "mat_dashboard")
    return <Navigate to="/admin/dashboard" replace />;
  return children;
}

/** Teacher role required. */
export function TeacherRoute({ children }) {
  const { user, initialized } = useAuth();
  const location = useLocation();
  if (!initialized) return <PageLoader />;
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;
  if (user.role !== "teacher") return <Navigate to="/" replace />;
  return children;
}

/** Teacher + dashboard unlocked. */
export function TeacherUnlockedRoute({ children }) {
  const { user, initialized, isTeacherUnlocked } = useAuth();
  const location = useLocation();
  if (!initialized) return <PageLoader />;
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;
  if (user.role !== "teacher") return <Navigate to="/" replace />;
  if (!isTeacherUnlocked()) return <Navigate to="/teacher/unlock" replace />;
  return children;
}

/** Admin or mat_dashboard role required (uses admin session). */
export function AdminRoute({ children }) {
  const { admin } = useAdminAuth();
  if (!admin) return <Navigate to="/admin/login" replace />;
  return children;
}

/** Admin role only (not mat_dashboard). */
export function AdminOnlyRoute({ children }) {
  const { admin } = useAdminAuth();
  if (!admin) return <Navigate to="/admin/login" replace />;
  if (admin.role !== "admin") return <Navigate to="/admin/dashboard" replace />;
  return children;
}
