
import React from 'react';
import { Icons } from '../constants';
import { ViewType, UserRole } from '../types';

interface SidebarProps {
  activeView: ViewType;
  setActiveView: (view: ViewType) => void;
  onLogout: () => void;
  role: UserRole;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView, onLogout, role }) => {
  const adminItems: { id: ViewType; label: string; icon: React.FC }[] = [
    { id: 'Dashboard', label: 'Overview', icon: Icons.Dashboard },
    { id: 'Employees', label: 'Employees', icon: Icons.Employees },
    { id: 'Attendance', label: 'Attendance', icon: Icons.Attendance },
    { id: 'SalaryStructure', label: 'Compensation', icon: Icons.Salary },
    { id: 'PayrollProcess', label: 'Run Payroll', icon: Icons.Payroll },
    { id: 'Insights', label: 'AI Insights', icon: Icons.Insights },
    { id: 'Settings', label: 'Configuration', icon: Icons.Settings },
  ];

  const employeeItems: { id: ViewType; label: string; icon: React.FC }[] = [
    { id: 'UserDashboard', label: 'My Dashboard', icon: Icons.Dashboard },
    { id: 'MyPayslip', label: 'Payslips', icon: Icons.Salary },
    { id: 'Attendance', label: 'My Attendance', icon: Icons.Attendance },
    { id: 'Settings', label: 'Account Settings', icon: Icons.Settings },
  ];

  const menuItems = role === 'Admin' ? adminItems : employeeItems;

  return (
    <aside className="w-64 bg-white border-r border-gray-100 flex flex-col fixed inset-y-0 shadow-sm z-50">
      <div className="p-8">
        <div className="flex items-center space-x-3 text-blue-600">
          <Icons.Security />
          <span className="font-bold text-lg text-gray-900 tracking-tight">ZenPayroll</span>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveView(item.id)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
              activeView === item.id
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <item.icon />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 mt-auto border-t border-gray-50">
        <div className="flex items-center space-x-3 px-4 py-3 mb-4">
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs uppercase">
            {role === 'Admin' ? 'AD' : 'JD'}
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-semibold text-gray-900 truncate">{role === 'Admin' ? 'Admin User' : 'John Doe'}</p>
            <p className="text-[10px] text-gray-500 truncate">{role === 'Admin' ? 'HR Operations' : 'Engineering'}</p>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="w-full flex items-center space-x-3 px-4 py-2 rounded-lg text-xs font-medium text-rose-500 hover:bg-rose-50 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
