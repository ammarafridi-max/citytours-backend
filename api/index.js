require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

// Middleware
const allowedOrigins = [process.env.FRONTEND_URL, process.env.ADMIN_URL];
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

function setCorsHeaders(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
}

app.use(setCorsHeaders);

// DB Connection
mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connected successfully");
  })
  .catch((dbError) => {
    console.log("Error connecting DB: " + dbError);
  });

// Routes
const userRoutes = require("../routes/user-routes");
const blogRoutes = require("../routes/blog-routes");
const tourRoutes = require("../routes/tours-routes");
const destinationRoutes = require("../routes/destination-routes");

app.use("/users", userRoutes);
app.use("/blogs", blogRoutes);
app.use("/tours", tourRoutes);
app.use("/destinations", destinationRoutes);

app.listen(process.env.PORT);

// Commnet
