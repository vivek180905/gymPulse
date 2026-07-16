import React, { useState } from 'react';
import { Star, Clock, Plus, X, Check } from 'lucide-react';

export default function TrainerDirectory({ trainers, setTrainers, addNotification }) {
  const [isAddTrainerOpen, setIsAddTrainerOpen] = useState(false);
  const [newTrainer, setNewTrainer] = useState({
    name: '', specialty: '', rating: 5.0, clients: 0, status: 'On-duty'
  });

  const handleAddTrainer = (e) => {
    e.preventDefault();
    if (!newTrainer.name || !newTrainer.specialty) return;

    const createdTrainer = {
      id: `T-${Date.now()}`,
      ...newTrainer,
      photo: 'https://archive.org/download/placeholder-image/placeholder-image.jpg'
    };

    setTrainers(prev => [...prev, createdTrainer]);
    addNotification(`New trainer hired: ${newTrainer.name}`);
    setIsAddTrainerOpen(false);
    setNewTrainer({ name: '', specialty: '', rating: 5.0, clients: 0, status: 'On-duty' });
  };

  const toggleShiftStatus = (id) => {
    setTrainers(prev => prev.map(t => {
      if (t.id === id) {
        const nextStatus = t.status === 'On-duty' ? 'Off-duty' : 'On-duty';
        addNotification(`${t.name} is now ${nextStatus}`);
        return { ...t, status: nextStatus };
      }
      return t;
    }));
  };

  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-slate-900 p-6 rounded-3xl border border-slate-800">
        <div>
          <h3 className="text-lg font-bold text-white">Trainer & Instructor Directory</h3>
          <p className="text-xs text-slate-400">Manage shifts, specialties, and client loads</p>
        </div>

        <button
          onClick={() => setIsAddTrainerOpen(true)}
          className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-5 py-2.5 rounded-xl transition-all flex items-center gap-2 shrink-0 w-full md:w-auto justify-center"
        >
          <Plus className="w-5 h-5" />
          Add Trainer
        </button>
      </div>

      {/* Trainer Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trainers.map((trainer) => (
          <div key={trainer.id} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between hover:border-slate-700 transition-all">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={trainer.photo}
                  alt={trainer.name}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-slate-800"
                />
                <div>
                  <h4 className="text-lg font-black text-white">{trainer.name}</h4>
                  <span className="text-xs text-emerald-400 font-semibold">{trainer.specialty}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 bg-slate-950/50 border border-slate-800/80 p-3 rounded-2xl mb-6">
                <div>
                  <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-wider">Rating</span>
                  <span className="text-xs font-bold text-white flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
                    {trainer.rating}
                  </span>
                </div>
                <div>
                  <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-wider">Active Clients</span>
                  <span className="text-xs font-bold text-white">{trainer.clients} Members</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between gap-4 pt-4 border-t border-slate-800/60">
              <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                trainer.status === 'On-duty'
                  ? 'bg-emerald-500/10 text-emerald-400'
                  : 'bg-slate-800 text-slate-500'
              }`}>
                {trainer.status}
              </span>

              <button
                onClick={() => toggleShiftStatus(trainer.id)}
                className="text-xs font-bold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-xl transition-all"
              >
                Toggle Shift
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Trainer Modal */}
      {isAddTrainerOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-slate-800 flex justify-between items-center">
              <h4 className="text-lg font-bold text-white">Add New Trainer</h4>
              <button onClick={() => setIsAddTrainerOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddTrainer} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Trainer Name</label>
                <input
                  type="text"
                  required
                  value={newTrainer.name}
                  onChange={(e) => setNewTrainer({ ...newTrainer, name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 text-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500"
                  placeholder="e.g. Coach Jaxson"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Specialty</label>
                <input
                  type="text"
                  required
                  value={newTrainer.specialty}
                  onChange={(e) => setNewTrainer({ ...newTrainer, specialty: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 text-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500"
                  placeholder="e.g. Olympic Lifting & CrossFit"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Initial Status</label>
                  <select
                    value={newTrainer.status}
                    onChange={(e) => setNewTrainer({ ...newTrainer, status: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 text-slate-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-emerald-500"
                  >
                    <option value="On-duty">On-duty</option>
                    <option value="Off-duty">Off-duty</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Rating</label>
                  <input
                    type="number"
                    step="0.1"
                    max="5"
                    required
                    value={newTrainer.rating}
                    onChange={(e) => setNewTrainer({ ...newTrainer, rating: parseFloat(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 text-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3 rounded-xl transition-all mt-4"
              >
                Complete Hiring
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}