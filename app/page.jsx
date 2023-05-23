"use client";
import Card from "@/components/Card";
import TweetBox from "@/components/TweetBox";
import { useEffect, useState } from "react";

function Home() {
  const [tweets, setTweets] = useState([]);
  console.log(tweets);

  const handleFetchTweets = async () => {
    try {
      const res = await fetch("api/tweet", {
        method: "GET",
      });
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
    <div className="lg:w-7/12 pt-14">
      <TweetBox />
      <div className="w-full h-3 bg-spacer" />
      {tweets.map((data) => (
        <Card cardData={data} key={data._id} />
      ))}
    </div>
  );
}

export default Home;
