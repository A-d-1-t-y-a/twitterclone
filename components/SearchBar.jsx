import Image from "next/image";
import { memo } from "react";

function SearchBar() {
  return (
    <div className="py-3 px-4 bg-rightSideBg flex items-center rounded-full gap-2 flex-1 hover:border-primary border">
    <Image
      src="/assets/icons/magnify.svg"
      width={20}
      height={20}
      alt="icon"
    />
    <input
      placeholder="Search Twitter"
      className="border-none outline-none bg-rightSideBg flex-1"
    />
  </div>
  )
}

export default memo(SearchBar)