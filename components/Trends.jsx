import Image from "next/image";

function Trends({isButton}) {
  const renderTrendCard = (item, index) => (
    <div key={item} className="bg-trendsBG p-4">
      <div className="flex items-center">
        <p className="flex items-center flex-1 text-gray3 text-xs">
          {index}. Trending
        </p>
        <Image
          alt="failed"
          src="/assets/icons/horizontal-kebab.svg"
          width={16}
          height={16}
        />
      </div>
      <p className="text-base font-bold text-navBarFontColor">#{item}</p>
      <p className="text-gray3 text-sm">{item} Tweets</p>
    </div>
  );

  const renderTrendsUI = () => (
    <>
      <div className="py-3.5 px-5 bg-trendsBG flex items-center rounded-t-xl">
        <p className="font-black text-black text-xl flex-1">India Trends</p>
        <Image
          src="/assets/icons/setting.svg"
          width={24}
          height={24}
          alt="icon"
        />
      </div>
      <div className="divide-y-2">
        {[1, 2, 3, 4].map((item, index) => renderTrendCard(item, index))}
        {/* {isButton&&<button className="text-primary text-sm font-medium rounded-b-xl text-center w-full py-3 bg-trendsBG">
          Show more
        </button>} */}
      </div>
    </>
  );

  return renderTrendsUI();
}

export default Trends;
