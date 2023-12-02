import React, { useEffect, useState } from 'react';
import { Catalog } from '@/components/Guest/Catalog';
import { useQuery } from '@tanstack/react-query';
import { fetchPackages } from '@/queries/fetchPackages';
import { CatalogPackage } from '@/types/package';
import { CatalogCardSuspense } from '@/components/Guest/CatalogCardSuspense';
import landingImage from '../../../../public/assets/images/landing-image.jpg';
import Image from 'next/image';
import PhotoAlbum from 'react-photo-album';
import NextJsImage from '@/components/NextJsImage';
import { photo } from '../../../../public/assets/images/sample-gallery';
import { Button, Link, Spacer } from '@nextui-org/react';

function About() {
	const [packages, setPackages] = useState<CatalogPackage[]>([]);
	const { data: packagesData, isLoading: packagesLoading } = useQuery({
		queryKey: ['packages'],
		queryFn: fetchPackages,
	});

	useEffect(() => {
		if (!packagesLoading && packagesData) {
			setPackages(
				packagesData.map((pd: any) => ({
					id: pd.id,
					name: pd.name,
					description: pd.description,
					type: pd.type,
					rate: pd.rates[0].ratePerPax,
					photos: pd.photos,
				}))
			);
		}
	}, [packagesLoading, packagesData]);
	return (
		<div aria-label='About Us' className='flex flex-col h-fit w-full justify-start text-white relative'>
			{/* About */}
			<div className=' bg-primary absolute w-full h-[120vh] -z-0'></div>
			<div className='flex flex-col font-poppins w-full z-10 xl:px-0 md:px-16 px-4'>
				<div className='flex flex-col justify-start pt-10 max-w-6xl mx-auto'>
					<h1 className='font-playfair lg:text-6xl md:text-4xl text-2xl'>Virgorus Organizes Everything</h1>
					<div className='flex md:flex-row flex-col-reverse justify-evenly md:py-20 pt-10 gap-4'>
						<div className='flex flex-col md:justify-between md:items-start items-end xl:w-3/5 w-full mr-auto xl:h-[300px] min-h-[200px] gap-4'>
							<p className='md:text-lg text-sm font-extralight lg:text-left text-justify'>
								Our tours go beyond exploration—they are meticulously organized adventures that seamlessly blend
								excitement, comfort, and cultural richness, ensuring that every moment becomes a cherished memory.
							</p>
							<Button color='default' size='lg' className='font-poppins rounded-md text-primary'>
								See Destinations
							</Button>
						</div>
						<div className='overflow-hidden object-cover w-full h-fit xl:hidden flex'>
							<Image
								src={landingImage}
								alt='about image'
								style={{
									objectFit: 'cover',
								}}
								className='min-h-[200px] w-fit'
							/>
						</div>
					</div>
				</div>
				<div className='absolute right-0 flex top-[184px] max-w-[600px] items-center overflow-hidden'>
					<Image
						src={landingImage}
						alt='about image'
						layout='cover'
						className='clip-path-div h-[300px] w-fit xl:block hidden'
					/>
				</div>
				{/* Packages */}
				<div className='flex flex-col justify-start max-w-6xl w-full mx-auto min-h-screen'>
					<div className='flex md:flex-row flex-col w-full items-center justify-between gap-4'>
						<h1 className='font-playfair lg:text-6xl sm:text-4xl text-2xl'>Explore Popular Packages</h1>
						<div className='w-fit'>
							<Button color='default' size='lg' className='font-poppins rounded-md text-primary'>
								Browse Packages
							</Button>
						</div>
					</div>

					<div className='flex flex-wrap h-fit w-full justify-evenly my-10'>
						{!packagesLoading && packages ? <Catalog packages={packages} /> : <CatalogCardSuspense cardNumber={3} />}
					</div>
				</div>
			</div>
		</div>
	);
}

export default About;
