import User from "@/app/models/UserModel";
import CredentialsProvider from "next-auth/providers/credentials";
import { dbConnect } from "./db";
import bcrypt from "bcrypt";

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        const { email, password } = credentials;

        if (!email || !password) {
          throw new Error("Please fill all the inputs");
        }

        await dbConnect();

        const existUser = await User.findOne({ email });
        if (!existUser) {
          throw new Error("Email or password is incorrect.");
        }

        const isMatch = await bcrypt.compare(password, existUser.password);

        if (!isMatch) {
          throw new Error("Email or password is incorrect.");
        }

        return {
          id: existUser._id.toString(),
          name: existUser.name,
          contact: existUser.contact.toString(),
          email: existUser.email,
          file: existUser.file,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },

  callbacks: {
    // yaha par user automatically ban jata h nextAuth m aor user m sara return data h jo ham ny authorize function m return kya h upar
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        ((token.name = user.name),
          (token.email = user.email),
          (token.file = user.file));
        token.contact = user.contact;
      }

      return token;
    },

    async session({ session, token }) {
      // frontend k liye
      ((session.user.id = token.id), (session.user.name = token.name));
      session.user.email = token.email;
      session.user.file = token.file;
      session.user.contact = token.contact;

      return session;
    },
  },

  pages: {
    signIn: "/pages/signin",
  },

  secret: process.env.NEXTAUTH_SECRET,
};

export default authOptions;
