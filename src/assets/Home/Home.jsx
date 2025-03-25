import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import ImageSlider from './Imageslide';
import Threeoffers from './Threeoffers';
import Footer from './Footer';

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
  
    if (!storedUser) {
      navigate('/login'); 
    }
  }, [navigate]);

  return (
    <div className="mt-[80px]">
      <Navbar />
      <div className="bg-white shadow-sm py-2 flex justify-center items-center border-b border-gray-200">
        <button
          onClick={() => navigate('/products')}
          className="text-sm font-medium px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Explore
        </button>
      </div>
      
      <div className="mt-[80px]">
        <ImageSlider />
      </div>
      <div className="mt-10">
        <Threeoffers />
      </div>
      <Footer/>
    </div>
  );
}

export default Home;
