
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import StatsCard from './StatsCard';
import { Icons, MOCK_CHART_DATA, MOCK_EMPLOYEES } from '../constants';
import { getPayrollInsights } from '../services/gemini';

const Dashboard: React.FC = () => {
  const [insights, setInsights] = useState<any[]>([]);
  const [loadingInsights, setLoadingInsights] = useState(true);

  useEffect(() => {
    const fetchInsights = async () => {
      const data = await getPayrollInsights(MOCK_CHART_DATA);
      setInsights(data);
      setLoadingInsights(false);
    };
    fetchInsights();
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Enterprise Overview</h1>
          <p className="text-slate-500 font-medium mt-1">Real-time HR analytics & financial health monitoring.</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex -space-x-2 overflow-hidden">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-400">
                {String.fromCharCode(64 + i)}
              </div>
            ))}
            <div className="flex items-center justify-center h-8 w-8 rounded-full ring-2 ring-white bg-blue-600 text-white text-[10px] font-bold">
              +44
            </div>
          </div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Active Staff</span>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Headcount"
          value="48"
          subtitle="Retention Rate: 98%"
          trend={{ value: 4.3, isPositive: true }}
          color="blue"
          icon={<Icons.Employees />}
        />
        <StatsCard
          title="Monthly Outflow"
          value="$50,500"
          subtitle="Jun 2024 Cycle"
          trend={{ value: 1.2, isPositive: false }}
          color="amber"
          icon={<Icons.Payroll />}
        />
        <StatsCard
          title="Compliance Rate"
          value="100%"
          subtitle="SOC2 / ISO Audited"
          color="emerald"
          icon={<Icons.Security />}
        />
        <StatsCard
          title="Staff Engagement"
          value="9.4"
          subtitle="Avg feedback score"
          trend={{ value: 2.1, isPositive: true }}
          color="blue"
          icon={<Icons.Insights />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-8">
          {/* Revenue/Payroll Area Chart */}
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Icons.Salary />
            </div>
            <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="text-lg font-bold text-slate-900 tracking-tight">Financial Trends</h3>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Payroll Disbursement History</p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Gross Pay</span>
                </div>
              </div>
            </div>
            <div className="h-[320px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={MOCK_CHART_DATA}>
                  <defs>
                    <linearGradient id="colorPayroll" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 600 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 600 }} tickFormatter={(val) => `$${val / 1000}k`} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#fff', borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                  />
                  <Area type="monotone" dataKey="payroll" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorPayroll)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Activity Table */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="px-8 py-6 border-b border-slate-50 bg-slate-50/30 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold text-slate-900 tracking-tight">Live Activity</h3>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Recent Transactions & Events</p>
              </div>
              <button className="text-xs font-bold text-blue-600 bg-blue-50 px-4 py-2 rounded-xl hover:bg-blue-100 transition-colors">
                View Ledger
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-50">
                    <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Employee</th>
                    <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Reference</th>
                    <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Timestamp</th>
                    <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Amount</th>
                    <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {MOCK_EMPLOYEES.slice(0, 5).map((emp) => (
                    <tr key={emp.id} className="group hover:bg-slate-50/50 transition-colors">
                      <td className="px-8 py-5">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-[10px]">
                            {emp.name[0]}
                          </div>
                          <span className="text-sm font-bold text-slate-900">{emp.name}</span>
                        </div>
                      </td>
                      <td className="px-8 py-5 text-sm text-slate-500 font-medium">Salary Disbursement</td>
                      <td className="px-8 py-5 text-sm text-slate-400 font-medium">30 Jun 2024</td>
                      <td className="px-8 py-5 text-sm font-bold text-slate-900">${emp.salary.toLocaleString()}</td>
                      <td className="px-8 py-5">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-lg text-[10px] font-bold uppercase tracking-tight bg-emerald-50 text-emerald-600">
                          Processed
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Actionable Sidebar */}
        <div className="space-y-8">
          {/* AI Insights Card */}
          <div className="bg-slate-900 p-8 rounded-3xl shadow-xl shadow-slate-200 relative overflow-hidden group">
            {/* Visual background effect */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all"></div>
            
            <div className="relative">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-white tracking-tight flex items-center">
                  <span className="mr-3 p-2 bg-blue-500/20 rounded-xl text-blue-400 border border-blue-500/20 animate-pulse">✨</span> 
                  AI Engine
                </h3>
                <div className="text-[10px] font-bold text-blue-400 bg-blue-400/10 px-2 py-1 rounded-lg uppercase tracking-widest border border-blue-400/20">
                  Active
                </div>
              </div>
              
              {loadingInsights ? (
                <div className="space-y-4 animate-pulse">
                  {[1, 2].map(i => (
                    <div key={i} className="h-24 bg-white/5 rounded-2xl border border-white/5"></div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {insights.map((insight, idx) => (
                    <div key={idx} className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/[0.08] transition-all group/insight cursor-default">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-sm font-bold text-blue-100 group-hover/insight:text-blue-400 transition-colors">{insight.title}</h4>
                        <span className={`text-[9px] px-2 py-0.5 rounded-lg font-bold uppercase tracking-widest ${
                          insight.impact === 'High' ? 'bg-rose-500/20 text-rose-400' :
                          insight.impact === 'Medium' ? 'bg-amber-500/20 text-amber-400' : 'bg-blue-500/20 text-blue-400'
                        }`}>
                          {insight.impact}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed font-medium">{insight.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Action Center */}
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-6 tracking-tight uppercase tracking-widest text-[10px] text-slate-400">Critical Actions</h3>
            <div className="space-y-6">
              <div className="flex items-start space-x-4 group cursor-pointer">
                <div className="mt-1 w-3 h-3 rounded-full bg-rose-500 shadow-lg shadow-rose-200 ring-4 ring-rose-50 transition-all group-hover:scale-125"></div>
                <div>
                  <p className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">Regulatory Tax Filing</p>
                  <p className="text-xs font-bold text-slate-400 mt-0.5 uppercase tracking-tight">Due in 48 hours</p>
                </div>
              </div>
              <div className="flex items-start space-x-4 group cursor-pointer">
                <div className="mt-1 w-3 h-3 rounded-full bg-amber-500 shadow-lg shadow-amber-200 ring-4 ring-amber-50 transition-all group-hover:scale-125"></div>
                <div>
                  <p className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">Audit Leave Records</p>
                  <p className="text-xs font-bold text-slate-400 mt-0.5 uppercase tracking-tight">4 Pending approvals</p>
                </div>
              </div>
              <div className="flex items-start space-x-4 group cursor-pointer">
                <div className="mt-1 w-3 h-3 rounded-full bg-blue-500 shadow-lg shadow-blue-200 ring-4 ring-blue-50 transition-all group-hover:scale-125"></div>
                <div>
                  <p className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">Bank API Status</p>
                  <p className="text-xs font-bold text-slate-400 mt-0.5 uppercase tracking-tight">Connected & Secure</p>
                </div>
              </div>
            </div>
            
            <button className="w-full mt-8 py-4 bg-slate-50 text-slate-600 rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-slate-100 transition-all border border-slate-100">
              Refresh Monitor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
