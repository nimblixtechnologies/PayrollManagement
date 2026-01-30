
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
    { id: 'Employees', label: 'Workforce', icon: Icons.Employees },
    { id: 'Attendance', label: 'Daily Logs', icon: Icons.Attendance },
    { id: 'SalaryStructure', label: 'Payroll setup', icon: Icons.Salary },
    { id: 'PayrollProcess', label: 'Run Cycle', icon: Icons.Payroll },
    { id: 'Insights', label: 'Intelligence', icon: Icons.Insights },
    { id: 'Settings', label: 'System Settings', icon: Icons.Settings },
  ];

  const employeeItems: { id: ViewType; label: string; icon: React.FC }[] = [
    { id: 'UserDashboard', label: 'My Portal', icon: Icons.Dashboard },
    { id: 'MyPayslip', label: 'Salary Slips', icon: Icons.Salary },
    { id: 'Attendance', label: 'Attendance', icon: Icons.Attendance },
    { id: 'Settings', label: 'Preferences', icon: Icons.Settings },
  ];

  const menuItems = role === 'Admin' ? adminItems : employeeItems;

  return (
    <aside className="w-72 bg-slate-900 flex flex-col fixed inset-y-0 z-50 overflow-hidden">
      {/* Decorative gradient background for enterprise feel */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[100px] pointer-events-none"></div>
      
      <div className="p-8 relative">
        <div className="flex items-center space-x-3 text-white">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Icons.Security />
          </div>
          <div>
            <span className="font-extrabold text-xl tracking-tight block">ZenPayroll</span>
            <span className="text-[10px] font-bold text-blue-400 uppercase tracking-[0.2em]">Enterprise</span>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto relative">
        <div className="px-4 mb-4">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Main Menu</p>
        </div>
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveView(item.id)}
            className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 group ${
              activeView === item.id
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20 translate-x-1'
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <div className="flex items-center space-x-3">
              <span className={activeView === item.id ? 'text-white' : 'group-hover:text-blue-400 transition-colors'}>
                <item.icon />
              </span>
              <span>{item.label}</span>
            </div>
            {activeView === item.id && (
              <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
            )}
          </button>
        ))}
      </nav>

      <div className="p-6 relative">
        <div className="bg-slate-800/50 backdrop-blur-md rounded-2xl p-4 border border-slate-700/50">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-xs shadow-md">
              {role === 'Admin' ? 'AD' : 'JD'}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold text-white truncate">{role === 'Admin' ? 'Admin User' : 'John Doe'}</p>
              <p className="text-[10px] text-slate-400 font-medium truncate">{role === 'Admin' ? 'Super Admin' : 'Lead Engineer'}</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 transition-all border border-rose-500/20"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
            <span>Sign Out Securely</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
