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
  return await prisma.notification.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const markNotificationAsRead = async (notificationId, userId) => {
  const notification = await prisma.notification.findFirst({
    where: {
      id: notificationId,
      userId,
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