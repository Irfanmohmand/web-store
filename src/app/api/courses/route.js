import Courses from "@/app/models/Courses";
import cloudinary from "@/lib/cloudinary";
import { dbConnect } from "@/lib/db";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    await dbConnect();

    const formData = await req.formData();
    const file = formData.get("file");
    const courseName = formData.get("courseName");
    const courseDetails = formData.get("courseDetails");
    const coursePrice = formData.get("coursePrice");

    const existCourse = await Courses.findOne({ courseName });

    if (existCourse) {
      return NextResponse.json(
        { message: "Course already added." },
        { status: 400 },
      );
    }

    let imgUrl = "";

    if (file) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: "web-store-courses" }, (err, result) => {
            if (err) reject(err);
            else resolve(result);
          })
          .end(buffer);
      });

      console.log(result.secure_url);
      imgUrl = result.secure_url;
    }

    const course = await Courses.create({
      courseName,
      courseDetails,
      coursePrice,
      file: imgUrl,
    });

    return NextResponse.json(
      { message: "Course created successfully.", course },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: `Something went wrong ${error} ` },
      { status: 500 },
    );
  }
};
