import { Outlet } from "react-router";
import { Battery, Signal, Wifi } from "lucide-react";

export function PhoneFrame() {
  const currentTime = new Date().toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit',
    hour12: true 
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center p-4">
      {/* Phone Frame */}
      <div className="relative w-full max-w-[380px] h-[800px] bg-black rounded-[3rem] shadow-2xl p-3 border-8 border-slate-800">
        {/* Screen */}
        <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden flex flex-col">
          {/* Status Bar */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-3 flex items-center justify-between text-sm">
            <span className="font-medium">{currentTime}</span>
            <div className="flex items-center gap-2">
              <Signal className="size-4" />
              <Wifi className="size-4" />
              <Battery className="size-4" />
            </div>
          </div>

          {/* App Content */}
          <div className="flex-1 overflow-y-auto">
            <Outlet />
          </div>
        </div>

        {/* Home Button */}
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-16 h-1 bg-slate-700 rounded-full" />
      </div>
    </div>
  );
}
