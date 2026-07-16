import React from 'react';
import { Shield, ArrowRight, Download } from 'lucide-react';

export default function FinancialTracker({ members }) {
  // Calculate simple analytics
  const totalRevenue = 450000;
  const pendingPayments = [
    { id: 'P-101', name: 'Ananya Gupta', amount: '₹1,500', due: 'Overdue 5 days', plan: 'Basic' },
    { id: 'P-102', name: 'Vikram Singh', amount: '₹3,500', due: 'Overdue 2 days', plan: 'VIP Elite' },
  ];

  // Custom SVG Chart Data points (Revenue over last 6 months)
  const chartData = [
    { month: 'Jan', revenue: 350000, height: 110 },
    { month: 'Feb', revenue: 380000, height: 130 },
    { month: 'Mar', revenue: 360000, height: 120 },
    { month: 'Apr', revenue: 410000, height: 150 },
    { month: 'May', revenue: 440000, height: 170 },
    { month: 'Jun', revenue: 450000, height: 180 },
  ];

  return (
    <div className="space-y-8">
      {/* Financial Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
          <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Total Monthly Revenue</span>
          <h3 className="text-3xl font-black text-white mt-2">₹4,50,000</h3>
          <p className="text-xs text-emerald-400 font-semibold mt-2">⚡ +14% compared to last month</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
          <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Outstanding Receivables</span>
          <h3 className="text-3xl font-black text-rose-400 mt-2">₹5,000</h3>
          <p className="text-xs text-slate-400 font-semibold mt-2">2 pending member payments</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
          <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Average Revenue Per User</span>
          <h3 className="text-3xl font-black text-white mt-2">₹2,500</h3>
          <p className="text-xs text-emerald-400 font-semibold mt-2">VIP Elite plan driving growth</p>
        </div>
      </div>

      {/* Chart & Pending Payments Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Custom SVG Revenue Growth Chart */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h4 className="text-lg font-bold text-white">Revenue Growth Trend</h4>
              <p className="text-xs text-slate-400">Monthly gross revenue tracking</p>
            </div>
            <button className="flex items-center gap-2 bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-white px-4 py-2 rounded-xl text-xs font-bold transition-all border border-slate-800">
              <Download className="w-4 h-4" />
              Export CSV
            </button>
          </div>

          {/* Custom SVG/HTML Bar Chart */}
          <div className="h-64 flex items-end justify-between gap-4 pt-4 px-2 bg-slate-950/40 rounded-2xl border border-slate-800/60 p-4">
            {chartData.map((data, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                <div className="text-[10px] font-bold text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity mb-1">
                  ₹{data.revenue.toLocaleString('en-IN')}
                </div>
                <div 
                  style={{ height: `${data.height}px` }}
                  className="w-full bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-t-lg group-hover:from-emerald-400 group-hover:to-emerald-300 transition-all duration-300 shadow-lg shadow-emerald-500/10"
                />
                <span className="text-xs text-slate-400 font-bold mt-2">{data.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Outstanding Payments List */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between">
          <div>
            <h4 className="text-lg font-bold text-white mb-1">Outstanding Payments</h4>
            <p className="text-xs text-slate-400 mb-6">Members with pending subscription balances</p>

            <div className="space-y-4">
              {pendingPayments.map((pay) => (
                <div key={pay.id} className="p-4 bg-slate-950/50 border border-slate-800 rounded-2xl flex justify-between items-center">
                  <div>
                    <h5 className="text-sm font-bold text-white">{pay.name}</h5>
                    <span className="text-xs text-rose-400 font-semibold">{pay.due}</span>
                  </div>
                  <div className="text-right">
                    <span className="block text-sm font-black text-white">{pay.amount}</span>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{pay.plan}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 mt-6">
            Send Automated Reminders
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}