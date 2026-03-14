import React from 'react'

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-10 font-primary">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="mb-4 text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
      
      <div className="space-y-6 text-gray-800 leading-relaxed">
         <p>
          Welcome to our book store. We respect your privacy and are committed to protecting your personal data.
          This privacy policy will inform you about how we look after your personal data when you visit our website
          and tell you about your privacy rights and how the law protects you.
        </p>
        
        <section>
          <h2 className="text-xl font-semibold mb-3 text-purple-700">1. Information We Collect</h2>
          <p>
            We may collect, use, store and transfer different kinds of personal data about you, including your name, email address, shipping address, and order details when you make a purchase or register an account. We also collect usage data to improve our services.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 text-purple-700">2. How We Use Your Information</h2>
          <p>
            We use your information to process transactions, deliver books, manage your account securely, provide customer support, and to email you with important updates or promotional offers (only if you have opted in).
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 text-purple-700">3. Data Security</h2>
          <p>
            We have put in place appropriate and robust security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way, altered, or disclosed. Your payment information is encrypted and securely processed by verified third-party gateways.
          </p>
        </section>
      </div>
    </div>
  )
}

export default PrivacyPolicy
