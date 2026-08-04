export default function EmployeeSkeleton() {
  return (
    <div className="grid lg:grid-cols-2 gap-6 p-8">

      {[1, 2, 3, 4].map((item) => (
        <div
          key={item}
          className="bg-white rounded-2xl border shadow p-8 animate-pulse"
        >
          <div className="h-6 w-48 bg-gray-200 rounded"></div>

          <div className="h-4 w-32 bg-gray-200 rounded mt-4"></div>

          <div className="grid grid-cols-2 gap-4 mt-8">

            {[1, 2, 3, 4].map((box) => (
              <div
                key={box}
                className="h-24 rounded-xl bg-gray-200"
              ></div>
            ))}

          </div>
        </div>
      ))}

    </div>
  );
}