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
      <div className="flex items-center justify-center h-screen w-full bg-gray-100 overflow-hidden">
        {/* Mobile Container Simulator */}
        <div 
          className="relative overflow-hidden bg-bg-primary shadow-2xl scale-[0.80] md:scale-[0.85] transform-gpu origin-center"
          style={{ width: '375px', height: '812px' }}
        >
          {/* App Content */}
          <div className="w-full h-full overflow-y-auto relative scrollbar-hide">
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
