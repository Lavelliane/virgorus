'use client';

import { Catalog } from '@/components/Guest/Catalog';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchPackages } from '@/queries/fetchPackages';
import { IAddPackage } from '@/types/types';
import { CarouselWrapper } from '@/components/Guest/CarouselWrapper';
import { Spacer } from '@nextui-org/react';

export default function Tours() {
	const [packages, setPackages] = useState<IAddPackage[]>([]);
	const { data: packagesData, isLoading: packagesLoading } = useQuery({
		queryKey: ['packages'],
		queryFn: fetchPackages,
	});

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

	return (
		<main className='flex min-h-screen flex-col items-center justify-between bg-white'>
			<section className='flex flex-col h-fit items-center mx-6 max-w-7xl w-full'>
				<Spacer y={20} />
				<div className='w-full'>
					<CarouselWrapper packages={packages} />
				</div>
				<Spacer y={20} />
				{!packagesLoading ? (
					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-4 mx-auto'>
						<Catalog packages={packages} />
					</div>
				) : (
					<div className='flex flex-wrap h-fit w-full max-w-7xl pt-24 gap-3 my-10'></div>
				)}
			</section>
		</main>
	);
}
