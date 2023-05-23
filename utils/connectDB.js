import mongoose from "mongoose";

let isConnected = false;

export const connectMongoDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("DB is connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "twitter_clone",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log("DB is connected");
  } catch (e) {
    console.log("failed to Connected To DB", e);
  }
};
