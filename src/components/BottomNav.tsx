import { Home, Calendar, Plus, LineChart, User, Edit3, Sparkles, Mic } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navPath = "M 32 20 L 133.12 20 A 44 44 0 0 1 206.88 20 L 308 20 A 32 32 0 0 1 340 52 A 32 32 0 0 1 308 84 L 188.33 84 A 44 44 0 0 1 151.67 84 L 32 84 A 32 32 0 0 1 0 52 A 32 32 0 0 1 32 20 Z";
  
  const svgMask = `data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='340' height='88' viewBox='0 0 340 88'><path d='${navPath}' fill='white'/></svg>`)}`;

  const navItems = [
    { icon: Home, path: '/dashboard', id: 'home' },
    { icon: Calendar, path: '/schedule', id: 'schedule' },
    { icon: null, path: '', id: 'spacer' },
    { icon: LineChart, path: '/energy', id: 'energy' },
    { icon: User, path: '/profile', id: 'profile' },
  ];

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsMenuOpen(false)}
      />

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[340px] h-[88px] z-50">
        
        <div className={`absolute left-1/2 top-[44px] w-0 h-0 transition-all duration-300 z-0 ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          
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
              className="w-12 h-12 bg-black/40 backdrop-blur-lg border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-primary-accent hover:text-black hover:border-primary-accent transition-all shadow-xl group"
            >
              <Edit3 size={20} strokeWidth={2} className="group-hover:scale-110 transition-transform" />
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
            <button className="w-14 h-14 bg-black/40 backdrop-blur-lg border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-primary-accent hover:text-black hover:border-primary-accent transition-all shadow-xl group">
              <Sparkles size={24} strokeWidth={2} className="group-hover:scale-110 transition-transform" />
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
            <button className="w-12 h-12 bg-black/40 backdrop-blur-lg border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-primary-accent hover:text-black hover:border-primary-accent transition-all shadow-xl group">
              <Mic size={20} strokeWidth={2} className="group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>

        <div 
          className="absolute inset-0 bg-[#16180a]/90 backdrop-blur-xl"
          style={{ 
            maskImage: `url("${svgMask}")`,
            WebkitMaskImage: `url("${svgMask}")`,
            maskSize: '100% 100%',
            WebkitMaskSize: '100% 100%'
          }}
        />

        <svg 
          className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-md" 
          viewBox="0 0 340 88" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d={navPath}
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="1.5"
          />
        </svg>

        <div 
          className="absolute inset-0 flex justify-between items-center px-5"
          style={{ top: '20px', height: '64px' }}
        >
          {navItems.map((item) => {
            if (item.id === 'spacer') {
              return <div key="spacer" className="w-[64px]" />;
            }
            const Icon = item.icon!;
            const isActive = location.pathname === item.path || (item.path === '/dashboard' && location.pathname === '/');
            
            return (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                className="relative w-14 h-14 flex flex-col justify-center items-center group"
              >
                <Icon 
                  size={26} 
                  className={`transition-colors duration-300 ${isActive ? 'text-white' : 'text-white/30 group-hover:text-white/60'}`} 
                  strokeWidth={isActive ? 2.5 : 2}
                />
                {isActive && (
                  <div className="absolute bottom-1 w-1.5 h-1.5 bg-primary-accent rounded-full shadow-[0_0_8px_#BEEE02]"></div>
                )}
              </button>
            );
          })}
        </div>

        <button 
          className={`absolute left-1/2 -translate-x-1/2 top-[8px] w-[72px] h-[72px] bg-primary-accent rounded-full flex justify-center items-center text-black shadow-[0_8px_25px_rgba(190,238,2,0.3)] hover:scale-105 active:scale-95 transition-all z-10 duration-300 ${isMenuOpen ? 'rotate-[135deg] bg-white' : 'rotate-0'}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Plus size={34} strokeWidth={2.5} />
        </button>

      </div>
    </>
  );
}
