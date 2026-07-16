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
  { id: 'M-101', name: 'Arjun Sharma', email: 'arjun@example.com', phone: '(91) 98765-43210', plan: 'VIP Elite', status: 'Active', checkInTime: '08:15 AM', photo: 'https://images.unsplash.com/photo-1620247526019-95e2f7b88df6?w=150' },
  { id: 'M-102', name: 'Priya Patel', email: 'priya.p@example.com', phone: '(91) 87654-32109', plan: 'Standard', status: 'Active', checkInTime: '09:30 AM', photo: 'https://images.unsplash.com/photo-1549646549-39906d4e5f22?w=150' },
  { id: 'M-103', name: 'Vikram Singh', email: 'vikram@example.com', phone: '(91) 76543-21098', plan: 'VIP Elite', status: 'Suspended', checkInTime: null, photo: 'https://images.unsplash.com/photo-1624641885686-3023e7f41cf6?w=150' },
  { id: 'M-104', name: 'Ananya Gupta', email: 'ananya.g@example.com', phone: '(91) 65432-10987', plan: 'Basic', status: 'Expired', checkInTime: null, photo: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=150' },
  { id: 'M-105', name: 'Rahul Desai', email: 'rahul.d@example.com', phone: '(91) 54321-09876', plan: 'Standard', status: 'Active', checkInTime: '10:05 AM', photo: 'https://images.unsplash.com/photo-1582298687796-0158dfb642ec?w=150' }
];

const initialClasses = [
  { id: 'C-1', name: 'CrossFit Power Hour', trainer: 'Coach Rajesh', day: 'Monday', time: '07:00 AM', duration: '60 min', capacity: 20, booked: 16, category: 'Strength' },
  { id: 'C-2', name: 'Vinyasa Flow Yoga', trainer: 'Sneha Reddy', day: 'Tuesday', time: '09:00 AM', duration: '45 min', capacity: 15, booked: 12, category: 'Mind & Body' },
  { id: 'C-3', name: 'HIIT Cardio Burn', trainer: 'Karan Malhotra', day: 'Wednesday', time: '05:30 PM', duration: '50 min', capacity: 25, booked: 24, category: 'Cardio' },
  { id: 'C-4', name: 'Spin & Sweat', trainer: 'Priya Patel', day: 'Thursday', time: '06:00 PM', duration: '45 min', capacity: 18, booked: 10, category: 'Cardio' },
  { id: 'C-5', name: 'Barbell Strength', trainer: 'Coach Rajesh', day: 'Friday', time: '08:00 AM', duration: '60 min', capacity: 15, booked: 15, category: 'Strength' }
];

const initialTrainers = [
  { id: 'T-1', name: 'Coach Rajesh', specialty: 'Olympic Lifting & CrossFit', rating: 4.9, clients: 18, status: 'On-duty', photo: 'https://images.unsplash.com/photo-1601053075276-805c879d750c?w=150' },
  { id: 'T-2', name: 'Sneha Reddy', specialty: 'Yoga & Pilates Specialist', rating: 4.8, clients: 12, status: 'On-duty', photo: 'https://images.unsplash.com/photo-1606334645229-2d0eb5f4882e?w=150' },
  { id: 'T-3', name: 'Karan Malhotra', specialty: 'HIIT & Athletic Conditioning', rating: 4.7, clients: 22, status: 'Off-duty', photo: 'https://images.unsplash.com/photo-1599839619722-39751411ea63?w=150' }
];

export default function App() { 
  const [activeTab, setActiveTab] = useState('dashboard');
  const [members, setMembers] = useState(initialMembers);
  const [classes, setClasses] = useState(initialClasses);
  const [trainers, setTrainers] = useState(initialTrainers);
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'New VIP registration: Arjun Sharma', time: '5 mins ago', unread: true },
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