import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModel from "../models/user.js";
const secret = "test";
export const signup = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  try {
    const oldUser = await UserModel.findOne({ email });
    if (oldUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashPassword = await bcrypt.hash(password, 12);
    const result = await UserModel.create({
      email,
      password: hashPassword,
      name: `${firstName} ${lastName}`,
    });
    const token = jwt.sign({ email: result.email, id: result._id }, secret);


    res.status(200).json({ result, token });
  } catch (err) {
    res.status(500).json({ message: "Something wrong happened" });
    console.log(err);
  }
};
export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const oldUser = await UserModel.findOne({ email });
    if (!oldUser) {
      return res.status(404).json({ message: "User not found" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);
    if (!isPasswordCorrect) {
      return res.status(403).json({ message: "Incorrect Password" });
    }
    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret);


    res.status(200).json({ result: oldUser, token });
    } catch (err) {
    res.status(500).json({ message: "Something wrong happened" });
    console.log(err);
  }
};

export const googleLogIn = async (req, res) => {
  try {
    // console.log(req);
    // return res.send(200).json({ result: "", token: "" });
    const { credential } = req.body;

    const user = jwt.decode(credential);
    const { email, name } = user;

    const oldUser = await UserModel.findOne({ email });
    if (oldUser) {
      const result = {
        _id: oldUser._id.toString(),
        email,
        name,
      };
      const token = jwt.sign(
        { email: oldUser.email, id: oldUser._id },
        secret,
        {
          expiresIn: "1h",
        }
      );
      return res.status(200).json({ result, token });
    }
    const result = await UserModel.create({
      email,
      name,
      googleId: email,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, secret);
    return res.status(200).json({ result, token });
  } catch (err) {
    res.status(500).json({ message: "Something wrong happened" });
    console.log(err);
  }
};