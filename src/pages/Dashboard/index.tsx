import Header from '../../components/Header';
import TaskCard from '../../components/TaskCard';
import BottomNav from '../../components/BottomNav';
import { Info, ArrowUpRight } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="h-full flex flex-col bg-bg-primary text-text-primary">
      <Header />
      
      <div className="px-6 flex-1 overflow-y-auto pb-32 pt-2 scrollbar-hide">
        
        <div className="mb-4 pt-2">
          <h2 className="text-[28px] font-medium leading-tight mb-2 text-text-primary">Tasks overview</h2>
          <div className="flex justify-between items-center text-[13px] mb-4">
             <div className="flex items-center gap-1.5 text-text-secondary">
               <Info size={14} />
               <span>You have <span className="font-semibold text-text-primary">3 critical</span> tasks this week</span>
             </div>
             <button className="text-blue-accent hover:underline font-medium">See all</button>
          </div>

          <div className="flex flex-col gap-3">
             <div className="bg-primary-accent rounded-[24px] p-5 relative overflow-hidden text-black flex flex-col justify-between min-h-[130px]">
                  
                <div className="absolute -right-12 -top-16 w-64 h-64 bg-black/5 rounded-full pointer-events-none"></div>
                <div className="absolute right-8 -bottom-32 w-72 h-72 bg-black/5 rounded-full pointer-events-none"></div>

                <div className="flex justify-between items-start relative z-10">
                   <span className="font-semibold text-[14px] text-black/80">Q3 Strategy</span>
                   <button className="w-8 h-8 rounded-full bg-transparent text-black flex justify-center items-center shrink-0 hover:scale-105 transition-transform">
                     <ArrowUpRight size={22} strokeWidth={2} />
                   </button>
                </div>
                
                <div className="relative z-10 mt-4">
                   <div className="text-[36px] font-bold leading-none tracking-tight mb-1.5 text-black">4/7</div>
                   <p className="text-black/70 text-[13px] font-medium w-[90%]">Finish drafting the remaining slides and metrics.</p>
                </div>
             </div>

             <div className="bg-surface shadow-sm border border-border-color rounded-[24px] p-5 relative overflow-hidden flex flex-col mt-1">
                
                <div className="flex justify-between items-center mb-6">
                   <h3 className="text-text-primary font-medium text-[16px]">Weekly Performance</h3>
                   <button className="text-text-secondary text-[13px] hover:text-text-primary transition-colors">View Stats</button>
                </div>

                <div className="flex justify-between items-center mb-5 px-1">
                   <div>
                      <div className="text-text-secondary text-[12px] mb-1">Average</div>
                      <div className="text-text-primary text-[22px] font-medium leading-none">4 <span className="text-[12px] text-text-secondary font-normal ml-0.5">tasks</span></div>
                   </div>
                   <div>
                      <div className="text-text-secondary text-[12px] mb-1">Today</div>
                      <div className="text-text-primary text-[22px] font-medium leading-none">12 <span className="text-[12px] text-text-secondary font-normal ml-0.5">tasks</span></div>
                   </div>
                   <div>
                      <div className="text-text-secondary text-[12px] mb-1">Largest</div>
                      <div className="text-[22px] font-medium leading-none text-blue-accent">14 <span className="text-[12px] text-text-secondary font-normal ml-0.5">tasks</span></div>
                   </div>
                </div>

                <div className="flex justify-between items-end h-[110px] gap-2 px-1">
                   {[
                     { day: 'S', val: 3, h: '30%' },
                     { day: 'M', val: 5, h: '45%' },
                     { day: 'T', val: 2, h: '20%' },
                     { day: 'W', val: 12, h: '100%', active: true },
                     { day: 'T', val: 7, h: '60%' },
                     { day: 'F', val: 4, h: '35%' },
                     { day: 'S', val: 5, h: '45%' },
                   ].map((item, i) => (
                     <div key={i} className="flex flex-col items-center flex-1 h-full justify-end">
                        <div className={`px-1.5 py-1 rounded-[6px] text-[10px] font-bold mb-2 flex items-center justify-center min-w-[24px] ${
                           item.active ? 'bg-blue-accent text-white' : 'bg-surface-hover text-text-secondary'
                        }`}>
                           {item.val}
                        </div>
                        <div className={`w-full max-w-[32px] rounded-[8px] transition-all duration-500 ${item.active ? 'bg-blue-accent' : 'bg-surface-hover'}`} style={{ height: item.h }}></div>
                        <div className={`text-[11px] mt-2 font-medium ${item.active ? 'text-text-primary' : 'text-text-secondary'}`}>
                           {item.day}
                        </div>
                     </div>
                   ))}
                </div>
             </div>
          </div>
        </div>

        <div className="mb-6">
           <div className="flex items-center gap-3 mb-4">
              <h2 className="text-[28px] font-medium leading-tight text-text-primary">Workflows</h2>
           </div>

           <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
             <button className="bg-primary-accent text-black px-5 py-2.5 rounded-full text-[14px] font-semibold whitespace-nowrap hover:scale-105 transition-transform">
               All Focus
             </button>
             <button className="bg-transparent border border-border-color text-text-secondary px-5 py-2.5 rounded-full text-[14px] font-medium whitespace-nowrap hover:bg-surface-hover transition-colors">
               Deep Work
             </button>
             <button className="bg-transparent border border-border-color text-text-secondary px-5 py-2.5 rounded-full text-[14px] font-medium whitespace-nowrap hover:bg-surface-hover transition-colors">
               Quick Wins
             </button>
             <button className="bg-transparent border border-border-color text-text-secondary px-5 py-2.5 rounded-full text-[14px] font-medium whitespace-nowrap hover:bg-surface-hover transition-colors">
               Planning
             </button>
           </div>
        </div>

        <div className="space-y-4">
          <TaskCard 
            id="task-1"
            title="Q3 Strategy Report"
            project="Acme Corp"
            timeBlock="09:00 AM - 10:30 AM"
            duration="1h 30m"
            isPrimary={true}
          />
          <TaskCard 
            id="task-2"
            title="Review PR #142"
            project="Stoa App"
            timeBlock="11:00 AM - 11:20 AM"
            duration="20m"
          />
          <TaskCard 
            id="task-3"
            title="Design Sync"
            project="Marketing"
            timeBlock="01:00 PM - 01:45 PM"
            duration="45m"
            isCompleted={true}
          />
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
