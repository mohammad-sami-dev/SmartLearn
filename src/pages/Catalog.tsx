import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Users, Clock, BookOpen, Star } from "lucide-react";

const Catalog = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const courses = [
    {
      id: "1",
      title: "Advanced Machine Learning",
      instructor: "Dr. Sarah Johnson",
      department: "Computer Science",
      description: "Deep dive into ML algorithms and neural networks",
      enrolled: 234,
      rating: 4.8,
      credits: 4,
      level: "Advanced",
      isEnrolled: true,
    },
    {
      id: "2",
      title: "Quantum Computing Fundamentals",
      instructor: "Prof. David Liu",
      department: "Physics",
      description: "Introduction to quantum mechanics and computing principles",
      enrolled: 156,
      rating: 4.7,
      credits: 3,
      level: "Intermediate",
      isEnrolled: false,
    },
    {
      id: "3",
      title: "Blockchain Technology",
      instructor: "Dr. Maria Garcia",
      department: "Computer Science",
      description: "Explore distributed ledger technology and smart contracts",
      enrolled: 298,
      rating: 4.9,
      credits: 3,
      level: "Intermediate",
      isEnrolled: false,
    },
    {
      id: "4",
      title: "Data Visualization",
      instructor: "Prof. James Wilson",
      department: "Data Science",
      description: "Create compelling visual representations of complex data",
      enrolled: 187,
      rating: 4.6,
      credits: 3,
      level: "Beginner",
      isEnrolled: false,
    },
    {
      id: "5",
      title: "Cybersecurity Essentials",
      instructor: "Dr. Lisa Chen",
      department: "Computer Science",
      description: "Protect systems and networks from digital attacks",
      enrolled: 412,
      rating: 4.8,
      credits: 4,
      level: "Intermediate",
      isEnrolled: false,
    },
    {
      id: "6",
      title: "Natural Language Processing",
      instructor: "Prof. Robert Taylor",
      department: "AI & ML",
      description: "Build applications that understand human language",
      enrolled: 203,
      rating: 4.7,
      credits: 4,
      level: "Advanced",
      isEnrolled: false,
    },
  ];

  const departments = [
    "All Departments",
    "Computer Science",
    "Data Science",
    "Physics",
    "AI & ML",
  ];

  const [selectedDepartment, setSelectedDepartment] = useState("All Departments");

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesDepartment =
      selectedDepartment === "All Departments" ||
      course.department === selectedDepartment;
    
    return matchesSearch && matchesDepartment;
  });

  const CourseCard = ({ course }: { course: typeof courses[0] }) => (
    <Card className="card-hover">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-2 flex-1">
            <div className="flex items-center gap-2">
              <Badge variant="outline">{course.department}</Badge>
              <Badge
                variant={
                  course.level === "Beginner"
                    ? "secondary"
                    : course.level === "Intermediate"
                    ? "default"
                    : "destructive"
                }
              >
                {course.level}
              </Badge>
            </div>
            <CardTitle className="text-xl">{course.title}</CardTitle>
            <p className="text-sm text-muted-foreground">
              {course.instructor}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-foreground/90">{course.description}</p>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            {course.enrolled}
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {course.credits} credits
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-warning text-warning" />
            {course.rating}
          </div>
        </div>

        <Button
          className="w-full"
          variant={course.isEnrolled ? "outline" : "default"}
        >
          {course.isEnrolled ? "View Course" : "Enroll Now"}
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Course Catalog</h1>
        <p className="text-muted-foreground">
          Explore and enroll in courses across all departments
        </p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search courses, instructors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <Tabs value={selectedDepartment} onValueChange={setSelectedDepartment}>
        <TabsList className="w-full justify-start overflow-x-auto">
          {departments.map((dept) => (
            <TabsTrigger key={dept} value={dept}>
              {dept}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No courses found</h3>
            <p className="text-sm text-muted-foreground text-center">
              Try adjusting your search or filter criteria
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Catalog;
