import Courses from "@/app/models/Courses";
import { dbConnect } from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  try {
    await dbConnect();

    const { id } = await params;
    console.log(id);

    const courseDetail = await Courses.findById(id);

    if (!courseDetail) {
      return NextResponse.json(
        { message: "Course not found." },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { message: "Course Details.", courseDetail },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong." },
      { status: 500 },
    );
  }
};
