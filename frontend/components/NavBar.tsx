import React, { useState } from "react";
import { useRouter } from "next/router";

const routeNames = ["Search", "Register", "Manage", "Compare"];
const routeMap = new Map([
  ["Search", "/"],
  ["Register", "/register"],
  ["Manage", "/manage"],
  ["Compare", "/compare"],
]);

const NavBar = () => {
  const router = useRouter();
  const [currentRoute, setCurrentRoute] = useState(router.pathname);

  return (
    <div
      className="w-full h-[80px] flex flex-row justify-items-end gap-[50px] items-center border-b-[3px] border-b-blue-800
      bg-blue-400 fixed top-0 z-50"
    >
      <div className="flex flex-row justify-between w-[90%] h-full">
        <div className="text-[30px] [text-shadow:_4px_4px_0_rgb(0_0_0_/_15%)] text-white ml-[50px] mt-[12px]">
          Tokyo Olympics Information Dashboard
        </div>
        <div className="flex flex-row gap-[20px] text-[20px]  h-full text-white">
          {routeNames.map((route, idx) => (
            <a key={idx} href={routeMap.get(route)}>
              <p
                className={`mt-[22px] ${
                  routeMap.get(route) == currentRoute ? "underline" : ""
                }`}
              >
                {route}
              </p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
export default NavBar;
