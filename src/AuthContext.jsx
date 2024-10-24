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
  // const [userEmail,setUserEmail] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken') || '');
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refreshToken') || '');

 const logout =()=>{
  setIsAuthenticated(false)
  setAccessToken(null)
  setRefreshToken(null)
  localStorage.removeItem('accessToken')
  }
  // Save tokens to localStorage
  useEffect(() => {
    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
    } else {
      localStorage.removeItem('accessToken');
    }
    if (refreshToken) {
      localStorage.setItem('refreshToken', refreshToken);
    } else {
      localStorage.removeItem('refreshToken');
    }
  }, [accessToken, refreshToken]);

  const refreshAccessToken = async () => {
    try {
      const response = await fetch('/refresh-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
      });
      const data = await response.json();
      if (data.accessToken) {
        setAccessToken(data.accessToken);
        return data.accessToken;
      } else {
        throw new Error('Failed to refresh access token');
      }
    } catch (error) {
      console.error(error);
      // Handle logout or token expiration here
    }
  };

  useEffect(() => {
    if (refreshToken) {
      const interval = setInterval(async () => {
        await refreshAccessToken();
      }, 300000); // 5 minutes

      // Clean up the interval when the component unmounts
      return () => clearInterval(interval);
    }
  }, [refreshToken]);

  const login = async (email, password) => {
    try{
      // setUserEmail(email);
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
      alert("success!")
     
      navigate('/otp', { state: { id: data.id } }); // Redirect to OTP page
    }else{
      alert("invalid details")
    }
  }catch(e){
    console.log(e);
    alert("invalid details")
  }};

  const sendOtp = async (otp) => {
    try {
      const body = {
        "userId": user?._id,
        "otp": otp.toString(),
        "type": "EMAIL",
        "context": "TWOFA"
            }
            console.log("body iss",body)
      const response = await axios.post(`https://app.spiralreports.com/api/auth/verify-otp-login`,
        body);

      if (response.status === 200 || response.status === 201) {
        const data = response.data;
        setIsAuthenticated(true)
        setAccessToken(response.data.data.access_token)
        setRefreshToken(response.data.data.refresh_token)
        // Handle success (e.g., redirect to a specific page)
      alert("success")
        navigate('/assessment', { state: { message: data.message } });
      }
    } catch (error) {
      console.error('OTP sending failed:', error.response?.data || error.message);
      // Handle error (e.g., show error message to the user)
     alert("invalid otp")

    }
  };

  // useEffect(() => {
  //   if(accessToken != ''){
  //     setIsAuthenticated(true)
  //     setIsLoggedIn(true)
  //   }
  //   // If user is not logged in and tries to access anything other than login, redirect to login
  //   if (!isLoggedIn && window.location.pathname !== '/') {
  //     navigate('/');
  //   }

  //   // If user is logged in but OTP not verified, redirect to OTP page
  //   if (isLoggedIn && !isAuthenticated && window.location.pathname !== '/otp') {
  //     navigate('/otp');
  //   }

  //   // Prevent accessing login or OTP after full authentication
  //   if (isAuthenticated && (window.location.pathname === '/login' || window.location.pathname === '/otp')) {
  //     navigate('/assessment'); // Redirect to a protected page after full authentication
  //   }
  // }, [isLoggedIn, isAuthenticated, navigate]);

    // Check authentication state on initial load
    useEffect(() => {
      if (accessToken) {
        setIsAuthenticated(true);
        navigate('/assessment'); // Navigate to dashboard if access token is available
      } else if(!accessToken && window.location.pathname === '/otp' ) {
        console.log("otp") // Navigate to login if no access token
      }else{
        navigate('/');
      }
    }, [accessToken, navigate]);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated,accessToken,logout, login, sendOtp }}>
      {children}
    </AuthContext.Provider>
  );
};
