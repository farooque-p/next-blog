import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://cosmicweb:cosmicweb@cluster0.7jpdf.mongodb.net/blog-app"
    );
  } catch (error) {
    console.log(error);
  }
};
