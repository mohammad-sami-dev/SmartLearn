import { NavLink } from "@/components/NavLink";
import {
  LayoutDashboard,
  BookOpen,
  Calendar,
  MessageSquare,
  BarChart3,
  Settings,
  User,
  PlusCircle,
  ClipboardList,
  FileText,
  Users,
  Bell,
  ClipboardCheck,
  Video,
} from "lucide-react";

const navigation = [
  { name: "Dashboard", to: "/teacher", icon: LayoutDashboard },
  { name: "My Courses", to: "/teacher/courses", icon: BookOpen },
  { name: "Live Classes", to: "/teacher/live-classes", icon: Video },
  { name: "Create Assignment", to: "/teacher/assignment-creator", icon: FileText },
  { name: "Create Quiz", to: "/teacher/quiz-builder", icon: ClipboardList },
  { name: "Students", to: "/teacher/students", icon: Users },
  { name: "Announcements", to: "/teacher/announcements", icon: Bell },
  { name: "Attendance", to: "/teacher/attendance", icon: ClipboardCheck },
  { name: "Calendar", to: "/teacher/calendar", icon: Calendar },
  { name: "Messages", to: "/teacher/messages", icon: MessageSquare },
  { name: "Analytics", to: "/teacher/analytics", icon: BarChart3 },
  { name: "Profile", to: "/teacher/profile", icon: User },
  { name: "Settings", to: "/teacher/settings", icon: Settings },
];

export const TeacherSidebar = () => {
  return (
    <aside className="hidden md:block w-64 border-r bg-card">
      <nav className="flex flex-col gap-1 p-4">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.to}
            end={item.to === "/teacher"}
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
