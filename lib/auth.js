import NextAuth, { getServerSession } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import prisma from "@/lib/prisma";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/signin",
    signOut: "/signout",
    error: "/error",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    //whenever jwt is created or updated, this function will be called
    async jwt({ token, user }) {
      //if we have user , if we find by email then we want their id, name, email and image
      if (user) {
        const dbUser = await prisma.user.findUnique({
          where: {
            email: user.email,
          },
          select: { id: true, name: true, email: true, image: true },
        });
        //if we have dbUser then we want to add it to token
        if (dbUser) {
          token.id = dbUser.id;
          token.name = dbUser.name;
          token.email = dbUser.email;
          token.username = dbUser.name;
          token.image = dbUser.image;
          token.role = dbUser.role;
        } else {
          const newUser = await prisma.user.create({
            data: {
              email: user.email,
              name: user.name,
              image: user.image,

              role: "user",
            },
          });
          token.id = newUser.id;
        }
      }
      //if we have token then we want to return it
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.image;
        session.user.username = token.username;
        session.user.role = token.role;
      }
      return session;
    },
    redirect() {
        return "/dashboard";
    }
  },
};

export const  getAuthsession = () => getServerSession(authOptions);