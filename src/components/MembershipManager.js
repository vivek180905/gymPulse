import React, { useState } from 'react';
import { Search, Plus, Trash, Edit, X, Check } from 'lucide-react';

export default function MembershipManager({ members, setMembers, addNotification }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPlan, setFilterPlan] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  
  // Modal States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newMember, setNewMember] = useState({
    name: '', email: '', phone: '', plan: 'Standard', status: 'Active'
  });

  // Filtered Members
  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) || member.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPlan = filterPlan === 'All' || member.plan === filterPlan;
    const matchesStatus = filterStatus === 'All' || member.status === filterStatus;
    return matchesSearch && matchesPlan && matchesStatus;
  });

  const handleAddMember = (e) => {
    e.preventDefault();
    if (!newMember.name || !newMember.email) return;

    const createdMember = {
      id: `M-${Math.floor(100 + Math.random() * 900)}`,
      ...newMember,
      checkInTime: null,
      photo: 'https://archive.org/download/placeholder-image/placeholder-image.jpg'
    };

    setMembers(prev => [createdMember, ...prev]);
    addNotification(`New member registered: ${newMember.name}`);
    setIsAddModalOpen(false);
    setNewMember({ name: '', email: '', phone: '', plan: 'Standard', status: 'Active' });
  };

  const toggleStatus = (id) => {
    setMembers(prev => prev.map(m => {
      if (m.id === id) {
        const nextStatus = m.status === 'Active' ? 'Suspended' : 'Active';
        addNotification(`Member ${m.name} status updated to ${nextStatus}`);
        return { ...m, status: nextStatus };
      }
      return m;
    }));
  };

  const deleteMember = (id) => {
    const memberToDelete = members.find(m => m.id === id);
    if (confirm(`Are you sure you want to remove ${memberToDelete?.name}?`)) {
      setMembers(prev => prev.filter(m => m.id !== id));
      addNotification(`Member removed: ${memberToDelete?.name}`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Bar with Search & Add Button */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-slate-900 p-6 rounded-3xl border border-slate-800">
        <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
          <div className="relative flex items-center w-full md:w-80">
            <Search className="absolute left-3.5 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search members by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 text-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500 transition-all"
            />
          </div>

          {/* Plan Filter */}
          <select
            value={filterPlan}
            onChange={(e) => setFilterPlan(e.target.value)}
            className="bg-slate-950 border border-slate-800 text-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500"
          >
            <option value="All">All Plans</option>
            <option value="VIP Elite">VIP Elite</option>
            <option value="Standard">Standard</option>
            <option value="Basic">Basic</option>
          </select>

          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-slate-950 border border-slate-800 text-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500"
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Suspended">Suspended</option>
            <option value="Expired">Expired</option>
          </select>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-5 py-2.5 rounded-xl transition-all flex items-center gap-2 shrink-0 w-full md:w-auto justify-center"
        >
          <Plus className="w-5 h-5" />
          Register Member
        </button>
      </div>

      {/* Members Directory Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-950/50 border-b border-slate-800 text-slate-400 text-xs font-bold uppercase tracking-wider">
                <th className="p-5">Member</th>
                <th className="p-5">Member ID</th>
                <th className="p-5">Subscription Plan</th>
                <th className="p-5">Status</th>
                <th className="p-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredMembers.map((member) => (
                <tr key={member.id} className="hover:bg-slate-850/30 transition-colors">
                  <td className="p-5">
                    <div className="flex items-center gap-3.5">
                      <img
                        src={member.photo}
                        alt={member.name}
                        className="w-10 h-10 rounded-full object-cover border border-slate-800"
                      />
                      <div>
                        <h5 className="font-bold text-white text-sm">{member.name}</h5>
                        <span className="text-xs text-slate-400">{member.email} • {member.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-5 text-sm text-slate-300 font-mono">{member.id}</td>
                  <td className="p-5">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full border ${
                      member.plan === 'VIP Elite' 
                        ? 'bg-violet-500/10 text-violet-400 border-violet-500/20'
                        : member.plan === 'Standard'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        : 'bg-slate-500/10 text-slate-400 border-slate-500/20'
                    }`}>
                      {member.plan}
                    </span>
                  </td>
                  <td className="p-5">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                      member.status === 'Active'
                        ? 'bg-emerald-500/10 text-emerald-400'
                        : member.status === 'Suspended'
                        ? 'bg-amber-500/10 text-amber-400'
                        : 'bg-rose-500/10 text-rose-400'
                    }`}>
                      {member.status}
                    </span>
                  </td>
                  <td className="p-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => toggleStatus(member.id)}
                        title="Toggle Status"
                        className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-all"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteMember(member.id)}
                        title="Remove Member"
                        className="p-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-lg transition-all"
                      >
                        <Trash className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredMembers.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-10 text-center text-slate-500 text-sm">
                    No members found matching the filters. 🔍
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Member Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-slate-800 flex justify-between items-center">
              <h4 className="text-lg font-bold text-white">Register New Member</h4>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddMember} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Full Name</label>
                <input
                  type="text"
                  required
                  value={newMember.name}
                  onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 text-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500"
                  placeholder="Alexander Wright"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Email Address</label>
                <input
                  type="email"
                  required
                  value={newMember.email}
                  onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 text-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500"
                  placeholder="alex@example.com"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Phone Number</label>
                <input
                  type="text"
                  value={newMember.phone}
                  onChange={(e) => setNewMember({ ...newMember, phone: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 text-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500"
                  placeholder="(555) 000-0000"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Membership Plan</label>
                  <select
                    value={newMember.plan}
                    onChange={(e) => setNewMember({ ...newMember, plan: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 text-slate-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Basic">Basic</option>
                    <option value="Standard">Standard</option>
                    <option value="VIP Elite">VIP Elite</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Initial Status</label>
                  <select
                    value={newMember.status}
                    onChange={(e) => setNewMember({ ...newMember, status: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 text-slate-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Active">Active</option>
                    <option value="Suspended">Suspended</option>
                  </select>
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3 rounded-xl transition-all mt-4"
              >
                Complete Registration
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}