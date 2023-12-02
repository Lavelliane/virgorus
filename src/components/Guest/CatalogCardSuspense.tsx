'use client';

import React from 'react';
import { Card, Skeleton } from '@nextui-org/react';

type CardListProps = {
	cardNumber: number;
};

export const CatalogCardSuspense = ({ cardNumber }: CardListProps) => {
	const cards = Array.from({ length: cardNumber }, (_, index) => ({ id: index + 1 }));
	return (
		<section className='w-full flex flex-wrap justify-start gap-4'>
			{cards.map((card) => (
				<Card className='w-80 space-y-5 p-4 mx-auto' radius='lg' key={card.id}>
					<div className='space-y-3'>
						<Skeleton className='w-3/5 rounded-lg'>
							<div className='h-3 w-3/5 rounded-lg bg-default-200'></div>
						</Skeleton>
						<Skeleton className='w-4/5 rounded-lg'>
							<div className='h-3 w-4/5 rounded-lg bg-default-200'></div>
						</Skeleton>
						<Skeleton className='w-2/5 rounded-lg'>
							<div className='h-3 w-2/5 rounded-lg bg-default-300'></div>
						</Skeleton>
					</div>
					<Skeleton className='rounded-lg'>
						<div className='h-72 rounded-lg bg-default-300'></div>
					</Skeleton>
					<div className='space-y-3'>
						<Skeleton className='w-1/6 rounded-lg'>
							<div className='h-3 w-1/6 rounded-lg bg-default-200'></div>
						</Skeleton>
						<Skeleton className='w-2/6 rounded-lg'>
							<div className='h-3 w-2/6 rounded-lg bg-default-200'></div>
						</Skeleton>
					</div>
				</Card>
			))}
		</section>
	);
};
