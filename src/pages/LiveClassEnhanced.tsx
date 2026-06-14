import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
  MonitorOff,
  Users,
  MessageSquare,
  Hand,
  Settings,
  PhoneOff,
  MoreVertical,
  Send,
  UserPlus,
  Copy,
  Share2,
  Info,
  Shield,
  Camera,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface Participant {
  id: string;
  name: string;
  role: "teacher" | "student";
  isHandRaised: boolean;
  isMuted: boolean;
  isVideoOff: boolean;
}

interface ChatMessage {
  id: string;
  sender: string;
  message: string;
  timestamp: Date;
  isPrivate?: boolean;
}

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

const LiveClassEnhanced = () => {
  const { classId } = useParams();
  const { toast } = useToast();
  const { profile } = useAuth();
  const jitsiContainerRef = useRef<HTMLDivElement>(null);
  const jitsiApiRef = useRef<any>(null);

  // State management
  const [isJoined, setIsJoined] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isHandRaised, setIsHandRaised] = useState(false);
  const [showChat, setShowChat] = useState(true);
  const [showParticipants, setShowParticipants] = useState(true);
  const [chatMessage, setChatMessage] = useState("");
  const [sessionEnded, setSessionEnded] = useState(false);

  const isTeacher = profile?.role === "teacher" || profile?.role === "admin";

  // Mock data - Replace with real data from Supabase
  const [session] = useState<LiveSession>({
    id: classId || "1",
    title: "Neural Networks - Live Lecture",
    course: "CS301 - Advanced Machine Learning",
    instructor: "Dr. Sarah Mitchell",
    startTime: new Date().toISOString(),
    duration: 90,
    roomId: `smartlearn-class-${classId || "001"}`,
    participants: 0,
    status: "live",
  });

  const [participants, setParticipants] = useState<Participant[]>([
    {
      id: "1",
      name: "Dr. Sarah Mitchell",
      role: "teacher",
      isHandRaised: false,
      isMuted: false,
      isVideoOff: false,
    },
  ]);

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      sender: "Dr. Sarah Mitchell",
      message: "Welcome everyone! Today we'll discuss Neural Networks.",
      timestamp: new Date(),
    },
  ]);

  // Jitsi Meet Integration
  useEffect(() => {
    if (isJoined && jitsiContainerRef.current) {
      loadJitsiScript();
    }

    return () => {
      // Cleanup Jitsi instance on unmount
      if (jitsiApiRef.current) {
        jitsiApiRef.current.dispose();
      }
    };
  }, [isJoined]);

  const loadJitsiScript = () => {
    // Check if script already loaded
    if (window.JitsiMeetExternalAPI) {
      initJitsi();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://meet.jit.si/external_api.js";
    script.async = true;
    script.onload = () => initJitsi();
    document.body.appendChild(script);
  };

  const initJitsi = () => {
    if (!jitsiContainerRef.current || jitsiApiRef.current) return;

    const domain = "meet.jit.si";
    const options = {
      roomName: session.roomId,
      width: "100%",
      height: "100%",
      parentNode: jitsiContainerRef.current,
      userInfo: {
        displayName: profile?.full_name || "User",
        email: profile?.email || "",
      },
      configOverwrite: {
        startWithAudioMuted: isMuted,
        startWithVideoMuted: isVideoOff,
        prejoinPageEnabled: false,
        enableWelcomePage: false,
        enableClosePage: false,
        disableDeepLinking: true,
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
          "filmstrip",
          "tileview",
          "settings",
        ],
        SHOW_JITSI_WATERMARK: false,
        SHOW_WATERMARK_FOR_GUESTS: false,
      },
    };

    // @ts-ignore - Jitsi API types
    jitsiApiRef.current = new window.JitsiMeetExternalAPI(domain, options);

    // Event listeners
    jitsiApiRef.current.addEventListener("videoConferenceJoined", handleConferenceJoined);
    jitsiApiRef.current.addEventListener("videoConferenceLeft", handleConferenceLeft);
    jitsiApiRef.current.addEventListener("participantJoined", handleParticipantJoined);
    jitsiApiRef.current.addEventListener("participantLeft", handleParticipantLeft);
    jitsiApiRef.current.addEventListener("audioMuteStatusChanged", handleAudioMute);
    jitsiApiRef.current.addEventListener("videoMuteStatusChanged", handleVideoMute);
  };

  const handleConferenceJoined = () => {
    toast({
      title: "✅ Joined Successfully",
      description: "You have joined the live class",
    });
    
    // Add current user to participants
    setParticipants((prev) => [
      ...prev,
      {
        id: profile?.id || "current",
        name: profile?.full_name || "You",
        role: isTeacher ? "teacher" : "student",
        isHandRaised: false,
        isMuted: isMuted,
        isVideoOff: isVideoOff,
      },
    ]);
  };

  const handleConferenceLeft = () => {
    setIsJoined(false);
    setSessionEnded(true);
    toast({
      title: "Left Class",
      description: "You have left the live class",
    });
  };

  const handleParticipantJoined = (participant: any) => {
    const newParticipant: Participant = {
      id: participant.id,
      name: participant.displayName || "Guest",
      role: "student",
      isHandRaised: false,
      isMuted: false,
      isVideoOff: false,
    };
    setParticipants((prev) => [...prev, newParticipant]);
  };

  const handleParticipantLeft = (participant: any) => {
    setParticipants((prev) => prev.filter((p) => p.id !== participant.id));
  };

  const handleAudioMute = (data: any) => {
    setIsMuted(data.muted);
  };

  const handleVideoMute = (data: any) => {
    setIsVideoOff(data.muted);
  };

  const handleJoinClass = () => {
    setIsJoined(true);
  };

  const handleLeaveClass = () => {
    if (jitsiApiRef.current) {
      jitsiApiRef.current.executeCommand("hangup");
    }
  };

  const toggleMute = () => {
    if (jitsiApiRef.current) {
      jitsiApiRef.current.executeCommand("toggleAudio");
    }
  };

  const toggleVideo = () => {
    if (jitsiApiRef.current) {
      jitsiApiRef.current.executeCommand("toggleVideo");
    }
  };

  const toggleScreenShare = () => {
    if (jitsiApiRef.current) {
      jitsiApiRef.current.executeCommand("toggleShareScreen");
      setIsScreenSharing(!isScreenSharing);
    }
  };

  const toggleRaiseHand = () => {
    setIsHandRaised(!isHandRaised);
    toast({
      title: isHandRaised ? "Hand Lowered" : "Hand Raised",
      description: isHandRaised
        ? "Your hand has been lowered"
        : "The teacher will see your raised hand",
    });
  };

  const sendChatMessage = () => {
    if (!chatMessage.trim()) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: profile?.full_name || "You",
      message: chatMessage,
      timestamp: new Date(),
    };

    setChatMessages((prev) => [...prev, newMessage]);
    setChatMessage("");

    toast({
      title: "Message Sent",
      description: "Your message has been sent to the chat",
    });
  };

  const copyRoomLink = () => {
    const link = `${window.location.origin}/dashboard/live/${session.id}`;
    navigator.clipboard.writeText(link);
    toast({
      title: "Link Copied",
      description: "Room link copied to clipboard",
    });
  };

  if (sessionEnded) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[600px] space-y-4">
        <div className="text-center space-y-2">
          <PhoneOff className="h-16 w-16 mx-auto text-muted-foreground" />
          <h2 className="text-2xl font-bold">Class Ended</h2>
          <p className="text-muted-foreground">
            The live class session has ended
          </p>
        </div>
        <Button onClick={() => window.history.back()}>Return to Dashboard</Button>
      </div>
    );
  }

  if (!isJoined) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">{session.title}</h1>
          <p className="text-muted-foreground">{session.course}</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Join Card */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Join Live Class</CardTitle>
                <Badge variant={session.status === "live" ? "default" : "secondary"}>
                  {session.status === "live" ? "🔴 Live Now" : session.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Preview Section */}
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                <div className="text-center space-y-2">
                  <Camera className="h-16 w-16 mx-auto text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Camera preview will appear here
                  </p>
                </div>
              </div>

              {/* Audio/Video Controls */}
              <div className="flex items-center justify-center gap-4">
                <Button
                  variant={isMuted ? "destructive" : "outline"}
                  size="lg"
                  onClick={() => setIsMuted(!isMuted)}
                >
                  {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                </Button>
                <Button
                  variant={isVideoOff ? "destructive" : "outline"}
                  size="lg"
                  onClick={() => setIsVideoOff(!isVideoOff)}
                >
                  {isVideoOff ? <VideoOff className="h-5 w-5" /> : <Video className="h-5 w-5" />}
                </Button>
              </div>

              {/* Join Button */}
              <Button size="lg" className="w-full" onClick={handleJoinClass}>
                <Video className="mr-2 h-5 w-5" />
                Join Class Now
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                By joining, you agree to follow class guidelines and respect all participants
              </p>
            </CardContent>
          </Card>

          {/* Session Info Card */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-5 w-5" />
                  Session Info
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-muted-foreground">Instructor</Label>
                  <p className="font-medium">{session.instructor}</p>
                </div>
                <Separator />
                <div>
                  <Label className="text-muted-foreground">Duration</Label>
                  <p className="font-medium">{session.duration} minutes</p>
                </div>
                <Separator />
                <div>
                  <Label className="text-muted-foreground">Room ID</Label>
                  <div className="flex items-center gap-2">
                    <code className="text-xs bg-muted px-2 py-1 rounded">
                      {session.roomId}
                    </code>
                    <Button size="sm" variant="ghost" onClick={copyRoomLink}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <Separator />
                <div>
                  <Label className="text-muted-foreground">Participants</Label>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <p className="font-medium">{participants.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Share Link */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Share2 className="h-5 w-5" />
                  Share
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full" onClick={copyRoomLink}>
                  <Copy className="mr-2 h-4 w-4" />
                  Copy Link
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // In-Class View
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{session.title}</h1>
          <p className="text-sm text-muted-foreground">{session.course}</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="destructive" className="animate-pulse">
            🔴 Live
          </Badge>
          <Button variant="outline" size="sm" onClick={copyRoomLink}>
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>
      </div>

      {/* Main Video Grid */}
      <div className="grid gap-4 lg:grid-cols-4">
        {/* Video Container */}
        <Card className="lg:col-span-3">
          <CardContent className="p-0">
            <div
              ref={jitsiContainerRef}
              id="jitsi-container"
              className="w-full aspect-video bg-black rounded-lg overflow-hidden"
            />
          </CardContent>
        </Card>

        {/* Sidebar - Chat & Participants */}
        <div className="space-y-4">
          <Tabs defaultValue="chat" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="chat" onClick={() => setShowChat(true)}>
                <MessageSquare className="h-4 w-4 mr-2" />
                Chat
              </TabsTrigger>
              <TabsTrigger value="participants" onClick={() => setShowParticipants(true)}>
                <Users className="h-4 w-4 mr-2" />
                People ({participants.length})
              </TabsTrigger>
            </TabsList>

            {/* Chat Tab */}
            <TabsContent value="chat" className="mt-0">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Chat</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ScrollArea className="h-[400px] pr-4">
                    <div className="space-y-4">
                      {chatMessages.map((msg) => (
                        <div key={msg.id} className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarFallback className="text-xs">
                                {msg.sender.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm font-medium">{msg.sender}</span>
                            <span className="text-xs text-muted-foreground">
                              {msg.timestamp.toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          </div>
                          <p className="text-sm pl-8">{msg.message}</p>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>

                  <div className="flex gap-2">
                    <Input
                      placeholder="Type a message..."
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && sendChatMessage()}
                    />
                    <Button size="icon" onClick={sendChatMessage}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Participants Tab */}
            <TabsContent value="participants" className="mt-0">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Participants</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[400px] pr-4">
                    <div className="space-y-2">
                      {participants.map((participant) => (
                        <div
                          key={participant.id}
                          className="flex items-center justify-between p-2 rounded-lg hover:bg-accent"
                        >
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>
                                {participant.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium">{participant.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {participant.role}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            {participant.isHandRaised && (
                              <Hand className="h-4 w-4 text-yellow-500" />
                            )}
                            {participant.isMuted && (
                              <MicOff className="h-4 w-4 text-muted-foreground" />
                            )}
                            {participant.isVideoOff && (
                              <VideoOff className="h-4 w-4 text-muted-foreground" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Control Bar */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                variant={isMuted ? "destructive" : "outline"}
                size="icon"
                onClick={toggleMute}
              >
                {isMuted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </Button>
              <Button
                variant={isVideoOff ? "destructive" : "outline"}
                size="icon"
                onClick={toggleVideo}
              >
                {isVideoOff ? <VideoOff className="h-4 w-4" /> : <Video className="h-4 w-4" />}
              </Button>
              {isTeacher && (
                <Button
                  variant={isScreenSharing ? "default" : "outline"}
                  size="icon"
                  onClick={toggleScreenShare}
                >
                  {isScreenSharing ? (
                    <MonitorOff className="h-4 w-4" />
                  ) : (
                    <Monitor className="h-4 w-4" />
                  )}
                </Button>
              )}
              <Button
                variant={isHandRaised ? "default" : "outline"}
                size="icon"
                onClick={toggleRaiseHand}
              >
                <Hand className="h-4 w-4" />
              </Button>
            </div>

            <Button variant="destructive" onClick={handleLeaveClass}>
              <PhoneOff className="h-4 w-4 mr-2" />
              Leave Class
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LiveClassEnhanced;
