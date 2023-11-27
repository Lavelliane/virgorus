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
		<div aria-label='About Us' className='flex flex-col h-fit w-full justify-center text-white relative'>
			{/* About */}
			<div className='flex flex-col bg-primary font-poppins h-[120vh] w-full'>
				<div className='flex flex-col justify-start py-16 max-w-6xl mx-auto'>
					<h1 className='font-playfair text-6xl'>Virgorus Organizes Everything</h1>
					<div className='flex justify-evenly py-20'>
						<div className='flex flex-col justify-between items-start w-3/5 mr-auto h-[300px]'>
							<p className='text-lg font-extralight'>
								Our tours go beyond exploration—they are meticulously organized adventures that seamlessly blend
								excitement, comfort, and cultural richness, ensuring that every moment becomes a cherished memory.
							</p>
							<Button color='default' size='lg' className='font-poppins rounded-md text-primary'>
								See Destinations
							</Button>
						</div>
					</div>
				</div>
				<div className='absolute right-0 flex top-52'>
					<Image src={landingImage} alt='about image' layout='cover' className='clip-path-div h-[300px] w-fit' />
				</div>
			</div>
			{/* Packages */}
			<div className='flex flex-col h-fit -translate-y-72 max-w-6xl w-full mx-auto'>
				<div className='flex flex-col w-full'>
					<div className='flex w-full items-center justify-between'>
						<div className='flex grow w-full'>
							<h1 className='font-playfair text-6xl mr-auto'>Explore Popular Packages</h1>
						</div>
						<div className='flex shrink'>
							<Button color='default' size='lg' className='font-poppins rounded-md text-primary'>
								Browse Packages
							</Button>
						</div>
					</div>
					{!packagesLoading ? (
						<div className='flex flex-wrap h-fit w-full justify-evenly my-10'>
							<Catalog packages={packages} />
						</div>
					) : (
						<div className='flex flex-wrap h-fit w-full justify-evenly my-10'>
							<CatalogCardSuspense />
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default About;
