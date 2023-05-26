"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { usePathname } from "next/navigation";

import cx from "classnames";

import SearchBar from "./SearchBar";
import Trends from "./Trends";

function SideBar() {
  const { data: session } = useSession();
  const pathName = usePathname();

  const renderFollowersCard = (item) => (
    <div className="flex items-center gap-2 p-4" key={item}>
      <Image
        alt="failed"
        src="https://tse4.mm.bing.net/th?id=OIP.OEPGLqK06UyK50LC6kNmegHaEY&pid=Api&P=0&h=180"
        width={40}
        height={40}
        className="aspect-square rounded-full object-cover"
      />
      <div className="flex-1 hidden md:block">
        <p className="font-bold text-base text-textBlack flex items-center gap-1">
          lordSiva
          <Image
            alt="failed"
            src="/assets/icons/blue-checkmark.svg"
            width={24}
            height={24}
          />
        </p>
        <p className="text-gray3 text-sm">@LordSiva</p>
      </div>
      <button className="border border-primary py-1.5 px-4 text-primary text-base font-bold rounded-full">
        Follow
      </button>
    </div>
  );

  const renderFollowers = () => (
    <div
      className={cx(
        "bg-trendsBG rounded-t-xl",
        pathName == "/explore" ? "mt-3" : "mt-6"
      )}
    >
      <p className="font-black text-black text-xl py-3.5 px-5 rounded-t-xl">
        Who to follow
      </p>
      <div className="divide-y">
        {[1, 2, 3, 4, 5].map((item) => renderFollowersCard(item))}
        <button className="text-primary text-sm font-medium rounded-b-xl text-center w-full py-3 bg-trendsBG">
          Show more
        </button>
      </div>
    </div>
  );

  const renderExploreCheck = (component) =>
    pathName !== "/explore" && component;

  return session?.user ? (
    <div className="relative w-80 hidden min-[1100px]:block ml-6 py-6">
      {renderExploreCheck(<SearchBar />)}
      <div
        className={cx(
          "h-[100vh] w-full overflow-auto",
          pathName == "/explore" ? "pb-0" : "mt-4 pb-28"
        )}
        id="rightScrollBarId"
      >
        {renderExploreCheck(<Trends isButton={true} />)}
        {renderFollowers()}
      </div>
    </div>
  ) : null;
}

export default SideBar;
