import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Privacy() {
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
        <h1 className="text-[20px] font-bold tracking-tight ml-2">Privacy</h1>
      </div>
      
      <div className="px-6 flex-1 overflow-y-auto pb-8 scrollbar-hide text-[15px] text-text-secondary leading-relaxed mt-4">
        <h2 className="text-[16px] font-bold text-text-primary mb-3">Data Collection</h2>
        <p className="mb-8">
          We collect the minimal data required to run Stoa App effectively. This includes your profile information, productivity logs, and application preferences. We do not collect unnecessary background data.
        </p>

        <h2 className="text-[16px] font-bold text-text-primary mb-3">Data Usage</h2>
        <p className="mb-8">
          Your data is strictly used to provide you with personal productivity insights, such as your energy levels and task completion rates. We never sell your personal information to third parties.
        </p>

        <h2 className="text-[16px] font-bold text-text-primary mb-3">Your Rights</h2>
        <p className="mb-8">
          You have full control over your data. You can export your data or delete your account permanently at any time through the Account Settings page. When an account is deleted, all associated data is wiped from our active servers immediately.
        </p>
      </div>
    </div>
  );
}
