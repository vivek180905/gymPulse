import React from 'react';
import { Home, Users, Calendar, Star, Shield, Heart } from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab }) {
  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: Home },
    { id: 'members', name: 'Members', icon: Users },
    { id: 'classes', name: 'Class Scheduler', icon: Calendar },
    { id: 'trainers', name: 'Trainers & Staff', icon: Star },
    { id: 'financials', name: 'Financials', icon: Shield },
  ];

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between z-10">
      <div>
        {/* Logo / Brand */}
        <div className="p-6 flex items-center gap-3 border-b border-slate-800">
          <div className="bg-emerald-500 p-2 rounded-lg text-slate-950">
            <Heart className="w-6 h-6 fill-current" />
          </div>
          <div>
            <h1 className="font-extrabold text-xl tracking-wider text-white flex items-center gap-1">
              GYM<span className="text-emerald-400">PULSE</span>
            </h1>
            <span className="text-xs text-slate-400 font-medium tracking-widest uppercase">Admin Portal</span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="p-4 space-y-1.5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5px]' : 'stroke-[1.8px]'}`} />
                {item.name}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Profile / Quick Info */}
      <div className="p-4 border-t border-slate-800 bg-slate-950/50">
        <div className="flex items-center gap-3 p-2">
          <img
            src="https://randomuser.me/api/portraits/men/75.jpg"
            alt="Admin"
            className="w-10 h-10 rounded-full border-2 border-emerald-500 object-cover"
          />
          <div>
            <h4 className="text-sm font-bold text-white">Amit Singh</h4>
            <p className="text-xs text-emerald-400 font-medium">General Manager ⚡</p>
          </div>
        </div>
      </div>
    </aside>
  );
}