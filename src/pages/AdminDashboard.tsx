import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import NotificationsWidget from "@/components/Dashboard/NotificationsWidget";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Users,
  BookOpen,
  GraduationCap,
  TrendingUp,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3,
  Settings,
  Download,
  Filter,
} from "lucide-react";
import { useThemeCustomization } from "@/contexts/ThemeCustomizationContext";
import { cn } from "@/lib/utils";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const AdminDashboard = () => {
  const { dashboardLayout } = useThemeCustomization();

  // Layout-specific classes
  const layoutClasses = {
    compact: {
      container: "space-y-4",
      heading: "text-xl sm:text-2xl",
      subheading: "text-base sm:text-lg",
      text: "text-xs sm:text-sm",
      statsGrid: "grid gap-3 md:grid-cols-2 lg:grid-cols-4",
      cardPadding: "p-3",
    },
    comfortable: {
      container: "space-y-6 sm:space-y-8",
      heading: "text-2xl sm:text-3xl",
      subheading: "text-xl sm:text-2xl",
      text: "text-sm sm:text-base",
      statsGrid: "grid gap-4 md:grid-cols-2 lg:grid-cols-4",
      cardPadding: "p-4",
    },
    spacious: {
      container: "space-y-8 sm:space-y-10",
      heading: "text-3xl sm:text-4xl",
      subheading: "text-2xl sm:text-3xl",
      text: "text-base sm:text-lg",
      statsGrid: "grid gap-6 md:grid-cols-2 lg:grid-cols-4",
      cardPadding: "p-6",
    },
  };

  const layout = layoutClasses[dashboardLayout];

  const stats = [
    {
      title: "Total Users",
      value: "2,847",
      change: "+12.5%",
      trend: "up",
      icon: Users,
      color: "text-primary",
      bgColor: "bg-primary/10",
      details: "Students: 2,341 | Teachers: 486 | Staff: 20",
    },
    {
      title: "Active Courses",
      value: "124",
      change: "+8.3%",
      trend: "up",
      icon: BookOpen,
      color: "text-accent",
      bgColor: "bg-accent/10",
      details: "Ongoing: 98 | Completed: 26",
    },
    {
      title: "Enrollments",
      value: "8,492",
      change: "+15.2%",
      trend: "up",
      icon: GraduationCap,
      color: "text-success",
      bgColor: "bg-success/10",
      details: "This semester",
    },
    {
      title: "System Health",
      value: "98.5%",
      change: "-0.2%",
      trend: "down",
      icon: Activity,
      color: "text-warning",
      bgColor: "bg-warning/10",
      details: "Uptime this month",
    },
  ];

  const enrollmentData = [
    { month: "Jan", students: 2100, courses: 98 },
    { month: "Feb", students: 2250, courses: 102 },
    { month: "Mar", students: 2350, courses: 108 },
    { month: "Apr", students: 2400, courses: 112 },
    { month: "May", students: 2500, courses: 118 },
    { month: "Jun", students: 2650, courses: 124 },
  ];

  const departmentData = [
    { name: "Computer Science", value: 856, color: "hsl(215, 85%, 45%)" },
    { name: "Engineering", value: 654, color: "hsl(175, 70%, 50%)" },
    { name: "Business", value: 478, color: "hsl(145, 65%, 50%)" },
    { name: "Arts & Sciences", value: 353, color: "hsl(35, 90%, 55%)" },
    { name: "Other", value: 506, color: "hsl(270, 60%, 60%)" },
  ];

  const performanceData = [
    { category: "Course Completion", value: 87 },
    { category: "Student Satisfaction", value: 92 },
    { category: "Teacher Engagement", value: 89 },
    { category: "System Performance", value: 95 },
  ];

  const recentActivities = [
    {
      type: "user",
      title: "New Teacher Registration",
      description: "Dr. Sarah Mitchell joined Computer Science department",
      time: "5 minutes ago",
      priority: "high",
    },
    {
      type: "course",
      title: "Course Published",
      description: "Advanced Database Systems (CS402) is now live",
      time: "23 minutes ago",
      priority: "medium",
    },
    {
      type: "alert",
      title: "System Alert",
      description: "High server load detected - Auto-scaled to 4 instances",
      time: "1 hour ago",
      priority: "high",
    },
    {
      type: "completion",
      title: "Semester Milestone",
      description: "85% of courses completed mid-term assessments",
      time: "2 hours ago",
      priority: "low",
    },
    {
      type: "user",
      title: "Bulk Enrollment",
      description: "156 students enrolled in Fall 2024 courses",
      time: "3 hours ago",
      priority: "medium",
    },
  ];

  const systemAlerts = [
    {
      title: "Database Backup Pending",
      description: "Weekly backup scheduled for tonight at 2:00 AM",
      severity: "info",
      time: "Today",
    },
    {
      title: "License Renewal Due",
      description: "Zoom Education license expires in 15 days",
      severity: "warning",
      time: "In 15 days",
    },
    {
      title: "Storage Usage High",
      description: "85% of allocated storage used. Consider upgrading.",
      severity: "warning",
      time: "Today",
    },
  ];

  const topCourses = [
    {
      name: "Introduction to Machine Learning",
      code: "CS301",
      students: 156,
      rating: 4.8,
      completion: 89,
    },
    {
      name: "Data Structures & Algorithms",
      code: "CS201",
      students: 142,
      rating: 4.7,
      completion: 92,
    },
    {
      name: "Web Development",
      code: "CS250",
      students: 134,
      rating: 4.9,
      completion: 87,
    },
    {
      name: "Database Systems",
      code: "CS305",
      students: 128,
      rating: 4.6,
      completion: 85,
    },
  ];

  const departmentPerformance = [
    { name: "Computer Science", courses: 32, students: 856, satisfaction: 4.7 },
    { name: "Engineering", courses: 28, students: 654, satisfaction: 4.5 },
    { name: "Business", courses: 24, students: 478, satisfaction: 4.6 },
    { name: "Arts & Sciences", courses: 20, students: 353, satisfaction: 4.8 },
  ];

  return (
    <div className={cn(layout.container)}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className={cn(layout.heading, "font-bold tracking-tight")}>Admin Dashboard</h1>
          <p className={cn(layout.text, "text-muted-foreground")}>
            System overview and analytics
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size={dashboardLayout === "compact" ? "sm" : "default"}>
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" size={dashboardLayout === "compact" ? "sm" : "default"}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button size={dashboardLayout === "compact" ? "sm" : "default"}>
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </div>
      </div>

      {/* Key Stats */}
      <div className={cn(layout.statsGrid)}>
        {stats.map((stat) => (
          <Card key={stat.title} className="card-hover">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className={`rounded-lg p-3 ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <Badge
                  variant={stat.trend === "up" ? "default" : "secondary"}
                  className="text-xs"
                >
                  {stat.change}
                </Badge>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </p>
                <p className="text-3xl font-bold tracking-tight">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.details}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="departments">Departments</TabsTrigger>
          <TabsTrigger value="system">System Health</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Charts */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Enrollment Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={enrollmentData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="students"
                        stroke="hsl(215, 85%, 45%)"
                        strokeWidth={2}
                      />
                      <Line
                        type="monotone"
                        dataKey="courses"
                        stroke="hsl(175, 70%, 50%)"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Department Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={departmentData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) =>
                          `${name}: ${(percent * 100).toFixed(0)}%`
                        }
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {departmentData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <NotificationsWidget />
              
              {/* System Alerts */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-warning" />
                    System Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {systemAlerts.map((alert, index) => (
                    <div
                      key={index}
                      className={`rounded-lg border p-3 ${
                        alert.severity === "warning"
                          ? "border-warning/50 bg-warning/5"
                          : "border-border bg-card"
                      }`}
                    >
                      <h4 className="font-medium text-sm mb-1">{alert.title}</h4>
                      <p className="text-xs text-muted-foreground mb-2">
                        {alert.description}
                      </p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {alert.time}
                      </p>
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
                  {recentActivities.slice(0, 5).map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 pb-3 border-b last:border-0"
                    >
                      <div
                        className={`mt-1 flex h-8 w-8 items-center justify-center rounded-lg ${
                          activity.type === "user"
                            ? "bg-primary/10"
                            : activity.type === "course"
                            ? "bg-success/10"
                            : activity.type === "alert"
                            ? "bg-warning/10"
                            : "bg-accent/10"
                        }`}
                      >
                        {activity.type === "user" && (
                          <Users className="h-4 w-4 text-primary" />
                        )}
                        {activity.type === "course" && (
                          <BookOpen className="h-4 w-4 text-success" />
                        )}
                        {activity.type === "alert" && (
                          <AlertTriangle className="h-4 w-4 text-warning" />
                        )}
                        {activity.type === "completion" && (
                          <CheckCircle className="h-4 w-4 text-accent" />
                        )}
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium">{activity.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {activity.description}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" angle={-45} textAnchor="end" height={100} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="hsl(215, 85%, 45%)" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Performing Courses</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {topCourses.map((course, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">{course.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {course.code} · {course.students} students
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">★ {course.rating}</p>
                      </div>
                    </div>
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{
                          width: `${course.completion}%`,
                          backgroundColor: "hsl(215, 85%, 45%)",
                        }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {course.completion}% completion rate
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Departments Tab */}
        <TabsContent value="departments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Department Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {departmentPerformance.map((dept, index) => (
                  <Card key={index} className="border">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold">{dept.name}</h3>
                        <Badge variant="secondary">★ {dept.satisfaction}</Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Courses</p>
                          <p className="text-2xl font-bold">{dept.courses}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Students</p>
                          <p className="text-2xl font-bold">{dept.students}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Avg/Course</p>
                          <p className="text-2xl font-bold">
                            {Math.round(dept.students / dept.courses)}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* System Health Tab */}
        <TabsContent value="system" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>System Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">API Server</span>
                  <Badge variant="default" className="bg-success">
                    <CheckCircle className="mr-1 h-3 w-3" />
                    Operational
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Database</span>
                  <Badge variant="default" className="bg-success">
                    <CheckCircle className="mr-1 h-3 w-3" />
                    Operational
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">File Storage</span>
                  <Badge variant="default" className="bg-warning">
                    <AlertTriangle className="mr-1 h-3 w-3" />
                    High Usage
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Email Service</span>
                  <Badge variant="default" className="bg-success">
                    <CheckCircle className="mr-1 h-3 w-3" />
                    Operational
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Resource Usage</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>CPU Usage</span>
                    <span className="font-medium">42%</span>
                  </div>
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{
                        width: "42%",
                        backgroundColor: "hsl(145, 65%, 50%)",
                      }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Memory Usage</span>
                    <span className="font-medium">68%</span>
                  </div>
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{
                        width: "68%",
                        backgroundColor: "hsl(215, 85%, 45%)",
                      }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Storage Usage</span>
                    <span className="font-medium">85%</span>
                  </div>
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{
                        width: "85%",
                        backgroundColor: "hsl(35, 90%, 55%)",
                      }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Bandwidth</span>
                    <span className="font-medium">54%</span>
                  </div>
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{
                        width: "54%",
                        backgroundColor: "hsl(175, 70%, 50%)",
                      }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
