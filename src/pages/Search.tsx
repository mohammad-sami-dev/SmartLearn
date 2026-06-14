import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search as SearchIcon, 
  BookOpen, 
  FileText, 
  Video, 
  Calendar,
  User,
  MessageSquare
} from "lucide-react";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Mock data for search results
  const courses = [
    { id: "1", title: "Advanced Machine Learning", instructor: "Dr. Sarah Johnson", enrolled: 234, type: "course" },
    { id: "2", title: "Data Structures & Algorithms", instructor: "Prof. Michael Chen", enrolled: 312, type: "course" },
    { id: "3", title: "Web Development Fundamentals", instructor: "Dr. Emily Rodriguez", enrolled: 289, type: "course" },
  ];

  const assignments = [
    { id: "1", title: "Neural Networks Implementation", course: "Advanced Machine Learning", dueDate: "Due in 2 days", type: "assignment" },
    { id: "2", title: "K-Means Clustering Project", course: "Advanced Machine Learning", dueDate: "Due in 1 week", type: "assignment" },
    { id: "3", title: "Binary Search Tree Implementation", course: "Data Structures & Algorithms", dueDate: "Due in 3 days", type: "assignment" },
  ];

  const lessons = [
    { id: "1", title: "Introduction to Neural Networks", course: "Advanced Machine Learning", duration: "45 mins", type: "lesson" },
    { id: "2", title: "Backpropagation Fundamentals", course: "Advanced Machine Learning", duration: "1 hour", type: "lesson" },
    { id: "3", title: "Binary Trees and Traversal", course: "Data Structures & Algorithms", duration: "50 mins", type: "lesson" },
  ];

  const discussions = [
    { id: "1", title: "Understanding gradient descent", course: "Advanced Machine Learning", replies: 12, type: "discussion" },
    { id: "2", title: "Best practices for React development", course: "Web Development Fundamentals", replies: 8, type: "discussion" },
  ];

  // Filter results based on search query
  const filteredCourses = courses.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.instructor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredAssignments = assignments.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.course.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredLessons = lessons.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.course.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredDiscussions = discussions.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.course.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalResults = filteredCourses.length + filteredAssignments.length + filteredLessons.length + filteredDiscussions.length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Search</h1>
        <p className="text-sm sm:text-base text-muted-foreground">Find courses, assignments, lessons, and more</p>
      </div>

      {/* Search Input */}
      <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search courses, assignments, lessons..."
          className="pl-10 h-12 text-base"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          autoFocus
        />
      </div>

      {searchQuery && (
        <p className="text-sm text-muted-foreground">
          Found {totalResults} result{totalResults !== 1 ? 's' : ''} for "{searchQuery}"
        </p>
      )}

      {/* Results Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all" className="text-xs sm:text-sm">
            All ({totalResults})
          </TabsTrigger>
          <TabsTrigger value="courses" className="text-xs sm:text-sm">
            Courses ({filteredCourses.length})
          </TabsTrigger>
          <TabsTrigger value="assignments" className="text-xs sm:text-sm">
            Assignments ({filteredAssignments.length})
          </TabsTrigger>
          <TabsTrigger value="lessons" className="text-xs sm:text-sm">
            Lessons ({filteredLessons.length})
          </TabsTrigger>
          <TabsTrigger value="discussions" className="text-xs sm:text-sm">
            Discussions ({filteredDiscussions.length})
          </TabsTrigger>
        </TabsList>

        {/* All Results */}
        <TabsContent value="all" className="space-y-4 mt-6">
          {!searchQuery ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <SearchIcon className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-lg font-medium">Start typing to search</p>
                <p className="text-sm text-muted-foreground mt-2">Search across courses, assignments, lessons, and discussions</p>
              </CardContent>
            </Card>
          ) : totalResults === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <SearchIcon className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-lg font-medium">No results found</p>
                <p className="text-sm text-muted-foreground mt-2">Try different keywords or check your spelling</p>
              </CardContent>
            </Card>
          ) : (
            <>
              {filteredCourses.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    COURSES
                  </h3>
                  {filteredCourses.map((course) => (
                    <Card key={course.id} className="cursor-pointer hover:border-primary transition-colors" onClick={() => navigate(`/dashboard/course/${course.id}`)}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <h4 className="font-semibold">{course.title}</h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              <User className="inline h-3 w-3 mr-1" />
                              {course.instructor} • {course.enrolled} students
                            </p>
                          </div>
                          <Badge>Course</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {filteredAssignments.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    ASSIGNMENTS
                  </h3>
                  {filteredAssignments.map((assignment) => (
                    <Card key={assignment.id} className="cursor-pointer hover:border-primary transition-colors">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <h4 className="font-semibold">{assignment.title}</h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              {assignment.course} • <Calendar className="inline h-3 w-3 mr-1" />{assignment.dueDate}
                            </p>
                          </div>
                          <Badge variant="destructive">Assignment</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {filteredLessons.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
                    <Video className="h-4 w-4" />
                    LESSONS
                  </h3>
                  {filteredLessons.map((lesson) => (
                    <Card key={lesson.id} className="cursor-pointer hover:border-primary transition-colors" onClick={() => navigate(`/dashboard/video/${lesson.id}`)}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <h4 className="font-semibold">{lesson.title}</h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              {lesson.course} • {lesson.duration}
                            </p>
                          </div>
                          <Badge variant="secondary">Lesson</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {filteredDiscussions.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    DISCUSSIONS
                  </h3>
                  {filteredDiscussions.map((discussion) => (
                    <Card key={discussion.id} className="cursor-pointer hover:border-primary transition-colors">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <h4 className="font-semibold">{discussion.title}</h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              {discussion.course} • {discussion.replies} replies
                            </p>
                          </div>
                          <Badge variant="outline">Discussion</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </>
          )}
        </TabsContent>

        {/* Courses Tab */}
        <TabsContent value="courses" className="space-y-4 mt-6">
          {filteredCourses.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-lg font-medium">No courses found</p>
              </CardContent>
            </Card>
          ) : (
            filteredCourses.map((course) => (
              <Card key={course.id} className="cursor-pointer hover:border-primary transition-colors" onClick={() => navigate(`/dashboard/course/${course.id}`)}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h4 className="font-semibold">{course.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        <User className="inline h-3 w-3 mr-1" />
                        {course.instructor} • {course.enrolled} students
                      </p>
                    </div>
                    <Button size="sm">View Course</Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        {/* Assignments Tab */}
        <TabsContent value="assignments" className="space-y-4 mt-6">
          {filteredAssignments.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-lg font-medium">No assignments found</p>
              </CardContent>
            </Card>
          ) : (
            filteredAssignments.map((assignment) => (
              <Card key={assignment.id} className="cursor-pointer hover:border-primary transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h4 className="font-semibold">{assignment.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {assignment.course} • <Calendar className="inline h-3 w-3 mr-1" />{assignment.dueDate}
                      </p>
                    </div>
                    <Button size="sm">View Assignment</Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        {/* Lessons Tab */}
        <TabsContent value="lessons" className="space-y-4 mt-6">
          {filteredLessons.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Video className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-lg font-medium">No lessons found</p>
              </CardContent>
            </Card>
          ) : (
            filteredLessons.map((lesson) => (
              <Card key={lesson.id} className="cursor-pointer hover:border-primary transition-colors" onClick={() => navigate(`/dashboard/video/${lesson.id}`)}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h4 className="font-semibold">{lesson.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {lesson.course} • {lesson.duration}
                      </p>
                    </div>
                    <Button size="sm">Watch Lesson</Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        {/* Discussions Tab */}
        <TabsContent value="discussions" className="space-y-4 mt-6">
          {filteredDiscussions.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-lg font-medium">No discussions found</p>
              </CardContent>
            </Card>
          ) : (
            filteredDiscussions.map((discussion) => (
              <Card key={discussion.id} className="cursor-pointer hover:border-primary transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h4 className="font-semibold">{discussion.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {discussion.course} • {discussion.replies} replies
                      </p>
                    </div>
                    <Button size="sm">View Discussion</Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Search;
