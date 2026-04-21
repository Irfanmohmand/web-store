import Courses from "@/app/models/Courses";
import authOptions from "@/lib/auth";
import cloudinary from "@/lib/cloudinary";
import { dbConnect } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const session = await getServerSession(authOptions);
    // console.log("----------------------", session.user.role);

    // check admin
    if (!session || session.user.role !== "admin") {
      return NextResponse.json(
        { message: "Only admin can add course" },
        { status: 401 },
      );
    }

    await dbConnect();

    const formData = await req.formData();
    const file = formData.get("file");
    const courseName = formData.get("courseName");
    const courseDetails = formData.get("courseDetails");
    const coursePrice = formData.get("coursePrice");

    if (!courseName || !courseDetails || !coursePrice) {
      return NextResponse.json(
        { message: "Please fill all field" },
        { status: 400 },
      );
    }

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
