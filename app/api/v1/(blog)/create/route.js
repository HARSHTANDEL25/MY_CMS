import { getAuthsession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  const session = await getAuthsession();
  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const {
    title,
    category,
    content,
    Description,
    keywords,
    status,
    slug,
    uploadedImage,
  } = body;
  console.log("body", body);

  if (!title || !category || !content || !slug || !uploadedImage) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 }
    );
  }
  //checking the category if its already exists or not

  let categoryCheck = await prisma.category.findUnique({
    where: {
      slug: category,
    },
  });

  try {
    if (!categoryCheck) {
      categoryCheck = await prisma.category.create({
        data: {
          title: category.charAt(0).toUpperCase() + category.slice(1),
          slug: category,
        },
      });
    }

    // Create the blog post
    const post = await prisma.post.create({
      data: {
        title,
        content,
        slug,
        thumbnail: uploadedImage,
        desc: Description,
        keywords,
        status,
        category:{
            connect:{
                slug:category
            },
        },
       
      }, 
    });
    return NextResponse.json({ message: "Post created successfully", post });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}
