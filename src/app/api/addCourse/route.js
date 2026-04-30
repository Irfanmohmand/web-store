import cloudinary from "@/lib/cloudinary";
import { dbConnect } from "@/lib/db";
import addCourse from "@/models/Courses";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    await dbConnect();

    const formData = await req.formData();

    const title = formData.get("title");
    const shortDes = formData.get("shortDes");
    const fullDes = formData.get("fullDes");
    const price = formData.get("price");

    // Parse Array
    const bulletPoints = JSON.parse(formData.get("bulletPoints"));
    const requirements = JSON.parse(formData.get("requirements"));
    const courseCon = JSON.parse(formData.get("courseCon"));

    const file = formData.get("file");

    if (
      !title ||
      !shortDes ||
      !fullDes ||
      !bulletPoints ||
      !requirements ||
      !courseCon ||
      !price ||
      !file
    ) {
      return NextResponse.json(
        { message: "Please fill all fields." },
        { status: 401 },
      );
    }

    const course = await addCourse.findOne({ title });

    if (course) {
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
          .upload_stream({ folder: "web-store-courses" }, (err, res) => {
            if (err) reject(err);
            else resolve(res);
          })
          .end(buffer);
      });

      imgUrl = result.secure_url;
    }

    const courseAddedSuccess = await addCourse.create({
      title,
      shortDes,
      fullDes,
      bulletPoints,
      requirements,
      price,
      file: imgUrl,
      courseCon,
    });

    return NextResponse.json(
      { message: "Course Added Successfully.", courseAddedSuccess },
      { status: 200 },
    );
  } catch (error) {
    console.log("Error", error);

    return NextResponse.json(
      { message: `Something went wront with addCourse, ${error} ` },
      { status: 500 },
    );
  }
};
