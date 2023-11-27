import React from 'react';
import Image from 'next/image';
import landingImage from '../../../../public/assets/images/landing-image2.jpg';

function Hero() {
	return (
		<div aria-label='Hero' className='max-w-6xl flex flex-col justify-center items-start h-fit'>
			<div className='w-full justify-center flex'>
				<div aria-label='Hero Text' className='text-justify font-playfair translate-y-10'>
					<div className='text-[6rem]'>Discover Paradise in Every Step</div>
					<div className='text-justify text-lg -translate-y-28 pl-56'>
						Explore the vibrant culture of Cebu and the natural wonders of Bohol with our tours. From historic landmarks
						to the mesmerizing Chocolate Hills, our journeys promise an unforgettable blend of adventure and relaxation
						in the heart of the Philippines.
					</div>
				</div>
			</div>
			<div>
				<Image src={landingImage} alt='island photo' layout='cover' />
			</div>
		</div>
	);
}

export default Hero;
