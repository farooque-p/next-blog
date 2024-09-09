"use client";
import { assets } from "@/assets/assets";
import axios from "axios";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "react-toastify";
import dynamic from "next/dynamic";
//import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const Page = () => {
  const [image, setImage] = useState(false);
  const [blogContent, setBlogContent] = useState("");
  const [data, setDate] = useState({
    title: "",
    description: "",
    category: "Startup",
    author: "Farooque Parvez",
    authorImg: "/authorImg.png",
  });

  const handleBlogContent = (value) => {
    setBlogContent(value);
  };

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setDate((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", blogContent);
    formData.append("category", data.category);
    formData.append("author", data.author);
    formData.append("authorImg", data.authorImg);
    formData.append("image", image);
    const response = await axios.post("/api/blog", formData);
    if (response.data.success) {
      toast.success(response.data.msg);
      setImage(false);
      setDate({
        title: "",
        description: "",
        category: "Startup",
        author: "Farooque Parvez",
        authorImg: "./authorImg.png",
      });
    } else {
      toast.error(response.data.error);
    }
  };
  return (
    <>
      <div className="relative h-[100vh] max-w-[850px] overflow-x-auto mt-4 scrollbar-hide">
        <form
          onSubmit={onSubmitHandler}
          className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16"
        >
          <p>Upload Featured Image</p>
          <label htmlFor="image">
            <Image
              src={!image ? assets.upload_area : URL.createObjectURL(image)}
              alt=""
              width={140}
              height={70}
              className="mt-4"
            />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            required
            hidden
          />
          <p className="text-xl mt-4">Blog Title:</p>
          <input
            onChange={onChangeHandler}
            name="title"
            value={data.title}
            className="w-full sm:w-[500px] mt-4 px-4 py-3 border"
            type="text"
            placeholder="Type here..."
            required
          />
          <p className="text-xl mt-4">Blog Description:</p>
          <ReactQuill
            theme="snow"
            className="w-full h-[400px] py-12"
            value={blogContent}
            onChange={handleBlogContent}
          />
          <p className="text-xl mt-4">Blog Category:</p>
          <select
            className="w-40 mt-4 px-4 py-3 border text-gray-500"
            name="category"
            onChange={onChangeHandler}
            value={data.category}
          >
            <option value="Startup">Startup</option>
            <option value="Technology">Technology</option>
            <option value="Lifestyle">Lifestyle</option>
          </select>
          <br />
          <button className="mt-8 w-40 h-12 bg-black text-white" type="submit">
            Add
          </button>
        </form>
      </div>
    </>
  );
};

export default Page;
