import OuterLayout from "@/components/OuterLayout";

function BookMarks() {
  return (
    <OuterLayout title="BookMarks" backNavigationOption={true}>
      <div className="text-black font-black text-center text-2xl my-6 w-full">
        This BookMarks is not Done
      </div>
    </OuterLayout>
  );
}

export default BookMarks;
