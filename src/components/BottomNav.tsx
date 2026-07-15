import { Home, Calendar, Plus, LineChart, User, Edit3, Sparkles, Mic } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { icon: Home, path: '/dashboard', id: 'home' },
    { icon: Calendar, path: '/schedule', id: 'schedule' },
    { icon: Plus, path: 'action', id: 'action' },
    { icon: LineChart, path: '/energy', id: 'energy' },
    { icon: User, path: '/profile', id: 'profile' },
  ];

  return (
    <>
      <div 
        className={`fixed inset-0 bg-text-primary/10 backdrop-blur-[2px] z-40 transition-opacity duration-300 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsMenuOpen(false)}
      />

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[340px] h-[72px] bg-[#16180a]/95 backdrop-blur-xl rounded-[36px] shadow-2xl flex items-center justify-between px-3 z-50 border border-white/10">
        
        {/* Radial Menu Items - Origin at center of the bar */}
        <div className={`absolute left-1/2 top-[36px] w-0 h-0 transition-all duration-300 z-0 ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          
          <div 
            className="absolute flex flex-col items-center gap-2"
            style={{
              transform: isMenuOpen ? 'translate(calc(-50% - 85px), calc(-50% - 75px)) scale(1)' : 'translate(-50%, -50%) scale(0)',
              transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              transitionDelay: isMenuOpen ? '0ms' : '100ms'
            }}
          >
            <button 
              onClick={() => {
                setIsMenuOpen(false);
                navigate('/input-manual');
              }}
              className="w-12 h-12 bg-[#16180a]/90 backdrop-blur-lg border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-primary-accent hover:text-black hover:border-primary-accent transition-all shadow-xl group"
            >
              <Edit3 size={20} strokeWidth={2.5} className="group-hover:scale-110 transition-transform" />
            </button>
          </div>

          <div 
            className="absolute flex flex-col items-center gap-2"
            style={{
              transform: isMenuOpen ? 'translate(-50%, calc(-50% - 110px)) scale(1)' : 'translate(-50%, -50%) scale(0)',
              transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              transitionDelay: isMenuOpen ? '50ms' : '50ms'
            }}
          >
            <button 
              onClick={() => {
                setIsMenuOpen(false);
                navigate('/input-ai');
              }}
              className="w-14 h-14 bg-[#16180a]/90 backdrop-blur-lg border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-primary-accent hover:text-black hover:border-primary-accent transition-all shadow-xl group"
            >
              <Sparkles size={24} strokeWidth={2.5} className="group-hover:scale-110 transition-transform" />
            </button>
          </div>

          <div 
            className="absolute flex flex-col items-center gap-2"
            style={{
              transform: isMenuOpen ? 'translate(calc(-50% + 85px), calc(-50% - 75px)) scale(1)' : 'translate(-50%, -50%) scale(0)',
              transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
              transitionDelay: isMenuOpen ? '100ms' : '0ms'
            }}
          >
            <button className="w-12 h-12 bg-[#16180a]/90 backdrop-blur-lg border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-primary-accent hover:text-black hover:border-primary-accent transition-all shadow-xl group">
              <Mic size={20} strokeWidth={2.5} className="group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>

        {/* Nav Icons */}
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path || (item.path === '/dashboard' && location.pathname === '/');
          
          if (item.id === 'action') {
            return (
              <button 
                key="action"
                className={`w-[60px] h-[60px] -translate-y-3 bg-primary-accent rounded-full flex justify-center items-center text-black shadow-[0_4px_12px_rgba(190,238,2,0.4)] hover:scale-105 active:scale-95 transition-all z-10 duration-300 mx-1 border-[3px] border-white ${isMenuOpen ? 'rotate-[135deg] bg-white shadow-none border-transparent' : 'rotate-0'}`}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <Plus size={30} strokeWidth={2.5} />
              </button>
            );
          }

          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className="relative w-12 h-12 flex flex-col justify-center items-center group z-10"
            >
              <Icon 
                size={22} 
                className={`transition-colors duration-300 ${isActive ? 'text-primary-accent' : 'text-white/40 group-hover:text-white/80'}`} 
                strokeWidth={isActive ? 2.5 : 2}
              />
              {isActive && (
                <div className="absolute bottom-1.5 w-1 h-1 bg-primary-accent rounded-full shadow-[0_0_8px_#BEEE02]"></div>
              )}
            </button>
          );
        })}

      </div>
    </>
  );
}
