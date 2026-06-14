import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GraduationCap, User, BookOpen, Shield, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type UserRole = "student" | "teacher" | "admin";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedRole, setSelectedRole] = useState<UserRole>("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const roles = [
    {
      id: "student" as UserRole,
      title: "Student",
      description: "Access your courses and learning materials",
      icon: User,
      color: "text-primary",
    },
    {
      id: "teacher" as UserRole,
      title: "Teacher",
      description: "Manage courses and grade assignments",
      icon: BookOpen,
      color: "text-accent",
    },
    {
      id: "admin" as UserRole,
      title: "Admin",
      description: "System administration and analytics",
      icon: Shield,
      color: "text-warning",
    },
  ];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Store demo role for ProtectedRoute fallback
      localStorage.setItem("demoRole", selectedRole);

      toast({
        title: "Login Successful",
        description: `Welcome back! Logging in as ${selectedRole}`,
      });

      // Navigate based on role (demo mode)
      switch (selectedRole) {
        case "admin":
          navigate("/admin");
          break;
        case "teacher":
          navigate("/teacher");
          break;
        default:
          navigate("/dashboard");
      }
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Invalid credentials. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSSOLogin = (provider: string) => {
    toast({
      title: "SSO Login",
      description: `Redirecting to ${provider}...`,
    });
    // TODO: Implement SSO
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary via-primary-hover to-accent items-center justify-center p-12">
        <div className="text-white">
          <div className="mb-8 flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white">
              <GraduationCap className="h-10 w-10 text-primary" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">SmartLearn</h1>
              <p className="text-white/80">Learning Management System</p>
            </div>
          </div>
          
          <div className="space-y-6 mt-12">
            <div className="flex items-start gap-3">
              <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-lg bg-white/20">
                <span className="text-lg">🎓</span>
              </div>
              <div>
                <h3 className="font-semibold">AI-Powered Learning</h3>
                <p className="text-white/70">Personalized study plans and intelligent tutoring</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-lg bg-white/20">
                <span className="text-lg">📊</span>
              </div>
              <div>
                <h3 className="font-semibold">Real-time Analytics</h3>
                <p className="text-white/70">Track progress and performance insights</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-lg bg-white/20">
                <span className="text-lg">🤝</span>
              </div>
              <div>
                <h3 className="font-semibold">Seamless Collaboration</h3>
                <p className="text-white/70">Chat, share, and learn together</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-8">
        <Card className="w-full max-w-md border-none shadow-2xl">
          <CardHeader className="space-y-1">
            <div className="flex items-center gap-3 mb-4 lg:hidden">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
                <GraduationCap className="h-7 w-7 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl">SmartLearn</CardTitle>
                <CardDescription>Learning Management System</CardDescription>
              </div>
            </div>
            <CardTitle className="text-3xl font-bold hidden lg:block">Welcome back</CardTitle>
            <CardDescription className="hidden lg:block">
              Choose your role and sign in to continue
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <Tabs value={selectedRole} onValueChange={(value) => setSelectedRole(value as UserRole)}>
              <TabsList className="grid w-full grid-cols-3 mb-6">
                {roles.map((role) => (
                  <TabsTrigger key={role.id} value={role.id} className="gap-2">
                    <role.icon className={`h-4 w-4 ${role.color}`} />
                    <span className="hidden sm:inline">{role.title}</span>
                  </TabsTrigger>
                ))}
              </TabsList>

              {roles.map((role) => (
                <TabsContent key={role.id} value={role.id}>
                  <div className="mb-6 rounded-lg border border-border bg-muted/30 p-4">
                    <div className="flex items-start gap-3">
                      <role.icon className={`mt-1 h-5 w-5 ${role.color}`} />
                      <div>
                        <h3 className="font-semibold">{role.title} Portal</h3>
                        <p className="text-sm text-muted-foreground">{role.description}</p>
                      </div>
                    </div>
                  </div>

                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="name@university.edu"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password">Password</Label>
                        <Button
                          variant="link"
                          className="h-auto p-0 text-xs"
                          type="button"
                          onClick={() => navigate("/forgot-password")}
                        >
                          Forgot password?
                        </Button>
                      </div>
                      <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Signing in..." : "Sign In"}
                    </Button>
                  </form>

                  <div className="mt-6">
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-card px-2 text-muted-foreground">
                          Or continue with
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-3">
                      <Button
                        variant="outline"
                        type="button"
                        onClick={() => handleSSOLogin("Google")}
                      >
                        <Mail className="mr-2 h-4 w-4" />
                        Google
                      </Button>
                      <Button
                        variant="outline"
                        type="button"
                        onClick={() => handleSSOLogin("Microsoft")}
                      >
                        <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zm12.6 0H12.6V0H24v11.4z"/>
                        </svg>
                        Microsoft
                      </Button>
                    </div>
                  </div>

                  <div className="mt-6 text-center text-sm">
                    <span className="text-muted-foreground">Don't have an account? </span>
                    <Button
                      variant="link"
                      className="h-auto p-0"
                      onClick={() => navigate("/signup")}
                    >
                      Sign up
                    </Button>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
