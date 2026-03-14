import React from 'react'
import aboutImg from '../../assets/banner.png'

const About = () => {
  return (
    <div className="container mx-auto px-4 py-16 font-primary min-h-screen">
      <div className="flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="md:w-1/2">
          <h1 className="text-4xl font-bold mb-6 text-gray-800">About Our Book Store</h1>
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            Welcome to your ultimate destination for books! Whether you are looking for the latest bestseller, a timeless classic, or an obscure academic text, we are dedicated to providing you with the best reading materials from around the globe.
          </p>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            Our mission is to foster a love for reading by making books accessible and affordable to everyone. Our carefully curated collections and personalized recommendations ensure that every reader finds their perfect match. Thank you for choosing us as your literary companion!
          </p>
          <div className="flex gap-4">
             <div className="bg-purple-100 p-4 rounded-lg text-center flex-1 text-purple-800 font-semibold shadow-sm">
                10K+ Books
             </div>
             <div className="bg-purple-100 p-4 rounded-lg text-center flex-1 text-purple-800 font-semibold shadow-sm">
                50+ Genres
             </div>
             <div className="bg-purple-100 p-4 rounded-lg text-center flex-1 text-purple-800 font-semibold shadow-sm">
                Fast Delivery
             </div>
          </div>
        </div>
        <div className="md:w-1/2 w-full mt-10 md:mt-0 shadow-lg rounded-xl overflow-hidden">
          <img src={aboutImg} alt="About Us" className="w-full h-auto object-cover"/>
        </div>
      </div>
    </div>
  )
}

export default About
