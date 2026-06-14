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
  DollarSign,
  Plus,
  Download,
  Send,
  AlertCircle,
  CheckCircle,
  Clock,
  Search,
  Filter,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FeeStructure {
  id: string;
  category: string;
  amount: number;
  frequency: "semester" | "annual" | "one-time";
  description: string;
}

interface Fine {
  id: string;
  sapId: string;
  studentName: string;
  amount: number;
  reason: string;
  status: "pending" | "paid" | "waived";
  issuedDate: string;
  dueDate: string;
  paidDate?: string;
}

interface Payment {
  id: string;
  sapId: string;
  studentName: string;
  amount: number;
  type: "tuition" | "fine" | "exam" | "library" | "hostel";
  status: "completed" | "pending" | "failed";
  date: string;
  method: "cash" | "card" | "bank_transfer" | "online";
}

const FinancialManagement = () => {
  const { toast } = useToast();
  const [fineDialog, setFineDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  const [feeStructures] = useState<FeeStructure[]>([
    {
      id: "1",
      category: "Tuition Fee",
      amount: 5000,
      frequency: "semester",
      description: "Regular semester tuition fee",
    },
    {
      id: "2",
      category: "Exam Fee",
      amount: 500,
      frequency: "semester",
      description: "End semester examination fee",
    },
    {
      id: "3",
      category: "Library Fee",
      amount: 200,
      frequency: "annual",
      description: "Annual library membership",
    },
    {
      id: "4",
      category: "Lab Fee",
      amount: 800,
      frequency: "semester",
      description: "Laboratory usage and materials",
    },
    {
      id: "5",
      category: "Sports Fee",
      amount: 300,
      frequency: "annual",
      description: "Sports facilities and activities",
    },
  ]);

  const [fines, setFines] = useState<Fine[]>([
    {
      id: "1",
      sapId: "SAP001235",
      studentName: "Bob Smith",
      amount: 100,
      reason: "Late library book return (15 days overdue)",
      status: "pending",
      issuedDate: "2024-01-10",
      dueDate: "2024-01-25",
    },
    {
      id: "2",
      sapId: "SAP001236",
      studentName: "Carol Davis",
      amount: 500,
      reason: "Damage to laboratory equipment",
      status: "pending",
      issuedDate: "2024-01-08",
      dueDate: "2024-01-22",
    },
    {
      id: "3",
      sapId: "SAP001234",
      studentName: "Alice Johnson",
      amount: 50,
      reason: "Late fee submission",
      status: "paid",
      issuedDate: "2024-01-05",
      dueDate: "2024-01-20",
      paidDate: "2024-01-18",
    },
  ]);

  const [payments] = useState<Payment[]>([
    {
      id: "1",
      sapId: "SAP001234",
      studentName: "Alice Johnson",
      amount: 5000,
      type: "tuition",
      status: "completed",
      date: "2024-01-15",
      method: "online",
    },
    {
      id: "2",
      sapId: "SAP001235",
      studentName: "Bob Smith",
      amount: 3000,
      type: "tuition",
      status: "completed",
      date: "2024-01-10",
      method: "bank_transfer",
    },
    {
      id: "3",
      sapId: "SAP001236",
      studentName: "Carol Davis",
      amount: 2000,
      type: "tuition",
      status: "pending",
      date: "2024-01-20",
      method: "online",
    },
  ]);

  const [fineForm, setFineForm] = useState({
    sapId: "",
    amount: "",
    reason: "",
    dueDate: "",
  });

  const totalRevenue = payments
    .filter((p) => p.status === "completed")
    .reduce((sum, p) => sum + p.amount, 0);
  
  const pendingPayments = payments
    .filter((p) => p.status === "pending")
    .reduce((sum, p) => sum + p.amount, 0);
  
  const pendingFines = fines
    .filter((f) => f.status === "pending")
    .reduce((sum, f) => sum + f.amount, 0);
  
  const paidFines = fines
    .filter((f) => f.status === "paid")
    .reduce((sum, f) => sum + f.amount, 0);

  const handleIssueFine = () => {
    if (!fineForm.sapId || !fineForm.amount || !fineForm.reason) {
      toast({
        title: "Missing Information",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Fine Issued",
      description: `Fine of $${fineForm.amount} issued to SAP ID: ${fineForm.sapId}`,
    });
    
    setFineDialog(false);
    setFineForm({ sapId: "", amount: "", reason: "", dueDate: "" });
  };

  const handleWaiveFine = (fineId: string) => {
    toast({
      title: "Fine Waived",
      description: "The fine has been waived successfully",
    });
  };

  const handleSendReminder = (sapId: string) => {
    toast({
      title: "Reminder Sent",
      description: `Payment reminder sent to ${sapId}`,
    });
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      completed: { variant: "default" as const, color: "text-success", icon: CheckCircle },
      pending: { variant: "secondary" as const, color: "text-warning", icon: Clock },
      paid: { variant: "default" as const, color: "text-success", icon: CheckCircle },
      waived: { variant: "secondary" as const, color: "text-muted-foreground", icon: CheckCircle },
      failed: { variant: "destructive" as const, color: "text-destructive", icon: AlertCircle },
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Financial Management</h1>
          <p className="text-muted-foreground">
            Manage fees, fines, and payments
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
          <Button onClick={() => setFineDialog(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Issue Fine
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                <p className="text-3xl font-bold text-success">
                  ${totalRevenue.toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground mt-1">This semester</p>
              </div>
              <DollarSign className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending Payments</p>
                <p className="text-3xl font-bold text-warning">
                  ${pendingPayments.toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground mt-1">Outstanding dues</p>
              </div>
              <Clock className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending Fines</p>
                <p className="text-3xl font-bold text-destructive">
                  ${pendingFines.toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {fines.filter((f) => f.status === "pending").length} fines
                </p>
              </div>
              <AlertCircle className="h-8 w-8 text-destructive" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Collected Fines</p>
                <p className="text-3xl font-bold text-primary">
                  ${paidFines.toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground mt-1">This semester</p>
              </div>
              <CheckCircle className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="fines" className="space-y-6">
        <TabsList>
          <TabsTrigger value="fines">Fines & Penalties</TabsTrigger>
          <TabsTrigger value="payments">Payment History</TabsTrigger>
          <TabsTrigger value="structure">Fee Structure</TabsTrigger>
        </TabsList>

        {/* Fines Tab */}
        <TabsContent value="fines" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>All Fines ({fines.length})</CardTitle>
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search by SAP ID..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>SAP ID</TableHead>
                    <TableHead>Student Name</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Issued Date</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {fines.map((fine) => (
                    <TableRow key={fine.id}>
                      <TableCell className="font-mono">{fine.sapId}</TableCell>
                      <TableCell className="font-medium">{fine.studentName}</TableCell>
                      <TableCell>
                        <span className="font-semibold text-destructive">
                          ${fine.amount}
                        </span>
                      </TableCell>
                      <TableCell className="max-w-xs">
                        <p className="text-sm truncate">{fine.reason}</p>
                      </TableCell>
                      <TableCell>{fine.issuedDate}</TableCell>
                      <TableCell>{fine.dueDate}</TableCell>
                      <TableCell>{getStatusBadge(fine.status)}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          {fine.status === "pending" && (
                            <>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleSendReminder(fine.sapId)}
                              >
                                <Send className="h-3 w-3 mr-1" />
                                Remind
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleWaiveFine(fine.id)}
                              >
                                Waive
                              </Button>
                            </>
                          )}
                          {fine.status === "paid" && (
                            <Badge variant="default">Paid on {fine.paidDate}</Badge>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payments Tab */}
        <TabsContent value="payments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Payments ({payments.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>SAP ID</TableHead>
                    <TableHead>Student Name</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell className="font-mono">{payment.sapId}</TableCell>
                      <TableCell className="font-medium">{payment.studentName}</TableCell>
                      <TableCell>
                        <span className="font-semibold">
                          ${payment.amount.toLocaleString()}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">
                          {payment.type.replace("_", " ")}
                        </Badge>
                      </TableCell>
                      <TableCell className="capitalize">
                        {payment.method.replace("_", " ")}
                      </TableCell>
                      <TableCell>{payment.date}</TableCell>
                      <TableCell>{getStatusBadge(payment.status)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Fee Structure Tab */}
        <TabsContent value="structure" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Fee Structure</CardTitle>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Fee Category
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {feeStructures.map((fee) => (
                  <Card key={fee.id} className="border">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-lg">{fee.category}</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {fee.description}
                          </p>
                        </div>
                        <Badge variant="secondary">{fee.frequency}</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-3xl font-bold text-primary">
                          ${fee.amount.toLocaleString()}
                        </span>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Issue Fine Dialog */}
      <Dialog open={fineDialog} onOpenChange={setFineDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Issue Fine / Penalty</DialogTitle>
            <DialogDescription>
              Assign a fine to a student using their SAP ID
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="sapId">SAP ID *</Label>
              <Input
                id="sapId"
                placeholder="SAP001234"
                value={fineForm.sapId}
                onChange={(e) =>
                  setFineForm({ ...fineForm, sapId: e.target.value })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="amount">Fine Amount ($) *</Label>
              <Input
                id="amount"
                type="number"
                placeholder="100"
                value={fineForm.amount}
                onChange={(e) =>
                  setFineForm({ ...fineForm, amount: e.target.value })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="reason">Reason *</Label>
              <Textarea
                id="reason"
                placeholder="Describe the reason for the fine..."
                rows={3}
                value={fineForm.reason}
                onChange={(e) =>
                  setFineForm({ ...fineForm, reason: e.target.value })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="dueDate">Due Date</Label>
              <Input
                id="dueDate"
                type="date"
                value={fineForm.dueDate}
                onChange={(e) =>
                  setFineForm({ ...fineForm, dueDate: e.target.value })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setFineDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleIssueFine}>Issue Fine</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FinancialManagement;
