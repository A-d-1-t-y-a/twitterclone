import Image from "next/image";

const OuterLayout = ({ title, children }) => {
  return (
    <div
      className="h-[100vh] overflow-y-auto lg:w-1/2"
      id="centerScrollBarId"
    >
      <div className="w-full flex items-center border px-8 pt-5 pb-3">
        <p className="text-black font-black text-xl flex-1">{title}</p>
        <Image
          src="/assets/icons/stars-plus.svg"
          width={24}
          height={24}
          alt="failed"
        />
      </div>
      {children}
    </div>
  );
};

export default OuterLayout;
