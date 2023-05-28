"use client";

import { memo, useState } from "react";

import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

import cx from "classnames";

import DialogBox from "./DialogBox";
import NewTweet from "./NewTweet";
import Profile from "./Profile";

function NavBar() {
  const pathName = usePathname();

  const { data: session } = useSession();

  const enable = session?.user;

  const [dialogBox, setDialogBox] = useState(false);

  const handleDialogBox = () => setDialogBox((prev) => !prev);

  const fetchTweetPost = async ({ tweet, selectedImage }) => {
    try {
      await fetch("api/tweet", {
        method: "POST",
        body: JSON.stringify({
          userDetails: session?.user.id,
          description: tweet,
          imageUrl: selectedImage,
        }),
      });

      handleDialogBox();
    } catch (e) {
      console.log(e);
    }
  };

  const navBarItemsArray = [
    {
      fillIcon: "/assets/icons/logo-fill-blue.svg",
      icon: "/assets/icons/logo-fill-blue.svg",
      title: "",
      path: "/",
      enable: true,
      mobile: false,
    },
    {
      fillIcon: "/assets/icons/home-fill.svg",
      icon: "/assets/icons/home.svg",
      title: "Home",
      path: "/",
      enable: enable,
      mobile: true,
    },
    {
      fillIcon: "/assets/icons/hash-blue.svg",
      icon: "/assets/icons/hash.svg",
      title: "explore",
      path: "/explore",
      enable: true,
      mobile: true,
    },
    {
      fillIcon: "/assets/icons/bell-fill.svg",
      icon: "/assets/icons/bell.svg",
      title: "notifications",
      path: "/notifications",
      enable: enable,
      mobile: true,
    },
    {
      fillIcon: "/assets/icons/message-fill.svg",
      icon: "/assets/icons/message.svg",
      title: "messages",
      path: "/messages",
      enable: enable,
      mobile: false,
    },
    {
      fillIcon: "/assets/icons/bookmark-fill.svg",
      icon: "/assets/icons/bookmark.svg",
      title: "Bookmarks",
      path: "/bookmarks",
      enable: enable,
      mobile: true,
    },
    {
      fillIcon: "/assets/icons/list-fill.svg",
      icon: "/assets/icons/list.svg",
      title: "List",
      path: "/list",
      enable: enable,
      mobile: false,
    },
    {
      fillIcon: "/assets/icons/profile-fill.svg",
      icon: "/assets/icons/profile.svg",
      title: "profile",
      path: `/${session?.user?.id}/${session?.user?.name}`,
      enable: enable,
      mobile: true,
    },
    {
      fillIcon: "/assets/icons/more-fill.svg",
      icon: "/assets/icons/more.svg",
      title: "more",
      path: "",
      enable: true,
      mobile: false,
    },
  ];

  const renderNavItem = ({ fillIcon, icon, title, path, enable }) =>
    enable && (
      <Link
        key={title}
        href={path}
        className={cx(
          "flex items-center gap-4 px-4",
          title ? "py-3 hover:bg-slate-100 rounded-full" : "pb-3"
        )}
      >
        <Image
          alt="failed"
          src={path == pathName.replace(/%20/g, " ") ? fillIcon : icon}
          width={26}
          height={26}
        />
        <p
          className={cx(
            "font-bold text-md capitalize hidden md:block",
            path == pathName.replace(/%20/g, " ")
              ? "text-primary"
              : "text-navBarFontColor"
          )}
        >
          {title}
        </p>
      </Link>
    );

  const renderDialogBoxUI = () => (
    <DialogBox open={dialogBox} onClose={handleDialogBox}>
      <NewTweet handleTweetPost={fetchTweetPost} />
    </DialogBox>
  );

  const renderNavItemFromMobileView = ({
    fillIcon,
    icon,
    title,
    path,
    mobile,
  }) =>
    mobile && (
      <Link
        key={title}
        href={path}
        className={cx(
          "flex items-center gap-4 px-4",
          title ? "py-3 hover:bg-slate-100 rounded-full" : "pb-3"
        )}
      >
        <Image
          alt="failed"
          src={path == pathName.replace(/%20/g, " ") ? fillIcon : icon}
          width={26}
          height={26}
        />
      </Link>
    );

  const renderMobileView = () => (
    <div className="absolute bottom-0 left-0 right-0 block min-[540px]:hidden bg-white z-30">
      <div className="flex items-center justify-around w-full bg-white">
        {navBarItemsArray.map((navOption) =>
          renderNavItemFromMobileView(navOption)
        )}
      </div>
    </div>
  );

  const renderDesktopView = () => (
    <nav
      className="border pt-4 h-[100vh] flex flex-col min-[530px]:items-center md:items-start min-[530px]:w-24 md:px-6 md:w-72 overflow-auto"
      id="navBarScrollBarId"
    >
      <div className="flex-1">
        {navBarItemsArray.map((navOption) => renderNavItem(navOption))}
        {session?.user && (
          <button
            className="bg-primary rounded-full md:py-4 md:px-16 font-extrabold text-white text-base mx-auto my-3 px-5 py-3"
            onClick={handleDialogBox}
          >
            <p className="hidden md:block">Tweet</p>
            <p className="block md:hidden">t</p>
          </button>
        )}
      </div>
      <Profile />
      {renderDialogBoxUI()}
    </nav>
  );

  return (
    <>
      <div className="hidden min-[540px]:block">{renderDesktopView()}</div>
      {renderMobileView()}
    </>
  );
}

export default memo(NavBar);
