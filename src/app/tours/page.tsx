'use client';

import { Catalog } from '@/components/Guest/Catalog';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchPackages } from '@/queries/fetchPackages';
import { IAddPackage } from '@/types/types';
import { ToursList } from '@/components/Guest/ToursList';
import { Spacer } from '@nextui-org/react';
import { EmblaOptionsType, EmblaPluginType } from 'embla-carousel-react';
import Image from 'next/image';
import toursImage from '@/assets/images/palawan.jpg';

type Package = {
	id: number;
	name: string;
	type: string;
	location: string;
};

interface Location {
	key: string;
	name: string;
}

function getLocations(packages: Package[]): Location[] {
	const locations: Location[] = [];

	packages.forEach((ipackage) => {
		const { location } = ipackage;

		const existingPackageSection = locations.find((section) => section.name === location);
		if (!existingPackageSection) {
			locations.push({ key: location, name: location });
		}
	});

	return locations;
}


export default function Tours() {
	const [packages, setPackages] = useState<IAddPackage[]>([]);
	const { data: packagesData, isLoading: packagesLoading } = useQuery({
		queryKey: ['packages'],
		queryFn: fetchPackages,
	});
	const locations = getLocations(packages);


	useEffect(() => {
		if (!packagesLoading && packagesData) {
			const shuffledPackages = shuffleArray(
				packagesData.map((pd: any) => ({
					id: pd.id,
					name: pd.name,
					description: pd.description,
					type: pd.type,
					location: pd.location,
					rate: pd.rates[pd.rates.length - 1].ratePerPax,
					photos: pd.photos,
				}))
			);
			setPackages(shuffledPackages);
		}
	}, [packagesLoading, packagesData]);

	// Function to shuffle the array
	const shuffleArray = (array: IAddPackage[]) => {
		const newArray = [...array];
		for (let i = newArray.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[newArray[i], newArray[j]] = [newArray[j], newArray[i]];
		}
		return newArray;
	};

	const SLIDE_COUNT = packages.length;
	const SLIDES = Array.from(Array(SLIDE_COUNT).keys());
	const OPTIONS: EmblaOptionsType = { loop: false, containScroll: 'trimSnaps', dragFree: true};

	return (
		<main className='flex min-h-screen flex-col items-center justify-between bg-white'>
			<div className="flex min-w-fit h-96 relative my-2 w-full items-center justify-center">
				<Image
					src={toursImage}
					alt="tours image"
					style={{
					objectFit: 'cover',
					width: '100%',
					height: '100%',
					}}
					sizes='auto'
				/>
				<div className="absolute inset-0 text-white z-10 w-full flex h-full items-center justify-center bg-black/30">
					<div className='flex flex-col max-w-6xl h-full w-full justify-end mx-16 '>
						<h1 className='text-center xl:text-start text-xl sm:text-3xl md:text-5xl xl:text-6xl font-bold mt-10 font-poppins'>
							Explore, Discover, Wander
						</h1>
						<span className='bg-white h-[2px] rounded-full my-3'></span>
						<div className='text-center xl:text-start text-lg sm:text-xl md:text-3xl xl:text-4xl font-regular mb-10 font-poppins'>
							All Destinations
						</div>
					</div>
				</div>
			</div>		
			<section className='flex flex-col h-fit items-center mx-6 max-w-7xl w-full'>
				<div className='w-full text-4xl font-semibold font-playfair my-2'>All Destinations</div>
				<Spacer y={5} />
				<div className='w-full'>
					{locations.map((location: Location) => (
						<ToursList key={location.key} location={location.name} />
					))}
				</div>
			</section>
		</main>
	);
}
