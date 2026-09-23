import { BookOpen, Home } from "lucide-react";

import { Link, useLocation } from "react-router";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import { currentUser } from "@/lib/mock-data";

const items = [
  {
    title: "หน้าแรก",
    url: "/",
    icon: Home,
  },
  {
    title: "ลงทะเบียนเรียน",
    url: "/enrollment",
    icon: BookOpen,
  },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="px-2 py-1 text-sm font-semibold">
          CPE & ISNE
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            เมนูหลัก
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    isActive={
                      location.pathname === item.url
                    }
                    render={
                      <Link to={item.url} />
                    }
                  >
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <Separator />

        <div className="flex items-center gap-3 px-2 py-2">
          <Avatar>
            <AvatarImage
              src={currentUser.avatar}
              alt={currentUser.nickname}
            />

            <AvatarFallback>
              {currentUser.nickname
                .slice(0, 2)
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="min-w-0">
            <p className="truncate text-sm font-medium">
              {currentUser.nickname}
            </p>

            <Badge
              variant="outline"
              className="mt-1"
            >
              {currentUser.role}
            </Badge>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}