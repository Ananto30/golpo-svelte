module.exports = {
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiration: "24h",

  googleClientID: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  googleCallbackUrl: process.env.GOOGLE_CALLBACK_URL,

  mongoUrl: process.env.MONGO_URL,
};
