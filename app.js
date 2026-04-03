const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", compressRoute);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
