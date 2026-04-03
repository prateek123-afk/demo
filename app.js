const express = require("express");
const path = require("path");
const cors = require("cors");
const compressRoute = require("./routes/compress");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "frontend"))); 
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "index.html"));
});
app.get("/", (req, res) => {
  res.send("Backend is running ");
});

app.use("/api", compressRoute);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});