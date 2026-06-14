import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Plus,
  Trash2,
  GripVertical,
  FileText,
  Video,
  Link as LinkIcon,
  Upload,
  Save,
  Eye,
  Settings,
  Users,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface Module {
  id: string;
  title: string;
  description: string;
  order: number;
  topics: Topic[];
}

interface Topic {
  id: string;
  title: string;
  type: "document" | "video" | "link" | "assignment" | "quiz";
  content: string;
  duration?: number;
  order: number;
}

const CourseBuilder = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("details");
  
  const [courseData, setCourseData] = useState({
    title: "",
    code: "",
    description: "",
    department: "",
    credits: "",
    semester: "",
    capacity: "",
    thumbnail: "",
  });

  const [modules, setModules] = useState<Module[]>([
    {
      id: "1",
      title: "Introduction to Course",
      description: "Getting started with the fundamentals",
      order: 1,
      topics: [
        {
          id: "1-1",
          title: "Welcome Video",
          type: "video",
          content: "",
          duration: 15,
          order: 1,
        },
      ],
    },
  ]);

  const [selectedModule, setSelectedModule] = useState<string>("1");

  const addModule = () => {
    const newModule: Module = {
      id: Date.now().toString(),
      title: `Module ${modules.length + 1}`,
      description: "",
      order: modules.length + 1,
      topics: [],
    };
    setModules([...modules, newModule]);
    setSelectedModule(newModule.id);
  };

  const deleteModule = (moduleId: string) => {
    setModules(modules.filter((m) => m.id !== moduleId));
    if (selectedModule === moduleId && modules.length > 1) {
      setSelectedModule(modules[0].id);
    }
  };

  const updateModule = (moduleId: string, updates: Partial<Module>) => {
    setModules(
      modules.map((m) => (m.id === moduleId ? { ...m, ...updates } : m))
    );
  };

  const addTopic = (moduleId: string, type: Topic["type"]) => {
    const module = modules.find((m) => m.id === moduleId);
    if (!module) return;

    const newTopic: Topic = {
      id: `${moduleId}-${Date.now()}`,
      title: `New ${type.charAt(0).toUpperCase() + type.slice(1)}`,
      type,
      content: "",
      order: module.topics.length + 1,
    };

    updateModule(moduleId, {
      topics: [...module.topics, newTopic],
    });
  };

  const deleteTopic = (moduleId: string, topicId: string) => {
    const module = modules.find((m) => m.id === moduleId);
    if (!module) return;

    updateModule(moduleId, {
      topics: module.topics.filter((t) => t.id !== topicId),
    });
  };

  const updateTopic = (
    moduleId: string,
    topicId: string,
    updates: Partial<Topic>
  ) => {
    const module = modules.find((m) => m.id === moduleId);
    if (!module) return;

    updateModule(moduleId, {
      topics: module.topics.map((t) => (t.id === topicId ? { ...t, ...updates } : t)),
    });
  };

  const handleSaveCourse = () => {
    toast({
      title: "Course Saved",
      description: "Your course has been saved successfully.",
    });
  };

  const handlePublishCourse = () => {
    toast({
      title: "Course Published",
      description: "Your course is now live and visible to students.",
    });
    navigate("/teacher/courses");
  };

  const currentModule = modules.find((m) => m.id === selectedModule);

  const topicIcons = {
    document: FileText,
    video: Video,
    link: LinkIcon,
    assignment: FileText,
    quiz: FileText,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Course Builder</h1>
          <p className="text-muted-foreground">
            Create and structure your course content
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Eye className="mr-2 h-4 w-4" />
            Preview
          </Button>
          <Button variant="outline" onClick={handleSaveCourse}>
            <Save className="mr-2 h-4 w-4" />
            Save Draft
          </Button>
          <Button onClick={handlePublishCourse}>
            <Upload className="mr-2 h-4 w-4" />
            Publish Course
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="details">Course Details</TabsTrigger>
          <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="enrollment">Enrollment</TabsTrigger>
        </TabsList>

        {/* Course Details Tab */}
        <TabsContent value="details" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="title">Course Title</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Introduction to Machine Learning"
                    value={courseData.title}
                    onChange={(e) =>
                      setCourseData({ ...courseData, title: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="code">Course Code</Label>
                  <Input
                    id="code"
                    placeholder="e.g., CS301"
                    value={courseData.code}
                    onChange={(e) =>
                      setCourseData({ ...courseData, code: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your course..."
                  rows={4}
                  value={courseData.description}
                  onChange={(e) =>
                    setCourseData({ ...courseData, description: e.target.value })
                  }
                />
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Select
                    value={courseData.department}
                    onValueChange={(value) =>
                      setCourseData({ ...courseData, department: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cs">Computer Science</SelectItem>
                      <SelectItem value="eng">Engineering</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                      <SelectItem value="arts">Arts & Sciences</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="credits">Credits</Label>
                  <Input
                    id="credits"
                    type="number"
                    placeholder="3"
                    value={courseData.credits}
                    onChange={(e) =>
                      setCourseData({ ...courseData, credits: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="semester">Semester</Label>
                  <Select
                    value={courseData.semester}
                    onValueChange={(value) =>
                      setCourseData({ ...courseData, semester: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select semester" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fall2024">Fall 2024</SelectItem>
                      <SelectItem value="spring2025">Spring 2025</SelectItem>
                      <SelectItem value="summer2025">Summer 2025</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="capacity">Maximum Students</Label>
                <Input
                  id="capacity"
                  type="number"
                  placeholder="50"
                  value={courseData.capacity}
                  onChange={(e) =>
                    setCourseData({ ...courseData, capacity: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="thumbnail">Course Thumbnail URL</Label>
                <Input
                  id="thumbnail"
                  placeholder="https://..."
                  value={courseData.thumbnail}
                  onChange={(e) =>
                    setCourseData({ ...courseData, thumbnail: e.target.value })
                  }
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Curriculum Tab */}
        <TabsContent value="curriculum" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Modules List */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Modules</span>
                  <Button size="sm" onClick={addModule}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {modules.map((module) => (
                  <div
                    key={module.id}
                    className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-colors ${
                      selectedModule === module.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                    onClick={() => setSelectedModule(module.id)}
                  >
                    <GripVertical className="h-4 w-4 text-muted-foreground" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">
                        {module.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {module.topics.length} topics
                      </p>
                    </div>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteModule(module.id);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Module Editor */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>
                  {currentModule ? `Edit: ${currentModule.title}` : "Select a Module"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {currentModule && (
                  <>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Module Title</Label>
                        <Input
                          value={currentModule.title}
                          onChange={(e) =>
                            updateModule(currentModule.id, {
                              title: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Module Description</Label>
                        <Textarea
                          value={currentModule.description}
                          onChange={(e) =>
                            updateModule(currentModule.id, {
                              description: e.target.value,
                            })
                          }
                          rows={2}
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label>Topics</Label>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => addTopic(currentModule.id, "document")}
                          >
                            <FileText className="mr-2 h-4 w-4" />
                            Document
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => addTopic(currentModule.id, "video")}
                          >
                            <Video className="mr-2 h-4 w-4" />
                            Video
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => addTopic(currentModule.id, "assignment")}
                          >
                            <FileText className="mr-2 h-4 w-4" />
                            Assignment
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        {currentModule.topics.map((topic) => {
                          const Icon = topicIcons[topic.type];
                          return (
                            <Card key={topic.id}>
                              <CardContent className="p-4">
                                <div className="flex items-start gap-3">
                                  <GripVertical className="mt-2 h-4 w-4 text-muted-foreground" />
                                  <div className="flex-1 space-y-3">
                                    <div className="flex items-center gap-2">
                                      <Icon className="h-4 w-4" />
                                      <Input
                                        value={topic.title}
                                        onChange={(e) =>
                                          updateTopic(
                                            currentModule.id,
                                            topic.id,
                                            { title: e.target.value }
                                          )
                                        }
                                        className="flex-1"
                                      />
                                      <Badge variant="secondary">{topic.type}</Badge>
                                    </div>
                                    {topic.type === "video" && (
                                      <div className="flex gap-2">
                                        <Input
                                          placeholder="Video URL"
                                          value={topic.content}
                                          onChange={(e) =>
                                            updateTopic(
                                              currentModule.id,
                                              topic.id,
                                              { content: e.target.value }
                                            )
                                          }
                                        />
                                        <Input
                                          type="number"
                                          placeholder="Duration (min)"
                                          value={topic.duration || ""}
                                          onChange={(e) =>
                                            updateTopic(
                                              currentModule.id,
                                              topic.id,
                                              { duration: parseInt(e.target.value) }
                                            )
                                          }
                                          className="w-32"
                                        />
                                      </div>
                                    )}
                                    {topic.type === "document" && (
                                      <Input
                                        placeholder="Document URL or upload"
                                        value={topic.content}
                                        onChange={(e) =>
                                          updateTopic(
                                            currentModule.id,
                                            topic.id,
                                            { content: e.target.value }
                                          )
                                        }
                                      />
                                    )}
                                  </div>
                                  <Button
                                    size="icon"
                                    variant="ghost"
                                    onClick={() =>
                                      deleteTopic(currentModule.id, topic.id)
                                    }
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </CardContent>
                            </Card>
                          );
                        })}
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Course Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Allow Late Submissions</p>
                  <p className="text-sm text-muted-foreground">
                    Students can submit assignments after the deadline
                  </p>
                </div>
                <Button variant="outline">Toggle</Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Enable Discussions</p>
                  <p className="text-sm text-muted-foreground">
                    Allow students to participate in course discussions
                  </p>
                </div>
                <Button variant="outline">Toggle</Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">AI Tutor Access</p>
                  <p className="text-sm text-muted-foreground">
                    Enable AI tutor for this course
                  </p>
                </div>
                <Button variant="outline">Toggle</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Enrollment Tab */}
        <TabsContent value="enrollment" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Enrollment Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Enrollment Type</Label>
                <Select defaultValue="open">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="open">Open Enrollment</SelectItem>
                    <SelectItem value="approval">Requires Approval</SelectItem>
                    <SelectItem value="invite">Invite Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Prerequisites</Label>
                <Textarea
                  placeholder="List any prerequisite courses..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CourseBuilder;
