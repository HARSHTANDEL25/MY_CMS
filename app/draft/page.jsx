"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Editor from "@/components/Editor";
import { Toaster } from "@/components/ui/sonner";

const Draftpage = () => {
  const setValuePost = ({
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
    const res = fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/(blog)/create`, {
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
      }) 
    });
    if(!res.ok){
      console.error("Failed to create post");
      return;
    }
  };

  return <Editor onSave={setValuePost} />;
};

export default Draftpage;
