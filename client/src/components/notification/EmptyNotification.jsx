import { BellOff } from "lucide-react";

export default function EmptyNotification() {
  return (
    <div className="bg-white rounded-3xl shadow-sm border p-16 text-center">

      <BellOff
        size={80}
        className="mx-auto text-gray-300"
      />

      <h2 className="text-2xl font-bold mt-6">
        No Notifications
      </h2>

      <p className="text-gray-500 mt-2">
        You're all caught up.
      </p>

    </div>
  );
}