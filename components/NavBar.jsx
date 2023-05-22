"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import cx from "classnames";

function NavBar() {
  const pathName = usePathname();

  const navBarItemsArray = [
    {
      fillIcon: "/assets/icons/logo-fill-blue.svg",
      icon: "/assets/icons/logo-fill-blue.svg",
      title: "",
      path: "/",
    },
    {
      fillIcon: "/assets/icons/home-fill.svg",
      icon: "/assets/icons/home.svg",
      title: "Home",
      path: "/",
    },
    {
      fillIcon: "/assets/icons/hash-blue.svg",
      icon: "/assets/icons/hash.svg",
      title: "explore",
      path: "/explore",
    },
    {
      fillIcon: "/assets/icons/bell-fill.svg",
      icon: "/assets/icons/bell.svg",
      title: "notifications",
      path: "/notifications",
    },
    {
      fillIcon: "/assets/icons/message-fill.svg",
      icon: "/assets/icons/message.svg",
      title: "messages",
      path: "/messages",
    },
    {
      fillIcon: "/assets/icons/bookmark-fill.svg",
      icon: "/assets/icons/bookmark.svg",
      title: "Bookmarks",
      path: "/bookmarks",
    },
    {
      fillIcon: "/assets/icons/list-fill.svg",
      icon: "/assets/icons/list.svg",
      title: "List",
      path: "/list",
    },
    {
      fillIcon: "/assets/icons/profile-fill.svg",
      icon: "/assets/icons/profile.svg",
      title: "profile",
      path: "/profile",
    },
    {
      fillIcon: "/assets/icons/more-fill.svg",
      icon: "/assets/icons/more.svg",
      title: "more",
      path: "/more",
    },
  ];

  return (
    <nav className="border px-6 pt-8 h-[100vh]">
      {navBarItemsArray.map(({ fillIcon, icon, title, path }) => (
        <Link
          key={title}
          href={path}
          className={cx(
            "flex items-center gap-4 py-1 px-2",
            title ? "my-2" : "mb-7"
          )}
        >
          <Image
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
      ))}
      <button className="bg-primary rounded-full md:py-4 md:px-16 font-extrabold text-white text-base mx-auto my-3 px-5 py-3">
        <p className="hidden sm:block">Tweet</p>
        <p className="block sm:hidden">t</p>
      </button>
    </nav>
  );
}

export default NavBar;
