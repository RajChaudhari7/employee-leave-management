export default function NotificationSkeleton() {
  return (
    <div className="space-y-5">
      {[...Array(5)].map((_, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl p-6 shadow-sm border animate-pulse"
        >
          <div className="h-5 w-2/3 bg-gray-200 rounded"></div>

          <div className="h-4 w-32 bg-gray-100 rounded mt-4"></div>
        </div>
      ))}
    </div>
  );
}