'use client';
import { Button, Card, CardHeader, CardBody, CardFooter } from '@nextui-org/react';
import { IAddPackage } from '@/types/types';
import Image from 'next/image';
import Link from 'next/link';

export const CatalogCard = ({ catPackage }: { catPackage: IAddPackage }) => {
	return (
		<Card className='max-w-96 w-full h-fit mx-auto'>
			<CardHeader className='flex flex-col items-start gap-2 h-fit p-4'>
				<span className='font-bold text-gray-400 uppercase'>{catPackage.type}</span>
				<p
					className={`font-bold h-16 overflow-hidden ${catPackage.name.length > 50 ? 'text-lg' : 'text-2xl'}`}
					style={{
						display: '-webkit-box',
						WebkitLineClamp: 2, // Number of lines before truncating
						WebkitBoxOrient: 'vertical',
						lineHeight: '1.5rem', // Adjust to control line height
						maxHeight: '3rem', // Maximum height before truncating
					}}
				>
					{catPackage.name}
				</p>
				<p
					className='text-small text-default-400 md:max-w-[400px] w-full overflow-hidden'
					style={{
						display: '-webkit-box',
						WebkitLineClamp: 5, // Number of lines before truncating
						WebkitBoxOrient: 'vertical',
						lineHeight: '1rem', // Adjust to control line height
						maxHeight: '10rem', // Maximum height before truncating
					}}
				>
					{catPackage.description}
				</p>
			</CardHeader>
			<CardBody className='w-full h-48 relative my-2'>
				<Image src={String(catPackage?.photos[0])} alt='Picture of the tour' fill={true} objectFit='cover' />
			</CardBody>
			<CardFooter className='flex justify-between gap-2 my-2 p-4'>
				<div className='flex flex-col'>
					<span className='text-md'>For as low as</span>
					<div className='flex gap-1'>
						<span className='text-md text-olive'>{`₱${Number(
							catPackage?.rates.find((rate) => rate.numberOfPax == '1') || 0
						).toLocaleString('en-US', {
							minimumFractionDigits: 2,
						})}`}</span>
						<span className='text-md'> / person</span>
					</div>
				</div>
				<Link href={`/tours/${catPackage.location}/${catPackage.id}`}>
					<Button radius='full' className='bg-chocolate text-white'>
						Book Now
					</Button>
				</Link>
			</CardFooter>
		</Card>
	);
};
