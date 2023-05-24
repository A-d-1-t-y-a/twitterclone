"use client"
import { useSession } from "next-auth/react";
import Image from "next/image";

function SideBar() {
  const { data: session } = useSession();
  const renderSearchBar = () => (
    <div className="py-3 px-4 bg-rightSideBg flex items-center rounded-full gap-2 mb-4">
      <Image
        src="/assets/icons/magnify.svg"
        width={20}
        height={20}
        alt="icon"
      />
      <input
        placeholder="Search Twitter"
        className="border-none outline-none bg-rightSideBg"
      />
    </div>
  );

  const renderTrendCard = (item, index) => (
    <div key={item} className="bg-trendsBG p-4">
      <div className="flex items-center">
        <p className="flex items-center flex-1 text-gray3 text-xs">
          {index}. Trending
        </p>
        <Image
          alt="failed"
          src="/assets/icons/down-arrow.svg"
          width={16}
          height={16}
        />
      </div>
      <p className="text-base font-bold text-navBarFontColor">#{item}</p>
      <p className="text-gray3 text-sm">{item} Tweets</p>
    </div>
  );

  const renderButton = () => (
    <button className="text-primary text-sm font-medium rounded-b-xl text-center w-full py-3 bg-trendsBG">
      Show more
    </button>
  );

  const renderTrendsUI = () => (
    <>
      <div className="py-3.5 px-5 bg-trendsBG flex items-center rounded-t-xl">
        <p className="font-black text-black text-xl flex-1">India Trends</p>
        <Image
          src="/assets/icons/setting.svg"
          width={24}
          height={24}
          alt="icon"
        />
      </div>
      <div className="divide-y-2">
        {[1, 2, 3, 4].map((item, index) => renderTrendCard(item, index))}
        {renderButton()}
      </div>
    </>
  );

  const renderFollowersCard = (item) => (
    <div className="flex items-center gap-2 p-4" key={item}>
      <Image
        alt="failed"
        src="https://tse4.mm.bing.net/th?id=OIP.OEPGLqK06UyK50LC6kNmegHaEY&pid=Api&P=0&h=180"
        width={40}
        height={40}
        className="aspect-square rounded-full"
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
    <div className="mt-6 bg-trendsBG rounded-t-xl">
      <p className="font-black text-black text-xl py-3.5 px-5 rounded-t-xl">
        Who to follow
      </p>
      <div className="divide-y">
        {[1, 2, 3, 4, 5].map((item) => renderFollowersCard(item))}
        {renderButton()}
      </div>
    </div>
  );

  return session?.user ? (
    <div
      className="hidden lg:block h-[100vh] w-3/12 ml-6 py-6 overflow-auto"
      id="rightScrollBarId"
    >
      {renderSearchBar()}
      {renderTrendsUI()}
      {renderFollowers()}
    </div>
  ) : null;
}

export default SideBar;
