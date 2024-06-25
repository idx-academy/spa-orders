const express = require("express");
const cors = require("cors");
const productRoutes = require("./routes/productRoutes");

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());

app.use("/api", productRoutes);

app.get("/", (req, res) => {
  res.send("Hello world");
});

module.exports = app;
