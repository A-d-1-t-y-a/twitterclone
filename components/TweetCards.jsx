"use client";

import { memo, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";

import moment from "moment";
import cx from "classnames";
import Link from "next/link";

function TweetCards({ tweets, handleDelete }) {
  const { data: session } = useSession();

  const [share, setShare] = useState("");
  const [likes, setLikes] = useState({});
  const [retweets, setRetweets] = useState({});

  const fetchUpdateData = async (id, newArray, isLikes) => {
    try {
      await fetch("api/tweet", {
        method: "PATCH",
        body: JSON.stringify({
          id: id,
          updatedData: isLikes
            ? { likedBy: newArray[id] }
            : { retweetedBy: newArray[id] },
        }),
      });
    } catch (e) {
      console.log(e);
    }
  };

  const handleShare = (text, id) => async () => {
    try {
      await navigator.clipboard.writeText(text);

      setShare(id);

      setTimeout(() => {
        setShare("");
      }, 2000);
    } catch (e) {
      console.log(e);
    }
  };

  const handleRetweetOrLikes = (id, data, setData, isLikes) => () => {
    let tempData = { ...data };

    if (data[id].includes(session.user.id))
      tempData[id] = tempData[id].filter((e) => e != session.user.id);
    else tempData[id] = [...tempData[id], session.user.id];

    fetchUpdateData(id, tempData, isLikes);
    setData({ ...tempData });
  };

  const renderPostActions = ({ _id, description, userDetails }) => {
    const postActionsArray = [
      {
        icon: "/assets/icons/chat.svg",
        handler: () => console.log("clicked"),
        buttonClassName: "hover:bg-sky-400",
      },
      userDetails._id == session.user.id
        ? {
            icon: "/assets/icons/cross-icon.svg",
            buttonClassName: "hover:bg-red-100",
            handler: handleDelete(_id),
          }
        : {
            icon: "/assets/icons/retweet.svg",
            activeIcon: "/assets/icons/retweet-green.svg",
            count: retweets[_id]?.length,
            bool: retweets[_id]?.includes(session.user.id),
            handler: handleRetweetOrLikes(_id, retweets, setRetweets, false),
            className: "text-green-400",
            buttonClassName: "hover:bg-green-200",
          },
      {
        icon: "/assets/icons/love.svg",
        activeIcon: "/assets/icons/red-love.svg",
        count: likes[_id]?.length,
        bool: likes[_id]?.includes(session.user.id),
        handler: handleRetweetOrLikes(_id, likes, setLikes, true),
        className: "text-red-700",
        buttonClassName: "hover:bg-red-100",
      },
      {
        icon: "/assets/icons/share.svg",
        buttonClassName: "hover:bg-primary",
        handler: handleShare(description, _id),
      },
    ];

    return (
      <div
        className="mt-3 flex items-center justify-between mx-4 gap-2"
        key={_id + _id}
      >
        {postActionsArray.map(
          ({
            icon,
            activeIcon,
            count,
            bool,
            handler,
            className,
            buttonClassName,
          }) => (
            <button
              className={cx(
                "flex items-center gap-1 transition-all delay-200 ease-in-out duration-300 py-1 px-3 rounded-full",
                buttonClassName
              )}
              onClick={handler}
              key={icon}
            >
              <Image
                alt="failed"
                src={bool ? activeIcon : icon}
                width={18}
                height={18}
              />
              {count && (
                <p className={cx(bool ? className : "text-black")}>{count}</p>
              )}
            </button>
          )
        )}
      </div>
    );
  };

  const renderTweet = (tweet) => {
    const { imageUrl, userDetails, isBlueTick, createdAt, description, _id } =
      tweet;

    return (
      <div className="px-6 py-4 border" key={_id}>
        {session?.user.id && retweets[_id]?.includes(session.user.id) && (
          <p className="text-green-400 font-medium ml-2 text-sm mb-2 -mt-2">
            You Retweeted
          </p>
        )}
        <div className="flex items-start gap-4 w-full">
          {userDetails?.image && (
            <Link href={`/${userDetails._id}/${userDetails.username}`}>
              <Image
                alt="failed"
                src={userDetails.image}
                width={40}
                height={40}
                className="rounded-full aspect-square object-cover"
              />
            </Link>
          )}
          <div className="flex-1">
            <div className="flex items-center mb-1">
              <div className="flex items-center gap-1 flex-1">
                <p className="font-bold text-sm text-black line-clamp-1 break-all break-words">
                  {userDetails.username}
                </p>
                {isBlueTick && (
                  <Image
                    alt="failed"
                    src="/assets/icons/blue-checkmark.svg"
                    width={16}
                    height={16}
                  />
                )}
                <p className="text-xs text-gray3 line-clamp-1 break-all break-words">
                  @{userDetails.username} •{" "}
                </p>
                <p className="text-xs text-gray3 whitespace-nowrap">
                  {moment(createdAt).fromNow(true)}
                </p>
              </div>
            </div>
            <p className="text-navBarFontColor text-base mb-3">{description}</p>
            {imageUrl && (
              <Image
                alt="failed"
                src={imageUrl}
                width={574}
                height={285}
                className="aspect-video object-cover rounded-2xl"
              />
            )}
            {session?.user.id && renderPostActions(tweet)}
          </div>
        </div>
        {share == _id && (
          <p className="p-1 bg-green-400 w-full text-white rounded-lg text-center font-medium">
            tweet copied !!
          </p>
        )}
      </div>
    );
  };

  useEffect(() => {
    let tempLikesObject = {},
      tempRetweetsObj = {};

    for (let { likedBy, retweetedBy, _id } of tweets) {
      tempLikesObject[_id] = likedBy;

      tempRetweetsObj[_id] = retweetedBy;
    }

    setLikes({ ...tempLikesObject });

    setRetweets({ ...tempRetweetsObj });
  }, [tweets]);

  return tweets.map((tweet) => renderTweet(tweet));
}

export default memo(TweetCards);
