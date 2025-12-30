"use client";

import { AdaptiveSidebar } from "@/components/layout/adaptive-sidebar";
import { TopNavigation } from "@/components/layout/top-navigation";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { FAB } from "@/components/layout/fab";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Generate breadcrumb items based on pathname
  const breadcrumbItems = useMemo(() => {
    const segments = pathname.split("/").filter(Boolean);

    if (segments.length === 0) {
      return [{ label: "Dashboard", href: "/" }];
    }

    const items = [{ label: "Dashboard", href: "/" }];

    segments.forEach((segment, index) => {
      const href = "/" + segments.slice(0, index + 1).join("/");
      const label = segment
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

      items.push({ label, href });
    });

    return items;
  }, [pathname]);

  return (
    <div className="flex min-h-screen">
      <AdaptiveSidebar />

      <div className="flex-1 flex flex-col md:ml-[240px] transition-all duration-300">
        <TopNavigation />

        <Breadcrumb items={breadcrumbItems} />

        <main className="flex-1 p-4 md:p-6 pb-24 md:pb-6">
          {children}
        </main>
      </div>

      <FAB label="New" onClick={() => console.log("FAB clicked")} />
    </div>
  );
}
