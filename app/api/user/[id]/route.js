import User from "@/models/user";
import { connectMongoDB } from "@/utils/connectDB";

export const GET = async (req, { params: { id: _id } }) => {
  try {
    await connectMongoDB();

    const userDetails = await User.findOne({ _id });

    return new Response(JSON.stringify(userDetails), { status: 200 });
  } catch (e) {
    return new Response("Failed to get The userData", e, { status: 500 });
  }
};

export const PATCH = async (request, { params: { id: _id } }) => {
  const { updatedData } = await request.json();
  try {
    await connectMongoDB();

    await User.findByIdAndUpdate(_id, { ...updatedData });

    return new Response(JSON.stringify(updatedData), { status: 200 });
  } catch (e) {
    return new Response("failed to update the data", { status: 500 });
  }
};
