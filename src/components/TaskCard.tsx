import { Lock, Unlock, Play, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface TaskCardProps {
  id: string;
  title: string;
  duration: string;
  timeBlock?: string;
  project?: string;
  isPrimary?: boolean;
  isLocked?: boolean;
}

export default function TaskCard({ 
  id,
  title, 
  duration, 
  timeBlock,
  project,
  isPrimary = false,
  isLocked = false
}: TaskCardProps) {
  const navigate = useNavigate();

  return (
    <div className={`relative p-6 rounded-[24px] overflow-hidden mb-4 border transition-all ${
      isPrimary 
        ? 'bg-primary-accent border-primary-accent text-black' 
        : 'bg-white border-white text-black'
    }`}>
      <div className="mb-6">
        {project && (
          <div className={`text-[11px] font-medium uppercase tracking-[0.1em] mb-2 ${isPrimary ? 'text-black/50' : 'text-black/40'}`}>
            {project}
          </div>
        )}
        <h3 className={`text-[24px] font-normal tracking-tight mb-2.5 leading-tight text-black`}>{title}</h3>
        <div className={`flex items-center gap-1.5 text-[13px] font-light ${isPrimary ? 'text-black/70' : 'text-black/50'}`}>
          <Clock size={16} strokeWidth={1.25} />
          {timeBlock ? `${timeBlock} • ${duration}` : duration}
        </div>
      </div>

      <button 
        onClick={() => !isLocked && navigate(`/focus?taskId=${id}`)}
        disabled={isLocked}
        className={`w-full h-[56px] rounded-[20px] flex items-center p-1.5 transition-all relative group overflow-hidden ${
          isPrimary ? 'bg-black text-primary-accent hover:scale-[1.02] active:scale-[0.98]' : 'bg-[#f4f5f8] text-black hover:bg-[#eaece5]'
        }`}
      >
        <div className={`w-11 h-11 rounded-[14px] flex justify-center items-center relative z-10 transition-transform ${
          isPrimary ? 'bg-primary-accent text-black group-hover:rotate-12' : 'bg-white text-black/50 shadow-sm group-hover:scale-105'
        }`}>
          {isLocked ? <Lock size={15} strokeWidth={1.25} /> : (isPrimary ? <Play size={15} fill="currentColor" className="ml-0.5" /> : <Unlock size={15} strokeWidth={1.25} />)}
        </div>
        
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="font-normal text-[15px] tracking-wide">
            {isLocked ? 'Locked' : 'Start Task'}
          </span>
        </div>
      </button>
    </div>
  );
}
