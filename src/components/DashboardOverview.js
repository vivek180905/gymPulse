import React, { useState } from 'react';
import { Users, Clock, Shield, Star, Play, ArrowRight, Check } from 'lucide-react';

export default function DashboardOverview({ members, classes, trainers, onCheckIn }) {
  const [quickSearch, setQuickSearch] = useState('');
  const [checkedInMessage, setCheckedInMessage] = useState('');

  // Calculate KPIs
  const activeMembersCount = members.filter(m => m.status === 'Active').length;
  const checkedInToday = members.filter(m => m.checkInTime !== null).length;
  const activeTrainersCount = trainers.filter(t => t.status === 'On-duty').length;

  const handleCheckInSubmit = (e) => {
    e.preventDefault();
    const found = members.find(m => m.id.toLowerCase() === quickSearch.toLowerCase() || m.name.toLowerCase().includes(quickSearch.toLowerCase()));
    if (found) {
      onCheckIn(found.id);
      setCheckedInMessage(`🎉 Checked in: ${found.name}`);
      setQuickSearch('');
      setTimeout(() => setCheckedInMessage(''), 4000);
    } else {
      setCheckedInMessage('❌ Member not found. Try again.');
      setTimeout(() => setCheckedInMessage(''), 4000);
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950/30 to-slate-900 border border-slate-800 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <span className="bg-emerald-500/10 text-emerald-400 text-xs font-bold px-3 py-1 rounded-full border border-emerald-500/20 uppercase tracking-widest">
            Live Gym Status
          </span>
          <h3 className="text-2xl font-black text-white md:text-3xl">Peak Hours Active Now! ⚡</h3>
          <p className="text-slate-400 text-sm max-w-xl">
            We have a high volume of check-ins today. Ensure all floor trainers are active and group classes are prepared.
          </p>
        </div>
        <div className="flex items-center gap-6 bg-slate-950/80 border border-slate-800 p-4 rounded-2xl shrink-0">
          <div className="text-center">
            <span className="block text-3xl font-black text-emerald-400">{checkedInToday}</span>
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">In Gym Now</span>
          </div>
          <div className="h-10 w-px bg-slate-800" />
          <div className="text-center">
            <span className="block text-3xl font-black text-white">85%</span>
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Capacity</span>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1 */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-emerald-500/30 transition-all group">
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Active Members</span>
              <h4 className="text-3xl font-black text-white group-hover:text-emerald-400 transition-colors">{activeMembersCount}</h4>
            </div>
            <div className="bg-emerald-500/10 text-emerald-400 p-3 rounded-xl">
              <Users className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
            <span>+12% from last month</span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-emerald-500/30 transition-all group">
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Daily Check-ins</span>
              <h4 className="text-3xl font-black text-white group-hover:text-emerald-400 transition-colors">{checkedInToday}</h4>
            </div>
            <div className="bg-emerald-500/10 text-emerald-400 p-3 rounded-xl">
              <Clock className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
            <span>Peak hours: 5PM - 8PM</span>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-emerald-500/30 transition-all group">
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Monthly Revenue</span>
              <h4 className="text-3xl font-black text-white group-hover:text-emerald-400 transition-colors">$14,250</h4>
            </div>
            <div className="bg-emerald-500/10 text-emerald-400 p-3 rounded-xl">
              <Shield className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
            <span>Target: $15,000 (95%)</span>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-emerald-500/30 transition-all group">
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Active Trainers</span>
              <h4 className="text-3xl font-black text-white group-hover:text-emerald-400 transition-colors">{activeTrainersCount}</h4>
            </div>
            <div className="bg-emerald-500/10 text-emerald-400 p-3 rounded-xl">
              <Star className="w-6 h-6" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
            <span>All shifts covered today</span>
          </div>
        </div>
      </div>

      {/* Quick Check-In & Live Feed Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Quick Action Panel */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between">
          <div>
            <h4 className="text-lg font-bold text-white mb-2">Front Desk Check-In</h4>
            <p className="text-xs text-slate-400 mb-6">Scan member barcode or type name/ID to instantly log attendance.</p>
            
            <form onSubmit={handleCheckInSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Member ID or Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. M-101 or Alexander"
                  value={quickSearch}
                  onChange={(e) => setQuickSearch(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 text-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 transition-all"
                />
              </div>
              <button 
                type="submit"
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4 fill-current" />
                Log Attendance
              </button>
            </form>
          </div>

          {checkedInMessage && (
            <div className="mt-4 p-4 rounded-xl bg-slate-950 border border-slate-800 text-center text-sm font-semibold text-emerald-400 animate-bounce">
              {checkedInMessage}
            </div>
          )}
        </div>

        {/* Right: Live Attendance Feed */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h4 className="text-lg font-bold text-white">Live Attendance Feed</h4>
              <p className="text-xs text-slate-400">Real-time check-ins for today</p>
            </div>
            <span className="bg-emerald-500/10 text-emerald-400 text-xs font-bold px-3 py-1 rounded-full border border-emerald-500/20">
              Live Feed
            </span>
          </div>

          <div className="space-y-4 max-h-[280px] overflow-y-auto pr-2">
            {members.filter(m => m.checkInTime).map((member) => (
              <div key={member.id} className="flex items-center justify-between p-3 bg-slate-950/50 border border-slate-800 rounded-xl hover:border-slate-700 transition-all">
                <div className="flex items-center gap-3.5">
                  <img 
                    src={member.photo} 
                    alt={member.name} 
                    className="w-10 h-10 rounded-full object-cover border border-slate-800"
                  />
                  <div>
                    <h5 className="text-sm font-bold text-white">{member.name}</h5>
                    <span className="text-xs text-slate-400">ID: {member.id} • Plan: <span className="text-emerald-400 font-medium">{member.plan}</span></span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-400 font-medium">Checked in at {member.checkInTime}</span>
                  <div className="bg-emerald-500/10 text-emerald-400 p-1.5 rounded-lg">
                    <Check className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ))}
            {members.filter(m => m.checkInTime).length === 0 && (
              <div className="text-center py-12 text-slate-500 text-sm">
                No members checked in yet today. 🏋️
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}