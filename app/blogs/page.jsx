"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Blogpage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogData = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/get`);
      const data = await res.json();
      console.log("Fetched blogs:", data);
      setBlogs(data);
    } catch (error) {
      console.error("Failed to fetch blogs", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteBlog = async (id) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        setBlogs((blogs) => blogs.filter((blog) => blog.id !== id));
      } else {
        console.error("Failed to delete blog");
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  useEffect(() => {
    fetchBlogData();
  }, []);

if (loading) return <p className="text-center text-3xl mt-10 ">Loading blogs...</p>;

  return (
    <section>
      <div className="max-w-[1440px] mx-auto px-10 py-10">
        <h1 className="text-3xl font-bold mb-6">Blogs</h1>
        <div className="flex justify-center items-center gap-14 flex-wrap ">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg w-full max-w-[400px] h-[480px] sm:w-[90%] md:w-[70%] lg:w-[50%] xl:w-[40%] hover:scale-[1.07] transition-all duration-300"
            >
              {console.log(blog.id)}
              <Image
                width={200}
                height={150}
                src={blog.thumbnail}
                alt={blog.title}
                className="w-full h-48 object-cover rounded-md"
              />
              <h2 className="text-xl font-semibold mb-2 text-gray-800 my-2 h-[80px] line-clamp-2">
                {blog.title}
              </h2>
              <p className="text-gray-600 mb-4 h-[100px] overflow-hidden text-ellipsis">{blog.desc}</p>
              <div className="flex items-center gap-6">
                <Link
                  className="text-white px-4 py-1.5 rounded bg-blue-600 hover:underline cursor-pointer"
                  href={`/blog/${blog.slug}`}
                >
                  Read More
                </Link>
                <button
                  className="text-white px-6 py-1.5 rounded bg-red-500 hover:underline cursor-pointer"
                  onClick={() => deleteBlog(blog.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blogpage;
