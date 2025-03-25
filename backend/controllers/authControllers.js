import { User } from "../models/User.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ username, password: hashedPassword });

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.cookie("token", token, { httpOnly: true, secure: true, sameSite: 'None'});

    res.status(201).json({ message: "User Registered", data: newUser });
  } catch (error) {
    res.status(400).send("Error : " + error.message);
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.cookie("token", token, { httpOnly: true, secure: true, sameSite: 'None'});
    res.status(200).json({message: "Login successfull.", data: user});
  } catch (error) {
    res.status(500).json({ message: "Login Failed" });
  }
};

export const logout =  async (req, res) => {
  try {
      res.cookie("token", null, {
          expires: new Date(Date.now()),
      });
      res.status(200).send("Logout successfull.")
  } catch (error) {
      res.status(400).send("ERROR : " + error.message);
  }
};
