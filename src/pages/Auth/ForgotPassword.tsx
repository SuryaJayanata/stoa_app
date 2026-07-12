import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight, Mail } from 'lucide-react';

export default function ForgotPassword() {
  const navigate = useNavigate();

  return (
    <div className="h-full flex flex-col bg-[#16180a] text-white overflow-hidden relative">
      
      {/* Top Header with Logo */}
      <div className="pt-12 px-8 pb-4 flex items-center gap-3">
        <img src="/stoa.svg" alt="Stoa Logo" className="w-8 h-8" />
        <span className="font-bold text-xl tracking-wide">Stoa</span>
      </div>

      <div className="flex-1 px-8 pt-8 flex flex-col justify-center pb-12">
        <div className="mb-10">
          <h1 className="text-[32px] font-medium leading-[1.1] tracking-tight mb-2">Reset<br/>Password</h1>
          <p className="text-white/60 text-sm">Enter your email to receive a reset link</p>
        </div>

        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); navigate('/login'); }}>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <Mail size={20} className="text-white/40" />
            </div>
            <input 
              type="email" 
              placeholder="Email address" 
              className="w-full bg-[#1e2014] border border-[#2a2d1d] rounded-full h-[60px] pl-14 pr-6 text-sm text-white focus:outline-none focus:border-primary-accent/50 transition-colors placeholder:text-white/30"
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-primary-accent text-black h-[60px] rounded-full flex items-center justify-between px-2 font-semibold transition-transform hover:scale-105 active:scale-95 mt-8"
          >
            <span className="ml-6">Send Link</span>
            <div className="w-11 h-11 bg-white rounded-full flex justify-center items-center shadow-sm">
              <ArrowRight size={20} />
            </div>
          </button>
        </form>
      </div>

      <div className="text-center pb-8 text-sm text-white/50">
        Remember your password? <Link to="/login" className="text-white font-medium hover:underline">Log in</Link>
      </div>
    </div>
  );
}
