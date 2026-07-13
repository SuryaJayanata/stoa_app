import { Bell } from 'lucide-react';

interface HeaderProps {
  userName?: string;
  avatarUrl?: string;
}

export default function Header({ 
  userName = "David Bowie", 
  avatarUrl = "https://media.gq.com/photos/558357fc3655c24c6c963b19/master/w_1600%2Cc_limit/style-blogs-the-gq-eye-davidbowie635.jpg" 
}: HeaderProps) {
  return (
    <div className="flex justify-between items-center px-6 py-4 mb-2">
      <div className="flex items-center gap-3">
        <img 
          src={avatarUrl} 
          alt="User avatar" 
          className="w-11 h-11 rounded-full object-cover border border-[#2a2d1d]"
        />
        <div className="flex flex-col">
          <span className="text-[11px] text-text-secondary font-normal mb-0.5">Welcome back,</span>
          <span className="text-[15px] font-medium text-text-primary tracking-wide">{userName}</span>
        </div>
      </div>
      
      <button className="w-11 h-11 bg-surface border border-border-color shadow-sm rounded-full flex justify-center items-center relative text-text-primary hover:bg-surface-hover transition-colors">
        <Bell size={18} strokeWidth={1.5} />
        <span className="absolute top-2.5 right-3 w-2 h-2 bg-primary-accent rounded-full shadow-[0_0_8px_rgba(190,238,2,0.6)]"></span>
      </button>
    </div>
  );
}
