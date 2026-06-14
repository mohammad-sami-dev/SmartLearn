import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, ArrowLeft, Mail, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ForgotPassword = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // TODO: Implement actual password reset
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setEmailSent(true);
      toast({
        title: "Email Sent",
        description: "Check your inbox for password reset instructions.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send reset email. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
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
                <span className="text-lg">🔒</span>
              </div>
              <div>
                <h3 className="font-semibold">Secure Reset Process</h3>
                <p className="text-white/70">We'll send you a secure link to reset your password</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-lg bg-white/20">
                <span className="text-lg">⚡</span>
              </div>
              <div>
                <h3 className="font-semibold">Quick & Easy</h3>
                <p className="text-white/70">Reset your password in just a few clicks</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-lg bg-white/20">
                <span className="text-lg">🛡️</span>
              </div>
              <div>
                <h3 className="font-semibold">Protected Account</h3>
                <p className="text-white/70">Your account security is our priority</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
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
            <CardTitle className="text-3xl font-bold hidden lg:block">
              {emailSent ? "Check your email" : "Forgot password?"}
            </CardTitle>
            <CardDescription className="hidden lg:block">
              {emailSent
                ? "We've sent you instructions to reset your password"
                : "Enter your email and we'll send you reset instructions"}
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            {emailSent ? (
              <div className="space-y-6">
                <div className="rounded-lg border border-success/50 bg-success/5 p-6 text-center">
                  <CheckCircle className="h-12 w-12 text-success mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Email sent successfully!</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    We've sent password reset instructions to{" "}
                    <span className="font-medium">{email}</span>
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Didn't receive the email? Check your spam folder or try again.
                  </p>
                </div>

                <div className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setEmailSent(false)}
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    Send again
                  </Button>
                  
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/login">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back to login
                    </Link>
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@university.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Enter the email address associated with your account
                  </p>
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Sending..." : "Send reset link"}
                </Button>

                <Button variant="outline" className="w-full" asChild>
                  <Link to="/login">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to login
                  </Link>
                </Button>
              </form>
            )}

            <div className="mt-6 text-center text-sm text-muted-foreground">
              <p>Need help? Contact support at</p>
              <a href="mailto:support@smartlearn.edu" className="text-primary hover:underline">
                support@smartlearn.edu
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;
