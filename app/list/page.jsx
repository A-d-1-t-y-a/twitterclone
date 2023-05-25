import OuterLayout from "@/components/OuterLayout";

function List() {
  return (
    <OuterLayout title="List" backNavigationOption={true}>
      <div className="text-black font-black text-center text-2xl my-6 w-full">
        This List is not Done
      </div>
    </OuterLayout>
  );
}

export default List;
