"use client";

import { memo } from "react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

import cx from "classnames";

import SearchBar from "./SearchBar";
import Trends from "./Trends";
import WhoToFollow from "./WhoToFollow";

function SideBar() {
  const { data: session } = useSession();
  const pathName = usePathname();

  const renderExploreCheck = (component) =>
    pathName !== "/explore" && component;

  return session?.user ? (
    <div className="relative min-[1100px]:block ml-6 pt-6 max-w-xs">
      {renderExploreCheck(<SearchBar />)}
      <div
        className={cx(
          "h-[calc(100vh-100px)] w-full overflow-auto",
          pathName == "/explore" ? "pb-0" : "mt-4"
        )}
        id="rightScrollBarId"
      >
        {renderExploreCheck(<Trends isButton={true} />)}
        <WhoToFollow className={pathName == "/explore" ? "mt-3" : "mt-6"} />
      </div>
    </div>
  ) : null;
}

export default memo(SideBar);
