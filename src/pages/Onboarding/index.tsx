import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Calendar, Sun, Sunset, Moon, ShieldCheck, Check, Sparkles } from 'lucide-react';

export default function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedEnergy, setSelectedEnergy] = useState<string | null>(null);
  const [isAgreed, setIsAgreed] = useState(true);

  useEffect(() => {
    if (step === 4) {
      const timer = setTimeout(() => {
        navigate('/dashboard');
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [step, navigate]);

  const nextStep = () => {
    if (step < 4) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
    else navigate(-1);
  };

  return (
    <div className="h-full flex flex-col bg-[#16180a] text-white overflow-hidden relative">
      
      {/* Top Header with Back Button & Progress (Hidden on Step 4) */}
      {step < 4 && (
        <div className="pt-12 px-8 pb-4 flex items-center justify-between z-10">
          <button 
            onClick={prevStep} 
            className="flex items-center justify-center -ml-2 p-2 hover:bg-white/5 rounded-full transition-colors"
          >
            <ArrowLeft size={24} className="text-white" />
          </button>
          
          <div className="flex gap-1.5">
            {[1, 2, 3].map((i) => (
              <div 
                key={i} 
                className={`h-1.5 rounded-full transition-all duration-500 ${i <= step ? 'w-6 bg-primary-accent' : 'w-2 bg-[#2a2d1d]'}`}
              />
            ))}
          </div>
        </div>
      )}

      <div className={`flex-1 px-8 flex flex-col pb-12 overflow-y-auto scrollbar-hide ${step === 4 ? 'pt-12' : 'pt-4'}`}>
        
        {/* Step 1: Calendar Sync */}
        {step === 1 && (
          <div className="flex flex-col h-full animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="flex-1 flex flex-col justify-center">
              <div className="w-16 h-16 bg-primary-accent rounded-2xl flex justify-center items-center mb-8 text-black shadow-[0_4px_20px_rgba(190,238,2,0.3)]">
                <Calendar size={32} />
              </div>
              <h1 className="text-[32px] font-medium leading-[1.1] tracking-tight mb-4">Sync Your<br/>Calendar</h1>
              <p className="text-white/60 text-sm leading-relaxed mb-10">
                Stoa needs to know your current schedule. We use this to find the perfect gaps for deep work without causing burnout. <strong className="text-white">Required for AI scheduling.</strong>
              </p>

              <div className="space-y-4">
                <button 
                  onClick={nextStep}
                  className="w-full bg-[#1e2014] border border-[#2a2d1d] h-[68px] rounded-2xl flex items-center px-4 hover:border-primary-accent/50 transition-colors group"
                >
                  <div className="w-10 h-10 bg-white rounded-full flex justify-center items-center mr-4 group-hover:scale-110 transition-transform">
                    <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
                  </div>
                  <span className="font-semibold text-sm">Connect Google Calendar</span>
                </button>
                <button 
                  onClick={nextStep}
                  className="w-full bg-[#1e2014] border border-[#2a2d1d] h-[68px] rounded-2xl flex items-center px-4 hover:border-primary-accent/50 transition-colors group"
                >
                  <div className="w-10 h-10 bg-[#0078D4] rounded-full flex justify-center items-center mr-4 text-white group-hover:scale-110 transition-transform">
                    <Calendar size={18} />
                  </div>
                  <span className="font-semibold text-sm">Connect Outlook</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Energy Profile */}
        {step === 2 && (
          <div className="flex flex-col h-full animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="flex-1 flex flex-col justify-center">
              <h1 className="text-[32px] font-medium leading-[1.1] tracking-tight mb-4">Energy<br/>Profile</h1>
              <p className="text-white/60 text-sm leading-relaxed mb-10">
                When do you usually feel most focused and energized? AI will prioritize this time for heavy tasks.
              </p>

              <div className="space-y-4">
                {[
                  { id: 'pagi', label: 'Morning', time: '06:00 - 12:00', icon: Sun },
                  { id: 'siang', label: 'Afternoon', time: '12:00 - 18:00', icon: Sunset },
                  { id: 'malam', label: 'Evening', time: '18:00 - 00:00', icon: Moon }
                ].map((item) => {
                  const Icon = item.icon;
                  const isSelected = selectedEnergy === item.id;
                  return (
                    <button 
                      key={item.id}
                      onClick={() => setSelectedEnergy(item.id)}
                      className={`w-full h-[76px] rounded-2xl flex items-center px-5 transition-all duration-300 border ${
                        isSelected ? 'bg-primary-accent border-primary-accent text-black shadow-[0_4px_20px_rgba(190,238,2,0.2)]' : 'bg-[#1e2014] border-[#2a2d1d] text-white/80 hover:border-white/20'
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-full flex justify-center items-center mr-4 transition-colors ${isSelected ? 'bg-black/10' : 'bg-[#16180a]'}`}>
                        <Icon size={20} className={isSelected ? 'text-black' : 'text-white/50'} />
                      </div>
                      <div className="flex flex-col items-start text-left">
                        <span className={`font-semibold text-sm ${isSelected ? 'text-black' : 'text-white'}`}>{item.label}</span>
                        <span className={`text-xs ${isSelected ? 'text-black/60' : 'text-white/40'}`}>{item.time}</span>
                      </div>
                      {isSelected && <Check className="ml-auto text-black" size={24} />}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-6">
              <button 
                onClick={nextStep}
                disabled={!selectedEnergy}
                className={`w-full h-[60px] rounded-full flex items-center justify-between px-2 font-semibold transition-all duration-300 ${
                  selectedEnergy ? 'bg-primary-accent text-black hover:scale-105 active:scale-95 shadow-[0_4px_20px_rgba(190,238,2,0.2)]' : 'bg-[#1e2014] text-white/30 cursor-not-allowed'
                }`}
              >
                <span className="ml-6">Continue</span>
                <div className={`w-11 h-11 rounded-full flex justify-center items-center shadow-sm transition-colors ${selectedEnergy ? 'bg-white' : 'bg-[#2a2d1d]'}`}>
                  <ArrowRight size={20} className={selectedEnergy ? 'text-black' : 'text-white/30'} />
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Commitment */}
        {step === 3 && (
          <div className="flex flex-col h-full animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="flex-1 flex flex-col justify-center">
              <div className="w-16 h-16 bg-primary-accent rounded-2xl flex justify-center items-center mb-8 text-black shadow-[0_4px_20px_rgba(190,238,2,0.3)]">
                <ShieldCheck size={32} />
              </div>
              <h1 className="text-[32px] font-medium leading-[1.1] tracking-tight mb-6">AI<br/>Commitment</h1>
              
              <div className="space-y-6 text-white/70">
                <p className="text-base leading-relaxed font-medium text-white/90">
                  Allow Stoa to analyze your calendar and automatically block deep focus time.
                </p>
                
                <button 
                  onClick={() => setIsAgreed(!isAgreed)}
                  className="flex gap-4 items-start text-left group w-full"
                >
                  <div className={`mt-0.5 shrink-0 w-6 h-6 rounded-md flex justify-center items-center transition-colors border ${isAgreed ? 'bg-primary-accent border-primary-accent' : 'bg-[#1e2014] border-[#2a2d1d] group-hover:border-white/30'}`}>
                    {isAgreed && <Check size={16} className="text-black" strokeWidth={3} />}
                  </div>
                  <span className={`text-sm leading-relaxed transition-colors ${isAgreed ? 'text-white' : 'text-white/50'}`}>
                    I agree to let AI auto-reschedule low priority tasks and protect my peak energy hours.
                  </span>
                </button>

                {!isAgreed && (
                  <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 animate-in fade-in slide-in-from-top-2">
                    <p className="text-red-400 text-xs font-medium">
                      * You must agree to continue. Stoa requires these permissions to prevent burnout effectively.
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-8">
              <button 
                onClick={nextStep}
                disabled={!isAgreed}
                className={`w-full h-[60px] rounded-full flex items-center justify-between px-2 font-semibold transition-all duration-300 ${
                  isAgreed ? 'bg-primary-accent text-black hover:scale-105 active:scale-95 shadow-[0_4px_20px_rgba(190,238,2,0.2)]' : 'bg-[#1e2014] text-white/30 cursor-not-allowed'
                }`}
              >
                <span className="ml-6">I Agree</span>
                <div className={`w-11 h-11 rounded-full flex justify-center items-center shadow-sm transition-colors ${isAgreed ? 'bg-white' : 'bg-[#2a2d1d]'}`}>
                  <ArrowRight size={20} className={isAgreed ? 'text-black' : 'text-white/30'} />
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Success */}
        {step === 4 && (
          <div className="flex flex-col h-full animate-in fade-in zoom-in-95 duration-500 justify-center items-center text-center">
            <div className="w-24 h-24 bg-primary-accent rounded-full flex justify-center items-center mb-8 text-black shadow-[0_0_40px_rgba(190,238,2,0.4)]">
              <Sparkles size={40} />
            </div>
            
            <h1 className="text-[32px] font-medium leading-[1.1] tracking-tight mb-4">You're All Set!</h1>
            <p className="text-white/60 text-sm leading-relaxed mb-8">
              Your AI focus engine is now configured and ready to protect your energy.
            </p>

            <div className="flex items-center gap-3 text-primary-accent text-sm font-semibold animate-pulse mt-12 bg-primary-accent/10 px-6 py-3 rounded-full">
              <div className="w-4 h-4 border-2 border-primary-accent border-t-transparent rounded-full animate-spin"></div>
              Entering Dashboard...
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
