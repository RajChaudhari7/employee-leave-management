export default function DashboardHeader() {
  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12) greeting = "Good Morning";
  else if (hour < 17) greeting = "Good Afternoon";

  return (
    <div className="mb-10">
      <h1 className="text-4xl font-bold">
        {greeting} 👋
      </h1>

      <p className="text-gray-500 mt-2">
        Welcome back! Here's your leave management overview.
      </p>
    </div>
  );
}