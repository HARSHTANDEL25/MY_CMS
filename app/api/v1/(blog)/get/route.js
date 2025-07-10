import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req){
    const posts = await prisma.post.findMany(
        {
            where:{
                status: "PUBLISHED"
            }
        }
    );
    console.log("posts", posts);
    return NextResponse.json(posts)
}