import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Search,
  Send,
  Paperclip,
  Smile,
  MoreVertical,
  Phone,
  Video,
  Users,
  Plus,
} from "lucide-react";
import { formatRelativeTime } from "@/lib/helpers";

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  content: string;
  timestamp: string;
  isRead: boolean;
}

interface Chat {
  id: string;
  type: "direct" | "group";
  name: string;
  avatar?: string;
  lastMessage?: string;
  lastMessageTime?: string;
  unreadCount: number;
  isOnline?: boolean;
  participants?: number;
}

const RealTimeChat = () => {
  const [selectedChat, setSelectedChat] = useState<string | null>("1");
  const [messageInput, setMessageInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const chats: Chat[] = [
    {
      id: "1",
      type: "direct",
      name: "Dr. Sarah Mitchell",
      avatar: "",
      lastMessage: "Great progress on your assignment!",
      lastMessageTime: "2024-01-20T10:30:00",
      unreadCount: 2,
      isOnline: true,
    },
    {
      id: "2",
      type: "group",
      name: "CS301 - Study Group",
      lastMessage: "Who wants to work on the project together?",
      lastMessageTime: "2024-01-20T09:15:00",
      unreadCount: 5,
      participants: 8,
    },
    {
      id: "3",
      type: "direct",
      name: "Alice Johnson",
      lastMessage: "Thanks for the notes!",
      lastMessageTime: "2024-01-19T16:45:00",
      unreadCount: 0,
      isOnline: false,
    },
    {
      id: "4",
      type: "group",
      name: "CS201 - Team Project",
      lastMessage: "Meeting at 3 PM tomorrow",
      lastMessageTime: "2024-01-19T14:20:00",
      unreadCount: 0,
      participants: 5,
    },
  ];

  const messages: Message[] = [
    {
      id: "1",
      senderId: "teacher1",
      senderName: "Dr. Sarah Mitchell",
      content: "Hi! How's your progress on the neural networks assignment?",
      timestamp: "2024-01-20T09:00:00",
      isRead: true,
    },
    {
      id: "2",
      senderId: "me",
      senderName: "Me",
      content: "Hi Dr. Mitchell! I'm making good progress. I've implemented the forward propagation.",
      timestamp: "2024-01-20T09:05:00",
      isRead: true,
    },
    {
      id: "3",
      senderId: "teacher1",
      senderName: "Dr. Sarah Mitchell",
      content: "Excellent! Have you started working on backpropagation yet?",
      timestamp: "2024-01-20T09:10:00",
      isRead: true,
    },
    {
      id: "4",
      senderId: "me",
      senderName: "Me",
      content: "Yes, I'm working on it now. I have a question about the gradient calculation.",
      timestamp: "2024-01-20T09:15:00",
      isRead: true,
    },
    {
      id: "5",
      senderId: "teacher1",
      senderName: "Dr. Sarah Mitchell",
      content: "Great progress on your assignment! Feel free to ask any questions.",
      timestamp: "2024-01-20T10:30:00",
      isRead: false,
    },
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;
    
    // TODO: Send message via WebSocket/Supabase Realtime
    setMessageInput("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const filteredChats = chats.filter((chat) =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedChatData = chats.find((chat) => chat.id === selectedChat);

  return (
    <div className="h-[calc(100vh-8rem)] flex gap-6">
      {/* Chat List Sidebar */}
      <Card className="w-80 flex flex-col">
        <CardHeader className="border-b">
          <div className="flex items-center justify-between mb-4">
            <CardTitle>Messages</CardTitle>
            <Button size="icon" variant="ghost">
              <Plus className="h-5 w-5" />
            </Button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </CardHeader>
        <ScrollArea className="flex-1">
          <div className="p-2 space-y-1">
            {filteredChats.map((chat) => (
              <div
                key={chat.id}
                className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                  selectedChat === chat.id
                    ? "bg-primary/10 border border-primary/20"
                    : "hover:bg-muted"
                }`}
                onClick={() => setSelectedChat(chat.id)}
              >
                <div className="relative">
                  <Avatar>
                    <AvatarImage src={chat.avatar} />
                    <AvatarFallback>
                      {chat.type === "group" ? (
                        <Users className="h-5 w-5" />
                      ) : (
                        chat.name.substring(0, 2).toUpperCase()
                      )}
                    </AvatarFallback>
                  </Avatar>
                  {chat.type === "direct" && chat.isOnline && (
                    <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-success border-2 border-white" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-semibold text-sm truncate">{chat.name}</p>
                    {chat.lastMessageTime && (
                      <span className="text-xs text-muted-foreground">
                        {formatRelativeTime(chat.lastMessageTime)}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground truncate">
                      {chat.lastMessage}
                    </p>
                    {chat.unreadCount > 0 && (
                      <Badge className="h-5 w-5 rounded-full p-0 flex items-center justify-center text-[10px]">
                        {chat.unreadCount}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </Card>

      {/* Chat Window */}
      <Card className="flex-1 flex flex-col">
        {selectedChatData ? (
          <>
            {/* Chat Header */}
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={selectedChatData.avatar} />
                    <AvatarFallback>
                      {selectedChatData.type === "group" ? (
                        <Users className="h-5 w-5" />
                      ) : (
                        selectedChatData.name.substring(0, 2).toUpperCase()
                      )}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{selectedChatData.name}</h3>
                    {selectedChatData.type === "direct" ? (
                      <p className="text-xs text-muted-foreground">
                        {selectedChatData.isOnline ? "Online" : "Offline"}
                      </p>
                    ) : (
                      <p className="text-xs text-muted-foreground">
                        {selectedChatData.participants} participants
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="icon" variant="ghost">
                    <Phone className="h-5 w-5" />
                  </Button>
                  <Button size="icon" variant="ghost">
                    <Video className="h-5 w-5" />
                  </Button>
                  <Button size="icon" variant="ghost">
                    <MoreVertical className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4" ref={scrollRef}>
              <div className="space-y-4">
                {messages.map((message) => {
                  const isMe = message.senderId === "me";
                  return (
                    <div
                      key={message.id}
                      className={`flex gap-3 ${isMe ? "flex-row-reverse" : ""}`}
                    >
                      {!isMe && (
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={message.senderAvatar} />
                          <AvatarFallback>
                            {message.senderName.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div
                        className={`flex flex-col ${
                          isMe ? "items-end" : "items-start"
                        } max-w-[70%]`}
                      >
                        {!isMe && (
                          <span className="text-xs font-medium mb-1">
                            {message.senderName}
                          </span>
                        )}
                        <div
                          className={`rounded-lg px-4 py-2 ${
                            isMe
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted"
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                        </div>
                        <span className="text-xs text-muted-foreground mt-1">
                          {formatRelativeTime(message.timestamp)}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="border-t p-4">
              <div className="flex items-end gap-2">
                <Button size="icon" variant="ghost">
                  <Paperclip className="h-5 w-5" />
                </Button>
                <div className="flex-1 relative">
                  <Input
                    placeholder="Type a message..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="pr-10"
                  />
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute right-0 top-0"
                  >
                    <Smile className="h-5 w-5" />
                  </Button>
                </div>
                <Button onClick={handleSendMessage} disabled={!messageInput.trim()}>
                  <Send className="h-5 w-5" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Press Enter to send, Shift + Enter for new line
              </p>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <Users className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Select a conversation</h3>
              <p className="text-sm text-muted-foreground">
                Choose a chat from the sidebar to start messaging
              </p>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default RealTimeChat;
