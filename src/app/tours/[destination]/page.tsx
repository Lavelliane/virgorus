'use client';

import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchPackages } from '@/queries/fetchPackages';
import { IAddPackage, Photo } from '@/types/types';
import { Spacer, Skeleton } from '@nextui-org/react';
import { CarouselList, CarouselImage } from '@/components/Guest/Carousel';
import { EmblaOptionsType, EmblaPluginType } from 'embla-carousel-react';
import { Catalog } from '@/components/Guest/Catalog';
import { convertPhotos } from '@/components/Guest/Booking/PackageDetails';
import AutoPlay from 'embla-carousel-autoplay';
import { locationData } from '@/utils/data';
import { CatalogSuspense } from '@/components/Guest/CatalogSuspense';

const autoplayOptions = {
	delay: 8000,
	stopOnInteraction: false,
	AutoPlay: true,
	rootNode: (emblaRoot: HTMLElement) => emblaRoot.parentElement,
};

const DestinationPage = ({ params }: { params: { destination: string } }) => {
  	const destination = decodeURIComponent(params.destination.replace(/\+/g, ' '));
	const matchingLocation = locationData.find((location) => location.value === destination);
	const destinationDescription = matchingLocation?.description ?? 'Description not found';	

	const [packages, setPackages] = useState<IAddPackage[]>([]);
	const [photos, setPhotos] = useState<Photo[]>([]);
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

			selectedPackages = shuffleArray(
				packagesData
				.filter((pd: IAddPackage) => pd.location === destination)
				.map((pd: IAddPackage) => ({
					id: pd.id,
					name: pd.name,
					description: pd.description,
					type: pd.type,
					location: pd.location,
					rates: pd.rates,
					photos: pd.photos,
				}))
			)
			setPackages(selectedPackages);	
			const photos = selectedPackages.flatMap((p) => {
				return p.photos.filter((photo) => typeof photo === 'string');
			  });
			setPhotos(convertPhotos(photos as string[]));
		}
	}, [packagesLoading, packagesData, destination]);

	const SLIDE_COUNT = packages.length;
	const SLIDES = Array.from(Array(SLIDE_COUNT).keys());
	const OPTIONS: EmblaOptionsType = { loop: false, slidesToScroll: 1};

	const PHOTO_COUNT = photos.length
	const PHOTOS = Array.from(Array(PHOTO_COUNT).keys());
	const OPTIONS_PHOTOS: EmblaOptionsType = { loop: false, containScroll: 'trimSnaps', dragFree: false, watchDrag: false};
	const PLUGINS: EmblaPluginType = OPTIONS_PHOTOS ? [AutoPlay(autoplayOptions)] : [];

	return (
		<main className='flex min-h-screen flex-col items-center justify-between bg-white'>
			<section className='flex flex-col h-fit items-center mx-6 max-w-7xl w-full px-10 pb-10'>
				<div className='w-full text-7xl font-semibold font-playfair my-8'>Discover {destination}</div>
				<div className='bg-nude rounded-2xl'>
					<div className='w-full'>
					{packagesLoading && (
						<Skeleton className="rounded-t-2xl h-[500px]"/>
					)}
					{PHOTOS.length > 0 && <CarouselImage slides={PHOTOS} photos={photos} options={OPTIONS_PHOTOS} plugins={PLUGINS}/>}
					</div>
					<div className='p-24'>
						<div className='w-full text-3xl font-semibold font-playfair mb-8'>About</div>
						<p className='w-2/3'>{destinationDescription}</p>
					</div>
				</div>
				<Spacer y={12} />
				<>
					<div className='visible w-full'>
						<CarouselList slides={SLIDES} options={OPTIONS} packages={packages} />
					</div>
					{packagesLoading && (
						<div className='grid grid-cols-3 gap-10 w-full'>
							<CatalogSuspense numberOfCards={3} />
						</div>
					)}
				</>
			</section>
		</main>
	);
}

export default DestinationPage;
