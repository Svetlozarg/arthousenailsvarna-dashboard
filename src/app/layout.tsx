"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/Layout/Sidebar/Sidebar";
import ThemeRegistry from "@/theme/ThemeRegistry";
import { USER_ID } from "@/helpers/helpers";
import { signOut } from "@/services/Auth/auth";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  useEffect(() => {
    if (!USER_ID) {
      if (pathname !== "/auth/login" && pathname !== "/auth/register") {
        signOut();
        window.location.replace("/auth/login");
      }
    } else {
      if (pathname === "/auth/login" || pathname === "/auth/register") {
        window.location.replace("/");
      }
    }
  }, [pathname]);

  return (
    <html lang="en">
      <ThemeRegistry>
        <body>
          {pathname !== "/auth/login" && pathname !== "/auth/register" ? (
            <Sidebar>{children}</Sidebar>
          ) : (
            children
          )}
        </body>
      </ThemeRegistry>
    </html>
  );
}
