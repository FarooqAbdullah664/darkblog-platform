// routes/blogs.js
const express = require("express");
const router  = express.Router();
const jwt     = require("jsonwebtoken");
const Blog    = require("../models/blog");

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey123";

// ---- helpers ----
function getToken(req) {
  const header = req.headers["authorization"];
  if (!header) return null;
  return header.startsWith("Bearer ") ? header.split(" ")[1] : header;
}

function authenticateToken(req, res, next) {
  const token = getToken(req);
  if (!token) return res.status(401).json({ message: "Access Denied: No token" });
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
}

// ---- CREATE blog ----
router.post("/blogs", authenticateToken, async (req, res) => {
  try {
    const { title, body } = req.body;
    if (!title?.trim() || !body?.trim())
      return res.status(400).json({ message: "Title and content are required" });
    if (title.trim().length > 100)
      return res.status(400).json({ message: "Title must be 100 characters or less" });
    if (body.trim().length < 20)
      return res.status(400).json({ message: "Content must be at least 20 characters" });

    const blog = await Blog.create({
      title:      title.trim(),
      body:       body.trim(),
      author:     req.user.id,
      authorName: req.user.fullName || "Unknown",
    });
    return res.status(201).json({ message: "Blog published successfully", blog });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
});

// ---- GET all blogs (public) with search ----
router.get("/blogs", async (req, res) => {
  try {
    const { search, page = 1, limit = 20 } = req.query;
    const query = {};
    if (search) {
      const regex = new RegExp(search, "i");
      query.$or = [{ title: regex }, { body: regex }, { authorName: regex }];
    }
    const skip  = (parseInt(page) - 1) * parseInt(limit);
    const total = await Blog.countDocuments(query);
    const blogs = await Blog.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .populate("author", "fullName email");

    return res.json({ blogs, total, page: parseInt(page), pages: Math.ceil(total / parseInt(limit)) });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
});

// ---- GET single blog ----
router.get("/blogs/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate("author", "fullName email");
    if (!blog) return res.status(404).json({ message: "Post not found" });
    return res.json({ blog });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
});

// ---- DELETE blog — admin can delete any, user can delete own ----
router.delete("/blogs/:id", authenticateToken, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Post not found" });

    const isAdmin = req.user.role === "admin";
    const isOwner = blog.author.toString() === req.user.id;

    if (!isAdmin && !isOwner)
      return res.status(403).json({ message: "You can only delete your own posts" });

    await Blog.findByIdAndDelete(req.params.id);
    return res.json({ message: "Post deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
