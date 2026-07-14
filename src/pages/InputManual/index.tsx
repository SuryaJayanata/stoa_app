import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Calendar, Clock, Plus, Minus, AlignLeft } from 'lucide-react';

export default function InputManual() {
  const navigate = useNavigate();
  const [taskName, setTaskName] = useState('');
  const [date, setDate] = useState('');
  const [deadline, setDeadline] = useState('');
  const [subtasksCount, setSubtasksCount] = useState(0);

  return (
    <div className="h-full flex flex-col bg-bg-primary text-text-primary">
      
      <div className="flex items-center justify-between px-6 py-6 pt-8 bg-bg-primary sticky top-0 z-20">
        <button 
          onClick={() => navigate(-1)}
          className="w-10 h-10 bg-surface border border-border-color/60 rounded-full flex items-center justify-center hover:bg-surface-hover transition-colors shadow-sm"
        >
          <ChevronLeft size={20} className="text-text-primary mr-0.5" />
        </button>
        <h1 className="text-[17px] font-bold tracking-wide">Manual Task</h1>
        <div className="w-10"></div>
      </div>

      <div className="flex-1 px-6 overflow-y-auto pb-32 scrollbar-hide pt-2">
        
        <div className="mb-6">
          <label className="block text-[13px] font-bold text-text-secondary mb-2.5 px-1 uppercase tracking-wider">Task Name</label>
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary/50 group-focus-within:text-primary-accent transition-colors">
              <AlignLeft size={20} />
            </div>
            <input 
              type="text" 
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              placeholder="e.g., UI Redesign"
              className="w-full bg-surface border border-border-color/60 rounded-[20px] py-4 pl-12 pr-4 text-[15px] font-semibold text-text-primary placeholder:text-text-secondary/40 focus:outline-none focus:border-primary-accent focus:ring-4 focus:ring-primary-accent/10 transition-all shadow-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-[13px] font-bold text-text-secondary mb-2.5 px-1 uppercase tracking-wider">Date</label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary/50 group-focus-within:text-primary-accent transition-colors">
                <Calendar size={18} />
              </div>
              <input 
                type="text" 
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="Today"
                className="w-full bg-surface border border-border-color/60 rounded-[20px] py-4 pl-11 pr-4 text-[14px] font-semibold text-text-primary placeholder:text-text-secondary/40 focus:outline-none focus:border-primary-accent focus:ring-4 focus:ring-primary-accent/10 transition-all shadow-sm"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-[13px] font-bold text-text-secondary mb-2.5 px-1 uppercase tracking-wider">Deadline</label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary/50 group-focus-within:text-primary-accent transition-colors">
                <Clock size={18} />
              </div>
              <input 
                type="text" 
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                placeholder="00:00"
                className="w-full bg-surface border border-border-color/60 rounded-[20px] py-4 pl-11 pr-4 text-[14px] font-semibold text-text-primary placeholder:text-text-secondary/40 focus:outline-none focus:border-primary-accent focus:ring-4 focus:ring-primary-accent/10 transition-all shadow-sm"
              />
            </div>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-[13px] font-bold text-text-secondary mb-2.5 px-1 uppercase tracking-wider">Total Subtasks</label>
          <div className="bg-surface border border-border-color/60 rounded-[20px] p-4 px-5 flex items-center justify-between shadow-sm">
            <span className="text-[15px] font-semibold text-text-primary">How many subtasks?</span>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setSubtasksCount(Math.max(0, subtasksCount - 1))}
                className="w-9 h-9 bg-bg-primary border border-border-color/60 rounded-full flex items-center justify-center text-text-primary hover:bg-surface-hover transition-colors"
              >
                <Minus size={16} />
              </button>
              <span className="text-[18px] font-bold w-4 text-center">{subtasksCount}</span>
              <button 
                onClick={() => setSubtasksCount(subtasksCount + 1)}
                className="w-9 h-9 bg-primary-accent rounded-full flex items-center justify-center text-black hover:scale-105 active:scale-95 transition-transform"
              >
                <Plus size={16} strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </div>
        
        {subtasksCount > 0 && (
          <div className="space-y-3 mb-4">
            <label className="block text-[13px] font-bold text-text-secondary mb-2.5 px-1 uppercase tracking-wider">Subtasks Details</label>
            {Array.from({ length: subtasksCount }).map((_, i) => (
              <div key={i} className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-border-color/60 group-focus-within:border-primary-accent transition-colors"></div>
                <input 
                  type="text"
                  placeholder={`Step ${i + 1}...`}
                  className="w-full bg-surface border border-border-color/60 rounded-[16px] py-3.5 pl-11 pr-4 text-[14px] font-medium text-text-primary placeholder:text-text-secondary/40 focus:outline-none focus:border-primary-accent focus:ring-4 focus:ring-primary-accent/10 transition-all shadow-sm"
                />
              </div>
            ))}
          </div>
        )}

      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-bg-primary via-bg-primary/95 to-transparent z-20">
        <button 
          onClick={() => navigate(-1)}
          className="w-full py-4 bg-primary-accent text-black font-bold text-[16px] rounded-[20px] hover:scale-[1.02] active:scale-[0.98] transition-transform shadow-[0_8px_20px_rgba(190,238,2,0.2)]"
        >
          Create Task
        </button>
      </div>

    </div>
  );
}
