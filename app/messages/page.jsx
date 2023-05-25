import OuterLayout from "@/components/OuterLayout";

function Messages() {
  return (
    <OuterLayout title="Message" backNavigationOption={true}>
      <div className="text-black font-black text-center text-2xl my-6 w-full">
        This Messages is not Done
      </div>
    </OuterLayout>
  );
}

export default Messages;
