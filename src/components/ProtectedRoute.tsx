import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

type UserRole = "student" | "teacher" | "admin";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

export const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { user, profile, loading } = useAuth();

  if (loading || (user && !profile)) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (user && profile) {
    if (allowedRoles && !allowedRoles.includes(profile.role)) {
      switch (profile.role) {
        case "admin":
          return <Navigate to="/admin" replace />;
        case "teacher":
          return <Navigate to="/teacher" replace />;
        default:
          return <Navigate to="/dashboard" replace />;
      }
    }
    return <>{children}</>;
  }

  // Demo mode - works in all environments
  const demoRole = localStorage.getItem('demoRole') as UserRole | null;
  if (demoRole) {
    if (allowedRoles && !allowedRoles.includes(demoRole)) {
      switch (demoRole) {
        case "admin":
          return <Navigate to="/admin" replace />;
        case "teacher":
          return <Navigate to="/teacher" replace />;
        default:
          return <Navigate to="/dashboard" replace />;
      }
    }
    return <>{children}</>;
  }

  return <Navigate to="/login" replace />;
};
