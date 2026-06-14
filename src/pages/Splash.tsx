import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GraduationCap } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Splash = () => {
  const navigate = useNavigate();
  const { user, profile, loading } = useAuth();

  useEffect(() => {
    // Check if user is already authenticated
    const checkAuth = async () => {
      // Wait for auth to initialize
      if (loading) return;

      // If user is authenticated, redirect to their dashboard
      if (user && profile) {
        setTimeout(() => {
          switch (profile.role) {
            case "admin":
              navigate("/admin");
              break;
            case "teacher":
              navigate("/teacher");
              break;
            default:
              navigate("/dashboard");
          }
        }, 1500);
      } else {
        // Not authenticated, show splash then go to login
        setTimeout(() => {
          navigate("/login");
        }, 2500);
      }
    };

    checkAuth();
  }, [navigate, user, profile, loading]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary via-primary-hover to-accent">
      <div className="text-center">
        <div className="animate-bounce-slow mb-8 flex justify-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-white shadow-2xl">
            <GraduationCap className="h-14 w-14 text-primary" />
          </div>
        </div>
        
        <h1 className="mb-4 animate-fade-in text-5xl font-bold text-white">
          SmartLearn
        </h1>
        
        <p className="animate-fade-in-delay text-xl text-white/90">
          AI-Powered Campus Learning System
        </p>
        
        <div className="mt-8 flex justify-center">
          <div className="flex space-x-2">
            <div className="h-3 w-3 animate-pulse rounded-full bg-white"></div>
            <div className="h-3 w-3 animate-pulse rounded-full bg-white delay-150"></div>
            <div className="h-3 w-3 animate-pulse rounded-full bg-white delay-300"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Splash;
