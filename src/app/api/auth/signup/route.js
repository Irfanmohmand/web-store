import User from "@/app/models/UserModel";
import { dbConnect } from "@/lib/db";
import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export const POST = async (req) => {
  try {
    await dbConnect();

    // const { name, contact, email, password } = await req.json();
    const formData = await req.formData();
    const name = formData.get("name").toString();
    const contact = formData.get("contact").toString();
    const email = formData.get("email").toString();
    const password = formData.get("password").toString();
    const file = formData.get("file");

    if (!name || !contact || !email || !password || !file) {
      return NextResponse.json(
        { message: "Please fill all fields" },
        { status: 401 },
      );
    }

    // console.log(name, email, contact, password);

    const existUser = await User.findOne({ email });

    if (existUser) {
      return NextResponse.json(
        { message: "User already exist." },
        { status: 400 },
      );
    }

    // Upload image to cloudinary
    let imgUrl = "";

    if (file) {
      const bytes = await file.arrayBuffer();
      // console.log(bytes);
      const buffer = Buffer.from(bytes);
      // console.log(buffer);

      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: "web-store-users" }, (err, result) => {
            if (err) reject(err);
            else resolve(result);
          })
          .end(buffer);
      });

      imgUrl = result.secure_url;
    }

    const user = await User.create({
      name,
      contact,
      email,
      password,
      file: imgUrl,
    });

    return NextResponse.json(
      { message: "User created successfully.", user },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: `Something went wrong. ${error} ` },
      { status: 500 },
    );
  }
};
