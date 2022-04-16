const express = require("express");
const router = express.Router();

const chatController = require("../src/controller/chat.controller");
const tokenMiddleware = require("../src/middleware/token");
const validateSchema = require("../src/middleware/validate");

router.get("/", tokenMiddleware.checkToken, chatController.getChats);

router.get(
  "/:receiver",
  tokenMiddleware.checkToken,
  chatController.getByReceiver
);

router.post(
  "/:receiver",
  tokenMiddleware.checkToken,
  validateSchema(chatController.validators.sendChat),
  chatController.sendChat
);

router.post(
  "/:receiver/message",
  tokenMiddleware.checkToken,
  validateSchema(chatController.validators.sendChat),
  chatController.sendMessage
);

router.put(
  "/:receiver/:chatId/seen",
  tokenMiddleware.checkToken,
  chatController.chatSeen
);

module.exports = router;
