import Admissions from "@/models/Admission";
import { dbConnect } from "@/lib/db";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/auth";

export const GET = async (req) => {
  try {
    // Check if user is authenticated and is admin
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized. Please login." },
        { status: 401 }
      );
    }

    if (session.user.role !== "admin") {
      return NextResponse.json(
        { message: "Forbidden. Admin access required." },
        { status: 403 }
      );
    }

    await dbConnect();

    // Get query parameters for filtering
    const { searchParams } = new URL(req.url);
    const course = searchParams.get("course");
    const level = searchParams.get("level");
    const sortBy = searchParams.get("sortBy") || "createdAt";
    const order = searchParams.get("order") || "desc";

    // Build query
    let query = {};
    if (course) {
      query.course = course;
    }
    if (level) {
      query.level = level;
    }

    // Fetch applications with sorting
    const applications = await Admissions.find(query).sort({
      [sortBy]: order === "desc" ? -1 : 1,
    });

    // Get statistics
    const totalApplications = await Admissions.countDocuments();
    const applicationsByCourse = await Admissions.aggregate([
      {
        $group: {
          _id: "$course",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
    ]);

    const applicationsByLevel = await Admissions.aggregate([
      {
        $group: {
          _id: "$level",
          count: { $sum: 1 },
        },
      },
    ]);

    const recentApplications = await Admissions.find()
      .sort({ createdAt: -1 })
      .limit(10);

    return NextResponse.json(
      {
        message: "Applications fetched successfully",
        applications,
        stats: {
          total: totalApplications,
          byCourse: applicationsByCourse,
          byLevel: applicationsByLevel,
          recent: recentApplications,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching applications:", error);
    return NextResponse.json(
      { message: `Error fetching applications: ${error.message}` },
      { status: 500 }
    );
  }
};
