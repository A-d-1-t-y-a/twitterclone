import Tweet from "@/models/tweet";
import { connectMongoDB } from "@/utils/connectDB";

export const POST = async (request) => {
  const data = await request.json();
  try {
    await connectMongoDB();

    const newTweet = new Tweet({ ...data });

    newTweet.save();

    return new Response("Successfully tweeted", { status: 200 });
  } catch (e) {
    return new Response("unSuccessfully tweeted", e, { status: 500 });
  }
};

export const GET = async () => {
  try {
    await connectMongoDB();
    const tweets = await Tweet.find()
      .sort({ createdAt: -1 })
      .populate("userDetails");

    return new Response(JSON.stringify(tweets), { status: 200 });
  } catch (e) {
    return new Response("Failed to fetch the data", { status: 500 });
  }
};

export const PATCH = async (request) => {
  const { updatedData, id } = await request.json();

  try {
    connectMongoDB();

    await Tweet.findByIdAndUpdate(id, { ...updatedData });

    return new Response("Updated Successfully", { status: 200 });
  } catch (e) {
    return new Response(e, {
      status: 500,
    });
  }
};

export const DELETE = async (request) => {
  const { id } = await request.json();

  try {
    connectMongoDB();

    await Tweet.findByIdAndDelete(id);

    return new Response("Updated Successfully", { status: 200 });
  } catch (e) {
    return new Response(e, {
      status: 500,
    });
  }
};
