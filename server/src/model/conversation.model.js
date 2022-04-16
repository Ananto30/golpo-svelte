const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const conversationSchema = new Schema(
  {
    participants: [String],
    chats: [
      {
        from: String,
        text: String,
        date: Date,
        seen: Boolean,
      },
    ],
  },
  { collection: "conversation" } // TODO: should be removed, need to fix mongo model
);

module.exports = {
  Conversation: mongoose.model("Conversation", conversationSchema),
};
