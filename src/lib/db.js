import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URI;
if (!MONGODB_URL) {
  throw new Error("Please define MONGODB_URI");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = {
    conn: null,
    promise: null,
  };
}

export async function dbConnect() {
  // console.log("Cached db connected.");

  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = await mongoose.connect(MONGODB_URL, {
      dbName: "web-store",
      bufferCommands: false,
    });
  }
}
