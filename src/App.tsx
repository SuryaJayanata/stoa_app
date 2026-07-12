import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Auth/Login';
import SignUp from './pages/Auth/SignUp';
import ForgotPassword from './pages/Auth/ForgotPassword';
import Splash from './pages/Splash';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import HyperFocus from './pages/HyperFocus';

function App() {
  return (
    <Router>
      <div className="flex items-center justify-center h-screen w-full bg-[#111111] overflow-hidden">
        {/* Mobile Container Simulator */}
        <div 
          className="relative overflow-hidden bg-[#16180a] shadow-2xl rounded-[36px] border-[8px] border-[#333333] scale-[0.80] md:scale-[0.85] transform-gpu origin-center"
          style={{ width: '375px', height: '812px' }}
        >
          {/* Status Bar Mock (optional) */}
          <div className="absolute top-0 w-full h-10 flex justify-between items-center px-6 text-white text-xs z-50">
            <span>9:41</span>
            <div className="flex gap-2 items-center">
              <div className="w-4 h-4 rounded-full border border-white flex justify-center items-center">
                <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
              </div>
              <div className="w-5 h-2.5 rounded-sm border border-white p-[1px]">
                <div className="w-3/4 h-full bg-white rounded-sm"></div>
              </div>
            </div>
          </div>
          
          {/* iPhone Notch Mock */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-32 h-7 bg-black rounded-full z-50"></div>

          {/* App Content */}
          <div className="w-full h-full pt-14 overflow-y-auto relative scrollbar-hide">
            <Routes>
              <Route path="/splash" element={<Splash />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/onboarding" element={<Onboarding />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/focus" element={<HyperFocus />} />
              <Route path="/" element={<Navigate to="/splash" replace />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
