const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: String,
    password: String,
    followers: [String],
    following: [String],
    created_at: Date,
    updated_at: { type: Date, default: Date.now },
    last_login_at: { type: Date, default: Date.now },

    google_id: String,
    google_email: String,
    google_name: String,
    google_picture: String,

    google_token: String, // this is a hack to save jwt token for oauth login, this token has a low expiration time
  },
  { collection: "user" } // TODO: should be removed, need to fix mongo model
);

const userInfoSchema = new Schema(
  {
    username: String,
    tagline: String,
    work: String,
    image: String,
    display_name: String,
  },
  { collection: "userinfo" } // TODO: should be removed, need to fix mongo model
);

module.exports = {
  User: mongoose.model("User", userSchema),
  UserInfo: mongoose.model("UserInfo", userInfoSchema),
};
