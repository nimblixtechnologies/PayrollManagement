
import React from 'react';
import { Icons, MOCK_EMPLOYEES, MOCK_PAYSLIPS } from '../constants';

const Payslip: React.FC = () => {
  const emp = MOCK_EMPLOYEES[0]; // Self
  const slip = MOCK_PAYSLIPS[0];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Payslips</h1>
          <p className="text-sm text-gray-500">View and download your salary statements</p>
        </div>
        <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg">
          <Icons.Download />
        </button>
      </header>

      <div className="max-w-4xl mx-auto bg-white border border-gray-200 shadow-2xl rounded-sm overflow-hidden p-12 relative">
        {/* Official Document Style */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-blue-600"></div>
        
        {/* Header */}
        <div className="flex justify-between items-start border-b border-gray-100 pb-8 mb-8">
          <div className="space-y-1">
            <div className="flex items-center space-x-2 text-blue-600 mb-2">
              <Icons.Security />
              <span className="font-bold text-xl tracking-tight text-gray-900">ZenPayroll</span>
            </div>
            <p className="text-xs text-gray-500">123 Business Parkway, Suite 500</p>
            <p className="text-xs text-gray-500">Enterprise District, CA 90210</p>
          </div>
          <div className="text-right">
            <h2 className="text-2xl font-extrabold text-gray-900 uppercase tracking-tighter">Payslip</h2>
            <p className="text-sm text-gray-500 font-medium">{slip.month} {slip.year}</p>
          </div>
        </div>

        {/* Employee Info */}
        <div className="grid grid-cols-2 gap-8 mb-12">
          <div className="space-y-4">
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Employee Name</p>
              <p className="text-sm font-bold text-gray-900">{emp.name}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Employee ID</p>
              <p className="text-sm font-bold text-gray-900">EMP-{emp.id.padStart(4, '0')}</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Department</p>
              <p className="text-sm font-bold text-gray-900">{emp.department}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Designation</p>
              <p className="text-sm font-bold text-gray-900">{emp.position}</p>
            </div>
          </div>
        </div>

        {/* Breakdown Table */}
        <div className="grid grid-cols-2 gap-0 border border-gray-200">
          <div className="border-r border-gray-200">
            <div className="bg-gray-50 p-3 border-b border-gray-200">
              <span className="text-xs font-bold text-gray-700 uppercase tracking-widest">Earnings</span>
            </div>
            <div className="p-4 space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Basic Pay</span>
                <span className="font-bold">$4,500.00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">HRA</span>
                <span className="font-bold">$2,000.00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Performance Bonus</span>
                <span className="font-bold">$1,500.00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Conveyance</span>
                <span className="font-bold">$500.00</span>
              </div>
            </div>
          </div>
          <div>
            <div className="bg-gray-50 p-3 border-b border-gray-200">
              <span className="text-xs font-bold text-gray-700 uppercase tracking-widest">Deductions</span>
            </div>
            <div className="p-4 space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Provident Fund</span>
                <span className="font-bold">$450.00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Professional Tax</span>
                <span className="font-bold">$200.00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Insurance</span>
                <span className="font-bold">$350.00</span>
              </div>
            </div>
          </div>
        </div>

        {/* Totals */}
        <div className="grid grid-cols-2 gap-0 border-x border-b border-gray-200">
          <div className="p-4 border-r border-gray-200 bg-gray-50/30">
            <div className="flex justify-between text-sm font-bold">
              <span>Gross Earnings</span>
              <span>$8,500.00</span>
            </div>
          </div>
          <div className="p-4 bg-gray-50/30">
            <div className="flex justify-between text-sm font-bold">
              <span>Total Deductions</span>
              <span className="text-rose-600">($1,000.00)</span>
            </div>
          </div>
        </div>

        {/* Net Pay Box */}
        <div className="mt-12 bg-gray-900 text-white p-8 rounded-sm flex justify-between items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest opacity-60 mb-1">Net Salary Payable</p>
            <p className="text-sm opacity-80 italic">Amount in words: Seven Thousand Five Hundred Dollars Only</p>
          </div>
          <div className="text-right">
            <p className="text-4xl font-extrabold tracking-tighter">${slip.netPay.toLocaleString()}.00</p>
          </div>
        </div>

        {/* Footer Notes */}
        <div className="mt-12 pt-8 border-t border-gray-100 flex justify-between items-end">
          <div className="text-[10px] text-gray-400 space-y-1">
            <p>Generated on: {slip.generationDate}</p>
            <p>This is a computer-generated document and does not require a physical signature.</p>
            <p>© 2024 ZenPayroll Enterprise Solutions. All rights reserved.</p>
          </div>
          <div className="text-right">
             <div className="w-24 h-24 border border-gray-100 bg-gray-50/50 flex items-center justify-center grayscale opacity-30">
                <div className="text-[8px] font-bold text-center">SECURE<br/>QR CODE</div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payslip;
