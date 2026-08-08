import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function ProtectedRoute({
  children,
  allowedRoles = [],
}) {
  const { user, authLoading } = useAuth();

  // Wait until AuthContext restores user from localStorage
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>

          <p className="text-gray-500 font-medium">
            Loading...
          </p>
        </div>
      </div>
    );
  }

  // Authentication finished loading but no user
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // User exists but doesn't have permission
  if (
    allowedRoles.length > 0 &&
    !allowedRoles.includes(user.role)
  ) {
    return <Navigate to="/" replace />;
  }

  return children;
}