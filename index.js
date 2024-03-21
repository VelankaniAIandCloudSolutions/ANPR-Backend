const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const { sequelize } = require("./models");
sequelize
  .authenticate()
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });
app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "ok" });
});

// app.use("/api/v1/orders/", ordersRouter);

app.listen(port, "0.0.0.0", () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
