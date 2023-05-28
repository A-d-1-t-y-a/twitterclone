"use client";
import OuterLayout from "@/components/OuterLayout";
import WhoToFollow from "@/components/WhoToFollow";

function List() {
  return (
    <OuterLayout title="List" backNavigationOption={true}>
      <WhoToFollow className="mt-1" />
    </OuterLayout>
  );
}

export default List;
