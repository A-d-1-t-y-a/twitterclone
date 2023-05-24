"use client";

import Image from "next/image";
import moment from "moment";

function Card({ cardData }) {
  const {
    imageUrl,
    userDetails,
    isBlueTick,
    createdAt,
    description,
    likesCount,
    shareCount,
    retweetCount,
    replyCount,
    share,
    retweet,
    like,
    reply,
    _id,
  } = cardData;

  const postActionsArray = [
    {
      icon: "/assets/icons/chat.svg",
      activeIcon: "/assets/icons/chat-blue.svg",
      count: retweetCount,
      bool: retweet,
      handler: () => console.log("clicked"),
      className: "text-green-500",
    },
    {
      icon: "/assets/icons/retweet.svg",
      activeIcon: "/assets/icons/retweet-green.svg",
      count: replyCount,
      bool: reply,
      handler: () => console.log("clicked"),
      className: "text-green-500",
    },
    {
      icon: "/assets/icons/love.svg",
      activeIcon: "/assets/icons/red-love.svg",
      count: likesCount,
      bool: like,
      handler: () => console.log("clicked"),
      className: "text-red-700",
    },
    {
      icon: "/assets/icons/share.svg",
      activeIcon: "/assets/icons/share-blue.svg",
      count: shareCount,
      bool: share,
      className: "text-primary",
      handler: () => console.log("clicked"),
    },
  ];

  const renderPostActions = () => (
    <div className="my-3 flex items-center justify-between mx-4 gap-2">
      {postActionsArray.map(
        ({ icon, activeIcon, count, bool, handler, className }) => (
          <button
            className="flex items-center gap-1"
            onClick={handler}
            key={icon}
          >
            <Image
              alt="failed"
              src={bool ? activeIcon : icon}
              width={18}
              height={18}
            />
            <p className={className}>{count}</p>
          </button>
        )
      )}
    </div>
  );

  return (
    <div className="flex items-start gap-4 px-8 py-4 border w-full" key={_id}>
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
            <p className="font-extrabold text-base text-black">
              {userDetails.username}
            </p>
            {isBlueTick && (
              <Image
                alt="failed"
                src="/assets/icons/blue-checkmark.svg"
                width={24}
                height={24}
              />
            )}
            <p className="text-base text-gray3">@{userDetails.username} • </p>
            <p className="text-base text-gray3">
              {moment(createdAt).fromNow()}
            </p>
          </div>
          <Image
            alt="failed"
            src="/assets/icons/down-arrow.svg"
            width={16}
            height={16}
          />
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
        {renderPostActions()}
      </div>
    </div>
  );
}

export default Card;
