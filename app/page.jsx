"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import convertToBase64 from "@/utils/convertor";
import OuterLayout from "@/components/OuterLayout";
import SelectAndUnSelect from "@/components/SelectAndUnSelect";
import TweetCards from "@/components/TweetCards";

function Home() {
  const [tweet, setTweet] = useState("");
  const [tweets, setTweets] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const { data: session } = useSession();

  const tweetOption = [
    {
      Tag: (
        <label
          onChange={async (e) => {
            const [File] = e.target.files;
            if (File) {
              const imageUrl = await convertToBase64(File);
              setSelectedImage(imageUrl);
            }
          }}
        >
          <Image
            alt="failed"
            src={"/assets/icons/image.svg"}
            width={24}
            height={24}
          />
          <input type="file" className="hidden" accept="image/*" />
        </label>
      ),
    },
    {
      Tag: (
        <button>
          <Image
            alt="failed"
            src="/assets/icons/gif.svg"
            width={24}
            height={24}
          />
        </button>
      ),
    },
    {
      Tag: (
        <button>
          <Image
            alt="failed"
            src="/assets/icons/poll.svg"
            width={24}
            height={24}
          />
        </button>
      ),
    },
    {
      Tag: (
        <button>
          <Image
            alt="failed"
            src="/assets/icons/smile-emoji.svg"
            width={24}
            height={24}
          />
        </button>
      ),
    },
    {
      Tag: (
        <button>
          <Image
            alt="failed"
            src="/assets/icons/schedule.svg"
            width={24}
            height={24}
          />
        </button>
      ),
    },
  ];

  const handleUnSelectImage = () => setSelectedImage(null);

  const handleTweet = (e) => setTweet(e.target.value);

  const handleTweetPost = async (e) => {
    e.preventDefault();
    if (selectedImage || tweet) {
      try {
        await fetch("api/tweet", {
          method: "POST",
          body: JSON.stringify({
            userDetails: session?.user.id,
            description: tweet,
            imageUrl: selectedImage,
          }),
        });
        setTweet("");
        setSelectedImage(null);

        handleFetchTweets();
      } catch (e) {
        console.log(e);
      }
    }
  };

  const handleFetchTweets = async () => {
    try {
      const res = await fetch(
        "api/tweet",
        {
          method: "GET",
        }
        // { cache: "force-cache" }
      );
      const data = await res.json();

      setTweets([...data]);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    handleFetchTweets();
  }, []);

  const renderSelectedImage = () =>
    selectedImage && (
      <SelectAndUnSelect
        width={574}
        height={285}
        selectedImage={selectedImage}
        handleUnSelectImage={handleUnSelectImage}
      />
    );
    
  return (
    <OuterLayout title="Home">
      {session?.user && (
        <>
          <div className="py-3 px-4 border">
            <div className="flex items-start gap-3">
              <Image
                alt="failed"
                src={session?.user?.image}
                width={50}
                height={50}
                className="object-cover rounded-full"
              />
              <form onSubmit={handleTweetPost} className="flex-1">
                <textarea
                  placeholder="What’s happening?"
                  value={tweet}
                  onChange={handleTweet}
                  className="placeholder:text-gray5 text-black font-medium border-none outline-none p-2 w-full"
                />
                {renderSelectedImage()}
                <div className="flex items-center">
                  <div className="flex-1 flex items-center gap-4">
                    {tweetOption.map(({ Tag }) => Tag)}
                  </div>
                  <button
                    className="bg-primary py-2 px-4 rounded-full font-bold text-base text-white disabled:opacity-50"
                    type="submit"
                    disabled={!tweet}
                  >
                    Tweet
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="w-full h-3 bg-spacer" />
        </>
      )}
        <TweetCards tweets={tweets} />
    </OuterLayout>
  );
}

export default Home;
