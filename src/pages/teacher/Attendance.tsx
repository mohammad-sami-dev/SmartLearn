import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  CheckCircle,
  XCircle,
  Clock,
  FileText,
  Download,
  CalendarIcon,
  Users,
  TrendingDown,
  AlertTriangle,
  BookOpen,
  RefreshCw,
  Save,
  Filter,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

interface Student {
  id: string;
  sapId: string;
  name: string;
  email: string;
  attendance: "present" | "absent" | "late" | "excused" | null;
  attendanceRate: number;
}

interface AttendanceRecord {
  id: string;
  date: string;
  course: string;
  hour: string;
  present: number;
  absent: number;
  late: number;
  excused: number;
  total: number;
}

interface Course {
  id: string;
  name: string;
  code: string;
  students: number;
}

interface CourseSession {
  courseId: string;
  totalHours: number;
  schedule: string;
}

const Attendance = () => {
  const { toast } = useToast();
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const [selectedHour, setSelectedHour] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [attendanceCompleted, setAttendanceCompleted] = useState(false);
  const [showExportDialog, setShowExportDialog] = useState(false);
  
  // History filters
  const [historyDateFilter, setHistoryDateFilter] = useState<Date | undefined>();
  const [historyCourseFilter, setHistoryCourseFilter] = useState<string>("all-courses");
  const [historyHourFilter, setHistoryHourFilter] = useState<string>("all-hours");
  
  // Reports filters
  const [reportsCourseFilter, setReportsCourseFilter] = useState<string>("all-courses-reports");
  const [reportsDateRange, setReportsDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined,
  });

  const [students, setStudents] = useState<Student[]>([
    {
      id: "1",
      sapId: "SAP001",
      name: "John Doe",
      email: "john.doe@university.edu",
      attendance: null,
      attendanceRate: 95,
    },
    {
      id: "2",
      sapId: "SAP002",
      name: "Jane Smith",
      email: "jane.smith@university.edu",
      attendance: null,
      attendanceRate: 88,
    },
    {
      id: "3",
      sapId: "SAP003",
      name: "Alice Johnson",
      email: "alice.j@university.edu",
      attendance: null,
      attendanceRate: 72,
    },
    {
      id: "4",
      sapId: "SAP004",
      name: "Bob Wilson",
      email: "bob.w@university.edu",
      attendance: null,
      attendanceRate: 98,
    },
    {
      id: "5",
      sapId: "SAP005",
      name: "Emma Davis",
      email: "emma.d@university.edu",
      attendance: null,
      attendanceRate: 65,
    },
    {
      id: "6",
      sapId: "SAP006",
      name: "Michael Brown",
      email: "michael.b@university.edu",
      attendance: null,
      attendanceRate: 91,
    },
    {
      id: "7",
      sapId: "SAP007",
      name: "Sarah Wilson",
      email: "sarah.w@university.edu",
      attendance: null,
      attendanceRate: 82,
    },
    {
      id: "8",
      sapId: "SAP008",
      name: "David Martinez",
      email: "david.m@university.edu",
      attendance: null,
      attendanceRate: 78,
    },
  ]);

  // Mock data
  const courses: Course[] = [
    { id: "1", name: "Advanced Machine Learning", code: "CS501", students: 45 },
    { id: "2", name: "Data Structures & Algorithms", code: "CS301", students: 50 },
    { id: "3", name: "Web Development Fundamentals", code: "CS201", students: 38 },
    { id: "4", name: "Database Management Systems", code: "CS401", students: 45 },
    { id: "5", name: "Computer Networks", code: "CS302", students: 55 },
  ];

  // Course sessions with hours information
  const courseSessions: CourseSession[] = [
    { courseId: "1", totalHours: 3, schedule: "Mon, Wed, Fri 9:00 AM - 12:00 PM" },
    { courseId: "2", totalHours: 2, schedule: "Tue, Thu 10:00 AM - 12:00 PM" },
    { courseId: "3", totalHours: 3, schedule: "Mon, Wed 2:00 PM - 5:00 PM" },
    { courseId: "4", totalHours: 2, schedule: "Tue, Thu 1:00 PM - 3:00 PM" },
    { courseId: "5", totalHours: 1, schedule: "Fri 3:00 PM - 4:00 PM" },
  ];

  const selectedCourseSession = courseSessions.find(s => s.courseId === selectedCourse);
  const availableHours = selectedCourseSession ? Array.from({ length: selectedCourseSession.totalHours }, (_, i) => i + 1) : [];

  const attendanceHistory: AttendanceRecord[] = [
    {
      id: "1",
      date: "2024-01-15",
      course: "Advanced Machine Learning",
      hour: "Hour 1",
      present: 42,
      absent: 2,
      late: 1,
      excused: 0,
      total: 45,
    },
    {
      id: "2",
      date: "2024-01-15",
      course: "Advanced Machine Learning",
      hour: "Hour 2",
      present: 43,
      absent: 1,
      late: 1,
      excused: 0,
      total: 45,
    },
    {
      id: "3",
      date: "2024-01-14",
      course: "Data Structures & Algorithms",
      hour: "Hour 1",
      present: 47,
      absent: 2,
      late: 1,
      excused: 0,
      total: 50,
    },
    {
      id: "4",
      date: "2024-01-14",
      course: "Data Structures & Algorithms",
      hour: "Hour 2",
      present: 48,
      absent: 1,
      late: 1,
      excused: 0,
      total: 50,
    },
    {
      id: "5",
      date: "2024-01-13",
      course: "Web Development Fundamentals",
      hour: "Hour 1",
      present: 36,
      absent: 1,
      late: 1,
      excused: 0,
      total: 38,
    },
  ];

  // Reset students attendance when course/hour changes
  useEffect(() => {
    if (selectedCourse && selectedHour) {
      setStudents((prev) =>
        prev.map((student) => ({ ...student, attendance: null }))
      );
      setAttendanceCompleted(false);
    }
  }, [selectedCourse, selectedHour]);

  // Filter students based on search
  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.sapId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const markAttendance = (studentId: string, status: "present" | "absent" | "late" | "excused") => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === studentId ? { ...student, attendance: status } : student
      )
    );
  };

  const markAllPresent = () => {
    setStudents((prev) =>
      prev.map((student) => ({ ...student, attendance: "present" }))
    );
    toast({
      title: "Marked All Present",
      description: "All students have been marked as present.",
    });
  };

  const saveAttendance = async () => {
    if (!selectedCourse || !selectedHour) {
      toast({
        title: "Selection Required",
        description: "Please select a course and hour before saving attendance.",
        variant: "destructive",
      });
      return;
    }

    const unmarked = students.filter((s) => s.attendance === null);
    if (unmarked.length > 0) {
      toast({
        title: "Incomplete Attendance",
        description: `${unmarked.length} students haven't been marked yet.`,
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setAttendanceCompleted(true);
      const courseData = courses.find(c => c.id === selectedCourse);
      toast({
        title: "Attendance Saved Successfully",
        description: `Attendance for ${courseData?.name} - Hour ${selectedHour} on ${selectedDate.toLocaleDateString()} has been saved.`,
      });
    }, 1000);
  };

  const generateReport = () => {
    if (!attendanceCompleted) {
      toast({
        title: "Cannot Generate Report",
        description: "Please save attendance before generating a report.",
        variant: "destructive",
      });
      return;
    }

    setIsGeneratingReport(true);
    // Simulate report generation
    setTimeout(() => {
      setIsGeneratingReport(false);
      const courseData = courses.find(c => c.id === selectedCourse);
      toast({
        title: "Report Generated Successfully",
        description: `Attendance report for ${courseData?.name} - Hour ${selectedHour} has been generated and is ready for download.`,
      });
      // TODO: Trigger actual report download
    }, 2000);
  };

  const resetAttendance = () => {
    setStudents((prev) =>
      prev.map((student) => ({ ...student, attendance: null }))
    );
    setAttendanceCompleted(false);
    toast({
      title: "Attendance Reset",
      description: "All attendance marks have been cleared.",
    });
  };

  const handleExport = (format: string) => {
    const courseData = courses.find(c => c.id === selectedCourse);
    toast({
      title: "Exporting Data",
      description: `Preparing ${format.toUpperCase()} file for download...`,
    });
    
    // Simulate file download
    setTimeout(() => {
      setShowExportDialog(false);
      toast({
        title: "Export Complete",
        description: `${courseData?.name} - Hour ${selectedHour} attendance exported as ${format.toUpperCase()}.`,
      });
      // TODO: Trigger actual file download
    }, 1500);
  };

  const getAttendanceBadge = (status: string | null) => {
    switch (status) {
      case "present":
        return <Badge className="bg-success">Present</Badge>;
      case "absent":
        return <Badge variant="destructive">Absent</Badge>;
      case "late":
        return <Badge className="bg-warning text-white">Late</Badge>;
      case "excused":
        return <Badge variant="secondary">Excused</Badge>;
      default:
        return <Badge variant="outline">Not Marked</Badge>;
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const presentCount = filteredStudents.filter((s) => s.attendance === "present").length;
  const absentCount = filteredStudents.filter((s) => s.attendance === "absent").length;
  const lateCount = filteredStudents.filter((s) => s.attendance === "late").length;
  const excusedCount = filteredStudents.filter((s) => s.attendance === "excused").length;
  const unmarkedCount = filteredStudents.filter((s) => s.attendance === null).length;

  const atRiskStudents = students.filter((s) => s.attendanceRate < 75);

  const selectedCourseData = courses.find(c => c.id === selectedCourse);

  // Filter history records
  const filteredHistory = attendanceHistory.filter((record) => {
    if (historyCourseFilter && historyCourseFilter !== "all-courses" && record.course !== historyCourseFilter) return false;
    if (historyHourFilter && historyHourFilter !== "all-hours" && record.hour !== historyHourFilter) return false;
    if (historyDateFilter && new Date(record.date).toDateString() !== historyDateFilter.toDateString()) return false;
    return true;
  });

  // Filter at-risk students for reports
  const filteredAtRiskStudents = reportsCourseFilter && reportsCourseFilter !== "all-courses-reports"
    ? atRiskStudents.filter(() => true) // In real app, filter by course
    : atRiskStudents;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Attendance Management</h1>
          <p className="text-muted-foreground mt-1">
            Mark and track student attendance for your courses
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={resetAttendance}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Reset
          </Button>
        </div>
      </div>

      {/* Course, Hour and Date Selection */}
      <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Session Details
              </CardTitle>
              <CardDescription>
                Select course, hour, and date to begin marking attendance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    Course <span className="text-destructive">*</span>
                  </label>
                  <Select value={selectedCourse} onValueChange={(value) => {
                    setSelectedCourse(value);
                    setSelectedHour(""); // Reset hour when course changes
                  }}>
                    <SelectTrigger className={cn(!selectedCourse && "border-muted-foreground/50")}>
                      <SelectValue placeholder="Choose a course" />
                    </SelectTrigger>
                    <SelectContent>
                      {courses.map((course) => (
                        <SelectItem key={course.id} value={course.id}>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">{course.code}</Badge>
                            <span>{course.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    Hour <span className="text-destructive">*</span>
                  </label>
                  <Select 
                    value={selectedHour} 
                    onValueChange={setSelectedHour}
                    disabled={!selectedCourse}
                  >
                    <SelectTrigger className={cn(!selectedHour && "border-muted-foreground/50")}>
                      <SelectValue placeholder={!selectedCourse ? "Select course first" : "Choose hour"} />
                    </SelectTrigger>
                    <SelectContent>
                      {availableHours.length > 0 ? (
                        availableHours.map((hour) => (
                          <SelectItem key={hour} value={hour.toString()}>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4" />
                              <span className="font-medium">Hour {hour}</span>
                              <span className="text-xs text-muted-foreground">
                                (of {selectedCourseSession?.totalHours})
                              </span>
                            </div>
                          </SelectItem>
                        ))
                      ) : (
                        <div className="p-2 text-sm text-muted-foreground">
                          No hours available
                        </div>
                      )}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    Date <span className="text-destructive">*</span>
                  </label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !selectedDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate ? (
                          selectedDate.toLocaleDateString('en-US', { 
                            weekday: 'short',
                            year: 'numeric', 
                            month: 'short', 
                            day: 'numeric' 
                          })
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={(date) => date && setSelectedDate(date)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              {selectedCourse && selectedHour && (
                <div className="mt-4 p-4 bg-muted/50 rounded-lg border border-primary/20">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Selected Session</p>
                      <p className="text-sm text-muted-foreground">
                        {selectedCourseData?.code} - {selectedCourseData?.name}
                        <span className="mx-2">•</span>
                        Hour {selectedHour} of {selectedCourseSession?.totalHours}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {selectedCourseSession?.schedule}
                      </p>
                    </div>
                    <Badge variant="secondary" className="text-sm">
                      <Users className="mr-1 h-3 w-3" />
                      {selectedCourseData?.students} Students
                    </Badge>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

      {/* Attendance Marking Section - Shows when course and hour are selected */}
      {selectedCourse && selectedHour && (
        <>
          {/* Quick Stats */}
          <div className="grid gap-4 md:grid-cols-5">
                <Card className="border-l-4 border-l-green-500">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Present</CardTitle>
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">{presentCount}</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {students.length > 0 ? Math.round((presentCount / students.length) * 100) : 0}% of total
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-l-4 border-l-red-500">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Absent</CardTitle>
                    <XCircle className="h-4 w-4 text-red-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-red-600">{absentCount}</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {students.length > 0 ? Math.round((absentCount / students.length) * 100) : 0}% of total
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-l-4 border-l-yellow-500">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Late</CardTitle>
                    <Clock className="h-4 w-4 text-yellow-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-yellow-600">{lateCount}</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {students.length > 0 ? Math.round((lateCount / students.length) * 100) : 0}% of total
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-l-4 border-l-blue-500">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Excused</CardTitle>
                    <FileText className="h-4 w-4 text-blue-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-blue-600">{excusedCount}</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {students.length > 0 ? Math.round((excusedCount / students.length) * 100) : 0}% of total
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-l-4 border-l-gray-500">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Unmarked</CardTitle>
                    <Users className="h-4 w-4 text-gray-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-gray-600">{unmarkedCount}</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Remaining to mark
                    </p>
                  </CardContent>
                </Card>
              </div>

          {/* Quick Actions */}
          <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
                    <div className="flex gap-2 flex-wrap">
                      <Button onClick={markAllPresent} disabled={!selectedCourse || !selectedHour}>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Mark All Present
                      </Button>
                      <Button 
                        variant="default" 
                        onClick={saveAttendance}
                        disabled={!selectedCourse || !selectedHour || isSaving}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        {isSaving ? (
                          <>
                            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className="mr-2 h-4 w-4" />
                            Save Attendance
                          </>
                        )}
                      </Button>
                      {attendanceCompleted && (
                        <Button 
                          variant="default"
                          onClick={generateReport}
                          disabled={isGeneratingReport}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          {isGeneratingReport ? (
                            <>
                              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                              Generating...
                            </>
                          ) : (
                            <>
                              <FileText className="mr-2 h-4 w-4" />
                              Generate Report
                            </>
                          )}
                        </Button>
                      )}
                      <Button variant="outline" onClick={() => setShowExportDialog(true)}>
                        <Download className="mr-2 h-4 w-4" />
                        Export
                      </Button>
                    </div>
                    {unmarkedCount === 0 && students.length > 0 && (
                      <Badge className="bg-green-100 text-green-800 border-green-300">
                        <CheckCircle className="mr-1 h-3 w-3" />
                        All marked
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>

          {/* Student Attendance Table */}
          <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <CardTitle>Student Roster</CardTitle>
                    <CardDescription className="mt-1">
                      {selectedCourseData?.code} - {selectedCourseData?.name} • Hour {selectedHour}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <div className="relative flex-1 sm:w-64">
                      <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search students..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9"
                      />
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/50">
                        <TableHead className="w-12">#</TableHead>
                        <TableHead>Student Information</TableHead>
                        <TableHead>SAP ID</TableHead>
                        <TableHead>Current Status</TableHead>
                        <TableHead>Overall Rate</TableHead>
                        <TableHead className="text-center">Mark Attendance</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredStudents.length > 0 ? (
                        filteredStudents.map((student, index) => (
                          <TableRow key={student.id} className="hover:bg-muted/50">
                            <TableCell className="font-medium text-muted-foreground">
                              {index + 1}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <Avatar className="h-10 w-10">
                                  <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                                    {getInitials(student.name)}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium">{student.name}</p>
                                  <p className="text-sm text-muted-foreground">
                                    {student.email}
                                  </p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline" className="font-mono">
                                {student.sapId}
                              </Badge>
                            </TableCell>
                            <TableCell>{getAttendanceBadge(student.attendance)}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                                  <div
                                    className={cn(
                                      "h-full transition-all",
                                      student.attendanceRate >= 75
                                        ? "bg-green-500"
                                        : "bg-red-500"
                                    )}
                                    style={{ width: `${student.attendanceRate}%` }}
                                  />
                                </div>
                                <span
                                  className={cn(
                                    "text-sm font-semibold tabular-nums",
                                    student.attendanceRate >= 75
                                      ? "text-green-600"
                                      : "text-red-600"
                                  )}
                                >
                                  {student.attendanceRate}%
                                </span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-1 justify-center">
                                <Button
                                  variant={
                                    student.attendance === "present" ? "default" : "outline"
                                  }
                                  size="sm"
                                  onClick={() => markAttendance(student.id, "present")}
                                  className={cn(
                                    student.attendance === "present" && "bg-green-600 hover:bg-green-700"
                                  )}
                                  title="Mark Present"
                                >
                                  <CheckCircle className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant={
                                    student.attendance === "absent" ? "destructive" : "outline"
                                  }
                                  size="sm"
                                  onClick={() => markAttendance(student.id, "absent")}
                                  title="Mark Absent"
                                >
                                  <XCircle className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant={
                                    student.attendance === "late" ? "default" : "outline"
                                  }
                                  size="sm"
                                  onClick={() => markAttendance(student.id, "late")}
                                  className={cn(
                                    student.attendance === "late" && "bg-yellow-600 hover:bg-yellow-700"
                                  )}
                                  title="Mark Late"
                                >
                                  <Clock className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant={
                                    student.attendance === "excused" ? "default" : "outline"
                                  }
                                  size="sm"
                                  onClick={() => markAttendance(student.id, "excused")}
                                  className={cn(
                                    student.attendance === "excused" && "bg-blue-600 hover:bg-blue-700"
                                  )}
                                  title="Mark Excused"
                                >
                                  <FileText className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={6} className="h-24 text-center">
                            <div className="flex flex-col items-center justify-center text-muted-foreground">
                              <Users className="h-8 w-8 mb-2" />
                              <p>No students found matching your search.</p>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
                <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
                  <p>
                    Showing {filteredStudents.length} of {students.length} students
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-green-500"></div>
                      <span>Present</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-red-500"></div>
                      <span>Absent</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                      <span>Late</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                      <span>Excused</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
        </>
      )}

      {/* History and Reports Section */}
      <Tabs defaultValue="history" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="history">Attendance History</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        {/* History Tab */}
        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Attendance History</CardTitle>
                  <CardDescription className="mt-1">
                    View and filter past attendance records
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Export History
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {/* Filters */}
              <div className="mb-4 p-4 bg-muted/50 rounded-lg border">
                <div className="flex items-center gap-2 mb-3">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <h3 className="text-sm font-semibold">Filters</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-muted-foreground">Course</label>
                    <Select value={historyCourseFilter} onValueChange={setHistoryCourseFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="All courses" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all-courses">All courses</SelectItem>
                        {courses.map((course) => (
                          <SelectItem key={course.id} value={course.name}>
                            {course.code} - {course.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-muted-foreground">Hour</label>
                    <Select value={historyHourFilter} onValueChange={setHistoryHourFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="All hours" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all-hours">All hours</SelectItem>
                        <SelectItem value="Hour 1">Hour 1</SelectItem>
                        <SelectItem value="Hour 2">Hour 2</SelectItem>
                        <SelectItem value="Hour 3">Hour 3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-muted-foreground">Date</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {historyDateFilter ? historyDateFilter.toLocaleDateString() : "All dates"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={historyDateFilter}
                          onSelect={setHistoryDateFilter}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                {(historyCourseFilter || historyHourFilter || historyDateFilter) && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="mt-3"
                    onClick={() => {
                      setHistoryCourseFilter("all-courses");
                      setHistoryHourFilter("all-hours");
                      setHistoryDateFilter(undefined);
                    }}
                  >
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Clear Filters
                  </Button>
                )}
              </div>
              
              {/* History Table */}
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead>Date</TableHead>
                      <TableHead>Course</TableHead>
                      <TableHead>Hour</TableHead>
                      <TableHead className="text-center">Present</TableHead>
                      <TableHead className="text-center">Absent</TableHead>
                      <TableHead className="text-center">Late</TableHead>
                      <TableHead className="text-center">Excused</TableHead>
                      <TableHead className="text-center">Total</TableHead>
                      <TableHead>Attendance Rate</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredHistory.length > 0 ? (
                      filteredHistory.map((record) => {
                      const rate = Math.round((record.present / record.total) * 100);
                      return (
                        <TableRow key={record.id} className="hover:bg-muted/50">
                          <TableCell className="font-medium">
                            {new Date(record.date).toLocaleDateString('en-US', { 
                              weekday: 'short',
                              year: 'numeric', 
                              month: 'short', 
                              day: 'numeric' 
                            })}
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium">{record.course}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="flex items-center gap-1 w-fit">
                              <Clock className="h-3 w-3" />
                              {record.hour}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-center">
                            <span className="text-green-600 font-semibold">
                              {record.present}
                            </span>
                          </TableCell>
                          <TableCell className="text-center">
                            <span className="text-red-600 font-semibold">
                              {record.absent}
                            </span>
                          </TableCell>
                          <TableCell className="text-center">
                            <span className="text-yellow-600 font-semibold">{record.late}</span>
                          </TableCell>
                          <TableCell className="text-center">
                            <span className="text-blue-600 font-semibold">{record.excused}</span>
                          </TableCell>
                          <TableCell className="text-center font-medium">{record.total}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                                <div
                                  className={cn(
                                    "h-full",
                                    rate >= 75 ? "bg-green-500" : "bg-red-500"
                                  )}
                                  style={{ width: `${rate}%` }}
                                />
                              </div>
                              <Badge variant={rate >= 75 ? "default" : "destructive"}>
                                {rate}%
                              </Badge>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })
                    ) : (
                      <TableRow>
                        <TableCell colSpan={9} className="h-24 text-center">
                          <div className="flex flex-col items-center justify-center text-muted-foreground">
                            <FileText className="h-8 w-8 mb-2" />
                            <p>No attendance records found matching your filters.</p>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
              <div className="mt-4 text-sm text-muted-foreground">
                Showing {filteredHistory.length} of {attendanceHistory.length} records
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reports Tab */}
        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Attendance Reports & Analytics</CardTitle>
              <CardDescription>
                View attendance analytics and generate reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Filters */}
              <div className="mb-4 p-4 bg-muted/50 rounded-lg border">
                <div className="flex items-center gap-2 mb-3">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <h3 className="text-sm font-semibold">Report Filters</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-muted-foreground">Course</label>
                    <Select value={reportsCourseFilter} onValueChange={setReportsCourseFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="All courses" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all-courses-reports">All courses</SelectItem>
                        {courses.map((course) => (
                          <SelectItem key={course.id} value={course.id}>
                            {course.code} - {course.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-muted-foreground">Date Range</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {reportsDateRange.from ? (
                            reportsDateRange.to ? (
                              <>
                                {reportsDateRange.from.toLocaleDateString()} - {reportsDateRange.to.toLocaleDateString()}
                              </>
                            ) : (
                              reportsDateRange.from.toLocaleDateString()
                            )
                          ) : (
                            "Select date range"
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={reportsDateRange.from}
                          onSelect={(date) => setReportsDateRange({ from: date, to: reportsDateRange.to })}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                {(reportsCourseFilter || reportsDateRange.from) && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="mt-3"
                    onClick={() => {
                      setReportsCourseFilter("all-courses-reports");
                      setReportsDateRange({ from: undefined, to: undefined });
                    }}
                  >
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Clear Filters
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* At-Risk Students */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-destructive" />
                    At-Risk Students (Below 75%)
                  </CardTitle>
                  <CardDescription>
                    Students with poor attendance rates
                  </CardDescription>
                </div>
                <Badge variant="destructive">{filteredAtRiskStudents.length}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              {filteredAtRiskStudents.length > 0 ? (
                <div className="space-y-4">
                  {filteredAtRiskStudents.map((student) => (
                    <div
                      key={student.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback>{getInitials(student.name)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{student.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {student.sapId} • {student.email}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">
                            Attendance Rate
                          </p>
                          <p className="text-lg font-bold text-destructive">
                            {student.attendanceRate}%
                          </p>
                        </div>
                        <Button variant="outline" size="sm">
                          Send Reminder
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <TrendingDown className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">
                    No at-risk students. Great attendance overall!
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

        </TabsContent>
      </Tabs>

      {/* Export Dialog */}
      <Dialog open={showExportDialog} onOpenChange={setShowExportDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Export Attendance Data</DialogTitle>
            <DialogDescription>
              Choose a format to export the attendance data
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full justify-start h-auto py-4"
                onClick={() => handleExport('pdf')}
              >
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-red-600" />
                  <div className="text-left">
                    <p className="font-semibold">PDF Document</p>
                    <p className="text-xs text-muted-foreground">Professional formatted report</p>
                  </div>
                </div>
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start h-auto py-4"
                onClick={() => handleExport('excel')}
              >
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-green-600" />
                  <div className="text-left">
                    <p className="font-semibold">Excel Spreadsheet</p>
                    <p className="text-xs text-muted-foreground">Editable data in .xlsx format</p>
                  </div>
                </div>
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start h-auto py-4"
                onClick={() => handleExport('csv')}
              >
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-blue-600" />
                  <div className="text-left">
                    <p className="font-semibold">CSV File</p>
                    <p className="text-xs text-muted-foreground">Compatible with all systems</p>
                  </div>
                </div>
              </Button>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowExportDialog(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Attendance;
