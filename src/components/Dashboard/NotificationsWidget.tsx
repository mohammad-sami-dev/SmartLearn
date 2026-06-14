import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNotifications } from "@/contexts/NotificationContext";
import { useThemeCustomization } from "@/contexts/ThemeCustomizationContext";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { Bell, ArrowRight, CheckCheck } from "lucide-react";

const NotificationsWidget = () => {
  const { notifications, markAsRead, markAllAsRead } = useNotifications();
  const navigate = useNavigate();

  // Show only recent unread notifications (max 5)
  const recentNotifications = notifications.filter(n => !n.read).slice(0, 5);

  const handleNotificationClick = (notification: any) => {
    markAsRead(notification.id);
    if (notification.link) {
      navigate(notification.link);
    }
  };

  const getNotificationIcon = (type: string) => {
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

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "success":
        return "border-l-green-500";
      case "warning":
        return "border-l-yellow-500";
      case "error":
        return "border-l-red-500";
      case "announcement":
        return "border-l-blue-500";
      default:
        return "border-l-gray-500";
    }
  };

  const { cardStyle } = useThemeCustomization();
  const styleClass = cardStyle === "elevated" ? "shadow-sm hover:shadow-md border" : cardStyle === "outlined" ? "border border-accent/30" : "border-0 bg-transparent";

  return (
    <Card className={styleClass}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-muted-foreground" />
          <CardTitle>Recent Notifications</CardTitle>
          {recentNotifications.length > 0 && (
            <Badge variant="destructive">{recentNotifications.length}</Badge>
          )}
        </div>
        {recentNotifications.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={markAllAsRead}
            title="Mark all as read"
          >
            <CheckCheck className="h-4 w-4" />
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {recentNotifications.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Bell className="h-12 w-12 mx-auto mb-2 opacity-20" />
            <p className="text-sm">No new notifications</p>
          </div>
        ) : (
          <ScrollArea className="h-[300px] pr-4">
            <div className="space-y-3">
              {recentNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-3 border-l-4 ${getNotificationColor(notification.type)} bg-accent/50 rounded-r cursor-pointer hover:bg-accent transition-colors`}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{getNotificationIcon(notification.type)}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium text-sm truncate">
                          {notification.title}
                        </p>
                        <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                      </div>
                      <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                        {notification.message}
                      </p>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-muted-foreground">
                          {formatDistanceToNow(notification.createdAt, { addSuffix: true })}
                        </p>
                        {notification.actionText && (
                          <span className="text-xs text-primary font-medium flex items-center gap-1">
                            {notification.actionText}
                            <ArrowRight className="h-3 w-3" />
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
        {notifications.length > 5 && (
          <Button
            variant="ghost"
            className="w-full mt-4"
            onClick={() => {/* TODO: Navigate to all notifications page */}}
          >
            View all notifications
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default NotificationsWidget;
