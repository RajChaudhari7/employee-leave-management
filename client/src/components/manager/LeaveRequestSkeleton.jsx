export default function LeaveRequestSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl p-6 border shadow-sm animate-pulse"
        >
          <div className="h-6 bg-gray-200 rounded w-1/4"></div>

          <div className="h-4 bg-gray-100 rounded w-1/2 mt-4"></div>

          <div className="h-4 bg-gray-100 rounded w-1/3 mt-3"></div>

          <div className="flex gap-3 mt-6">
            <div className="h-10 w-28 bg-gray-200 rounded-xl"></div>

            <div className="h-10 w-28 bg-gray-200 rounded-xl"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
