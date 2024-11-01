const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();

app.get("/api", (req, res) => {
  res.json({ message: "Welcome to API" });
});

app.post("/api/posts", (req, res) => {
  res.json({ message: "Post created..." });
});

app.listen(5000, () => console.log("Started on port 5000"));
