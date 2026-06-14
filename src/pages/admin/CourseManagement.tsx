import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookOpen,
  Plus,
  Search,
  Download,
  CheckCircle,
  Clock,
  XCircle,
  Users,
  Edit,
  Trash2,
  UserPlus,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface Course {
  id: string;
  code: string;
  title: string;
  instructor: string;
  department: string;
  credits: number;
  enrolled: number;
  capacity: number;
  status: "pending" | "approved" | "rejected" | "archived";
  submittedDate: string;
}

const CourseManagement = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [reviewDialog, setReviewDialog] = useState(false);
  const [assignDialog, setAssignDialog] = useState(false);

  const [courses] = useState<Course[]>([
    {
      id: "1",
      code: "CS301",
      title: "Advanced Machine Learning",
      instructor: "Dr. Sarah Mitchell",
      department: "Computer Science",
      credits: 4,
      enrolled: 45,
      capacity: 50,
      status: "approved",
      submittedDate: "2024-01-05",
    },
    {
      id: "2",
      code: "CS401",
      title: "Deep Learning Fundamentals",
      instructor: "Not Assigned",
      department: "Computer Science",
      credits: 4,
      enrolled: 0,
      capacity: 40,
      status: "pending",
      submittedDate: "2024-01-18",
    },
    {
      id: "3",
      code: "ENG201",
      title: "Digital Electronics",
      instructor: "Prof. John Anderson",
      department: "Engineering",
      credits: 3,
      enrolled: 38,
      capacity: 40,
      status: "approved",
      submittedDate: "2024-01-03",
    },
    {
      id: "4",
      code: "CS501",
      title: "Advanced Computer Graphics",
      instructor: "Dr. Michael Brown",
      department: "Computer Science",
      credits: 4,
      enrolled: 25,
      capacity: 30,
      status: "approved",
      submittedDate: "2024-01-10",
    },
  ]);

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = filterStatus === "all" || course.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const handleApprove = (course: Course) => {
    toast({
      title: "Course Approved",
      description: `${course.code} - ${course.title} has been approved`,
    });
    setReviewDialog(false);
  };

  const handleReject = (course: Course) => {
    toast({
      title: "Course Rejected",
      description: `${course.code} - ${course.title} has been rejected`,
      variant: "destructive",
    });
    setReviewDialog(false);
  };

  const handleAssignInstructor = () => {
    toast({
      title: "Instructor Assigned",
      description: "Instructor has been assigned to the course",
    });
    setAssignDialog(false);
  };

  const getStatusBadge = (status: Course["status"]) => {
    const variants = {
      pending: { variant: "secondary" as const, icon: Clock, color: "text-warning" },
      approved: { variant: "default" as const, icon: CheckCircle, color: "text-success" },
      rejected: { variant: "destructive" as const, icon: XCircle, color: "text-destructive" },
      archived: { variant: "secondary" as const, icon: XCircle, color: "text-muted-foreground" },
    };

    const config = variants[status];
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className="gap-1">
        <Icon className={`h-3 w-3 ${config.color}`} />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Course Management</h1>
          <p className="text-muted-foreground">
            Approve, manage, and oversee all courses
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Course
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Courses</p>
                <p className="text-3xl font-bold">{courses.length}</p>
              </div>
              <BookOpen className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Approved</p>
                <p className="text-3xl font-bold text-success">
                  {courses.filter((c) => c.status === "approved").length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending Approval</p>
                <p className="text-3xl font-bold text-warning">
                  {courses.filter((c) => c.status === "pending").length}
                </p>
              </div>
              <Clock className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Students</p>
                <p className="text-3xl font-bold text-primary">
                  {courses.reduce((sum, c) => sum + c.enrolled, 0)}
                </p>
              </div>
              <Users className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex-1 min-w-[300px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search by code, title, or instructor..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Courses Table */}
      <Card>
        <CardHeader>
          <CardTitle>Courses ({filteredCourses.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Instructor</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Credits</TableHead>
                <TableHead>Enrollment</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCourses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell className="font-mono font-semibold">{course.code}</TableCell>
                  <TableCell className="font-medium">{course.title}</TableCell>
                  <TableCell>
                    {course.instructor === "Not Assigned" ? (
                      <Badge variant="secondary">Not Assigned</Badge>
                    ) : (
                      course.instructor
                    )}
                  </TableCell>
                  <TableCell>{course.department}</TableCell>
                  <TableCell>{course.credits}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">
                        {course.enrolled}/{course.capacity}
                      </span>
                      <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary"
                          style={{
                            width: `${(course.enrolled / course.capacity) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(course.status)}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      {course.status === "pending" && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setSelectedCourse(course);
                            setReviewDialog(true);
                          }}
                        >
                          Review
                        </Button>
                      )}
                      {course.instructor === "Not Assigned" && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setSelectedCourse(course);
                            setAssignDialog(true);
                          }}
                        >
                          <UserPlus className="h-3 w-3 mr-1" />
                          Assign
                        </Button>
                      )}
                      <Button size="sm" variant="ghost">
                        <Edit className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Review Course Dialog */}
      <Dialog open={reviewDialog} onOpenChange={setReviewDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Review Course</DialogTitle>
            <DialogDescription>
              Review and approve or reject this course
            </DialogDescription>
          </DialogHeader>
          {selectedCourse && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">
                    Course Code
                  </Label>
                  <p className="text-lg font-semibold">{selectedCourse.code}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">
                    Credits
                  </Label>
                  <p className="text-lg font-semibold">{selectedCourse.credits}</p>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">
                  Course Title
                </Label>
                <p className="text-lg font-semibold">{selectedCourse.title}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">
                    Department
                  </Label>
                  <p className="font-medium">{selectedCourse.department}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">
                    Capacity
                  </Label>
                  <p className="font-medium">{selectedCourse.capacity} students</p>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">
                  Submitted Date
                </Label>
                <p className="font-medium">{selectedCourse.submittedDate}</p>
              </div>
              <div>
                <Label htmlFor="review-notes">Review Notes</Label>
                <Textarea
                  id="review-notes"
                  placeholder="Add notes about your decision..."
                  rows={3}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => selectedCourse && handleReject(selectedCourse)}
            >
              <XCircle className="mr-2 h-4 w-4" />
              Reject
            </Button>
            <Button onClick={() => selectedCourse && handleApprove(selectedCourse)}>
              <CheckCircle className="mr-2 h-4 w-4" />
              Approve
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Assign Instructor Dialog */}
      <Dialog open={assignDialog} onOpenChange={setAssignDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Assign Instructor</DialogTitle>
            <DialogDescription>
              Assign an instructor to {selectedCourse?.code}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="instructor">Select Instructor</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Choose an instructor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mitchell">Dr. Sarah Mitchell</SelectItem>
                  <SelectItem value="anderson">Prof. John Anderson</SelectItem>
                  <SelectItem value="brown">Dr. Michael Brown</SelectItem>
                  <SelectItem value="davis">Dr. Emily Davis</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Textarea
                id="notes"
                placeholder="Additional notes about this assignment..."
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAssignDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleAssignInstructor}>
              <UserPlus className="mr-2 h-4 w-4" />
              Assign Instructor
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CourseManagement;
