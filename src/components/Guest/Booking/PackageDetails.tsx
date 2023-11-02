'use client';

import React from 'react';
import { useEffect , useState } from 'react'
import { useMount } from 'react-use'
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
} from '@nextui-org/react';
import { Gallery } from './Gallery';
import { BookingForm } from './BookingForm';
import Recommendations from './Recommendations';
import { FaExclamationCircle } from 'react-icons/fa';
import { MdTimelapse, MdCancel, MdLanguage, MdOutlineGroups } from 'react-icons/md';
import Package from '../../../types/package';


export default function PackageDetails({ packageData }: { packageData: Package }) {
	const foo = 'foo';
	const loremIpsum =
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';
	console.log(packageData)
	return (
		<div className='flex flex-col'>
			<div className='flex flex-col'>
				<Spacer y={10} />
				<p className='font-bold text-black text-2xl'>{packageData.name}</p>
				<Spacer y={10} />
				<div>
					<Gallery />
				</div>
			</div>
			<Spacer y={5} />
			<div className='flex md:flex-row flex-col my-0 '>
				<div className='w-full'>
					<div className='w-full text-black text-sm'>
						<h1 className='font-semibold pb-2 text-lg'>About</h1>
						{packageData.description}
					</div>
					<div className='w-full text-black py-2 text-sm'>
						<h1 className=''>
							starts at <span className='text-2xl font-bold'>₱{foo}</span> per adult (see rates below for group pricing)
						</h1>
					</div>
					<Card className='bg-nude py-2 my-4' hidden={!packageData.notice}>
						<CardHeader className='font-semibold'>
							<FaExclamationCircle /> &nbsp;Note:
						</CardHeader>
						<CardBody className='text-sm'>{packageData.notice}</CardBody>
					</Card>
					<Divider />
					<div className='flex flex-col py-4'>
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
								<Button variant='light' className='h-8' disableAnimation>
									<span className='text-lg flex items-center'>
										<MdTimelapse />
									</span>
									<span className='text-md flex items-center'>Duration: {packageData.duration}</span>
								</Button>
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
											For a full refund, cancel at least {packageData.cancellation} in advance of the start date of the experience.
										</div>
									</div>
								}
							>
								<Button variant='light' className='h-8' disableAnimation>
									<span className='text-lg flex items-center'>
										<MdCancel />
									</span>
									<span className='text-md flex items-center'>{packageData.cancellation} cancellation</span>
								</Button>
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
											Certain locations in the package have age requirements which you are required to abide by.
										</div>
									</div>
								}
							>
								<Button variant='light' className='h-8' disableAnimation>
									<span className='text-lg flex items-center'>
										<MdOutlineGroups />
									</span>
									<span className='text-md flex items-center'>Ages {foo}</span>
								</Button>
							</Tooltip>
						</div>
						<div>
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
								<Button variant='light' className='h-8' disableAnimation>
									<span className='text-lg flex items-center'>
										<MdLanguage />
									</span>
									<span className='text-md flex items-center'>Live guide: {packageData.language}</span>
								</Button>
							</Tooltip>
						</div>
					</div>
					<Divider />
					<div>
						<Accordion
							isCompact={true}
							selectionMode='multiple'
							itemClasses={{
								heading: 'font-semibold',
								content: 'text-sm',
							}}
						>
							<AccordionItem title='Rates and inclusions' className='text-black'>
								{packageData.inclusions}
							</AccordionItem>
							<AccordionItem title='Sample itinerary' className='text-black'>
								{loremIpsum}
							</AccordionItem>
							<AccordionItem title='What to expect' className='text-black'>
								{packageData.expectations}
							</AccordionItem>
							<AccordionItem title='Accessibility' className='text-black'>
								{loremIpsum}
							</AccordionItem>
							<AccordionItem title='Additional information' className='text-black'>
								{loremIpsum}
							</AccordionItem>
							<AccordionItem title='Help' className='text-black'>
								{loremIpsum}
							</AccordionItem>
						</Accordion>
					</div>
				</div>
				<Spacer x={10} />
				<div className='w-full'>
					<BookingForm />
				</div>
			</div>
			<Spacer y={4} />
			<div>
				<h1 className='text-2xl text-black font-semibold py-4'>Find more tours in {foo}</h1>
				<div className='flex flex-row'>
					<Recommendations />
				</div>
			</div>
			<Spacer y={48} />
		</div>
	);
}
