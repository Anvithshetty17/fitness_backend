const express = require("express");
const router = express.Router();
const Activity = require("../models/Activity");
const auth = require("../middleware/auth");


router.get("/", auth, async (req, res) => {
console.log("Fetching activities for user:", req.user.id);

const activities = await Activity.find({ userId: req.user.id });
console.log("Activities found:", activities.length);

res.json(activities);
});


router.post("/", auth, async (req, res) => {
const { activity, duration, date } = req.body;

if (!activity || !duration || !date) {
return res.status(400).json({ message: "All fields are required" });
}

try {
const newActivity = new Activity({
activity,
duration,
date,
userId: req.user.id,
});


const saved = await newActivity.save();
res.status(201).json(saved);
} catch (err) {
console.error(err);
res.status(500).json({ message: "Error saving activity", error: err.message });
}
});


router.put("/:id", auth, async (req, res) => {
const { activity, duration, date } = req.body;

try {
const updated = await Activity.findOneAndUpdate(
{ _id: req.params.id, userId: req.user.id },
{ activity, duration, date },
{ new: true }
);


if (!updated) {
  return res.status(404).json({ message: "Activity not found" });
}

res.json(updated);
} catch (err) {
console.error(err);
res.status(500).json({ message: "Error updating activity", error: err.message });
}
});


router.delete("/:id", auth, async (req, res) => {
try {
const deleted = await Activity.findOneAndDelete({
_id: req.params.id,
userId: req.user.id,
});


if (!deleted) {
  return res.status(404).json({ message: "Activity not found" });
}

res.json({ message: "Activity deleted", id: deleted._id });
} catch (err) {
console.error(err);
res.status(500).json({ message: "Error deleting activity", error: err.message });
}
});

module.exports = router;