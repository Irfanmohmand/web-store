import User from "@/models/UserModel";
import { dbConnect } from "@/lib/db";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");
    // console.log(token);

    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json(
        {
          message: "Invalid or Expired token.",
        },
        { status: 400 },
      );
    }

    ((user.isVerified = true),
      (user.verifyToken = undefined),
      (user.verifyTokenExpiry = undefined));

    await user.save();

    return NextResponse.json({
      message: "Email verified successfully.",
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Verification failed" },
      { status: 500 },
    );
  }
};
