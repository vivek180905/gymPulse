import React, { useState } from 'react';
import { Bell, Search, Check, Plus } from 'lucide-react';

export default function Header({ activeTab, notifications, setNotifications, onCheckIn }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [checkInInput, setCheckInInput] = useState('');
  const [checkInSuccess, setCheckInSuccess] = useState(false);

  const unreadCount = notifications.filter(n => n.unread).length;

  const handleQuickCheckIn = (e) => {
    e.preventDefault();
    if (!checkInInput.trim()) return;
    onCheckIn(checkInInput);
    setCheckInInput('');
    setCheckInSuccess(true);
    setTimeout(() => setCheckInSuccess(false), 3000);
  };

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const getTitle = () => {
    switch (activeTab) {
      case 'dashboard': return 'Operational Dashboard';
      case 'members': return 'Membership Directory';
      case 'classes': return 'Group Fitness Scheduler';
      case 'trainers': return 'Trainer & Staff Hub';
      case 'financials': return 'Financial Analytics';
      default: return 'GymPulse';
    }
  };

  return (
    <header className="bg-slate-900 border-b border-slate-800 h-20 px-8 flex items-center justify-between z-20 relative">
      <div>
        <h2 className="text-2xl font-bold text-white tracking-tight">{getTitle()}</h2>
        <p className="text-xs text-slate-400 mt-0.5">Welcome back, Admin. Here is today's overview.</p>
      </div>

      <div className="flex items-center gap-6">
        {/* Quick Check-In Bar */}
        <form onSubmit={handleQuickCheckIn} className="relative flex items-center">
          <input
            type="text"
            placeholder="Quick Check-In (ID or Name)..."
            value={checkInInput}
            onChange={(e) => setCheckInInput(e.target.value)}
            className="bg-slate-950 border border-slate-800 text-slate-200 rounded-xl pl-4 pr-12 py-2 text-sm focus:outline-none focus:border-emerald-500 w-64 transition-all"
          />
          <button 
            type="submit" 
            className={`absolute right-1.5 p-1.5 rounded-lg transition-all ${
              checkInSuccess ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {checkInSuccess ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          </button>
        </form>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl transition-all"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-slate-900 animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden z-50">
              <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-950/40">
                <h4 className="font-bold text-sm text-white">Notifications</h4>
                {unreadCount > 0 && (
                  <button onClick={markAllRead} className="text-xs text-emerald-400 hover:underline font-medium">
                    Mark all read
                  </button>
                )}
              </div>
              <div className="divide-y divide-slate-800 max-h-64 overflow-y-auto">
                {notifications.map((n) => (
                  <div key={n.id} className={`p-4 text-xs transition-colors ${n.unread ? 'bg-emerald-500/5' : 'hover:bg-slate-800/50'}`}>
                    <div className="flex justify-between items-start gap-2">
                      <p className={`font-medium ${n.unread ? 'text-emerald-300' : 'text-slate-300'}`}>{n.text}</p>
                      {n.unread && <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 mt-1" />}
                    </div>
                    <span className="text-slate-500 block mt-1">{n.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}