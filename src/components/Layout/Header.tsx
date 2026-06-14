import { Search, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import RoleSwitcher from "@/components/RoleSwitcher";
import NotificationCenter from "@/components/NotificationCenter";

import { useBasePath } from "@/lib/navigation";

export const Header = () => {
  const navigate = useNavigate();
  const { profile, signOut } = useAuth();
  const basePath = useBasePath();

  const handleLogout = async () => {
    try {
      // Clear demo role used for fallback auth
      localStorage.removeItem("demoRole");
      await signOut();
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="flex h-16 items-center justify-between gap-4 px-4 md:px-6 w-full">
        {/* Left: Logo & Brand - Always at corner */}
        <div className="flex items-center gap-2 shrink-0">
          <img 
            src="/logo.svg" 
            alt="SmartLearn" 
            className="h-9 w-9 rounded-lg cursor-pointer"
            onClick={() => navigate(basePath)}
          />
          <span 
            className="hidden text-xl font-bold sm:inline-block cursor-pointer hover:text-primary transition-colors"
            onClick={() => navigate(basePath)}
          >
            SmartLearn
          </span>
        </div>

        {/* Center: Search Bar */}
        <div className="flex-1 max-w-2xl mx-auto hidden md:block">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search courses, assignments, lessons..."
              className="pl-9 w-full cursor-pointer"
              onClick={() => navigate(basePath === "/dashboard" ? `${basePath}/search` : basePath)}
              readOnly
            />
          </div>
        </div>

        {/* Right: Actions & Profile - Always at corner */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Mobile Search Icon */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={() => navigate(basePath === "/dashboard" ? `${basePath}/search` : basePath)}
          >
            <Search className="h-5 w-5" />
          </Button>

          {/* Role Switcher */}
          <div className="hidden md:block">
            <RoleSwitcher />
          </div>

          {/* Notification Center */}
          <NotificationCenter />

          {/* User Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col">
                  <span className="font-semibold">{profile?.full_name || "User"}</span>
                  <span className="text-xs text-muted-foreground">
                    {profile?.role ? profile.role.charAt(0).toUpperCase() + profile.role.slice(1) : "Student"}
                  </span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="md:hidden px-2 py-1.5">
                <RoleSwitcher />
              </div>
              <DropdownMenuSeparator className="md:hidden" />
              <DropdownMenuItem onClick={() => navigate(`${basePath}/profile`)}>Profile</DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate(`${basePath}/settings`)}>Settings</DropdownMenuItem>
              <DropdownMenuItem>Help & Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};
