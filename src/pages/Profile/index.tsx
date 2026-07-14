import BottomNav from '../../components/BottomNav';
import { ChevronRight, ChevronDown, Bell, Shield, HelpCircle, LogOut, Palette, Globe, Clock, User } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const navigate = useNavigate();
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [notificationsOn, setNotificationsOn] = useState(true);

  const toggleExpand = (label: string) => {
    setExpandedItem(prev => prev === label ? null : label);
  };

  const preferences = [
    { icon: Bell, label: 'Notifications', hasToggle: true, toggleValue: notificationsOn, type: 'toggles', options: ['Push Notifications', 'Email Digests', 'Weekly Reports'] },
    { icon: Palette, label: 'Appearance', subtitle: 'Light', type: 'options', options: ['Light Mode', 'Dark Mode', 'System Default'] },
    { icon: Globe, label: 'Language', subtitle: 'EN', type: 'options', options: ['English (EN)', 'Bahasa Indonesia (ID)', 'Español (ES)'] },
    { icon: Clock, label: 'Time Zone', subtitle: 'GMT+7', type: 'options', options: ['GMT+7 (Jakarta)', 'GMT+8 (Singapore)', 'GMT+9 (Tokyo)'] },
  ];

  const general = [
    { icon: User, label: 'Account Settings', route: '/account-settings' },
    { icon: Shield, label: 'Privacy', route: '/privacy' },
    { icon: HelpCircle, label: 'Support', route: '/support' },
  ];

  const renderExpandableItem = (item: any, isLast: boolean) => {
    const isExpanded = expandedItem === item.label;
    const Icon = item.icon;
    const currentActiveOption = item.subtitle || '';
    
    return (
      <div key={item.label} className={`flex flex-col transition-all duration-300 ${!isLast || isExpanded ? 'border-b border-border-color/30' : ''} ${isExpanded ? 'bg-surface-hover/50' : ''}`}>
        <div 
          onClick={() => toggleExpand(item.label)}
          className="flex items-center gap-4 px-5 py-4 hover:bg-surface-hover transition-colors text-left cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-xl bg-text-primary flex items-center justify-center text-bg-primary shadow-sm shrink-0">
            <Icon size={16} strokeWidth={2} />
          </div>
          <span className="flex-1 text-[16px] font-medium text-text-primary transition-colors">
            {item.label}
          </span>
          
          <div className="flex items-center gap-3">
            {item.hasToggle && (
              <div 
                className={`w-9 h-5 rounded-full p-0.5 transition-colors ${item.toggleValue ? 'bg-primary-accent' : 'bg-border-color'}`}
                onClick={(e) => {
                  e.stopPropagation();
                  if (item.label === 'Notifications') setNotificationsOn(!notificationsOn);
                }}
              >
                <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${item.toggleValue ? 'translate-x-4' : 'translate-x-0'}`}></div>
              </div>
            )}
            {!item.hasToggle && item.subtitle && (
              <span className="text-[15px] text-text-secondary font-medium">{item.subtitle}</span>
            )}
            <ChevronDown size={18} className={`text-text-secondary/50 transition-transform duration-300 ${isExpanded ? 'rotate-180 text-text-primary' : 'group-hover:text-text-primary'}`} />
          </div>
        </div>
        
        {isExpanded && (
          <div className="overflow-hidden animate-in slide-in-from-top-1 fade-in duration-200">
            <div className="px-5 pb-5 pl-[68px]">
              {item.type === 'toggles' && (
                <div className="space-y-4 pt-1">
                  {item.options.map((opt: string, i: number) => (
                    <div key={i} className="flex justify-between items-center group/toggle cursor-pointer">
                      <span className="text-[15px] font-medium text-text-secondary group-hover/toggle:text-text-primary transition-colors">{opt}</span>
                      <div className={`w-9 h-5 rounded-full p-0.5 transition-colors ${i === 0 ? 'bg-primary-accent' : 'bg-border-color'}`}>
                        <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${i === 0 ? 'translate-x-4' : 'translate-x-0'}`}></div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {item.type === 'options' && (
                <div className="space-y-1">
                  {item.options.map((opt: string, i: number) => {
                    const isActive = currentActiveOption && opt.includes(currentActiveOption);
                    return (
                      <button key={i} className="w-full flex items-center justify-between text-left py-2.5 group/btn">
                        <span className={`text-[15px] transition-colors ${isActive ? 'text-text-primary font-bold' : 'text-text-secondary group-hover/btn:text-text-primary font-medium'}`}>
                          {opt}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
              {item.type === 'text' && (
                <p className="text-[14px] text-text-secondary leading-relaxed pt-1">
                  {item.content}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col bg-bg-primary text-text-primary">
      <div className="px-6 flex-1 overflow-y-auto pb-32 pt-12 scrollbar-hide">
        
        {/* Avatar Section */}
        <div className="flex flex-col items-center mb-10">
          <img 
            src="https://media.gq.com/photos/558357fc3655c24c6c963b19/master/w_1600%2Cc_limit/style-blogs-the-gq-eye-davidbowie635.jpg"
            alt="Profile"
            className="w-28 h-28 rounded-full object-cover mb-4 shadow-sm"
          />
          <h2 className="text-[26px] font-bold tracking-tight">David Bowie</h2>
        </div>

        {/* PREFERENCES */}
        <h3 className="text-[11px] font-bold text-text-secondary uppercase tracking-[0.1em] mb-3 px-2">Preferences</h3>
        <div className="bg-surface rounded-[24px] overflow-hidden mb-8 shadow-sm">
          {preferences.map((item, idx) => renderExpandableItem(item, idx === preferences.length - 1))}
        </div>

        {/* GENERAL */}
        <h3 className="text-[11px] font-bold text-text-secondary uppercase tracking-[0.1em] mb-3 px-2">General</h3>
        <div className="bg-surface rounded-[24px] overflow-hidden mb-8 shadow-sm">
          {general.map((item, idx) => {
            const Icon = item.icon;
            return (
              <button 
                key={idx}
                onClick={() => item.route && navigate(item.route)}
                className={`w-full flex items-center gap-4 px-5 py-4 hover:bg-surface-hover transition-colors text-left ${idx !== general.length - 1 ? 'border-b border-border-color/30' : ''}`}
              >
                <div className="w-8 h-8 rounded-xl bg-text-primary flex items-center justify-center text-bg-primary shadow-sm">
                  <Icon size={16} strokeWidth={2} />
                </div>
                <span className="flex-1 text-[16px] font-medium text-text-primary">{item.label}</span>
              </button>
            );
          })}
        </div>
        
        {/* LOGOUT */}
        <button 
          onClick={() => navigate('/login')}
          className="w-full bg-surface rounded-[24px] px-5 py-4 flex items-center gap-4 hover:bg-surface-hover transition-colors shadow-sm text-left mb-8 text-red-500 group"
        >
          <div className="w-8 h-8 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500 shadow-sm group-hover:bg-red-500 group-hover:text-white transition-colors">
            <LogOut size={16} strokeWidth={2} />
          </div>
          <span className="flex-1 text-[16px] font-bold">Log Out</span>
        </button>

      </div>

      <BottomNav />
    </div>
  );
}
