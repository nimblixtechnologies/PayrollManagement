
import React, { useState } from 'react';
import { Icons } from '../constants';
import { UserRole } from '../types';

interface LoginProps {
  onLogin: (role: UserRole) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      if (email === 'admin@zenpayroll.com' && password === 'password') {
        onLogin('Admin');
      } else if (email === 'user@zenpayroll.com' && password === 'password') {
        onLogin('Employee');
      } else {
        setError('Invalid credentials. Check email or contact your HR administrator.');
        setIsLoading(false);
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-3 bg-white rounded-full shadow-sm border border-gray-100 mb-4">
            <Icons.Security />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">ZenPayroll Enterprise</h1>
          <p className="text-gray-500 mt-2 text-sm">Secure biometric-ready payroll access</p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Work Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. admin@company.com"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-sm"
              />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <a href="#" className="text-xs text-blue-600 hover:underline">Forgot?</a>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-sm"
              />
            </div>

            {error && (
              <div className="p-3 bg-rose-50 text-rose-600 text-xs rounded-lg border border-rose-100">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all shadow-lg shadow-blue-200 disabled:opacity-70 flex items-center justify-center"
            >
              {isLoading ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                'Secure Sign In'
              )}
            </button>
          </form>

          <div className="mt-8 flex items-center justify-center space-x-4 grayscale opacity-40">
            <span className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">ISO 27001 Certified</span>
            <div className="h-4 w-px bg-gray-200"></div>
            <span className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">SOC2 Type II</span>
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-xl">
           <p className="text-[10px] font-bold text-blue-800 uppercase tracking-widest mb-2">Demo Credentials</p>
           <p className="text-xs text-blue-700">Admin: <span className="font-mono">admin@zenpayroll.com</span> / <span className="font-mono">password</span></p>
           <p className="text-xs text-blue-700">Employee: <span className="font-mono">user@zenpayroll.com</span> / <span className="font-mono">password</span></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
