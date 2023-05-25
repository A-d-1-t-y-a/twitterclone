import { memo } from "react";
import cx from "classnames";

function Tabs({ tabs, activeTab, handler }) {
  const handleTabSelection = (tab) => () => {
    if (typeof handler == "function") handler(tab);
  };
  return (
    <div className="w-full border-b mt-4 flex items-center">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={cx(
            "flex-1 hover:bg-slate-100 flex items-center justify-center"
          )}
          onClick={handleTabSelection(tab)}
        >
          <p
            className={cx(
              "py-4 font-bold text-black",
              activeTab == tab && "border-b-[3px] border-primary"
            )}
          >
            {tab}
          </p>
        </button>
      ))}
    </div>
  );
}

export default memo(Tabs);
