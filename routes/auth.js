const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");


router.post("/register", async (req, res) => {
const { email, password } = req.body;
try {
const existingUser = await User.findOne({ email });
if (existingUser)
return res.status(400).json({ msg: "User already exists" });


const salt = await bcrypt.genSalt(10);
const hashed = await bcrypt.hash(password, salt);

const newUser = new User({ email, password: hashed });
await newUser.save();

const token = jwt.sign({ id: newUser._id }, "secret", { expiresIn: "1d" });
res.json({ token });
} catch (err) {
console.error(err);
res.status(500).send("Server error");
}
});

router.post("/login", async (req, res) => {
const { email, password } = req.body;
try {
const user = await User.findOne({ email });
if (!user)
return res.status(400).json({ msg: "Invalid email or password" });


const isMatch = await bcrypt.compare(password, user.password);
if (!isMatch)
  return res.status(400).json({ msg: "Invalid email or password" });

const token = jwt.sign({ id: user._id }, "secret", { expiresIn: "1d" });
res.json({ token });
} catch (err) {
console.error(err);
res.status(500).send("Server error");
}
});

module.exports = router;