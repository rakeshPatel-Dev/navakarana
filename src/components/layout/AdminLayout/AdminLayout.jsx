import { RiDashboardLine, RiGroupLine, RiRulerLine, RiSettings3Line, RiUserLine, RiVideoLine } from "react-icons/ri"
import { useAdminAuth } from "@/context/AdminAuthContext"
import { useNavigate, Outlet } from "react-router-dom"

import { AppSidebar } from "@/components/layout/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"


const navMain = [
  { url: "/admin/dashboard", icon: (<RiDashboardLine/>), title: "Dashboard" },
  { url: "/admin/teachers", icon: (<RiUserLine/>), title: "Teachers" },
  { url: "/admin/users", icon: (<RiGroupLine/>), title: "Users" },
  { url: "/admin/streams", icon: (<RiVideoLine/>), title: "Streams" },
  { url: "/admin/settings", icon: (<RiSettings3Line/>), title: "Settings" },
  { url: "/mat/dashboard", icon: (<RiRulerLine/>), title: "Mat Dashboard" },
];

export default function AdminLayout() {

  const { admin, adminLogout } = useAdminAuth();
  const navigate = useNavigate();

  function handleLogout() {
    adminLogout();
    navigate("/admin/login");
  }

  return (
    <SidebarProvider>
      <AppSidebar user={admin} navMain={navMain} handleLogout={handleLogout} type="Admin" />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage></BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <main className="flex-1 p-6 md:p-8">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}