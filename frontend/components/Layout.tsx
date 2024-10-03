import React, { FC, PropsWithChildren, useEffect, useState } from "react";
import { Inter } from "next/font/google";
import NavBar from "./NavBar";

const inter = Inter({ subsets: ["latin"] });

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="font-[jaldi] bg-slate-500 min-h-screen">
      <main
        className={`flex flex-col items-center justify-between  ${inter.className} h-full`}
      >
        <NavBar />
        {children}
      </main>
    </div>
  );
};

export default Layout;
