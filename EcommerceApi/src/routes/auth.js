import { Router } from "express";
import { User } from "../models/User.js";
import bcrypt from "bcrypt";

import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
import { verifyToken } from "./verifyToken.js";

const router = Router();
//Register
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
  });
  try {
    const savedUser = await newUser.save();
    return res.status(201).json(savedUser);
  } catch (err) {
    return res.status(500).json(err);
  }
});
//Login

router.post("/login", async (req, res) => {
  try {
    const { usernameOrEmail, password } = req.body;

    // Find user by username or email
    const user = await User.findOne({
      $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
    });

    if (!user) {
      return res.status(401).json("Wrong Username or Email");
    }

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );

    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    if (originalPassword !== password) {
      return res.status(401).json("Wrong Password");
    }

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC,
      { expiresIn: "3d" }
    );

    const { password: userPassword, ...userData } = user._doc;
    return res.status(200).json({ ...userData, accessToken });
  } catch (err) {
    return res.status(500).json(err);
  }
});

//Logout
router.post("/logout", verifyToken, async (req, res) => {
  try {
    // Assuming req.user contains the user's information extracted from the token
    const userId = req.user._id;
    
    // Optionally, you might want to perform additional cleanup tasks or logging

    // Invalidate the user's token by removing it from the database or adding it to a blacklist
    // This prevents the token from being used for future requests
    // For example, if you store the token in the user document
    await User.findByIdAndUpdate(userId, { $unset: { token: "" } });
    
    return res.status(200).json({ message: 'Logged out successfully' });
  } catch (err) {
    return res.status(500).json({ error: 'An error occurred while logging out' });
  }
});

export default router; 
