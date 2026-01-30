
import React from 'react';
import StatsCard from './StatsCard';
import { Icons, MOCK_PAYSLIPS, MOCK_ATTENDANCE } from '../constants';

const UserDashboard: React.FC = () => {
  const lastPayslip = MOCK_PAYSLIPS[0];
  const attendanceCount = MOCK_ATTENDANCE.filter(a => a.status === 'Present').length;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header>
        <h1 className="text-2xl font-bold text-gray-900">Welcome, John</h1>
        <p className="text-sm text-gray-500">Engineering • Senior Lead Developer</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard 
          title="Net Salary (Last Cycle)" 
          value={`$${lastPayslip.netPay.toLocaleString()}`} 
          subtitle={`Disbursed ${lastPayslip.generationDate}`}
          icon={<Icons.Salary />}
        />
        <StatsCard 
          title="Attendance Statistics" 
          value={`${attendanceCount}/30 Days`} 
          subtitle="Precision: 100% Verified"
          icon={<Icons.Attendance />}
        />
        <StatsCard 
          title="Leave Entitlement" 
          value="14 Days" 
          subtitle="Remaining for Fiscal Year"
          icon={<Icons.Employees />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-50 flex justify-between items-center">
            <h3 className="font-bold text-gray-900 text-sm uppercase tracking-tight">Verified Attendance Log</h3>
            <button className="text-xs text-blue-600 font-bold hover:underline">Download Detailed CSV</button>
          </div>
          <div className="overflow-x-auto">
             <table className="w-full">
                <thead className="bg-gray-50/50">
                   <tr>
                      <th className="px-6 py-3 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">Date</th>
                      <th className="px-6 py-3 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">Clock In</th>
                      <th className="px-6 py-3 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">Clock Out</th>
                      <th className="px-6 py-3 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">Security</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                   {MOCK_ATTENDANCE.slice(0, 5).map((row, i) => (
                      <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                         <td className="px-6 py-4 text-sm text-gray-900 font-medium">{row.date}</td>
                         <td className="px-6 py-4 text-sm text-gray-500">{row.clockIn || '--:--'}</td>
                         <td className="px-6 py-4 text-sm text-gray-500">{row.clockOut || '--:--'}</td>
                         <td className="px-6 py-4">
                            <span className="flex items-center space-x-1 text-emerald-600">
                               <Icons.Check />
                               <span className="text-[10px] font-bold uppercase">Verified</span>
                            </span>
                         </td>
                      </tr>
                   ))}
                </tbody>
             </table>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
             <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-tight">Self Service Portal</h3>
             <div className="grid grid-cols-2 gap-3">
                <button className="p-4 bg-gray-50 rounded-lg text-center hover:bg-gray-100 transition-colors border border-gray-100">
                   <div className="text-xl mb-1 text-blue-600">📅</div>
                   <span className="text-[10px] font-bold text-gray-600 uppercase">Leave Request</span>
                </button>
                <button className="p-4 bg-gray-50 rounded-lg text-center hover:bg-gray-100 transition-colors border border-gray-100">
                   <div className="text-xl mb-1 text-blue-600">🧾</div>
                   <span className="text-[10px] font-bold text-gray-600 uppercase">Tax Filing</span>
                </button>
                <button className="p-4 bg-gray-50 rounded-lg text-center hover:bg-gray-100 transition-colors border border-gray-100">
                   <div className="text-xl mb-1 text-blue-600">⚙️</div>
                   <span className="text-[10px] font-bold text-gray-600 uppercase">Profile</span>
                </button>
                <button className="p-4 bg-gray-50 rounded-lg text-center hover:bg-gray-100 transition-colors border border-gray-100">
                   <div className="text-xl mb-1 text-blue-600">❓</div>
                   <span className="text-[10px] font-bold text-gray-600 uppercase">Support</span>
                </button>
             </div>
          </div>

          <div className="bg-gray-900 p-6 rounded-xl shadow-lg text-white">
             <div className="flex items-center space-x-2 text-blue-400 mb-2">
                <Icons.Security />
                <span className="text-[10px] font-bold uppercase tracking-widest">Compliance Status</span>
             </div>
             <p className="text-sm font-bold">Information Security Training</p>
             <p className="text-[10px] text-gray-400 mt-1 mb-4">Required by ISO-27001 standards.</p>
             <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                <div className="bg-blue-500 h-full w-[100%]"></div>
             </div>
             <p className="text-[10px] mt-4 font-bold text-emerald-400 uppercase tracking-widest flex items-center">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-2"></span>
                Completed
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
