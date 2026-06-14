import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  Bell,
  Plus,
  Send,
  Users,
  Calendar,
  Search,
  Filter,
  Eye,
  Trash2,
  Edit,
  Copy,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { formatDistanceToNow } from "date-fns";

interface NotificationTemplate {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error" | "announcement";
  audience: string[];
  createdAt: Date;
  sentTo: number;
  status: "draft" | "scheduled" | "sent";
  scheduledFor?: Date;
}

const NotificationManagement = () => {
  const { toast } = useToast();
  const [createDialog, setCreateDialog] = useState(false);
  const [selectedAudience, setSelectedAudience] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [newNotification, setNewNotification] = useState({
    title: "",
    message: "",
    type: "info" as const,
    link: "",
    actionText: "",
    schedule: false,
    scheduledDate: "",
    scheduledTime: "",
  });

  // Mock data - Replace with Supabase
  const notificationHistory: NotificationTemplate[] = [
    {
      id: "1",
      title: "System Maintenance Scheduled",
      message: "The platform will undergo maintenance on Friday, 10 PM - 2 AM",
      type: "announcement",
      audience: ["all_students", "all_teachers"],
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
      sentTo: 1250,
      status: "sent",
    },
    {
      id: "2",
      title: "New Course Available: Advanced AI",
      message: "Enroll now in our new Advanced Artificial Intelligence course",
      type: "info",
      audience: ["all_students", "cs_department"],
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
      sentTo: 450,
      status: "sent",
    },
    {
      id: "3",
      title: "Exam Schedule Released",
      message: "Final exam schedules for Spring 2024 are now available",
      type: "warning",
      audience: ["all_students"],
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3),
      sentTo: 890,
      status: "sent",
    },
    {
      id: "4",
      title: "Faculty Meeting Reminder",
      message: "Department meeting on Monday at 3 PM in Conference Room A",
      type: "announcement",
      audience: ["all_teachers", "cs_department"],
      createdAt: new Date(Date.now() - 1000 * 60 * 30),
      sentTo: 0,
      status: "scheduled",
      scheduledFor: new Date(Date.now() + 1000 * 60 * 60 * 24),
    },
  ];

  const audienceOptions = [
    { value: "all_students", label: "All Students", count: 890 },
    { value: "all_teachers", label: "All Teachers", count: 45 },
    { value: "all_admins", label: "All Admins", count: 8 },
    { value: "cs_department", label: "Computer Science Dept", count: 320 },
    { value: "math_department", label: "Mathematics Dept", count: 180 },
    { value: "physics_department", label: "Physics Dept", count: 150 },
    { value: "first_year", label: "First Year Students", count: 250 },
    { value: "second_year", label: "Second Year Students", count: 220 },
    { value: "third_year", label: "Third Year Students", count: 200 },
    { value: "fourth_year", label: "Fourth Year Students", count: 220 },
    { value: "enrolled_cs301", label: "Enrolled in CS301", count: 45 },
    { value: "enrolled_math201", label: "Enrolled in MATH201", count: 78 },
  ];

  const toggleAudience = (value: string) => {
    setSelectedAudience((prev) =>
      prev.includes(value)
        ? prev.filter((v) => v !== value)
        : [...prev, value]
    );
  };

  const calculateTotalRecipients = () => {
    return selectedAudience.reduce((total, audienceId) => {
      const option = audienceOptions.find((o) => o.value === audienceId);
      return total + (option?.count || 0);
    }, 0);
  };

  const handleSendNotification = () => {
    if (!newNotification.title || !newNotification.message || selectedAudience.length === 0) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields and select audience",
        variant: "destructive",
      });
      return;
    }

    // TODO: Send notification via Supabase
    toast({
      title: newNotification.schedule ? "Notification Scheduled" : "Notification Sent",
      description: `Notification will be sent to ${calculateTotalRecipients()} users`,
    });

    setCreateDialog(false);
    setNewNotification({
      title: "",
      message: "",
      type: "info",
      link: "",
      actionText: "",
      schedule: false,
      scheduledDate: "",
      scheduledTime: "",
    });
    setSelectedAudience([]);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "success":
        return "✅";
      case "warning":
        return "⚠️";
      case "error":
        return "❌";
      case "announcement":
        return "📢";
      default:
        return "ℹ️";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "success":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "warning":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "error":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      case "announcement":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "sent":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "scheduled":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "draft":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Notification Management</h1>
          <p className="text-muted-foreground">
            Create and send notifications to students, teachers, and staff
          </p>
        </div>
        <Dialog open={createDialog} onOpenChange={setCreateDialog}>
          <DialogTrigger asChild>
            <Button size="lg">
              <Plus className="mr-2 h-4 w-4" />
              Create Notification
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Notification</DialogTitle>
              <DialogDescription>
                Send notifications to specific groups of users
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6 py-4">
              {/* Notification Type */}
              <div className="space-y-2">
                <Label htmlFor="type">Notification Type *</Label>
                <Select
                  value={newNotification.type}
                  onValueChange={(value: any) =>
                    setNewNotification({ ...newNotification, type: value })
                  }
                >
                  <SelectTrigger id="type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="info">ℹ️ Information</SelectItem>
                    <SelectItem value="success">✅ Success</SelectItem>
                    <SelectItem value="warning">⚠️ Warning</SelectItem>
                    <SelectItem value="error">❌ Error/Alert</SelectItem>
                    <SelectItem value="announcement">📢 Announcement</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g., System Maintenance Scheduled"
                  value={newNotification.title}
                  onChange={(e) =>
                    setNewNotification({ ...newNotification, title: e.target.value })
                  }
                />
              </div>

              {/* Message */}
              <div className="space-y-2">
                <Label htmlFor="message">Message *</Label>
                <Textarea
                  id="message"
                  placeholder="Enter your notification message..."
                  rows={4}
                  value={newNotification.message}
                  onChange={(e) =>
                    setNewNotification({ ...newNotification, message: e.target.value })
                  }
                />
                <p className="text-xs text-muted-foreground">
                  {newNotification.message.length} / 500 characters
                </p>
              </div>

              {/* Link (Optional) */}
              <div className="space-y-2">
                <Label htmlFor="link">Link (Optional)</Label>
                <Input
                  id="link"
                  placeholder="/dashboard/courses"
                  value={newNotification.link}
                  onChange={(e) =>
                    setNewNotification({ ...newNotification, link: e.target.value })
                  }
                />
                <p className="text-xs text-muted-foreground">
                  Users will be redirected here when clicking the notification
                </p>
              </div>

              {/* Action Button Text */}
              <div className="space-y-2">
                <Label htmlFor="actionText">Action Button Text (Optional)</Label>
                <Input
                  id="actionText"
                  placeholder="e.g., View Details, Enroll Now"
                  value={newNotification.actionText}
                  onChange={(e) =>
                    setNewNotification({ ...newNotification, actionText: e.target.value })
                  }
                />
              </div>

              {/* Audience Selection */}
              <div className="space-y-3">
                <Label>Select Audience *</Label>
                <div className="flex items-center gap-2 mb-2">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search audience..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1"
                  />
                </div>
                <ScrollArea className="h-[200px] rounded-md border p-4">
                  <div className="space-y-2">
                    {audienceOptions
                      .filter((option) =>
                        option.label.toLowerCase().includes(searchQuery.toLowerCase())
                      )
                      .map((option) => (
                        <div
                          key={option.value}
                          className="flex items-center justify-between p-2 rounded hover:bg-accent"
                        >
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              checked={selectedAudience.includes(option.value)}
                              onCheckedChange={() => toggleAudience(option.value)}
                            />
                            <label className="text-sm font-medium cursor-pointer">
                              {option.label}
                            </label>
                          </div>
                          <Badge variant="secondary">{option.count} users</Badge>
                        </div>
                      ))}
                  </div>
                </ScrollArea>
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <span className="text-sm font-medium">Total Recipients:</span>
                  <Badge variant="default" className="text-base">
                    {calculateTotalRecipients()} users
                  </Badge>
                </div>
              </div>

              {/* Schedule Option */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={newNotification.schedule}
                    onCheckedChange={(checked) =>
                      setNewNotification({ ...newNotification, schedule: !!checked })
                    }
                  />
                  <Label>Schedule for later</Label>
                </div>
                {newNotification.schedule && (
                  <div className="grid grid-cols-2 gap-4 pl-6">
                    <div className="space-y-2">
                      <Label htmlFor="scheduledDate">Date</Label>
                      <Input
                        id="scheduledDate"
                        type="date"
                        value={newNotification.scheduledDate}
                        onChange={(e) =>
                          setNewNotification({
                            ...newNotification,
                            scheduledDate: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="scheduledTime">Time</Label>
                      <Input
                        id="scheduledTime"
                        type="time"
                        value={newNotification.scheduledTime}
                        onChange={(e) =>
                          setNewNotification({
                            ...newNotification,
                            scheduledTime: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setCreateDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleSendNotification}>
                <Send className="mr-2 h-4 w-4" />
                {newNotification.schedule ? "Schedule Notification" : "Send Now"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                <Send className="h-6 w-6 text-blue-600 dark:text-blue-300" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {notificationHistory.filter((n) => n.status === "sent").length}
                </p>
                <p className="text-sm text-muted-foreground">Sent</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                <Calendar className="h-6 w-6 text-green-600 dark:text-green-300" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {notificationHistory.filter((n) => n.status === "scheduled").length}
                </p>
                <p className="text-sm text-muted-foreground">Scheduled</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900">
                <Users className="h-6 w-6 text-purple-600 dark:text-purple-300" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {notificationHistory.reduce((sum, n) => sum + n.sentTo, 0)}
                </p>
                <p className="text-sm text-muted-foreground">Total Delivered</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-900">
                <Bell className="h-6 w-6 text-orange-600 dark:text-orange-300" />
              </div>
              <div>
                <p className="text-2xl font-bold">{notificationHistory.length}</p>
                <p className="text-sm text-muted-foreground">Total Created</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Notification History */}
      <Card>
        <CardHeader>
          <CardTitle>Notification History</CardTitle>
          <CardDescription>View and manage all sent and scheduled notifications</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="sent">Sent</TabsTrigger>
              <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
              <TabsTrigger value="draft">Drafts</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              {notificationHistory.map((notification) => (
                <Card key={notification.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{getTypeIcon(notification.type)}</span>
                          <h3 className="font-semibold">{notification.title}</h3>
                          <Badge className={getTypeColor(notification.type)}>
                            {notification.type}
                          </Badge>
                          <Badge className={getStatusColor(notification.status)}>
                            {notification.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{notification.message}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            <span>
                              {notification.sentTo > 0
                                ? `Sent to ${notification.sentTo} users`
                                : `Target: ${notification.audience.length} groups`}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>
                              {notification.status === "scheduled" && notification.scheduledFor
                                ? `Scheduled for ${formatDistanceToNow(notification.scheduledFor, { addSuffix: true })}`
                                : formatDistanceToNow(notification.createdAt, { addSuffix: true })}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {notification.audience.map((aud) => (
                            <Badge key={aud} variant="outline" className="text-xs">
                              {audienceOptions.find((o) => o.value === aud)?.label || aud}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" title="View details">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" title="Duplicate">
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" title="Delete">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="sent" className="space-y-4">
              {notificationHistory
                .filter((n) => n.status === "sent")
                .map((notification) => (
                  <Card key={notification.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{getTypeIcon(notification.type)}</span>
                        <h3 className="font-semibold">{notification.title}</h3>
                        <Badge variant="outline">{notification.sentTo} recipients</Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </TabsContent>

            <TabsContent value="scheduled" className="space-y-4">
              {notificationHistory
                .filter((n) => n.status === "scheduled")
                .map((notification) => (
                  <Card key={notification.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{getTypeIcon(notification.type)}</span>
                        <h3 className="font-semibold">{notification.title}</h3>
                        <Badge variant="secondary">
                          {notification.scheduledFor
                            ? formatDistanceToNow(notification.scheduledFor, { addSuffix: true })
                            : "Scheduled"}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </TabsContent>

            <TabsContent value="draft" className="space-y-4">
              <div className="text-center py-12 text-muted-foreground">
                <Bell className="h-12 w-12 mx-auto mb-2 opacity-20" />
                <p>No draft notifications</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationManagement;
