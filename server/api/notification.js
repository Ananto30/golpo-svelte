const express = require("express");
const router = express.Router();

const notificationController = require("../src/controller/notification.controller");
const tokenMiddleware = require("../src/middleware/token");

router.get(
  "/:username",
  tokenMiddleware.checkToken,
  notificationController.getNotificationsByUsername
);

router.post(
  "/:id/clicked",
  tokenMiddleware.checkToken,
  notificationController.notificationClicked
);

module.exports = router;
