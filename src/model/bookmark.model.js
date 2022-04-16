const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookmarkPostSchema = new Schema({
  username: String,
  post_ids: [mongoose.Types.ObjectId],
});

module.exports = {
  BookmarkPost: mongoose.model("BookmarkPost", bookmarkPostSchema),
};
