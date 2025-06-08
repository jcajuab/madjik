import { Outlet } from "react-router";

import { Navbar } from "@/components/Navbar";

export function RootLayout() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <Outlet />
    </>
  );
}
