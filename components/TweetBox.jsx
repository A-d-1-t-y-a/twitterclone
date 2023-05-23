"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState, memo } from "react";

function TweetBox() {
  const { data: session } = useSession();

  const [tweet, setTweet] = useState([]);

  const handleTweet = (e) => setTweet(e.target.value);

  const handleTweetPost = async () => {
    try {
      await fetch("api/tweet", {
        method: "POST",
        body: JSON.stringify({
          userDetails: session?.user.id,
          description: tweet,
        }),
      });
      setTweet("")
    } catch (e) {
      console.log(e);
    }
  };

  const tweetOption = [
    {
      icon: "/assets/icons/image.svg",
    },
    {
      icon: "/assets/icons/gif.svg",
    },
    {
      icon: "/assets/icons/poll.svg",
    },
    {
      icon: "/assets/icons/smile-emoji.svg",
    },
    {
      icon: "/assets/icons/schedule.svg",
    },
  ];
  return session?.user ? (
    <div className="py-3 px-4 border">
      <div className="flex items-start gap-3">
        <Image alt="failed"
          src={session?.user?.image}
          width={50}
          height={50}
          className="object-cover rounded-full"
        />
        <div className="flex-1">
          <input
            placeholder="What’s happening?"
            value={tweet}
            onChange={handleTweet}
            className="placeholder:text-gray5 text-black font-medium border-none outline-none p-2 mb-7"
          />
          <div className="flex items-center">
            <div className="flex-1 flex items-center gap-4">
              {tweetOption.map(({ icon }) => (
                <div key={icon}>
                  <Image alt="failed" src={icon} width={24} height={24} />
                </div>
              ))}
            </div>
            <button
              onClick={handleTweetPost}
              className="bg-primary py-2 px-4 rounded-full font-bold text-base text-white disabled:opacity-50"
              disabled={!tweet}
            >
              Tweet
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : null;
}

export default memo(TweetBox);
