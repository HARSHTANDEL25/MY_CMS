import { getAuthsession } from "@/lib/auth";
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

  return NextResponse.json({ message: "Hello from create route" });
}
