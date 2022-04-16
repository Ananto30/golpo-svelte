const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const activitySchema = new Schema(
  {
    username: String,
    summary: String,
    link: String,
    date: Date,
    extra_text: String,
    extra_images: [String],
  },
  { collection: "activity" } // TODO: should be removed, need to fix mongo model
);

module.exports = {
  Activity: mongoose.model("Activity", activitySchema),
};
