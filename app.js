const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const userRoutes = require("./routes/user");
const offerRoutes = require("./routes/offer");
app.use(express.json());

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use("/api", userRoutes);
app.use("/api", offerRoutes);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
