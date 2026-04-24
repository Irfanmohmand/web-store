import User from "@/app/models/UserModel";
import authOptions from "@/lib/auth";
import { dbConnect } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    await dbConnect();
    const session = await getServerSession(authOptions);

    // const roles = session.user.role;
    // return NextResponse.json({ message: "This is session data", roles });

    if (!session) {
      return NextResponse.json(
        {
          message: "UnAuthorized.",
        },
        { status: 401 },
      );
    }

    if (session.user.role == "user") {
      return NextResponse.json(
        {
          message: "User not allow to get access of all users.",
        },
        { status: 401 },
      );
    }

    const users = await User.find();

    return NextResponse.json({ message: "All Users", users }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: `Something went wrong ${error} ` },
      { status: 500 },
    );
  }
};
