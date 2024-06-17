import React from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom'
const Footer = () => {
  return (
    <footer className="bg-gray-200 h-screen md:h-48 py-12 px-4 md:px-8">
      <div className="container mx-auto flex flex-wrap justify-between">
        <div className="w-full md:w-1/2 xl:w-1/3 mb-4 md:mb-0">
          <h5 className="uppercase text-lg mb-2">Quick Links</h5>
          <ul className="list-none mb-0">
            <li className="mb-2">
              <Link to="about" className="text-gray-600 hover:text-gray-900">
                About Us
              </Link>
            </li>
            <li className="mb-2">
              <Link to="/contact" className="text-gray-600 hover:text-gray-900">
                Contact Us
              </Link>
            </li>
            <li className="mb-2">
              <Link to="/about" className="text-gray-600 hover:text-gray-900">
                FAQ
              </Link>
            </li>
          </ul>
        </div>
        <div className="w-full md:w-1/2 xl:w-1/3 mb-4 md:mb-0">
          <h5 className="uppercase text-lg mb-2">Social Media</h5>
          <ul className="list-none mb-0 flex justify-center md:justify-start">
            <li className="mr-4">
              <a href="#" className="text-gray-600 hover:text-gray-900">
                <i className="fab fa-facebook-f" />
              </a>
            </li>
            <li className="mr-4">
              <a href="#" className="text-gray-600 hover:text-gray-900">
                <i className="fab fa-twitter" />
              </a>
            </li>
            <li className="mr-4">
              <a href="#" className="text-gray-600 hover:text-gray-900">
                <i className="fab fa-instagram" />
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                <i className="fab fa-linkedin-in" />
              </a>
            </li>
          </ul>
        </div>
        <div className="w-full md:w-1/2 xl:w-1/3 mb-4 md:mb-0">
          <h5 className="uppercase text-lg mb-2">Subscribe to our Newsletter</h5>
          <form className="flex flex-wrap">
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full md:w-3/4 xl:w-2/3 py-2 px-4 mb-2 md:mb-0"
            />
            <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">
              Subscribe
            </button>
          </form>
        </div>
      </div>
      <p className="text-center text-gray-600 text-sm">
        &copy; 2023 Real Estate Listing Project. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;