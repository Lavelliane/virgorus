'use client';

import React, { useState, useEffect } from 'react';
import {
	Accordion,
	AccordionItem,
	Divider,
	Spacer,
	Textarea,
	Tooltip,
	Button,
	Card,
	CardBody,
	CardHeader,
	Skeleton
} from '@nextui-org/react';
import { Gallery } from './Gallery';
import { RatesTable } from './RatesTable';
import { BookingForm } from './BookingForm';
import { Recommendations } from './Recommendations';
import { getContactIcon } from '../ContactBar';
import { FaExclamationCircle } from 'react-icons/fa';
import { MdTimelapse, MdCancel, MdLanguage, MdOutlineGroups } from 'react-icons/md';
import Package from '../../../types/package';
import { contactsData } from '@/utils/data';
import { useQuery } from '@tanstack/react-query';
import { fetchPackage } from '@/queries/fetchPackages';

export default function PackageDetails({ id }: { id: number }) {
	/* ====================         STATES         ====================*/

	const [showDescription, setShowDescription] = useState(false);
	const [isLoaded, setIsLoaded] = React.useState(false);
	const [Package, setPackage] = useState<Package>();
	const { data: packageData, isLoading: packageLoading } = useQuery({
		queryKey: ['package'],
		queryFn: () => {
		  return fetchPackage(id); // Pass the id to the fetchPackage function
		},
	  });
	  
	useEffect(() => {
		if (!packageLoading && packageData) {
			setIsLoaded(true)
			setPackage(packageData);
		}
	}, [packageLoading, packageData]);

	/* ====================         VARIABLE DECLARATIONS         ====================*/

	const ratePerPax = Package?.rates?.map((rate) => rate.ratePerPax);
	const minRate = ratePerPax?.[ratePerPax.length - 1];
	const inclusions = Package?.inclusions?.map((inclusion) => {
		return <li key={inclusion}>{inclusion}</li>;
	});
	const exclusions = Package?.exclusions?.map((exclusion) => {
		return <li key={exclusion}>{exclusion}</li>;
	});

	return (
		<div className='flex flex-col w-full mx-2 sm:mx-10'>
			<div aria-label='Package Header' className='flex flex-col w-full'>
				<Spacer y={10} />
				<Skeleton isLoaded={isLoaded} className={`rounded-lg ${isLoaded === false ? 'w-1/2' : ''}`}>
					{isLoaded ? (
						<p className='font-bold text-black text-2xl'>{Package?.name}</p>
					) : (
						<div className='text-2xl'>.</div>
					)}
				</Skeleton>
				<Spacer y={6} />
				<div>
					<Skeleton isLoaded={isLoaded} className='rounded-lg'>
						{isLoaded ? (
							<p className='font-bold text-black text-2xl'><Gallery /></p>
						) : (
							<div className='h-96'>.</div>
						)}
					</Skeleton>
				</div>
			</div>
			<Spacer y={10} />
			<div aria-label='Package Body' className='flex lg:flex-row flex-col my-0 '>
				{isLoaded ? (
					<div aria-label='Package Info' className='lg:w-4/6'>
						<div aria-label='About'>
							<div className='w-full text-black text-sm'>
								<h1 className='font-semibold pb-4 text-lg'>About</h1>
								<div className={`${showDescription ? '' : 'gradient-mask'}`}>
									<p
										className={`text-justify whitespace-pre-wrap h-fit ${
											showDescription ? '' : 'max-h-28 overflow-hidden'
										}`}
									>
										{Package?.description}
									</p>
								</div>
								<Button
									disableAnimation
									variant='light'
									color='default'
									onClick={() => setShowDescription(!showDescription)}
									className='font-semibold text-sm underline underline-offset-2 p-0 my-2 h-fit justify-start rounded-none hover:bg-white'
								>
									{showDescription ? 'Read Less' : 'Read More...'}
								</Button>
							</div>
							<div className='w-full text-black py-2 mb-4 text-sm'>
								starts as low as&nbsp;
								<span className='text-xl font-medium'>{`₱${Number(minRate).toLocaleString('en-US', {
									minimumFractionDigits: 2,
								})}`}</span>
								&nbsp;per adult&nbsp;
								<span className='italic opacity-30'>(see rates below for full pricing)</span>
							</div>
							<div
								className={`w-full p-3 my-6 bg-nude hover:bg-nuder hover:transition-colors rounded-xl text-chocolate ${
									Package?.notice === '' ? 'hidden' : ''
								}`}
							>
								<h1 className='flex items-center text-xs font-semibold pb-2'>
									<FaExclamationCircle />
									&nbsp;&nbsp;Note :
								</h1>
								<p className='text-sm'>{Package?.notice}</p>
							</div>
						</div>
						<Divider />
						<div aria-label='Tooltips' className='flex flex-col py-4'>
							<div>
								<Tooltip
									placement='right'
									closeDelay={100}
									content={
										<div className='px-1 py-2'>
											<div className='text-small font-bold text-black'>Duration</div>
											<div className='text-tiny text-black w-48 text-justify'>
												Estimated duration of the tour. This may change during the actual tour.
											</div>
										</div>
									}
								>
									<div className='flex w-fit px-4 h-8 items-center'>
										<p className='text-sm flex h-4 whitespace-pre-wrap'>
											<span className='text-lg'>
												<MdTimelapse />
											</span>
											&nbsp; Duration: {Package?.duration} hour/s
										</p>
									</div>
								</Tooltip>
							</div>
							<div>
								<Tooltip
									placement='right'
									closeDelay={100}
									content={
										<div className='px-1 py-2'>
											<div className='text-small font-bold text-black'>Cancellation</div>
											<div className='text-tiny text-black w-48 text-justify'>
												For a full refund, cancel at least {Package?.cancellation} hours prior to the start date of the
												experience.
											</div>
										</div>
									}
								>
									<div className='flex w-fit px-4 h-8 items-center'>
										<p className='text-sm flex h-4 whitespace-pre-wrap'>
											<span className='text-lg'>
												<MdCancel />
											</span>
											&nbsp;&nbsp;
											{Package?.cancellation ? `${Package?.cancellation}-hour` : 'No'} cancellation
										</p>
									</div>
								</Tooltip>
							</div>
							<div>
								<Tooltip
									placement='right'
									closeDelay={100}
									content={
										<div className='px-1 py-2'>
											<div className='text-small font-bold text-black'>Age range</div>
											<div className='text-tiny text-black w-48 text-justify'>
												Certain locations in the package have age requirements which you are required to follow.
											</div>
										</div>
									}
								>
									<div className='flex w-fit px-4 h-8 items-center'>
										<p className='text-sm flex h-4 whitespace-pre-wrap'>
											<span className='text-lg'>
												<MdOutlineGroups />
											</span>
											&nbsp; Available{' '}
											{Package?.availability === 'Saturday, Sunday' ||
											Package?.availability === 'Monday, Tuesday, Wednesday, Thursday, Friday' ||
											Package?.availability === 'Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday'
												? Package?.availability === 'Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday'
													? 'daily'
													: Package?.availability === 'Saturday, Sunday'
													? 'on weekends'
													: 'on weekdays'
												: Package?.availability}
										</p>
									</div>
								</Tooltip>
							</div>
							<div className='w-full'>
								<Tooltip
									placement='right'
									closeDelay={100}
									content={
										<div className='px-1 py-2'>
											<div className='text-small font-bold text-black'>Live guide</div>
											<div className='text-tiny text-black w-48 text-justify'>
												The languages your tour guide is proficient in. Feel free to ask them anything about the tour.
											</div>
										</div>
									}
								>
									<div className='flex w-fit px-4 h-8 items-center truncate'>
										<p className='text-sm flex h-4'>
											<span className='text-lg'>
												<MdLanguage />
											</span>
											&nbsp; Live guide: {Package?.language}
										</p>
									</div>
								</Tooltip>
							</div>
						</div>
						<Divider />
						<div aria-label='Accordions'>
							<Accordion
								isCompact={true}
								selectionMode='multiple'
								itemClasses={{
									heading: 'font-medium',
									content: 'text-sm font-light text-justify pb-4',
								}}
							>
								<AccordionItem title='Rates and inclusions' className='text-black'>
									<div className='flex flex-col w-full sm:flex-row sm:mb-4'>
										<div
											aria-label='Rates Table'
											className={`sm:mx-2 min-w-fit flex justify-center ${ratePerPax?.[0] === '' ? 'hidden' : ''}`}
										>
											<div className='w-56'>
												<RatesTable rates={Package?.rates} />
											</div>
										</div>
										<div aria-label='Inclusions and Exclusions' className='mt-4 sm:my-4 mx-2 w-full'>
											<div className={`mb-4 ${Package?.inclusions?.[0] ? '' : 'hidden'}`}>
												<h1
													className={`text-md font-medium underline underline-offset-2 ${
														Package?.inclusions?.[0] ? '' : 'hidden'
													}`}
												>
													Inclusions
												</h1>
												<p className={`text-xs mx-4 md:text-sm sm:mx-4 ${Package?.inclusions?.[0] ? '' : 'hidden'}`}>
													{inclusions}
												</p>
											</div>
											<div className={`mb-4 ${Package?.exclusions?.[0] ? '' : 'hidden'}`}>
												<Divider />
												<Spacer y={2} />
												<h1
													className={`text-md font-medium underline underline-offset-2 ${
														Package?.exclusions?.[0] ? '' : 'hidden'
													}`}
												>
													Exclusions
												</h1>
												<p className={`text-xs md:text-sm sm:m-2 ${Package?.exclusions?.[0] ? '' : 'hidden'}`}>
													{exclusions}
												</p>
											</div>
										</div>
									</div>
								</AccordionItem>
								<AccordionItem title='Sample itinerary' className='text-black'>
								
								</AccordionItem>
								<AccordionItem title='Accessibility' className='text-black'>
								
								</AccordionItem>
								<AccordionItem title='Help' className='text-black'>
									If you have any questions or need assistance, feel free to reach out to our support team. We are here to
									ensure that you have smooth and enjoyable experience. You may contact us at:
									<div className='mt-4'>
										{contactsData.map((contact) => (
											<div className='flex items-center mb-2' key={contact.key}>
												<div className='mr-4'>{getContactIcon(contact.key)}</div>
												<div>{contact.value}</div>
											</div>
										))}
									</div>
								</AccordionItem>
							</Accordion>
							<Divider className='px-4' />
						</div>
					</div>
				) : (
					<div className='lg:w-4/6'>
						<div className='flex flex-col gap-4'>
							<div>
								<Skeleton isLoaded={isLoaded} className='rounded-lg w-36'>
								<h1 className='text-lg'>.</h1>
								</Skeleton>
							</div>
							<div className='flex flex-col gap-2 py-4'>
								<Skeleton isLoaded={isLoaded} className='rounded-lg'>
									<p className='text-md'></p>
								</Skeleton>
								<Skeleton isLoaded={isLoaded} className='rounded-lg'>
									<p className='text-md'>.</p>
								</Skeleton>
								<Skeleton isLoaded={isLoaded} className='rounded-lg'>
									<p className='text-md'>.</p>
								</Skeleton>
								<Skeleton isLoaded={isLoaded} className='rounded-lg'>
									<p className='text-md'>.</p>
								</Skeleton>
								<Skeleton isLoaded={isLoaded} className='rounded-lg w-2/3'>
									<p className='text-md'>.</p>
								</Skeleton>
							</div>
							<Divider />
							<div className='flex flex-col gap-2 py-4 w-48'>
								<Skeleton isLoaded={isLoaded} className='rounded-lg'>
									<p className='text-md'></p>
								</Skeleton>
								<Skeleton isLoaded={isLoaded} className='rounded-lg'>
									<p className='text-md'>.</p>
								</Skeleton>
								<Skeleton isLoaded={isLoaded} className='rounded-lg'>
									<p className='text-md'>.</p>
								</Skeleton>
								<Skeleton isLoaded={isLoaded} className='rounded-lg'>
									<p className='text-md'>.</p>
								</Skeleton>
								<Skeleton isLoaded={isLoaded} className='rounded-lg'>
									<p className='text-md'>.</p>
								</Skeleton>
							</div>
							<Divider />
							<Skeleton isLoaded={isLoaded} className='rounded-lg h-52'>
								<p className='text-md'>.</p>
							</Skeleton>
						</div>					
					</div>
				)}
				<Spacer x={10} />
				<div aria-label='Booking Form' className='py-10 lg:py-0 lg:w-2/6'>
					<BookingForm />
				</div>
			</div>
			<Spacer y={14} />
			<div aria-label='Package Footer'>
				<h1 className='text-xl text-black font-semibold py-4'>Find more tours in </h1>
				<div className='flex flex-row'>
					<Recommendations />
				</div>
			</div>
			<Spacer y={48} />
		</div>
	);
}
