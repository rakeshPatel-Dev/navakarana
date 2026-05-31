import { Routes, Route, Navigate } from "react-router-dom";

// Layouts
import Header from "@/components/layout/header/Header";
import Footer from "@/components/layout/footer/Footer";
import TeacherLayout from "@/components/layout/TeacherLayout/TeacherLayout";
import AdminLayout from "@/components/layout/AdminLayout/AdminLayout";

// Route Guards
import {
  AuthRequired,
  NonTeacherRoute,
  StudentRoute,
  TeacherRoute,
  TeacherUnlockedRoute,
  AdminRoute,
  AdminOnlyRoute,
} from "@/components/shared/RouteGuards";

// Landing
import LandingPage from "@/components/landing/LandingPage";

// Auth pages
import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage";

// Stream pages
import StreamsPage from "@/pages/streams/StreamsPage";
import StreamDetailPage from "@/pages/streams/StreamDetailPage";

// Watch page
import WatchPage from "@/pages/watch/WatchPage";

// Student pages
import MyLibraryPage from "@/pages/student/MyLibraryPage";
import NotificationsPage from "@/pages/student/NotificationsPage";
import ChannelPage from "@/pages/student/channel/ChannelPage";

// Mat pages
import MatInfoPage from "@/pages/mat/MatInfoPage";
import MatOrderPage from "@/pages/mat/MatOrderPage";
import MatCheckoutSuccessPage from "@/pages/mat/MatCheckoutSuccessPage";
import MatOrdersPage from "@/pages/mat/MatOrdersPage";

// Teacher pages
import TeacherUnlockPage from "@/pages/teacher/TeacherUnlockPage";
import TeacherDashboardPage from "@/pages/teacher/TeacherDashboardPage";
import TeacherStreamsPage from "@/pages/teacher/TeacherStreamsPage";
import TeacherChannelPage from "@/pages/teacher/TeacherChannelPage";

// Admin pages
import AdminLoginPage from "@/pages/admin/AdminLoginPage";
import AdminDashboardPage from "@/pages/admin/AdminDashboardPage";
import AdminTeachersPage from "@/pages/admin/AdminTeachersPage";
import AdminUsersPage from "@/pages/admin/AdminUsersPage";
import AdminStreamsPage from "@/pages/admin/AdminStreamsPage";
import AdminSettingsPage from "@/pages/admin/AdminSettingsPage";
import MatDashboardPage from "@/pages/admin/MatDashboardPage";

/** Pages that have the public header + footer */
function PublicLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  );
}

/** Auth pages (login/register) without header */
function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
      {children}
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      {/* ── Public ─────────────────────────────────── */}
      <Route
        path="/"
        element={
          <PublicLayout>
            <LandingPage />
          </PublicLayout>
        }
      />
      <Route
        path="/channel/:slug"
        element={
          <PublicLayout>
            <ChannelPage />
          </PublicLayout>
        }
      />
      <Route
        path="/mat/info"
        element={
          <PublicLayout>
            <MatInfoPage />
          </PublicLayout>
        }
      />
      <Route
        path="/streams"
        element={
          <PublicLayout>
            <StreamsPage />
          </PublicLayout>
        }
      />
      <Route
        path="/streams/:uuid"
        element={
          <PublicLayout>
            <StreamDetailPage />
          </PublicLayout>
        }
      />

      {/* ── Auth ───────────────────────────────────── */}
      <Route path="/login" element={<AuthLayout><LoginPage /></AuthLayout>} />
      <Route path="/register" element={<AuthLayout><RegisterPage /></AuthLayout>} />

      {/* ── Student-facing (NonTeacherRoute) ────────── */}

      <Route
        path="/watch/:uuid"
        element={
          <AuthRequired>
            <NonTeacherRoute>
              <WatchPage />
            </NonTeacherRoute>
          </AuthRequired>
        }
      />

      {/* ── Student private ─────────────────────────── */}
      <Route
        path="/my-library"
        element={
          <PublicLayout>
            <AuthRequired>
              <MyLibraryPage />
            </AuthRequired>
          </PublicLayout>
        }
      />
      <Route
        path="/notifications"
        element={
          <PublicLayout>
            <AuthRequired>
              <NotificationsPage />
            </AuthRequired>
          </PublicLayout>
        }
      />
      <Route
        path="/mat/order"
        element={
          <PublicLayout>
            <StudentRoute>
              <MatOrderPage />
            </StudentRoute>
          </PublicLayout>
        }
      />
      <Route
        path="/mat/checkout/success"
        element={
          <PublicLayout>
            <StudentRoute>
              <MatCheckoutSuccessPage />
            </StudentRoute>
          </PublicLayout>
        }
      />
      <Route
        path="/mat/orders"
        element={
          <PublicLayout>
            <StudentRoute>
              <MatOrdersPage />
            </StudentRoute>
          </PublicLayout>
        }
      />

      {/* ── Teacher Portal ───────────────────────────── */}
      <Route
        path="/teacher/unlock"
        element={
          <TeacherRoute>
            <TeacherUnlockPage />
          </TeacherRoute>
        }
      />
      <Route path="/teacher" element={<TeacherUnlockedRoute><TeacherLayout /></TeacherUnlockedRoute>}>
        <Route index element={<Navigate to="/teacher/dashboard" replace />} />
        <Route path="dashboard" element={<TeacherDashboardPage />} />
        <Route path="streams" element={<TeacherStreamsPage />} />
        <Route path="channel" element={<TeacherChannelPage />} />
      </Route>

      {/* ── Admin Portal ─────────────────────────────── */}
      <Route path="/admin/login" element={<AuthLayout><AdminLoginPage /></AuthLayout>} />
      <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboardPage />} />
        <Route path="teachers" element={<AdminOnlyRoute><AdminTeachersPage /></AdminOnlyRoute>} />
        <Route path="users" element={<AdminOnlyRoute><AdminUsersPage /></AdminOnlyRoute>} />
        <Route path="streams" element={<AdminOnlyRoute><AdminStreamsPage /></AdminOnlyRoute>} />
        <Route path="settings" element={<AdminOnlyRoute><AdminSettingsPage /></AdminOnlyRoute>} />
      </Route>
      <Route path="/mat/dashboard" element={<AdminRoute><AdminLayout /></AdminRoute>}>
        <Route index element={<MatDashboardPage />} />
      </Route>

      {/* ── Fallback ──────────────────────────────────── */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
