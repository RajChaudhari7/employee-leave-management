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

export const getAllEmployees = async () => {
  const employees = await prisma.user.findMany({
    where: {
      role: "EMPLOYEE",
    },

    orderBy: {
      createdAt: "desc",
    },

    select: {
      id: true,
      username: true,
      createdAt: true,

      leaveRequests: {
        select: {
          status: true,
        },
      },
    },
  });

  return employees.map((employee) => {
    const leaveCount = employee.leaveRequests.length;

    const pendingLeaves = employee.leaveRequests.filter(
      (leave) => leave.status === "PENDING",
    ).length;

    const approvedLeaves = employee.leaveRequests.filter(
      (leave) => leave.status === "APPROVED",
    ).length;

    const rejectedLeaves = employee.leaveRequests.filter(
      (leave) => leave.status === "REJECTED",
    ).length;

    return {
      id: employee.id,

      username: employee.username,

      createdAt: employee.createdAt,

      leaveCount,

      pendingLeaves,

      approvedLeaves,

      rejectedLeaves,
    };
  });
};

export const getAllLeaveRequests = async () => {
  const leaves = await prisma.leaveRequest.findMany({
    orderBy: {
      createdAt: "desc",
    },

    include: {
      employee: {
        select: {
          id: true,
          username: true,
        },
      },
    },
  });
  return leaves;
};
