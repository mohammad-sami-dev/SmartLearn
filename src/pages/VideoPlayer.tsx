import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Settings,
  FileText,
  MessageSquare,
  CheckCircle,
  Clock,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";

interface VideoModule {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
}

const VideoPlayer = () => {
  const navigate = useNavigate();
  const { videoId } = useParams();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(35);
  const [activeTab, setActiveTab] = useState("overview");

  const modules: VideoModule[] = [
    {
      id: "1",
      title: "Introduction to Neural Networks",
      duration: "12:45",
      completed: true,
    },
    {
      id: "2",
      title: "Activation Functions",
      duration: "15:30",
      completed: true,
    },
    {
      id: "3",
      title: "Forward Propagation",
      duration: "18:20",
      completed: false,
    },
    {
      id: "4",
      title: "Backpropagation Algorithm",
      duration: "22:15",
      completed: false,
    },
    {
      id: "5",
      title: "Training and Optimization",
      duration: "20:10",
      completed: false,
    },
  ];

  const notes = [
    {
      timestamp: "02:15",
      note: "Important: Remember the sigmoid function formula",
    },
    {
      timestamp: "05:40",
      note: "Key concept: Chain rule application in backpropagation",
    },
    {
      timestamp: "08:30",
      note: "Example: MNIST dataset implementation",
    },
  ];

  const transcript = [
    {
      timestamp: "00:00",
      text: "Welcome to this lecture on Forward Propagation in Neural Networks.",
    },
    {
      timestamp: "00:15",
      text: "Today we'll explore how data flows through a neural network from input to output.",
    },
    {
      timestamp: "00:30",
      text: "Let's start with a simple example using a three-layer network.",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button
        variant="ghost"
        onClick={() => navigate(-1)}
        className="mb-2"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Course
      </Button>

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Forward Propagation</h1>
          <p className="text-muted-foreground">CS301 - Advanced Machine Learning</p>
        </div>
        <Badge variant="default">Module 3 of 5</Badge>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Video Player */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardContent className="p-0">
              {/* Video Container */}
              <div className="relative aspect-video bg-black rounded-t-lg overflow-hidden">
                {/* Placeholder for video */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <Play className="h-20 w-20 text-white/80 mx-auto mb-4" />
                    <p className="text-white/80">Video Player Placeholder</p>
                    <p className="text-sm text-white/60 mt-2">
                      Integrate with YouTube, Vimeo, or custom video player
                    </p>
                  </div>
                </div>

                {/* Play/Pause Overlay */}
                <button
                  className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {!isPlaying && <Play className="h-16 w-16 text-white" />}
                </button>
              </div>

              {/* Video Controls */}
              <div className="p-4 bg-card border-t">
                <div className="space-y-3">
                  <Progress value={progress} className="h-2" />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => setIsPlaying(!isPlaying)}
                      >
                        {isPlaying ? (
                          <Pause className="h-5 w-5" />
                        ) : (
                          <Play className="h-5 w-5" />
                        )}
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => setIsMuted(!isMuted)}
                      >
                        {isMuted ? (
                          <VolumeX className="h-5 w-5" />
                        ) : (
                          <Volume2 className="h-5 w-5" />
                        )}
                      </Button>
                      <span className="text-sm text-muted-foreground">
                        6:25 / 18:20
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="icon" variant="ghost">
                        <Settings className="h-5 w-5" />
                      </Button>
                      <Button size="icon" variant="ghost">
                        <Maximize className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Video Info Tabs */}
          <Card>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <CardHeader className="border-b">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="notes">My Notes</TabsTrigger>
                  <TabsTrigger value="transcript">Transcript</TabsTrigger>
                  <TabsTrigger value="resources">Resources</TabsTrigger>
                </TabsList>
              </CardHeader>

              <CardContent className="p-6">
                <TabsContent value="overview" className="space-y-4 mt-0">
                  <div>
                    <h3 className="font-semibold mb-2">About this video</h3>
                    <p className="text-sm text-muted-foreground">
                      In this lecture, we'll explore the forward propagation algorithm
                      in neural networks. You'll learn how input data flows through
                      the network layers, how weights and biases affect the output,
                      and how activation functions transform the data at each step.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Learning objectives</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-success mt-0.5 shrink-0" />
                        <span>Understand the flow of data through neural network layers</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-success mt-0.5 shrink-0" />
                        <span>Apply activation functions at each layer</span>
                      </li>
                      <li className="flex items-start gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-success mt-0.5 shrink-0" />
                        <span>Calculate output predictions using matrix operations</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Prerequisites</h3>
                    <p className="text-sm text-muted-foreground">
                      Basic understanding of linear algebra and calculus. Completion of
                      "Introduction to Neural Networks" and "Activation Functions" modules.
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="notes" className="space-y-3 mt-0">
                  {notes.map((note, index) => (
                    <Card key={index} className="border">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <Badge variant="outline">{note.timestamp}</Badge>
                          <p className="text-sm flex-1">{note.note}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  <Button variant="outline" className="w-full">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Add Note
                  </Button>
                </TabsContent>

                <TabsContent value="transcript" className="mt-0">
                  <ScrollArea className="h-[400px]">
                    <div className="space-y-4">
                      {transcript.map((item, index) => (
                        <div key={index} className="flex gap-3">
                          <Badge variant="outline" className="shrink-0">
                            {item.timestamp}
                          </Badge>
                          <p className="text-sm">{item.text}</p>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="resources" className="space-y-3 mt-0">
                  <Card className="border">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-primary" />
                          <div>
                            <p className="font-medium text-sm">Lecture Slides</p>
                            <p className="text-xs text-muted-foreground">PDF • 2.5 MB</p>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          Download
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-primary" />
                          <div>
                            <p className="font-medium text-sm">Code Examples</p>
                            <p className="text-xs text-muted-foreground">Python • 45 KB</p>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          Download
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </CardContent>
            </Tabs>
          </Card>
        </div>

        {/* Sidebar - Module List */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Course Content</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px]">
                <div className="space-y-2">
                  {modules.map((module) => (
                    <Card
                      key={module.id}
                      className={`border cursor-pointer transition-colors ${
                        module.id === "3"
                          ? "border-primary bg-primary/5"
                          : "hover:border-primary/50"
                      }`}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div
                            className={`mt-1 flex h-8 w-8 items-center justify-center rounded-lg ${
                              module.completed
                                ? "bg-success/10"
                                : "bg-muted"
                            }`}
                          >
                            {module.completed ? (
                              <CheckCircle className="h-4 w-4 text-success" />
                            ) : (
                              <Play className="h-4 w-4 text-muted-foreground" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm mb-1 truncate">
                              {module.title}
                            </p>
                            <div className="flex items-center gap-2">
                              <Clock className="h-3 w-3 text-muted-foreground" />
                              <span className="text-xs text-muted-foreground">
                                {module.duration}
                              </span>
                            </div>
                          </div>
                          <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Your Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Completed</span>
                  <span className="font-medium">2 of 5 videos</span>
                </div>
                <Progress value={40} />
              </div>
              <Button className="w-full">Continue Learning</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
