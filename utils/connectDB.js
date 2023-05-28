import mongoose from "mongoose";

let isConnected = false;

export const connectMongoDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) return;

  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "twitter_clone",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
  } catch (e) {
    console.log("failed to Connected To DB", e);
  }
};
