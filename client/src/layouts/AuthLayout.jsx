import AuthLogo from "../components/auth/AuthLogo";
import AuthFeature from "../components/auth/AuthFeature";

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex">

      {/* LEFT PANEL */}

      <div className="hidden lg:flex w-3/5 p-16 flex-col justify-between">

        <div>
          <AuthLogo />

          <h2 className="text-6xl font-bold text-white mt-16 leading-tight">
            Smart Leave
            <br />
            Management
          </h2>

          <p className="text-blue-100 text-xl mt-6 max-w-xl">
            Simplify employee leave management with
            approvals, notifications, analytics and
            a modern dashboard.
          </p>
        </div>

        <div className="space-y-5">

          <AuthFeature
            delay={0.2}
            title="Apply Leave Online"
          />

          <AuthFeature
            delay={0.3}
            title="Manager Approval Workflow"
          />

          <AuthFeature
            delay={0.4}
            title="Instant Notifications"
          />

          <AuthFeature
            delay={0.5}
            title="Beautiful Analytics Dashboard"
          />

        </div>

        <p className="text-blue-200 text-sm">
          © 2026 LeaveMS • Built with React, Node.js & Prisma
        </p>

      </div>

      {/* RIGHT PANEL */}

      <div className="flex-1 flex items-center justify-center p-8">
        {children}
      </div>

    </div>
  );
}