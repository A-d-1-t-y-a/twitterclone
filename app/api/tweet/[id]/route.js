import Tweet from "@/models/tweet";
import { connectMongoDB } from "@/utils/connectDB";

export const GET = async (req, { params: { id } }) => {
  try {
    await connectMongoDB();

    const tweets = await Tweet.find({ userDetails: id }).populate(
      "userDetails"
    );

    return new Response(JSON.stringify(tweets), { status: 200 });
  } catch (e) {
    return new Response("Failed to get the Tweets", { status: 500 });
  }
};

export const DELETE = async (request, { params: { id } }) => {
  try {
    connectMongoDB();
    await Tweet.findByIdAndDelete(id);
    return new Response("Deleted Successfully", { status: 200 });
  } catch (e) {
    return new Response(e, { status: 500 });
  }
};
