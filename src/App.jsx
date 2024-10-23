
import { AuthProvider } from './AuthContext';
import Login from './Login';
import OtpVerification from './OtpVerification'; // Create an OtpVerification component
import './index.css'
import './App.css'
import MyAssessment from './components/Myassessments'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
function App() {
  return (
      <Router>
    <AuthProvider>

      
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/otp" element={<OtpVerification />} />
              <Route path="/assessment" element={<MyAssessment/>} />
            </Routes>
      
    </AuthProvider>

      </Router>
  );
}

export default App;