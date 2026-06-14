import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, Clock, MapPin, Plus } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";

const CalendarPage = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const events = [
    {
      id: 1,
      title: "Advanced ML Lecture",
      course: "Advanced Machine Learning",
      time: "2:00 PM - 3:30 PM",
      location: "Room 301",
      type: "lecture",
      date: new Date(),
    },
    {
      id: 2,
      title: "DSA Lab Session",
      course: "Data Structures & Algorithms",
      time: "10:00 AM - 12:00 PM",
      location: "Computer Lab B",
      type: "lab",
      date: new Date(Date.now() + 86400000),
    },
    {
      id: 3,
      title: "Web Dev Workshop",
      course: "Web Development Fundamentals",
      time: "4:00 PM - 6:00 PM",
      location: "Room 205",
      type: "workshop",
      date: new Date(Date.now() + 86400000),
    },
    {
      id: 4,
      title: "ML Assignment Due",
      course: "Advanced Machine Learning",
      time: "11:59 PM",
      location: "Online Submission",
      type: "deadline",
      date: new Date(Date.now() + 172800000),
    },
    {
      id: 5,
      title: "Office Hours",
      course: "Data Structures & Algorithms",
      time: "3:00 PM - 5:00 PM",
      location: "Prof. Chen's Office",
      type: "office-hours",
      date: new Date(Date.now() + 259200000),
    },
  ];

  const upcomingEvents = events.sort((a, b) => a.date.getTime() - b.date.getTime());

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "lecture":
        return "bg-primary/10 text-primary border-primary/20";
      case "lab":
        return "bg-accent-hover/10 text-accent-hover border-accent-hover/20";
      case "workshop":
        return "bg-success/10 text-success border-success/20";
      case "deadline":
        return "bg-destructive/10 text-destructive border-destructive/20";
      case "office-hours":
        return "bg-warning/10 text-warning border-warning/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return "Tomorrow";
    } else {
      return date.toLocaleDateString("en-US", {
        weekday: "long",
        month: "short",
        day: "numeric",
      });
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Calendar</h1>
          <p className="text-muted-foreground">
            Manage your schedule and upcoming events
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Event
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Select Date</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
          </CardContent>
        </Card>

        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Today's Schedule</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {events
                .filter((e) => e.date.toDateString() === new Date().toDateString())
                .map((event) => (
                  <div
                    key={event.id}
                    className={`rounded-lg border p-4 ${getEventTypeColor(event.type)}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-1 flex-1">
                        <h3 className="font-medium">{event.title}</h3>
                        <p className="text-sm opacity-90">{event.course}</p>
                        <div className="flex items-center gap-4 text-sm opacity-80 mt-2">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {event.time}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {event.location}
                          </span>
                        </div>
                      </div>
                      <Badge variant="outline" className="capitalize">
                        {event.type.replace("-", " ")}
                      </Badge>
                    </div>
                  </div>
                ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingEvents.map((event) => (
                <Card key={event.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                        <CalendarIcon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">{event.title}</h3>
                          <Badge
                            variant="outline"
                            className="capitalize text-xs"
                          >
                            {event.type.replace("-", " ")}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {event.course}
                        </p>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <CalendarIcon className="h-3 w-3" />
                            {formatDate(event.date)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {event.time}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
