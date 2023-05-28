"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import NewTweet from "@/components/NewTweet";
import TweetCards from "@/components/TweetCards";
import OuterLayout from "@/components/OuterLayout";

function Home() {
  const { data: session } = useSession();

  const [tweets, setTweets] = useState([]);

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

      handleFetchTweets();
    } catch (e) {
      console.log(e);
    }
  };

  const fetchDeleteTweet = (tweetId) => async () => {
    try {
      await fetch(`api/tweet/${tweetId}`, { method: "DELETE" });

      setTweets((prev) => prev.filter(({ _id }) => _id != tweetId));
    } catch (e) {
      console.log(e);
    }
  };

  const handleFetchTweets = async () => {
    try {
      const res = await fetch(
        "api/tweet",
        { method: "GET" }
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

  return (
    <OuterLayout title="Home">
      {session?.user && (
        <>
          <NewTweet handleTweetPost={fetchTweetPost} />
          <hr className=" h-3 bg-spacer" />
        </>
      )}
      <TweetCards tweets={tweets} handleDelete={fetchDeleteTweet} />
    </OuterLayout>
  );
}

export default Home;
