import addCourse from "@/models/Courses";
import { dbConnect } from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q") || "";
    const limit = parseInt(searchParams.get("limit")) || 10;

    if (!query) {
      return NextResponse.json(
        { message: "Search query is required", courses: [] },
        { status: 400 }
      );
    }

    // Search in title, shortDes, and fullDes
    const courses = await addCourse
      .find({
        $or: [
          { title: { $regex: query, $options: "i" } },
          { shortDes: { $regex: query, $options: "i" } },
          { fullDes: { $regex: query, $options: "i" } },
        ],
      })
      .limit(limit)
      .select("title shortDes file price");

    return NextResponse.json(
      {
        message: "Search results",
        courses,
        count: courses.length,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ SEARCH COURSES ERROR:", error);
    return NextResponse.json(
      { message: `Something went wrong: ${error.message}` },
      { status: 500 }
    );
  }
};
