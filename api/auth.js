const express = require("express");
const router = express.Router();

const authController = require("../src/controller/auth.controller");
const validateSchema = require("../src/middleware/validate");
router.post(
  "/login",
  validateSchema(authController.validators.login),
  authController.login
);

router.post("/login/google", authController.googleLogin);

router.get("/login/google/getAuthUrl", authController.getGoogleAuthUrl);

router.post(
  "/login/google/getToken",
  validateSchema(authController.validators.getTokenByGoogleCode),
  authController.getTokenByGoogleCode
);

module.exports = router;
