const express = require("express");
const cors = require("cors");
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const errorMiddleware = require("./middlewares/error");
const orderRoutes = require("./routes/orderRoutes");
const cartRoutes = require("./routes/cartRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());

app.use("/api/v1", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/v1", orderRoutes);
app.use("/api/v1", cartRoutes);
app.use("/api/v1", userRoutes);
app.use(errorMiddleware);

module.exports = app;
