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
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    optionsSuccessStatus: 200,
  })
);

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
