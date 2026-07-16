import React, { useState } from 'react';
import { Calendar, Plus, X, Users, Clock } from 'lucide-react';

export default function ClassScheduler({ classes, setClasses, trainers, addNotification }) {
  const [selectedDay, setSelectedDay] = useState('All');
  const [isAddClassOpen, setIsAddClassOpen] = useState(false);
  const [newClass, setNewClass] = useState({
    name: '', trainer: trainers[0]?.name || '', day: 'Monday', time: '08:00 AM', duration: '60 min', capacity: 20, category: 'Strength'
  });

  const daysOfWeek = ['All', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const filteredClasses = selectedDay === 'All' 
    ? classes 
    : classes.filter(c => c.day === selectedDay);

  const handleAddClass = (e) => {
    e.preventDefault();
    if (!newClass.name) return;

    const createdClass = {
      id: `C-${Date.now()}`,
      ...newClass,
      booked: 0
    };

    setClasses(prev => [...prev, createdClass]);
    addNotification(`New class scheduled: ${newClass.name}`);
    setIsAddClassOpen(false);
    setNewClass({ name: '', trainer: trainers[0]?.name || '', day: 'Monday', time: '08:00 AM', duration: '60 min', capacity: 20, category: 'Strength' });
  };

  const handleBookSpot = (classId) => {
    setClasses(prev => prev.map(c => {
      if (c.id === classId) {
        if (c.booked >= c.capacity) {
          alert('This class is fully booked!');
          return c;
        }
        addNotification(`Spot booked successfully for ${c.name}!`);
        return { ...c, booked: c.booked + 1 };
      }
      return c;
    }));
  };

  const handleCancelSpot = (classId) => {
    setClasses(prev => prev.map(c => {
      if (c.id === classId && c.booked > 0) {
        addNotification(`Spot cancelled for ${c.name}.`);
        return { ...c, booked: c.booked - 1 };
      }
      return c;
    }));
  };

  return (
    <div className="space-y-6">
      {/* Filter & Add Class Controls */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-slate-900 p-6 rounded-3xl border border-slate-800">
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {daysOfWeek.map(day => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedDay === day
                  ? 'bg-emerald-500 text-slate-950'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {day}
            </button>
          ))}
        </div>

        <button
          onClick={() => setIsAddClassOpen(true)}
          className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-5 py-2.5 rounded-xl transition-all flex items-center gap-2 shrink-0 w-full md:w-auto justify-center"
        >
          <Plus className="w-5 h-5" />
          Schedule Class
        </button>
      </div>

      {/* Class Schedule Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClasses.map((c) => {
          const isFull = c.booked >= c.capacity;
          return (
            <div key={c.id} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between hover:border-slate-700 transition-all">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${
                    c.category === 'Strength' 
                      ? 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                      : c.category === 'Mind & Body'
                      ? 'bg-violet-500/10 text-violet-400 border-violet-500/20'
                      : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                  }`}>
                    {c.category}
                  </span>
                  <span className="text-xs text-slate-400 font-bold flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {c.duration}
                  </span>
                </div>

                <h4 className="text-lg font-black text-white mb-1">{c.name}</h4>
                <p className="text-xs text-slate-400 mb-4">Led by <span className="text-emerald-400 font-semibold">{c.trainer}</span></p>

                <div className="grid grid-cols-2 gap-4 bg-slate-950/50 border border-slate-800/80 p-3 rounded-2xl mb-6">
                  <div>
                    <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-wider">Day & Time</span>
                    <span className="text-xs font-bold text-white">{c.day}, {c.time}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-wider">Capacity</span>
                    <span className="text-xs font-bold text-white flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-emerald-400" />
                      {c.booked} / {c.capacity}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleBookSpot(c.id)}
                  disabled={isFull}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isFull 
                      ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                      : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950'
                  }`}
                >
                  {isFull ? 'Class Full' : 'Book Spot'}
                </button>
                {c.booked > 0 && (
                  <button
                    onClick={() => handleCancelSpot(c.id)}
                    className="px-3 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold transition-all"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          );
        })}
        {filteredClasses.length === 0 && (
          <div className="col-span-full text-center py-12 text-slate-500 text-sm">
            No classes scheduled for {selectedDay}. 🗓️
          </div>
        )}
      </div>

      {/* Add Class Modal */}
      {isAddClassOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-slate-800 flex justify-between items-center">
              <h4 className="text-lg font-bold text-white">Schedule New Class</h4>
              <button onClick={() => setIsAddClassOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddClass} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Class Name</label>
                <input
                  type="text"
                  required
                  value={newClass.name}
                  onChange={(e) => setNewClass({ ...newClass, name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 text-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500"
                  placeholder="e.g. Power Pilates"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Trainer</label>
                  <select
                    value={newClass.trainer}
                    onChange={(e) => setNewClass({ ...newClass, trainer: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 text-slate-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-emerald-500"
                  >
                    {trainers.map(t => (
                      <option key={t.id} value={t.name}>{t.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Category</label>
                  <select
                    value={newClass.category}
                    onChange={(e) => setNewClass({ ...newClass, category: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 text-slate-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Strength">Strength</option>
                    <option value="Cardio">Cardio</option>
                    <option value="Mind & Body">Mind & Body</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Day</label>
                  <select
                    value={newClass.day}
                    onChange={(e) => setNewClass({ ...newClass, day: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 text-slate-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-emerald-500"
                  >
                    {daysOfWeek.filter(d => d !== 'All').map(day => (
                      <option key={day} value={day}>{day}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Time</label>
                  <input
                    type="text"
                    required
                    value={newClass.time}
                    onChange={(e) => setNewClass({ ...newClass, time: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 text-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500"
                    placeholder="08:00 AM"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Duration</label>
                  <input
                    type="text"
                    required
                    value={newClass.duration}
                    onChange={(e) => setNewClass({ ...newClass, duration: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 text-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500"
                    placeholder="60 min"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Capacity</label>
                  <input
                    type="number"
                    required
                    value={newClass.capacity}
                    onChange={(e) => setNewClass({ ...newClass, capacity: parseInt(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 text-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3 rounded-xl transition-all mt-4"
              >
                Schedule Session
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}