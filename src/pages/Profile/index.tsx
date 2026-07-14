import BottomNav from '../../components/BottomNav';
import { Settings, ChevronRight, Bell, Shield, HelpCircle, LogOut, Palette, Globe, Clock, Edit2 } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const navigate = useNavigate();
  const [notificationsOn, setNotificationsOn] = useState(true);

  const stats = [
    { label: 'Tasks Done', value: '142' },
    { label: 'Focus Hours', value: '86h' },
    { label: 'Streak', value: '5d' },
  ];

  const preferences = [
    { icon: Bell, label: 'Notifications', hasToggle: true, toggleValue: notificationsOn, onToggle: () => setNotificationsOn(!notificationsOn) },
    { icon: Palette, label: 'Appearance', subtitle: 'Light' },
    { icon: Globe, label: 'Language', subtitle: 'EN' },
    { icon: Clock, label: 'Time Zone', subtitle: 'GMT+7' },
  ];

  const general = [
    { icon: Shield, label: 'Privacy' },
    { icon: HelpCircle, label: 'Support' },
    { icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="h-full flex flex-col bg-bg-primary text-text-primary">
      <div className="flex justify-between items-center px-6 py-4 pt-6">
        <h1 className="text-[24px] font-medium tracking-tight">Profile</h1>
        <button className="w-10 h-10 bg-surface border border-border-color shadow-sm rounded-full flex justify-center items-center relative text-text-primary hover:bg-surface-hover transition-colors">
          <Bell size={18} strokeWidth={1.5} />
          {notificationsOn && <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-primary-accent rounded-full shadow-[0_0_8px_rgba(190,238,2,0.6)]"></span>}
        </button>
      </div>
      
      <div className="px-6 flex-1 overflow-y-auto pb-32 pt-2 scrollbar-hide">
        
        <div className="flex flex-col items-center mb-8 relative z-10 mt-2">
          <div className="relative mb-4 group cursor-pointer">
            <div className="absolute inset-0 bg-primary-accent/40 rounded-full blur-2xl group-hover:bg-primary-accent/60 transition-all duration-500"></div>
            <img 
              src="https://media.gq.com/photos/558357fc3655c24c6c963b19/master/w_1600%2Cc_limit/style-blogs-the-gq-eye-davidbowie635.jpg"
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-4 border-bg-primary relative z-10"
            />
            <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary-accent text-black rounded-full flex items-center justify-center z-20 hover:scale-110 transition-transform shadow-sm">
              <Edit2 size={14} strokeWidth={2.5} />
            </button>
          </div>
          
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-[24px] font-bold tracking-tight">David Bowie</h2>
            <span className="bg-primary-accent text-black text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded-md tracking-wider">PRO</span>
          </div>
          <p className="text-[13px] text-text-secondary">david.bowie@email.com</p>
        </div>

        <div className="flex bg-surface border border-border-color/60 rounded-[24px] p-2 mb-8 shadow-sm">
          {stats.map((stat, i) => (
            <div key={i} className={`flex-1 text-center py-3 ${i !== 0 ? 'border-l border-border-color/50' : ''}`}>
              <div className="text-[20px] font-bold text-text-primary leading-none mb-1.5">{stat.value}</div>
              <div className="text-[10px] text-text-secondary font-bold tracking-wider uppercase">{stat.label}</div>
            </div>
          ))}
        </div>

        <h3 className="text-[13px] font-semibold text-text-secondary uppercase tracking-wider mb-4 px-1">Preferences</h3>
        <div className="grid grid-cols-2 gap-3 mb-8">
          {preferences.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx} 
                onClick={() => item.hasToggle && item.onToggle?.()}
                className="bg-surface border border-border-color/60 rounded-[20px] p-4 flex flex-col hover:border-primary-accent/40 hover:bg-primary-accent/5 transition-all cursor-pointer group shadow-sm"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 rounded-full bg-bg-primary flex items-center justify-center group-hover:text-primary-accent transition-colors">
                    <Icon size={18} strokeWidth={1.5} />
                  </div>
                  {item.hasToggle ? (
                    <div className={`w-9 h-5 rounded-full p-0.5 transition-colors ${item.toggleValue ? 'bg-primary-accent' : 'bg-border-color'}`}>
                      <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${item.toggleValue ? 'translate-x-4' : 'translate-x-0'}`}></div>
                    </div>
                  ) : item.subtitle ? (
                    <span className="text-[11px] font-medium text-text-secondary bg-bg-primary px-2.5 py-1 rounded-full">{item.subtitle}</span>
                  ) : null}
                </div>
                <span className="text-[14px] font-semibold text-text-primary">{item.label}</span>
              </div>
            );
          })}
        </div>

        <h3 className="text-[13px] font-semibold text-text-secondary uppercase tracking-wider mb-4 px-1">General</h3>
        <div className="bg-surface border border-border-color/60 rounded-[24px] overflow-hidden divide-y divide-border-color/40 mb-8 shadow-sm">
          {general.map((item, idx) => {
            const Icon = item.icon;
            return (
              <button 
                key={idx}
                className="w-full flex items-center gap-4 px-5 py-4 hover:bg-surface-hover transition-colors text-left group"
              >
                <div className="w-8 h-8 rounded-full bg-bg-primary flex items-center justify-center group-hover:text-primary-accent transition-colors">
                  <Icon size={16} strokeWidth={1.5} />
                </div>
                <span className="flex-1 text-[15px] font-medium text-text-primary">{item.label}</span>
                <ChevronRight size={18} className="text-text-secondary/50 group-hover:text-text-primary transition-colors" />
              </button>
            );
          })}
        </div>

        <button 
          onClick={() => navigate('/login')}
          className="w-full flex items-center justify-center gap-2 py-4 rounded-[20px] bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all font-semibold shadow-sm group"
        >
          <LogOut size={18} strokeWidth={2} className="group-hover:scale-110 transition-transform" />
          <span className="text-[15px]">Log Out</span>
        </button>

        <div className="text-center mt-6">
          <p className="text-[11px] font-medium text-text-secondary/40 tracking-wider">STOA APP v1.0.0</p>
        </div>

      </div>

      <BottomNav />
    </div>
  );
}
