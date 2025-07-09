import React, { useRef, useState } from "react";
// import { storage } from "@/static/firebaseconfig"; // Import the storage configuration
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Import necessary functions from Firebase Storage
import { upload } from "@vercel/blob/client"; // Import the Vercel Blob upload function
const ImageUpload = ({ returnImageUrl }) => {
  const htmlInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [blobUrl, setBlobUrl] = useState(null);

  const handlesubmit = async (e) => {
    if (!htmlInputRef.current.files[0]) {
      console.log("No file selected");
      return;
    }

    const file = htmlInputRef.current.files[0];
    console.log("Selected file:", file);

    try {
      setLoading(true);
      const newBlob = await upload(file.name, file, {
        access: "public",
        handleUploadUrl: "/api/upload",
        onUploadProgress: (progressEvent) => {
          setProgress(progressEvent.percentage);
        },
      });

      setBlobUrl(newBlob.url);
      console.log("Uploaded file:", newBlob);
      // returning the blob URL to the parent component
      returnImageUrl(newBlob.url);
      console.log("Blob URL:", newBlob.url);
    } catch (error) {
      console.log("Error uploading image:", error);
    } finally {
      setLoading(false);

      console.log("Image upload process completed.");
    }
  };

  return (
    <div
      className="w-full flex  gap-4  my-6 items-center"
      onSubmit={handlesubmit}
    >
      <label className="cursor-pointer border-2 border-dashed border-gray-400 p-2 rounded-lg bg-white hover:bg-gray-50 text-black text-center transition duration-200 shadow-md">
        <span className="block font-medium text-lg">📁 Upload your Image</span>
        <input type="file" accept="image/*" hidden ref={htmlInputRef} />
      </label>
      <button
        type="button"
        onClick={handlesubmit}
        disabled={loading}
        className=" p-3  bg-blue-600 text-white rounded "
      >
        {loading ? `uploading...${progress}%` : " Upload Image"}
      </button>
      {blobUrl && (
        <div>
          Blob url: <a href={blobUrl}>{blobUrl}</a>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
