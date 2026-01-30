
export type UserRole = 'Admin' | 'Employee';

export interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  position: string;
  salary: number;
  status: 'Active' | 'On Leave' | 'Terminated';
  joinDate: string;
  salaryStructure?: SalaryStructure;
}

export interface SalaryComponent {
  name: string;
  amount: number;
  type: 'Earning' | 'Deduction';
}

export interface SalaryStructure {
  basic: number;
  allowances: SalaryComponent[];
  deductions: SalaryComponent[];
  netPay: number;
}

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  date: string;
  clockIn: string | null;
  clockOut: string | null;
  status: 'Present' | 'Absent' | 'Late' | 'Leave';
  location?: {
    lat: number;
    lng: number;
    address?: string;
  };
  selfie?: string; // base64
}

export interface Payslip {
  id: string;
  employeeId: string;
  month: string;
  year: number;
  grossEarnings: number;
  totalDeductions: number;
  netPay: number;
  generationDate: string;
}

export type ViewType = 
  | 'Dashboard' 
  | 'Employees' 
  | 'Payroll' 
  | 'Attendance' 
  | 'SalaryStructure' 
  | 'Settings' 
  | 'Insights'
  | 'UserDashboard'
  | 'MyPayslip'
  | 'PayrollProcess';
