import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import getBaseUrl from '../utils/baseURL'
import footerLogo  from "../assets/footer-logo.png"
import { validateEmailSecurity } from '../utils/validateEmail'

import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa"

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribeMessage, setSubscribeMessage] = useState('');

  const handleSubscribe = async () => {
    if (!email) return;

    const validation = await validateEmailSecurity(email);
    if (!validation.isValid) {
      setSubscribeMessage(validation.message);
      return;
    }

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
        setSubscribeMessage('Subscribed successfully!');
        setEmail('');
      } else {
        setSubscribeMessage(data.message || 'Subscription failed.');
      }
    } catch (error) {
      setSubscribeMessage('An error occurred.');
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-10 px-4">
      {/* Top Section */}
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Left Side - Logo and Nav */}
        <div className="md:w-1/2 w-full">
          <img src={footerLogo} alt="Logo" className="mb-5 w-36" />
          <ul className="flex flex-col md:flex-row gap-4">
            <li><Link to="/" className="hover:text-primary">Home</Link></li>
            <li><Link to="/" className="hover:text-primary">Services</Link></li>
            <li><Link to="/about" className="hover:text-primary">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
          </ul>
        </div>

        {/* Right Side - Newsletter */}
        <div className="md:w-1/2 w-full">
          <p className="mb-4">
            Subscribe to our newsletter to receive the latest updates, news, and offers!
          </p>
          <div className="flex flex-col">
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-l-md text-black"
                required
              />
              <button onClick={handleSubscribe} className="bg-primary px-6 py-2 rounded-r-md hover:bg-primary-dark">
                Subscribe
              </button>
            </div>
            {subscribeMessage && (
              <p className={`mt-2 text-sm font-medium ${subscribeMessage.includes('successfully') ? 'text-green-400' : 'text-red-400'}`}>
                {subscribeMessage}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center mt-10 border-t border-gray-700 pt-6">
        {/* Left Side - Privacy Links */}
        <ul className="flex gap-6 mb-4 md:mb-0">
          <li><Link to="/privacy-policy" className="hover:text-primary">Privacy Policy</Link></li>
          <li><Link to="/terms-of-service" className="hover:text-primary">Terms of Service</Link></li>
        </ul>

        {/* Removed Social Icons */}
      </div>
    </footer>
  )
}

export default Footer