import Header from '../../components/Header';
import BottomNav from '../../components/BottomNav';
import TaskCard from '../../components/TaskCard';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, ChevronDown, Plus } from 'lucide-react';
import { useState } from 'react';

function ScheduleItemCard({ title, project, timeBlock, duration, isPrimary, isSecondary, isCompleted }: any) {
  return (
    <div className={`p-4 rounded-[16px] transition-transform cursor-pointer hover:scale-[1.02] active:scale-[0.98] ${
      isPrimary ? 'bg-primary-accent text-black shadow-[0_4px_20px_rgba(190,238,2,0.15)]' : 
      isSecondary ? 'bg-secondary-accent text-black shadow-sm' :
      isCompleted ? 'bg-surface border border-secondary-accent/40 text-text-primary opacity-70' : 
      'bg-surface-hover text-text-primary border border-transparent'
    }`}>
      <div className="flex justify-between items-start mb-2 gap-2">
        <h4 className={`font-semibold text-[15px] leading-snug ${isCompleted ? 'line-through text-text-secondary' : ''}`}>{title}</h4>
        <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full whitespace-nowrap ${
          isPrimary || isSecondary ? 'bg-black/10 text-black' : 
          isCompleted ? 'bg-secondary-accent/20 text-text-primary' : 
          'bg-surface border border-border-color text-text-primary'
        }`}>{duration}</span>
      </div>
      <div className={`text-[12px] font-medium flex justify-between items-center ${
        isPrimary || isSecondary ? 'text-black/70' : 'text-text-secondary'
      }`}>
        <span className="uppercase tracking-[0.1em] text-[10px]">{project}</span>
        <span className={isCompleted ? 'line-through' : ''}>{timeBlock}</span>
      </div>
    </div>
  );
}

export default function Schedule() {
  const [selectedDay, setSelectedDay] = useState(14);
  const [isFullCalendar, setIsFullCalendar] = useState(false);
  const [isMonthPickerOpen, setIsMonthPickerOpen] = useState(false);
  const [currentYear, setCurrentYear] = useState(2026);
  const [currentMonth, setCurrentMonth] = useState('July');

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const days = [
    { day: 'Mon', date: 12 },
    { day: 'Tue', date: 13 },
    { day: 'Wed', date: 14 },
    { day: 'Thu', date: 15 },
    { day: 'Fri', date: 16 },
    { day: 'Sat', date: 17 },
    { day: 'Sun', date: 18 },
  ];

  return (
    <div className="h-full flex flex-col bg-bg-primary text-text-primary">
      <Header />
      
      <div className="px-6 flex-1 overflow-y-auto pb-32 pt-2 scrollbar-hide">
        
        <div className="flex items-center justify-center mb-6 pt-2 px-1">
          
          <div className="flex flex-col items-center relative z-50">
            <button 
              onClick={() => setIsMonthPickerOpen(!isMonthPickerOpen)}
              className="active:scale-95 transition-transform relative group flex items-center justify-center"
            >
              <h2 className="text-[20px] font-bold tracking-tight text-text-primary group-hover:text-text-secondary transition-colors">
                {currentMonth} {currentYear}
              </h2>
              <div className="absolute top-1/2 -translate-y-1/2 -right-6">
                <ChevronDown size={18} className={`text-text-secondary group-hover:text-text-primary transition-transform duration-300 ${isMonthPickerOpen ? 'rotate-180' : ''}`} />
              </div>
            </button>
            <div className="flex items-center gap-1.5 text-text-secondary mt-0.5">
              <CalendarIcon size={14} />
              <span className="text-[12px] font-medium uppercase tracking-[0.05em]">Schedule</span>
            </div>

            {isMonthPickerOpen && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setIsMonthPickerOpen(false)}
                />
                <div className="absolute top-14 mt-1 w-[260px] bg-surface rounded-[24px] shadow-2xl border border-border-color p-5 z-50 animate-in fade-in zoom-in-95 duration-200">
                  <div className="flex justify-between items-center mb-5">
                    <button 
                      onClick={() => setCurrentYear(y => y - 1)} 
                      className="w-8 h-8 rounded-full hover:bg-surface-hover flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <span className="font-bold text-[16px] text-text-primary">{currentYear}</span>
                    <button 
                      onClick={() => setCurrentYear(y => y + 1)} 
                      className="w-8 h-8 rounded-full hover:bg-surface-hover flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {months.map(m => {
                      const isActive = m.toLowerCase() === currentMonth.substring(0, 3).toLowerCase();
                      return (
                        <button 
                          key={m}
                          onClick={() => {
                            setCurrentMonth(m === 'Jul' ? 'July' : m === 'Jun' ? 'June' : m === 'Mar' ? 'March' : m === 'Apr' ? 'April' : m);
                            setIsMonthPickerOpen(false);
                          }}
                          className={`py-2.5 rounded-[14px] text-[13px] font-semibold transition-all ${
                            isActive
                              ? 'bg-primary-accent text-black shadow-sm scale-105'
                              : 'text-text-secondary hover:bg-surface-hover hover:text-text-primary'
                          }`}
                        >
                          {m}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="flex gap-2 mb-6">
          <button 
            onClick={() => setIsFullCalendar(false)}
            className={`px-5 py-1.5 rounded-full text-[13px] font-medium transition-all border ${!isFullCalendar ? 'bg-primary-accent border-primary-accent text-black shadow-sm scale-105' : 'bg-transparent border-border-color text-text-secondary hover:border-text-secondary hover:text-text-primary'}`}
          >
            Week
          </button>
          <button 
            onClick={() => setIsFullCalendar(true)}
            className={`px-5 py-1.5 rounded-full text-[13px] font-medium transition-all border ${isFullCalendar ? 'bg-primary-accent border-primary-accent text-black shadow-sm scale-105' : 'bg-transparent border-border-color text-text-secondary hover:border-text-secondary hover:text-text-primary'}`}
          >
            Month
          </button>
        </div>

        {isFullCalendar ? (
          <div className="mb-8">
            <div className="grid grid-cols-7 gap-1 mb-2 text-center text-[12px] font-medium text-text-secondary">
              <div>Mo</div><div>Tu</div><div>We</div><div>Th</div><div>Fr</div><div>Sa</div><div>Su</div>
            </div>
            <div className="grid grid-cols-7 gap-y-3 gap-x-1 text-center">
              <div></div>
              <div></div>
              {Array.from({length: 31}, (_, i) => i + 1).map(date => (
                <button
                  key={date}
                  onClick={() => {
                    setSelectedDay(date);
                    setIsFullCalendar(false);
                  }}
                  className={`h-10 w-10 mx-auto rounded-full flex items-center justify-center text-[14px] font-medium transition-all ${
                    date === selectedDay 
                      ? 'bg-primary-accent text-black shadow-sm' 
                      : 'text-text-primary hover:bg-surface-hover'
                  }`}
                >
                  {date}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex justify-between mb-8">
            {days.map((item) => {
              const isActive = item.date === selectedDay;
              return (
                <button 
                  key={item.date}
                  onClick={() => setSelectedDay(item.date)}
                  className={`flex flex-col items-center justify-center w-11 h-16 rounded-[16px] transition-all ${
                    isActive 
                      ? 'bg-primary-accent text-black shadow-md scale-105' 
                      : 'bg-transparent text-text-secondary hover:bg-surface-hover'
                  }`}
                >
                  <span className={`text-[12px] font-medium mb-1 ${isActive ? 'text-black/70' : 'text-text-secondary'}`}>
                    {item.day}
                  </span>
                  <span className={`text-[16px] font-bold ${isActive ? 'text-black' : 'text-text-primary'}`}>
                    {item.date}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        <div className="relative">


          <div className="space-y-6">
            
            <div className="relative">
              <div className="flex items-center gap-3 mb-2.5">
                <div className="text-[13px] font-semibold text-text-primary">09:00 AM</div>
                <div className="flex-1 h-[1px] bg-border-color/50"></div>
              </div>
              <div className="w-full">
                <ScheduleItemCard 
                  id="task-1"
                  title="Q3 Strategy Report"
                  project="Acme Corp"
                  timeBlock="09:00 AM - 10:30 AM"
                  duration="1h 30m"
                  isPrimary={true}
                />
              </div>
            </div>

            <div className="relative">
              <div className="flex items-center gap-3 mb-2.5">
                <div className="text-[13px] font-semibold text-text-primary">11:00 AM</div>
                <div className="flex-1 h-[1px] bg-border-color/50"></div>
              </div>
              <div className="w-full">
                <ScheduleItemCard 
                  id="task-2"
                  title="Review PR #142"
                  project="Stoa App"
                  timeBlock="11:00 AM - 11:20 AM"
                  duration="20m"
                  isSecondary={true}
                />
              </div>
            </div>

            <div className="relative">
              <div className="flex items-center gap-3 mb-2.5">
                <div className="text-[13px] font-semibold text-text-primary">01:00 PM</div>
                <div className="flex-1 h-[1px] bg-border-color/50"></div>
              </div>
              <div className="w-full">
                <ScheduleItemCard 
                  id="task-3"
                  title="Design Sync"
                  project="Marketing"
                  timeBlock="01:00 PM - 01:45 PM"
                  duration="45m"
                  isCompleted={true}
                />
              </div>
            </div>
            
          </div>
        </div>

      </div>

      <BottomNav />
    </div>
  );
}
