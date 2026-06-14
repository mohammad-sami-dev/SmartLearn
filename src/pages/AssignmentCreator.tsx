import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import {
  Plus,
  Trash2,
  Calendar as CalendarIcon,
  Save,
  Send,
  FileText,
  Upload,
  Sparkles,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

interface RubricCriteria {
  id: string;
  name: string;
  maxPoints: number;
  description: string;
}

const AssignmentCreator = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const [assignmentData, setAssignmentData] = useState({
    title: "",
    description: "",
    course: "",
    maxPoints: "100",
    allowLateSubmission: false,
    latePenalty: "10",
    submissionType: "file",
    maxAttempts: "1",
    instructions: "",
  });

  const [dueDate, setDueDate] = useState<Date>();
  const [availableDate, setAvailableDate] = useState<Date>();

  const [rubricCriteria, setRubricCriteria] = useState<RubricCriteria[]>([
    {
      id: "1",
      name: "Content Quality",
      maxPoints: 40,
      description: "Accuracy and depth of content",
    },
    {
      id: "2",
      name: "Organization",
      maxPoints: 30,
      description: "Structure and flow of the submission",
    },
    {
      id: "3",
      name: "Formatting",
      maxPoints: 30,
      description: "Proper formatting and presentation",
    },
  ]);

  const addCriteria = () => {
    const newCriteria: RubricCriteria = {
      id: Date.now().toString(),
      name: "New Criteria",
      maxPoints: 10,
      description: "",
    };
    setRubricCriteria([...rubricCriteria, newCriteria]);
  };

  const updateCriteria = (id: string, updates: Partial<RubricCriteria>) => {
    setRubricCriteria(
      rubricCriteria.map((c) => (c.id === id ? { ...c, ...updates } : c))
    );
  };

  const deleteCriteria = (id: string) => {
    setRubricCriteria(rubricCriteria.filter((c) => c.id !== id));
  };

  const generateWithAI = () => {
    toast({
      title: "AI Generation",
      description: "Generating assignment content with AI...",
    });
    // TODO: Implement AI generation
  };

  const handleSave = () => {
    toast({
      title: "Assignment Saved",
      description: "Your assignment has been saved as a draft.",
    });
  };

  const handlePublish = () => {
    toast({
      title: "Assignment Published",
      description: "Students can now view and submit this assignment.",
    });
    navigate("/teacher/courses");
  };

  const totalPoints = rubricCriteria.reduce(
    (sum, criteria) => sum + criteria.maxPoints,
    0
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Create Assignment</h1>
          <p className="text-muted-foreground">
            Design and publish a new assignment for your students
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" />
            Save Draft
          </Button>
          <Button onClick={handlePublish}>
            <Send className="mr-2 h-4 w-4" />
            Publish
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Assignment Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Assignment Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., Week 3 - Neural Networks Implementation"
                  value={assignmentData.title}
                  onChange={(e) =>
                    setAssignmentData({ ...assignmentData, title: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="course">Course</Label>
                <Select
                  value={assignmentData.course}
                  onValueChange={(value) =>
                    setAssignmentData({ ...assignmentData, course: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select course" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cs301">CS301 - Advanced Machine Learning</SelectItem>
                    <SelectItem value="cs201">CS201 - Data Structures</SelectItem>
                    <SelectItem value="cs101">CS101 - Intro to Programming</SelectItem>
                    <SelectItem value="cs401">CS401 - Senior Project</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="description">Description</Label>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={generateWithAI}
                  >
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate with AI
                  </Button>
                </div>
                <Textarea
                  id="description"
                  placeholder="Provide a clear description of the assignment..."
                  rows={4}
                  value={assignmentData.description}
                  onChange={(e) =>
                    setAssignmentData({
                      ...assignmentData,
                      description: e.target.value,
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="instructions">Instructions</Label>
                <Textarea
                  id="instructions"
                  placeholder="Step-by-step instructions for students..."
                  rows={6}
                  value={assignmentData.instructions}
                  onChange={(e) =>
                    setAssignmentData({
                      ...assignmentData,
                      instructions: e.target.value,
                    })
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Rubric */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div>
                  <span>Grading Rubric</span>
                  <p className="text-sm font-normal text-muted-foreground mt-1">
                    Total Points: {totalPoints}
                  </p>
                </div>
                <Button size="sm" onClick={addCriteria}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Criteria
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {rubricCriteria.map((criteria) => (
                <Card key={criteria.id} className="border">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center gap-2">
                          <Input
                            value={criteria.name}
                            onChange={(e) =>
                              updateCriteria(criteria.id, {
                                name: e.target.value,
                              })
                            }
                            placeholder="Criteria name"
                            className="flex-1"
                          />
                          <Input
                            type="number"
                            value={criteria.maxPoints}
                            onChange={(e) =>
                              updateCriteria(criteria.id, {
                                maxPoints: parseInt(e.target.value) || 0,
                              })
                            }
                            className="w-24"
                            placeholder="Points"
                          />
                          <span className="text-sm text-muted-foreground">pts</span>
                        </div>
                        <Textarea
                          value={criteria.description}
                          onChange={(e) =>
                            updateCriteria(criteria.id, {
                              description: e.target.value,
                            })
                          }
                          placeholder="Description of this criteria..."
                          rows={2}
                        />
                      </div>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => deleteCriteria(criteria.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>

          {/* Attachments */}
          <Card>
            <CardHeader>
              <CardTitle>Attachments & Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-sm text-muted-foreground mb-2">
                  Upload files for students to download
                </p>
                <Button variant="outline" size="sm">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Files
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="maxPoints">Total Points</Label>
                <Input
                  id="maxPoints"
                  type="number"
                  value={assignmentData.maxPoints}
                  onChange={(e) =>
                    setAssignmentData({
                      ...assignmentData,
                      maxPoints: e.target.value,
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Available Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {availableDate
                        ? format(availableDate, "PPP")
                        : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={availableDate}
                      onSelect={setAvailableDate}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>Due Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dueDate ? format(dueDate, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={dueDate}
                      onSelect={setDueDate}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="submissionType">Submission Type</Label>
                <Select
                  value={assignmentData.submissionType}
                  onValueChange={(value) =>
                    setAssignmentData({
                      ...assignmentData,
                      submissionType: value,
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="file">File Upload</SelectItem>
                    <SelectItem value="text">Text Entry</SelectItem>
                    <SelectItem value="link">Website URL</SelectItem>
                    <SelectItem value="media">Media Recording</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxAttempts">Maximum Attempts</Label>
                <Select
                  value={assignmentData.maxAttempts}
                  onValueChange={(value) =>
                    setAssignmentData({
                      ...assignmentData,
                      maxAttempts: value,
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 attempt</SelectItem>
                    <SelectItem value="2">2 attempts</SelectItem>
                    <SelectItem value="3">3 attempts</SelectItem>
                    <SelectItem value="unlimited">Unlimited</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Late Submission */}
          <Card>
            <CardHeader>
              <CardTitle>Late Submission Policy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="allowLate">Allow Late Submissions</Label>
                <Switch
                  id="allowLate"
                  checked={assignmentData.allowLateSubmission}
                  onCheckedChange={(checked) =>
                    setAssignmentData({
                      ...assignmentData,
                      allowLateSubmission: checked,
                    })
                  }
                />
              </div>

              {assignmentData.allowLateSubmission && (
                <div className="space-y-2">
                  <Label htmlFor="latePenalty">Late Penalty (%/day)</Label>
                  <Input
                    id="latePenalty"
                    type="number"
                    value={assignmentData.latePenalty}
                    onChange={(e) =>
                      setAssignmentData({
                        ...assignmentData,
                        latePenalty: e.target.value,
                      })
                    }
                  />
                  <p className="text-xs text-muted-foreground">
                    Deduct {assignmentData.latePenalty}% per day late
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total Points:</span>
                <span className="font-medium">{totalPoints}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Rubric Criteria:</span>
                <span className="font-medium">{rubricCriteria.length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Submission Type:</span>
                <Badge variant="secondary">
                  {assignmentData.submissionType}
                </Badge>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Late Allowed:</span>
                <Badge
                  variant={
                    assignmentData.allowLateSubmission ? "default" : "secondary"
                  }
                >
                  {assignmentData.allowLateSubmission ? "Yes" : "No"}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AssignmentCreator;
