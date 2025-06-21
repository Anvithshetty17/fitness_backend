const mongoose = require("mongoose");

const ActivitySchema = new mongoose.Schema(
{
activity: {
type: String,
required: true,
trim: true,
},
duration: {
type: Number,
required: true,
min: 1,
},
date: {
type: Date,
required: true,
},
userId: {
type: mongoose.Schema.Types.ObjectId,
ref: "User",
required: true,
},
},
{ timestamps: true }
);

module.exports = mongoose.model("Activity", ActivitySchema);