import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ChevronLeft, CheckCircle2, Loader2, RefreshCw, Plus } from 'lucide-react';

export default function InputAI() {
  const navigate = useNavigate();
  const [taskIdea, setTaskIdea] = useState('');
  const [goal, setGoal] = useState('');
  const [stage, setStage] = useState<'input' | 'processing' | 'result'>('input');
  
  // Results
  const [generatedTitle, setGeneratedTitle] = useState('');
  const [generatedDesc, setGeneratedDesc] = useState('');
  const [generatedSubtasks, setGeneratedSubtasks] = useState<string[]>([]);

  const handleGenerate = () => {
    if (!taskIdea.trim()) return;
    setStage('processing');
    
    // Simulate AI Processing
    setTimeout(() => {
      setGeneratedTitle(`Build: ${taskIdea}`);
      setGeneratedDesc(`Automatically generated action plan to achieve: ${goal || 'the core objective'}.`);
      setGeneratedSubtasks([
        "Research the initial requirements",
        "Set up the foundational structure",
        "Implement core functionality",
        "Review and test thoroughly"
      ]);
      setStage('result');
    }, 2500);
  };

  return (
    <div className="h-full flex flex-col bg-[#0a0a0a] text-white font-sans overflow-hidden">
      
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 pt-8 sticky top-0 z-20 bg-[#0a0a0a]/80 backdrop-blur-md">
        <button 
          onClick={() => navigate(-1)}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors -ml-2"
        >
          <ChevronLeft size={28} className="text-white" />
        </button>
        <div className="flex items-center gap-2">
          <Sparkles size={18} className="text-primary-accent" />
          <h1 className="text-[17px] font-semibold tracking-tight text-white">AI Assistant</h1>
        </div>
        <div className="w-10"></div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-24 scrollbar-hide pt-4">
        
        {stage === 'input' && (
          <div className="space-y-6">
            <div className="text-center mb-8 mt-4">
              <div className="w-16 h-16 bg-primary-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-primary-accent/20">
                <Sparkles size={32} className="text-primary-accent" />
              </div>
              <h2 className="text-[24px] font-bold mb-2">Let AI build your task</h2>
              <p className="text-white/60 text-[15px]">Describe what you want to do, and I'll break it down into actionable steps.</p>
            </div>

            <div>
              <label className="block text-[14px] font-medium text-white/80 mb-2 ml-1">What do you want to do?</label>
              <textarea 
                value={taskIdea}
                onChange={(e) => setTaskIdea(e.target.value)}
                placeholder="e.g., Redesign the landing page..."
                className="w-full bg-white/5 border border-white/10 rounded-[16px] py-4 px-4 text-[15px] text-white placeholder:text-white/30 focus:outline-none focus:border-primary-accent focus:ring-1 focus:ring-primary-accent transition-all resize-none h-[100px]"
              />
            </div>
            
            <div>
              <label className="block text-[14px] font-medium text-white/80 mb-2 ml-1">What's the goal? (Optional)</label>
              <textarea 
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                placeholder="e.g., Increase conversion rate by 10%"
                className="w-full bg-white/5 border border-white/10 rounded-[16px] py-4 px-4 text-[15px] text-white placeholder:text-white/30 focus:outline-none focus:border-primary-accent focus:ring-1 focus:ring-primary-accent transition-all resize-none h-[100px]"
              />
            </div>
          </div>
        )}

        {stage === 'processing' && (
          <div className="flex flex-col items-center justify-center h-full min-h-[400px]">
            <Loader2 size={48} className="text-primary-accent animate-spin mb-6" />
            <h3 className="text-[20px] font-bold text-white mb-2">Analyzing your task...</h3>
            <p className="text-white/50 text-[15px] text-center max-w-[250px]">Breaking down complex goals into simple, actionable steps.</p>
          </div>
        )}

        {stage === 'result' && (
          <div className="space-y-6 pb-10">
            <div className="bg-primary-accent/10 border border-primary-accent/20 rounded-[20px] p-5">
              <label className="block text-[12px] font-bold text-primary-accent mb-2 uppercase tracking-wider">Generated Title</label>
              <input 
                value={generatedTitle}
                onChange={(e) => setGeneratedTitle(e.target.value)}
                className="w-full bg-transparent text-[18px] font-bold text-white focus:outline-none border-b border-transparent focus:border-primary-accent/50 pb-1"
              />
              
              <div className="w-full h-[1px] bg-white/10 my-4"></div>
              
              <label className="block text-[12px] font-bold text-primary-accent mb-2 uppercase tracking-wider">Description</label>
              <textarea 
                value={generatedDesc}
                onChange={(e) => setGeneratedDesc(e.target.value)}
                className="w-full bg-transparent text-[14px] text-white/80 focus:outline-none resize-none min-h-[60px]"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-4">
                <label className="block text-[15px] font-semibold text-white ml-1">AI Subtasks</label>
                <span className="text-[12px] font-medium bg-white/10 text-white/70 px-2 py-1 rounded-full">{generatedSubtasks.length} Steps</span>
              </div>
              
              <div className="space-y-3">
                {generatedSubtasks.map((task, i) => (
                  <div key={i} className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-[16px] p-4 group">
                    <div className="w-5 h-5 rounded-full border-2 border-white/30 flex-shrink-0 mt-0.5 group-hover:border-primary-accent transition-colors"></div>
                    <input
                      value={task}
                      onChange={(e) => {
                        const newTasks = [...generatedSubtasks];
                        newTasks[i] = e.target.value;
                        setGeneratedSubtasks(newTasks);
                      }}
                      className="w-full bg-transparent text-[15px] text-white focus:outline-none"
                    />
                  </div>
                ))}
              </div>
              
              <button 
                onClick={() => setGeneratedSubtasks([...generatedSubtasks, ''])}
                className="w-full mt-3 py-4 border border-dashed border-white/20 rounded-[16px] text-white/50 font-medium text-[14px] flex items-center justify-center gap-2 hover:bg-white/5 hover:text-white transition-colors"
              >
                <Plus size={16} /> Add another step
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/90 to-transparent z-20">
        {stage === 'input' && (
           <button 
             onClick={handleGenerate}
             disabled={!taskIdea.trim()}
             className={`w-full py-4 rounded-[20px] font-bold text-[16px] flex items-center justify-center gap-2 transition-all ${
               taskIdea.trim() 
                 ? 'bg-primary-accent text-black shadow-[0_8px_20px_rgba(190,238,2,0.2)] hover:scale-[1.02] active:scale-[0.98]' 
                 : 'bg-white/10 text-white/40 cursor-not-allowed'
             }`}
           >
             <Sparkles size={20} />
             Generate Action Plan
           </button>
        )}
        
        {stage === 'result' && (
           <div className="flex gap-3">
             <button 
               onClick={handleGenerate}
               className="w-[60px] h-[56px] rounded-[20px] bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
             >
               <RefreshCw size={20} />
             </button>
             <button 
               onClick={() => navigate('/dashboard')}
               className="flex-1 h-[56px] rounded-[20px] bg-primary-accent text-black font-bold text-[16px] flex items-center justify-center gap-2 shadow-[0_8px_20px_rgba(190,238,2,0.2)] hover:scale-[1.02] active:scale-[0.98] transition-all"
             >
               <CheckCircle2 size={20} />
               Save Task
             </button>
           </div>
        )}
      </div>

    </div>
  );
}
