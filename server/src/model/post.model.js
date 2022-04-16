const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { tags } = require("../constants");

const postSchema = new Schema(
  {
    author: String,
    url: String,
    title: String,
    description: String,
    image: String,
    author_image: String,
    site_name: String,
    favicon: String,
    created_at: Date,
    updated_at: { type: Date, default: Date.now },
    comments: [
      {
        author: String,
        text: String,
        created_at: Date,
      },
    ],
    loves: [
      {
        author: String,
      },
    ],
    tags: { type: [String], enum: tags },
  },
  { collection: "post" } // TODO: should be removed, need to fix mongo model
);

module.exports = {
  Post: mongoose.model("Post", postSchema),
};
