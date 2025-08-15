import React from 'react'

const Footer = () => {
  return (
    <div>
        <footer className="bg-[#f9f9f9] border-t border-gray-200 mt-16">
  <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
    {/* Left Column */}
    <div>
      <h2 className="text-xl font-bold text-[#6A38C2]">DreamJob</h2>
      <p className="text-sm text-gray-600 mt-2">
        Your No.1 platform to search, apply and land your dream job. Powered by AI & Human touch.
      </p>
    </div>

    {/* Center Column */}
    <div>
      <h3 className="text-md font-semibold mb-2 text-gray-800">Quick Links</h3>
      <ul className="space-y-1 text-sm text-gray-600">
        <li><a href="#" className="hover:text-[#6A38C2]">Browse Jobs</a></li>
        <li><a href="#" className="hover:text-[#6A38C2]">Post a Job</a></li>
        <li><a href="#" className="hover:text-[#6A38C2]">About Us</a></li>
        <li><a href="#" className="hover:text-[#6A38C2]">Contact</a></li>
      </ul>
    </div>

    {/* Right Column */}
    <div>
      <h3 className="text-md font-semibold mb-2 text-gray-800">Newsletter</h3>
      <p className="text-sm text-gray-600 mb-3">Stay updated with the latest job postings.</p>
      <form className="flex">
        <input
          type="email"
          placeholder="Enter your email"
          className="rounded-l-md px-3 py-2 border border-gray-300 text-sm w-full focus:outline-none"
        />
        <button
          type="submit"
          className="bg-[#6A38C2] text-white px-4 py-2 rounded-r-md text-sm hover:bg-[#532ca4]"
        >
          Subscribe
        </button>
      </form>
    </div>
  </div>

  <div className="text-center text-sm text-gray-500 py-4 border-t border-gray-200">
    © {new Date().getFullYear()} DreamJob. All rights reserved.
  </div>
</footer>

    </div>
  )
}

export default Footer