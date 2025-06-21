const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();


app.use(cors());
app.use(express.json());


mongoose.connect("mongodb://localhost:27017/fitness");

mongoose.connection.once("open", () => {
  console.log("✅ Connected to MongoDB");
}).on("error", (err) => {
  console.error("❌ MongoDB connection error:", err);
});


app.use("/api/activities", require("./routes/activities"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/auth", require("./routes/auth"));

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server started on port ${PORT}`));
