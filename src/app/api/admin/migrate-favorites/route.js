import { dbConnect } from "@/lib/db";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";
import mongoose from "mongoose";

export const POST = async (req) => {
  try {
    await dbConnect();
    const session = await getServerSession(authOptions);

    // Check if user is admin
    if (!session || session.user.role !== "admin") {
      return NextResponse.json(
        { message: "Access denied. Admin only." },
        { status: 403 }
      );
    }

    const db = mongoose.connection.db;
    const usersCollection = db.collection("users");

    // Add favorites field to users who don't have it
    const result = await usersCollection.updateMany(
      { favorites: { $exists: false } },
      { $set: { favorites: [] } }
    );

    return NextResponse.json(
      {
        message: "Migration completed successfully",
        modifiedCount: result.modifiedCount,
        matchedCount: result.matchedCount,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ MIGRATION ERROR:", error);
    return NextResponse.json(
      { message: `Migration failed: ${error.message}` },
      { status: 500 }
    );
  }
};
