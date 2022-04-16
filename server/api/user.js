const express = require("express");
const router = express.Router();

const userController = require("../src/controller/user.controller");
const tokenMiddleware = require("../src/middleware/token");
const validateSchema = require("../src/middleware/validate");

router.get("/", tokenMiddleware.checkToken, userController.getAllUsers);

router.get(
  "/me",
  tokenMiddleware.checkToken,
  userController.getUserMetaByToken
);

router.post(
  "/get_users_meta",
  tokenMiddleware.checkToken,
  validateSchema(userController.validators.getUsersMeta),
  userController.getUsersMeta
);

router.post(
  "/me/update",
  tokenMiddleware.checkToken,
  validateSchema(userController.validators.updateMeta),
  userController.updateMeta
);

router.get(
  "/:username",
  tokenMiddleware.checkToken,
  userController.getUserDetails
);

router.post(
  "/:username/follow",
  tokenMiddleware.checkToken,
  userController.followUser
);

router.post(
  "/:username/unfollow",
  tokenMiddleware.checkToken,
  userController.unFollowUser
);

router.get(
  "/:username/followers",
  tokenMiddleware.checkToken,
  userController.getFollowers
);

router.get(
  "/:username/following",
  tokenMiddleware.checkToken,
  userController.getFollowing
);

module.exports = router;
