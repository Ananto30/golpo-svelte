const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
  post_id: String,
  username: String,
  comment_author: String,
  clicked: Boolean,
  created_at: Date,
});

module.exports = {
  Notification: mongoose.model("Notification", notificationSchema),
};
