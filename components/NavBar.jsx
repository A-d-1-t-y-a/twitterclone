"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import cx from "classnames";

function NavBar() {
  const pathName = usePathname();
  const { data: session } = useSession();

  const enable = session?.user;

  const [kebab, setKebab] = useState();

  const handleKebab = () => setKebab((prev) => !prev);

  const navBarItemsArray = [
    {
      fillIcon: "/assets/icons/logo-fill-blue.svg",
      icon: "/assets/icons/logo-fill-blue.svg",
      title: "",
      path: "/",
      enable: true,
    },
    {
      fillIcon: "/assets/icons/home-fill.svg",
      icon: "/assets/icons/home.svg",
      title: "Home",
      path: "/",
      enable: enable,
    },
    {
      fillIcon: "/assets/icons/hash-blue.svg",
      icon: "/assets/icons/hash.svg",
      title: "explore",
      path: "/explore",
      enable: true,
    },
    {
      fillIcon: "/assets/icons/bell-fill.svg",
      icon: "/assets/icons/bell.svg",
      title: "notifications",
      path: "/notifications",
      enable: enable,
    },
    {
      fillIcon: "/assets/icons/message-fill.svg",
      icon: "/assets/icons/message.svg",
      title: "messages",
      path: "/messages",
      enable: enable,
    },
    {
      fillIcon: "/assets/icons/bookmark-fill.svg",
      icon: "/assets/icons/bookmark.svg",
      title: "Bookmarks",
      path: "/bookmarks",
      enable: enable,
    },
    {
      fillIcon: "/assets/icons/list-fill.svg",
      icon: "/assets/icons/list.svg",
      title: "List",
      path: "/list",
      enable: enable,
    },
    {
      fillIcon: "/assets/icons/profile-fill.svg",
      icon: "/assets/icons/profile.svg",
      title: "profile",
      path: "/profile",
      enable: enable,
    },
    {
      fillIcon: "/assets/icons/more-fill.svg",
      icon: "/assets/icons/more.svg",
      title: "more",
      path: "/more",
      enable: true,
    },
  ];

  const renderProfile = () => (
    <div className="my-5 relative w-full flex justify-center">
      <div className="mx-auto flex items-center gap-3" onClick={handleKebab}>
        <Image
          alt="failed"
          src={session?.user?.image}
          width={40}
          height={40}
          className="object-cover rounded-full"
        />
        <div className="flex-1 hidden md:block">
          <p className="font-bold text-base text-textBlack">
            {session?.user.name}
          </p>
          <p className="text-medium text-gray5 text-sm">
            @{session?.user.name}
          </p>
        </div>
        <Image
          alt="failed"
          src="/assets/icons/horizontal-kebab.svg"
          width={26}
          height={26}
          className="hidden md:block"
        />
      </div>
      {kebab && (
        <div className="absolute bottom-full right-0 left-0 flex flex-col justify-center mx-auto z-10 my-3 shadow-md border px-2 py-3 w-full">
          <button
            className="bg-primary text-white font-medium text-base py-2 px-8 rounded-full"
            onClick={signOut}
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );

  return (
    <nav className="border px-6 pt-8 h-[100vh] flex flex-col lg:w-72">
      <div className="flex-1">
        {navBarItemsArray.map(
          ({ fillIcon, icon, title, path, enable }) =>
            enable && (
              <Link
                key={title}
                href={path}
                className={cx(
                  "flex items-center gap-4 py-1 px-2",
                  title ? "my-2" : "mb-7"
                )}
              >
                <Image
                  alt="failed"
                  src={path == pathName ? fillIcon : icon}
                  width={26}
                  height={26}
                />
                <p
                  className={cx(
                    "font-extrabold text-xl capitalize hidden sm:block",
                    path == pathName ? "text-primary" : "text-navBarFontColor"
                  )}
                >
                  {title}
                </p>
              </Link>
            )
        )}

        {session?.user && (
          <button className="bg-primary rounded-full md:py-4 md:px-16 font-extrabold text-white text-base mx-auto my-3 px-5 py-3">
            <p className="hidden sm:block">Tweet</p>
            <p className="block sm:hidden">t</p>
          </button>
        )}
      </div>

      {session?.user && renderProfile()}
    </nav>
  );
}

export default NavBar;
