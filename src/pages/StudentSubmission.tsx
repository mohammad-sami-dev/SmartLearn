import { useState } from "react";
import { useBasePath } from "@/lib/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Upload,
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  Download,
  Trash2,
  Send,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface PreviousSubmission {
  id: string;
  submittedAt: string;
  status: "graded" | "pending";
  grade?: number;
  feedback?: string;
  files: string[];
}

const StudentSubmission = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [textSubmission, setTextSubmission] = useState("");
  const [submissionType, setSubmissionType] = useState<"file" | "text">("file");

  const assignmentData = {
    title: "Week 3 - Neural Networks Implementation",
    course: "CS301 - Advanced Machine Learning",
    dueDate: "2024-01-20 23:59",
    maxPoints: 100,
    instructions: `
Implement a multi-layer perceptron (MLP) neural network from scratch using Python.

Requirements:
1. Implement forward propagation
2. Implement backpropagation
3. Train on the MNIST dataset
4. Achieve at least 90% accuracy on the test set
5. Include comprehensive documentation

Submission should include:
- Source code (.py files)
- Trained model weights
- Training results and visualizations
- README with instructions
    `.trim(),
    allowedAttempts: 3,
    currentAttempt: 1,
  };

  const previousSubmissions: PreviousSubmission[] = [
    {
      id: "1",
      submittedAt: "2024-01-18 14:30",
      status: "graded",
      grade: 85,
      feedback:
        "Good implementation of forward propagation. Consider improving your backpropagation algorithm for better convergence.",
      files: ["neural_network_v1.py", "results.png"],
    },
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles = Array.from(files);
      setUploadedFiles([...uploadedFiles, ...newFiles]);
      toast({
        title: "Files Added",
        description: `${newFiles.length} file(s) added to submission`,
      });
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (submissionType === "file" && uploadedFiles.length === 0) {
      toast({
        title: "No Files",
        description: "Please upload at least one file",
        variant: "destructive",
      });
      return;
    }

    if (submissionType === "text" && !textSubmission.trim()) {
      toast({
        title: "Empty Submission",
        description: "Please enter your submission text",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Submission Successful",
      description: "Your assignment has been submitted for grading",
    });

    // Navigate back to course
    setTimeout(() => {
      navigate(`${basePath}/courses`);
    }, 1500);
  };

  const isLate = new Date() > new Date(assignmentData.dueDate);
  const canSubmit = assignmentData.currentAttempt <= assignmentData.allowedAttempts;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {assignmentData.title}
          </h1>
          <p className="text-muted-foreground">{assignmentData.course}</p>
        </div>
        <Badge
          variant={isLate ? "destructive" : "default"}
          className="text-sm px-3 py-1"
        >
          {isLate ? (
            <>
              <AlertCircle className="mr-2 h-4 w-4" />
              Past Due
            </>
          ) : (
            <>
              <Clock className="mr-2 h-4 w-4" />
              Due {assignmentData.dueDate}
            </>
          )}
        </Badge>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Assignment Details */}
          <Card>
            <CardHeader>
              <CardTitle>Assignment Instructions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm max-w-none">
                <pre className="whitespace-pre-wrap text-sm">
                  {assignmentData.instructions}
                </pre>
              </div>
            </CardContent>
          </Card>

          {/* Submission */}
          {canSubmit ? (
            <Card>
              <CardHeader>
                <CardTitle>Submit Your Work</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Tabs value={submissionType} onValueChange={(v) => setSubmissionType(v as any)}>
                  <TabsList className="w-full">
                    <TabsTrigger value="file" className="flex-1">
                      <FileText className="mr-2 h-4 w-4" />
                      File Upload
                    </TabsTrigger>
                    <TabsTrigger value="text" className="flex-1">
                      <FileText className="mr-2 h-4 w-4" />
                      Text Entry
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="file" className="space-y-4">
                    <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                      <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <p className="text-sm text-muted-foreground mb-4">
                        Drag and drop files here, or click to browse
                      </p>
                      <input
                        type="file"
                        multiple
                        onChange={handleFileUpload}
                        className="hidden"
                        id="file-upload"
                      />
                      <Label htmlFor="file-upload">
                        <Button variant="outline" size="sm" asChild>
                          <span>
                            <Upload className="mr-2 h-4 w-4" />
                            Choose Files
                          </span>
                        </Button>
                      </Label>
                    </div>

                    {uploadedFiles.length > 0 && (
                      <div className="space-y-2">
                        <Label>Uploaded Files ({uploadedFiles.length})</Label>
                        {uploadedFiles.map((file, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 rounded-lg border"
                          >
                            <div className="flex items-center gap-3">
                              <FileText className="h-5 w-5 text-primary" />
                              <div>
                                <p className="font-medium text-sm">{file.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  {(file.size / 1024).toFixed(2)} KB
                                </p>
                              </div>
                            </div>
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => removeFile(index)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="text" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="text-submission">Your Submission</Label>
                      <Textarea
                        id="text-submission"
                        placeholder="Enter your submission here..."
                        rows={12}
                        value={textSubmission}
                        onChange={(e) => setTextSubmission(e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground">
                        {textSubmission.length} characters
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="flex items-center justify-between pt-4 border-t">
                  <p className="text-sm text-muted-foreground">
                    Attempt {assignmentData.currentAttempt} of{" "}
                    {assignmentData.allowedAttempts}
                  </p>
                  <Button onClick={handleSubmit}>
                    <Send className="mr-2 h-4 w-4" />
                    Submit Assignment
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <AlertCircle className="h-12 w-12 mx-auto text-warning mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  No More Attempts Available
                </h3>
                <p className="text-muted-foreground">
                  You have used all {assignmentData.allowedAttempts} attempts for
                  this assignment.
                </p>
              </CardContent>
            </Card>
          )}

          {/* Previous Submissions */}
          {previousSubmissions.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Previous Submissions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {previousSubmissions.map((submission) => (
                  <Card key={submission.id} className="border">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-medium text-sm">
                              Submitted: {submission.submittedAt}
                            </p>
                            {submission.status === "graded" ? (
                              <Badge variant="default">
                                <CheckCircle className="mr-1 h-3 w-3" />
                                Graded
                              </Badge>
                            ) : (
                              <Badge variant="secondary">
                                <Clock className="mr-1 h-3 w-3" />
                                Pending
                              </Badge>
                            )}
                          </div>
                          {submission.grade !== undefined && (
                            <p className="text-2xl font-bold text-primary">
                              {submission.grade}%
                            </p>
                          )}
                        </div>
                      </div>

                      {submission.feedback && (
                        <div className="rounded-lg bg-muted/50 p-3 mb-3">
                          <p className="text-sm font-medium mb-1">Feedback:</p>
                          <p className="text-sm text-muted-foreground">
                            {submission.feedback}
                          </p>
                        </div>
                      )}

                      <div className="space-y-2">
                        <p className="text-sm font-medium">Files:</p>
                        {submission.files.map((file, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-2 rounded border"
                          >
                            <div className="flex items-center gap-2">
                              <FileText className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">{file}</span>
                            </div>
                            <Button size="sm" variant="ghost">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Assignment Info */}
          <Card>
            <CardHeader>
              <CardTitle>Assignment Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Points:</span>
                <span className="font-medium">{assignmentData.maxPoints}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Due Date:</span>
                <span className="font-medium">{assignmentData.dueDate}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Attempts:</span>
                <span className="font-medium">
                  {assignmentData.currentAttempt} /{" "}
                  {assignmentData.allowedAttempts}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Status:</span>
                {isLate ? (
                  <Badge variant="destructive">Late</Badge>
                ) : (
                  <Badge variant="default">On Time</Badge>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Submission Tips */}
          <Card>
            <CardHeader>
              <CardTitle>Submission Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-success mt-0.5 shrink-0" />
                <p>Review requirements before submitting</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-success mt-0.5 shrink-0" />
                <p>Test your code thoroughly</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-success mt-0.5 shrink-0" />
                <p>Include all required files</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-success mt-0.5 shrink-0" />
                <p>Check file formats and size limits</p>
              </div>
            </CardContent>
          </Card>

          {/* Need Help? */}
          <Card>
            <CardHeader>
              <CardTitle>Need Help?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <FileText className="mr-2 h-4 w-4" />
                View Resources
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <FileText className="mr-2 h-4 w-4" />
                Ask AI Tutor
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <FileText className="mr-2 h-4 w-4" />
                Contact Instructor
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StudentSubmission;
