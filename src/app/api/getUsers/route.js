import User from "@/models/UserModel";
import authOptions from "@/lib/auth";
import { dbConnect } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    await dbConnect();
    const session = await getServerSession(authOptions);

    // Check if user is authenticated
    if (!session) {
      return NextResponse.json(
        {
          message: "Unauthorized. Please login.",
        },
        { status: 401 },
      );
    }

    // Check if user is admin
    if (session.user.role !== "admin") {
      return NextResponse.json(
        {
          message: "Access denied. Admin only.",
        },
        { status: 403 },
      );
    }

    // Get query parameters for pagination
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const search = searchParams.get("search") || "";
    const role = searchParams.get("role") || "";
    const verified = searchParams.get("verified") || "";

    // Calculate skip for pagination
    const skip = (page - 1) * limit;

    // Build filter query
    let filter = {};
    
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    if (role) {
      filter.role = role;
    }

    if (verified !== "") {
      filter.isVerified = verified === "true";
    }

    // Get total count for pagination
    const totalUsers = await User.countDocuments(filter);
    const totalPages = Math.ceil(totalUsers / limit);

    // Get users with pagination
    const users = await User.find(filter)
      .select("-password -verifyToken -verifyTokenExpiry") // Exclude sensitive fields
      .sort({ createdAt: -1 }) // Newest first
      .skip(skip)
      .limit(limit);

    // Get statistics
    const stats = {
      totalUsers: await User.countDocuments(),
      verifiedUsers: await User.countDocuments({ isVerified: true }),
      unverifiedUsers: await User.countDocuments({ isVerified: false }),
      adminUsers: await User.countDocuments({ role: "admin" }),
      regularUsers: await User.countDocuments({ role: "user" }),
    };

    return NextResponse.json(
      {
        message: "Users fetched successfully",
        users,
        pagination: {
          currentPage: page,
          totalPages,
          totalUsers,
          limit,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1,
        },
        stats,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("❌ GET USERS ERROR:", error);
    return NextResponse.json(
      { message: `Something went wrong: ${error.message}` },
      { status: 500 },
    );
  }
};
