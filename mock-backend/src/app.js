const express = require("express");
const cors = require("cors");
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const errorMiddleware = require("./middlewares/error");

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());

app.use("/api", productRoutes);
app.use("/api/auth", authRoutes);
app.use(errorMiddleware);

module.exports = app;
