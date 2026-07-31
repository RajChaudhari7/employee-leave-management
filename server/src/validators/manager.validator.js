import { z } from "zod";

export const updateLeaveStatusSchema = z.object({
  status: z.enum(["APPROVED", "REJECTED"]),
  managerRemarks: z.string().min(3, "Manager remarks are required").max(500),
});
