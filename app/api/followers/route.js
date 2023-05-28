import User from "@/models/user";
import { connectMongoDB } from "@/utils/connectDB";

export const GET = async (request) => {
  try {
    await connectMongoDB();

    const usersList = await User.find({});

    return new Response(JSON.stringify(usersList), { status: 200 });
  } catch (e) {
    return new Response("failed to get Followers", e, { status: 500 });
  }
};
