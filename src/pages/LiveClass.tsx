import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Video,
  Mic,
  MicOff,
  VideoOff,
  Monitor,
  Users,
  MessageSquare,
  Hand,
  Clock,
  Calendar,
  Plus,
  Copy,
  Share2,
  Settings,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useParams } from "react-router-dom";

interface LiveSession {
  id: string;
  title: string;
  course: string;
  instructor: string;
  startTime: string;
  duration: number;
  roomId: string;
  participants: number;
  status: "scheduled" | "live" | "ended";
}

const LiveClass = () => {
  const { classId } = useParams();
  const { toast } = useToast();
  const [isJoined, setIsJoined] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [scheduleDialog, setScheduleDialog] = useState(false);
  const [showParticipants, setShowParticipants] = useState(true);

  const [session] = useState<LiveSession>({
    id: "1",
    title: "Neural Networks - Live Lecture",
    course: "CS301 - Advanced Machine Learning",
    instructor: "Dr. Sarah Mitchell",
    startTime: "2024-01-20 14:00",
    duration: 90,
    roomId: "smartlearn-cs301-lecture-001",
    participants: 45,
    status: "live",
  });

  const [scheduleForm, setScheduleForm] = useState({
    title: "",
    course: "",
    date: "",
    time: "",
    duration: "60",
  });

  // Jitsi Meet configuration
  const jitsiDomain = "meet.jit.si";
  const roomName = session.roomId;

  useEffect(() => {
    if (isJoined) {
      loadJitsiScript();
    }
  }, [isJoined]);

  const loadJitsiScript = () => {
    // Load Jitsi Meet API script
    const script = document.createElement("script");
    script.src = "https://meet.jit.si/external_api.js";
    script.async = true;
    script.onload = () => initJitsi();
    document.body.appendChild(script);
  };

  const initJitsi = () => {
    const domain = jitsiDomain;
    const options = {
      roomName: roomName,
      width: "100%",
      height: "100%",
      parentNode: document.getElementById("jitsi-container"),
      userInfo: {
        displayName: "Student Name", // TODO: Get from auth context
      },
      configOverwrite: {
        startWithAudioMuted: isMuted,
        startWithVideoMuted: isVideoOff,
        prejoinPageEnabled: false,
      },
      interfaceConfigOverwrite: {
        TOOLBAR_BUTTONS: [
          "microphone",
          "camera",
          "closedcaptions",
          "desktop",
          "fullscreen",
          "fodeviceselection",
          "hangup",
          "chat",
          "raisehand",
          "videoquality",
          "tileview",
        ],
      },
    };

    // @ts-ignore
    const api = new window.JitsiMeetExternalAPI(domain, options);

    api.addEventListener("videoConferenceJoined", () => {
      toast({
        title: "Joined Class",
        description: "You have successfully joined the live class",
      });
    });

    api.addEventListener("videoConferenceLeft", () => {
      setIsJoined(false);
      toast({
        title: "Left Class",
        description: "You have left the live class",
      });
    });
  };

  const handleJoinClass = () => {
    setIsJoined(true);
    toast({
      title: "Joining Class",
      description: "Loading live class room...",
    });
  };

  const handleScheduleClass = () => {
    if (!scheduleForm.title || !scheduleForm.date || !scheduleForm.time) {
      toast({
        title: "Missing Information",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Class Scheduled",
      description: "Students will receive notifications",
    });
    setScheduleDialog(false);
    setScheduleForm({ title: "", course: "", date: "", time: "", duration: "60" });
  };

  const copyRoomLink = () => {
    const link = `${window.location.origin}/live/${session.id}`;
    navigator.clipboard.writeText(link);
    toast({
      title: "Link Copied",
      description: "Class link copied to clipboard",
    });
  };

  if (!isJoined) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Live Classes</h1>
            <p className="text-muted-foreground">
              Join or schedule live video classes
            </p>
          </div>
          <Button onClick={() => setScheduleDialog(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Schedule Class
          </Button>
        </div>

        {/* Pre-Join Screen */}
        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Join Live Class</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Session Info */}
              <div className="rounded-lg border border-border bg-muted/30 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">{session.title}</h2>
                    <p className="text-muted-foreground mb-4">{session.course}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>{session.participants} participants</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{session.duration} minutes</span>
                      </div>
                    </div>
                  </div>
                  <Badge
                    variant="default"
                    className="bg-success animate-pulse"
                  >
                    LIVE
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Instructor:</span>
                  <span className="font-medium">{session.instructor}</span>
                </div>
              </div>

              {/* Device Settings */}
              <div className="space-y-4">
                <h3 className="font-semibold">Setup</h3>
                <div className="flex items-center justify-between p-4 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <Mic className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Microphone</p>
                      <p className="text-sm text-muted-foreground">
                        {isMuted ? "Muted" : "Active"}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant={isMuted ? "destructive" : "outline"}
                    size="sm"
                    onClick={() => setIsMuted(!isMuted)}
                  >
                    {isMuted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <Video className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Camera</p>
                      <p className="text-sm text-muted-foreground">
                        {isVideoOff ? "Off" : "On"}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant={isVideoOff ? "destructive" : "outline"}
                    size="sm"
                    onClick={() => setIsVideoOff(!isVideoOff)}
                  >
                    {isVideoOff ? <VideoOff className="h-4 w-4" /> : <Video className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              {/* Join Button */}
              <Button size="lg" className="w-full" onClick={handleJoinClass}>
                <Video className="mr-2 h-5 w-5" />
                Join Class Now
              </Button>
            </CardContent>
          </Card>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Class Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Start Time:</span>
                  <span className="font-medium">{session.startTime}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Duration:</span>
                  <span className="font-medium">{session.duration} min</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Room ID:</span>
                  <span className="font-mono text-xs">{session.roomId}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Share</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full" onClick={copyRoomLink}>
                  <Copy className="mr-2 h-4 w-4" />
                  Copy Link
                </Button>
                <Button variant="outline" className="w-full">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Class Guidelines</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Join with mic muted initially</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Use raise hand to ask questions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Use chat for quick queries</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Be respectful and professional</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Schedule Dialog */}
        <Dialog open={scheduleDialog} onOpenChange={setScheduleDialog}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Schedule Live Class</DialogTitle>
              <DialogDescription>
                Create a new live video class session
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Class Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g., Neural Networks Lecture"
                  value={scheduleForm.title}
                  onChange={(e) =>
                    setScheduleForm({ ...scheduleForm, title: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="course">Course *</Label>
                <Input
                  id="course"
                  placeholder="e.g., CS301"
                  value={scheduleForm.course}
                  onChange={(e) =>
                    setScheduleForm({ ...scheduleForm, course: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="date">Date *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={scheduleForm.date}
                    onChange={(e) =>
                      setScheduleForm({ ...scheduleForm, date: e.target.value })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="time">Time *</Label>
                  <Input
                    id="time"
                    type="time"
                    value={scheduleForm.time}
                    onChange={(e) =>
                      setScheduleForm({ ...scheduleForm, time: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="duration">Duration (minutes)</Label>
                <Input
                  id="duration"
                  type="number"
                  value={scheduleForm.duration}
                  onChange={(e) =>
                    setScheduleForm({ ...scheduleForm, duration: e.target.value })
                  }
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setScheduleDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleScheduleClass}>
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Class
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  // In-Class View (with Jitsi)
  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      {/* Jitsi Meet Container */}
      <div id="jitsi-container" className="flex-1 bg-black" />
    </div>
  );
};

export default LiveClass;
