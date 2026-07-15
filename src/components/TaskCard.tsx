import { Clock, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface TaskCardProps {
  id: string;
  title: string;
  duration: string;
  timeBlock?: string;
  project?: string;
  isPrimary?: boolean;
  isSecondary?: boolean;
  isCompleted?: boolean;
}

export default function TaskCard({ 
  id,
  title, 
  duration, 
  timeBlock,
  project,
  isPrimary = false,
  isSecondary = false,
  isCompleted = false
}: TaskCardProps) {
  const navigate = useNavigate();

  return (
    <div className={`relative p-6 rounded-[24px] overflow-hidden mb-4 border transition-all ${
      isPrimary 
        ? 'bg-primary-accent border-primary-accent text-black' 
        : isSecondary
          ? 'bg-secondary-accent border-secondary-accent text-black'
          : isCompleted
            ? 'bg-surface border-secondary-accent/40 shadow-sm text-text-primary'
            : 'bg-surface border-border-color hover:border-border-color/60 shadow-sm text-text-primary'
    }`}>
      <div className="mb-6">
        {project && (
          <div className={`text-[11px] font-medium uppercase tracking-[0.1em] mb-2 ${isPrimary || isSecondary ? 'text-black/50' : 'text-text-secondary'}`}>
            {project}
          </div>
        )}
        <h3 className={`text-[24px] font-normal tracking-tight mb-2.5 leading-tight ${isPrimary || isSecondary ? 'text-black' : 'text-text-primary'}`}>{title}</h3>
        <div className={`flex items-center gap-1.5 text-[13px] font-light ${isPrimary || isSecondary ? 'text-black/70' : 'text-text-secondary'}`}>
          <Clock size={16} strokeWidth={1.25} />
          {timeBlock ? `${timeBlock} • ${duration}` : duration}
        </div>
      </div>

      <button 
        onClick={() => !isCompleted && navigate(`/focus?taskId=${id}`)}
        disabled={isCompleted}
        className={`w-full flex items-center justify-between p-2 pl-5 rounded-[20px] transition-all group overflow-hidden ${
          isPrimary || isSecondary
            ? 'bg-black/10 border border-black/10 text-black hover:bg-black/20 hover:border-black/20 active:scale-[0.98]' 
            : isCompleted
              ? 'bg-transparent border border-dashed border-border-color text-text-secondary'
              : 'bg-black/5 border border-border-color text-text-primary hover:bg-black/10 active:scale-[0.98]'
        }`}
      >
        <span className="font-semibold text-[15px]">
          {isCompleted ? 'Completed' : 'Start Task'}
        </span>
        <div className={`w-10 h-10 rounded-[14px] flex justify-center items-center transition-transform ${isCompleted ? '' : 'group-hover:translate-x-1'} ${
          isPrimary || isSecondary 
            ? 'bg-black text-primary-accent shadow-sm' 
            : isCompleted 
               ? 'bg-transparent text-text-secondary' 
               : 'bg-[#16180a] text-white shadow-sm'
        }`}>
          {isCompleted ? <CheckCircle2 size={18} strokeWidth={2} /> : <ArrowRight size={18} strokeWidth={2.5} />}
        </div>
      </button>
    </div>
  );
}
