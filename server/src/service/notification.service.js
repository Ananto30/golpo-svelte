const NotificationModel = require("../model/notification.model");
const Notification = NotificationModel.Notification;

const postService = require("./post.service");

exports.createCommentNotification = async (postId, comment_author) => {
  const post = await postService.getPostById(postId);
  const username = post.author;

  const notificationData = {
    post_id: postId,
    username,
    comment_author,
    clicked: false,
    created_at: new Date(),
  };
  const commentNotification = await Notification.create(notificationData);
  return commentNotification;
};

exports.getNotificationsByUsername = async (username) =>
  await Notification.find({ comment_author: username });

exports.findOneNotificationById = async (id) => await Notification.findById(id);

exports.notificationClicked = async (id) =>
  await Notification.findOneAndUpdate(
    { _id: id },
    { clicked: true },
    { new: true }
  );
