import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, User, Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface TimetableClass {
  id: string;
  subject: string;
  instructor: string;
  time: string;
  duration: string;
  room: string;
  block: string;
  type: "lecture" | "lab" | "tutorial";
  status: "upcoming" | "ongoing" | "completed";
  color: string;
}

interface TimetableWidgetProps {
  classes: TimetableClass[];
  title?: string;
  showAll?: boolean;
}

import { useThemeCustomization } from "@/contexts/ThemeCustomizationContext";

export const TimetableWidget = ({ 
  classes, 
  title = "Today's Schedule",
  showAll = false 
}: TimetableWidgetProps) => {
  const displayClasses = showAll ? classes : classes.slice(0, 4);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ongoing":
        return "bg-green-500/10 text-green-600 border-green-500/20";
      case "upcoming":
        return "bg-blue-500/10 text-blue-600 border-blue-500/20";
      case "completed":
        return "bg-gray-500/10 text-gray-600 border-gray-500/20";
      default:
        return "bg-gray-500/10 text-gray-600 border-gray-500/20";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "lecture":
        return "bg-primary/10 text-primary";
      case "lab":
        return "bg-purple-500/10 text-purple-600";
      case "tutorial":
        return "bg-orange-500/10 text-orange-600";
      default:
        return "bg-gray-500/10 text-gray-600";
    }
  };

  const { cardStyle } = useThemeCustomization();
  const styleClass = cardStyle === "elevated" ? "shadow-sm hover:shadow-md border" : cardStyle === "outlined" ? "border border-accent/30" : "border-0 bg-transparent";

  return (
    <Card className={styleClass}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CalendarIcon className="h-5 w-5" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {displayClasses.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <CalendarIcon className="h-12 w-12 mx-auto mb-2 opacity-20" />
            <p className="text-sm">No classes scheduled for today</p>
          </div>
        ) : (
          displayClasses.map((classItem) => (
            <div
              key={classItem.id}
              className={cn(
                "rounded-lg border p-4 space-y-3 transition-all hover:shadow-md",
                classItem.status === "ongoing" && "ring-2 ring-green-500/20"
              )}
              style={{ borderLeftWidth: "4px", borderLeftColor: classItem.color }}
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-sm truncate">
                    {classItem.subject}
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge
                      variant="outline"
                      className={cn("text-xs", getTypeColor(classItem.type))}
                    >
                      {classItem.type.charAt(0).toUpperCase() + classItem.type.slice(1)}
                    </Badge>
                    <Badge
                      variant="outline"
                      className={cn("text-xs", getStatusColor(classItem.status))}
                    >
                      {classItem.status === "ongoing" && "● "}
                      {classItem.status.charAt(0).toUpperCase() + classItem.status.slice(1)}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate">{classItem.time}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="font-medium text-foreground">{classItem.duration}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate">
                    Block {classItem.block}, Room {classItem.room}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <User className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate">{classItem.instructor}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};
