import Image from "next/image";
import Link from "next/link";
import React from "react";

// const BlogConfig = [
//   {
//     title: " Gen AI",
//     excerpt: " Exploring the impact of Generative AI on content creation.",
//     image: "/Thumbnails/generative-AI.jpg",
//     url: "gen-ai",
//   },
//   {
//     title: " React vs NEXT js ",
//     excerpt:
//       " Exploring the differences between React and NEXT.js for web development.",
//     image: "/Thumbnails/react vs next.png",
//     url: "reactvsnext",
//   },
//   {
//     title: " React js",
//     excerpt: " Exploring the impact of React.js on modern web development.",
//     image: "/Thumbnails/react.png",
//     url: "react",
//   },
// ];

     const fetchBlogData = async ()=>{
       const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/get`, )
       const data  = await res.json();
       return data;
       
     }

const Blogpage = async () => {
  const blogs = await fetchBlogData();
  return (
    
    <section>
      <div className="max-w-[1440px] mx-auto px-10 py-10">
        <h1 className="text-3xl font-bold mb-6">Blogs</h1>
        <div className="flex justify-center items-center gap-14 flex-wrap ">
          {blogs.map((blog, index) => (
            <div
              key={index}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg w-full sm:w-[90%] md:w-[70%] lg:w-[50%] xl:w-[40%] hover:scale-[1.03] transition-all duration-300"
            >
              <Image
                width={200}
                height={150}
                src={blog.thumbnail}
                alt={blog.title}
                className="w-full h-48 object-cover rounded-md"
              />
              <h2 className="text-xl font-semibold mb-2 text-gray-800 my-2">
                {blog.title}
              </h2>
              <p className="text-gray-600 mb-4 max-w-[300px]">{blog.desc}</p>
              <Link className="text-blue-500 hover:underline cursor-pointer" href={`/blog/${blog.url}`}   >   
                Read More
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blogpage;
