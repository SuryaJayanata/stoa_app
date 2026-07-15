import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Bell, Calendar, Zap, MessageSquare } from 'lucide-react';

export default function Notifications() {
  const navigate = useNavigate();

  const notifications = [
    {
      id: 1,
      group: 'Today',
      items: [
        {
          id: 101,
          icon: Zap,
          title: 'Daily Goal Reached!',
          message: 'You have completed 4 hours of deep work today. Great job!',
          time: '2m ago',
          isUnread: true,
          color: 'text-primary-accent',
          bg: 'bg-bg-utama'
        },
        {
          id: 102,
          icon: Calendar,
          title: 'Upcoming Task',
          message: 'Your task "Q3 Strategy Report" is starting in 15 minutes.',
          time: '1h ago',
          isUnread: true,
          color: 'text-text-primary',
          bg: 'bg-surface-hover'
        }
      ]
    },
    {
      id: 2,
      group: 'Yesterday',
      items: [
        {
          id: 201,
          icon: MessageSquare,
          title: 'Weekly Summary',
          message: 'Your productivity increased by 15% this week. Check your stats.',
          time: '1d ago',
          isUnread: false,
          color: 'text-text-secondary',
          bg: 'bg-surface-hover'
        },
        {
          id: 202,
          icon: Bell,
          title: 'System Update',
          message: 'Stoa App has been updated to version 2.1 with new UI improvements.',
          time: '1d ago',
          isUnread: false,
          color: 'text-text-secondary',
          bg: 'bg-surface-hover'
        }
      ]
    }
  ];

  return (
    <div className="h-full flex flex-col bg-bg-primary text-text-primary">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-6 pt-8 bg-bg-primary sticky top-0 z-20">
        <button 
          onClick={() => navigate(-1)}
          className="w-10 h-10 bg-surface border border-border-color/60 rounded-full flex items-center justify-center hover:bg-surface-hover transition-colors shadow-sm"
        >
          <ChevronLeft size={20} className="text-text-primary mr-0.5" />
        </button>
        <h1 className="text-[17px] font-bold tracking-wide">Notifications</h1>
        <div className="w-10"></div>
      </div>

      <div className="flex-1 px-6 overflow-y-auto pb-10 scrollbar-hide pt-2">
        {notifications.map(group => (
          <div key={group.id} className="mb-6">
            <h2 className="text-[14px] font-bold text-text-secondary mb-4 uppercase tracking-wider pl-1">{group.group}</h2>
            <div className="flex flex-col gap-3">
              {group.items.map(item => {
                const Icon = item.icon;
                return (
                  <div 
                    key={item.id} 
                    className={`p-4 rounded-[20px] border transition-all flex gap-4 items-start ${
                      item.isUnread 
                        ? 'bg-surface border-border-color shadow-sm' 
                        : 'bg-transparent border-transparent opacity-70'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${item.bg}`}>
                      <Icon size={20} className={item.color} />
                    </div>
                    <div className="flex-1 pt-1">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className={`text-[15px] font-semibold leading-tight ${item.isUnread ? 'text-text-primary' : 'text-text-secondary'}`}>
                          {item.title}
                        </h3>
                        <span className="text-[11px] font-medium text-text-secondary whitespace-nowrap ml-2">
                          {item.time}
                        </span>
                      </div>
                      <p className="text-[13px] text-text-secondary leading-snug">
                        {item.message}
                      </p>
                    </div>
                    {item.isUnread && (
                      <div className="w-2 h-2 rounded-full bg-primary-accent mt-2 flex-shrink-0"></div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
