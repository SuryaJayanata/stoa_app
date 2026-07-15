import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Auth/Login';
import SignUp from './pages/Auth/SignUp';
import ForgotPassword from './pages/Auth/ForgotPassword';
import Splash from './pages/Splash';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import Schedule from './pages/Schedule';
import Energy from './pages/Energy';
import Profile from './pages/Profile';
import HyperFocus from './pages/HyperFocus';
import InputManual from './pages/InputManual';
import InputAI from './pages/InputAI';
import AccountSettings from './pages/AccountSettings';
import Privacy from './pages/Privacy';
import Support from './pages/Support';
import Notifications from './pages/Notifications';

function App() {
  return (
    <Router>
      <div className="flex items-center justify-center h-screen w-full bg-gray-100 overflow-hidden">
        <div 
          className="relative overflow-hidden bg-bg-primary shadow-2xl scale-[0.80] md:scale-[0.85] transform-gpu origin-center"
          style={{ width: '375px', height: '812px' }}
        >
          <div className="w-full h-full overflow-y-auto relative scrollbar-hide">
            <Routes>
              <Route path="/splash" element={<Splash />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/onboarding" element={<Onboarding />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/schedule" element={<Schedule />} />
              <Route path="/energy" element={<Energy />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/focus" element={<HyperFocus />} />
              <Route path="/input-manual" element={<InputManual />} />
              <Route path="/input-ai" element={<InputAI />} />
              <Route path="/account-settings" element={<AccountSettings />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/support" element={<Support />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/" element={<Navigate to="/splash" replace />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
