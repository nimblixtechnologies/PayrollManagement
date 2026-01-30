
import React from 'react';
import { Employee, AttendanceRecord, Payslip } from './types';

export const Icons = {
  Dashboard: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>
  ),
  Employees: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
  ),
  Payroll: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
  ),
  Attendance: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/><path d="m9 16 2 2 4-4"/></svg>
  ),
  Salary: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/><rect width="20" height="12" x="2" y="6" rx="2"/></svg>
  ),
  Insights: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v19"/><path d="M5 8h14"/><path d="M15 21a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2z"/></svg>
  ),
  Settings: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
  ),
  Security: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
  ),
  Search: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
  ),
  Filter: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
  ),
  Plus: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
  ),
  Download: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
  ),
  Check: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
  )
};

export const MOCK_EMPLOYEES: Employee[] = [
  { 
    id: '1', name: 'John Doe', email: 'john@zenpayroll.com', department: 'Engineering', position: 'Lead Engineer', salary: 8500, status: 'Active', joinDate: '2021-03-12',
    salaryStructure: {
      basic: 4500,
      allowances: [
        { name: 'House Rent Allowance', amount: 2000, type: 'Earning' },
        { name: 'Conveyance Allowance', amount: 500, type: 'Earning' },
        { name: 'Performance Bonus', amount: 1500, type: 'Earning' },
      ],
      deductions: [
        { name: 'Provident Fund', amount: 450, type: 'Deduction' },
        { name: 'Professional Tax', amount: 200, type: 'Deduction' },
        { name: 'Insurance', amount: 350, type: 'Deduction' },
      ],
      netPay: 7500
    }
  },
  { id: '2', name: 'Jane Smith', email: 'jane@zenpayroll.com', department: 'HR', position: 'HR Manager', salary: 7200, status: 'Active', joinDate: '2020-05-20' },
  { id: '3', name: 'Robert Brown', email: 'robert@zenpayroll.com', department: 'Finance', position: 'Analyst', salary: 6800, status: 'Active', joinDate: '2022-01-15' },
  { id: '4', name: 'Emily White', email: 'emily@zenpayroll.com', department: 'Engineering', position: 'Frontend Dev', salary: 5500, status: 'On Leave', joinDate: '2022-09-10' },
  { id: '5', name: 'Michael Scott', email: 'michael@zenpayroll.com', department: 'Management', position: 'Regional Manager', salary: 9500, status: 'Active', joinDate: '2019-11-11' },
];

export const MOCK_ATTENDANCE: AttendanceRecord[] = [
  { id: 'a1', employeeId: '1', date: '2024-06-21', clockIn: '09:05 AM', clockOut: '06:15 PM', status: 'Present' },
  { id: 'a2', employeeId: '2', date: '2024-06-21', clockIn: '08:55 AM', clockOut: '05:30 PM', status: 'Present' },
  { id: 'a3', employeeId: '3', date: '2024-06-21', clockIn: null, clockOut: null, status: 'Absent' },
  { id: 'a4', employeeId: '4', date: '2024-06-21', clockIn: null, clockOut: null, status: 'Leave' },
  { id: 'a5', employeeId: '5', date: '2024-06-21', clockIn: '10:15 AM', clockOut: '07:00 PM', status: 'Late' },
];

export const MOCK_PAYSLIPS: Payslip[] = [
  { id: 'ps1', employeeId: '1', month: 'May', year: 2024, grossEarnings: 8500, totalDeductions: 1000, netPay: 7500, generationDate: '2024-05-31' },
  { id: 'ps2', employeeId: '1', month: 'April', year: 2024, grossEarnings: 8500, totalDeductions: 1000, netPay: 7500, generationDate: '2024-04-30' },
];

export const MOCK_CHART_DATA = [
  { name: 'Jan', payroll: 45000, employees: 42 },
  { name: 'Feb', payroll: 47000, employees: 44 },
  { name: 'Mar', payroll: 46500, employees: 44 },
  { name: 'Apr', payroll: 48000, employees: 46 },
  { name: 'May', payroll: 51000, employees: 48 },
  { name: 'Jun', payroll: 50500, employees: 48 },
];
