import {
  getNotifications,
  markNotificationAsRead,
} from "../services/notification.service.js";

export const getUserNotifications = async (req, res) => {
  try {
    const notifications = await getNotifications(req.user.id);

    return res.status(200).json({
      success: true,
      data: notifications,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const readNotification = async (req, res) => {
  try {
    const notification = await markNotificationAsRead(
      req.params.id,
      req.user.id,
    );

    return res.status(200).json({
      success: true,
      message: "Notification marked as read.",
      data: notification,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
