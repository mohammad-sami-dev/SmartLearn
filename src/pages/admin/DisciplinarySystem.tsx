import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertTriangle,
  Ban,
  FileWarning,
  Plus,
  Search,
  Download,
  Shield,
  XCircle,
  CheckCircle,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Violation {
  id: string;
  sapId: string;
  studentName: string;
  type: "academic" | "behavioral" | "attendance" | "property" | "other";
  severity: "minor" | "moderate" | "major" | "critical";
  description: string;
  date: string;
  reportedBy: string;
  status: "pending" | "resolved" | "appealed";
  actionTaken?: string;
}

interface Warning {
  id: string;
  sapId: string;
  studentName: string;
  type: "first" | "second" | "final";
  reason: string;
  issuedDate: string;
  issuedBy: string;
  expiryDate: string;
  status: "active" | "expired" | "revoked";
}

interface Suspension {
  id: string;
  sapId: string;
  studentName: string;
  reason: string;
  startDate: string;
  endDate: string;
  duration: string;
  issuedBy: string;
  status: "active" | "completed" | "revoked";
}

const DisciplinarySystem = () => {
  const { toast } = useToast();
  const [violationDialog, setViolationDialog] = useState(false);
  const [warningDialog, setWarningDialog] = useState(false);
  const [suspensionDialog, setSuspensionDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [violations] = useState<Violation[]>([
    {
      id: "1",
      sapId: "SAP001235",
      studentName: "Bob Smith",
      type: "academic",
      severity: "major",
      description: "Caught cheating in midterm examination",
      date: "2024-01-15",
      reportedBy: "Dr. Sarah Mitchell",
      status: "pending",
    },
    {
      id: "2",
      sapId: "SAP001236",
      studentName: "Carol Davis",
      type: "property",
      severity: "moderate",
      description: "Damage to laboratory equipment",
      date: "2024-01-10",
      reportedBy: "Lab Technician",
      status: "resolved",
      actionTaken: "Fine imposed and equipment replaced",
    },
    {
      id: "3",
      sapId: "SAP001238",
      studentName: "Eve Wilson",
      type: "behavioral",
      severity: "minor",
      description: "Disruptive behavior in classroom",
      date: "2024-01-18",
      reportedBy: "Prof. John Anderson",
      status: "pending",
    },
  ]);

  const [warnings] = useState<Warning[]>([
    {
      id: "1",
      sapId: "SAP001235",
      studentName: "Bob Smith",
      type: "first",
      reason: "Academic dishonesty",
      issuedDate: "2024-01-16",
      issuedBy: "Dean of Students",
      expiryDate: "2024-07-16",
      status: "active",
    },
    {
      id: "2",
      sapId: "SAP001236",
      studentName: "Carol Davis",
      type: "first",
      reason: "Property damage",
      issuedDate: "2024-01-12",
      issuedBy: "Dean of Students",
      expiryDate: "2024-07-12",
      status: "active",
    },
  ]);

  const [suspensions] = useState<Suspension[]>([
    {
      id: "1",
      sapId: "SAP001239",
      studentName: "Frank Miller",
      reason: "Repeated violations of code of conduct",
      startDate: "2024-01-10",
      endDate: "2024-01-24",
      duration: "14 days",
      issuedBy: "Academic Registrar",
      status: "active",
    },
  ]);

  const [violationForm, setViolationForm] = useState({
    sapId: "",
    type: "",
    severity: "",
    description: "",
  });

  const [warningForm, setWarningForm] = useState({
    sapId: "",
    type: "",
    reason: "",
  });

  const [suspensionForm, setSuspensionForm] = useState({
    sapId: "",
    reason: "",
    startDate: "",
    endDate: "",
  });

  const handleReportViolation = () => {
    if (!violationForm.sapId || !violationForm.type || !violationForm.description) {
      toast({
        title: "Missing Information",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Violation Reported",
      description: `Violation reported for SAP ID: ${violationForm.sapId}`,
    });
    
    setViolationDialog(false);
    setViolationForm({ sapId: "", type: "", severity: "", description: "" });
  };

  const handleIssueWarning = () => {
    if (!warningForm.sapId || !warningForm.type || !warningForm.reason) {
      toast({
        title: "Missing Information",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Warning Issued",
      description: `${warningForm.type} warning issued to SAP ID: ${warningForm.sapId}`,
    });
    
    setWarningDialog(false);
    setWarningForm({ sapId: "", type: "", reason: "" });
  };

  const handleSuspend = () => {
    if (!suspensionForm.sapId || !suspensionForm.reason || !suspensionForm.startDate) {
      toast({
        title: "Missing Information",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Student Suspended",
      description: `Suspension applied to SAP ID: ${suspensionForm.sapId}`,
    });
    
    setSuspensionDialog(false);
    setSuspensionForm({ sapId: "", reason: "", startDate: "", endDate: "" });
  };

  const getSeverityBadge = (severity: string) => {
    const variants = {
      minor: "secondary",
      moderate: "default",
      major: "destructive",
      critical: "destructive",
    };
    
    const colors = {
      minor: "bg-blue-500/10 text-blue-700",
      moderate: "bg-yellow-500/10 text-yellow-700",
      major: "bg-orange-500/10 text-orange-700",
      critical: "bg-red-500/10 text-red-700",
    };
    
    return (
      <Badge className={colors[severity as keyof typeof colors]}>
        {severity.toUpperCase()}
      </Badge>
    );
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: { variant: "secondary" as const, icon: AlertTriangle, color: "text-warning" },
      resolved: { variant: "default" as const, icon: CheckCircle, color: "text-success" },
      appealed: { variant: "secondary" as const, icon: Shield, color: "text-primary" },
      active: { variant: "destructive" as const, icon: AlertTriangle, color: "text-destructive" },
      expired: { variant: "secondary" as const, icon: XCircle, color: "text-muted-foreground" },
      revoked: { variant: "secondary" as const, icon: CheckCircle, color: "text-success" },
      completed: { variant: "default" as const, icon: CheckCircle, color: "text-success" },
    };
    
    const config = variants[status as keyof typeof variants];
    const Icon = config.icon;
    
    return (
      <Badge variant={config.variant} className="gap-1">
        <Icon className={`h-3 w-3 ${config.color}`} />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const getWarningBadge = (type: string) => {
    const colors = {
      first: "bg-yellow-500/10 text-yellow-700",
      second: "bg-orange-500/10 text-orange-700",
      final: "bg-red-500/10 text-red-700",
    };
    
    return (
      <Badge className={colors[type as keyof typeof colors]}>
        {type.toUpperCase()} WARNING
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Disciplinary System</h1>
          <p className="text-muted-foreground">
            Manage violations, warnings, and disciplinary actions
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Violations</p>
                <p className="text-3xl font-bold text-destructive">
                  {violations.filter((v) => v.status === "pending").length}
                </p>
                <p className="text-xs text-muted-foreground mt-1">Pending review</p>
              </div>
              <FileWarning className="h-8 w-8 text-destructive" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Warnings</p>
                <p className="text-3xl font-bold text-warning">
                  {warnings.filter((w) => w.status === "active").length}
                </p>
                <p className="text-xs text-muted-foreground mt-1">Currently active</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Suspensions</p>
                <p className="text-3xl font-bold text-destructive">
                  {suspensions.filter((s) => s.status === "active").length}
                </p>
                <p className="text-xs text-muted-foreground mt-1">Currently suspended</p>
              </div>
              <Ban className="h-8 w-8 text-destructive" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Resolved Cases</p>
                <p className="text-3xl font-bold text-success">
                  {violations.filter((v) => v.status === "resolved").length}
                </p>
                <p className="text-xs text-muted-foreground mt-1">This semester</p>
              </div>
              <CheckCircle className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="violations" className="space-y-6">
        <TabsList>
          <TabsTrigger value="violations">Violations</TabsTrigger>
          <TabsTrigger value="warnings">Warnings</TabsTrigger>
          <TabsTrigger value="suspensions">Suspensions</TabsTrigger>
        </TabsList>

        {/* Violations Tab */}
        <TabsContent value="violations" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>All Violations ({violations.length})</CardTitle>
                <div className="flex gap-2">
                  <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search by SAP ID..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                  <Button onClick={() => setViolationDialog(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Report Violation
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>SAP ID</TableHead>
                    <TableHead>Student Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Reported By</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {violations.map((violation) => (
                    <TableRow key={violation.id}>
                      <TableCell className="font-mono">{violation.sapId}</TableCell>
                      <TableCell className="font-medium">{violation.studentName}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{violation.type}</Badge>
                      </TableCell>
                      <TableCell>{getSeverityBadge(violation.severity)}</TableCell>
                      <TableCell className="max-w-xs">
                        <p className="text-sm truncate">{violation.description}</p>
                      </TableCell>
                      <TableCell>{violation.date}</TableCell>
                      <TableCell>{violation.reportedBy}</TableCell>
                      <TableCell>{getStatusBadge(violation.status)}</TableCell>
                      <TableCell>
                        {violation.status === "pending" && (
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              Resolve
                            </Button>
                            <Button size="sm" variant="destructive">
                              Take Action
                            </Button>
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Warnings Tab */}
        <TabsContent value="warnings" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>All Warnings ({warnings.length})</CardTitle>
                <Button onClick={() => setWarningDialog(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Issue Warning
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>SAP ID</TableHead>
                    <TableHead>Student Name</TableHead>
                    <TableHead>Warning Type</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Issued Date</TableHead>
                    <TableHead>Issued By</TableHead>
                    <TableHead>Expiry Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {warnings.map((warning) => (
                    <TableRow key={warning.id}>
                      <TableCell className="font-mono">{warning.sapId}</TableCell>
                      <TableCell className="font-medium">{warning.studentName}</TableCell>
                      <TableCell>{getWarningBadge(warning.type)}</TableCell>
                      <TableCell className="max-w-xs">
                        <p className="text-sm truncate">{warning.reason}</p>
                      </TableCell>
                      <TableCell>{warning.issuedDate}</TableCell>
                      <TableCell>{warning.issuedBy}</TableCell>
                      <TableCell>{warning.expiryDate}</TableCell>
                      <TableCell>{getStatusBadge(warning.status)}</TableCell>
                      <TableCell>
                        {warning.status === "active" && (
                          <Button size="sm" variant="outline">
                            Revoke
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Suspensions Tab */}
        <TabsContent value="suspensions" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>All Suspensions ({suspensions.length})</CardTitle>
                <Button onClick={() => setSuspensionDialog(true)} variant="destructive">
                  <Ban className="mr-2 h-4 w-4" />
                  Suspend Student
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>SAP ID</TableHead>
                    <TableHead>Student Name</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>End Date</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Issued By</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {suspensions.map((suspension) => (
                    <TableRow key={suspension.id}>
                      <TableCell className="font-mono">{suspension.sapId}</TableCell>
                      <TableCell className="font-medium">{suspension.studentName}</TableCell>
                      <TableCell className="max-w-xs">
                        <p className="text-sm truncate">{suspension.reason}</p>
                      </TableCell>
                      <TableCell>{suspension.startDate}</TableCell>
                      <TableCell>{suspension.endDate}</TableCell>
                      <TableCell>
                        <Badge variant="destructive">{suspension.duration}</Badge>
                      </TableCell>
                      <TableCell>{suspension.issuedBy}</TableCell>
                      <TableCell>{getStatusBadge(suspension.status)}</TableCell>
                      <TableCell>
                        {suspension.status === "active" && (
                          <Button size="sm" variant="outline">
                            Lift Suspension
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Report Violation Dialog */}
      <Dialog open={violationDialog} onOpenChange={setViolationDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Report Violation</DialogTitle>
            <DialogDescription>
              Report a code of conduct violation by a student
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="v-sapId">SAP ID *</Label>
              <Input
                id="v-sapId"
                placeholder="SAP001234"
                value={violationForm.sapId}
                onChange={(e) =>
                  setViolationForm({ ...violationForm, sapId: e.target.value })
                }
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="v-type">Violation Type *</Label>
                <Select
                  value={violationForm.type}
                  onValueChange={(value) =>
                    setViolationForm({ ...violationForm, type: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="academic">Academic</SelectItem>
                    <SelectItem value="behavioral">Behavioral</SelectItem>
                    <SelectItem value="attendance">Attendance</SelectItem>
                    <SelectItem value="property">Property</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="v-severity">Severity *</Label>
                <Select
                  value={violationForm.severity}
                  onValueChange={(value) =>
                    setViolationForm({ ...violationForm, severity: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select severity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="minor">Minor</SelectItem>
                    <SelectItem value="moderate">Moderate</SelectItem>
                    <SelectItem value="major">Major</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="v-description">Description *</Label>
              <Textarea
                id="v-description"
                placeholder="Detailed description of the violation..."
                rows={4}
                value={violationForm.description}
                onChange={(e) =>
                  setViolationForm({ ...violationForm, description: e.target.value })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setViolationDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleReportViolation}>Report Violation</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Issue Warning Dialog */}
      <Dialog open={warningDialog} onOpenChange={setWarningDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Issue Warning</DialogTitle>
            <DialogDescription>
              Issue an official warning to a student
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="w-sapId">SAP ID *</Label>
              <Input
                id="w-sapId"
                placeholder="SAP001234"
                value={warningForm.sapId}
                onChange={(e) =>
                  setWarningForm({ ...warningForm, sapId: e.target.value })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="w-type">Warning Type *</Label>
              <Select
                value={warningForm.type}
                onValueChange={(value) =>
                  setWarningForm({ ...warningForm, type: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select warning type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="first">First Warning</SelectItem>
                  <SelectItem value="second">Second Warning</SelectItem>
                  <SelectItem value="final">Final Warning</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="w-reason">Reason *</Label>
              <Textarea
                id="w-reason"
                placeholder="Reason for issuing this warning..."
                rows={4}
                value={warningForm.reason}
                onChange={(e) =>
                  setWarningForm({ ...warningForm, reason: e.target.value })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setWarningDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleIssueWarning}>Issue Warning</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Suspend Student Dialog */}
      <Dialog open={suspensionDialog} onOpenChange={setSuspensionDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Suspend Student</DialogTitle>
            <DialogDescription>
              Apply suspension to a student account
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="s-sapId">SAP ID *</Label>
              <Input
                id="s-sapId"
                placeholder="SAP001234"
                value={suspensionForm.sapId}
                onChange={(e) =>
                  setSuspensionForm({ ...suspensionForm, sapId: e.target.value })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="s-reason">Reason *</Label>
              <Textarea
                id="s-reason"
                placeholder="Reason for suspension..."
                rows={3}
                value={suspensionForm.reason}
                onChange={(e) =>
                  setSuspensionForm({ ...suspensionForm, reason: e.target.value })
                }
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="s-start">Start Date *</Label>
                <Input
                  id="s-start"
                  type="date"
                  value={suspensionForm.startDate}
                  onChange={(e) =>
                    setSuspensionForm({ ...suspensionForm, startDate: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="s-end">End Date</Label>
                <Input
                  id="s-end"
                  type="date"
                  value={suspensionForm.endDate}
                  onChange={(e) =>
                    setSuspensionForm({ ...suspensionForm, endDate: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSuspensionDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleSuspend}>
              Suspend Student
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DisciplinarySystem;
