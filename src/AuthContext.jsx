import  { createContext, useState ,useEffect  } from 'react';
import axios from 'axios';
export const AuthContext = createContext();
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const [otp, setOtp] = useState('');
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); 
  const [userEmail,setUserEmail] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = async (email, password) => {
    try{
      setUserEmail(email);
   const response =  await axios.post('https://app.spiralreports.com/api/auth/user/login',{
      "username": email,//"user.spiralreport@gmail.com",
      "password": password //"string"
    })
    console.log('login isss',response.data.data)
    // Simulate a login action
    // setIsAuthenticated(true);
    if (response.status === 200 || response.status === 201 ) {
      const data = response.data.data;
      setUser(data); // Save user info
      setIsLoggedIn(true); 
      navigate('/otp', { state: { id: data.id } }); // Redirect to OTP page
    }
  }catch(e){
    console.log(e);
  }};

  const sendOtp = async (otp) => {
    try {
      const body = {
        "userId": user?._id,
        "otp": otp,
        "type": userEmail,
        "context": "TWOFA"
            }
            console.log("body iss",body)
      const response = await axios.post(`https://app.spiralreports.com/api/auth/verify-otp-login`,
        body);

      if (response.status === 200) {
        const data = response.data;
        setIsAuthenticated(true)
        // Handle success (e.g., redirect to a specific page)
        navigate('/success', { state: { message: data.message } });
      }
    } catch (error) {
      console.error('OTP sending failed:', error.response?.data || error.message);
      // Handle error (e.g., show error message to the user)
    }
  };

  useEffect(() => {
    // If user is not logged in and tries to access anything other than login, redirect to login
    if (!isLoggedIn && window.location.pathname !== '/') {
      navigate('/');
    }

    // If user is logged in but OTP not verified, redirect to OTP page
    if (isLoggedIn && !isAuthenticated && window.location.pathname !== '/otp') {
      navigate('/otp');
    }

    // Prevent accessing login or OTP after full authentication
    if (isAuthenticated && (window.location.pathname === '/login' || window.location.pathname === '/otp')) {
      navigate('/dashboard'); // Redirect to a protected page after full authentication
    }
  }, [isLoggedIn, isAuthenticated, navigate]);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, sendOtp }}>
      {children}
    </AuthContext.Provider>
  );
};
