import User from "@/models/UserModel";
import Admissions from "@/models/Admission";
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

    // Get comprehensive statistics
    const totalUsers = await User.countDocuments();
    const verifiedUsers = await User.countDocuments({ isVerified: true });
    const unverifiedUsers = await User.countDocuments({ isVerified: false });
    const adminUsers = await User.countDocuments({ role: "admin" });
    const regularUsers = await User.countDocuments({ role: "user" });

    // Get recent users (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const recentUsers = await User.countDocuments({
      createdAt: { $gte: sevenDaysAgo },
    });

    // Get users registered today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const usersToday = await User.countDocuments({
      createdAt: { $gte: today },
    });

    // Get latest 5 users
    const latestUsers = await User.find()
      .select("name email file isVerified role createdAt")
      .sort({ createdAt: -1 })
      .limit(5);

    // Get application statistics
    const totalApplications = await Admissions.countDocuments();
    const applicationsToday = await Admissions.countDocuments({
      createdAt: { $gte: today },
    });
    const applicationsThisWeek = await Admissions.countDocuments({
      createdAt: { $gte: sevenDaysAgo },
    });

    return NextResponse.json(
      {
        message: "Statistics fetched successfully",
        stats: {
          totalUsers,
          verifiedUsers,
          unverifiedUsers,
          adminUsers,
          regularUsers,
          recentUsers, // Last 7 days
          usersToday,
          verificationRate:
            totalUsers > 0
              ? ((verifiedUsers / totalUsers) * 100).toFixed(1)
              : 0,
          totalApplications,
          applicationsToday,
          applicationsThisWeek,
        },
        latestUsers,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("❌ GET STATS ERROR:", error);
    return NextResponse.json(
      { message: `Something went wrong: ${error.message}` },
      { status: 500 },
    );
  }
};
