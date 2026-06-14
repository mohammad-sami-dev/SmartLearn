import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, BookOpen, Shield, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

const RoleSwitcher = () => {
  const { profile } = useAuth();
  const navigate = useNavigate();

  if (!profile) return null;

  const roleConfig = {
    student: {
      icon: User,
      label: "Student",
      color: "bg-primary text-primary-foreground",
      path: "/dashboard",
    },
    teacher: {
      icon: BookOpen,
      label: "Teacher",
      color: "bg-accent text-accent-foreground",
      path: "/teacher",
    },
    admin: {
      icon: Shield,
      label: "Admin",
      color: "bg-warning text-warning-foreground",
      path: "/admin",
    },
  };

  const currentRole = roleConfig[profile.role];
  const Icon = currentRole.icon;

  // In a real app, you'd fetch user's available roles from the database
  // For demo purposes, we're showing all roles
  const availableRoles = ["student", "teacher", "admin"] as const;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2">
          <div className={`flex h-6 w-6 items-center justify-center rounded ${currentRole.color}`}>
            <Icon className="h-4 w-4" />
          </div>
          <span className="font-medium">{currentRole.label}</span>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Switch Role</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {availableRoles.map((role) => {
          const config = roleConfig[role];
          const RoleIcon = config.icon;
          const isActive = role === profile.role;

          return (
            <DropdownMenuItem
              key={role}
              onClick={() => navigate(config.path)}
              className="cursor-pointer"
            >
              <div className="flex items-center gap-3 flex-1">
                <div className={`flex h-8 w-8 items-center justify-center rounded ${config.color}`}>
                  <RoleIcon className="h-4 w-4" />
                </div>
                <span className="font-medium">{config.label}</span>
              </div>
              {isActive && (
                <Badge variant="secondary" className="ml-auto text-xs">
                  Active
                </Badge>
              )}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default RoleSwitcher;
