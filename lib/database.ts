import mongoose from "mongoose";

let isConnected = false; // track the connection

export const connectToMongoDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  try {
    const mongoUri = process.env.MONGODB_URI;

    console.log("mongoUri", mongoUri);

    if (!mongoUri) {
      throw new Error("MONGODB_URI is not defined in environment variables");
    }

    await mongoose.connect(mongoUri);

    isConnected = true;

    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
};
