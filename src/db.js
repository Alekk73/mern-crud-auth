import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost/mern-db");
    console.log(">>> Base de datos conectada.");
  } catch (error) {
    console.log(error);
  }
};
