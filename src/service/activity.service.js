const ActivityModel = require("../model/activity.model");
const Activity = ActivityModel.Activity;

exports.getAll = async () => {
  return await Activity.find({});
};

exports.getLatest = async (limit) => {
  return await Activity.find({}).sort({date: -1}).limit(limit);
};

exports.getByUsername = async (username) => {
  return await Activity.find({username: username});
};

exports.createActivity = async (data) => {
  const actData = {
    username: data.username,
    summary: data.summary,
    link: data.link,
    date: new Date(),
    extra_text: data.extraText,
    extra_images: data.extraImages,
  };
  const activity = await Activity.create(actData);
  sendSocketActivity(activity);
  return activity;
};

sendSocketActivity = (data) => {
  const io = require("../controller/socket.controller").connection();
  io.sendToAll("activity", JSON.stringify(data));
};
