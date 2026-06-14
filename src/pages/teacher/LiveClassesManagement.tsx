import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Video,
  Plus,
  Calendar,
  Clock,
  Copy,
  PlayCircle,
  Edit,
  Trash2,
  Users,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface LiveSession {
  id: string;
  title: string;
  course: string;
  date: string;
  time: string;
  duration: number;
  status: "scheduled" | "live" | "completed";
  participants: number;
  maxParticipants: number;
}

const LiveClassesManagement = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [createDialog, setCreateDialog] = useState(false);
  const [newSession, setNewSession] = useState({
    title: "",
    course: "",
    date: "",
    time: "",
    duration: "60",
    maxParticipants: "50",
    description: "",
  });

  const sessions: LiveSession[] = [
    {
      id: "1",
      title: "Introduction to Neural Networks",
      course: "CS301 - Advanced Machine Learning",
      date: "2024-01-20",
      time: "14:00",
      duration: 90,
      status: "live",
      participants: 45,
      maxParticipants: 50,
    },
    {
      id: "2",
      title: "React Hooks Deep Dive",
      course: "CS201 - Web Development",
      date: "2024-01-22",
      time: "10:00",
      duration: 60,
      status: "scheduled",
      participants: 0,
      maxParticipants: 40,
    },
  ];

  const handleCreateSession = () => {
    toast({
      title: "Session Created",
      description: `Live class "${newSession.title}" has been scheduled.`,
    });
    setCreateDialog(false);
    setNewSession({
      title: "",
      course: "",
      date: "",
      time: "",
      duration: "60",
      maxParticipants: "50",
      description: "",
    });
  };

  const handleStartSession = (session: LiveSession) => {
    navigate(`/teacher/live/${session.id}`);
  };

  const handleCopyLink = (sessionId: string) => {
    const link = `${window.location.origin}/dashboard/live/${sessionId}`;
    navigator.clipboard.writeText(link);
    toast({
      title: "Link Copied",
      description: "Class link copied to clipboard.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Live Classes</h1>
          <p className="text-muted-foreground">
            Create and manage your live class sessions
          </p>
        </div>
        <Dialog open={createDialog} onOpenChange={setCreateDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Session
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create Live Class Session</DialogTitle>
              <DialogDescription>
                Schedule a new live class session
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Session Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., Introduction to Neural Networks"
                  value={newSession.title}
                  onChange={(e) =>
                    setNewSession({ ...newSession, title: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="course">Course</Label>
                <Select
                  value={newSession.course}
                  onValueChange={(value) =>
                    setNewSession({ ...newSession, course: value })
                  }
                >
                  <SelectTrigger id="course">
                    <SelectValue placeholder="Select course" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CS301">CS301 - Advanced ML</SelectItem>
                    <SelectItem value="CS201">CS201 - Web Dev</SelectItem>
                    <SelectItem value="CS202">CS202 - Database</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={newSession.date}
                    onChange={(e) =>
                      setNewSession({ ...newSession, date: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={newSession.time}
                    onChange={(e) =>
                      setNewSession({ ...newSession, time: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration (minutes)</Label>
                  <Select
                    value={newSession.duration}
                    onValueChange={(value) =>
                      setNewSession({ ...newSession, duration: value })
                    }
                  >
                    <SelectTrigger id="duration">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="45">45 minutes</SelectItem>
                      <SelectItem value="60">60 minutes</SelectItem>
                      <SelectItem value="90">90 minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxParticipants">Max Participants</Label>
                  <Input
                    id="maxParticipants"
                    type="number"
                    min="1"
                    value={newSession.maxParticipants}
                    onChange={(e) =>
                      setNewSession({
                        ...newSession,
                        maxParticipants: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Brief description..."
                  rows={3}
                  value={newSession.description}
                  onChange={(e) =>
                    setNewSession({ ...newSession, description: e.target.value })
                  }
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setCreateDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateSession}>Create Session</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {sessions.map((session) => (
          <Card key={session.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {session.status === "live" ? (
                      <Badge variant="destructive" className="animate-pulse">
                        🔴 Live Now
                      </Badge>
                    ) : (
                      <Badge variant="secondary">Scheduled</Badge>
                    )}
                    <Badge variant="outline">
                      {session.participants}/{session.maxParticipants}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{session.title}</CardTitle>
                  <CardDescription>{session.course}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(session.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>
                    {session.time} ({session.duration} min)
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                {session.status === "live" ? (
                  <Button
                    className="flex-1"
                    onClick={() => handleStartSession(session)}
                  >
                    <Video className="mr-2 h-4 w-4" />
                    Join Class
                  </Button>
                ) : (
                  <Button
                    className="flex-1"
                    onClick={() => handleStartSession(session)}
                  >
                    <PlayCircle className="mr-2 h-4 w-4" />
                    Start Class
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleCopyLink(session.id)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Video className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{sessions.length}</p>
                <p className="text-sm text-muted-foreground">Total Sessions</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
                <PlayCircle className="h-6 w-6 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {sessions.filter((s) => s.status === "live").length}
                </p>
                <p className="text-sm text-muted-foreground">Live Now</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary/10">
                <Calendar className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {sessions.filter((s) => s.status === "scheduled").length}
                </p>
                <p className="text-sm text-muted-foreground">Scheduled</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-success/10">
                <Users className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {sessions.reduce((acc, s) => acc + s.participants, 0)}
                </p>
                <p className="text-sm text-muted-foreground">Participants</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LiveClassesManagement;
