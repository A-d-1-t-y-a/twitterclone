import { memo, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

const Profile = () => {
  const { data: session } = useSession();

  const [kebab, setKebab] = useState();

  const handleKebab = () => setKebab((prev) => !prev);

  return (
    session?.user && (
      <div className="my-5 relative w-full flex justify-center">
        <div className="mx-auto flex items-center gap-3" onClick={handleKebab}>
          <Image
            alt="failed"
            src={session?.user?.image}
            width={40}
            height={40}
            className="object-cover rounded-full"
          />
          <div className="flex-1 hidden md:block">
            <p className="font-bold text-base text-textBlack line-clamp-1">
              {session?.user.name}
            </p>
            <p className="text-medium text-gray5 text-sm line-clamp-1">
              @{session?.user.name}
            </p>
          </div>
          <Image
            alt="failed"
            src="/assets/icons/horizontal-kebab.svg"
            width={26}
            height={26}
            className="hidden md:block"
          />
        </div>
        
        {kebab && (
          <div className="absolute max-[540px]:top-full min-[540px]:bottom-full right-0 flex items-center justify-center z-10 my-3 shadow-md border bg-slate-200 rounded-md p-3 w-40 min-[540px]:w-full ">
            <button
              className="bg-primary text-white font-medium text-base py-2 px-8 rounded-full whitespace-nowrap w-full"
              onClick={signOut}
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    )
  );
};

export default memo(Profile);
