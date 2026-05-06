import User from "@/models/UserModel";
import authOptions from "@/lib/auth";
import { dbConnect } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import bcrypt from "bcrypt";

export const PUT = async (req) => {
  try {
    await dbConnect();
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { message: "Unauthorized. Please login." },
        { status: 401 }
      );
    }

    const formData = await req.formData();
    const name = formData.get("name")?.toString();
    const contact = formData.get("contact")?.toString();
    const currentPassword = formData.get("currentPassword")?.toString();
    const newPassword = formData.get("newPassword")?.toString();
    const file = formData.get("file");

    const user = await User.findById(session.user.id);

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    // Update name if provided
    if (name) {
      user.name = name;
    }

    // Update contact if provided
    if (contact) {
      user.contact = contact;
    }

    // Update password if provided
    if (currentPassword && newPassword) {
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      
      if (!isMatch) {
        return NextResponse.json(
          { message: "Current password is incorrect" },
          { status: 400 }
        );
      }

      user.password = await bcrypt.hash(newPassword, 10);
    }

    // Update profile image if provided
    if (file && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: "web-store-users" }, (err, result) => {
            if (err) reject(err);
            else resolve(result);
          })
          .end(buffer);
      });

      user.file = result.secure_url;
    }

    await user.save();

    return NextResponse.json(
      {
        message: "Profile updated successfully",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          contact: user.contact,
          file: user.file,
          role: user.role,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ UPDATE PROFILE ERROR:", error);
    return NextResponse.json(
      { message: `Something went wrong: ${error.message}` },
      { status: 500 }
    );
  }
};
