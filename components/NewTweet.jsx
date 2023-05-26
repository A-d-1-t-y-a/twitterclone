import { memo, useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";

import convertToBase64 from "@/utils/convertor";

function NewTweet({ handleTweetPost }) {
  const { data: session } = useSession();

  const [tweet, setTweet] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const handleUnSelectImage = () => setSelectedImage(null);

  const handleTweet = (e) => setTweet(e.target.value);

  const handleImageSelect = async (e) => {
    const [File] = e.target.files;
    if (File) {
      const imageUrl = await convertToBase64(File);

      setSelectedImage(imageUrl);
    }
  };

  const handleTweetPostButtonClick = () => {
    if (typeof handleTweetPost === "function") {
      const finalObject = { tweet, selectedImage };
      handleTweetPost(finalObject);
      setTweet("");
      setSelectedImage(null);
    }
  };

  const renderSelectedImage = () =>
    selectedImage && (
      <div className="relative">
        <Image
          alt="failed"
          src={selectedImage}
          width={574}
          height={285}
          className="rounded-2xl aspect-video my-2"
        />
        <button
          className="absolute top-3 left-3 w-8 h-8 rounded-full bg-black text-center text-white"
          onClick={handleUnSelectImage}
        >
          X
        </button>
      </div>
    );

  const renderTweetInputActions = () => (
    <div className="flex items-center">
      <div className="flex-1 flex items-center gap-4">
        <label onChange={handleImageSelect}>
          <Image
            alt="failed"
            src="/assets/icons/image.svg"
            width={24}
            height={24}
          />
          <input type="file" className="hidden" accept="image/*" />
        </label>

        <Image
          alt="failed"
          src="/assets/icons/gif.svg"
          width={24}
          height={24}
        />
        <Image
          alt="failed"
          src="/assets/icons/poll.svg"
          width={24}
          height={24}
        />
        <Image
          alt="failed"
          src="/assets/icons/smile-emoji.svg"
          width={24}
          height={24}
        />

        <Image
          alt="failed"
          src="/assets/icons/schedule.svg"
          width={24}
          height={24}
        />
      </div>
      <button
        className="bg-primary py-2 px-4 rounded-full font-bold text-base text-white disabled:opacity-50"
        disabled={!tweet}
        onClick={handleTweetPostButtonClick}
      >
        Tweet
      </button>
    </div>
  );

  return (
    <div className="flex items-start gap-3 py-3 px-4">
      <Image
        alt="failed"
        src={session?.user?.image}
        width={50}
        height={50}
        className="object-cover rounded-full"
      />
      <div className="flex-1">
        <textarea
          placeholder="What’s happening?"
          value={tweet}
          onChange={handleTweet}
          className="placeholder:text-gray5 text-black font-medium border-none outline-none p-2 w-full"
        />
        {renderSelectedImage()}
        {renderTweetInputActions()}
      </div>
    </div>
  );
}

export default memo(NewTweet);
