import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.NEXT_MONGO_URI}`);
  } catch (error) {
    console.log(error);
  }
};
