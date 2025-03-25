import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Titan Web</h2>
          <p className="text-gray-400">
            Elevating digital experiences with cutting-edge solutions.
          </p>
        </div>
        
        
        <div>
          <h3 className="text-lg font-medium mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="#" className="text-gray-400 hover:text-white">Home</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">About</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">Services</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
          </ul>
        </div>
        
        
        <div>
          <h3 className="text-lg font-medium mb-3">Follow Us</h3>
          <div className="flex justify-center md:justify-start space-x-4">
            <a href="#" className="text-gray-400 hover:text-white text-2xl"><FaFacebook /></a>
            <a href="#" className="text-gray-400 hover:text-white text-2xl"><FaTwitter /></a>
            <a href="#" className="text-gray-400 hover:text-white text-2xl"><FaInstagram /></a>
            <a href="#" className="text-gray-400 hover:text-white text-2xl"><FaLinkedin /></a>
          </div>
        </div>
      </div>
      
      
      <div className="text-center text-gray-500 mt-6 border-t border-gray-700 pt-4">
        <p>&copy; {new Date().getFullYear()} Titan Web. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
