import Tweet from "@/models/tweet";
import { connectMongoDB } from "@/utils/connectDB";

export const POST = async (request) => {
  const { userDetails, description } = await request.json();
  try {
    await connectMongoDB();

    const newTweet = new Tweet({ userDetails, description });

    newTweet.save();

    return new Response("Successfully tweeted", { status: 200 });
  } catch (e) {
    return new Response("unSuccessfully tweeted", e, { status: 500 });
  }
};

export const GET = async () => {
  try {
    await connectMongoDB();
    const tweets = await Tweet.find({}).populate("userDetails");

    return new Response(JSON.stringify(tweets), { status: 200 });
  } catch (e) {
    return new Response("Failed to fetch the data", { status: 500 });
  }
};
