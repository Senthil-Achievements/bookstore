import React, { useState } from 'react';
import getBaseUrl from '../../utils/baseURL';

const Contact = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${getBaseUrl()}/api/subscribers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage('Thank you! Your email has been saved.');
        setEmail('');
      } else {
        setMessage(data.message || 'Failed to save email.');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-16 font-primary min-h-screen">
      <div className="max-w-md mx-auto bg-white shadow-lg rounded-xl p-8 border border-gray-100">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">Contact Us</h1>
        
        <div className="mb-8 text-center bg-purple-50 p-6 rounded-lg">
          <p className="text-2xl font-bold text-purple-700 mb-2">Vasanth</p>
          <p className="text-xl text-gray-700 font-semibold">+91 96294 14816</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Store Your Email With Us
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-purple-700 transition duration-300 shadow-md"
          >
            Submit
          </button>
          
          {message && (
            <p className={`mt-4 text-center text-sm font-medium ${message.includes('Thank you') ? 'text-green-600' : 'text-red-500'}`}>
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Contact;
