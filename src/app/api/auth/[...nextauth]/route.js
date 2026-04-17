import authOptions from "@/lib/auth";
import NextAuth from "next-auth";

const hanlder = NextAuth(authOptions);

export { hanlder as GET, hanlder as POST };
