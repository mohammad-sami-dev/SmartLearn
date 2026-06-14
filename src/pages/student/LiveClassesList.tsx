import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Video, Calendar, Clock, Users, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface LiveClass {
  id: string;
  title: string;
  course: string;
  instructor: string;
  date: string;
  time: string;
  duration: number;
  status: "upcoming" | "live" | "completed";
  participants: number;
}

const LiveClassesList = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const liveClasses: LiveClass[] = [
    {
      id: "1",
      title: "Introduction to Neural Networks",
      course: "CS301 - Advanced Machine Learning",
      instructor: "Dr. Sarah Mitchell",
      date: "2024-01-20",
      time: "14:00",
      duration: 90,
      status: "live",
      participants: 45,
    },
    {
      id: "2",
      title: "React Hooks and State Management",
      course: "CS201 - Web Development",
      instructor: "Prof. John Davis",
      date: "2024-01-21",
      time: "10:00",
      duration: 60,
      status: "upcoming",
      participants: 0,
    },
    {
      id: "3",
      title: "Database Design Best Practices",
      course: "CS202 - Database Systems",
      instructor: "Dr. Emily Chen",
      date: "2024-01-22",
      time: "15:30",
      duration: 75,
      status: "upcoming",
      participants: 0,
    },
  ];

  const handleJoinClass = (classItem: LiveClass) => {
    if (classItem.status === "live") {
      navigate(`/dashboard/live/${classItem.id}`);
    } else {
      toast({
        title: "Class Not Started",
        description: "This class hasn't started yet.",
        variant: "destructive",
      });
    }
  };

  const liveNow = liveClasses.filter((c) => c.status === "live");
  const upcoming = liveClasses.filter((c) => c.status === "upcoming");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Live Classes</h1>
        <p className="text-muted-foreground">
          Join live sessions and view your schedule
        </p>
      </div>

      {liveNow.length > 0 && (
        <Card className="border-destructive bg-destructive/5">
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
              <Video className="h-6 w-6 text-destructive animate-pulse" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">
                {liveNow.length} class{liveNow.length > 1 ? "es" : ""} live now!
              </h3>
              <p className="text-sm text-muted-foreground">
                Don't miss out on your live classes
              </p>
            </div>
            <Button
              variant="destructive"
              onClick={() => handleJoinClass(liveNow[0])}
            >
              Join Now
            </Button>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Live Now</h2>
        {liveNow.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {liveNow.map((classItem) => (
              <Card key={classItem.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="destructive" className="animate-pulse">
                      🔴 Live Now
                    </Badge>
                    <Badge variant="outline">
                      {classItem.participants} participants
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{classItem.title}</CardTitle>
                  <CardDescription>{classItem.course}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{classItem.instructor.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">{classItem.instructor}</span>
                  </div>
                  <div className="flex gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{classItem.duration} min</span>
                    </div>
                  </div>
                  <Button
                    className="w-full"
                    onClick={() => handleJoinClass(classItem)}
                  >
                    <Video className="mr-2 h-4 w-4" />
                    Join Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Live Classes</h3>
              <p className="text-sm text-muted-foreground">
                There are no classes happening right now.
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Upcoming Classes</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {upcoming.map((classItem) => (
            <Card key={classItem.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mb-2">
                  <Badge variant="secondary">Scheduled</Badge>
                </div>
                <CardTitle className="text-lg">{classItem.title}</CardTitle>
                <CardDescription>{classItem.course}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>{classItem.instructor.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">{classItem.instructor}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(classItem.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{classItem.time}</span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => handleJoinClass(classItem)}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  Set Reminder
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LiveClassesList;
