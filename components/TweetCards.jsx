"use client";

import { memo, useState } from "react";
import Image from "next/image";

import moment from "moment";
import cx from "classnames";

function TweetCards({ tweets }) {
  const [likes, setLikes] = useState([]);
  const [retweets, setRetweets] = useState([]);
  const [share, setShare] = useState("");

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

  const handleRetweetOrLikes = (id, data, setData) => () => {
    if (data.includes(id)) setData((prev) => prev.filter((e) => e != id));
    else setData((prev) => [...prev, id]);
  };

  const handleCheckingPresence = (id, backData, data, setData) => {
    if (backData) {
      setData((prev) => [...prev, id]);
      return true;
    } else return data.includes(id);
  };

  const renderPostActions = ({
    likesCount,
    retweetCount,
    retweet,
    like,
    _id,
    description,
  }) => {
    const retweetBoolean = handleCheckingPresence(
      _id,
      retweet,
      retweets,
      setRetweets
    );
    const likesBoolean = handleCheckingPresence(_id, like, likes, setLikes);

    const postActionsArray = [
      {
        icon: "/assets/icons/chat.svg",
        handler: () => console.log("clicked"),
        buttonClassName:
          "hover:bg-sky-400 rounded-full hover:py-1 hover:px-3",
      },
      {
        icon: "/assets/icons/retweet.svg",
        activeIcon: "/assets/icons/retweet-green.svg",
        count: retweetBoolean ? retweetCount + 1 : retweetCount,
        bool: retweetBoolean,
        handler: handleRetweetOrLikes(_id, retweets, setRetweets),
        className: "text-green-400",
        buttonClassName:
          "hover:bg-green-200 rounded-full hover:py-1 hover:px-3",
      },
      {
        icon: "/assets/icons/love.svg",
        activeIcon: "/assets/icons/red-love.svg",
        count: likesBoolean ? likesCount + 1 : likesCount,
        bool: likesBoolean,
        handler: handleRetweetOrLikes(_id, likes, setLikes),
        className: "text-red-700",
        buttonClassName: "hover:bg-red-100 rounded-full hover:py-1 hover:px-3",
      },
      {
        icon: "/assets/icons/share.svg",
        buttonClassName: "hover:bg-primary rounded-full hover:py-1 hover:px-3",
        handler: handleShare(description, _id),
      },
    ];

    return (
      <div
        className="my-3 flex items-center justify-between mx-4 gap-2"
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
                "flex items-center gap-1 transition-all delay-200 ease-in-out duration-300 bg",
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
              {count && <p className={className}>{count}</p>}
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
      <div key={_id}>
        <div className="flex items-start gap-4 px-6 py-4 border w-full">
          {userDetails?.image && (
            <Image
              alt="failed"
              src={userDetails.image}
              width={40}
              height={40}
              className="rounded-full aspect-square object-cover"
            />
          )}
          <div className="flex-1">
            <div className="flex items-center mb-1">
              <div className="flex items-center gap-1 flex-1">
                <p className="font-bold text-sm text-black line-clamp-1">
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
                <p className="text-xs text-gray3 line-clamp-1">
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
            {renderPostActions(tweet)}
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

  return tweets.map((tweet) => renderTweet(tweet));
}

export default memo(TweetCards);
