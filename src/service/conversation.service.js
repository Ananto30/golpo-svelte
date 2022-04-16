const ConversationModel = require("../model/conversation.model");
const mongoose = require('mongoose');
const Conversation = ConversationModel.Conversation;

exports.getChatListAndLastChatForUser = async (username) => {
  const chats = await Conversation.find(
    { participants: { $all: [username] } },
    { chats: { $slice: -1 } }
  );
  return chats;
};

exports.getChatByUsernameForUser = async (sender, receiver) => {
  let chats = await Conversation.findOne({
    participants: {
      $size: 2,
      $all: [sender, receiver],
    },
  });
  if (!chats || chats.length === 0) {
    chats = await Conversation.create({
      participants: [sender, receiver],
      chats: [],
    });
  }
  return chats;
};

/* IMPORTANT: This must be used when conversation exists
   To initiate conversation use `sendMessage` */
exports.sendChat = async (sender, receiver, text) => {
  let chats = await Conversation.updateOne(
    { participants: { $size: 2, $all: [sender, receiver] } },
    {
      $push: {
        chats: {
          from: sender,
          text: text,
          date: new Date(),
          seen: false,
        },
      },
    },
    { upsert: true }
  );
  if (chats.length === 0) {
    chats = await Conversation.create({
      participants: [sender, receiver],
      chats: [],
    });
  }
  return chats;
};

/* IMPORTANT: This is basically used to initiate a conversation */
exports.sendMessage = async (sender, receiver, text) => {
  // initialize, because this method creates new chat if not found
  await this.getChatByUsernameForUser(sender, receiver);
  // send
  await this.sendChat(sender, receiver, text);

  return true;
};

exports.chatSeen = async (sender, receiver, chatId) => {
  if (!mongoose.Types.ObjectId.isValid(chatId))
    return {
      errors: [
        {
          msg: "User not found",
          status: "404",
        },
      ],
    };
  const chats = await Conversation.findOneAndUpdate(
    {
      participants: [sender, receiver],
      "chats._id": chatId,
    },
    { "chats.$.seen": true },
    { new: true }
  );

  if (!chats || chats.length === 0) {
    return {
      participants: [sender, receiver],
      chats: [],
    }
  }
  return chats;
};


