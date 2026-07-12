import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Check, LayoutList, MonitorPlay, ChevronUp, AlertTriangle } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

// Focus Card Component (One card per screen)
function FocusCard({ 
  task, 
  onComplete, 
  total, 
  currentIndex 
}: { 
  task: any, 
  onComplete: () => void, 
  total: number, 
  currentIndex: number 
}) {
  const [dragY, setDragY] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const isDraggingRef = useRef(false);
  const startYRef = useRef(0);
  const maxDragUp = -250; // Required distance to complete

  useEffect(() => {
    // Reset state when a new task is mounted
    setDragY(0);
    setIsSwiping(false);
  }, [task.id]);

  const handlePointerDown = (e: React.PointerEvent) => {
    if (isSwiping) return;
    isDraggingRef.current = true;
    startYRef.current = e.clientY;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const diff = e.clientY - startYRef.current;
    if (diff < 0) { // Only swipe up
      setDragY(Math.max(diff, maxDragUp)); 
    } else {
      setDragY(0);
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    e.currentTarget.releasePointerCapture(e.pointerId);
    
    // Threshold to complete
    if (dragY <= maxDragUp * 0.7) {
      setIsSwiping(true);
      setDragY(maxDragUp * 2); // Instantly expand completely
      setTimeout(() => {
        onComplete();
      }, 500); // Wait for fill animation before proceeding
    } else {
      setDragY(0); // Snap back to 0
    }
  };

  // Convert drag distance to a scale factor for the radial fill
  const fillProgress = Math.min(1, Math.max(0, dragY / maxDragUp));
  const scale = 1 + (fillProgress * 30); // Start at scale 1 (base size), scale up to 31x
  
  // Card moves slightly (15% of the drag distance) for a heavy, magnetic feel
  const cardMoveY = dragY * 0.15;
  const cardRotate = dragY * 0.015;

  return (
    <div className="absolute inset-0 flex flex-col justify-center items-center z-20 pointer-events-none mt-2">
      <div 
        className="w-full max-w-[340px] aspect-[4/4.5] max-h-[450px] bg-transparent border border-[#2a2d1d] rounded-[40px] flex flex-col justify-center items-center p-8 shadow-2xl relative pointer-events-auto cursor-grab active:cursor-grabbing overflow-hidden select-none"
        style={{ 
          transform: `translateY(${cardMoveY}px) rotate(${cardRotate}deg)`,
          transition: isDraggingRef.current ? 'none' : 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        {/* Radial Fill Element inside the card (Acts as the thumb grip at scale 1) */}
        <div 
          className="absolute left-1/2 w-16 h-16 bg-primary-accent rounded-full z-0"
          style={{ 
            bottom: '-32px',
            marginLeft: '-32px',
            transformOrigin: 'center center',
            transform: `scale(${scale})`,
            transition: isDraggingRef.current ? 'none' : 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
          }}
        />

        {/* Swipe Indicator Overlay (Text and Icon that fade out on drag) */}
        <div 
          className="absolute bottom-1 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none z-10"
          style={{ 
            opacity: 1 - (fillProgress * 10), // Fades out completely by 10% drag
            transition: isDraggingRef.current ? 'none' : 'opacity 0.2s'
          }}
        >
          <span className="text-[10px] uppercase font-bold text-white/40 mb-1 tracking-widest animate-pulse">Swipe</span>
          <div className="w-16 h-8 flex justify-center items-end pb-1.5">
             <ChevronUp size={20} className="text-black" strokeWidth={3} />
          </div>
        </div>

        {/* Content Layer */}
        <div className={`relative z-10 flex flex-col items-center w-full transition-colors duration-200 ${fillProgress > 0.05 ? 'text-black' : 'text-white'}`}>
          <span className={`font-bold tracking-widest text-xs uppercase mb-6 text-center transition-colors duration-200 ${fillProgress > 0.05 ? 'text-black/60' : 'text-primary-accent'}`}>
            Subtask {currentIndex} of {total}
          </span>
          
          <h2 className="text-[26px] font-bold text-center leading-snug mb-16 px-2">
            {task.text}
          </h2>
        </div>

        {/* Success Checkmark overlay when fully swiped */}
        <div 
          className={`absolute inset-0 flex justify-center items-center z-20 pointer-events-none transition-all duration-300 ${isSwiping ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}
        >
          <div className="w-24 h-24 bg-black rounded-full flex justify-center items-center shadow-2xl">
            <Check size={48} className="text-primary-accent" strokeWidth={3} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HyperFocus() {
  const navigate = useNavigate();
  
  // Dual-mode state
  const [viewMode, setViewMode] = useState<'focus' | 'list'>('focus');

  // Mock subtasks
  const [subtasks, setSubtasks] = useState([
    { id: 1, text: "Review previous quarter metrics", done: false },
    { id: 2, text: "Outline main strategy pillars for Q3", done: false },
    { id: 3, text: "Draft initial budget allocation", done: false },
    { id: 4, text: "Create presentation slides", done: false },
  ]);

  const toggleTask = (id: number) => {
    setSubtasks(subtasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const completedCount = subtasks.filter(t => t.done).length;
  const progress = Math.round((completedCount / subtasks.length) * 100);

  // Focus Mode Active Task
  const activeTaskIndex = subtasks.findIndex(t => !t.done);
  const activeTask = activeTaskIndex !== -1 ? subtasks[activeTaskIndex] : null;

  // List Mode Bottom Sheet Logic
  const [dragY, setDragY] = useState(0);
  const [isRevealing, setIsRevealing] = useState(false);
  const [showWarningModal, setShowWarningModal] = useState(false);
  const maxDragUp = -140; 
  const isDraggingRef = useRef(false);
  const startYRef = useRef(0);

  // Trigger reveal automatically when Focus mode finishes all tasks
  useEffect(() => {
    if (viewMode === 'focus' && progress === 100 && !isRevealing) {
      setIsRevealing(true);
      setTimeout(() => {
        navigate('/dashboard');
      }, 2500);
    }
  }, [progress, viewMode, isRevealing, navigate]);

  const handlePointerDown = (e: React.PointerEvent) => {
    if (isRevealing) return;
    isDraggingRef.current = true;
    startYRef.current = e.clientY;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const diff = e.clientY - startYRef.current;
    if (diff < 0) {
      setDragY(Math.max(diff, maxDragUp));
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    e.currentTarget.releasePointerCapture(e.pointerId);
    
    if (dragY <= maxDragUp * 0.5) {
      const allDone = subtasks.every(t => t.done);
      if (!allDone) {
        setShowWarningModal(true);
        setDragY(0);
      } else {
        setDragY(maxDragUp);
        setIsRevealing(true);
        setTimeout(() => navigate('/dashboard'), 2500);
      }
    } else {
      setDragY(0);
    }
  };

  const fillProgress = Math.min(1, Math.max(0, dragY / maxDragUp));

  return (
    <div className="h-full w-full relative bg-[#16180a] text-white flex flex-col font-sans overflow-hidden">
      {/* Dynamic Background Effect */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-accent/10 rounded-full blur-[100px] pointer-events-none translate-x-1/3 -translate-y-1/3"></div>

      {/* Top Bar */}
      <div className="flex justify-between items-center px-6 pb-6 relative z-10 shrink-0">
        <button 
          onClick={() => navigate('/dashboard')}
          className="p-2 -ml-2 rounded-full hover:bg-white/10 transition-colors flex items-center justify-center"
        >
          <ArrowLeft size={24} className="text-white" />
        </button>

        {/* View Toggle */}
        <div className="bg-[#2a2d1d] p-1 rounded-full flex gap-1">
          <button 
            onClick={() => setViewMode('focus')}
            className={`flex items-center gap-2 px-5 py-2 rounded-full text-[13px] font-bold transition-all ${
              viewMode === 'focus' ? 'bg-primary-accent text-black shadow-sm' : 'text-white/50 hover:text-white/80'
            }`}
          >
            <MonitorPlay size={16} />
            Focus
          </button>
          <button 
            onClick={() => setViewMode('list')}
            className={`flex items-center gap-2 px-5 py-2 rounded-full text-[13px] font-bold transition-all ${
              viewMode === 'list' ? 'bg-primary-accent text-black shadow-sm' : 'text-white/50 hover:text-white/80'
            }`}
          >
            <LayoutList size={16} />
            List
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col px-6 relative z-10 overflow-hidden min-h-0">
        
        {/* New Layout matching reference image */}
        <div className="mb-8 shrink-0 flex flex-col gap-6 mt-4">
          
          {/* Title & Badges */}
          <div>
            {/* Eyebrow Label: Due Date */}
            <div className="text-white/60 text-[13px] font-semibold flex items-center gap-1.5 mb-2 uppercase tracking-wide">
               <Clock size={14} /> Due Oct 12
            </div>
            
            <h1 className="text-[36px] font-bold leading-tight tracking-tight mb-4">
              Q3 Strategy Report
            </h1>
            
            <div className="flex flex-wrap items-center gap-3">
              <span className="bg-white text-black px-4 py-1.5 rounded-full text-[13px] font-bold">
                High priority
              </span>
              <span className="bg-primary-accent text-black px-4 py-1.5 rounded-full text-[13px] font-bold">
                Final Steps
              </span>
            </div>
          </div>

          {/* Progress Section */}
          <div>
            <div className="flex justify-between items-end mb-3">
              <span className="text-[15px] font-semibold text-white/90">Progress</span>
              <span className="text-[15px] font-bold text-white">{progress}%</span>
            </div>
            {/* Striped Progress Bar Container */}
            <div 
              className="w-full h-7 flex rounded-full overflow-hidden bg-[#1a1c11]"
              style={{
                // Tighter, denser diagonal stripes for the unfilled portion
                background: 'repeating-linear-gradient(-45deg, transparent, transparent 3px, rgba(190,238,2,0.3) 3px, rgba(190,238,2,0.3) 6px)'
              }}
            >
              <div 
                className="h-full bg-primary-accent transition-all duration-700 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>


          
        </div>

        {/* --- DUAL MODE RENDERING --- */}
        
        {/* MODE: FOCUS (1 Card per screen) */}
        {viewMode === 'focus' && (
          <div className="flex-1 flex flex-col justify-center items-center relative z-10 w-full touch-none select-none pb-16">
             {activeTask ? (
                <FocusCard 
                  task={activeTask} 
                  total={subtasks.length}
                  currentIndex={activeTaskIndex + 1}
                  onComplete={() => toggleTask(activeTask.id)} 
                />
             ) : (
                <div className="absolute inset-0 flex justify-center items-center opacity-50 text-center px-8">
                  <p>All subtasks completed! Finalizing...</p>
                </div>
             )}
          </div>
        )}

        {/* MODE: LIST (Standard checklist) */}
        {viewMode === 'list' && (
          <div className="flex-1 overflow-y-auto scrollbar-hide pb-32 min-h-0">
            {/* Subtasks Header matching reference image */}
            <div className="mb-4 mt-2 shrink-0">
              <h3 className="font-semibold text-[15px] text-white/90">Subtasks</h3>
            </div>

            <div className="space-y-3">
              {subtasks.map((task) => (
                <button 
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  className={`w-full p-4 rounded-[20px] border flex items-center gap-4 transition-all text-left ${
                    task.done 
                      ? 'bg-primary-accent border-primary-accent shadow-lg text-black' 
                      : 'bg-transparent border-[#2a2d1d] hover:border-white/20 text-white/90'
                  }`}
                >
                  <div className={`shrink-0 flex items-center justify-center w-6 h-6 rounded-full transition-colors ${task.done ? 'bg-black text-primary-accent' : 'border-2 border-white/20'}`}>
                    {task.done && <Check size={14} strokeWidth={4} />}
                  </div>
                  <span className={`text-[15px] font-bold leading-snug transition-all`}>
                    {task.text}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
        
      </div>

      {/* Floating Bottom Action - List Mode Only */}
      {viewMode === 'list' && (
        <div 
           className="absolute left-0 w-full z-20 flex justify-center touch-none pointer-events-auto cursor-grab active:cursor-grabbing select-none"
           style={{ 
             bottom: 0,
             height: '56px', // Base visible height
             transform: `translateY(${dragY}px)`,
             transition: isDraggingRef.current ? 'none' : 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
           }}
           onPointerDown={handlePointerDown}
           onPointerMove={handlePointerMove}
           onPointerUp={handlePointerUp}
           onPointerCancel={handlePointerUp}
        >
          {/* Infinite Base Background with Clip */}
          <div className="absolute top-0 left-0 w-full h-[1000px] bg-white rounded-t-[24px] overflow-hidden">
             {/* Large Radial Green Fill rising from below */}
             <div 
               className="absolute left-1/2 bg-primary-accent rounded-full"
               style={{
                 width: '400px',
                 height: '400px',
                 marginLeft: '-200px',
                 top: '56px', // Starts perfectly hidden below the 56px visible tab
                 transformOrigin: 'center center',
                 transform: `scale(${1 + (fillProgress * 0.8)})`, // Scales up to cover the tab with a curved top
               }}
             />
          </div>

          {/* Foreground Content */}
          <div className="relative z-10 w-full h-[56px] flex flex-col justify-center items-center pointer-events-none">
            <div className={`w-10 h-1 rounded-full mb-1 transition-colors duration-200 ${fillProgress > 0.1 ? 'bg-black/50' : 'bg-black/20'}`}></div>
            <div className="relative w-full h-6 flex justify-center items-center overflow-hidden">
              <span className={`absolute font-bold text-[15px] text-black transition-all duration-300 ${dragY < -30 ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
                Swipe up to complete
              </span>
              <span className={`absolute font-bold text-[15px] text-black flex items-center gap-2 transition-all duration-300 ${dragY < -30 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
                <Check size={18} strokeWidth={3} /> Release
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Radial Reveal Animation Overlay */}
      <div 
        className={`fixed left-1/2 w-10 h-10 bg-primary-accent rounded-full pointer-events-none z-40 transition-all duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] flex justify-center items-center ${
          isRevealing ? 'scale-[150] opacity-100' : 'scale-0 opacity-0'
        }`}
        style={{ 
          bottom: '50%', 
          marginLeft: '-20px', 
          transformOrigin: 'center center' 
        }}
      />
      
      {/* Success Message revealed after radial expansion */}
      <div className={`fixed inset-0 z-50 flex flex-col items-center justify-center pointer-events-none transition-opacity duration-700 delay-[600ms] ${
        isRevealing ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className="w-24 h-24 bg-black rounded-full flex justify-center items-center mb-6 shadow-2xl">
          <Check size={48} className="text-primary-accent" />
        </div>
        <h2 className="text-black text-[40px] font-bold tracking-tight mb-2">Great Work!</h2>
        <p className="text-black/70 font-bold text-lg">Task completed successfully.</p>
      </div>

      {/* Warning Modal for Unfinished Tasks */}
      <div 
        className={`fixed inset-0 z-50 flex flex-col justify-end transition-all duration-400 ${
          showWarningModal ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity" onClick={() => setShowWarningModal(false)}></div>
        
        <div 
          className={`bg-primary-accent w-full rounded-t-[40px] p-8 pt-12 pb-10 relative z-10 transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] flex flex-col items-center text-center ${
            showWarningModal ? 'translate-y-0' : 'translate-y-full'
          }`}
        >
          {/* Floating Warning Icon */}
          <div className="w-16 h-16 rounded-full bg-black border-4 border-primary-accent absolute -top-8 flex justify-center items-center text-primary-accent">
            <AlertTriangle size={28} />
          </div>

          <h3 className="text-[24px] font-bold text-black mb-2 mt-2">Unfinished Tasks</h3>
          <p className="text-black/80 text-[15px] leading-relaxed mb-8 px-2 font-medium">
            You are about to complete this session with incomplete subtasks. Do you wish to proceed anyway?
          </p>
          
          <div className="flex flex-col gap-3 w-full">
            <button 
              onClick={() => {
                setShowWarningModal(false);
                setIsRevealing(true);
                setTimeout(() => navigate('/dashboard'), 2500);
              }}
              className="w-full py-4 rounded-[20px] bg-black text-white font-bold text-[16px] hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Force Complete
            </button>
            <button 
              onClick={() => setShowWarningModal(false)}
              className="w-full py-4 rounded-[20px] bg-transparent text-black/60 font-bold text-[15px] hover:text-black transition-colors"
            >
              Cancel & Return
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
