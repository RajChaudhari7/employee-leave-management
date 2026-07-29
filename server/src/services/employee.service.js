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
