import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  
  const handleNavigation = (route, name) => {
    if (name === "Logout") {
      localStorage.removeItem("userId"); 
      localStorage.removeItem("cart");
    }
    navigate(route); 
  };

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchQuery.trim() !== "") {
      navigate(`/search?q=${searchQuery.trim()}`);
    }
  };

  const navItems = [
    { name: "Logout", route: "/register", icon: "👤" },
    { name: "Wishlist", route: "/wishlist", icon: "❤️" },
    { name: "Cart", route: "/cart", icon: "🛒" },
    { name: "Track Order", route: "/track-order", icon: "📦" }
  ];

  return (
    <div className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="bg-black text-white text-center py-2 text-sm">
        Use Code <span className="font-bold">NEW10</span> and get 10% OFF* on non-discounted Watches over Rs. 2499.
      </div>
            
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200">
        <div className="flex items-center">
          {/* Titan logo with navigation */}
          <div 
            className="text-2xl font-bold mr-6 cursor-pointer"
            onClick={() => navigate('/home')}
          >
            ⟙⟙ TITAN
          </div>
          
          <div className="relative hidden md:block">
            <input
              type="text"
              className="pl-8 pr-4 py-2 border border-gray-300 rounded-md w-96"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch} 
            />
            <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400">
              🔍
            </span>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          {navItems.map((item, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center text-sm cursor-pointer hover:text-blue-600 transition-colors"
              onClick={() => handleNavigation(item.route, item.name)}
            >
              {item.icon}
              <span>{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
