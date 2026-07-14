import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function AccountSettings() {
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <div className="h-full flex flex-col bg-bg-primary text-text-primary">
      <div className="flex items-center justify-between px-6 py-4 pt-6 mb-2">
        <div className="flex items-center">
          <button 
            onClick={() => navigate(-1)} 
            className="text-text-primary hover:bg-surface-hover transition-colors rounded-full p-2 -ml-2"
          >
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-[20px] font-bold tracking-tight ml-2">Account Settings</h1>
        </div>
        <button className="text-[15px] font-bold text-primary-accent hover:opacity-70 transition-opacity">
          Save
        </button>
      </div>
      
      <div className="px-6 flex-1 overflow-y-auto pb-8 scrollbar-hide">
        <div className="flex flex-col items-center mb-10 mt-4">
          <img 
            src="https://media.gq.com/photos/558357fc3655c24c6c963b19/master/w_1600%2Cc_limit/style-blogs-the-gq-eye-davidbowie635.jpg"
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover mb-4 shadow-sm"
          />
          <button className="text-[14px] text-text-secondary font-medium hover:text-text-primary transition-colors">
            Change Photo
          </button>
        </div>

        <div className="mb-10">
          <h3 className="text-[12px] font-bold text-text-secondary uppercase tracking-widest mb-6">Personal Info</h3>
          <div className="space-y-6">
            <div className="flex justify-between items-center border-b border-border-color/30 pb-4">
              <span className="text-[16px] font-medium text-text-primary">Name</span>
              <span className="text-[15px] text-text-secondary font-medium">David Bowie</span>
            </div>
            <div className="flex justify-between items-center border-b border-border-color/30 pb-4">
              <span className="text-[16px] font-medium text-text-primary">Email</span>
              <span className="text-[15px] text-text-secondary font-medium">david.bowie@email.com</span>
            </div>
            <div className="flex justify-between items-center border-b border-border-color/30 pb-4">
              <span className="text-[16px] font-medium text-text-primary">Phone</span>
              <span className="text-[15px] text-text-secondary font-medium">+1 234 567 890</span>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-[12px] font-bold text-text-secondary uppercase tracking-widest mb-6">Security</h3>
          <div className="space-y-6">
            <button className="w-full flex justify-between items-center border-b border-border-color/30 pb-4 group">
              <span className="text-[16px] font-medium text-text-primary">Change Password</span>
              <span className="text-[14px] text-text-secondary group-hover:text-text-primary transition-colors">Last changed 3m ago</span>
            </button>
            <button className="w-full flex justify-between items-center border-b border-border-color/30 pb-4 group">
              <span className="text-[16px] font-medium text-text-primary">Two-Factor Authentication</span>
              <span className="text-[14px] text-text-secondary group-hover:text-text-primary transition-colors">Enabled</span>
            </button>
            <button 
              onClick={() => setShowDeleteModal(true)}
              className="w-full flex justify-between items-center pt-2 group"
            >
              <span className="text-[16px] font-bold text-red-500 group-hover:text-red-600 transition-colors">Delete Account</span>
            </button>
          </div>
        </div>
      </div>

      {showDeleteModal && (
        <>
          <div 
            className="fixed inset-0 bg-black/60 z-40 animate-in fade-in duration-200"
            onClick={() => setShowDeleteModal(false)}
          />
          <div className="fixed bottom-0 left-0 right-0 bg-surface rounded-t-[32px] p-6 pt-8 z-50 animate-in slide-in-from-bottom duration-300 shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
            <h2 className="text-[22px] font-bold text-text-primary mb-2 text-center">Delete Account?</h2>
            <p className="text-[14px] text-text-secondary text-center mb-8 px-4 leading-relaxed">
              This action cannot be undone. All your tasks, productivity data, and preferences will be permanently wiped.
            </p>
            <div className="space-y-3">
              <button 
                onClick={() => {
                  setShowDeleteModal(false);
                  navigate('/login');
                }}
                className="w-full bg-red-500/10 text-red-500 border border-red-500/20 rounded-[20px] py-4 font-bold text-[16px] hover:bg-red-500 hover:text-white transition-all shadow-sm"
              >
                Yes, Delete My Account
              </button>
              <button 
                onClick={() => setShowDeleteModal(false)}
                className="w-full bg-surface-hover text-text-primary rounded-[20px] py-4 font-bold text-[16px] hover:bg-border-color transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
