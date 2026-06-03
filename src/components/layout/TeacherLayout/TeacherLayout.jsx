import { Outlet, useNavigate } from "react-router-dom"
import { useAuth } from "@/context/AuthContext"
import { RiDashboardLine, RiVideoLine, RiUserLine } from "react-icons/ri"

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
  { url: "/teacher/dashboard", icon: (<RiDashboardLine/>), title: "Dashboard" },
  { url: "/teacher/streams", icon: (<RiVideoLine/>), title: "My Classes" },
  { url: "/teacher/channel", icon: (<RiUserLine/>), title: "Channel" },
];


export default function TeacherLayout() {

  const navigate = useNavigate();

   const { user, logout } = useAuth();

     function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <SidebarProvider>
      <AppSidebar user={user} navMain={navMain} handleLogout={handleLogout} type="Teacher" />
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
