import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Send, Paperclip, MoreVertical } from "lucide-react";

const Messages = () => {
  const [selectedChat, setSelectedChat] = useState(1);
  const [messageInput, setMessageInput] = useState("");

  const conversations = [
    {
      id: "admin-support",
      name: "📧 Contact Administration",
      role: "Support",
      lastMessage: "Need help? Contact administration support team",
      time: "Available 24/7",
      unread: 0,
      avatar: "🎓",
      isAdminSupport: true,
    },
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      role: "Instructor",
      lastMessage: "Great work on your latest assignment!",
      time: "10:30 AM",
      unread: 2,
      avatar: "SJ",
    },
    {
      id: 2,
      name: "Study Group - ML",
      role: "Group",
      lastMessage: "Anyone available for study session tomorrow?",
      time: "Yesterday",
      unread: 5,
      avatar: "ML",
    },
    {
      id: 3,
      name: "Prof. Michael Chen",
      role: "Instructor",
      lastMessage: "Office hours rescheduled to 3 PM",
      time: "2 days ago",
      unread: 0,
      avatar: "MC",
    },
    {
      id: 4,
      name: "Emma Williams",
      role: "Student",
      lastMessage: "Thanks for helping with the project!",
      time: "3 days ago",
      unread: 0,
      avatar: "EW",
    },
  ];

  const messages = [
    {
      id: 1,
      sender: "Dr. Sarah Johnson",
      content: "Hi! I wanted to discuss your project proposal.",
      time: "10:15 AM",
      isOwn: false,
    },
    {
      id: 2,
      sender: "You",
      content: "Of course! I'd love to hear your feedback.",
      time: "10:18 AM",
      isOwn: true,
    },
    {
      id: 3,
      sender: "Dr. Sarah Johnson",
      content:
        "The topic is excellent. I think you should focus more on the practical implementation aspects.",
      time: "10:20 AM",
      isOwn: false,
    },
    {
      id: 4,
      sender: "You",
      content:
        "That's a great suggestion. I'll revise the proposal and add more details about the implementation.",
      time: "10:25 AM",
      isOwn: true,
    },
    {
      id: 5,
      sender: "Dr. Sarah Johnson",
      content: "Great work on your latest assignment!",
      time: "10:30 AM",
      isOwn: false,
    },
  ];

  const handleSend = () => {
    if (messageInput.trim()) {
      setMessageInput("");
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Messages</h1>
        <p className="text-muted-foreground">
          Chat with instructors and classmates
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Conversations</CardTitle>
            <div className="relative mt-4">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search messages..." className="pl-9" />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[600px]">
              {conversations.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => setSelectedChat(conv.id)}
                  className={`w-full border-b p-4 text-left transition-colors hover:bg-accent ${
                    selectedChat === conv.id ? "bg-accent" : ""
                  } ${conv.isAdminSupport ? "bg-blue-50 dark:bg-blue-950/20 border-l-4 border-l-blue-500" : ""}`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-medium text-lg ${
                      conv.isAdminSupport 
                        ? "bg-blue-500 text-white ring-2 ring-blue-500/50" 
                        : "bg-primary text-primary-foreground"
                    }`}>
                      {conv.avatar}
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-medium truncate">{conv.name}</h3>
                        <span className="text-xs text-muted-foreground">
                          {conv.time}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground truncate">
                          {conv.lastMessage}
                        </p>
                        {conv.unread > 0 && (
                          <Badge className="ml-2">{conv.unread}</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader className="border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-medium">
                  SJ
                </div>
                <div>
                  <CardTitle className="text-lg">Dr. Sarah Johnson</CardTitle>
                  <p className="text-sm text-muted-foreground">Instructor</p>
                </div>
              </div>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          <ScrollArea className="h-[480px] p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[70%] rounded-lg p-3 ${
                      message.isOwn
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    {!message.isOwn && (
                      <p className="text-xs font-medium mb-1 opacity-70">
                        {message.sender}
                      </p>
                    )}
                    <p className="text-sm">{message.content}</p>
                    <p
                      className={`text-xs mt-1 ${
                        message.isOwn ? "opacity-70" : "text-muted-foreground"
                      }`}
                    >
                      {message.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <CardContent className="border-t p-4">
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <Paperclip className="h-4 w-4" />
              </Button>
              <Input
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type a message..."
                className="flex-1"
              />
              <Button onClick={handleSend} size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Messages;
