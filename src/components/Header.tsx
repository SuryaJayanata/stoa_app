import { Bell } from 'lucide-react';

interface HeaderProps {
  userName?: string;
  avatarUrl?: string;
}

export default function Header({ 
  userName = "Martin Butler", 
  avatarUrl = "https://i.pravatar.cc/150?u=martin" 
}: HeaderProps) {
  return (
    <div className="flex justify-between items-center px-6 mb-6">
      <div className="flex items-center gap-3 bg-white rounded-full p-1 pr-4 shadow-sm">
        <img 
          src={avatarUrl} 
          alt="User avatar" 
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <span className="text-[10px] text-gray-500 font-medium">Welcome Back</span>
          <span className="text-xs font-semibold text-gray-900">{userName}</span>
        </div>
      </div>
      
      <button className="w-12 h-12 bg-white rounded-full flex justify-center items-center shadow-sm relative text-gray-800 hover:bg-gray-50 transition-colors">
        <Bell size={20} />
        <span className="absolute top-3 right-3 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
      </button>
    </div>
  );
}
