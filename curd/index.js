// backend framework
import e from "express";

// environmental variable
import env from "dotenv";

// cors security
import cors from "cors";

// database
import database from "./config/connectDB.js"; // .js when file

// routes
import authRoutes from "./routes/authRoutes.js";
import curdRoutes from "./routes/curdRoutes.js";

// error handler middleware
import errorHandler from "./middleware/errorHandling.js";

// express app object
// for handling http requset response
const app = e();

// Load environment variables from .env file
env.config();

// database connection function
database();

// middleware
app.use(cors()); // browser cors policy

// json parser for client server smooth data exchage
app.use(e.json());

// prefix routes
// /auth/login or /auth/register or /auth/logout
app.use("/auth", authRoutes);
app.use("/curd", curdRoutes);

// control any route
app.get("*", function (req, res, next) {
  try {
    // by default return
    throw Error("page not found");
  } catch (error) {
    next(error);
  }
});

// error handler middleware
// the last req res cycle middleware
app.use(errorHandler);

// localhost port
const port = process.env.PORT || 5050;

// http localhost listener
app.listen(port, function () {
  console.log(`http://localhost:${port}`);
});
