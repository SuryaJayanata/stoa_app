import { ChevronLeft, Mail, MessageCircle, HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Support() {
  const navigate = useNavigate();

  return (
    <div className="h-full flex flex-col bg-bg-primary text-text-primary">
      <div className="flex items-center px-6 py-4 pt-6 mb-2">
        <button 
          onClick={() => navigate(-1)} 
          className="text-text-primary hover:bg-surface-hover transition-colors rounded-full p-2 -ml-2"
        >
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-[20px] font-bold tracking-tight ml-2">Support</h1>
      </div>
      
      <div className="px-6 flex-1 overflow-y-auto pb-8 scrollbar-hide mt-4">
        <p className="text-[15px] text-text-secondary mb-8">
          How can we help you today? Choose one of the options below to get in touch with our team.
        </p>
        
        <div className="space-y-4">
          <button className="w-full flex items-center gap-4 p-4 rounded-[20px] bg-surface hover:bg-surface-hover transition-colors border border-border-color/50 shadow-sm group">
            <div className="w-10 h-10 rounded-full bg-text-primary flex items-center justify-center text-bg-primary">
              <HelpCircle size={18} strokeWidth={2} />
            </div>
            <div className="flex-1 text-left">
              <div className="text-[16px] font-bold text-text-primary">Help Center</div>
              <div className="text-[13px] text-text-secondary mt-0.5">Read our FAQs and guides</div>
            </div>
          </button>

          <button className="w-full flex items-center gap-4 p-4 rounded-[20px] bg-surface hover:bg-surface-hover transition-colors border border-border-color/50 shadow-sm group">
            <div className="w-10 h-10 rounded-full bg-text-primary flex items-center justify-center text-bg-primary">
              <MessageCircle size={18} strokeWidth={2} />
            </div>
            <div className="flex-1 text-left">
              <div className="text-[16px] font-bold text-text-primary">Live Chat</div>
              <div className="text-[13px] text-text-secondary mt-0.5">Typically replies in 5 minutes</div>
            </div>
          </button>

          <button className="w-full flex items-center gap-4 p-4 rounded-[20px] bg-surface hover:bg-surface-hover transition-colors border border-border-color/50 shadow-sm group">
            <div className="w-10 h-10 rounded-full bg-text-primary flex items-center justify-center text-bg-primary">
              <Mail size={18} strokeWidth={2} />
            </div>
            <div className="flex-1 text-left">
              <div className="text-[16px] font-bold text-text-primary">Email Support</div>
              <div className="text-[13px] text-text-secondary mt-0.5">Typically replies in 24 hours</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
