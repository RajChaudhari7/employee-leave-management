export default function DashboardSkeleton() {
  return (
    <div className="p-8 animate-pulse">

      <div className="h-10 w-64 bg-gray-200 rounded mb-8"></div>

      <div className="grid grid-cols-4 gap-6">

        {[1,2,3,4].map((item)=>(
          <div
            key={item}
            className="h-36 rounded-2xl bg-gray-200"
          />
        ))}

      </div>

      <div className="grid grid-cols-2 gap-6 mt-8">

        <div className="h-80 rounded-2xl bg-gray-200"/>

        <div className="h-80 rounded-2xl bg-gray-200"/>

      </div>

    </div>
  );
}