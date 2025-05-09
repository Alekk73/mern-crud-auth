import jwt from "jsonwebtoken";
import { config } from "../config.js";

export const authRequired = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) return res.status(401).json({ message: "No autorizdo." });

  jwt.verify(token, config.JWT, (err, user) => {
    if (err) return res.status(401).json({ message: "Token invalido." });

    req.user = user;

    next();
  });
};
