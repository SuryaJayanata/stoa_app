import { useNavigate } from 'react-router-dom';
import { Play, Minus, Plus, ShieldAlert, CalendarClock, Target, ArrowRight } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

const cards = [
  {
    id: 1,
    title: "Get a reminder to take a break if you haven't rested for",
    type: "counter",
    value: 2,
    unit: "hours",
    icon: null
  },
  {
    id: 2,
    title: "Limit new tasks when Burnout Score is high",
    type: "progress",
    icon: ShieldAlert,
    value: "85%"
  },
  {
    id: 3,
    title: "Auto-reschedule low-priority tasks when energy drops",
    type: "badges",
    icon: CalendarClock,
  },
  {
    id: 4,
    title: "Enable deep focus mode to block all distractions",
    type: "lock",
    icon: Target,
  }
];

export default function Splash() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const swipeContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % cards.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const handlePointerMove = (clientX: number) => {
    if (!isDragging || !swipeContainerRef.current) return;
    const rect = swipeContainerRef.current.getBoundingClientRect();
    const localWidth = swipeContainerRef.current.clientWidth;
    const scale = rect.width / localWidth;
    
    const localClientX = (clientX - rect.left) / scale;
    const maxDrag = localWidth - 56 - 16;
    
    let newX = localClientX - 28; 
    if (newX < 0) newX = 0;
    if (newX > maxDrag) newX = maxDrag;
    setDragOffset(newX);
  };

  const handlePointerUp = () => {
    if (!isDragging || !swipeContainerRef.current) return;
    setIsDragging(false);
    const localWidth = swipeContainerRef.current.clientWidth;
    const maxDrag = localWidth - 56 - 16;
    if (dragOffset > maxDrag * 0.7) {
      setDragOffset(maxDrag);
      navigate('/login');
    } else {
      setDragOffset(0);
    }
  };

  useEffect(() => {
    const onMove = (e: PointerEvent) => handlePointerMove(e.clientX);
    const onTouchMove = (e: TouchEvent) => handlePointerMove(e.touches[0].clientX);
    
    if (isDragging) {
      window.addEventListener('pointermove', onMove);
      window.addEventListener('touchmove', onTouchMove, { passive: false });
      window.addEventListener('pointerup', handlePointerUp);
      window.addEventListener('touchend', handlePointerUp);
    }
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('touchend', handlePointerUp);
    };
  }, [isDragging, dragOffset]);

  return (
    <div className="h-full flex flex-col bg-bg-primary text-text-primary overflow-hidden relative touch-none select-none">
      
      <div className="pt-12 px-8 pb-4 flex items-center gap-3 relative z-10">
        <img src="/stoa.svg" alt="Stoa Logo" className="w-8 h-8" />
        <span className="font-bold text-xl tracking-wide">Stoa</span>
      </div>

      <div className="px-8 pb-8 relative z-10">
        <h1 className="text-[32px] font-medium leading-[1.1] tracking-tight">
          Complete<br/>
          setup and start<br/>
          focusing
        </h1>
      </div>

      <div className="flex-1 relative flex items-center justify-center w-full z-10">
        {cards.map((card, index) => {
          let diff = index - currentIndex;
          if (diff < -1) diff += cards.length;
          if (diff > 2) diff -= cards.length;

          let className = "absolute transition-all duration-700 ease-in-out rounded-[32px] p-6 shadow-2xl flex flex-col justify-between overflow-hidden ";
          let style: React.CSSProperties = { opacity: 0, zIndex: 0 };

          if (diff === 0) {
            className += "bg-primary-accent text-black border border-transparent";
            style = { transform: 'translateX(0) scale(1) rotate(0deg)', opacity: 1, zIndex: 10, width: '280px', height: '320px' };
          } else if (diff === 1) {
            className += "bg-surface border border-border-color shadow-sm text-text-primary";
            style = { transform: 'translateX(60%) scale(0.9) rotate(8deg)', opacity: 0.7, zIndex: 5, width: '240px', height: '280px' };
          } else if (diff === -1 || diff === cards.length - 1) {
            className += "bg-surface border border-border-color shadow-sm text-text-primary";
            style = { transform: 'translateX(-60%) scale(0.9) rotate(-8deg)', opacity: 0, zIndex: 5, width: '240px', height: '280px' };
          } else {
            style = { transform: 'translateX(100%) scale(0.8)', opacity: 0, zIndex: 0, width: '240px', height: '280px' };
          }

          const Icon = card.icon;

          return (
            <div key={card.id} className={className} style={style}>
              <div>
                {Icon && diff === 0 && (
                  <div className="w-10 h-10 bg-black/10 rounded-full flex justify-center items-center mb-4">
                    <Icon size={20} />
                  </div>
                )}
                {Icon && diff !== 0 && (
                  <div className="w-8 h-8 bg-border-color rounded-full flex justify-center items-center mb-3">
                    <Icon size={16} />
                  </div>
                )}
                <p className={`leading-tight font-semibold pr-4 ${diff !== 0 ? 'text-text-secondary text-[13px]' : 'text-lg'}`}>
                  {card.title}
                </p>
              </div>
              
              {card.type === 'counter' && diff === 0 && (
                <>
                  <div className="flex items-center justify-between my-4 px-2">
                    <button className="w-12 h-12 bg-black/5 rounded-2xl flex justify-center items-center">
                      <Minus size={20} />
                    </button>
                    <div className="flex flex-col items-center">
                      <span className="text-[40px] font-medium leading-none">{card.value}</span>
                      <span className="text-sm font-medium">{card.unit}</span>
                    </div>
                    <button className="w-12 h-12 bg-black/5 rounded-2xl flex justify-center items-center">
                      <Plus size={20} />
                    </button>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-surface-hover text-text-primary border border-border-color rounded-full flex items-center px-4 py-2 gap-3">
                      <span className="text-sm font-semibold">On</span>
                      <div className="w-10 h-6 bg-primary-accent rounded-full p-1 flex justify-end">
                        <div className="w-4 h-4 bg-white rounded-full shadow-sm"></div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {card.type === 'progress' && diff === 0 && (
                <div className="mt-8 space-y-4">
                  <div className="flex justify-between text-sm font-semibold">
                    <span>Burnout Level</span>
                    <span className="text-black">{card.value}</span>
                  </div>
                  <div className="w-full h-3 bg-black/10 rounded-full overflow-hidden">
                    <div className="h-full bg-black w-[85%] rounded-full"></div>
                  </div>
                </div>
              )}

              {card.type === 'badges' && diff === 0 && (
                <div className="mt-8 flex flex-col gap-3">
                  <div className="bg-black/10 px-4 py-3 rounded-xl flex justify-between items-center text-sm font-medium">
                    <span>Email Reply</span>
                    <ArrowRight size={16} className="text-black/50" />
                    <span>Tomorrow</span>
                  </div>
                  <div className="bg-black/10 px-4 py-3 rounded-xl flex justify-between items-center text-sm font-medium">
                    <span>UI Polish</span>
                    <ArrowRight size={16} className="text-black/50" />
                    <span>Next Week</span>
                  </div>
                </div>
              )}

              {card.type === 'lock' && diff === 0 && (
                <div className="mt-8 flex justify-center items-center">
                  <div className="w-24 h-24 rounded-full border-[6px] border-black/10 flex justify-center items-center">
                    <div className="w-16 h-16 rounded-full bg-black/10 flex justify-center items-center animate-pulse">
                      <Target size={32} />
                    </div>
                  </div>
                </div>
              )}

            </div>
          );
        })}
      </div>

      <div className="flex justify-center gap-2 mb-8 z-20">
        {cards.map((_, idx) => (
          <div 
            key={idx} 
            className={`h-1.5 rounded-full transition-all duration-500 ${
              idx === currentIndex ? 'w-6 bg-text-primary' : 'w-1.5 bg-border-color'
            }`}
          ></div>
        ))}
      </div>

      <div className="px-6 pb-10 z-20">
        <div 
          ref={swipeContainerRef}
          className={`w-full border border-border-color h-[72px] rounded-full flex items-center p-2 relative overflow-hidden transition-all duration-300 ${
            isDragging ? 'bg-surface shadow-[0_0_20px_rgba(190,238,2,0.15)]' : 'bg-transparent'
          }`}
        >
          <div 
            className="absolute left-0 top-0 bottom-0 rounded-full pointer-events-none"
            style={{ 
              width: dragOffset + 64,
              background: 'linear-gradient(to right, transparent, rgba(190, 238, 2, 0.25))',
              opacity: dragOffset > 5 ? 1 : 0,
              transition: isDragging ? 'none' : 'width 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.3s ease-out'
            }}
          ></div>

          <div 
            onPointerDown={(e) => {
              setIsDragging(true);
              e.currentTarget.setPointerCapture(e.pointerId);
            }}
            onTouchStart={() => setIsDragging(true)}
            className={`w-14 h-14 bg-white rounded-full flex justify-center items-center absolute z-10 left-2 cursor-grab active:cursor-grabbing transition-all ${
              isDragging ? 'scale-[1.1] shadow-[0_0_15px_#BEEE02]' : 'shadow-lg hover:scale-105'
            }`}
            style={{ 
              transform: `translateX(${dragOffset}px)`,
              transition: isDragging ? 'none' : 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
            }}
          >
            <Play size={20} className="text-black ml-1" fill="currentColor" />
          </div>
          
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
            <span className={`font-semibold tracking-wide ml-8 text-text-secondary transition-colors duration-300 ${
              isDragging ? 'text-primary-accent' : ''
            }`}>
              {isDragging ? 'Start >>>' : 'Slide to start >>>'}
            </span>
          </div>

        </div>
      </div>

    </div>
  );
}
