import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { NotificationProvider } from "./contexts/NotificationContext";
import { ThemeCustomizationProvider } from "./contexts/ThemeCustomizationContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import ErrorBoundary from "./components/ErrorBoundary";
import Splash from "./pages/Splash";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import CourseView from "./pages/CourseView";
import Catalog from "./pages/Catalog";
import Search from "./pages/Search";
import CalendarPage from "./pages/CalendarPage";
import AITutor from "./pages/AITutor";
import Messages from "./pages/Messages";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import TeacherDashboard from "./pages/TeacherDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import CourseBuilder from "./pages/CourseBuilder";
import AssignmentCreator from "./pages/AssignmentCreator";
import GradingInterface from "./pages/GradingInterface";
import StudentSubmission from "./pages/StudentSubmission";
import QuizBuilder from "./pages/QuizBuilder";
import RealTimeChat from "./pages/RealTimeChat";
import VideoPlayer from "./pages/VideoPlayer";
import LiveClass from "./pages/LiveClassEnhanced";
import UserManagement from "./pages/admin/UserManagement";
import FinancialManagement from "./pages/admin/FinancialManagement";
import DisciplinarySystem from "./pages/admin/DisciplinarySystem";
import CourseManagement from "./pages/admin/CourseManagement";
import AllCourses from "./pages/admin/AllCourses";
import Reports from "./pages/admin/Reports";
import NotificationManagement from "./pages/admin/NotificationManagement";
import TimetableManagement from "./pages/admin/TimetableManagement";
import AdminMessages from "./pages/admin/AdminMessages";
import TeacherCourses from "./pages/teacher/TeacherCourses";
import TeacherStudents from "./pages/teacher/TeacherStudents";
import Announcements from "./pages/teacher/Announcements";
import Attendance from "./pages/teacher/Attendance";
import LiveClassesList from "./pages/student/LiveClassesList";
import LiveClassesManagement from "./pages/teacher/LiveClassesManagement";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <ThemeCustomizationProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <AuthProvider>
                <NotificationProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Splash />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            
            {/* Student Routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute allowedRoles={["student"]}>
                <Index />
              </ProtectedRoute>
            }>
              <Route index element={<Dashboard />} />
              <Route path="courses" element={<Courses />} />
              <Route path="live-classes" element={<LiveClassesList />} />
              <Route path="course/:id" element={<CourseView />} />
              <Route path="course/:id/overview" element={<CourseDetail />} />
              <Route path="assignment/:assignmentId" element={<StudentSubmission />} />
              <Route path="video/:videoId" element={<VideoPlayer />} />
              <Route path="live/:classId" element={<LiveClass />} />
              <Route path="chat" element={<RealTimeChat />} />
              <Route path="catalog" element={<Catalog />} />
              <Route path="search" element={<Search />} />
              <Route path="calendar" element={<CalendarPage />} />
              <Route path="ai-tutor" element={<AITutor />} />
              <Route path="messages" element={<Messages />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="settings" element={<Settings />} />
              <Route path="profile" element={<Profile />} />
            </Route>

            {/* Teacher Routes */}
            <Route path="/teacher" element={
              <ProtectedRoute allowedRoles={["teacher"]}>
                <Index />
              </ProtectedRoute>
            }>
              <Route index element={<TeacherDashboard />} />
              <Route path="courses" element={<TeacherCourses />} />
              <Route path="live-classes" element={<LiveClassesManagement />} />
              <Route path="students" element={<TeacherStudents />} />
              <Route path="course/:id" element={<CourseDetail />} />
              <Route path="assignment-creator" element={<AssignmentCreator />} />
              <Route path="quiz-builder" element={<QuizBuilder />} />
              <Route path="grading/:assignmentId" element={<GradingInterface />} />
              <Route path="announcements" element={<Announcements />} />
              <Route path="attendance" element={<Attendance />} />
              <Route path="live/:classId" element={<LiveClass />} />
              <Route path="chat" element={<RealTimeChat />} />
              <Route path="calendar" element={<CalendarPage />} />
              <Route path="messages" element={<Messages />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="settings" element={<Settings />} />
              <Route path="profile" element={<Profile />} />
            </Route>

            {/* Admin Routes */}
            <Route path="/admin" element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <Index />
              </ProtectedRoute>
            }>
              <Route index element={<AdminDashboard />} />
              <Route path="users" element={<UserManagement />} />
              <Route path="financial" element={<FinancialManagement />} />
              <Route path="disciplinary" element={<DisciplinarySystem />} />
              <Route path="courses" element={<CourseManagement />} />
              <Route path="course-builder" element={<CourseBuilder />} />
              <Route path="all-courses" element={<AllCourses />} />
              <Route path="timetable" element={<TimetableManagement />} />
              <Route path="reports" element={<Reports />} />
              <Route path="notifications" element={<NotificationManagement />} />
              <Route path="live/:classId" element={<LiveClass />} />
              <Route path="calendar" element={<CalendarPage />} />
              <Route path="messages" element={<AdminMessages />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="settings" element={<Settings />} />
              <Route path="profile" element={<Profile />} />
            </Route>
            
            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
                </NotificationProvider>
              </AuthProvider>
            </BrowserRouter>
          </TooltipProvider>
        </ThemeCustomizationProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
