const jwt = require("jsonwebtoken");
const config = require("../config");

const userService = require("./user.service");

exports.verifyUserAndGenerateToken = async (username, password) => {
  const user = await userService.getUserByUsernameAndPass(username, password);

  if (!user) {
    throw new Error("Invalid credentials");
  }

  let token = jwt.sign({ username: user.username }, config.jwtSecret, {
    expiresIn: config.jwtExpiration,
  });

  // const data = {
  //   username: username,
  //   summary: "logged in! Yee!",
  // };
  // await activityService.createActivity(data);

  return token;
};

exports.findOrCreateGoogleUserAndGenerateToken = async (data) => {
  let user = await userService.getUserByGoogleMail(data._profile.email);
  const profileData = data._profile;
  if (!user) {
    data = {
      username: profileData.email.split("@")[0],
      google_id: profileData.sub,
      google_email: profileData.email,
      google_name: profileData.name,
      google_picture: profileData.picture,
    };
    user = await userService.createUser(data);
    await userService.createUserMeta({ username: user.username, image: user.google_picture });
  }

  const token = jwt.sign({ username: user.username }, config.jwtSecret, {
    expiresIn: config.jwtExpiration,
  });

  return token;
};
