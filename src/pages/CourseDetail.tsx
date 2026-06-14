import { useParams, useNavigate } from "react-router-dom";
import { useBasePath } from "@/lib/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
} from "lucide-react";

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const basePath = useBasePath();

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

  const modules = [
    {
      id: 1,
      title: "Introduction to Machine Learning",
      completed: true,
      lessons: 8,
      duration: "2 hours",
    },
    {
      id: 2,
      title: "Supervised Learning Algorithms",
      completed: true,
      lessons: 12,
      duration: "3 hours",
    },
    {
      id: 3,
      title: "Neural Networks & Deep Learning",
      completed: false,
      current: true,
      lessons: 15,
      duration: "4 hours",
    },
    {
      id: 4,
      title: "Unsupervised Learning",
      completed: false,
      lessons: 10,
      duration: "2.5 hours",
    },
    {
      id: 5,
      title: "Advanced Topics & Applications",
      completed: false,
      lessons: 8,
      duration: "2 hours",
    },
  ];

  const assignments = [
    {
      id: 1,
      title: "Neural Networks Implementation",
      dueDate: "Due in 2 days",
      status: "pending",
      points: 100,
    },
    {
      id: 2,
      title: "K-Means Clustering Project",
      dueDate: "Due in 1 week",
      status: "pending",
      points: 150,
    },
    {
      id: 3,
      title: "Linear Regression Analysis",
      dueDate: "Submitted",
      status: "graded",
      points: 100,
      grade: 95,
    },
  ];

  const materials = [
    { id: 1, name: "Course Syllabus", type: "pdf", size: "2.4 MB" },
    { id: 2, name: "Week 1-4 Slides", type: "pdf", size: "15.8 MB" },
    { id: 3, name: "Neural Networks Lecture", type: "video", size: "124 MB" },
    { id: 4, name: "Code Examples Repository", type: "zip", size: "5.2 MB" },
  ];

  return (
    <div className="space-y-6">
      <Button
        variant="ghost"
        onClick={() => navigate(`${basePath}/courses`)}
        className="mb-4"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Courses
      </Button>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <CardTitle className="text-3xl">{course.title}</CardTitle>
                  <p className="text-muted-foreground">{course.instructor}</p>
                </div>
                <Badge variant="outline" className="text-sm">
                  {course.department}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-foreground/90">{course.description}</p>
              <Separator />
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{course.enrolled} students</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{course.credits} credits</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{course.nextClass}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Overall Progress</span>
                  <span className="font-medium">{course.progress}%</span>
                </div>
                <Progress value={course.progress} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="modules" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="modules">Modules</TabsTrigger>
              <TabsTrigger value="assignments">Assignments</TabsTrigger>
              <TabsTrigger value="materials">Materials</TabsTrigger>
            </TabsList>

            <TabsContent value="modules" className="space-y-3 mt-4">
              {modules.map((module) => (
                <Card key={module.id} className={module.current ? "border-primary" : ""}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      {module.completed ? (
                        <CheckCircle2 className="h-5 w-5 text-success mt-0.5" />
                      ) : (
                        <Circle className="h-5 w-5 text-muted-foreground mt-0.5" />
                      )}
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">{module.title}</h3>
                          {module.current && (
                            <Badge variant="secondary">In Progress</Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <BookOpen className="h-3 w-3" />
                            {module.lessons} lessons
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {module.duration}
                          </span>
                        </div>
                      </div>
                      <Button size="sm" variant={module.current ? "default" : "outline"}>
                        {module.completed ? "Review" : module.current ? "Continue" : "Start"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="assignments" className="space-y-3 mt-4">
              {assignments.map((assignment) => (
                <Card key={assignment.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <h3 className="font-medium">{assignment.title}</h3>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <span>{assignment.dueDate}</span>
                          <span>•</span>
                          <span>{assignment.points} points</span>
                          {assignment.grade && (
                            <>
                              <span>•</span>
                              <span className="font-medium text-success">
                                Grade: {assignment.grade}%
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                      <Badge
                        variant={
                          assignment.status === "graded"
                            ? "default"
                            : "outline"
                        }
                      >
                        {assignment.status}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="materials" className="space-y-3 mt-4">
              {materials.map((material) => (
                <Card key={material.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {material.type === "video" ? (
                          <Video className="h-5 w-5 text-primary" />
                        ) : (
                          <FileText className="h-5 w-5 text-primary" />
                        )}
                        <div>
                          <h3 className="font-medium">{material.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {material.size}
                          </p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Schedule</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-primary mt-0.5" />
                <div className="space-y-1">
                  <p className="text-sm font-medium">Class Times</p>
                  <p className="text-sm text-muted-foreground">{course.schedule}</p>
                </div>
              </div>
              <Separator />
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-primary mt-0.5" />
                <div className="space-y-1">
                  <p className="text-sm font-medium">Next Class</p>
                  <p className="text-sm text-muted-foreground">{course.nextClass}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full justify-start" variant="outline">
                <Play className="mr-2 h-4 w-4" />
                Join Live Class
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <BookOpen className="mr-2 h-4 w-4" />
                View Syllabus
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Users className="mr-2 h-4 w-4" />
                Discussion Forum
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Instructor</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-medium">
                  SJ
                </div>
                <div>
                  <p className="font-medium">{course.instructor}</p>
                  <p className="text-sm text-muted-foreground">
                    Professor, {course.department}
                  </p>
                </div>
              </div>
              <Button className="w-full mt-4" variant="outline" size="sm">
                Send Message
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
