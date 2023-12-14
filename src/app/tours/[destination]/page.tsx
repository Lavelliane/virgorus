'use client';

import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchPackages } from '@/queries/fetchPackages';
import { IAddPackage } from '@/types/types';
import { Spacer } from '@nextui-org/react';
import { CarouselList, CarouselImage } from '@/components/Guest/Carousel';
import { EmblaOptionsType, EmblaPluginType } from 'embla-carousel-react';
import { Catalog } from '@/components/Guest/Catalog';

const DestinationPage = ({ params }: { params: { destination: string } }) => {
  	const destination = decodeURIComponent(params.destination.replace(/\+/g, ' '));
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
		}
	}, [packagesLoading, packagesData, destination]);

	const SLIDE_COUNT = packages.length;
	const SLIDES = Array.from(Array(SLIDE_COUNT).keys());
	const OPTIONS: EmblaOptionsType = { loop: false, containScroll: 'trimSnaps', dragFree: true};

	return (
		<main className='flex min-h-screen flex-col items-center justify-between bg-white'>
			<section className='flex flex-col h-fit items-center mx-6 max-w-7xl w-full px-10'>
				<div className='w-full text-7xl font-semibold font-playfair my-8'>Discover {destination}</div>
				<div className='w-full'>
         	 		{SLIDES.length > 0 && <CarouselImage slides={SLIDES} packages={packages} />}
				</div>
				<Spacer y={12} />
				<div className='w-full text-3xl font-semibold font-playfair my-8'>About</div>
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vel dui turpis. Sed vulputate facilisis sem vel hendrerit. Cras blandit nibh vel mi vulputate, id consectetur augue malesuada. Curabitur venenatis bibendum diam id tincidunt. In hac habitasse platea dictumst. Fusce accumsan quis dolor a placerat. Aliquam volutpat cursus maximus. Donec porttitor eu justo sit amet pulvinar. Donec aliquet, lectus ac pharetra vestibulum, nulla felis auctor nulla, vel varius orci est nec risus. Pellentesque posuere mi et neque elementum gravida. Praesent aliquam sem leo, quis imperdiet mauris sollicitudin pulvinar. Sed id rhoncus nisi. Integer eu tellus libero.</p>
				<Spacer y={12} />
				<div className='w-full text-3xl font-semibold font-playfair my-8'>Tour Packages</div>
				{!packagesLoading ? (
					<>
						<div className='hidden lg:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-4 mx-auto'>
							<Catalog packages={packages} />
						</div>
						<div className='flex lg:hidden w-full'>
							{SLIDES.length > 0 && <CarouselList slides={SLIDES} options={OPTIONS} packages={packages} />}
						</div>
					</>
				) : (
					<div className='flex flex-wrap h-fit w-full max-w-7xl pt-24 gap-3 my-10'></div>
				)}
			</section>
		</main>
	);
}

export default DestinationPage;
