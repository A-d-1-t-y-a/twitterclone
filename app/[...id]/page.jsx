"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import moment from "moment";

import convertToBase64 from "@/utils/convertor";

import Tabs from "@/components/Tabs";
import DialogBox from "@/components/DialogBox";
import TweetCards from "@/components/TweetCards";
import OuterLayout from "@/components/OuterLayout";

const tabs = ["Tweets", "Likes", "Media", "Replies"];

function Profile({ params: { id } }) {
  const [userId, title] = id;

  const [tweets, setTweets] = useState([]);
  const [dialogBox, setDialogBox] = useState(false);
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [profileData, setProfileData] = useState({
    email: "",
    username: "",
    image: "",
    bio: "",
    createdAt: "",
    coverImage: "",
    followers: [],
    following: [],
  });

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

      handleDialogBox();
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

  const fetchDeleteTweet = (tweetId) => async () => {
    try {
      await fetch(`api/tweet/${tweetId}`, { method: "DELETE" });

      setTweets((prev) => prev.filter(({ _id }) => _id != tweetId));
    } catch (e) {
      console.log(e);
    }
  };

  const handleTabSelection = (tab) => setActiveTab(tab);

  const handleDialogBox = () => setDialogBox((prev) => !prev);

  const handleCoverImageSelect = async (e) => {
    const [File] = e.target.files;
    if (File) {
      const imageUrl = await convertToBase64(File);

      setProfileData((prev) => ({ ...prev, coverImage: imageUrl }));
    }
  };

  const handleImageSelect = async (e) => {
    const [File] = e.target.files;
    if (File) {
      const imageUrl = await convertToBase64(File);

      setProfileData((prev) => ({ ...prev, image: imageUrl }));
    }
  };

  const handleUnSelectCoverImage = () =>
    setProfileData((prev) => ({ ...prev, coverImage: "" }));

  const handleUnSelectImage = () =>
    setProfileData((prev) => ({ ...prev, image: "" }));

  const handleBioInput = (e) =>
    setProfileData((prev) => ({ ...prev, bio: e.target.value }));

  const handleUserNameInput = (e) =>
    setProfileData((prev) => ({ ...prev, username: e.target.value }));

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
          onClick={handleDialogBox}
        >
          Edit profile
        </button>
      </div>

      <div className="mt-20 pl-10 text-gray3">
        <p className="font-bold text-2xl text-black capitalize break-all break-words">
          {profileData.username}
        </p>

        <p className=" break-all break-words">@{profileData.username}</p>
        {profileData.bio && (
          <p className=" break-all break-words my-1">Bio: {profileData.bio}</p>
        )}

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
            <p className="font-bold text-black">
              {profileData.following.length}
            </p>
            <p> Following</p>
          </div>
          <div className="flex items-center gap-1">
            <p className="font-bold text-black">
              {profileData.followers.length}
            </p>
            <p>Followers</p>
          </div>
        </div>
      </div>
    </>
  );

  const renderImage = (
    image,
    handleUnselectImage,
    handleSelectImage,
    width,
    height,
    className,
    imageStyle
  ) => (
    <div className={className}>
      {image ? (
        <div className="relative w-full h-full">
          <Image
            alt="failed"
            src={image}
            width={width}
            height={height}
            className={imageStyle}
          />
          <button
            className="absolute top-3 left-3 w-8 h-8 rounded-full bg-black text-center text-white"
            onClick={handleUnselectImage}
          >
            X
          </button>
        </div>
      ) : (
        <label onChange={handleSelectImage}>
          <div className="w-full h-full">
            <Image
              src="/assets/icons/camera.svg"
              alt="icon"
              width={24}
              height={24}
            />
          </div>
          <input
            type="file"
            className="hidden w-full h-full"
            accept="image/*"
          />
        </label>
      )}
    </div>
  );

  const renderEditProfileDetails = () => (
    <>
      <div className="w-full h-full relative">
        {renderImage(
          profileData.coverImage,
          handleUnSelectCoverImage,
          handleCoverImageSelect,
          1200,
          13,
          "w-full h-56 flex items-center justify-center bg-slate-200 relative",
          "aspect-[3/1]"
        )}
        {renderImage(
          profileData.image,
          handleUnSelectImage,
          handleImageSelect,
          144,
          144,
          "w-36 h-36 flex items-center justify-center rounded-full absolute bg-slate-300 z-10 mx-5 top-2/3",
          "aspect-square rounded-full border-2"
        )}
      </div>
      <div className="mt-16 w-full">
        <input
          placeholder="Name"
          value={profileData.username}
          onChange={handleUserNameInput}
          className="rounded-lg bg-slate-200 p-3 m-4 w-11/12 outline-none"
        />
        <textarea
          placeholder="Bio"
          value={profileData.bio}
          onChange={handleBioInput}
          className="rounded-lg bg-slate-200 p-3 m-4 w-11/12 outline-none"
        />
      </div>
    </>
  );

  const renderDialogBoxHeaderUI = () => (
    <>
      <p className="flex-1 text-black font-black text-xl">Edit Profile</p>
      <button
        className="text-primary border-2 border-primary font-medium py-2 px-6 mr-4 hover:bg-primary bg-white hover:text-white rounded-full delay-100 duration-700 ease-out"
        onClick={fetchUpDateProfile}
      >
        Save
      </button>
    </>
  );

  return (
    <>
      <OuterLayout
        title={title?.replace(/%20/g, " ")}
        backNavigationOption={true}
      >
        {renderProfileDetails()}
        <Tabs tabs={tabs} activeTab={activeTab} handler={handleTabSelection} />
        <TweetCards tweets={tweets} handleDelete={fetchDeleteTweet} />
      </OuterLayout>
      <DialogBox
        open={dialogBox}
        onClose={handleDialogBox}
        headerUI={renderDialogBoxHeaderUI}
      >
        {renderEditProfileDetails()}
      </DialogBox>
    </>
  );
}

export default Profile;
