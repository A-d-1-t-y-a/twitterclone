"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { twMerge } from "tw-merge";
import Profile from "./Profile";

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
    <div className="max-w-[620px] w-[570px] relative">
      <div className="absolute z-50 left-0 right-0">
        <div className="relative z-0">
          {headerUI ? (
            <>{headerUI()}</>
          ) : (
            <div className="flex items-center border px-8 py-3 bg-transparent">
              {renderBackButton()}
              <p className="text-black font-black text-xl flex-1 line-clamp-1">
                {title}
              </p>
              <Image
                src="/assets/icons/stars-plus.svg"
                width={24}
                height={24}
                alt="failed"
                className="hidden min-[540px]:block"
              />
              <div className="block min-[540px]:hidden">
                <Profile />
              </div>
            </div>
          )}
          <div
            className={twMerge(
              "absolute -z-10 bg-white blur-sm opacity-75 left-0 right-0 top-0 bottom-0",
              underLayClassName
            )}
          />
        </div>
      </div>

      <div
        className="h-[100vh] overflow-y-auto w-full pt-16"
        id="centerScrollBarId"
      >
        {children}
      </div>
    </div>
  );
};

export default OuterLayout;
