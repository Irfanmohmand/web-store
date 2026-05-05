import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/UserModel.js";
import { dbConnect } from "./db";
import bcrypt from "bcrypt";

// Main NextAuth config
const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",

      // Define expected input fields
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
  await dbConnect();

  if (!credentials?.email || !credentials?.password) {
    throw new Error("Please fill all fields");
  }

  const email = credentials.email;
  const password = credentials.password;

  const existUser = await User.findOne({ email });

  if (!existUser) {
    throw new Error("Email or password is incorrect");
  }

  const isMatch = await bcrypt.compare(password, existUser.password);

if (!isMatch) {
  throw new Error("Email or password is incorrect");
}

  if (!existUser.isVerified) {
    throw new Error("Please verify your email first");
  }


  return {
    id: existUser._id.toString(),
    name: existUser.name,
    email: existUser.email,
    file: existUser.file,
    contact: existUser.contact,
    role: existUser.role
  };
}
    }),
  ],

  // 🧠 Use JWT instead of database sessions
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  callbacks: {
    // 🔑 Runs when JWT is created/updated
    async jwt({ token, user }) {
      if (user) {
        // Attach user data to token
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.file = user.file;
        token.contact = user.contact;
        token.role = user.role;
      }

      return token;
    },

    // 📦 Runs when session is accessed (frontend)
    async session({ session, token }) {
      // 🛑 Prevent crash if session.user is undefined
      if (session.user) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.file = token.file;
        session.user.contact = token.contact;
        session.user.role = token.role;
      }

      return session;
    },
  },

  // 🔁 Custom login page
  // pages: {
  //   signIn: "/",
  // },

  // 🔐 Secret for JWT signing
  secret: process.env.NEXTAUTH_SECRET,
};

export default authOptions;