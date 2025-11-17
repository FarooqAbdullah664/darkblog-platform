// routes/auth.js
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey123";

// Signup
router.post("/signup", async (req,res) => {
  try {
    const { fullName, email, password, role } = req.body;
    if (!fullName || !email || !password || !role) return res.status(400).json({ message: "All fields required" });

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ fullName, email, password: hashed, role });
    await user.save();
    return res.status(201).json({ message: "User registered successfully" });
  } catch(err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
});

// Login
router.post("/login", async (req,res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "All fields required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: user.role, fullName: user.fullName }, JWT_SECRET, { expiresIn: "1h" });
    return res.json({ token, role: user.role, fullName: user.fullName });
  } catch(err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
