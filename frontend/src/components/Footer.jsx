import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import getBaseUrl from '../utils/baseURL'
import footerLogo  from "../assets/footer-logo.png"
import { validateEmailSecurity } from '../utils/validateEmail'

import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa"

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribeMessage, setSubscribeMessage] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    setSubscribeMessage('');

    const validation = await validateEmailSecurity(email);
    if (!validation.isValid) {
      setSubscribeMessage(validation.message);
      setIsSubmitting(false);
      return;
    }

    // If valid, submit the form programmatically to FormSubmit
    e.target.submit();
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
        <div id="footer-subscribe" className="md:w-1/2 w-full">
          <p className="mb-4">
            Subscribe to our newsletter to receive the latest updates, news, and offers!
          </p>
          <form onSubmit={handleSubmit} action="https://formsubmit.co/lvasanth2005@gmail.com" method="POST" className="flex flex-col">
            <div className="flex">
              {/* Optional: Configuration for FormSubmit */}
              <input type="hidden" name="_subject" value="New Subscriber Alert!" />
              <input type="hidden" name="_captcha" value="false" />
              
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-l-md text-black"
                required
              />
              <button disabled={isSubmitting} type="submit" className="bg-primary px-6 py-2 rounded-r-md hover:bg-primary-dark disabled:opacity-50">
                {isSubmitting ? 'Checking...' : 'Subscribe'}
              </button>
            </div>
            {subscribeMessage && <p className="mt-2 text-sm text-red-500">{subscribeMessage}</p>}
          </form>
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