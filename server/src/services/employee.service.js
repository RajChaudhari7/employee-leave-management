import prisma from "../config/prisma.js";

export const applyLeave = async ({
  userId,
  reason,
  startDate,
  endDate,
  documentPath,
}) => {
  const leave = await prisma.leaveRequest.create({
    data: {
      employeeId: userId,
      reason,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      documentPath,
    },
  });
  return leave;
};

export const getLeaveHistory = async (userId) => {
  const leaves = await prisma.leaveRequest.findMany({
    where: {
      employeeId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      reason: true,
      startDate: true,
      endDate: true,
      status: true,
      managerRemarks: true,
      documentPath: true,
      createdAt: true,
    },
  });

  return leaves;
};

export const getDashboardData = async (userId) => {
  const [totalLeaves, pendingLeaves, approvedLeaves, rejectedLeaves] =
    await Promise.all([
      prisma.leaveRequest.count({
        where: {
          employeeId: userId,
        },
      }),

      prisma.leaveRequest.count({
        where: {
          employeeId: userId,
          status: "PENDING",
        },
      }),

      prisma.leaveRequest.count({
        where: {
          employeeId: userId,
          status: "APPROVED",
        },
      }),

      prisma.leaveRequest.count({
        where: {
          employeeId: userId,
          status: "REJECTED",
        },
      }),
    ]);

  return {
    totalLeaves,
    pendingLeaves,
    approvedLeaves,
    rejectedLeaves,
  };
};
