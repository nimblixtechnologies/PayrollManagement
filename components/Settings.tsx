
import React from 'react';

const Settings: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header>
        <h1 className="text-2xl font-bold text-gray-900">Enterprise Settings</h1>
        <p className="text-sm text-gray-500">Global configurations for payroll, tax, and compliance</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <aside className="md:col-span-1 space-y-1">
          {['Organization', 'Payroll Rules', 'Compliance', 'Security', 'Notifications', 'Integrations'].map((tab, i) => (
            <button key={tab} className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              i === 1 ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:bg-gray-50'
            }`}>
              {tab}
            </button>
          ))}
        </aside>

        <main className="md:col-span-3 space-y-6">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-8">
            <section className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900 border-b border-gray-50 pb-2">Payroll Cycle</h3>
              <div className="grid grid-cols-2 gap-6">
                 <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Cycle Frequency</label>
                    <select className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none">
                       <option>Monthly</option>
                       <option>Bi-Weekly</option>
                       <option>Weekly</option>
                    </select>
                 </div>
                 <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Payout Day</label>
                    <input type="number" defaultValue={30} className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none" />
                 </div>
              </div>
            </section>

            <section className="space-y-4">
               <h3 className="text-lg font-bold text-gray-900 border-b border-gray-50 pb-2">Compliance Rules</h3>
               <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 bg-gray-50/50 rounded-xl border border-gray-100">
                     <div>
                        <p className="text-sm font-bold text-gray-900">Auto-calculate Tax Withholding</p>
                        <p className="text-xs text-gray-500">Updates based on local jurisdiction changes</p>
                     </div>
                     <div className="w-12 h-6 bg-blue-600 rounded-full relative">
                        <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                     </div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50/50 rounded-xl border border-gray-100">
                     <div>
                        <p className="text-sm font-bold text-gray-900">Overtime Multiplier</p>
                        <p className="text-xs text-gray-500">Default rate for weekend/holiday hours</p>
                     </div>
                     <div className="flex items-center space-x-2">
                        <span className="text-sm font-bold">1.5x</span>
                        <button className="text-blue-600 text-xs font-bold">Edit</button>
                     </div>
                  </div>
               </div>
            </section>

            <div className="pt-6 border-t border-gray-50 flex justify-end space-x-4">
               <button className="px-6 py-2 text-sm font-bold text-gray-500 hover:text-gray-700">Discard</button>
               <button className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all">Save Changes</button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;
