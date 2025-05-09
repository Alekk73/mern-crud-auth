import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";
import User from "../models/user.model.js";

export const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const passHash = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: passHash,
    });

    const userSaved = await newUser.save();
    const token = await createAccessToken({ id: userSaved._id });

    res.cookie("token", token);
    res.json({ message: "Usuario creado correctamente." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userFound = await User.findOne({ email });

    if (!userFound) {
      return res.status(400).json({ message: "Usuario no encontrado." });
    }

    const isMatch = await bcrypt.compare(password, userFound.password);

    if (!isMatch)
      return res.status(400).json({ message: "Credenciales invalidas." });

    const token = await createAccessToken({ id: userFound._id });

    res.cookie("token", token);
    res.json({
      message: "Usuario logeado correctamente.",
      user: {
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logout = (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0),
  });
  return res.sendStatus(200);
};
