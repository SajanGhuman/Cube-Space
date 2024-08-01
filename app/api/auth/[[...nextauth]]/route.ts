import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import bcryptjs from "bcryptjs";
const { compare } = bcryptjs;
import NextAuth, {
  type NextAuthOptions,
  User as NextAuthUser,
} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

interface ExtendedUser extends NextAuthUser {
  id: string;
  userId: string;
  name: string;
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "hello@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user) {
          return null;
        }

        const isPasswordValid = await compare(
          credentials.password,
          user.password,
        );

        if (!isPasswordValid) {
          return null;
        }

        console.log("User authorized:", {
          id: user.id.toString(), // Convert bigint to string
          userId: user.user_id,
          email: user.email,
          name: user.name,
        });

        return {
          id: user.id.toString(), // Convert bigint to string
          userId: user.user_id,
          email: user.email,
          name: user.name,
        } as ExtendedUser;
      },
    }),
  ],
  pages: {
    signIn: "/signIn",
  },
  callbacks: {
    async session({ session, token }) {
      // Debugging line: Log the session and token
      console.log("Session callback:", { session, token });

      return {
        ...session,
        user: {
          ...session.user,
          id: token.id as string,
          userId: token.userId as string,
          name: token.name as string,
        },
      };
    },
    async jwt({ token, user }) {
      // Debugging line: Log the token and user
      console.log("JWT callback:", { token, user });

      if (user) {
        return {
          ...token,
          id: (user as ExtendedUser).id,
          userId: (user as ExtendedUser).userId,
          name: (user as ExtendedUser).name,
        };
      }
      return token;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
