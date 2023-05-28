"use client";

import OuterLayout from "@/components/OuterLayout";
import SearchBar from "@/components/SearchBar";
import Tabs from "@/components/Tabs";
import Trends from "@/components/Trends";
import TweetCards from "@/components/TweetCards";
import Image from "next/image";
import { useState, useEffect } from "react";

const tabs = ["For you", "Trending", "News", "Sports", "Entertainment"];

function page() {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [tweets, setTweets] = useState([]);

  const handleTabClick = (tab) => setActiveTab(tab);

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

  const fetchDeleteTweet = (tweetId) => async () => {
    try {
      await fetch(`api/tweet/${tweetId}`, { method: "DELETE" });

      setTweets((prev) => prev.filter(({ _id }) => _id != tweetId));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    handleFetchTweets();
  }, []);

  const renderHeaderUI = () => (
    <div className="w-full">
      <div className="w-full flex items-center py-2 px-3 -mb-4">
        <SearchBar />
        <Image
          src="/assets/icons/setting.svg"
          alt="icon"
          width={30}
          height={30}
          className="ml-10"
        />
      </div>
      <Tabs tabs={tabs} activeTab={activeTab} handler={handleTabClick} />
    </div>
  );

  return (
    <OuterLayout headerUI={renderHeaderUI} underLayClassName="opacity-90">
      <div className="h-16" />
      <Trends />
      <TweetCards tweets={tweets} handleDelete={fetchDeleteTweet} />
    </OuterLayout>
  );
}

export default page;
