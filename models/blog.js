// models/Blog.js
const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title:   { type: String, required: true },
  body:    { type: String, required: true },
  author:  { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  authorName: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("Blog", blogSchema);
