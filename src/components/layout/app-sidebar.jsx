
import { NavMain } from "@/components/layout/nav-main"
import { NavUser } from "@/components/layout/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Link } from "react-router-dom"
import { useSidebar } from "@/components/ui/sidebar"
import { AnimatedThemeToggler } from "../ui/animated-theme-toggler";
import { Separator } from "../ui/separator";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
}

export function AppSidebar({
  navMain,
  type,
  ...props
}) {

  const {state} = useSidebar();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:p-1.5! h-16">
              <Link to="/">
              {state === "collapsed" ? (
                <img src="/navakarana_logo.png" alt="Navakarana Logo" className="size-6 " />
              ) : (
                <img src="/navakarana_logo.png" alt="Navakarana Logo" className="size-8 " />
              )}
                <div className="ml-2 flex flex-col">
                  <span className="text-base font-semibold">Navakarana</span>
                  <span className=" text-xs font-semibold text-muted-foreground  tracking-wide">{type} Dashboard</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
</SidebarContent>
      <SidebarFooter>
<Separator className="my-1" />
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Toggle Theme">
              <AnimatedThemeToggler />
              <span>Toggle Theme</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <Separator className="my-1" />
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
