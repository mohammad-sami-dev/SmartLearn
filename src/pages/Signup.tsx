import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { GraduationCap, User, BookOpen, Shield, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type UserRole = "student" | "teacher" | "admin";

const Signup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedRole, setSelectedRole] = useState<UserRole>("student");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    department: "",
    studentId: "",
  });
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const roles = [
    {
      id: "student" as UserRole,
      title: "Student",
      description: "Access courses and learning materials",
      icon: User,
      color: "text-primary",
    },
    {
      id: "teacher" as UserRole,
      title: "Teacher",
      description: "Create and manage courses",
      icon: BookOpen,
      color: "text-accent",
    },
    {
      id: "admin" as UserRole,
      title: "Admin",
      description: "System administration",
      icon: Shield,
      color: "text-warning",
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!agreedToTerms) {
      toast({
        title: "Terms Required",
        description: "Please agree to the terms and conditions",
        variant: "destructive",
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // TODO: Implement actual Supabase registration
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast({
        title: "Account Created",
        description: "Welcome to SmartLearn! Please check your email to verify your account.",
      });

      navigate("/login");
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: "Unable to create account. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSSOSignup = (provider: string) => {
    toast({
      title: "SSO Signup",
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
                <h3 className="font-semibold">Join Thousands of Learners</h3>
                <p className="text-white/70">Start your learning journey today</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-lg bg-white/20">
                <span className="text-lg">🚀</span>
              </div>
              <div>
                <h3 className="font-semibold">Quick Setup</h3>
                <p className="text-white/70">Get started in less than 2 minutes</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-lg bg-white/20">
                <span className="text-lg">🔒</span>
              </div>
              <div>
                <h3 className="font-semibold">Secure & Private</h3>
                <p className="text-white/70">Your data is protected and encrypted</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Signup Form */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-8 overflow-y-auto">
        <Card className="w-full max-w-md border-none shadow-2xl my-8">
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
            <CardTitle className="text-3xl font-bold hidden lg:block">Create an account</CardTitle>
            <CardDescription className="hidden lg:block">
              Choose your role and get started
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
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        type="text"
                        placeholder="John Doe"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="name@university.edu"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>

                    {selectedRole === "student" && (
                      <div className="space-y-2">
                        <Label htmlFor="studentId">Student ID</Label>
                        <Input
                          id="studentId"
                          type="text"
                          placeholder="STU123456"
                          value={formData.studentId}
                          onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                          required
                        />
                      </div>
                    )}

                    {(selectedRole === "teacher" || selectedRole === "admin") && (
                      <div className="space-y-2">
                        <Label htmlFor="department">Department</Label>
                        <Input
                          id="department"
                          type="text"
                          placeholder="Computer Science"
                          value={formData.department}
                          onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                          required
                        />
                      </div>
                    )}
                    
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        required
                      />
                    </div>

                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="terms"
                        checked={agreedToTerms}
                        onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                      />
                      <label
                        htmlFor="terms"
                        className="text-sm text-muted-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        I agree to the{" "}
                        <a href="#" className="text-primary hover:underline">
                          Terms of Service
                        </a>{" "}
                        and{" "}
                        <a href="#" className="text-primary hover:underline">
                          Privacy Policy
                        </a>
                      </label>
                    </div>

                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Creating account..." : "Create Account"}
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
                        onClick={() => handleSSOSignup("Google")}
                      >
                        <Mail className="mr-2 h-4 w-4" />
                        Google
                      </Button>
                      <Button
                        variant="outline"
                        type="button"
                        onClick={() => handleSSOSignup("Microsoft")}
                      >
                        <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zm12.6 0H12.6V0H24v11.4z"/>
                        </svg>
                        Microsoft
                      </Button>
                    </div>
                  </div>

                  <div className="mt-6 text-center text-sm">
                    <span className="text-muted-foreground">Already have an account? </span>
                    <Button
                      variant="link"
                      className="h-auto p-0"
                      onClick={() => navigate("/login")}
                    >
                      Sign in
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

export default Signup;
