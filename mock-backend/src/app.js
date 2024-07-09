const express = require("express");
const cors = require("cors");
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const errorMiddleware = require("./middlewares/error");
const orderRoutes = require("./routes/orderRoutes");

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

app.get("/", (req, res) => {
  res.send("Hello world");
});
app.use(errorMiddleware);

module.exports = app;
