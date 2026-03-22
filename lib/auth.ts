import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import fs from "fs";
import path from "path";

export const authOptions: NextAuthOptions = {
  // Use JSON Web Tokens for session storage
  session: {
    strategy: "jwt",
  },
  // This secret is CRITICAL to fix the decryption error
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const filePath = path.join(process.cwd(), "data/auth.json");
        
        // Basic check to ensure the file exists
        if (!fs.existsSync(filePath)) {
          console.error("auth.json not found at:", filePath);
          return null;
        }

        const users = JSON.parse(fs.readFileSync(filePath, "utf8"));

        const user = users.find(
          (u: any) =>
            u.username === credentials?.username &&
            u.password === credentials?.password
        );

        if (user) {
          return { id: user.id, name: user.name, email: user.username };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
};