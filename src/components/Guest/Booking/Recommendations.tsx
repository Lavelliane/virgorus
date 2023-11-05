'use client';

import React from 'react';
import { Card, Skeleton } from '@nextui-org/react';

export function Recommendations() {
	return (
		<section className='w-full flex lg:flex-row flex-col justify-evenly gap-6'>
			<Card className='w-full space-y-5 p-4' radius='lg'>
				<Skeleton className='rounded-lg'>
					<div className='h-72 rounded-lg bg-default-300'></div>
				</Skeleton>
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
			</Card>
			<Card className='w-full space-y-5 p-4' radius='lg'>
				<Skeleton className='rounded-lg'>
					<div className='h-72 rounded-lg bg-default-300'></div>
				</Skeleton>
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
			</Card>
			<Card className='w-full space-y-5 p-4' radius='lg'>
				<Skeleton className='rounded-lg'>
					<div className='h-72 rounded-lg bg-default-300'></div>
				</Skeleton>
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
			</Card>
		</section>
	);
}
