import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true, // Quita los espacios innecesarios del string (" Mario  " => "Mario")
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true, // No permite que se vuelva a ingresar el mismo email
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
