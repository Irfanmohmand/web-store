import Courses from "@/app/models/Courses";
import { dbConnect } from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await dbConnect();

    const courses = await Courses.find();

    if (!courses || courses.length === 0) {
      return NextResponse.json(
        { message: "Course not found" },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { message: "All courses", courses },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: `Something went wrong with courses ${error} ` },
      { status: 500 },
    );
  }
};
