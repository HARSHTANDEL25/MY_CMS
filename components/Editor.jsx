"use client";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { slugify } from "slugmaster";
import ImageUpload from "./ImageUpload";

// const ReactQuill = dynamic(()=> import("react-quill"), { ssr: false })

export default function Editor({ onSave }) {
  const [uploadedImage, setUploadedImage] = useState(null); 
  const { register, handleSubmit, reset } = useForm();

  const handleForm = (data) => {
    console.log(data);
    const generatedSlug = slugify(data.title);
    onSave({ ...data, slug: generatedSlug, uploadedImage });
    reset();
  };
  return (
    <div className="w-full mb-10 ">
      <form
        onSubmit={handleSubmit(handleForm)}
        className="max-w-[1440px] mx-auto px-4 space-y-6"
      >
        <input
          {...register("title")}
          placeholder="enter Your title "
          className="bg-white p-3 w-[70%] rounded text-black"
        />
        <input
          {...register("category")}
          placeholder="enter Your category "
          className="bg-white p-3 w-[70%] rounded text-black"
        />

        <textarea
          {...register("content")}
          placeholder="Enter Your Content"
          className="bg-white p-3 w-[70%] rounded text-black h-[300px] max-h-[150px]"
        />
        <h2 className="text-3xl font-semibold">SEO DATA</h2>
        <ImageUpload returnImageUrl={setUploadedImage} />
        {uploadedImage && (
          <div className="mt-4">
            <p className="text-green-600 mt-2">Image Preview</p>
            <img
              src={uploadedImage}
              alt="Uploaded"
              className="w-[450px]  rounded"
            />
          </div>
        )}
        <br />
        <input
          {...register("Description")}
          placeholder="enter Your Description "
          className="bg-white p-3 w-[70%] rounded text-black"
        />
        <input
          {...register("keywords")}
          placeholder="enter Your keywords "
          className="bg-white p-3 w-[70%] rounded text-black"
        />

        <br />
        <div className="flex gap-4 items-center">
          <select
            className="bg-white p-3 w-[10%] rounded text-black "
            {...register("status")}
            defaultValue="DRAFT"
          >
            <option value="DRAFT">Draft</option>
            <option value="PUBLISHED">Published</option>
          </select>

          <button
            type="submit"
            className="bg-blue-500 text-white px-16 py-3 rounded"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
