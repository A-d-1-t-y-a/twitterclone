import Image from "next/image";
import { memo } from "react";

function DialogBox({ open, onClose, children }) {
  return (
    open && (
      <>
        <div className="absolute top-0 bottom-0 left-0 right-0  bg-black opacity-70 z-30" />
        <div className="absolute z-50 top-0 bottom-0 left-0 right-0 flex justify-center items-start">
          <div className="bg-white mt-14 rounded-xl w-5/12">
            <button
              className="text-black font-black m-2 p-2 hover:bg-slate-100 rounded-full"
              onClick={onClose}
            >
              <Image
                alt="Icon"
                src="/assets/icons/cross-icon.svg"
                width={30}
                height={30}
              />
            </button>
            {children}
          </div>
        </div>
      </>
    )
  );
}

export default memo(DialogBox);
