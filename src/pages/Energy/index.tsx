import Header from '../../components/Header';
import BottomNav from '../../components/BottomNav';
import { TrendingUp, Zap, Moon, Coffee, Flame, BatteryCharging } from 'lucide-react';
import { useState } from 'react';

export default function Energy() {
  const [activeTab, setActiveTab] = useState<'daily' | 'weekly'>('daily');

  const hourlyData = [
    { hour: '6AM', level: 40 },
    { hour: '8AM', level: 65 },
    { hour: '10AM', level: 90 },
    { hour: '12PM', level: 75 },
    { hour: '2PM', level: 45 },
    { hour: '4PM', level: 55 },
    { hour: '6PM', level: 70 },
    { hour: '8PM', level: 35 },
  ];

  const weeklyData = [
    { day: 'Mon', level: 72 },
    { day: 'Tue', level: 85 },
    { day: 'Wed', level: 68 },
    { day: 'Thu', level: 90 },
    { day: 'Fri', level: 55 },
    { day: 'Sat', level: 40 },
    { day: 'Sun', level: 60 },
  ];

  const chartData = activeTab === 'daily' ? hourlyData : weeklyData;
  const maxVal = Math.max(...chartData.map(d => d.level));

  const insights = [
    { icon: Zap, label: 'Peak Hours', value: '9 AM – 11 AM', desc: 'Your most productive window', color: 'bg-primary-accent text-black' },
    { icon: Moon, label: 'Low Energy', value: '2 PM – 4 PM', desc: 'Consider a break or light tasks', color: 'bg-secondary-accent text-black' },
    { icon: Coffee, label: 'Avg. Focus', value: '3.2 hrs', desc: 'Deep work sessions per day', color: 'bg-surface-hover text-text-primary' },
  ];

  return (
    <div className="h-full flex flex-col bg-bg-primary text-text-primary">
      <Header />
      
      <div className="px-6 flex-1 overflow-y-auto pb-32 pt-2 scrollbar-hide">
        
        <div className="mb-6 pt-2">
          <h2 className="text-[28px] font-medium leading-tight mb-1 text-text-primary">Energy Tracker</h2>
          <p className="text-[13px] text-text-secondary">Monitor your productivity patterns</p>
        </div>

        <div className="bg-primary-accent rounded-[24px] p-6 mb-6 relative overflow-hidden text-black">
          <div className="flex justify-between items-start relative z-10">
            <div>
              <div className="text-black/60 text-[12px] font-bold uppercase tracking-wider mb-2">Current Energy</div>
              <div className="flex items-end gap-2">
                <span className="text-[48px] font-medium text-black leading-none">76</span>
                <span className="text-black/60 text-[16px] font-bold mb-2">/ 100</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 bg-black/10 px-3 py-1.5 rounded-full">
              <TrendingUp size={14} className="text-black" />
              <span className="text-black text-[12px] font-bold">+12%</span>
            </div>
          </div>

          <div className="mt-5 relative z-10">
            <div className="w-full h-2.5 bg-black/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-black rounded-full transition-all duration-1000"
                style={{ width: '76%' }}
              ></div>
            </div>
            <div className="flex justify-between mt-2 text-[11px] font-semibold text-black/60">
              <span>Low</span>
              <span>Optimal</span>
              <span>Peak</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-primary-accent border border-transparent rounded-[20px] p-4 text-black">
            <div className="flex items-center gap-2 mb-3">
              <Flame size={18} className="text-black" />
              <span className="text-[12px] text-black/70 font-bold uppercase tracking-wider">Streak</span>
            </div>
            <div className="text-[28px] font-bold leading-none">5 days</div>
            <p className="text-[11px] text-black/60 mt-1 font-medium">Consistent energy</p>
          </div>
          <div className="bg-secondary-accent border border-transparent rounded-[20px] p-4 text-black">
            <div className="flex items-center gap-2 mb-3">
              <BatteryCharging size={18} className="text-black" />
              <span className="text-[12px] text-black/70 font-bold uppercase tracking-wider">Recovery</span>
            </div>
            <div className="text-[28px] font-bold leading-none">92%</div>
            <p className="text-[11px] text-black/60 mt-1 font-medium">Sleep quality score</p>
          </div>
        </div>

        <div className="bg-surface border border-border-color rounded-[24px] p-5 mb-6">
          <div className="flex justify-between items-center mb-5">
            <h3 className="text-text-primary font-medium text-[16px]">Energy Levels</h3>
            <div className="flex bg-surface-hover rounded-full p-0.5">
              <button 
                onClick={() => setActiveTab('daily')}
                className={`px-3.5 py-1.5 rounded-full text-[12px] font-medium transition-all ${
                  activeTab === 'daily' ? 'bg-primary-accent text-black' : 'text-text-secondary'
                }`}
              >
                Daily
              </button>
              <button 
                onClick={() => setActiveTab('weekly')}
                className={`px-3.5 py-1.5 rounded-full text-[12px] font-medium transition-all ${
                  activeTab === 'weekly' ? 'bg-primary-accent text-black' : 'text-text-secondary'
                }`}
              >
                Weekly
              </button>
            </div>
          </div>

          <div className="flex justify-between items-end h-[140px] gap-2 px-1">
            {chartData.map((item, i) => {
              const heightPercent = (item.level / maxVal) * 100;
              const isHigh = item.level >= 70;
              return (
                <div key={i} className="flex flex-col items-center flex-1 h-full justify-end">
                  <div className={`px-1 py-0.5 rounded-[5px] text-[9px] font-bold mb-1.5 ${
                    isHigh ? 'text-text-secondary' : 'text-text-secondary'
                  }`}>
                    {item.level}%
                  </div>
                  <div 
                    className={`w-full max-w-[28px] rounded-[8px] transition-all duration-500 ${
                      isHigh ? 'bg-primary-accent' : 'bg-surface-hover'
                    }`} 
                    style={{ height: `${heightPercent}%` }}
                  ></div>
                  <div className="text-[10px] mt-2 font-medium text-text-secondary">
                    {activeTab === 'daily' ? (item as any).hour : (item as any).day}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-text-primary font-medium text-[16px] mb-4">Insights</h3>
          <div className="space-y-3">
            {insights.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="flex items-center gap-4 p-4 rounded-[16px] bg-surface border border-border-color/60">
                  <div className={`w-11 h-11 rounded-[14px] flex items-center justify-center shrink-0 ${item.color}`}>
                    <Icon size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-0.5">
                      <span className="text-[13px] font-semibold text-text-primary">{item.label}</span>
                      <span className="text-[13px] font-bold text-text-primary">{item.value}</span>
                    </div>
                    <p className="text-[11px] text-text-secondary">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>



      </div>

      <BottomNav />
    </div>
  );
}
