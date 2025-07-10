import { Calendar } from "lucide-react";
import Image from "next/image";
import React from "react";
import ReactMarkdown from "react-markdown";

const fetchSingleBlogData = async (slug) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/get/${slug}`
  );
  const data = await res.json();
  console.log();
  return data;
};

const Singleblogpage = async ({ params }) => {
  const { slug } = await params;
  const post = await fetchSingleBlogData(slug);
  return (
    <div className="w-full">
      <div className=" max-w-[1440px] mx-auto px-20 py-10">
        <Image
          src={post.thumbnail}
          alt={post.title}
          width={550}
          height={300}
          className="rounded-lg "
        />
        <p className=" border-gray-700 rounded-lg  text-2xl font-bold my-4">
          {post.title}
        </p>
        <div className="flex items-center gap-3 my-5 ">
          <Calendar />
          <p className="text-lg font-bold ">
            {" "}
            Created on:
            {new Date().toLocaleDateString("en-IN", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
        </div>

        <div className="my-4 flex  gap-15 items-center">
          <p> Tags : </p>

          <div className="flex flex-wrap gap-6">
            {post.keywords.split(",").map((tag, index) => (
              <span
                key={index}
                className="text-lg font-medium text-white bg-gray-600 px-6 py-4 rounded-lg "
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="my-4 flex  gap-2 items-center">
          <p>Description : </p>
          <article className="prose max-w-[700px] mt-4 bg-gray-600 p-4 rounded-lg">
            <p>{post.desc}</p>
          </article>
        </div>
        <article className="prose max-w-[700px] mt-4 ">
          <p>{post.content}</p>
        </article>
      </div>
    </div>
  );
};

export default Singleblogpage;
