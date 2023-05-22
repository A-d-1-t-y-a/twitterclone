import Image from "next/image";

function Card({ cardData }) {
  const {
    imageUrl,
    avatarURL,
    displayName,
    userName,
    isBlueTick,
    time,
    description,
    likesCount,
    shareCount,
    retweetCount,
    replyCount,
    share,
    retweet,
    like,
    reply,
  } = cardData;

  const postActionsArray = [
    {
      icon: "/assets/icons/chat.svg",
      activeIcon: "/assets/icons/chat-blue.svg",
      count: retweetCount,
      bool: retweet,
      handler: "",
      className: "text-green-500",
    },
    {
      icon: "/assets/icons/retweet.svg",
      activeIcon: "/assets/icons/retweet-green.svg",
      count: replyCount,
      bool: reply,
      handler: "",
      className: "text-green-500",
    },
    {
      icon: "/assets/icons/love.svg",
      activeIcon: "/assets/icons/red-love.svg",
      count: likesCount,
      bool: like,
      handler: "",
      className:"text-red-700"
    },
    {
      icon: "/assets/icons/share.svg",
      activeIcon: "/assets/icons/share-blue.svg",
      count: shareCount,
      bool: share,
      className: "text-primary",
      handler: "",
    },
  ];

  const renderPostActions = () => (
    <div className="my-3 flex items-center justify-between mx-4 gap-2">
      {postActionsArray.map(({ icon, activeIcon, count, bool, handler,className }) => (
        <button className="flex items-center gap-1" onClick={handler} key={icon}>
          <Image src={bool ? activeIcon : icon} width={18} height={18} />
          <p className={className}>{count}</p>
        </button>
      ))}
    </div>
  );

  return (
    <div className="flex items-start gap-4 px-8 py-4 border">
      {avatarURL && (
        <Image
          src={avatarURL}
          width={40}
          height={40}
          className="rounded-full aspect-square object-cover"
        />
      )}

      <div>
        <div className="flex items-center mb-1">
          <div className="flex items-center gap-1 flex-1">
            <p className="font-extrabold text-base text-black">{displayName}</p>
            {isBlueTick && (
              <Image
                src="/assets/icons/blue-checkmark.svg"
                width={24}
                height={24}
              />
            )}
            <p className="text-base text-gray3">@{userName} • </p>
            <p className="text-base text-gray3">{time}</p>
          </div>
          <Image
            src="/assets/icons/down-arrow.svg"
            width={16}
            height={16}
          />
        </div>
        <p className="text-navBarFontColor text-base mb-3">{description}</p>
        {imageUrl && (
          <Image
            src={imageUrl}
            width={1200}
            height={800}
            className="aspect-video object-cover"
          />
        )}
        {renderPostActions()}
      </div>
    </div>
  );
}

export default Card;
