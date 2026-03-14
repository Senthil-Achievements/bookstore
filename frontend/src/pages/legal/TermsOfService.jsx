import React from 'react'

const TermsOfService = () => {
  return (
    <div className="container mx-auto px-4 py-10 font-primary">
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
      <p className="mb-4 text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
      
      <div className="space-y-6 text-gray-800 leading-relaxed">
        <p>
          These Terms of Service govern your use of our book store website and services. By accessing or using our website, you agree to be bound by these Terms. If you disagree with any part of these terms, please do not use our website.
        </p>
        
        <section>
          <h2 className="text-xl font-semibold mb-3 text-purple-700">1. Use of the Site</h2>
          <p>
            You agree to use the website only for lawful purposes and in a way that does not infringe the rights of others. You must not use our website in any way that causes, or may cause, damage to the website or impairment of the availability or accessibility of the website.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 text-purple-700">2. Orders and Pricing</h2>
          <p>
            All orders are subject to product availability and confirmation of the order price. We reserve the right to refuse any orders you place with us. Prices for books are subject to change without notice. We shall not be liable to you or to any third-party for any modification, price change, suspension or discontinuance of the Service.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3 text-purple-700">3. Returns and Refunds</h2>
          <p>
            If you are not entirely satisfied with your purchase, please contact our support team within 14 days of receiving your books to request a return or an exchange. Books must be returned in their original condition.
          </p>
        </section>
      </div>
    </div>
  )
}

export default TermsOfService
