"use client";

import TweetCards from "@/components/TweetCards";
import OuterLayout from "@/components/OuterLayout";
import Tabs from "@/components/Tabs";
import moment from "moment";
import Image from "next/image";
import { useEffect, useState } from "react";

const tabs = ["Tweets", "Likes", "Media", "Replies"];

function page({ params: { id } }) {
  const [userId, title] = id;

  const [profileData, setProfileData] = useState({
    email: "",
    username: "",
    image: "",
    createdAt: "",
    coverImage: "",
    following: 0,
    follower: 0,
  });
  const [tweets, setTweets] = useState([]);
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const fetchUserDetails = async () => {
    try {
      const res = await fetch(`/api/user/${userId}`, {
        method: "GET",
      });
      const data = await res.json();
      setProfileData({ ...profileData, ...data });
    } catch (e) {
      console.log(e);
    }
  };

  const fetchUpDateProfile = async () => {
    try {
      await fetch(`/api/user/${userId}`, {
        method: "PATCH",
        body: JSON.stringify({
          updatedData: profileData,
        }),
      });
    } catch (e) {
      console.log(e);
    }
  };

  const fetchUserTweets = async () => {
    try {
      const res = await fetch(`/api/tweet/${userId}`, { method: "GET" });
      const data = await res.json();

      setTweets([...data]);
    } catch (e) {
      console.log(e);
    }
  };

  const handleTabSelection = (tab) => setActiveTab(tab);

  useEffect(() => {
    if (userId) {
      fetchUserDetails();
      fetchUserTweets();
    }
  }, []);

  const renderProfileDetails = () => (
    <>
      <div className="relative border">
        {profileData.coverImage ? (
          <Image
            src={profileData.coverImage}
            width={1200}
            height={200}
            alt="coverImage"
            className="object-cover aspect-[3/1]"
          />
        ) : (
          <div className="w-full h-52 aspect-[3/1] bg-trendsBG" />
        )}
        {profileData.image && (
          <Image
            src={profileData.image}
            width={133}
            height={133}
            alt="image"
            className="object-cover absolute z-20 aspect-square rounded-full ml-10 top-2/3 border-4 border-white"
          />
        )}
        <button
          className="shadow shadow-primary border text-primary px-4 py-1 float-right m-4 rounded-full font-bold"
          onClick={fetchUpDateProfile}
        >
          Edit profile
        </button>
      </div>

      <div className="mt-20 pl-10 text-gray3">
        <p className="font-bold text-2xl text-black capitalize">
          {profileData.username}
        </p>

        <p>@{profileData.username}</p>

        <div className="mt-3 mb-2 flex items-center gap-1">
          <Image
            src="/assets/icons/schedule.svg"
            width={16}
            height={16}
            alt="coverImage"
          />
          <p>Joined {moment(profileData.createdAt).fromNow()}</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <p className="font-bold text-black">{profileData.following}</p>
            <p> Following</p>
          </div>
          <div className="flex items-center gap-1">
            <p className="font-bold text-black">{profileData.follower}</p>
            <p>Followers</p>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <OuterLayout
      title={title?.replace(/%20/g, " ")}
      backNavigationOption={true}
    >
      {renderProfileDetails()}
      <Tabs tabs={tabs} activeTab={activeTab} handler={handleTabSelection} />
      <TweetCards tweets={tweets} />
    </OuterLayout>
  );
}

export default page;
