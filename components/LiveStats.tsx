import React, { useEffect, useState } from 'react';
import { ApiDailySummary, LoadingState } from '../types';

const LiveStats: React.FC = () => {
  // Keeping the component for 'Recent Rescues' but simplifying the stats cards since they are now in Hero.
  
  return (
    <div id="impact" className="pt-32 pb-20 bg-slate-50">
      <div className="container mx-auto px-4">
        
        {/* Live Feed Placeholder */}
        <div className="bg-white rounded-3xl shadow-lg border border-slate-100 p-8 md:p-12 overflow-hidden">
          <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
            <div>
              <span className="text-red-500 font-bold tracking-wider uppercase text-sm">Transparency Board</span>
              <h3 className="text-3xl font-bold mt-2 text-slate-900 flex items-center gap-3">
                <span className="relative flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span>
                </span>
                Recent Rescues
              </h3>
              <p className="text-slate-500 mt-2 max-w-xl">
                We upload before/after treatment photos for every single case in real-time. This ensures complete transparency for our donors and supporters.
              </p>
            </div>
            <a href="https://api-alwayscare.arham.org/api/cases/today/summary" target="_blank" rel="noreferrer" className="text-red-600 font-semibold hover:text-red-700 hover:underline flex items-center gap-1">
              View Raw Data API &rarr;
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             {/* Mock Items for UI demonstration */}
             {[1, 2, 3].map((i) => (
               <div key={i} className="group relative overflow-hidden rounded-2xl aspect-video bg-slate-200">
                 <img 
                  src={`https://picsum.photos/600/400?random=${i + 10}`} 
                  alt="Rescue Case" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-6 flex flex-col justify-end">
                   <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                     <span className="bg-red-600 text-white text-xs px-2 py-1 rounded-md font-bold mb-2 inline-block">CRITICAL</span>
                     <p className="text-white text-lg font-bold">Case #{2048 + i}</p>
                     <p className="text-slate-300 text-sm mt-1">Treating severe fracture • Ahmedabad • 2 mins ago</p>
                   </div>
                 </div>
               </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveStats;