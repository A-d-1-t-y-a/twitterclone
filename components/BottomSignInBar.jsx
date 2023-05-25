"use client";

import { useSession, signIn } from "next-auth/react";

function BottomSignInBar() {
  const { data: session } = useSession();

  return session?.user ? null : (
    <div className="absolute left-0 right-0 bottom-0 flex items-center justify-around bg-primary py-2 px-16">
      <div className="hidden sm:block">
        <p className="font-extrabold text-white text-2xl ">
          Don’t miss what’s happening
        </p>
        <p className="font-medium text-white text-sm">
          People on Twitter are the first to know.
        </p>
      </div>
      <button
        className="border-white border font-extrabold text-white rounded-full py-2 w-full sm:w-32"
        onClick={signIn}
      >
        sign in
      </button>
    </div>
  );
}

export default BottomSignInBar;
