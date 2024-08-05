"use client"
import React, { useState } from "react";

import { cn } from "@/lib/utils";
import { useSidebar } from "@/hooks/useSidebar";
import { ArrowLeft } from "lucide-react";

interface SidebarProps {
  className?: string;
}

export default function Sidebar({ className }: SidebarProps) {
  const { isOpen, toggle } = useSidebar();
  const [status, setStatus] = useState(false);

  const handleToggle = () => {
    setStatus(true);
    toggle();
    setTimeout(() => setStatus(false), 500);
  };
  
  return (
    <nav
      className={cn(
        `relative hidden h-screen border-r pt-10 md:block`,
        status && "duration-200",
        isOpen ? "w-44" : "w-[50px]",
        className
      )}
    >
      <ArrowLeft
      size={22}
        className={cn(
          "absolute -right-3 top-0 cursor-pointer rounded-full border bg-background text-3xl text-foreground transition-transform duration-500",
          !isOpen && "rotate-180"
        )}
        onClick={handleToggle}
      />
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="mt-3 space-y-1">
            {/* <SideNav
              className="text-background opacity-0 transition-all duration-300 group-hover:z-50 group-hover:ml-4 group-hover:rounded group-hover:bg-foreground group-hover:p-2 group-hover:opacity-100"
              items={NavItems}
            /> */}
          </div>
        </div>
      </div>
    </nav>
  );
}
