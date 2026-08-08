import prisma from "../config/prisma.js";

export const createNotification = async (userId, message) => {
  return await prisma.notification.create({
    data: {
      userId,
      message,
    },
  });
};

export const getNotifications = async (userId) => {
  console.log("========== GET NOTIFICATIONS ==========");
  console.log("USER ID:", userId);

  if (!userId) {
    throw new Error("User ID is missing");
  }

  const notifications = await prisma.notification.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  console.log("NOTIFICATIONS FOUND:", notifications.length);
  console.log("=======================================");

  return notifications;
};

export const markNotificationAsRead = async (
  notificationId,
  userId,
) => {
  console.log("========== MARK NOTIFICATION ==========");
  console.log("NOTIFICATION ID:", notificationId);
  console.log("USER ID:", userId);

  const notification = await prisma.notification.findFirst({
    where: {
      id: notificationId,
      userId: userId,
    },
  });

  if (!notification) {
    throw new Error("Notification not found");
  }

  return await prisma.notification.update({
    where: {
      id: notificationId,
    },
    data: {
      isRead: true,
    },
  });
};