import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import NotificationsWidget from "@/components/Dashboard/NotificationsWidget";
import { TimetableWidget } from "@/components/Dashboard/TimetableWidget";
import { 
  BookOpen, 
  Users, 
  ClipboardCheck, 
  TrendingUp,
  Clock,
  AlertCircle,
  CheckCircle2,
  Calendar,
  Plus,
  FileText
} from "lucide-react";
import { Link } from "react-router-dom";
import { useThemeCustomization } from "@/contexts/ThemeCustomizationContext";
import { cn } from "@/lib/utils";

const TeacherDashboard = () => {
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
      cardGrid: "grid gap-3 sm:grid-cols-2",
      cardPadding: "p-3",
    },
    comfortable: {
      container: "space-y-6 sm:space-y-8",
      heading: "text-2xl sm:text-3xl",
      subheading: "text-xl sm:text-2xl",
      text: "text-sm sm:text-base",
      statsGrid: "grid gap-4 md:grid-cols-2 lg:grid-cols-4",
      mainGrid: "grid gap-6 lg:grid-cols-3",
      cardGrid: "grid gap-4 sm:grid-cols-2",
      cardPadding: "p-4",
    },
    spacious: {
      container: "space-y-8 sm:space-y-10",
      heading: "text-3xl sm:text-4xl",
      subheading: "text-2xl sm:text-3xl",
      text: "text-base sm:text-lg",
      statsGrid: "grid gap-6 md:grid-cols-2 lg:grid-cols-4",
      mainGrid: "grid gap-8 lg:grid-cols-3",
      cardGrid: "grid gap-6 sm:grid-cols-2",
      cardPadding: "p-6",
    },
  };

  const layout = layoutClasses[dashboardLayout];

  // Teacher's timetable
  const todayClasses = [
    {
      id: "1",
      subject: "Advanced Machine Learning - CS401",
      instructor: "You",
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
      subject: "Data Structures Lab - CS202",
      instructor: "You",
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
      subject: "Web Development - CS301",
      instructor: "You",
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
      subject: "Database Systems Tutorial - CS303",
      instructor: "You",
      time: "04:00 PM",
      duration: "1 hour",
      room: "D201",
      block: "A",
      type: "tutorial" as const,
      status: "upcoming" as const,
      color: "#f59e0b",
    },
  ];

  const stats = [
    {
      title: "Active Courses",
      value: "4",
      icon: BookOpen,
      trend: { value: 1, label: "new this semester" },
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Total Students",
      value: "156",
      icon: Users,
      trend: { value: 12, label: "enrolled this week" },
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
    {
      title: "Pending Grades",
      value: "23",
      icon: ClipboardCheck,
      trend: { value: 8, label: "due this week" },
      color: "text-warning",
      bgColor: "bg-warning/10",
    },
    {
      title: "Avg. Performance",
      value: "84%",
      icon: TrendingUp,
      trend: { value: 3, label: "improvement" },
      color: "text-success",
      bgColor: "bg-success/10",
    },
  ];

  const courses = [
    {
      id: "1",
      code: "CS301",
      title: "Advanced Machine Learning",
      students: 45,
      nextClass: "Today, 2:00 PM",
      pendingAssignments: 8,
      status: "active",
      color: "hsl(215, 85%, 45%)",
    },
    {
      id: "2",
      code: "CS201",
      title: "Data Structures & Algorithms",
      students: 52,
      nextClass: "Tomorrow, 10:00 AM",
      pendingAssignments: 12,
      status: "active",
      color: "hsl(175, 70%, 50%)",
    },
    {
      id: "3",
      code: "CS101",
      title: "Introduction to Programming",
      students: 38,
      nextClass: "Wed, 9:00 AM",
      pendingAssignments: 3,
      status: "active",
      color: "hsl(145, 65%, 50%)",
    },
    {
      id: "4",
      code: "CS401",
      title: "Senior Project",
      students: 21,
      nextClass: "Thu, 3:00 PM",
      pendingAssignments: 0,
      status: "active",
      color: "hsl(35, 90%, 55%)",
    },
  ];

  const recentActivity = [
    {
      type: "submission",
      student: "Aisha Rahman",
      course: "CS301",
      action: "submitted Assignment 4",
      time: "5 minutes ago",
      priority: "high",
    },
    {
      type: "question",
      student: "Omar Hassan",
      course: "CS201",
      action: "asked a question in Discussion",
      time: "23 minutes ago",
      priority: "medium",
    },
    {
      type: "late",
      student: "Fatima Ahmed",
      course: "CS101",
      action: "late submission for Quiz 3",
      time: "1 hour ago",
      priority: "high",
    },
    {
      type: "completion",
      student: "Ibrahim Khan",
      course: "CS401",
      action: "completed Module 5",
      time: "2 hours ago",
      priority: "low",
    },
  ];

  const upcomingTasks = [
    {
      title: "Grade ML Assignment 4",
      course: "CS301",
      dueDate: "Today, 5:00 PM",
      count: 8,
      priority: "high",
    },
    {
      title: "Prepare Midterm Exam",
      course: "CS201",
      dueDate: "Tomorrow",
      count: 1,
      priority: "high",
    },
    {
      title: "Review Project Proposals",
      course: "CS401",
      dueDate: "In 2 days",
      count: 21,
      priority: "medium",
    },
    {
      title: "Update Course Materials",
      course: "CS101",
      dueDate: "This week",
      count: 3,
      priority: "low",
    },
  ];

  const aiInsights = [
    {
      title: "At-Risk Students Identified",
      description: "3 students in CS301 showing declining performance. Early intervention recommended.",
      icon: AlertCircle,
      color: "text-warning",
      bgColor: "bg-warning/10",
      action: "View Details",
    },
    {
      title: "High Engagement Topic",
      description: "Neural Networks module has 95% completion rate. Consider expanding content.",
      icon: TrendingUp,
      color: "text-success",
      bgColor: "bg-success/10",
      action: "View Analytics",
    },
    {
      title: "Common Mistakes Detected",
      description: "15 students made similar errors in backpropagation. Suggest review session.",
      icon: FileText,
      color: "text-accent",
      bgColor: "bg-accent/10",
      action: "Generate Review",
    },
  ];

  return (
    <div className={cn(layout.container)}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className={cn(layout.heading, "font-bold tracking-tight")}>Teacher Dashboard</h1>
          <p className={cn(layout.text, "text-muted-foreground")}>Manage your courses and track student progress</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size={dashboardLayout === "compact" ? "sm" : "default"}>
            <Calendar className="mr-2 h-4 w-4" />
            Schedule
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className={cn(layout.statsGrid)}>
        {stats.map((stat) => (
          <Card key={stat.title} className="card-hover">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-3xl font-bold tracking-tight">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">
                    +{stat.trend.value} {stat.trend.label}
                  </p>
                </div>
                <div className={`rounded-lg p-3 ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content - Courses */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>My Courses</span>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/teacher/courses">View All</Link>
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {courses.map((course) => (
                <Card key={course.id} className="card-hover border">
                  <div className="h-2" style={{ backgroundColor: course.color }} />
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="secondary">{course.code}</Badge>
                          <h3 className="font-semibold">{course.title}</h3>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                          <span className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {course.students} students
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {course.nextClass}
                          </span>
                        </div>
                      </div>
                      {course.pendingAssignments > 0 && (
                        <Badge variant="destructive">
                          {course.pendingAssignments} to grade
                        </Badge>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1" asChild>
                        <Link to={`/teacher/course/${course.id}`}>Manage</Link>
                      </Button>
                      <Button size="sm" className="flex-1">Grade Assignments</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>

          {/* AI Insights */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-xl">🤖</span>
                AI Teaching Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {aiInsights.map((insight, index) => (
                <div
                  key={index}
                  className={`rounded-lg border p-4 ${insight.bgColor} border-opacity-20`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`rounded-lg p-2 ${insight.bgColor}`}>
                      <insight.icon className={`h-5 w-5 ${insight.color}`} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1">{insight.title}</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        {insight.description}
                      </p>
                      <Button variant="link" className="h-auto p-0 text-sm">
                        {insight.action} →
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className={cn(dashboardLayout === "compact" ? "space-y-4" : "space-y-6")}>
          {/* Timetable Widget */}
          <TimetableWidget classes={todayClasses} title="My Teaching Schedule" />
          
          <NotificationsWidget />
          
          {/* Upcoming Tasks */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Tasks</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingTasks.map((task, index) => (
                <div
                  key={index}
                  className="rounded-lg border border-border bg-card p-3 space-y-2"
                >
                  <div className="flex items-start justify-between">
                    <h4 className="font-medium text-sm">{task.title}</h4>
                    <Badge
                      variant={
                        task.priority === "high"
                          ? "destructive"
                          : task.priority === "medium"
                          ? "default"
                          : "secondary"
                      }
                      className="text-xs"
                    >
                      {task.priority}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{task.course}</p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {task.dueDate}
                    </span>
                    {task.count > 1 && (
                      <span className="font-medium">{task.count} items</span>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 pb-3 border-b last:border-0">
                  <div
                    className={`mt-1 flex h-8 w-8 items-center justify-center rounded-lg ${
                      activity.type === "submission"
                        ? "bg-success/10"
                        : activity.type === "question"
                        ? "bg-accent/10"
                        : activity.type === "late"
                        ? "bg-warning/10"
                        : "bg-primary/10"
                    }`}
                  >
                    {activity.type === "submission" && (
                      <CheckCircle2 className="h-4 w-4 text-success" />
                    )}
                    {activity.type === "question" && (
                      <FileText className="h-4 w-4 text-accent" />
                    )}
                    {activity.type === "late" && (
                      <AlertCircle className="h-4 w-4 text-warning" />
                    )}
                    {activity.type === "completion" && (
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                    )}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm">
                      <span className="font-medium">{activity.student}</span>{" "}
                      {activity.action}
                    </p>
                    <p className="text-xs text-muted-foreground">{activity.course}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Plus className="mr-2 h-4 w-4" />
                Create Assignment
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <FileText className="mr-2 h-4 w-4" />
                Create Quiz
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Users className="mr-2 h-4 w-4" />
                Message Students
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Class
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
