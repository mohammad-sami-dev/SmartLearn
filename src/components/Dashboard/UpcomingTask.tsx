import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

interface UpcomingTaskProps {
  title: string;
  course: string;
  dueDate: string;
  type: "assignment" | "quiz" | "exam";
  priority: "high" | "medium" | "low";
}

import { useThemeCustomization } from "@/contexts/ThemeCustomizationContext";

export const UpcomingTask = ({ title, course, dueDate, type, priority }: UpcomingTaskProps) => {
  const priorityColors = {
    high: "bg-destructive/10 text-destructive border-destructive/20",
    medium: "bg-warning/10 text-warning border-warning/20",
    low: "bg-success/10 text-success border-success/20",
  };

  const typeLabels = {
    assignment: "Assignment",
    quiz: "Quiz",
    exam: "Exam",
  };

  const { cardStyle } = useThemeCustomization();
  const styleClass = cardStyle === "elevated" ? "shadow-sm hover:shadow-md border" : cardStyle === "outlined" ? "border border-accent/30" : "border-0 bg-transparent";

  return (
    <Card className={cn("card-hover", styleClass)}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="rounded-lg bg-primary/10 p-2">
            <FileText className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1 space-y-1">
            <div className="flex items-start justify-between gap-2">
              <h4 className="font-semibold leading-tight">{title}</h4>
              <Badge variant="outline" className={cn("text-xs", priorityColors[priority])}>
                {priority}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">{course}</p>
            <div className="flex items-center gap-4 pt-1">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>{dueDate}</span>
              </div>
              <Badge variant="secondary" className="text-xs">
                {typeLabels[type]}
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
