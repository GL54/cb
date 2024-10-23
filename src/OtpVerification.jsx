import { useState, useContext } from 'react';
import { AuthContext } from './AuthContext';

const OtpVerification = () => {
  const { sendOtp } = useContext(AuthContext);
  const [inputOtp, setInputOtp] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    sendOtp(inputOtp);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold text-center">Verify OTP</h2>
      <div>
        <label htmlFor="otp" className="block text-sm font-medium text-gray-700">Enter OTP</label>
        <input
          type="text"
          id="otp"
          value={inputOtp}
          onChange={(e) => setInputOtp(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
        />
      </div>
      <button
        type="submit"
        className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-500"
      >
        Verify OTP
      </button>
    </form>
  );
};

export default OtpVerification;
