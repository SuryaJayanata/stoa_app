import { Home, Calendar, Plus, LineChart, User } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  // Updated path: height=64 (y=20 to y=84). Center circle r=44, cy=44 to prevent top clipping
  const navPath = "M 32 20 L 133.12 20 A 44 44 0 0 1 206.88 20 L 308 20 A 32 32 0 0 1 340 52 A 32 32 0 0 1 308 84 L 188.33 84 A 44 44 0 0 1 151.67 84 L 32 84 A 32 32 0 0 1 0 52 A 32 32 0 0 1 32 20 Z";
  
  // Safe SVG encoding for CSS mask
  const svgMask = `data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='340' height='88' viewBox='0 0 340 88'><path d='${navPath}' fill='white'/></svg>`)}`;

  const navItems = [
    { icon: Home, path: '/dashboard', id: 'home' },
    { icon: Calendar, path: '/schedule', id: 'schedule' },
    { icon: null, path: '', id: 'spacer' }, // Space for center button
    { icon: LineChart, path: '/energy', id: 'energy' },
    { icon: User, path: '/profile', id: 'profile' },
  ];

  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[340px] h-[88px] z-50">
      
      {/* Glass Background */}
      <div 
        className="absolute inset-0 bg-[#16180a]/90 backdrop-blur-xl"
        style={{ 
          maskImage: `url("${svgMask}")`,
          WebkitMaskImage: `url("${svgMask}")`,
          maskSize: '100% 100%',
          WebkitMaskSize: '100% 100%'
        }}
      />

      {/* Border Outline */}
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

      {/* Nav Icons */}
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

      {/* Center AI Capture Button */}
      <button 
        className="absolute left-1/2 -translate-x-1/2 top-[8px] w-[72px] h-[72px] bg-primary-accent rounded-full flex justify-center items-center text-black shadow-[0_8px_25px_rgba(190,238,2,0.3)] hover:scale-105 active:scale-95 transition-all z-10"
        onClick={() => alert("AI Capture Triggered")}
      >
        <Plus size={34} strokeWidth={2.5} />
      </button>

    </div>
  );
}
