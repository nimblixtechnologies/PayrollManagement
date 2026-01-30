
import React, { useState, useRef, useEffect } from 'react';
import { Icons, MOCK_ATTENDANCE, MOCK_EMPLOYEES } from '../constants';
import { AttendanceRecord } from '../types';

type CameraStatus = 'idle' | 'pending' | 'active' | 'denied' | 'not-found';

const Attendance: React.FC = () => {
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const [clockTime, setClockTime] = useState<string | null>(null);
  const [records, setRecords] = useState<AttendanceRecord[]>(MOCK_ATTENDANCE);
  const [location, setLocation] = useState<{lat: number, lng: number} | null>(null);
  const [cameraStatus, setCameraStatus] = useState<CameraStatus>('idle');
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    if (!isClockedIn) {
      startCamera();
    }
    return () => stopCamera();
  }, [isClockedIn]);

  const startCamera = async () => {
    setCameraStatus('pending');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'user', 
          width: { ideal: 640 }, 
          height: { ideal: 480 } 
        } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setCameraStatus('active');
      }
    } catch (err: any) {
      console.error("Camera error:", err);
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setCameraStatus('denied');
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        setCameraStatus('not-found');
      } else {
        setCameraStatus('not-found');
      }
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setCameraStatus('idle');
  };

  const handleClockIn = () => {
    if (cameraStatus !== 'active') {
      alert("Biometric verification (Camera) is required to clock in.");
      return;
    }

    setIsCapturing(true);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setLocation(coords);

        if (videoRef.current && canvasRef.current) {
          const context = canvasRef.current.getContext('2d');
          if (context) {
            canvasRef.current.width = videoRef.current.videoWidth;
            canvasRef.current.height = videoRef.current.videoHeight;
            context.drawImage(videoRef.current, 0, 0);
            const selfieBase64 = canvasRef.current.toDataURL('image/jpeg', 0.8);

            setTimeout(() => {
              const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
              setClockTime(timeStr);
              setIsClockedIn(true);
              setIsCapturing(false);
              stopCamera();

              const newRecord: AttendanceRecord = {
                id: `new-${Date.now()}`,
                employeeId: '1', 
                date: new Date().toISOString().split('T')[0],
                clockIn: timeStr,
                clockOut: null,
                status: 'Present',
                location: coords,
                selfie: selfieBase64
              };
              setRecords([newRecord, ...records]);
            }, 1800);
          }
        }
      },
      (err) => {
        setIsCapturing(false);
        alert("Precision location access is mandatory for enterprise attendance verification.");
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  const handleClockOut = () => {
    setIsClockedIn(false);
    setClockTime(null);
    setLocation(null);
    startCamera();
  };

  const renderCameraState = () => {
    if (isClockedIn) {
      return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-blue-600 text-white animate-in zoom-in duration-500">
          <div className="mb-4 p-4 bg-white/20 rounded-full">
            <Icons.Check />
          </div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-1 opacity-80">Shift Started</p>
          <p className="text-4xl font-black tracking-tighter">{clockTime}</p>
        </div>
      );
    }

    if (cameraStatus === 'denied') {
      return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-rose-50 p-8 text-center">
          <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center text-rose-500 mb-4">
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m1 1 22 22"/><path d="M21 21H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3m3-3h6l2 3h4a2 2 0 0 1 2 2v9.34"/><circle cx="12" cy="13" r="4"/></svg>
          </div>
          <p className="text-sm font-bold text-rose-600 uppercase tracking-widest mb-2">Camera Blocked</p>
          <p className="text-xs text-rose-500 font-medium leading-relaxed">System requires visual verification. Please grant camera access in browser settings.</p>
          <button onClick={startCamera} className="mt-4 px-6 py-2 bg-rose-600 text-white rounded-xl text-xs font-bold hover:bg-rose-700 transition-all shadow-lg shadow-rose-200">
            Re-authorize Camera
          </button>
        </div>
      );
    }

    if (cameraStatus === 'not-found') {
      return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-slate-50 p-8 text-center">
          <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center text-slate-500 mb-4">
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
          </div>
          <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-2">Device Missing</p>
          <p className="text-xs text-slate-400 font-medium">No compatible camera was detected. Connect a verified biometric peripheral.</p>
          <button onClick={startCamera} className="mt-4 text-xs font-bold text-blue-600 hover:underline">Scan Again</button>
        </div>
      );
    }

    if (cameraStatus === 'pending') {
      return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900">
          <div className="w-10 h-10 border-4 border-blue-500/20 border-t-blue-500 animate-spin rounded-full mb-4"></div>
          <p className="text-[10px] font-bold text-blue-400 uppercase tracking-[0.2em]">Syncing Optics...</p>
        </div>
      );
    }

    return (
      <div className="relative w-full h-full bg-slate-900 group">
        <video 
          ref={videoRef} 
          autoPlay 
          muted 
          playsInline 
          className="w-full h-full object-cover transform scale-x-[-1] opacity-80"
        />
        {/* Scanning line effect */}
        {!isCapturing && (
          <div className="absolute top-0 left-0 w-full h-0.5 bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.8)] animate-[scan_3s_ease-in-out_infinite] z-10"></div>
        )}
        {/* Reticle UI */}
        <div className="absolute inset-0 border-[40px] border-slate-900/40 pointer-events-none"></div>
        <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-blue-400 rounded-tl-lg"></div>
        <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-blue-400 rounded-tr-lg"></div>
        <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-blue-400 rounded-bl-lg"></div>
        <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-blue-400 rounded-br-lg"></div>
      </div>
    );
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <style>{`
        @keyframes scan {
          0% { top: 10%; }
          50% { top: 90%; }
          100% { top: 10%; }
        }
      `}</style>

      <header className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Access Control</h1>
          <p className="text-slate-500 font-medium mt-1">Biometric identity verification terminal.</p>
        </div>
        <div className="flex items-center space-x-2 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full uppercase tracking-widest border border-emerald-100">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.6)]"></div>
          <span>Security Level 4</span>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Verification Terminal Card */}
        <div className="lg:col-span-4 bg-white p-10 rounded-[32px] border border-slate-100 shadow-xl flex flex-col items-center justify-center space-y-10 relative overflow-hidden">
          {/* Decorative element */}
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-50 rounded-full blur-3xl opacity-50"></div>
          
          <div className="text-center relative">
            <h3 className="text-xl font-bold text-slate-900">Mark Attendance</h3>
            <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em] mt-2">
              {isClockedIn ? 'Identity Confirmed' : 'Precision Vision Sync'}
            </p>
          </div>
          
          <div className="relative group">
            <div className={`w-56 h-56 rounded-[48px] overflow-hidden border-[6px] transition-all duration-500 ring-8 ring-slate-50 ${
              isClockedIn ? 'border-emerald-500 shadow-2xl shadow-emerald-200' : 'border-slate-100 shadow-xl'
            }`}>
              {renderCameraState()}
              {isCapturing && (
                <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md flex flex-col items-center justify-center animate-in fade-in">
                  <div className="relative">
                    <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 animate-spin rounded-full"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                       <Icons.Check />
                    </div>
                  </div>
                  <p className="mt-4 text-[10px] font-bold text-white uppercase tracking-[0.2em] animate-pulse">Hashing Payload...</p>
                </div>
              )}
            </div>
            
            {/* GPS Pulse Indicator */}
            {!isClockedIn && (
               <div className="absolute -bottom-2 -right-2 bg-white p-3 rounded-2xl shadow-xl border border-slate-50 group-hover:scale-110 transition-transform">
                  <div className={`w-4 h-4 rounded-full ${location ? 'bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.8)]' : 'bg-slate-300'}`}></div>
               </div>
            )}
          </div>

          <div className="w-full space-y-5 relative">
            {!isClockedIn ? (
              <button
                onClick={handleClockIn}
                disabled={isCapturing || cameraStatus !== 'active'}
                className="group w-full py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-bold text-sm tracking-widest uppercase shadow-2xl shadow-slate-200 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3 overflow-hidden"
              >
                <span>{isCapturing ? 'Processing...' : 'Authorize Signature'}</span>
                <Icons.Plus />
              </button>
            ) : (
              <button
                onClick={handleClockOut}
                className="w-full py-4 bg-white border-2 border-rose-100 text-rose-600 hover:bg-rose-50 rounded-2xl font-bold text-sm uppercase tracking-widest transition-all shadow-lg shadow-rose-100"
              >
                Release Shift
              </button>
            )}
            
            <div className="flex justify-center space-x-6">
               <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${location ? 'bg-emerald-500' : 'bg-slate-200'}`}></div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Geolocation</span>
               </div>
               <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${cameraStatus === 'active' ? 'bg-emerald-500' : 'bg-slate-200'}`}></div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Biometrics</span>
               </div>
            </div>
          </div>
          
          <canvas ref={canvasRef} className="hidden" />
        </div>

        {/* Security Audit Log */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
            <div className="px-8 py-6 border-b border-slate-50 bg-slate-50/30 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold text-slate-900 tracking-tight">Audit Trail</h3>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Immutable Verification Records</p>
              </div>
              <div className="flex space-x-2">
                <button className="p-2 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-blue-600 transition-colors shadow-sm">
                  <Icons.Search />
                </button>
                <button className="p-2 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-blue-600 transition-colors shadow-sm">
                   <Icons.Filter />
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50/50">
                    <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Member</th>
                    <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Verification</th>
                    <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Coordinate Map</th>
                    <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Timestamp</th>
                    <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Integrity</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {records.map((record) => {
                    const emp = MOCK_EMPLOYEES.find(e => e.id === record.employeeId);
                    return (
                      <tr key={record.id} className="text-sm hover:bg-slate-50/80 transition-all group">
                        <td className="px-8 py-6">
                           <div className="flex items-center space-x-4">
                              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[10px] font-bold text-blue-600 border border-blue-100 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                 {emp?.name.split(' ').map(n => n[0]).join('')}
                              </div>
                              <span className="font-bold text-slate-900">{emp?.name}</span>
                           </div>
                        </td>
                        <td className="px-8 py-6">
                          {record.selfie ? (
                            <div className="relative group/photo inline-block">
                               <img src={record.selfie} className="w-10 h-10 rounded-xl border-2 border-slate-100 object-cover grayscale-0 hover:scale-110 transition-all cursor-zoom-in" alt="Verification" />
                               <div className="absolute hidden group-hover/photo:block left-12 top-0 z-50 p-2 bg-white border border-slate-100 shadow-2xl rounded-2xl animate-in zoom-in duration-200">
                                  <img src={record.selfie} className="w-40 h-40 object-cover rounded-xl" alt="Large Capture" />
                                  <div className="mt-2 text-center text-[9px] font-bold text-emerald-600 uppercase tracking-widest">Face ID Matched</div>
                               </div>
                            </div>
                          ) : (
                            <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-300">
                               <Icons.Security />
                            </div>
                          )}
                        </td>
                        <td className="px-8 py-6">
                           {record.location ? (
                              <a href={`https://maps.google.com/?q=${record.location.lat},${record.location.lng}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 flex items-center space-x-2 bg-blue-50 px-3 py-1.5 rounded-xl border border-blue-100 w-fit group-hover:bg-blue-600 group-hover:text-white transition-all">
                                 <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                                 <span className="text-[10px] font-bold uppercase tracking-widest">GEO TAG</span>
                              </a>
                           ) : <span className="text-slate-300 text-xs font-bold uppercase tracking-widest">Offline</span>}
                        </td>
                        <td className="px-8 py-6 text-slate-500 font-bold">{record.clockIn || '--'}</td>
                        <td className="px-8 py-6">
                          <span className={`px-3 py-1 rounded-xl text-[10px] font-bold uppercase tracking-widest border ${
                            record.status === 'Present' ? 'text-emerald-600 bg-emerald-50 border-emerald-100' :
                            record.status === 'Late' ? 'text-amber-600 bg-amber-50 border-amber-100' : 'text-slate-400 bg-slate-50 border-slate-100'
                          }`}>
                            {record.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
