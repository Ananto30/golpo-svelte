const UserModel = require("../model/user.model");
const User = UserModel.User;
const UserInfo = UserModel.UserInfo;

const activityService = require("./activity.service");

exports.getUserByUsernameAndPass = async (username, password) => {
  return await User.findOne({
    username: username,
    password: password,
  });
};

exports.getUserByGoogleMail = async (email) => {
  return await User.findOne({
    google_email: email,
  });
};

exports.getUserByUsername = async (username) => {
  return await User.findOne({
    username: username,
  });
};

exports.createUser = async (data) => {
  return await User.create(data);
};

exports.updateUser = async (username, updateInfo) => {
  let updates = {};
  if (updateInfo.google_token)
    updates["google_token"] = updateInfo.google_token;

  const userInfo = await User.findOneAndUpdate(
    { username: username },
    updates,
    { new: true }
  );

  return userInfo;
};

exports.followUser = async (username, usernameToFollow) => {
  await User.findOneAndUpdate(
    { username: usernameToFollow },
    { $addToSet: { followers: username } }
  );
  await User.findOneAndUpdate(
    { username: username },
    { $addToSet: { following: usernameToFollow } },
    { new: true }
  );
};

exports.unFollowUser = async (username, usernameToUnFollow) => {
  await User.findOneAndUpdate(
    { username: usernameToUnFollow },
    { $pull: { followers: username } }
  );
  await User.findOneAndUpdate(
    { username: username },
    { $pull: { following: usernameToUnFollow } }
  );
};

exports.getAllUsers = async () => {
  return await UserInfo.find({});
};

exports.getUserMeta = async (username) => {
  return await UserInfo.findOne({ username: username });
};

exports.createUserMeta = async (data) => {
  return await UserInfo.create(data);
};

exports.updateUserMeta = async (username, updateInfo) => {
  let updates = {};
  if (updateInfo.work) updates["work"] = updateInfo.work;
  if (updateInfo.tagline) updates["tagline"] = updateInfo.tagline;
  if (updateInfo.image) updates["image"] = updateInfo.image;
  if (updateInfo.display_name)
    updates["display_name"] = updateInfo.display_name;

  const userInfo = await UserInfo.findOneAndUpdate(
    { username: username },
    updates,
    { new: true }
  );

  // await metaUpdateActivity(username, updateInfo);

  return userInfo;
};

exports.getUsersMeta = async (usernames) => {
  return await UserInfo.find({
    username: { $in: usernames },
  });
};

exports.getFollowers = async (username) => {
  const user = await User.findOne({ username: username });

  return await UserInfo.find({
    username: { $in: user.followers },
  });
};

exports.getFollowing = async (username) => {
  const user = await User.findOne({ username: username });

  return await UserInfo.find({
    username: { $in: user.following },
  });
};

metaUpdateActivity = async (username, updateInfo) => {
  let data;
  if (updateInfo.image) {
    data = {
      username: username,
      summary: "changed their picture! WOW!",
      extraImages: [updateInfo.image],
    };
    await activityService.createActivity(data);
  }
  if (updateInfo.tagline) {
    data = {
      username: username,
      summary: "changed their tagline",
      extraText: updateInfo.tagline,
    };
    await activityService.createActivity(data);
  }
  if (updateInfo.work) {
    data = {
      username: username,
      summary: "changed their work status! Impressive!",
      extraText: updateInfo.work,
    };
    await activityService.createActivity(data);
  }
};
