import { getAuthsession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const DELETE = async (req) => {
  const session = await getAuthsession();
  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();
    const { id } = body;
 
  try {
    const deletedblog = await prisma.post.delete({
      where: {
        id: id,
      },
    });
    return NextResponse.json(
      { message: "Blog deleted successfully", deletedblog },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json(
      { error: "Failed to delete blog" },
      { status: 500 }
    );
  }
};
