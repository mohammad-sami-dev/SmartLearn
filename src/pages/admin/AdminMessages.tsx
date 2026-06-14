import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Send,
  Paperclip,
  MoreVertical,
  AlertCircle,
  CheckCircle,
  Clock,
  Archive,
  Flag,
  User,
} from "lucide-react";

interface SupportTicket {
  id: string;
  userName: string;
  userRole: "student" | "teacher";
  userAvatar: string;
  subject: string;
  lastMessage: string;
  time: string;
  status: "new" | "in-progress" | "resolved" | "archived";
  priority: "low" | "medium" | "high";
  unread: number;
  category: string;
}

const AdminMessages = () => {
  const [selectedTicket, setSelectedTicket] = useState<string>("1");
  const [messageInput, setMessageInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Mock support tickets - Replace with Supabase
  const supportTickets: SupportTicket[] = [
    {
      id: "1",
      userName: "John Smith",
      userRole: "student",
      userAvatar: "JS",
      subject: "Unable to access course materials",
      lastMessage: "I can't open the PDF files in CS301 course",
      time: "5 min ago",
      status: "new",
      priority: "high",
      unread: 1,
      category: "Technical Support",
    },
    {
      id: "2",
      userName: "Dr. Emily Brown",
      userRole: "teacher",
      userAvatar: "EB",
      subject: "Request for additional storage space",
      lastMessage: "Need more space for course videos",
      time: "1 hour ago",
      status: "in-progress",
      priority: "medium",
      unread: 2,
      category: "Account",
    },
    {
      id: "3",
      userName: "Sarah Johnson",
      userRole: "student",
      userAvatar: "SJ",
      subject: "Payment issue with course enrollment",
      lastMessage: "Transaction failed but amount was deducted",
      time: "2 hours ago",
      status: "new",
      priority: "high",
      unread: 1,
      category: "Billing",
    },
    {
      id: "4",
      userName: "Prof. Michael Chen",
      userRole: "teacher",
      userAvatar: "MC",
      subject: "Feature request: Quiz analytics",
      lastMessage: "Can we get detailed quiz performance reports?",
      time: "Yesterday",
      status: "in-progress",
      priority: "low",
      unread: 0,
      category: "Feature Request",
    },
    {
      id: "5",
      userName: "Emma Williams",
      userRole: "student",
      userAvatar: "EW",
      subject: "Grade correction request",
      lastMessage: "I believe there's an error in my final grade",
      time: "Yesterday",
      status: "resolved",
      priority: "medium",
      unread: 0,
      category: "Academic",
    },
    {
      id: "6",
      userName: "Tom Anderson",
      userRole: "student",
      userAvatar: "TA",
      subject: "Live class connection issues",
      lastMessage: "Video keeps freezing during live sessions",
      time: "2 days ago",
      status: "new",
      priority: "high",
      unread: 1,
      category: "Technical Support",
    },
  ];

  const messages = [
    {
      id: 1,
      sender: "user",
      text: "I can't open the PDF files in CS301 course. Every time I click, I get an error message.",
      time: "10:25 AM",
    },
    {
      id: 2,
      sender: "admin",
      text: "Thank you for reaching out. I'm looking into this issue right now. Can you tell me which browser you're using?",
      time: "10:27 AM",
    },
    {
      id: 3,
      sender: "user",
      text: "I'm using Google Chrome on Windows 10",
      time: "10:28 AM",
    },
    {
      id: 4,
      sender: "admin",
      text: "Thanks! I've identified the issue. Please try clearing your browser cache and try again. Here's how: Settings > Privacy > Clear browsing data",
      time: "10:30 AM",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      case "in-progress":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "resolved":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "archived":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
      default:
        return "";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-500";
      case "medium":
        return "text-yellow-500";
      case "low":
        return "text-green-500";
      default:
        return "";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "new":
        return <AlertCircle className="h-4 w-4" />;
      case "in-progress":
        return <Clock className="h-4 w-4" />;
      case "resolved":
        return <CheckCircle className="h-4 w-4" />;
      case "archived":
        return <Archive className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const filteredTickets = supportTickets.filter((ticket) => {
    const matchesSearch =
      ticket.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "all" || ticket.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const newTickets = supportTickets.filter((t) => t.status === "new").length;
  const inProgressTickets = supportTickets.filter((t) => t.status === "in-progress").length;
  const resolvedTickets = supportTickets.filter((t) => t.status === "resolved").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Administration Support Inbox</h1>
        <p className="text-muted-foreground">
          Manage support requests from students and teachers
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900">
                <AlertCircle className="h-6 w-6 text-red-600 dark:text-red-300" />
              </div>
              <div>
                <p className="text-2xl font-bold">{newTickets}</p>
                <p className="text-sm text-muted-foreground">New Tickets</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100 dark:bg-yellow-900">
                <Clock className="h-6 w-6 text-yellow-600 dark:text-yellow-300" />
              </div>
              <div>
                <p className="text-2xl font-bold">{inProgressTickets}</p>
                <p className="text-sm text-muted-foreground">In Progress</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-300" />
              </div>
              <div>
                <p className="text-2xl font-bold">{resolvedTickets}</p>
                <p className="text-sm text-muted-foreground">Resolved</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                <User className="h-6 w-6 text-blue-600 dark:text-blue-300" />
              </div>
              <div>
                <p className="text-2xl font-bold">{supportTickets.length}</p>
                <p className="text-sm text-muted-foreground">Total Tickets</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Messaging Interface */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Support Tickets List */}
        <Card className="lg:col-span-1">
          <CardHeader className="pb-3">
            <CardTitle>Support Tickets</CardTitle>
            <div className="flex gap-2 mt-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search tickets..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[600px]">
              {filteredTickets.map((ticket) => (
                <button
                  key={ticket.id}
                  onClick={() => setSelectedTicket(ticket.id)}
                  className={`w-full border-b p-4 text-left transition-colors hover:bg-accent ${
                    selectedTicket === ticket.id ? "bg-accent" : ""
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <Avatar>
                        <AvatarFallback>{ticket.userAvatar}</AvatarFallback>
                      </Avatar>
                      <Badge
                        variant="secondary"
                        className="absolute -bottom-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs"
                      >
                        {ticket.userRole === "student" ? "S" : "T"}
                      </Badge>
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-medium truncate">{ticket.userName}</h3>
                        <div className="flex items-center gap-1">
                          <Flag className={`h-3 w-3 ${getPriorityColor(ticket.priority)}`} />
                          <span className="text-xs text-muted-foreground">
                            {ticket.time}
                          </span>
                        </div>
                      </div>
                      <p className="font-medium text-sm truncate mb-1">{ticket.subject}</p>
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-xs text-muted-foreground truncate">
                          {ticket.lastMessage}
                        </p>
                        {ticket.unread > 0 && (
                          <Badge variant="destructive" className="ml-2">
                            {ticket.unread}
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge className={getStatusColor(ticket.status)} variant="secondary">
                          <span className="flex items-center gap-1">
                            {getStatusIcon(ticket.status)}
                            {ticket.status}
                          </span>
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {ticket.category}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Conversation Area */}
        <Card className="lg:col-span-2">
          <CardHeader className="border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback>
                    {supportTickets.find((t) => t.id === selectedTicket)?.userAvatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-lg">
                    {supportTickets.find((t) => t.id === selectedTicket)?.userName}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {supportTickets.find((t) => t.id === selectedTicket)?.subject}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Select defaultValue="in-progress">
                  <SelectTrigger className="w-[140px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[480px] p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.sender === "admin" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg p-3 ${
                        message.sender === "admin"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <p
                        className={`mt-1 text-xs ${
                          message.sender === "admin"
                            ? "text-primary-foreground/70"
                            : "text-muted-foreground"
                        }`}
                      >
                        {message.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="border-t p-4">
              <div className="flex gap-2">
                <Button variant="ghost" size="icon">
                  <Paperclip className="h-5 w-5" />
                </Button>
                <Input
                  placeholder="Type your response..."
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && messageInput.trim()) {
                      // Send message
                      setMessageInput("");
                    }
                  }}
                  className="flex-1"
                />
                <Button>
                  <Send className="h-4 w-4 mr-2" />
                  Send
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminMessages;
