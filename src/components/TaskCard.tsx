import { Clock, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface TaskCardProps {
  id: string;
  title: string;
  duration: string;
  timeBlock?: string;
  project?: string;
  isPrimary?: boolean;
  isCompleted?: boolean;
}

export default function TaskCard({ 
  id,
  title, 
  duration, 
  timeBlock,
  project,
  isPrimary = false,
  isCompleted = false
}: TaskCardProps) {
  const navigate = useNavigate();

  return (
    <div className={`relative p-6 rounded-[24px] overflow-hidden mb-4 border transition-all ${
      isPrimary 
        ? 'bg-primary-accent border-primary-accent text-black' 
        : isCompleted
          ? 'bg-surface border-primary-accent/40 shadow-sm text-text-primary'
          : 'bg-surface border-border-color hover:border-border-color/60 shadow-sm text-text-primary'
    }`}>
      <div className="mb-6">
        {project && (
          <div className={`text-[11px] font-medium uppercase tracking-[0.1em] mb-2 ${isPrimary ? 'text-black/50' : 'text-text-secondary'}`}>
            {project}
          </div>
        )}
        <h3 className={`text-[24px] font-normal tracking-tight mb-2.5 leading-tight ${isPrimary ? 'text-black' : 'text-text-primary'}`}>{title}</h3>
        <div className={`flex items-center gap-1.5 text-[13px] font-light ${isPrimary ? 'text-black/70' : 'text-text-secondary'}`}>
          <Clock size={16} strokeWidth={1.25} />
          {timeBlock ? `${timeBlock} • ${duration}` : duration}
        </div>
      </div>

      <button 
        onClick={() => !isCompleted && navigate(`/focus?taskId=${id}`)}
        disabled={isCompleted}
        className={`w-full flex items-center justify-between p-4 px-5 rounded-[20px] transition-all group overflow-hidden ${
          isPrimary 
            ? 'bg-black text-primary-accent hover:bg-black/90 active:scale-[0.98]' 
            : isCompleted
              ? 'bg-primary-accent/20 text-text-primary'
              : 'bg-surface-hover text-text-primary hover:bg-border-color active:scale-[0.98]'
        }`}
      >
        <span className="font-semibold text-[15px]">
          {isCompleted ? 'Completed' : 'Start Task'}
        </span>
        <div className={`flex justify-center items-center transition-all ${isCompleted ? '' : 'group-hover:translate-x-1'} ${
          isPrimary ? 'text-primary-accent' : isCompleted ? 'text-text-primary' : 'text-text-secondary'
        }`}>
          {isCompleted ? <CheckCircle2 size={20} strokeWidth={2} /> : <ArrowRight size={20} strokeWidth={2} />}
        </div>
      </button>
    </div>
  );
}
