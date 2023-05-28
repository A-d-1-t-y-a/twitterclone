import { memo, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

import cx from "classnames";

function WhoToFollow({ className }) {
  const { data: session } = useSession();

  const [usersData, setUsersData] = useState([]);
  const [profileData, setProfileData] = useState({});

  const fetchFollowers = async () => {
    try {
      const res = await fetch("/api/followers", { method: "GET" });

      const data = await res.json();

      setUsersData([...data]);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchUpdateFollowers = async (id, data) => {
    try {
      await fetch(`/api/user/${id}`, {
        method: "PATCH",
        body: JSON.stringify({
          updatedData: data,
        }),
      });
    } catch (e) {
      console.log(e);
    }
  };

  const fetchUserDetails = async () => {
    try {
      const res = await fetch(`/api/user/${session.user.id}`, {
        method: "GET",
      });

      const data = await res.json();

      setProfileData({ ...profileData, ...data });
    } catch (e) {
      console.log(e);
    }
  };

  const handlerFilterAndAdder = (data, checkedId) => {
    let isThrown = false;

    if (data.includes(checkedId)) data = data.filter((id) => id != checkedId);
    else {
      data = [...data, checkedId];
      isThrown = true;
    }

    return { data, isThrown };
  };

  const handleFollowUnFollow = (userId, username, index) => () => {
    let tempData = [...usersData],
      currentUserTempData = { ...profileData };

    const { data: temp, isThrown: tempThrown } = handlerFilterAndAdder(
      tempData[index].followers,
      session.user.id
    );

    tempData[index].followers = temp;
    tempData[index].notification = [
      ...tempData[index].notification,
      tempThrown
        ? username + " is Following you"
        : username + " is unFollowing you",
    ];

    const { data: current, isThrown: currentThrown } = handlerFilterAndAdder(
      currentUserTempData.following,
      userId
    );

    currentUserTempData.following = current;
    currentUserTempData.notification = [
      ...currentUserTempData.notification,
      currentThrown
        ? "You are Following " + username
        : "You are unFollowed " + username,
    ];

    fetchUpdateFollowers(userId, {
      followers: tempData[index].followers,
      notification: tempData[index].notification,
    });

    fetchUpdateFollowers(session.user.id, {
      following: currentUserTempData.following,
      notification: currentUserTempData.notification,
    });

    setUsersData(tempData);

    setProfileData(currentUserTempData);
  };

  const renderFollowersCard = (
    { email, followers, following, image, username, _id },
    idx
  ) =>
    session.user.id !== _id && (
      <div className="flex items-center gap-2 p-4 hover:bg-slate-200" key={_id}>
        {image && (
          <Link href={`/${_id}/${username}`}>
            <Image
              alt="failed"
              src={image}
              width={40}
              height={40}
              className="aspect-square rounded-full object-cover"
            />
          </Link>
        )}
        <div className="flex-1 flex items-center gap-2">
          <div className="flex-1">
            <div className="flex items-center gap-1">
              <p className="line-clamp-1 font-bold text-base text-textBlack break-all break-words">
                {username}
              </p>
              <Image
                alt="failed"
                src="/assets/icons/blue-checkmark.svg"
                width={18}
                height={18}
              />
            </div>
            <p className="text-gray3 text-sm line-clamp-1 break-all break-words">
              @{username}
            </p>
          </div>
          <button
            className={cx(
              "border border-primary py-1.5 px-4 text-base font-bold rounded-full transition-all delay-75 duration-500 ease-in-out",
              followers.includes(session.user.id)
                ? " bg-primary text-white"
                : "bg-white text-primary"
            )}
            onClick={handleFollowUnFollow(_id, username, idx)}
          >
            {followers.includes(session.user.id) ? "Following" : "Follow"}
          </button>
        </div>
      </div>
    );

  useEffect(() => {
    if (session?.user) {
      fetchUserDetails();
      fetchFollowers();
    }
  }, [session?.user]);

  return (
    <div className={cx("bg-trendsBG rounded-t-xl w-full", className)}>
      <p className="font-black text-black text-xl py-3.5 px-5 rounded-t-xl min-w-72">
        Who to follow
      </p>
      <div className="divide-y">
        {usersData.map((item, idx) => renderFollowersCard(item, idx))}
        {/* <button className="text-primary text-sm font-medium rounded-b-xl text-center w-full py-3 bg-trendsBG">
        Show more
      </button> */}
      </div>
    </div>
  );
}

export default memo(WhoToFollow);
