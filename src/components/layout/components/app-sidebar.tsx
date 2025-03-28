"use client"

import * as React from "react"
import {
  Settings2,
  SquareTerminal,
  ClipboardList,
  Mail,
  FilePlus
} from "lucide-react"
import { NavMain } from "@/components/layout/components/nav-main"
import { NavSecondary } from "@/components/layout/components/nav-secondary"
import { NavUser } from "@/components/layout/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import logo from "@/assets/logo.jpeg"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/Dashboard",
      icon: SquareTerminal,
      isActive: true,
    },
    {
      title: "Add Plans",
      url: "/Dashboard/Add_Plans",
      icon: FilePlus,
      isActive: true,
    },
    {
      title: "Plans",
      url: "#",
      icon: ClipboardList,
      items: [
        {
          title: "Today Plans",
          url: "/Dashboard/Today_Plans",
        },
        {
          title: "Past Plans",
          url: "/Dashboard/Past_Plans",
        },
        {
          title: "Future Plans",
          url: "/Dashboard/Future_Plans",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Contact Us",
      url: "/Dashboard/Contact_Us",
      icon: Mail,
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
    },
  ],
  calendars: [
    {
      id: 1,
      name: "Work",
      events: [],
    },
    {
      id: 2,
      name: "Personal",
      events: [],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild className="bg-green-800 text-white">
              <a href={logo}>
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <img src={logo} alt="Logo" className="border-2 rounded-lg" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Task Tracker</span>
                  <span className="truncate text-xs">UOR</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} className="font-bold" />
        <SidebarContent>
          <SidebarSeparator className="mx-0" />
        </SidebarContent>
        <NavSecondary items={data.navSecondary} className="mt-auto font-bold" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}