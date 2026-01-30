
import React, { useState } from 'react';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import EmployeeList from './components/EmployeeList';
import Attendance from './components/Attendance';
import SalaryStructure from './components/SalaryStructure';
import PayrollProcessing from './components/PayrollProcessing';
import Payslip from './components/Payslip';
import UserDashboard from './components/UserDashboard';
import Settings from './components/Settings';
import { ViewType, UserRole } from './types';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState<UserRole>('Admin');
  const [activeView, setActiveView] = useState<ViewType>('Dashboard');

  const handleLogin = (userRole: UserRole) => {
    setRole(userRole);
    setIsAuthenticated(true);
    setActiveView(userRole === 'Admin' ? 'Dashboard' : 'UserDashboard');
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  const renderView = () => {
    switch (activeView) {
      case 'Dashboard':
        return <Dashboard />;
      case 'UserDashboard':
        return <UserDashboard />;
      case 'Employees':
        return <EmployeeList />;
      case 'Attendance':
        return <Attendance />;
      case 'SalaryStructure':
        return <SalaryStructure />;
      case 'PayrollProcess':
        return <PayrollProcessing />;
      case 'MyPayslip':
        return <Payslip />;
      case 'Settings':
        return <Settings />;
      case 'Insights':
        return (
          <div className="flex items-center justify-center h-[60vh] text-gray-400">
            <div className="text-center">
              <p className="text-lg font-medium">AI Insights Center</p>
              <p className="text-sm">Synthesizing enterprise data...</p>
            </div>
          </div>
        );
      default:
        return role === 'Admin' ? <Dashboard /> : <UserDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar 
        activeView={activeView} 
        setActiveView={setActiveView} 
        onLogout={() => setIsAuthenticated(false)} 
        role={role}
      />
      
      <main className="flex-1 ml-64 p-10 overflow-y-auto">
        <div className="max-w-7xl mx-auto pb-12">
          {renderView()}
        </div>
      </main>

      <footer className="fixed bottom-0 right-0 p-4 pointer-events-none z-50">
        <div className="flex items-center space-x-2 px-3 py-1.5 bg-white border border-gray-100 rounded-full shadow-lg text-[10px] text-gray-400 uppercase tracking-widest font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Security Protocol Active</span>
        </div>
      </footer>
    </div>
  );
};

export default App;
