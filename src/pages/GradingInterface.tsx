import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  FileText,
  Download,
  Save,
  Send,
  ChevronLeft,
  ChevronRight,
  Clock,
  User,
  CheckCircle,
  XCircle,
  AlertCircle,
  Sparkles,
  MessageSquare,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Submission {
  id: string;
  studentId: string;
  studentName: string;
  studentAvatar?: string;
  submittedAt: string;
  status: "submitted" | "graded" | "late";
  attempt: number;
  fileUrl?: string;
  textContent?: string;
  grade?: number;
  feedback?: string;
}

interface RubricCriteria {
  id: string;
  name: string;
  maxPoints: number;
  description: string;
  earnedPoints?: number;
  feedback?: string;
}

const GradingInterface = () => {
  const { toast } = useToast();

  const [submissions] = useState<Submission[]>([
    {
      id: "1",
      studentId: "s1",
      studentName: "Alice Johnson",
      submittedAt: "2024-01-15 14:30",
      status: "submitted",
      attempt: 1,
      fileUrl: "assignment.pdf",
    },
    {
      id: "2",
      studentId: "s2",
      studentName: "Bob Smith",
      submittedAt: "2024-01-15 15:45",
      status: "submitted",
      attempt: 1,
      fileUrl: "project.zip",
    },
    {
      id: "3",
      studentId: "s3",
      studentName: "Carol Davis",
      submittedAt: "2024-01-16 09:20",
      status: "late",
      attempt: 1,
      fileUrl: "homework.docx",
    },
    {
      id: "4",
      studentId: "s4",
      studentName: "David Wilson",
      submittedAt: "2024-01-15 10:15",
      status: "graded",
      attempt: 1,
      fileUrl: "solution.py",
      grade: 85,
      feedback: "Good work! Consider edge cases.",
    },
  ]);

  const [currentSubmissionIndex, setCurrentSubmissionIndex] = useState(0);
  const currentSubmission = submissions[currentSubmissionIndex];

  const [rubricCriteria, setRubricCriteria] = useState<RubricCriteria[]>([
    {
      id: "1",
      name: "Content Quality",
      maxPoints: 40,
      description: "Accuracy and depth of content",
      earnedPoints: 0,
      feedback: "",
    },
    {
      id: "2",
      name: "Organization",
      maxPoints: 30,
      description: "Structure and flow",
      earnedPoints: 0,
      feedback: "",
    },
    {
      id: "3",
      name: "Formatting",
      maxPoints: 30,
      description: "Presentation quality",
      earnedPoints: 0,
      feedback: "",
    },
  ]);

  const [generalFeedback, setGeneralFeedback] = useState("");

  const updateCriteria = (id: string, updates: Partial<RubricCriteria>) => {
    setRubricCriteria(
      rubricCriteria.map((c) => (c.id === id ? { ...c, ...updates } : c))
    );
  };

  const totalEarned = rubricCriteria.reduce(
    (sum, c) => sum + (c.earnedPoints || 0),
    0
  );
  const totalMax = rubricCriteria.reduce((sum, c) => sum + c.maxPoints, 0);

  const generateFeedbackWithAI = () => {
    toast({
      title: "Generating Feedback",
      description: "AI is analyzing the submission...",
    });
    // TODO: Implement AI feedback generation
    setTimeout(() => {
      setGeneralFeedback(
        "The submission demonstrates a solid understanding of the core concepts. The implementation is well-structured and follows best practices. Consider adding more comprehensive error handling and edge case coverage."
      );
      toast({
        title: "Feedback Generated",
        description: "AI-generated feedback has been added.",
      });
    }, 2000);
  };

  const handleSaveGrade = () => {
    toast({
      title: "Grade Saved",
      description: "Grade saved as draft. Student cannot see it yet.",
    });
  };

  const handlePublishGrade = () => {
    toast({
      title: "Grade Published",
      description: "Student can now view their grade and feedback.",
    });
  };

  const goToNext = () => {
    if (currentSubmissionIndex < submissions.length - 1) {
      setCurrentSubmissionIndex(currentSubmissionIndex + 1);
    }
  };

  const goToPrevious = () => {
    if (currentSubmissionIndex > 0) {
      setCurrentSubmissionIndex(currentSubmissionIndex - 1);
    }
  };

  const getStatusIcon = (status: Submission["status"]) => {
    switch (status) {
      case "graded":
        return <CheckCircle className="h-4 w-4 text-success" />;
      case "late":
        return <AlertCircle className="h-4 w-4 text-warning" />;
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: Submission["status"]) => {
    switch (status) {
      case "graded":
        return <Badge variant="default">Graded</Badge>;
      case "late":
        return <Badge variant="destructive">Late</Badge>;
      default:
        return <Badge variant="secondary">Pending</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Grade Assignment</h1>
          <p className="text-muted-foreground">
            Week 3 - Neural Networks Implementation
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleSaveGrade}>
            <Save className="mr-2 h-4 w-4" />
            Save Draft
          </Button>
          <Button onClick={handlePublishGrade}>
            <Send className="mr-2 h-4 w-4" />
            Publish Grade
          </Button>
        </div>
      </div>

      <Tabs defaultValue="grade" className="space-y-6">
        <TabsList>
          <TabsTrigger value="grade">Grade Submission</TabsTrigger>
          <TabsTrigger value="overview">All Submissions</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Grade Submission Tab */}
        <TabsContent value="grade" className="space-y-6">
          {/* Navigation */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={goToPrevious}
                  disabled={currentSubmissionIndex === 0}
                >
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Previous
                </Button>
                <div className="text-center">
                  <p className="font-semibold">{currentSubmission?.studentName}</p>
                  <p className="text-sm text-muted-foreground">
                    Submission {currentSubmissionIndex + 1} of {submissions.length}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={goToNext}
                  disabled={currentSubmissionIndex === submissions.length - 1}
                >
                  Next
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Submission Preview */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Submission Details</span>
                    {getStatusBadge(currentSubmission.status)}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <User className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold">{currentSubmission.studentName}</p>
                      <p className="text-sm text-muted-foreground">
                        Submitted: {currentSubmission.submittedAt}
                      </p>
                    </div>
                    <Badge variant="outline">
                      Attempt {currentSubmission.attempt}
                    </Badge>
                  </div>

                  {currentSubmission.fileUrl && (
                    <div className="rounded-lg border border-border bg-muted/30 p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <FileText className="h-8 w-8 text-primary" />
                          <div>
                            <p className="font-medium">{currentSubmission.fileUrl}</p>
                            <p className="text-sm text-muted-foreground">
                              Click to view or download
                            </p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Document Preview Placeholder */}
                  <div className="rounded-lg border border-border bg-muted/10 p-8 text-center min-h-[400px] flex items-center justify-center">
                    <div>
                      <FileText className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">
                        Document preview would appear here
                      </p>
                      <p className="text-sm text-muted-foreground mt-2">
                        PDF viewer, code editor, or text preview
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Rubric Grading */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div>
                      <span>Grading Rubric</span>
                      <p className="text-sm font-normal text-muted-foreground mt-1">
                        Total: {totalEarned} / {totalMax} points
                      </p>
                    </div>
                    <Button variant="outline" size="sm" onClick={generateFeedbackWithAI}>
                      <Sparkles className="mr-2 h-4 w-4" />
                      AI Suggest
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {rubricCriteria.map((criteria) => (
                    <Card key={criteria.id} className="border">
                      <CardContent className="p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h4 className="font-semibold">{criteria.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              {criteria.description}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Input
                              type="number"
                              min="0"
                              max={criteria.maxPoints}
                              value={criteria.earnedPoints || 0}
                              onChange={(e) =>
                                updateCriteria(criteria.id, {
                                  earnedPoints: parseInt(e.target.value) || 0,
                                })
                              }
                              className="w-20 text-center"
                            />
                            <span className="text-sm text-muted-foreground">
                              / {criteria.maxPoints}
                            </span>
                          </div>
                        </div>
                        <Textarea
                          placeholder="Specific feedback for this criteria..."
                          value={criteria.feedback || ""}
                          onChange={(e) =>
                            updateCriteria(criteria.id, {
                              feedback: e.target.value,
                            })
                          }
                          rows={2}
                        />
                      </CardContent>
                    </Card>
                  ))}
                </CardContent>
              </Card>

              {/* General Feedback */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>General Feedback</span>
                    <Button variant="outline" size="sm" onClick={generateFeedbackWithAI}>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Generate with AI
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Provide overall feedback to the student..."
                    rows={6}
                    value={generalFeedback}
                    onChange={(e) => setGeneralFeedback(e.target.value)}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Grade Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Grade Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center py-4">
                    <div className="text-5xl font-bold text-primary">
                      {totalEarned}
                    </div>
                    <div className="text-muted-foreground">out of {totalMax}</div>
                    <div className="text-2xl font-semibold mt-2">
                      {totalMax > 0
                        ? Math.round((totalEarned / totalMax) * 100)
                        : 0}
                      %
                    </div>
                  </div>

                  <div className="progress-bar h-3">
                    <div
                      className="progress-fill"
                      style={{
                        width: `${totalMax > 0 ? (totalEarned / totalMax) * 100 : 0}%`,
                        backgroundColor:
                          totalEarned / totalMax >= 0.9
                            ? "hsl(145, 65%, 45%)"
                            : totalEarned / totalMax >= 0.7
                            ? "hsl(175, 70%, 50%)"
                            : totalEarned / totalMax >= 0.6
                            ? "hsl(35, 90%, 55%)"
                            : "hsl(0, 72%, 50%)",
                      }}
                    />
                  </div>

                  <div className="space-y-2 pt-4 border-t">
                    {rubricCriteria.map((criteria) => (
                      <div key={criteria.id} className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{criteria.name}</span>
                        <span className="font-medium">
                          {criteria.earnedPoints || 0}/{criteria.maxPoints}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Message Student
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="mr-2 h-4 w-4" />
                    View Past Submissions
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="mr-2 h-4 w-4" />
                    Export Grade Report
                  </Button>
                </CardContent>
              </Card>

              {/* Submission Status */}
              <Card>
                <CardHeader>
                  <CardTitle>Submission Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Status:</span>
                    {getStatusBadge(currentSubmission.status)}
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Submitted:</span>
                    <span className="font-medium">
                      {currentSubmission.submittedAt}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Attempt:</span>
                    <span className="font-medium">{currentSubmission.attempt}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* All Submissions Tab */}
        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>All Submissions</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Grade</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {submissions.map((submission) => (
                    <TableRow key={submission.id}>
                      <TableCell className="font-medium">
                        {submission.studentName}
                      </TableCell>
                      <TableCell>{submission.submittedAt}</TableCell>
                      <TableCell>{getStatusBadge(submission.status)}</TableCell>
                      <TableCell>
                        {submission.grade ? (
                          <span className="font-semibold">{submission.grade}%</span>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          Grade
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Submitted</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">
                  {submissions.filter((s) => s.status !== "graded").length}
                </div>
                <p className="text-sm text-muted-foreground">Pending review</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Graded</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">
                  {submissions.filter((s) => s.status === "graded").length}
                </div>
                <p className="text-sm text-muted-foreground">Completed</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Average Grade</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">85%</div>
                <p className="text-sm text-muted-foreground">Class average</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GradingInterface;
