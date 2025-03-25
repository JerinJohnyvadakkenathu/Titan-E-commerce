import React from 'react'

function Threeoffers() {
  return (
    
      <div className="max-w-[1500px] mx-auto">
      <div className="w-full">
        <img 
          src="/images/imglength.webp" 
          alt="Limited Edition Banner" 
          className="w-full object-cover"
        />
      </div>

      <div className="flex flex-col md:flex-row gap-4 mt-6">
        <div className="relative w-full md:w-1/2">
          <img 
            src="/images/belowlength1.webp" 
            alt="Classic Trends" 
            className="w-full object-cover rounded-lg"
          />
          <div className="absolute bottom-5 left-5 text-white">
            
            <p className="italic text-lg">TRENDS for you</p>
            
          </div>
        </div>

        <div className="relative w-full md:w-1/2">
          <img 
            src="/images/belowlength2.webp" 
            alt="Chic Trends" 
            className="w-full object-cover rounded-lg"
          />
          <div className="absolute bottom-5 left-5 text-white">
            
            <p className="italic text-lg">TRENDS for you</p>
            
          </div>
        </div>
      </div>
    </div>
    
  )
}

export default Threeoffers

