import { Calendar } from "lucide-react";
import Image from "next/image";
import React from "react";

const Singleblogpage = () => {
  const Categorydata = [
   
    "Generative AI",
    "AI Tools",
    "AI Applications",
    "AI Trends",
  ];
  return (
    <section>
      <div className="px-8 my-2">
        <Image
          src="/Thumbnails/generative-AI.jpg"
          alt="Blog Image"
          width={500}
          height={300}
          className="rounded-lg "
        />
        <div className="flex items-center gap-3 my-3 ">
          <Calendar />
          <p className="text-xl font-bold "> Created on: 
            {new Date().toLocaleDateString("en-IN", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
        </div>
        <div className="my-2 flex gap-3 items-center">
          <p> Category : </p>
          <p className="bg-gray-600 border-gray-700 rounded-lg p-3">
            Gen ai Explanation
          </p>
        </div>
        <div className="my-4 flex gap-3 items-center">
          <p> Tags : </p>
          {Categorydata.map((category, index) => (
            <p
              key={index}
              className="bg-gray-600 border-gray-700 rounded-lg p-2"
            >
              {category}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Singleblogpage;
