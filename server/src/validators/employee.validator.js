import { z } from "zod";

export const applyLeaveSchema = z.object({
    reason : z.string().min(5),

    startDate : z.string(),

    endDate : z.string(),

});
