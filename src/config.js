import dotenv from "dotenv";

dotenv.config();

export const config = {
  PORT: process.env.PORT,
  JWT: process.env.TOKEN_SECRET,
};
