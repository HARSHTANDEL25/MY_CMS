"use client";
import React, { useState } from "react";
import Editor from "@/components/Editor";
import { useRouter } from "next/navigation";

const Draftpage = () => {
  const router = useRouter();
  const setValuePost = async ({
    title,
    category,
    content,
    Description,
    keywords,
    status,
    slug,
    uploadedImage,
  }) => {
    console.log("title: ", title);
    console.log("slug: ", slug);
    // Here you can handle the post data, e.g., send it to an API or save it in state
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          category,
          content,
          Description,
          keywords,
          status,
          slug,
          uploadedImage,
        }),
      }
    );

    if (res.ok) {
      router.push("/blogs");
    } else {
      const error = await res.json();
      console.error("Failed to create post:", error.error || "Unknown error");
    }
  };

  return <Editor onSave={setValuePost} />;
};

export default Draftpage;
