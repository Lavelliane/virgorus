'use client';

import React from 'react';
import { Catalog } from '@/components/Guest/Catalog';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchPackages } from '@/queries/fetchPackages';
import { IAddPackage } from '@/types/types';
import { Card, CardBody, CardHeader, Skeleton } from '@nextui-org/react';
import { CatalogSuspense } from '../CatalogSuspense';
import { CarouselWrapper } from '../CarouselWrapper';

export const Recommendations = ({ location }: { location: string | null | undefined }) => {
	const [packages, setPackages] = useState<IAddPackage[]>([]);
	const { data: packagesData, isLoading: packagesLoading } = useQuery({
		queryKey: ['packages'],
		queryFn: fetchPackages,
	});

	useEffect(() => {
		if (!packagesLoading && packagesData) {
			let selectedPackages: IAddPackage[];

			if (location) {
				// Filter and shuffle packages for the specified location
				selectedPackages = shuffleArray(
					packagesData
						.filter((pd: any) => pd.location === location)
						.map((pd: any) => ({
							id: pd.id,
							name: pd.name,
							description: pd.description,
							type: pd.type,
							location: pd.location,
							rate: pd.rates[pd.rates.length - 1].ratePerPax,
							photos: pd.photos,
						}))
						.slice(0, 3) // Take up to three packages for the specified location
				);
			} else {
				// Randomly select three packages from the entire list
				selectedPackages = shuffleArray(
					packagesData.map((pd: any) => ({
						id: pd.id,
						name: pd.name,
						description: pd.description,
						type: pd.type,
						location: pd.location,
						rate: pd.rates[pd.rates.length - 1].ratePerPax,
						photos: pd.photos,
					}))
				).slice(0, 3);
			}

			setPackages(selectedPackages);
		}
	}, [packagesLoading, packagesData, location]);

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
		<main className='flex flex-col w-full items-center justify-between bg-transparent'>
			<section className='flex flex-col h-fit items-center mx-6 max-w-7xl w-full'>
				{!packagesLoading ? (
					<>
						<div className='hidden lg:grid grid-cols-3 gap-10 w-full'>
							<Catalog packages={packages} />
						</div>
						<div className='w-full lg:hidden'>
							<CarouselWrapper packages={packages} />
						</div>
					</>
				) : (
					<div className='grid grid-cols-3 gap-10 w-full'>
						<CatalogSuspense numberOfCards={3} />
					</div>
				)}
			</section>
		</main>
	);
};
