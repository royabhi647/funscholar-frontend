import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Login attempted with:', { identifier, password });

    const payload = { identifier, password };

    const reqOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    };

    try {
      const req = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/local`, reqOptions);
      const res = await req.json();

      if (res.error) {
        setMessage(res.error.message);
        return;
      }

      if (res.jwt && res.user) {
        localStorage.setItem('token', res.jwt);
        localStorage.setItem('loggedInUser', res.user.username);
        setMessage('Login successful!');
        setTimeout(() => navigate('/'), 1000);
      }
    } catch (error) {
      console.error('Network or server error:', error);
      setMessage('An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-sm">
        <div className="space-y-6">
          <div className="space-y-1">
            <h1 className="text-2xl font-semibold text-gray-900">Login</h1>
            <p className="text-sm text-gray-600">to get started</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label htmlFor="identifier" className="text-sm font-medium text-gray-700">
                Email or Username
              </label>
              <input
                id="identifier"
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="Enter your email or username"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="password" className="text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Login
            </button>
          </form>

          <div className="text-center text-sm">
            <span className="text-gray-600">New User? </span>
            <Link to="/signup" className="text-blue-600 hover:text-blue-500">
              Register
            </Link>
          </div>
          {message && (
            <p
              className={`text-sm mt-4 ${
                message.includes('successful') ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;