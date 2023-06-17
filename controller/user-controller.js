import User from "../model/user";
import bcrypt from "bcryptjs";

//GET ALLUSERS
export const getAllUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (err) {
    console.log(err);
  }
  if (!users) {
    return res.status(404).json({ message: "users are empty" });
  }

  return res.status(200).json({ users });
};

//signup

export const signUp = async (req, res, next) => {
  const {
    name,
    email,
    password,
    
  } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    console.log(err);
  }
  if (existingUser) {
    return res.status(400).json({ message: "user already exists" });
  }
  const hashedPassword = bcrypt.hashSync(password);
  const user = new User({
    name,
    email,
    password: hashedPassword,
    blogs: [],
  });
  try {
    user.save();
  } catch (err) {
    console.log(err);
  }
  return res.status(201).json({ user });
};

//login

export const logIn = async (req, res, next) => {
  const {
    name,
    email,
    password,
    
  } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    console.log(err);
  }
  if (!existingUser) {
    return res.status(404).json({ message: "couldnot find the user" });
  }
  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "wrong password" });
  }
  return res.status(200).json({ message: "login succesfull" });
};
