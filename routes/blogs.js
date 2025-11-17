// routes/blogs.js
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Blog = require("../models/blog");
const User = require("../models/user");

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey123";

// helper to extract token (handles "Bearer ")
function getTokenFromHeader(req) {
  const header = req.headers["authorization"];
  if (!header) return null;
  if (header.startsWith("Bearer ")) return header.split(" ")[1];
  return header;
}

// auth middleware
async function authenticateToken(req, res, next) {
  const token = getTokenFromHeader(req);
  if (!token) return res.status(401).json({ message: "Access Denied" });
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload; // id, role, fullName
    next();
  } catch(err) {
    return res.status(403).json({ message: "Invalid Token" });
  }
}

// role middleware
function authorizeRoles(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) return res.status(403).json({ message: "Not Authorized" });
    next();
  };
}

// Create blog (user or admin)
router.post("/blogs", authenticateToken, async (req,res) => {
  try {
    const { title, body } = req.body;
    if (!title || !body) return res.status(400).json({ message: "All fields required" });

    const blog = new Blog({
      title,
      body,
      author: req.user.id,
      authorName: req.user.fullName || "Unknown"
    });
    await blog.save();
    return res.status(201).json({ message: "Blog created", blog });
  } catch(err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
});

// Get all blogs (public)
router.get("/blogs", async (req,res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 }).populate("author", "fullName email");
    return res.json({ blogs });
  } catch(err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
});

// Delete blog - admin only
router.delete("/blogs/:id", authenticateToken, authorizeRoles("admin"), async (req,res) => {
  try {
    const id = req.params.id;
    await Blog.findByIdAndDelete(id);
    return res.json({ message: "Blog deleted" });
  } catch(err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
