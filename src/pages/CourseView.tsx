import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  BookOpen,
  Clock,
  Calendar,
  Users,
  FileText,
  Video,
  CheckCircle2,
  Circle,
  Download,
  Play,
  Upload,
  MessageSquare,
  Award,
  BarChart,
  Send,
  File,
  Paperclip,
  ExternalLink,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";

const CourseView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [assignmentText, setAssignmentText] = useState("");
  const [discussionMessage, setDiscussionMessage] = useState("");

  // Course data
  const course = {
    id,
    title: "Advanced Machine Learning",
    instructor: "Dr. Sarah Johnson",
    department: "Computer Science",
    description:
      "Deep dive into machine learning algorithms, neural networks, and practical applications. This comprehensive course covers supervised and unsupervised learning, deep learning architectures, and real-world implementation strategies.",
    progress: 67,
    enrolled: 234,
    credits: 4,
    schedule: "Mon, Wed, Fri • 2:00 PM - 3:30 PM",
    nextClass: "Today, 2:00 PM",
    color: "hsl(215, 85%, 45%)",
  };

  return (
    <div className="space-y-6">
      {/* Header with Back Button */}
      <Button
        variant="ghost"
        onClick={() => navigate("/dashboard")}
        className="mb-4"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Dashboard
      </Button>

      {/* Course Header */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start justify-between gap-3">
            <div className="space-y-2 flex-1">
              <CardTitle className="text-2xl sm:text-3xl">{course.title}</CardTitle>
              <p className="text-muted-foreground flex items-center gap-2 text-sm">
                <Users className="h-4 w-4" />
                {course.instructor} • {course.enrolled} students enrolled
              </p>
            </div>
            <Badge variant="outline" className="text-sm">
              {course.department}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-foreground/90 text-sm sm:text-base">{course.description}</p>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Overall Progress</span>
              <span className="font-medium">{course.progress}%</span>
            </div>
            <Progress value={course.progress} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Main Tabbed Content */}
      <Tabs defaultValue="lessons" className="w-full">
        <TabsList className="grid w-full grid-cols-3 sm:grid-cols-6 gap-1">
          <TabsTrigger value="lessons" className="text-xs sm:text-sm">Lessons</TabsTrigger>
          <TabsTrigger value="assignments" className="text-xs sm:text-sm">Assignments</TabsTrigger>
          <TabsTrigger value="quizzes" className="text-xs sm:text-sm">Quizzes</TabsTrigger>
          <TabsTrigger value="materials" className="text-xs sm:text-sm">Materials</TabsTrigger>
          <TabsTrigger value="discussion" className="text-xs sm:text-sm">Discussion</TabsTrigger>
          <TabsTrigger value="grades" className="text-xs sm:text-sm">Grades</TabsTrigger>
        </TabsList>

        {/* Lessons Tab */}
        <TabsContent value="lessons" className="space-y-4 mt-6">
          <div className="grid gap-4">
            {[
              {
                id: 1,
                title: "Introduction to Neural Networks",
                duration: "45 mins",
                completed: true,
                type: "video",
              },
              {
                id: 2,
                title: "Backpropagation Fundamentals",
                duration: "1 hour",
                completed: true,
                type: "video",
              },
              {
                id: 3,
                title: "Deep Learning Architectures",
                duration: "1.5 hours",
                completed: false,
                current: true,
                type: "video",
              },
              {
                id: 4,
                title: "CNN Implementation",
                duration: "2 hours",
                completed: false,
                type: "video",
              },
              {
                id: 5,
                title: "RNN and LSTM Networks",
                duration: "1.5 hours",
                completed: false,
                type: "video",
              },
            ].map((lesson) => (
              <Card key={lesson.id} className={lesson.current ? "border-primary shadow-sm" : ""}>
                <CardContent className="p-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 shrink-0">
                      {lesson.completed ? (
                        <CheckCircle2 className="h-6 w-6 text-success" />
                      ) : (
                        <Play className="h-6 w-6 text-primary" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm sm:text-base">{lesson.title}</h3>
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-muted-foreground mt-1">
                        <span className="flex items-center gap-1">
                          <Video className="h-3 w-3" />
                          Video Lesson
                        </span>
                        <span className="hidden sm:inline">•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {lesson.duration}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      {lesson.current && <Badge className="text-xs">In Progress</Badge>}
                      <Button 
                        className="flex-1 sm:flex-none"
                        size="sm"
                        onClick={() => {
                          toast({
                            title: "Opening Video Player",
                            description: `Starting: ${lesson.title}`,
                          });
                          navigate(`/dashboard/video/${lesson.id}`);
                        }}
                      >
                        {lesson.completed ? "Review" : "Watch"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Assignments Tab */}
        <TabsContent value="assignments" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Assignment Submission</CardTitle>
              <CardDescription>Upload your completed assignments here</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                {
                  id: 1,
                  title: "Neural Networks Implementation",
                  dueDate: "Due in 2 days",
                  status: "pending",
                  points: 100,
                  description: "Implement a basic neural network from scratch using NumPy. Include forward and backward propagation.",
                },
                {
                  id: 2,
                  title: "K-Means Clustering Project",
                  dueDate: "Due in 1 week",
                  status: "pending",
                  points: 150,
                  description: "Apply K-means clustering on the provided dataset and visualize the results.",
                },
                {
                  id: 3,
                  title: "Linear Regression Analysis",
                  dueDate: "Submitted on Nov 15",
                  status: "graded",
                  points: 100,
                  grade: 95,
                  description: "Statistical analysis and implementation of linear regression.",
                },
              ].map((assignment) => (
                <Card key={assignment.id} className={assignment.status === "pending" ? "border-orange-500/50" : ""}>
                  <CardContent className="p-4 sm:p-6 space-y-4">
                    <div className="flex flex-col sm:flex-row items-start justify-between gap-3">
                      <div className="space-y-2 flex-1 w-full">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                          <h3 className="text-base sm:text-lg font-semibold">{assignment.title}</h3>
                          <Badge variant={assignment.status === "graded" ? "default" : assignment.status === "pending" ? "destructive" : "secondary"} className="w-fit">
                            {assignment.status}
                          </Badge>
                        </div>
                        <p className="text-xs sm:text-sm text-muted-foreground">{assignment.description}</p>
                        <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm">
                          <span className="flex items-center gap-1 text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            {assignment.dueDate}
                          </span>
                          <span className="flex items-center gap-1 text-muted-foreground">
                            <Award className="h-3 w-3" />
                            {assignment.points} points
                          </span>
                          {assignment.grade && (
                            <span className="flex items-center gap-1 font-medium text-success">
                              <CheckCircle2 className="h-3 w-3" />
                              Grade: {assignment.grade}/{assignment.points}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {assignment.status === "pending" && (
                      <div className="space-y-4 pt-4 border-t">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Assignment Text</label>
                          <Textarea
                            placeholder="Type your assignment answer here or upload a file below..."
                            value={assignmentText}
                            onChange={(e) => setAssignmentText(e.target.value)}
                            className="min-h-[100px]"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Upload File</label>
                          <div className="flex items-center gap-2">
                            <Input
                              type="file"
                              onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                  setSelectedFile(e.target.files[0]);
                                  toast({
                                    title: "File Selected",
                                    description: `${e.target.files[0].name} ready to upload`,
                                  });
                                }
                              }}
                              className="flex-1"
                            />
                            <Button
                              onClick={() => {
                                if (selectedFile || assignmentText) {
                                  toast({
                                    title: "Assignment Submitted!",
                                    description: "Your assignment has been submitted successfully.",
                                  });
                                  setSelectedFile(null);
                                  setAssignmentText("");
                                } else {
                                  toast({
                                    title: "No Content",
                                    description: "Please add text or select a file to submit.",
                                    variant: "destructive",
                                  });
                                }
                              }}
                            >
                              <Upload className="mr-2 h-4 w-4" />
                              Submit
                            </Button>
                          </div>
                          {selectedFile && (
                            <p className="text-sm text-muted-foreground flex items-center gap-2">
                              <Paperclip className="h-3 w-3" />
                              {selectedFile.name}
                            </p>
                          )}
                        </div>
                      </div>
                    )}

                    {assignment.status === "graded" && (
                      <Button variant="outline" className="w-full">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        View Feedback & Grade
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Quizzes Tab */}
        <TabsContent value="quizzes" className="space-y-4 mt-6">
          <div className="grid gap-4">
            {[
              {
                id: 1,
                title: "Neural Networks Basics Quiz",
                questions: 10,
                duration: "15 mins",
                attempts: 2,
                bestScore: 85,
                status: "completed",
              },
              {
                id: 2,
                title: "Deep Learning Concepts",
                questions: 15,
                duration: "20 mins",
                attempts: 0,
                status: "available",
              },
              {
                id: 3,
                title: "Midterm Assessment",
                questions: 25,
                duration: "45 mins",
                attempts: 0,
                status: "locked",
                unlockDate: "Nov 30, 2024",
              },
            ].map((quiz) => (
              <Card key={quiz.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-3 flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold">{quiz.title}</h3>
                        {quiz.status === "completed" && (
                          <Badge variant="default">Completed</Badge>
                        )}
                        {quiz.status === "locked" && (
                          <Badge variant="secondary">Locked</Badge>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <FileText className="h-3 w-3" />
                          {quiz.questions} questions
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {quiz.duration}
                        </span>
                        {quiz.attempts > 0 && (
                          <>
                            <span>•</span>
                            <span>Attempts: {quiz.attempts}</span>
                          </>
                        )}
                      </div>

                      {quiz.bestScore && (
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">Best Score:</span>
                          <span className="text-lg font-semibold text-success">{quiz.bestScore}%</span>
                        </div>
                      )}

                      {quiz.status === "locked" && (
                        <p className="text-sm text-muted-foreground">
                          Unlocks on {quiz.unlockDate}
                        </p>
                      )}
                    </div>

                    <Button
                      disabled={quiz.status === "locked"}
                      onClick={() => {
                        toast({
                          title: "Starting Quiz",
                          description: `Opening: ${quiz.title}`,
                        });
                      }}
                    >
                      {quiz.status === "completed" ? "Retake" : quiz.status === "locked" ? "Locked" : "Start Quiz"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Materials Tab */}
        <TabsContent value="materials" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Course Materials</CardTitle>
              <CardDescription>Download lecture notes, slides, and supplementary materials</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { id: 1, name: "Course Syllabus", type: "pdf", size: "2.4 MB", downloads: 234 },
                { id: 2, name: "Week 1-4 Slides", type: "pdf", size: "15.8 MB", downloads: 198 },
                { id: 3, name: "Neural Networks Lecture Recording", type: "video", size: "124 MB", downloads: 156 },
                { id: 4, name: "Code Examples Repository", type: "zip", size: "5.2 MB", downloads: 187 },
                { id: 5, name: "Research Paper: Deep Learning", type: "pdf", size: "3.1 MB", downloads: 142 },
                { id: 6, name: "Dataset - Image Classification", type: "zip", size: "45 MB", downloads: 134 },
              ].map((material) => (
                <Card key={material.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {material.type === "video" ? (
                          <Video className="h-5 w-5 text-primary" />
                        ) : material.type === "zip" ? (
                          <File className="h-5 w-5 text-primary" />
                        ) : (
                          <FileText className="h-5 w-5 text-primary" />
                        )}
                        <div>
                          <h3 className="font-medium">{material.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {material.size} • {material.downloads} downloads
                          </p>
                        </div>
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => {
                          toast({
                            title: "Downloading...",
                            description: `${material.name} download started`,
                          });
                        }}
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Discussion Tab */}
        <TabsContent value="discussion" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Course Discussion Forum</CardTitle>
              <CardDescription>Ask questions and discuss with classmates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Textarea
                  placeholder="Ask a question or start a discussion..."
                  value={discussionMessage}
                  onChange={(e) => setDiscussionMessage(e.target.value)}
                  className="min-h-[100px]"
                />
                <Button 
                  className="w-full"
                  onClick={() => {
                    if (discussionMessage.trim()) {
                      toast({
                        title: "Posted!",
                        description: "Your message has been posted to the forum.",
                      });
                      setDiscussionMessage("");
                    }
                  }}
                >
                  <Send className="mr-2 h-4 w-4" />
                  Post Message
                </Button>
              </div>

              <Separator />

              <ScrollArea className="h-[500px] pr-4">
                <div className="space-y-4">
                  {[
                    {
                      id: 1,
                      author: "John Doe",
                      avatar: "JD",
                      message: "Can someone explain the vanishing gradient problem in RNNs?",
                      replies: 3,
                      likes: 12,
                      time: "2 hours ago",
                    },
                    {
                      id: 2,
                      author: "Sarah Smith",
                      avatar: "SS",
                      message: "The assignment deadline - is it extended? I saw an announcement.",
                      replies: 7,
                      likes: 8,
                      time: "5 hours ago",
                    },
                    {
                      id: 3,
                      author: "Mike Johnson",
                      avatar: "MJ",
                      message: "Great lecture today! The CNN visualization really helped me understand the concept better.",
                      replies: 2,
                      likes: 24,
                      time: "1 day ago",
                    },
                  ].map((post) => (
                    <Card key={post.id}>
                      <CardContent className="p-4 space-y-3">
                        <div className="flex items-start gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-medium">
                            {post.avatar}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium">{post.author}</h4>
                              <span className="text-sm text-muted-foreground">{post.time}</span>
                            </div>
                            <p className="mt-1 text-sm">{post.message}</p>
                            <div className="flex items-center gap-4 mt-3">
                              <Button variant="ghost" size="sm">
                                <MessageSquare className="mr-1 h-3 w-3" />
                                {post.replies} replies
                              </Button>
                              <Button variant="ghost" size="sm">
                                👍 {post.likes}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Grades Tab */}
        <TabsContent value="grades" className="space-y-4 mt-6">
          <div className="grid gap-4 sm:gap-6 grid-cols-2 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-xs sm:text-sm font-medium">Overall Grade</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl sm:text-3xl font-bold text-success">92%</div>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">A- Grade</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-xs sm:text-sm font-medium">Assignments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl sm:text-3xl font-bold">88%</div>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">5 of 6 completed</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Quizzes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">95%</div>
                <p className="text-sm text-muted-foreground mt-1">8 of 10 completed</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Grade Breakdown</CardTitle>
              <CardDescription>Detailed view of your performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { category: "Assignments", weight: 40, score: 88, color: "hsl(215, 85%, 45%)" },
                  { category: "Quizzes", weight: 30, score: 95, color: "hsl(175, 70%, 50%)" },
                  { category: "Midterm", weight: 15, score: 92, color: "hsl(145, 65%, 50%)" },
                  { category: "Final Project", weight: 15, score: 0, color: "hsl(0, 0%, 50%)" },
                ].map((item) => (
                  <div key={item.category} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{item.category} ({item.weight}%)</span>
                      <span className="font-semibold">{item.score > 0 ? `${item.score}%` : "Pending"}</span>
                    </div>
                    <Progress value={item.score} className="h-2" />
                  </div>
                ))}
              </div>

              <Separator className="my-6" />

              <div className="space-y-3">
                <h4 className="font-semibold">Recent Grades</h4>
                {[
                  { name: "Neural Networks Quiz", grade: 95, maxGrade: 100, date: "Nov 20" },
                  { name: "Assignment #3", grade: 88, maxGrade: 100, date: "Nov 15" },
                  { name: "Midterm Exam", grade: 92, maxGrade: 100, date: "Nov 10" },
                ].map((grade, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-lg border">
                    <div>
                      <p className="font-medium">{grade.name}</p>
                      <p className="text-sm text-muted-foreground">{grade.date}</p>
                    </div>
                    <Badge variant={grade.grade >= 90 ? "default" : "secondary"}>
                      {grade.grade}/{grade.maxGrade}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Quick Access Sidebar - Fixed on Right */}
      <div className="fixed right-8 top-24 w-64 space-y-4 hidden xl:block">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button 
              className="w-full justify-start" 
              variant="outline"
              onClick={() => navigate(`/dashboard/live/${id}`)}
            >
              <Play className="mr-2 h-4 w-4" />
              Join Live Class
            </Button>
            <Button 
              className="w-full justify-start" 
              variant="outline"
              onClick={() => navigate("/dashboard/ai-tutor")}
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              Ask AI Tutor
            </Button>
            <Button 
              className="w-full justify-start" 
              variant="outline"
              onClick={() => navigate("/dashboard/messages")}
            >
              <Users className="mr-2 h-4 w-4" />
              Message Instructor
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Instructor</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-medium">
                SJ
              </div>
              <div>
                <p className="font-medium text-sm">{course.instructor}</p>
                <p className="text-xs text-muted-foreground">Professor</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CourseView;
