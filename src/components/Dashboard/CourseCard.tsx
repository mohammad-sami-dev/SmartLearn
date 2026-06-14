import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Users, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface CourseCardProps {
  id: string;
  title: string;
  instructor: string;
  progress: number;
  nextClass?: string;
  enrolled: number;
  color: string;
}

export const CourseCard = ({ id, title, instructor, progress, nextClass, enrolled, color }: CourseCardProps) => {
  return (
    <Card className="card-hover overflow-hidden">
      <div className="h-2" style={{ backgroundColor: color }} />
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h3 className="font-semibold leading-none">{title}</h3>
            <p className="text-sm text-muted-foreground">{instructor}</p>
          </div>
          <Badge variant="secondary" className="ml-2">
            {progress}%
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ 
              width: `${progress}%`,
              backgroundColor: color
            }}
          />
        </div>
        
        {nextClass && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>Next class: {nextClass}</span>
          </div>
        )}
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Users className="h-4 w-4" />
          <span>{enrolled} students</span>
        </div>

        <Button asChild className="w-full" variant="outline">
          <Link to={`/dashboard/course/${id}`}>
            Continue Learning
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};
