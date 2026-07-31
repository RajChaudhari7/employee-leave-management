import prisma from "../config/prisma.js";


const BASE_URL = process.env.BASE_URL || "http://localhost:5000";

return leaves.map((leave) => ({
  ...leave,
  documentUrl: leave.documentPath
    ? `${BASE_URL}/${leave.documentPath.replace("src/", "")}`
    : null,
}));


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

export const getAllEmployees = async (
  page = 1,
  limit = 10,
  search = ""
) => {
  page = Number(page);
  limit = Number(limit);

  const skip = (page - 1) * limit;

  const where = {
    role: "EMPLOYEE",
    username: {
      contains: search,
      mode: "insensitive",
    },
  };

  const [employees, total] = await Promise.all([
    prisma.user.findMany({
      where,
      skip,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        leaveRequests: {
          select: {
            status: true,
          },
        },
      },
    }),

    prisma.user.count({
      where,
    }),
  ]);

  const data = employees.map((employee) => ({
    id: employee.id,
    username: employee.username,
    createdAt: employee.createdAt,

    totalLeaves: employee.leaveRequests.length,

    pendingLeaves: employee.leaveRequests.filter(
      (leave) => leave.status === "PENDING"
    ).length,

    approvedLeaves: employee.leaveRequests.filter(
      (leave) => leave.status === "APPROVED"
    ).length,

    rejectedLeaves: employee.leaveRequests.filter(
      (leave) => leave.status === "REJECTED"
    ).length,
  }));

  return {
    employees: data,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const getAllLeaveRequests = async (
  page = 1,
  limit = 10,
  status = "",
  search = ""
) => {
  page = Number(page);
  limit = Number(limit);

  const skip = (page - 1) * limit;

  const where = {};

  if (status) {
    where.status = status;
  }

  if (search) {
    where.employee = {
      username: {
        contains: search,
        mode: "insensitive",
      },
    };
  }

  const [leaves, total] = await Promise.all([
    prisma.leaveRequest.findMany({
      where,
      skip,
      take: limit,
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
    }),

    prisma.leaveRequest.count({
      where,
    }),
  ]);

  return {
    leaves,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const updateLeaveStatus = async (leaveId, status, managerRemarks) => {
  const leave = await prisma.leaveRequest.findUnique({
    where: {
      id: leaveId,
    },
  });

  if (!leave) {
    throw new Error("Leave request not found");
  }

  if (leave.status !== "PENDING") {
    throw new Error("Leave request has already been processed");
  }

  const updatedLeave = await prisma.$transaction(async (tx) => {
    const leaveData = await tx.leaveRequest.update({
      where: {
        id: leaveId,
      },
      data: {
        status,
        managerRemarks,
      },
    });

    await tx.notification.create({
      data: {
        userId: leave.employeeId,
        message: `Your leave request from ${leave.startDate.toLocaleDateString()} to ${leave.endDate.toLocaleDateString()} has been ${status}.`,
      },
    });

    return leaveData;
  });

  return updatedLeave;
};
