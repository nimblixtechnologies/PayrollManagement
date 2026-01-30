
import React from 'react';
import { Icons, MOCK_EMPLOYEES } from '../constants';

const SalaryStructure: React.FC = () => {
  // We'll show the lead engineer's structure as an example
  const emp = MOCK_EMPLOYEES[0];
  const structure = emp.salaryStructure!;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Salary Structure Configuration</h1>
          <p className="text-sm text-gray-500">Detailed breakdown of remuneration components for {emp.name}</p>
        </div>
        <div className="flex space-x-2">
          <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors">Download PDF</button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm">Save Changes</button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Earnings */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
              <span className="p-2 bg-emerald-50 text-emerald-600 rounded-lg mr-3">
                <Icons.Plus />
              </span>
              Earnings
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 rounded-lg bg-gray-50 border border-gray-100">
                <span className="text-sm text-gray-600">Basic Pay</span>
                <span className="text-sm font-bold text-gray-900">${structure.basic.toLocaleString()}</span>
              </div>
              {structure.allowances.map((comp, idx) => (
                <div key={idx} className="flex justify-between items-center p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <span className="text-sm text-gray-600">{comp.name}</span>
                  <span className="text-sm font-bold text-gray-900">${comp.amount.toLocaleString()}</span>
                </div>
              ))}
              <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                <span className="text-sm font-bold text-gray-900 uppercase tracking-wider">Gross Pay</span>
                <span className="text-lg font-extrabold text-gray-900">
                  ${(structure.basic + structure.allowances.reduce((acc, curr) => acc + curr.amount, 0)).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Deductions */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
              <span className="p-2 bg-rose-50 text-rose-600 rounded-lg mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/></svg>
              </span>
              Deductions
            </h3>
            <div className="space-y-4">
              {structure.deductions.map((comp, idx) => (
                <div key={idx} className="flex justify-between items-center p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <span className="text-sm text-gray-600">{comp.name}</span>
                  <span className="text-sm font-bold text-rose-600">-${comp.amount.toLocaleString()}</span>
                </div>
              ))}
              <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                <span className="text-sm font-bold text-gray-900 uppercase tracking-wider">Total Deductions</span>
                <span className="text-lg font-extrabold text-rose-600">
                  -${structure.deductions.reduce((acc, curr) => acc + curr.amount, 0).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Card */}
        <div className="space-y-6">
          <div className="bg-blue-600 p-8 rounded-2xl shadow-xl shadow-blue-100 text-white flex flex-col justify-between h-full min-h-[400px]">
            <div>
              <h3 className="text-xl font-bold mb-2">Net Salary</h3>
              <p className="text-blue-100 opacity-80 text-sm">Monthly take-home amount after all calculations.</p>
            </div>
            
            <div className="space-y-8">
              <div className="text-6xl font-extrabold tracking-tight">
                ${structure.netPay.toLocaleString()}
              </div>
              
              <div className="space-y-4 pt-8 border-t border-blue-500/50">
                <div className="flex justify-between text-xs opacity-70 font-bold uppercase tracking-widest">
                  <span>Component</span>
                  <span>Impact</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Earnings Ratio</span>
                  <div className="w-24 bg-blue-500 h-1.5 rounded-full">
                    <div className="bg-white h-full rounded-full w-[85%]"></div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Tax Efficiency</span>
                  <div className="w-24 bg-blue-500 h-1.5 rounded-full">
                    <div className="bg-white h-full rounded-full w-[92%]"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex items-center space-x-3 text-[10px] font-bold uppercase tracking-widest opacity-60">
              <Icons.Security />
              <span>Verified for Payroll Cycle 06/24</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalaryStructure;
