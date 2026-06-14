import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Bell,
  Plus,
  Send,
  Eye,
  Edit,
  Trash2,
  Calendar,
  Users,
  AlertCircle,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Announcement {
  id: string;
  title: string;
  message: string;
  course: string;
  courseId: string;
  priority: "normal" | "important" | "urgent";
  isScheduled: boolean;
  scheduledDate?: string;
  createdAt: string;
  viewCount: number;
  totalStudents: number;
  status: "draft" | "sent" | "scheduled";
}

const Announcements = () => {
  const { toast } = useToast();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [filterCourse, setFilterCourse] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");

  // Form state
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [priority, setPriority] = useState<"normal" | "important" | "urgent">("normal");
  const [isScheduled, setIsScheduled] = useState(false);
  const [scheduledDate, setScheduledDate] = useState("");

  // Mock data - replace with API call
  const courses = [
    { id: "1", name: "Advanced Machine Learning", students: 234 },
    { id: "2", name: "Data Structures & Algorithms", students: 180 },
    { id: "3", name: "Web Development Fundamentals", students: 156 },
  ];

  const announcements: Announcement[] = [
    {
      id: "1",
      title: "Midterm Exam Schedule",
      message: "The midterm exam will be held on Friday, March 15th at 2:00 PM in Room 301.",
      course: "Advanced Machine Learning",
      courseId: "1",
      priority: "urgent",
      isScheduled: false,
      createdAt: "2024-01-15T10:30:00",
      viewCount: 220,
      totalStudents: 234,
      status: "sent",
    },
    {
      id: "2",
      title: "Assignment 3 Extended Deadline",
      message: "Due to multiple requests, Assignment 3 deadline has been extended to next Monday.",
      course: "Data Structures & Algorithms",
      courseId: "2",
      priority: "important",
      isScheduled: false,
      createdAt: "2024-01-14T14:20:00",
      viewCount: 165,
      totalStudents: 180,
      status: "sent",
    },
    {
      id: "3",
      title: "Guest Lecture on Neural Networks",
      message: "Dr. Andrew Ng will be giving a guest lecture on Tuesday. Attendance is mandatory.",
      course: "Advanced Machine Learning",
      courseId: "1",
      priority: "important",
      isScheduled: true,
      scheduledDate: "2024-01-20T09:00:00",
      createdAt: "2024-01-13T16:45:00",
      viewCount: 0,
      totalStudents: 234,
      status: "scheduled",
    },
    {
      id: "4",
      title: "Office Hours Rescheduled",
      message: "Office hours this week will be on Thursday instead of Wednesday.",
      course: "Web Development Fundamentals",
      courseId: "3",
      priority: "normal",
      isScheduled: false,
      createdAt: "2024-01-12T11:15:00",
      viewCount: 148,
      totalStudents: 156,
      status: "sent",
    },
  ];

  const filteredAnnouncements = announcements.filter((ann) => {
    const matchesCourse = filterCourse === "all" || ann.courseId === filterCourse;
    const matchesPriority = filterPriority === "all" || ann.priority === filterPriority;
    return matchesCourse && matchesPriority;
  });

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "urgent":
        return <Badge variant="destructive">Urgent</Badge>;
      case "important":
        return <Badge className="bg-warning text-white">Important</Badge>;
      default:
        return <Badge variant="secondary">Normal</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "sent":
        return <Badge className="bg-success">Sent</Badge>;
      case "scheduled":
        return <Badge variant="outline">Scheduled</Badge>;
      case "draft":
        return <Badge variant="secondary">Draft</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const handleCreateAnnouncement = () => {
    if (!title || !message || !selectedCourse) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // TODO: API call to create announcement
    toast({
      title: "Announcement Created!",
      description: isScheduled
        ? `Announcement scheduled for ${new Date(scheduledDate).toLocaleString()}`
        : "Announcement sent to all students in the course.",
    });

    // Reset form
    setTitle("");
    setMessage("");
    setSelectedCourse("");
    setPriority("normal");
    setIsScheduled(false);
    setScheduledDate("");
    setIsCreateOpen(false);
  };

  const handleDelete = (id: string) => {
    // TODO: API call to delete announcement
    toast({
      title: "Announcement Deleted",
      description: "The announcement has been removed.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Announcements</h1>
          <p className="text-muted-foreground">
            Push announcements to your students
          </p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Announcement
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Announcement</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  placeholder="Enter announcement title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message *</Label>
                <Textarea
                  id="message"
                  placeholder="Enter announcement message..."
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="course">Course *</Label>
                  <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select course" />
                    </SelectTrigger>
                    <SelectContent>
                      {courses.map((course) => (
                        <SelectItem key={course.id} value={course.id}>
                          {course.name} ({course.students} students)
                        </SelectItem>
                      ))}
                      <SelectItem value="all">All My Courses</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select
                    value={priority}
                    onValueChange={(v) => setPriority(v as any)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="important">Important</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label htmlFor="schedule">Schedule for Later</Label>
                  <p className="text-sm text-muted-foreground">
                    Send this announcement at a specific time
                  </p>
                </div>
                <Switch
                  id="schedule"
                  checked={isScheduled}
                  onCheckedChange={setIsScheduled}
                />
              </div>

              {isScheduled && (
                <div className="space-y-2">
                  <Label htmlFor="scheduledDate">Schedule Date & Time</Label>
                  <Input
                    id="scheduledDate"
                    type="datetime-local"
                    value={scheduledDate}
                    onChange={(e) => setScheduledDate(e.target.value)}
                  />
                </div>
              )}

              <div className="flex gap-2">
                <Button onClick={handleCreateAnnouncement} className="flex-1">
                  <Send className="mr-2 h-4 w-4" />
                  {isScheduled ? "Schedule Announcement" : "Send Now"}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsCreateOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sent</CardTitle>
            <Bell className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {announcements.filter((a) => a.status === "sent").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Scheduled</CardTitle>
            <Calendar className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {announcements.filter((a) => a.status === "scheduled").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg View Rate</CardTitle>
            <Eye className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(
                (announcements
                  .filter((a) => a.status === "sent")
                  .reduce((sum, a) => sum + (a.viewCount / a.totalStudents) * 100, 0) /
                  announcements.filter((a) => a.status === "sent").length) ||
                  0
              )}
              %
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Recipients</CardTitle>
            <Users className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {courses.reduce((sum, c) => sum + c.students, 0)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <Select value={filterCourse} onValueChange={setFilterCourse}>
              <SelectTrigger className="w-[250px]">
                <SelectValue placeholder="Filter by course" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Courses</SelectItem>
                {courses.map((course) => (
                  <SelectItem key={course.id} value={course.id}>
                    {course.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterPriority} onValueChange={setFilterPriority}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="important">Important</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Announcements Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Announcements</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Views</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAnnouncements.map((announcement) => (
                <TableRow key={announcement.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{announcement.title}</p>
                      <p className="text-sm text-muted-foreground truncate max-w-xs">
                        {announcement.message}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{announcement.course}</TableCell>
                  <TableCell>{getPriorityBadge(announcement.priority)}</TableCell>
                  <TableCell>{getStatusBadge(announcement.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Eye className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        {announcement.viewCount} / {announcement.totalStudents}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        (
                        {Math.round(
                          (announcement.viewCount / announcement.totalStudents) * 100
                        )}
                        %)
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">
                    {announcement.isScheduled
                      ? new Date(announcement.scheduledDate!).toLocaleDateString()
                      : new Date(announcement.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(announcement.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filteredAnnouncements.length === 0 && (
            <div className="text-center py-12">
              <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No announcements found</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Announcements;
