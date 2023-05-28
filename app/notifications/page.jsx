"use client";

import OuterLayout from "@/components/OuterLayout";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

function Notifications() {
  const { data: session } = useSession();

  const [notifications, setNotifications] = useState([]);

  const fetchUserDetails = async () => {
    try {
      const res = await fetch(`/api/user/${session.user.id}`, {
        method: "GET",
      });

      const data = await res.json();

      setNotifications(data.notification);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (session?.user) fetchUserDetails();
  }, [session?.user]);

  return (
    <OuterLayout title="Notifications" backNavigationOption={true}>
      {session?.user &&
        (!notifications.length ? (
          <div className="flex flex-col gap-1 mt-3">
            {notifications.map((note) => (
              <div
                key={note}
                className="shadow-md border border-slate-400 px-4 py-3 rounded-xl mx-2"
              >
                <p className="font-bold text-black">{note}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="shadow-md border border-slate-400 px-4 py-3 rounded-xl mx-2 mt-3">
            <p className="font-bold text-black">
              You don't get any notifications
            </p>
          </div>
        ))}
    </OuterLayout>
  );
}

export default Notifications;
