import { CourseCard } from "@/components/Dashboard/CourseCard";
import { useNavigate } from "react-router-dom";

const Courses = () => {
  const courses = [
    {
      id: "1",
      title: "Advanced Machine Learning",
      instructor: "Dr. Sarah Johnson",
      progress: 67,
      nextClass: "Today, 2:00 PM",
      enrolled: 234,
      color: "hsl(215, 85%, 45%)",
    },
    {
      id: "2",
      title: "Data Structures & Algorithms",
      instructor: "Prof. Michael Chen",
      progress: 82,
      nextClass: "Tomorrow, 10:00 AM",
      enrolled: 312,
      color: "hsl(175, 70%, 50%)",
    },
    {
      id: "3",
      title: "Web Development Fundamentals",
      instructor: "Dr. Emily Rodriguez",
      progress: 45,
      enrolled: 289,
      color: "hsl(145, 65%, 50%)",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">My Courses</h1>
        <p className="text-muted-foreground">Continue your learning journey</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <CourseCard key={course.id} {...course} />
        ))}
      </div>
    </div>
  );
};

export default Courses;
