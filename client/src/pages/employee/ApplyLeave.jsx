import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

import {
  Calendar,
  Loader2,
  RotateCcw,
  Send,
  ClipboardList,
} from "lucide-react";

import FileUpload from "../../components/FileUpload";
import { applyLeave } from "../../services/leave.service";

const schema = z
  .object({
    reason: z
      .string()
      .min(5, "Reason must be at least 5 characters")
      .max(500, "Reason cannot exceed 500 characters"),

    startDate: z.string().min(1, "Start Date is required"),

    endDate: z.string().min(1, "End Date is required"),
  })
  .refine((data) => new Date(data.endDate) >= new Date(data.startDate), {
    message: "End Date cannot be before Start Date",
    path: ["endDate"],
  });

export default function ApplyLeave() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      reason: "",
      startDate: "",
      endDate: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);

  const today = new Date().toISOString().split("T")[0];

  const reason = watch("reason");

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("reason", data.reason);
      formData.append("startDate", data.startDate);
      formData.append("endDate", data.endDate);

      if (file) {
        formData.append("document", file);
      }

      await applyLeave(formData);

      toast.success("Leave Applied Successfully", {
        description: "Your leave request has been sent to your manager.",
      });

      reset();
      setFile(null);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to apply leave.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    reset();
    setFile(null);

    toast.info("Form Cleared");
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <div className="bg-white rounded-3xl shadow-xl border overflow-hidden">
        {/* Header */}

        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-8 py-8">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-4 rounded-2xl">
              <ClipboardList className="text-white" size={34} />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-white">Apply Leave</h1>

              <p className="text-blue-100 mt-1">
                Submit your leave request for manager approval.
              </p>
            </div>
          </div>
        </div>

        {/* Form */}

        <div className="p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Reason */}

            <div>
              <label className="block text-sm font-semibold mb-3">
                Leave Reason
              </label>

              <textarea
                rows={5}
                placeholder="Example: Medical Leave, Family Function, Vacation..."
                {...register("reason")}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 resize-none outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />

              <div className="flex justify-between mt-2">
                <p className="text-red-500 text-sm">{errors.reason?.message}</p>

                <p className="text-gray-400 text-sm">
                  {reason?.length || 0}/500
                </p>
              </div>
            </div>

            {/* Dates */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-3">
                  Start Date
                </label>

                <div className="relative">
                  <input
                    type="date"
                    min={today}
                    {...register("startDate")}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition"
                  />

                  <Calendar
                    size={18}
                    className="absolute right-4 top-4 text-gray-400 pointer-events-none"
                  />
                </div>

                <p className="text-red-500 text-sm mt-2">
                  {errors.startDate?.message}
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-3">
                  End Date
                </label>

                <div className="relative">
                  <input
                    type="date"
                    min={today}
                    {...register("endDate")}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition"
                  />

                  <Calendar
                    size={18}
                    className="absolute right-4 top-4 text-gray-400 pointer-events-none"
                  />
                </div>

                <p className="text-red-500 text-sm mt-2">
                  {errors.endDate?.message}
                </p>
              </div>
            </div>

            {/* File Upload */}

            <div>
              <label className="block text-sm font-semibold mb-3">
                Supporting Document (Optional)
              </label>

              <FileUpload file={file} onFileSelect={setFile} />
            </div>

            {/* Footer */}

            <div className="border-t pt-6 flex flex-col sm:flex-row justify-end gap-4">
              <button
                type="button"
                onClick={handleReset}
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-gray-300 hover:bg-gray-100 transition"
              >
                <RotateCcw size={18} />
                Reset
              </button>

              <button
                type="submit"
                disabled={loading}
                className="flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Applying...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Apply Leave
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
