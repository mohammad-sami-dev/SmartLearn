import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Plus, 
  Edit, 
  Trash2,
  Download,
  Upload,
  Search,
  Filter,
  Copy
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TimetableEntry {
  id: string;
  department: string;
  courseCode: string;
  courseName: string;
  instructor: string;
  day: string;
  startTime: string;
  endTime: string;
  duration: string;
  room: string;
  block: string;
  type: "lecture" | "lab" | "tutorial";
  semester: string;
  year: string;
}

const TimetableManagement = () => {
  const { toast } = useToast();
  const [selectedDepartment, setSelectedDepartment] = useState<string>("all");
  const [selectedSemester, setSelectedSemester] = useState<string>("Fall 2024");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<TimetableEntry | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Departments
  const departments = [
    "Computer Science",
    "Electrical Engineering",
    "Mechanical Engineering",
    "Business Administration",
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
  ];

  // Days of the week
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  // Sample timetable data
  const [timetableEntries, setTimetableEntries] = useState<TimetableEntry[]>([
    {
      id: "1",
      department: "Computer Science",
      courseCode: "CS401",
      courseName: "Advanced Machine Learning",
      instructor: "Dr. Fatima Ahmad",
      day: "Monday",
      startTime: "09:00",
      endTime: "11:00",
      duration: "2 hours",
      room: "F201",
      block: "A",
      type: "lecture",
      semester: "Fall 2024",
      year: "2024",
    },
    {
      id: "2",
      department: "Computer Science",
      courseCode: "CS202",
      courseName: "Data Structures Lab",
      instructor: "Prof. Ahmed Hassan",
      day: "Tuesday",
      startTime: "11:30",
      endTime: "13:00",
      duration: "1.5 hours",
      room: "C105",
      block: "B",
      type: "lab",
      semester: "Fall 2024",
      year: "2024",
    },
    {
      id: "3",
      department: "Computer Science",
      courseCode: "CS301",
      courseName: "Web Development",
      instructor: "Dr. Aisha Rahman",
      day: "Wednesday",
      startTime: "14:00",
      endTime: "15:00",
      duration: "1 hour",
      room: "A302",
      block: "C",
      type: "lecture",
      semester: "Fall 2024",
      year: "2024",
    },
    {
      id: "4",
      department: "Electrical Engineering",
      courseCode: "EE201",
      courseName: "Circuit Analysis",
      instructor: "Prof. Omar Ibrahim",
      day: "Monday",
      startTime: "10:00",
      endTime: "12:00",
      duration: "2 hours",
      room: "E101",
      block: "D",
      type: "lecture",
      semester: "Fall 2024",
      year: "2024",
    },
    {
      id: "5",
      department: "Business Administration",
      courseCode: "BA301",
      courseName: "Marketing Management",
      instructor: "Dr. Maryam Ali",
      day: "Thursday",
      startTime: "13:00",
      endTime: "15:00",
      duration: "2 hours",
      room: "B205",
      block: "E",
      type: "lecture",
      semester: "Fall 2024",
      year: "2024",
    },
  ]);

  // Filter entries based on selection
  const filteredEntries = timetableEntries.filter((entry) => {
    const matchesDepartment = selectedDepartment === "all" || entry.department === selectedDepartment;
    const matchesSemester = entry.semester === selectedSemester;
    const matchesSearch = 
      entry.courseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.courseCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDepartment && matchesSemester && matchesSearch;
  });

  // Form state
  const [formData, setFormData] = useState<Partial<TimetableEntry>>({
    department: "",
    courseCode: "",
    courseName: "",
    instructor: "",
    day: "Monday",
    startTime: "",
    endTime: "",
    room: "",
    block: "A",
    type: "lecture",
    semester: selectedSemester,
    year: "2024",
  });

  const handleAddEntry = () => {
    if (!formData.courseCode || !formData.courseName || !formData.instructor || !formData.startTime || !formData.endTime || !formData.room) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const newEntry: TimetableEntry = {
      id: Date.now().toString(),
      department: formData.department!,
      courseCode: formData.courseCode!,
      courseName: formData.courseName!,
      instructor: formData.instructor!,
      day: formData.day!,
      startTime: formData.startTime!,
      endTime: formData.endTime!,
      duration: calculateDuration(formData.startTime!, formData.endTime!),
      room: formData.room!,
      block: formData.block!,
      type: formData.type!,
      semester: formData.semester!,
      year: formData.year!,
    };

    setTimetableEntries([...timetableEntries, newEntry]);
    setIsDialogOpen(false);
    resetForm();
    toast({
      title: "Success",
      description: "Timetable entry added successfully",
    });
  };

  const handleUpdateEntry = () => {
    if (!editingEntry) return;

    const updatedEntries = timetableEntries.map((entry) =>
      entry.id === editingEntry.id ? { ...editingEntry, ...formData } : entry
    );

    setTimetableEntries(updatedEntries);
    setEditingEntry(null);
    setIsDialogOpen(false);
    resetForm();
    toast({
      title: "Success",
      description: "Timetable entry updated successfully",
    });
  };

  const handleDeleteEntry = (id: string) => {
    setTimetableEntries(timetableEntries.filter((entry) => entry.id !== id));
    toast({
      title: "Deleted",
      description: "Timetable entry removed successfully",
    });
  };

  const handleEditEntry = (entry: TimetableEntry) => {
    setEditingEntry(entry);
    setFormData(entry);
    setIsDialogOpen(true);
  };

  const handleDuplicateEntry = (entry: TimetableEntry) => {
    const duplicated: TimetableEntry = {
      ...entry,
      id: Date.now().toString(),
    };
    setTimetableEntries([...timetableEntries, duplicated]);
    toast({
      title: "Duplicated",
      description: "Timetable entry duplicated successfully",
    });
  };

  const resetForm = () => {
    setFormData({
      department: "",
      courseCode: "",
      courseName: "",
      instructor: "",
      day: "Monday",
      startTime: "",
      endTime: "",
      room: "",
      block: "A",
      type: "lecture",
      semester: selectedSemester,
      year: "2024",
    });
  };

  const calculateDuration = (start: string, end: string) => {
    const [startHour, startMin] = start.split(":").map(Number);
    const [endHour, endMin] = end.split(":").map(Number);
    const totalMinutes = (endHour * 60 + endMin) - (startHour * 60 + startMin);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return minutes > 0 ? `${hours}.${minutes / 60 * 10} hours` : `${hours} hours`;
  };

  const handleExport = () => {
    toast({
      title: "Exporting",
      description: "Timetable is being exported to CSV...",
    });
  };

  const handleImport = () => {
    toast({
      title: "Import",
      description: "File upload functionality coming soon...",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Timetable Management</h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Create and manage timetables for all departments
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleImport}>
            <Upload className="mr-2 h-4 w-4" />
            Import
          </Button>
          <Button variant="outline" onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => { setEditingEntry(null); resetForm(); }}>
                <Plus className="mr-2 h-4 w-4" />
                Add Entry
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingEntry ? "Edit" : "Add"} Timetable Entry</DialogTitle>
                <DialogDescription>
                  Fill in the details to {editingEntry ? "update" : "create"} a timetable entry
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="department">Department *</Label>
                    <Select
                      value={formData.department}
                      onValueChange={(value) => setFormData({ ...formData, department: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map((dept) => (
                          <SelectItem key={dept} value={dept}>
                            {dept}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="courseCode">Course Code *</Label>
                    <Input
                      id="courseCode"
                      placeholder="e.g., CS401"
                      value={formData.courseCode}
                      onChange={(e) => setFormData({ ...formData, courseCode: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="courseName">Course Name *</Label>
                  <Input
                    id="courseName"
                    placeholder="e.g., Advanced Machine Learning"
                    value={formData.courseName}
                    onChange={(e) => setFormData({ ...formData, courseName: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="instructor">Instructor *</Label>
                  <Input
                    id="instructor"
                    placeholder="e.g., Dr. Fatima Ahmad"
                    value={formData.instructor}
                    onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="day">Day *</Label>
                    <Select
                      value={formData.day}
                      onValueChange={(value) => setFormData({ ...formData, day: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {daysOfWeek.map((day) => (
                          <SelectItem key={day} value={day}>
                            {day}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="startTime">Start Time *</Label>
                    <Input
                      id="startTime"
                      type="time"
                      value={formData.startTime}
                      onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="endTime">End Time *</Label>
                    <Input
                      id="endTime"
                      type="time"
                      value={formData.endTime}
                      onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="room">Room *</Label>
                    <Input
                      id="room"
                      placeholder="e.g., F201"
                      value={formData.room}
                      onChange={(e) => setFormData({ ...formData, room: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="block">Block *</Label>
                    <Select
                      value={formData.block}
                      onValueChange={(value) => setFormData({ ...formData, block: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {["A", "B", "C", "D", "E", "F"].map((block) => (
                          <SelectItem key={block} value={block}>
                            Block {block}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="type">Type *</Label>
                    <Select
                      value={formData.type}
                      onValueChange={(value: any) => setFormData({ ...formData, type: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="lecture">Lecture</SelectItem>
                        <SelectItem value="lab">Lab</SelectItem>
                        <SelectItem value="tutorial">Tutorial</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => { setIsDialogOpen(false); resetForm(); }}>
                  Cancel
                </Button>
                <Button onClick={editingEntry ? handleUpdateEntry : handleAddEntry}>
                  {editingEntry ? "Update" : "Add"} Entry
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label>Department</Label>
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Semester</Label>
              <Select value={selectedSemester} onValueChange={setSelectedSemester}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Fall 2024">Fall 2024</SelectItem>
                  <SelectItem value="Spring 2024">Spring 2024</SelectItem>
                  <SelectItem value="Summer 2024">Summer 2024</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search courses or instructors..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Entries
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filteredEntries.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Departments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {selectedDepartment === "all" 
                ? new Set(timetableEntries.map(e => e.department)).size 
                : 1}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Lectures
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {filteredEntries.filter(e => e.type === "lecture").length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Labs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {filteredEntries.filter(e => e.type === "lab").length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Timetable Table */}
      <Card>
        <CardHeader>
          <CardTitle>Timetable Entries</CardTitle>
          <CardDescription>
            {filteredEntries.length} entries found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Course</TableHead>
                  <TableHead>Instructor</TableHead>
                  <TableHead>Day</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEntries.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      No timetable entries found. Add your first entry to get started.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredEntries.map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{entry.courseCode}</div>
                          <div className="text-sm text-muted-foreground">{entry.courseName}</div>
                        </div>
                      </TableCell>
                      <TableCell>{entry.instructor}</TableCell>
                      <TableCell>{entry.day}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm">
                          <Clock className="h-3 w-3" />
                          {entry.startTime} - {entry.endTime}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm">
                          <MapPin className="h-3 w-3" />
                          Block {entry.block}, {entry.room}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={
                          entry.type === "lecture" ? "default" : 
                          entry.type === "lab" ? "secondary" : 
                          "outline"
                        }>
                          {entry.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDuplicateEntry(entry)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEditEntry(entry)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteEntry(entry.id)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TimetableManagement;
