import React, { useState } from 'react';
import { Lock, Mail } from 'lucide-react';
import opticalogo from '../../assets/jiitosachapter_logo.jpeg.jpg';
import opticabanner from '../../assets/image.png';
import { toast } from 'react-hot-toast';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
    
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fill in all fields correctly!');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:3000/auth/v1/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      toast.success('Login successful!');
     
    } catch (err) {
      toast.error(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-4xl">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-12">Admin Portal</h2>
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between space-y-8 md:space-y-0 md:space-x-8">
          {/* Logo Section */}
          <div className="flex flex-col items-center md:w-1/2">
            <div className="w-20 h-20">
              <img
                src={opticalogo}
                alt="Optica Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="w-full h-full">
              <img
                src={opticabanner}
                alt="Optica Logo"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Login Form */}
          <div className="bg-indigo-50 rounded-xl p-8 w-full md:w-1/2 shadow-md">
            <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">Log In</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-3 flex items-center">
                    <Mail color="black" className="h-5 w-5 text-indigo-500" />
                  </div>
                  <input
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  />
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-3 flex items-center">
                    <Lock color="black" className="h-5 w-5 text-indigo-500" />
                  </div>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition duration-200 disabled:bg-indigo-400 disabled:cursor-not-allowed"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
