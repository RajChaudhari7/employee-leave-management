import prisma from "../config/prisma.js";

export const getManagerDashboard = async () => {
  const [totalEmployees, pendingLeaves, approvedLeaves, rejectedLeaves] =
    await Promise.all([
      prisma.user.count({
        where: {
          role: "EMPLOYEE",
        },
      }),

      prisma.leaveRequest.count({
        where: {
          status: "PENDING",
        },
      }),

      prisma.leaveRequest.count({
        where: {
          status: "APPROVED",
        },
      }),

      prisma.leaveRequest.count({
        where: {
          status: "REJECTED",
        },
      }),
    ]);

  return {
    totalEmployees,
    pendingLeaves,
    approvedLeaves,
    rejectedLeaves,
  };
};
