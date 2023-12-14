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
import toursImage from '@/assets/images/all-packages.jpg';

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
			<Spacer y={5} />
			<div className='min-w-fit h-96 relative my-2 diagonal-image-clip'>
				<Image
					src={toursImage}
					alt='tours image'
					style={{
						objectFit: 'cover',
						width: '100%',
						height: '100%',
					}}
					sizes='auto'
				/>
			</div>	
			<section className='flex flex-col h-fit items-center mx-6 max-w-7xl w-full px-10'>
				<Spacer y={12} />
				<div className='w-full text-3xl font-semibold font-playfair my-8'>All Packages</div>
				{!packagesLoading ? (
					<>
						<div className='hidden lg:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-4 mx-auto'>
							<Catalog packages={packages} />
						</div>
					</>
				) : (
					<div className='flex flex-wrap h-fit w-full max-w-7xl pt-24 gap-3 my-10'></div>
				)}
			</section>
		</main>
	);
}
