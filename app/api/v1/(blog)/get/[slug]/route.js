import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

///specific blog post by slug
export async function GET(req, { params }) {
  const { slug } = await params;

  const post = await prisma.post.findUnique({
    where: {
      slug: slug,
      status: "PUBLISHED",
    },
    select: {
      id: true,
      title: true,
      content: true,
      desc: true,
      keywords: true,
      thumbnail: true,
      category: {
        select: {
          title: true,
          slug: true,
        },
      },
      createdAt: true,
    },
  });
  if (!post) {
    return new NextResponse("Blog not found", { status: 404 });
  }

  return new NextResponse(JSON.stringify(post), { status: 200 });
}
