const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();

app.get("/api", (req, res) => {
  res.json({ message: "Welcome to API" });
});

app.post("/api/posts", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretKey", (error, authData) => {
    if (error) {
      res.sendStatus(403);
    } else {
      res.json({ message: "Post created...", authData });
    }
  });
});

app.post("/api/login", (req, res) => {
  const user = {
    id: 1,
    username: "brad",
    email: "brad@gmail.com",
  };
  jwt.sign({ user }, "secretKey", { expiresIn: "60s" }, (error, token) => {
    res.json({ token });
  });
});

// FORMAT OF TOKEN
// Authorization: Bearer <access_token>

// Verify token
function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  console.log(bearerHeader);

  // Check if bearer is undefined
  if (typeof bearerHeader !== "undefined") {
    // Split at the space
    const bearer = bearerHeader.split(" ");
    // Get the token from Array
    const bearerToken = bearer[1];

    // Set the token
    req.token = bearerToken;

    // Call the next middleware
    next();
  } else {
    // Forbidden
    res.sendStatus(403);
  }
}

app.listen(5000, () => console.log("Started on port 5000"));
