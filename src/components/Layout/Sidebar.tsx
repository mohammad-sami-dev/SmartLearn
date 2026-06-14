import { NavLink } from "@/components/NavLink";
import {
  LayoutDashboard,
  BookOpen,
  GraduationCap,
  Calendar,
  MessageSquare,
  BarChart3,
  Settings,
  Bot,
  User,
  Video,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", to: "/dashboard", icon: LayoutDashboard },
  { name: "My Courses", to: "/dashboard/courses", icon: BookOpen },
  { name: "Live Classes", to: "/dashboard/live-classes", icon: Video },
  { name: "Catalog", to: "/dashboard/catalog", icon: GraduationCap },
  { name: "Calendar", to: "/dashboard/calendar", icon: Calendar },
  { name: "AI Tutor", to: "/dashboard/ai-tutor", icon: Bot },
  { name: "Messages", to: "/dashboard/messages", icon: MessageSquare },
  { name: "Analytics", to: "/dashboard/analytics", icon: BarChart3 },
  { name: "Profile", to: "/dashboard/profile", icon: User },
  { name: "Settings", to: "/dashboard/settings", icon: Settings },
];

export const Sidebar = () => {
  return (
    <aside className="hidden md:block w-64 shrink-0 border-r bg-card sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
      <nav className="flex flex-col gap-1 p-4">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.to}
            end={item.to === "/dashboard"}
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
