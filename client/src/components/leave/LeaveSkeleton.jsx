export default function LeaveSkeleton() {
  return (
    <div className="space-y-5">
      {[...Array(5)].map((_, index) => (
        <div
          key={index}
          className="bg-white rounded-3xl border shadow-sm p-6 animate-pulse"
        >
          <div className="h-6 w-56 bg-gray-200 rounded"></div>

          <div className="mt-5 h-4 w-72 bg-gray-100 rounded"></div>

          <div className="mt-8 h-4 w-full bg-gray-100 rounded"></div>

          <div className="mt-3 h-4 w-3/4 bg-gray-100 rounded"></div>
        </div>
      ))}
    </div>
  );
}