
import React, { useState } from 'react';
import { Icons, MOCK_EMPLOYEES } from '../constants';

const PayrollProcessing: React.FC = () => {
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  const totalGross = MOCK_EMPLOYEES.reduce((acc, emp) => acc + emp.salary, 0);
  const totalDeductions = totalGross * 0.12; // Simplified
  const totalNet = totalGross - totalDeductions;

  const handleProcess = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep(3);
    }, 3000);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <header>
        <h1 className="text-2xl font-bold text-gray-900">Run Payroll Cycle</h1>
        <p className="text-sm text-gray-500">June 2024 • Final Settlement Period</p>
      </header>

      {/* Progress Tracker */}
      <div className="flex items-center space-x-4">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
              step >= s ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              {s}
            </div>
            {s < 3 && <div className={`w-12 h-0.5 mx-2 ${step > s ? 'bg-blue-600' : 'bg-gray-200'}`}></div>}
          </div>
        ))}
      </div>

      {step === 1 && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Gross Earnings</p>
              <p className="text-2xl font-bold text-gray-900">${totalGross.toLocaleString()}</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Total Deductions</p>
              <p className="text-2xl font-bold text-rose-600">-${totalDeductions.toLocaleString()}</p>
            </div>
            <div className="bg-blue-600 p-6 rounded-xl shadow-lg shadow-blue-100 text-white">
              <p className="text-xs font-bold text-blue-100 uppercase tracking-widest mb-1">Total Net Payable</p>
              <p className="text-2xl font-bold">${totalNet.toLocaleString()}</p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-50 bg-gray-50/50">
              <h3 className="font-bold text-sm text-gray-700">Pre-Payroll Verification</h3>
            </div>
            <div className="p-4 space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-100">
                <div className="flex items-center space-x-3">
                  <Icons.Check />
                  <span className="text-sm">Attendance records synced for 48 employees.</span>
                </div>
                <span className="text-[10px] font-bold uppercase">Verified</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-100">
                <div className="flex items-center space-x-3">
                  <Icons.Check />
                  <span className="text-sm">Tax compliance checks passed.</span>
                </div>
                <span className="text-[10px] font-bold uppercase">Verified</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-blue-50 text-blue-800 border border-blue-100">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 rounded-full border-2 border-blue-400 border-t-transparent animate-spin"></div>
                  <span className="text-sm">Final audit of overtime hours in progress...</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button 
              onClick={() => setStep(2)}
              className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
            >
              Continue to Review
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl flex items-start space-x-3">
            <div className="text-amber-600 mt-1">⚠️</div>
            <div>
              <p className="text-sm font-bold text-amber-900">Final Confirmation Required</p>
              <p className="text-xs text-amber-700">Once processed, funds will be initiated for transfer and payslips will be generated. This action cannot be undone.</p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 text-center">
            <div className="max-w-md mx-auto space-y-6">
              <h2 className="text-3xl font-extrabold text-gray-900">Confirm Disbursement</h2>
              <div className="p-4 bg-gray-50 rounded-2xl space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Processing to</span>
                  <span className="font-bold">48 Bank Accounts</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Value Date</span>
                  <span className="font-bold">June 30, 2024</span>
                </div>
                <div className="pt-2 border-t border-gray-200 flex justify-between font-bold text-lg">
                  <span>Total Debit</span>
                  <span className="text-blue-600">${totalNet.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex space-x-4">
                <button 
                  onClick={() => setStep(1)}
                  className="flex-1 py-3 border border-gray-200 rounded-xl font-bold text-gray-600 hover:bg-gray-50 transition-all"
                >
                  Back
                </button>
                <button 
                  onClick={handleProcess}
                  disabled={isProcessing}
                  className="flex-1 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100 flex items-center justify-center"
                >
                  {isProcessing ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white animate-spin rounded-full"></div>
                  ) : 'Approve & Pay'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-xl p-12 text-center space-y-6 animate-in zoom-in duration-500">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto scale-110">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl font-extrabold text-gray-900">Payroll Finalized</h2>
            <p className="text-gray-500">Transaction ID: TXN_PAY_20240630_ZEN</p>
          </div>
          <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
            <button className="p-3 border border-gray-200 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-50">Download Report</button>
            <button className="p-3 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700">View History</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PayrollProcessing;
