import {
  getNotifications,
  markNotificationAsRead,
} from "../services/notification.service.js";

export const getUserNotifications = async (req, res) => {
  try {
    console.log("================================");
    console.log("GET /api/notifications");
    console.log("AUTH USER:", req.user);
    console.log("USER ID:", req.user?.id);
    console.log("================================");

    const notifications = await getNotifications(req.user.id);

    return res.status(200).json({
      success: true,
      data: notifications,
    });
  } catch (error) {
    console.error("GET NOTIFICATIONS ERROR:");
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const readNotification = async (req, res) => {
  try {
    console.log("================================");
    console.log("PATCH /api/notifications/:id/read");
    console.log("NOTIFICATION ID:", req.params.id);
    console.log("USER ID:", req.user?.id);
    console.log("================================");

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
    console.error("READ NOTIFICATION ERROR:");
    console.error(error);

    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};