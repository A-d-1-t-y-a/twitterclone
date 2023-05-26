import Image from "next/image";
import { memo } from "react";

function DialogBox({ open, onClose, children, headerUI }) {
  return (
    open && (
      <>
        <div className="absolute top-0 bottom-0 left-0 right-0  bg-black opacity-70 z-30" />
        <div className="absolute z-50 top-0 bottom-0 left-0 right-0 flex justify-center items-start">
          <div className="bg-white mt-14 rounded-xl w-11/12 sm:w-4/5 md:w-4/5 lg:w-5/12 ">
            <div className="flex items-center gap-3 p-2 w-full">
              {" "}
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
              {headerUI && headerUI()}
            </div>
            {children}
          </div>
        </div>
      </>
    )
  );
}

export default memo(DialogBox);
