import { StatCard } from "@/components/Dashboard/StatCard";
import { CourseCard } from "@/components/Dashboard/CourseCard";
import { UpcomingTask } from "@/components/Dashboard/UpcomingTask";
import NotificationsWidget from "@/components/Dashboard/NotificationsWidget";
import { TimetableWidget } from "@/components/Dashboard/TimetableWidget";
import { BookOpen, Clock, TrendingUp, Award } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useThemeCustomization } from "@/contexts/ThemeCustomizationContext";
import { cn } from "@/lib/utils";

const Dashboard = () => {
  const { dashboardLayout } = useThemeCustomization();

  // Layout-specific classes
  const layoutClasses = {
    compact: {
      container: "space-y-4",
      heading: "text-xl sm:text-2xl",
      subheading: "text-base sm:text-lg",
      text: "text-xs sm:text-sm",
      statsGrid: "grid gap-3 md:grid-cols-2 lg:grid-cols-4",
      mainGrid: "grid gap-4 lg:grid-cols-3",
      coursesGrid: "grid gap-3 sm:grid-cols-2",
      cardPadding: "p-3",
    },
    comfortable: {
      container: "space-y-6 sm:space-y-8",
      heading: "text-2xl sm:text-3xl",
      subheading: "text-xl sm:text-2xl",
      text: "text-sm sm:text-base",
      statsGrid: "grid gap-4 md:grid-cols-2 lg:grid-cols-4",
      mainGrid: "grid gap-6 lg:grid-cols-3",
      coursesGrid: "grid gap-4 sm:grid-cols-2",
      cardPadding: "p-4",
    },
    spacious: {
      container: "space-y-8 sm:space-y-10",
      heading: "text-3xl sm:text-4xl",
      subheading: "text-2xl sm:text-3xl",
      text: "text-base sm:text-lg",
      statsGrid: "grid gap-6 md:grid-cols-2 lg:grid-cols-4",
      mainGrid: "grid gap-8 lg:grid-cols-3",
      coursesGrid: "grid gap-6 sm:grid-cols-2",
      cardPadding: "p-6",
    },
  };

  const layout = layoutClasses[dashboardLayout];

  // Today's timetable
  const todayClasses = [
    {
      id: "1",
      subject: "Advanced Machine Learning",
      instructor: "Dr. Fatima Ahmad",
      time: "09:00 AM",
      duration: "2 hours",
      room: "F201",
      block: "A",
      type: "lecture" as const,
      status: "completed" as const,
      color: "#3b82f6",
    },
    {
      id: "2",
      subject: "Data Structures Lab",
      instructor: "Prof. Ahmed Hassan",
      time: "11:30 AM",
      duration: "1.5 hours",
      room: "C105",
      block: "B",
      type: "lab" as const,
      status: "ongoing" as const,
      color: "#8b5cf6",
    },
    {
      id: "3",
      subject: "Web Development",
      instructor: "Dr. Aisha Rahman",
      time: "02:00 PM",
      duration: "1 hour",
      room: "A302",
      block: "C",
      type: "lecture" as const,
      status: "upcoming" as const,
      color: "#10b981",
    },
    {
      id: "4",
      subject: "Database Systems Tutorial",
      instructor: "Prof. Omar Ibrahim",
      time: "04:00 PM",
      duration: "1 hour",
      room: "D201",
      block: "A",
      type: "tutorial" as const,
      status: "upcoming" as const,
      color: "#f59e0b",
    },
  ];

  const courses = [
    {
      id: "1",
      title: "Advanced Machine Learning",
      instructor: "Dr. Sarah Johnson",
      progress: 67,
      nextClass: "Today, 2:00 PM",
      enrolled: 234,
      color: "hsl(215, 85%, 45%)",
    },
    {
      id: "2",
      title: "Data Structures & Algorithms",
      instructor: "Prof. Michael Chen",
      progress: 82,
      nextClass: "Tomorrow, 10:00 AM",
      enrolled: 312,
      color: "hsl(175, 70%, 50%)",
    },
    {
      id: "3",
      title: "Web Development Fundamentals",
      instructor: "Dr. Emily Rodriguez",
      progress: 45,
      enrolled: 289,
      color: "hsl(145, 65%, 50%)",
    },
  ];

  const upcomingTasks = [
    {
      title: "ML Assignment #4: Neural Networks",
      course: "Advanced Machine Learning",
      dueDate: "Due in 2 days",
      type: "assignment" as const,
      priority: "high" as const,
    },
    {
      title: "Midterm Exam",
      course: "Data Structures & Algorithms",
      dueDate: "Due in 5 days",
      type: "exam" as const,
      priority: "high" as const,
    },
    {
      title: "Weekly Quiz #3",
      course: "Web Development Fundamentals",
      dueDate: "Due tomorrow",
      type: "quiz" as const,
      priority: "medium" as const,
    },
  ];

  return (
    <div className={cn(layout.container)}>
      <div>
        <h1 className={cn(layout.heading, "font-bold tracking-tight")}>Welcome back, Ahmed! 👋</h1>
        <p className={cn(layout.text, "text-muted-foreground")}>Here's what's happening with your courses today.</p>
      </div>

      <div className={cn(layout.statsGrid)}>
        <StatCard
          title="Active Courses"
          value={3}
          icon={BookOpen}
          trend={{ value: 12, isPositive: true }}
          color="primary"
        />
        <StatCard
          title="Hours Learned"
          value="24.5"
          icon={Clock}
          trend={{ value: 8, isPositive: true }}
          color="accent"
        />
        <StatCard
          title="Assignments Due"
          value={5}
          icon={TrendingUp}
          color="warning"
        />
        <StatCard
          title="Avg. Grade"
          value="92%"
          icon={Award}
          trend={{ value: 4, isPositive: true }}
          color="success"
        />
      </div>

      <div className={cn(layout.mainGrid)}>
        <div className={cn("lg:col-span-2", dashboardLayout === "compact" ? "space-y-4" : "space-y-6")}>
          <div>
            <h2 className={cn("mb-4", layout.subheading, "font-semibold")}>My Courses</h2>
            <div className={cn(layout.coursesGrid)}>
              {courses.map((course) => (
                <CourseCard key={course.id} {...course} />
              ))}
            </div>
          </div>

          <Card>
            <CardHeader className={cn(dashboardLayout === "compact" && "pb-3")}>
              <CardTitle className={cn(dashboardLayout === "compact" ? "text-base" : "text-lg")}>AI Recommendations</CardTitle>
            </CardHeader>
            <CardContent className={cn(dashboardLayout === "compact" ? "space-y-2" : "space-y-3")}>
              <div className={cn("rounded-lg border border-accent/20 bg-accent/5", layout.cardPadding)}>
                <p className="text-sm font-medium">📚 Focus Area: Neural Networks</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Based on your recent quiz results, spend more time reviewing backpropagation concepts.
                </p>
              </div>
              <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
                <p className="text-sm font-medium">⏰ Study Schedule</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Recommended: 2 hours of study time for your upcoming DSA exam.
                </p>
              </div>
              <div className="rounded-lg border border-success/20 bg-success/5 p-4">
                <p className="text-sm font-medium">🎯 Great Progress!</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  You're 15% ahead of schedule in Web Development. Keep it up!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className={cn(dashboardLayout === "compact" ? "space-y-4" : "space-y-6")}>
          {/* Timetable Widget */}
          <TimetableWidget classes={todayClasses} />

          <NotificationsWidget />
          
          <div>
            <h2 className={cn("mb-4", layout.subheading, "font-semibold")}>Upcoming Tasks</h2>
            <div className={cn(dashboardLayout === "compact" ? "space-y-2" : "space-y-3")}>
              {upcomingTasks.map((task, index) => (
                <UpcomingTask key={index} {...task} />
              ))}
            </div>
          </div>

          <Card>
            <CardHeader className={cn(dashboardLayout === "compact" && "pb-3")}>
              <CardTitle className={cn(dashboardLayout === "compact" ? "text-base" : "text-lg")}>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className={cn(dashboardLayout === "compact" ? "space-y-1.5" : "space-y-2")}>
              <button className="w-full rounded-lg border border-border bg-card p-3 text-left text-sm font-medium transition-colors hover:bg-accent">
                📝 Start Assignment
              </button>
              <button className="w-full rounded-lg border border-border bg-card p-3 text-left text-sm font-medium transition-colors hover:bg-accent">
                💬 Ask AI Tutor
              </button>
              <button className="w-full rounded-lg border border-border bg-card p-3 text-left text-sm font-medium transition-colors hover:bg-accent">
                📊 View Analytics
              </button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
