"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { twMerge } from "tw-merge";

const OuterLayout = ({
  title,
  backNavigationOption,
  children,
  headerUI,
  underLayClassName,
}) => {
  const route = useRouter();

  const handleBackNavigation = () => route.back();

  const renderBackButton = () =>
    backNavigationOption && (
      <button
        onClick={handleBackNavigation}
        className="hover:bg-slate-200 h-10 w-10 flex items-center justify-center mr-3 rounded-full"
      >
        <Image
          src="/assets/icons/left-arrow.svg"
          width={24}
          height={24}
          alt="failed"
        />
      </button>
    );

  return (
    <div className="lg:w-1/2 w-9/12 relative">
      <div
        className={twMerge(
          "absolute z-10 bg-white blur-sm opacity-75 h-16 left-0 right-0",
          underLayClassName
        )}
      />
      {headerUI ? (
        <div className="absolute z-20 left-0 right-0">{headerUI()}</div>
      ) : (
        <div className="flex items-center border px-8 py-3 absolute z-20 left-0 right-0">
          {renderBackButton()}
          <p className="text-black font-black text-xl flex-1">{title}</p>
          <Image
            src="/assets/icons/stars-plus.svg"
            width={24}
            height={24}
            alt="failed"
          />
        </div>
      )}
      <div className="h-[100vh] overflow-y-auto pt-16" id="centerScrollBarId">
        {children}
      </div>
    </div>
  );
};

export default OuterLayout;
