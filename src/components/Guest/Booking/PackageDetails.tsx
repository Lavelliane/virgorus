'use client';

import React, { useState }  from 'react';
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
import { RatesTable } from './RatesTable';
import { BookingForm } from './BookingForm';
import Recommendations from './Recommendations';
import { FaExclamationCircle } from 'react-icons/fa';
import { MdTimelapse, MdCancel, MdLanguage, MdOutlineGroups } from 'react-icons/md';
import Package from '../../../types/package';
import { RatesAndInclusion } from '@prisma/client';


export default function PackageDetails({ packageData }: { packageData: Package }) {
	/* ====================         TEMPS (to-be-removed)         ====================*/

	const foo = 'foo';
	const loremIpsum =
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';
		
	/* ====================         STATES         ====================*/

	const [showDescription, setShowDescription] = useState(false);

	/* ====================         VARIABLE DECLARATIONS         ====================*/

	const inclusions = packageData.inclusions?.map((inclusion) => {
		return (
		  <li key={inclusion}>
			{inclusion}
		  </li>
		);
	});

	const exclusions = packageData.exclusions?.map((exclusion) => {
		return (
		  <li key={exclusion}>
			{exclusion}
		  </li>
		);
	});

	return (
		<div className='flex flex-col w-full mx-2 sm:mx-10'>
			<div aria-label='Package Header' className='flex flex-col w-full'>
				<Spacer y={10} />
				<p className='font-bold text-black text-2xl'>{packageData.name}</p>
				<Spacer y={6} />
				<div>
					<Gallery />
				</div>
			</div>
			<Spacer y={10} />
			<div aria-label='Package Body' className='flex lg:flex-row flex-col my-0 '>
				<div aria-label='Package Info' className='lg:w-4/6'>
					<div className='w-full text-black text-sm'>
						<h1 className='font-semibold pb-4 text-lg'>About</h1>
						<div className={`${showDescription ? '' : 'gradient-mask'}`}>
							<p className={`text-justify whitespace-pre-wrap h-fit ${showDescription ? '' : 'max-h-28 overflow-hidden'}`}>{packageData.description}</p>
						</div>
						<Button
							disableAnimation
							variant='light'
							color='default'
							onClick={() => setShowDescription(!showDescription)}
							className='font-semibold text-sm underline underline-offset-2 p-0 my-4 h-fit justify-start rounded-none hover:bg-white'
							>
							{showDescription ? 'Read Less' : 'Read More...'}
						</Button>
					</div>
					<div className='w-full text-black py-2 text-sm'>
						<h1 className=''>
							starts at <span className='text-2xl font-bold'>₱{foo}</span> per adult (see rates below for group pricing)
						</h1>
					</div>
					<div className={`w-full p-3 my-6 bg-nude hover:bg-nuder hover:transition-colors rounded-xl text-chocolate ${packageData.notice === '' ? 'hidden' : ''}`}>
						<h1 className='flex items-center text-xs font-semibold pb-2'><FaExclamationCircle />&nbsp;&nbsp;Note :</h1>
						<p className='text-sm'>{packageData.notice}</p>
					</div>
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
								<div className='flex w-fit px-4 h-8 items-center'>
									<p className='text-sm flex h-4 whitespace-pre-wrap'><span className='text-lg'><MdTimelapse /></span>&nbsp; 
									Duration: {packageData.duration}</p>
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
											For a full refund, cancel at least {packageData.cancellation} hours prior to the start date of the experience.
										</div>
									</div>
								}
							>
								<div className='flex w-fit px-4 h-8 items-center'>
									<p className='text-sm flex h-4 whitespace-pre-wrap'><span className='text-lg'><MdCancel /></span>&nbsp;&nbsp;
									{packageData.cancellation ? packageData.cancellation : 'No'}-hour cancellation
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
											Certain locations in the package have age requirements which you are required to abide by.
										</div>
									</div>
								}
							>
								<div className='flex w-fit px-4 h-8 items-center'>
									<p className='text-sm flex h-4 whitespace-pre-wrap'><span className='text-lg'><MdOutlineGroups /></span>&nbsp;
									Ages: {foo}</p>
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
								<div className='flex w-1/2 px-4 h-8 items-center truncate'>
									<p className='text-sm flex h-4'><span className='text-lg'><MdLanguage /></span>&nbsp;
									Live guide: {packageData.language}</p>
								</div>
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
								<div className='flex flex-col sm:flex-row justify-center pb-4'>
									<div className='mx-2 max-w-[1/2]'>
										<RatesTable rates={packageData.ratesAndInclusions} />
									</div>
									<div className='m-2'>
										<div className={`mb-4 ${packageData.inclusions?.[0] ? '' : 'hidden'}`}>
											<h1 className={`text-md font-semibold underline underline-offset-2 ${packageData.inclusions?.[0] ? '' : 'hidden'}`}>Inclusions</h1>
											<p className={`text-sm m-2 ${packageData.inclusions?.[0] ? '' : 'hidden'}`}>{inclusions}</p>			
										</div>
										<div className={`mb-4 ${packageData.exclusions?.[0] ? '' : 'hidden'}`}>
											<Divider />
											<Spacer y={2}/>
											<h1 className={`text-md font-semibold ${packageData.exclusions?.[0] ? '' : 'hidden'}`}>Exclusions</h1>
											<p className={`text-md ml-2 text-justify ${packageData.exclusions?.[0] ? '' : 'hidden'}`}>{exclusions}</p>			
										</div>
									</div>
								</div>
							</AccordionItem>
							<AccordionItem title='Inclusions' className='text-black'>
							</AccordionItem>
							<AccordionItem title='Sample itinerary' className='text-black'>
								<p className='pb-4 text-justify'>{loremIpsum}</p>
							</AccordionItem>
							<AccordionItem title='What to expect' className='text-black'>
								<p className='pb-4 text-justify'>{packageData.expectations}</p>
							</AccordionItem>
							<AccordionItem title='Accessibility' className='text-black'>
								<p className='pb-4 text-justify'>{loremIpsum}</p>
							</AccordionItem>
							<AccordionItem title='Additional information' className='text-black'>
								<p className='pb-4 text-justify'>{loremIpsum}</p>
							</AccordionItem>
							<AccordionItem title='Help' className='text-black'>
								<p className='pb-4 text-justify'>{loremIpsum}</p>
							</AccordionItem>
						</Accordion>
					</div>
					<Divider />
				</div>
				<Spacer x={10} />
				<div aria-label='Booking Form' className='lg:w-2/6'>
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
