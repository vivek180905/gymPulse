import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DashboardOverview from './components/DashboardOverview';
import MembershipManager from './components/MembershipManager';
import ClassScheduler from './components/ClassScheduler';
import FinancialTracker from './components/FinancialTracker';
import TrainerDirectory from './components/TrainerDirectory';

// Initial Mock Data
const initialMembers = [
  { id: 'M-101', name: 'Alexander Wright', email: 'alex@example.com', phone: '(555) 234-5678', plan: 'VIP Elite', status: 'Active', checkInTime: '08:15 AM', photo: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=150' },
  { id: 'M-102', name: 'Sarah Jenkins', email: 'sarah.j@example.com', phone: '(555) 876-5432', plan: 'Standard', status: 'Active', checkInTime: '09:30 AM', photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150' },
  { id: 'M-103', name: 'Marcus Aurelius', email: 'marcus@rome.com', phone: '(555) 999-1111', plan: 'VIP Elite', status: 'Suspended', checkInTime: null, photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150' },
  { id: 'M-104', name: 'Emily Watson', email: 'emily.w@example.com', phone: '(555) 444-5555', plan: 'Basic', status: 'Expired', checkInTime: null, photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150' },
  { id: 'M-105', name: 'David Beckham', email: 'david.b@example.com', phone: '(555) 777-8888', plan: 'Standard', status: 'Active', checkInTime: '10:05 AM', photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150' }
];

const initialClasses = [
  { id: 'C-1', name: 'CrossFit Power Hour', trainer: 'Coach Jaxson', day: 'Monday', time: '07:00 AM', duration: '60 min', capacity: 20, booked: 16, category: 'Strength' },
  { id: 'C-2', name: 'Vinyasa Flow Yoga', trainer: 'Elena Rostova', day: 'Tuesday', time: '09:00 AM', duration: '45 min', capacity: 15, booked: 12, category: 'Mind & Body' },
  { id: 'C-3', name: 'HIIT Cardio Burn', trainer: 'Marcus Vance', day: 'Wednesday', time: '05:30 PM', duration: '50 min', capacity: 25, booked: 24, category: 'Cardio' },
  { id: 'C-4', name: 'Spin & Sweat', trainer: 'Sarah Jenkins', day: 'Thursday', time: '06:00 PM', duration: '45 min', capacity: 18, booked: 10, category: 'Cardio' },
  { id: 'C-5', name: 'Barbell Strength', trainer: 'Coach Jaxson', day: 'Friday', time: '08:00 AM', duration: '60 min', capacity: 15, booked: 15, category: 'Strength' }
];

const initialTrainers = [
  { id: 'T-1', name: 'Coach Jaxson', specialty: 'Olympic Lifting & CrossFit', rating: 4.9, clients: 18, status: 'On-duty', photo: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=150' },
  { id: 'T-2', name: 'Elena Rostova', specialty: 'Yoga & Pilates Specialist', rating: 4.8, clients: 12, status: 'On-duty', photo: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=150' },
  { id: 'T-3', name: 'Marcus Vance', specialty: 'HIIT & Athletic Conditioning', rating: 4.7, clients: 22, status: 'Off-duty', photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150' }
];

export default function App() { 
  const [activeTab, setActiveTab] = useState('dashboard');
  const [members, setMembers] = useState(initialMembers);
  const [classes, setClasses] = useState(initialClasses);
  const [trainers, setTrainers] = useState(initialTrainers);
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'New VIP registration: Alexander Wright', time: '5 mins ago', unread: true },
    { id: 2, text: 'Class "HIIT Cardio Burn" is fully booked!', time: '1 hour ago', unread: true },
    { id: 3, text: 'System maintenance scheduled for Sunday 2 AM', time: '1 day ago', unread: false }
  ]);

  // Global Action Handlers
  const handleCheckIn = (memberId) => {
    setMembers(prev => prev.map(m => {
      if (m.id === memberId || m.name.toLowerCase().includes(memberId.toLowerCase())) {
        const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        addNotification(`Member ${m.name} checked in successfully!`);
        return { ...m, status: 'Active', checkInTime: timeStr };
      }
      return m;
    }));
  };

  const addNotification = (text) => {
    setNotifications(prev => [
      { id: Date.now(), text, time: 'Just now', unread: true },
      ...prev
    ]);
  };

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 overflow-hidden font-sans">
      {/* Sidebar Navigation */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          activeTab={activeTab} 
          notifications={notifications} 
          setNotifications={setNotifications}
          onCheckIn={handleCheckIn}
        />
        
        <main className="flex-1 overflow-y-auto p-6 bg-slate-900/40">
          {activeTab === 'dashboard' && (
            <DashboardOverview 
              members={members} 
              classes={classes} 
              trainers={trainers} 
              onCheckIn={handleCheckIn}
            />
          )}
          {activeTab === 'members' && (
            <MembershipManager 
              members={members} 
              setMembers={setMembers}
              addNotification={addNotification}
            />
          )}
          {activeTab === 'classes' && (
            <ClassScheduler 
              classes={classes} 
              setClasses={setClasses}
              trainers={trainers}
              addNotification={addNotification}
            />
          )}
          {activeTab === 'financials' && (
            <FinancialTracker 
              members={members}
            />
          )}
          {activeTab === 'trainers' && (
            <TrainerDirectory 
              trainers={trainers}
              setTrainers={setTrainers}
              addNotification={addNotification}
            />
          )}
        </main>
      </div>
    </div>
  );
}