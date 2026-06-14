import { NavLink } from "@/components/NavLink";
import {
  LayoutDashboard,
  Users,
  DollarSign,
  MessageSquare,
  Settings,
  User,
  ShieldAlert,
  GraduationCap,
  FileText,
  PlusCircle,
  Bell,
  Calendar,
} from "lucide-react";

const navigation = [
  { name: "Dashboard", to: "/admin", icon: LayoutDashboard },
  { name: "User Management", to: "/admin/users", icon: Users },
  { name: "Create Course", to: "/admin/course-builder", icon: PlusCircle },
  { name: "All Courses", to: "/admin/all-courses", icon: GraduationCap },
  { name: "Timetable", to: "/admin/timetable", icon: Calendar },
  { name: "Notifications", to: "/admin/notifications", icon: Bell },
  { name: "Financial", to: "/admin/financial", icon: DollarSign },
  { name: "Disciplinary", to: "/admin/disciplinary", icon: ShieldAlert },
  { name: "Reports", to: "/admin/reports", icon: FileText },
  { name: "Messages", to: "/admin/messages", icon: MessageSquare },
  { name: "Profile", to: "/admin/profile", icon: User },
  { name: "Settings", to: "/admin/settings", icon: Settings },
];

export const AdminSidebar = () => {
  return (
    <aside className="hidden md:block w-64 shrink-0 border-r bg-card sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
      <nav className="flex flex-col gap-1 p-4">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.to}
            end={item.to === "/admin"}
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            activeClassName="bg-accent text-accent-foreground"
          >
            <item.icon className="h-5 w-5" />
            {item.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};
