import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please enter a blog title."],
  },
  description: {
    type: String,
    required: [true, "Please enter a blog description."],
  },
  category: {
    type: String,
    required: [true, "Please enter a category."],
  },
  author: {
    type: String,
    required: [true, "Please enter an author."],
  },
  image: {
    type: String,
    required: [true, "Please select an image."],
  },
  authorImg: {
    type: String,
    required: [true, "Please select an author image."],
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

export const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);
