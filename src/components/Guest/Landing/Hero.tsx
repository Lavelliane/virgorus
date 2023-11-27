import React from 'react'
import { Gallery } from "@/components/Guest/Booking/Gallery";

function Hero() {
  return (
    <div aria-label="Hero" className="w-full max-w-9xl flex flex-col px-6 justify-items-center">
        <div className='w-full justify-center flex'>
            {/* for large media */}
            <div aria-label="Hero Text" className="xl:flex flex-col max-w-8xl my-4 lg:my-16 font-playfair hidden">
                <div className="text-[6rem] 2xl:text-[7rem]">
                    Discover Paradise in Every
                </div>
                <div className="flex flex-row">
                    <span className="text-[6rem] 2xl:text-[7rem]">
                    Step
                    </span>
                    <div className="px-24 self-end pb-6 text-justify text-lg">
                    Explore the vibrant culture of Cebu and the natural wonders of Bohol with our tours. From historic landmarks to the mesmerizing Chocolate Hills, our journeys promise an unforgettable blend of adventure and relaxation in the heart of the Philippines.
                    </div>
                </div>
            </div>
            {/* for all other media */}
            <div aria-label="Hero Text" className="xl:hidden my-4 lg:my-16 font-playfair text-center">
                <div className="text-3xl sm:text-5xl md:text-7xl mb-8">
                    Discover Paradise in Every Step
                </div>
                <div className="text-xs sm:text-sm md:text-lg text-justify pb-6">
                    Explore the vibrant culture of Cebu and the natural wonders of Bohol with our tours. From historic landmarks to the mesmerizing Chocolate Hills, our journeys promise an unforgettable blend of adventure and relaxation in the heart of the Philippines.
                </div>
            </div>
        </div>
        <Gallery />
    </div>
  )
}

export default Hero