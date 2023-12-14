'use client';

import { Catalog } from '@/components/Guest/Catalog';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchPackages } from '@/queries/fetchPackages';
import { IAddPackage } from '@/types/types';
import { CarouselList } from '@/components/Guest/Carousel';
import { Spacer } from '@nextui-org/react';
import { EmblaOptionsType, EmblaPluginType } from 'embla-carousel-react';

export const ToursList = ({ location }: { location: string | null | undefined}) => {
	const [packages, setPackages] = useState<IAddPackage[]>([]);
	const { data: packagesData, isLoading: packagesLoading } = useQuery({
		queryKey: ['packages'],
		queryFn: fetchPackages,
	});

	// Function to shuffle the array
	const shuffleArray = (array: IAddPackage[]) => {
		const newArray = [...array];
		for (let i = newArray.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[newArray[i], newArray[j]] = [newArray[j], newArray[i]];
		}
		return newArray;
	};

	useEffect(() => {
		if (!packagesLoading && packagesData) {
			let selectedPackages: IAddPackage[];

			if (location) {
				// Filter and shuffle packages for the specified location
				selectedPackages = shuffleArray(
					packagesData
						.filter((pd: IAddPackage) => pd.location === location)
						.map((pd: IAddPackage) => ({
							id: pd.id,
							name: pd.name,
							description: pd.description,
							type: pd.type,
							location: pd.location,
							rates: pd.rates,
							photos: pd.photos,
						}))
				);
			} else {
				// Randomly select n packages from the entire list
				selectedPackages = shuffleArray(
					packagesData.map((pd: IAddPackage) => ({
						id: pd.id,
						name: pd.name,
						description: pd.description,
						type: pd.type,
						location: pd.location,
						rates: pd.rates,
						photos: pd.photos,
					}))
				)
			}
			setPackages(selectedPackages);
		}
	}, [packagesLoading, packagesData, location]);

	const SLIDE_COUNT = packages.length;
	const SLIDES = Array.from(Array(SLIDE_COUNT).keys());
	const OPTIONS: EmblaOptionsType = { loop: false, containScroll: 'trimSnaps', dragFree: true};

	return (
		<main className='flex flex-col items-center justify-between bg-white'>
			<section className='flex flex-col h-fit items-center mx-6 max-w-7xl w-full'>
                <div className='w-full text-2xl font-semibold font-playfair my-2'>Tours in {location}</div>
				<div className='w-full'>
					{SLIDES.length > 0 && <CarouselList slides={SLIDES} options={OPTIONS} packages={packages} />}
				</div>
				<Spacer y={10} />
			</section>
		</main>
	);
}
