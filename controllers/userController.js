import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;

export const userRegister = async (req, res) => {
  try {
    const {  password } = req.body;

    const salt = bcrypt.genSaltSync(9);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const newUser = await User.create({...req.body,  password: hashedPassword });

    res.json(newUser);
  } catch (error) {
    res.json(error);
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("this user doesn't exist");
      return;
    }

    const passwordCheck = bcrypt.compareSync(password, user.password);

    if (!passwordCheck) {
      throw new Error("wrong password");
      return;
    }

    const token = jwt.sign({ userId: user._id }, SECRET_KEY, {
      expiresIn: "1hour",
    });

    res
      .cookie("token", token, {
        httpOnly: true,
      })
      .json(user);
  } catch (error) {
    res.json(error.message);
  }
};

export const getUser = (req, res) => {
    res.json(req.user);
  };

export const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.user._id, req.body, {
      new: true,
    });

    res.json(updatedUser);
  } catch (error) {
    res.json(error.message);
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find();

    res.json(allUsers);
  } catch (error) {
    res.json(error.message);
  }
};

export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user._id);

    res.json("your account has been deleted");
  } catch (error) {
    res.json(error.message);
  }
};
