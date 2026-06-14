import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useAuth } from "./AuthContext";

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error" | "announcement";
  read: boolean;
  createdAt: Date;
  link?: string;
  avatar?: string;
  actionText?: string;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  deleteNotification: (id: string) => void;
  clearAll: () => void;
  addNotification: (notification: Omit<Notification, "id" | "read" | "createdAt">) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Load initial notifications (mock data for now, replace with Supabase)
  useEffect(() => {
    if (user) {
      loadNotifications();
    }
  }, [user]);

  const loadNotifications = () => {
    // Mock notifications - replace with Supabase query
    const mockNotifications: Notification[] = [
      {
        id: "1",
        title: "New Course Available",
        message: "Check out the new Advanced Machine Learning course",
        type: "info",
        read: false,
        createdAt: new Date(Date.now() - 1000 * 60 * 30), // 30 mins ago
        link: "/dashboard/catalog",
        actionText: "View Course",
      },
      {
        id: "2",
        title: "Assignment Due Soon",
        message: "Your Neural Networks assignment is due in 2 hours",
        type: "warning",
        read: false,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
        link: "/dashboard/courses",
        actionText: "Submit Now",
      },
      {
        id: "3",
        title: "Live Class Starting",
        message: "React Hooks class starts in 15 minutes",
        type: "announcement",
        read: false,
        createdAt: new Date(Date.now() - 1000 * 60 * 15), // 15 mins ago
        link: "/dashboard/live-classes",
        actionText: "Join Class",
      },
      {
        id: "4",
        title: "Grade Posted",
        message: "Your Database Systems quiz has been graded",
        type: "success",
        read: true,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
        link: "/dashboard/courses",
        actionText: "View Grade",
      },
      {
        id: "5",
        title: "Payment Failed",
        message: "Your subscription payment was unsuccessful",
        type: "error",
        read: false,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
        link: "/dashboard/settings",
        actionText: "Update Payment",
      },
    ];
    setNotifications(mockNotifications);
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
    // TODO: Update in Supabase
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    // TODO: Update all in Supabase
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    // TODO: Delete from Supabase
  };

  const clearAll = () => {
    setNotifications([]);
    // TODO: Delete all from Supabase
  };

  const addNotification = (notification: Omit<Notification, "id" | "read" | "createdAt">) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      read: false,
      createdAt: new Date(),
    };
    setNotifications((prev) => [newNotification, ...prev]);
    // TODO: Save to Supabase
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
        deleteNotification,
        clearAll,
        addNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotifications must be used within NotificationProvider");
  }
  return context;
};
