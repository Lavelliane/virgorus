'use client';
import React, { useEffect } from 'react';
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	useDisclosure,
	Input,
	Textarea,
	Tooltip,
	Select,
	SelectItem,
	Selection,
	Divider,
	ScrollShadow,
} from '@nextui-org/react';
import { MdLibraryAdd } from 'react-icons/md';
import IAddPackage from '../../types/types';
import addPackageDefault from '@/utils/defaults';
import { availabilityData, languagesData, locationData } from '@/utils/data';
import TableRates from './TableRates';
import TableInclusions from './TableInclusion';
import TableExclusions from './TableExclusion';
import TableItinerary from './TableItinerary';

async function createPackage(data: IAddPackage) {
	try {
		const response = await fetch('/api/package', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});

		if (response.ok) {
			const createdPackage = await response.json();
			console.log('Package created:', createdPackage);
		} else {
			console.error('Failed to create package:', response.statusText);
		}
	} catch (error) {
		console.error('An error occurred:', error);
	}
}

export default function ModalPackage() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [form, setForm] = React.useState<IAddPackage>(addPackageDefault);
	const [availability, setAvailability] = React.useState<Selection>(new Set([]));
	const [language, setLanguage] = React.useState<Selection>(new Set([]));
	const [location, setLocation] = React.useState<string>('');

	const handleActionClick = () => {
		createPackage(form);
		onClose(); // Close the modal or perform any other desired action.
		window.location.reload();
	};

	const availabilitySelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedValues = e.target.value.split(',');
		const sortedSelectedAvailability = availabilityData
			.filter((item) => selectedValues.includes(item.value))
			.map((item) => item.value);

		setAvailability(new Set(sortedSelectedAvailability));
		const availability = sortedSelectedAvailability.join(',');
		setForm({ ...form, ['availability']: availability });
	};

	const languageSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedValues = e.target.value.split(',');
		const sortedSelectedLanguages = languagesData
			.filter((item) => selectedValues.includes(item.name))
			.map((item) => item.name);

		setLanguage(new Set(sortedSelectedLanguages));
		const language = sortedSelectedLanguages.join(',');
		setForm({ ...form, ['language']: language });
	};

	const locationSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setLocation(e.target.value);
		setForm({ ...form, ['location']: e.target.value });
	};

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	return (
		<>
			<Button
				onPress={onOpen}
				color='secondary'
				endContent={
					<span className='sm:flex hidden'>
						<MdLibraryAdd />
					</span>
				}
				className='items-center'
			>
				Add New
			</Button>
			<Modal backdrop={'blur'} isOpen={isOpen} onClose={onClose} size='2xl'>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className='flex flex-col gap-1'>Add Package</ModalHeader>
							<ModalBody className='p-4'>
								<ScrollShadow size={40} className='flex flex-col gap-4 h-[70vh] p-2 pb-10'>
									<div className='flex flex-col gap-4'>
										<Input
											value={form.name}
											name='name'
											onChange={onChange}
											type='text'
											size='sm'
											labelPlacement='outside'
											label='Package Name'
											placeholder='Enter package name'
											isRequired
										/>
										<div className='flex gap-4'>
											<Input
												value={form.type}
												className='w-1/2'
												name='type'
												onChange={onChange}
												type='text'
												size='sm'
												labelPlacement='outside'
												label='Type'
												placeholder='Enter type'
												isRequired
											/>

											<Select
												label='Location'
												labelPlacement='outside'
												placeholder='Select Location'
												selectedKeys={[location]}
												size='sm'
												className='w-1/2'
												onChange={locationSelectionChange}
											>
												{locationData.map((location) => (
													<SelectItem key={location.value} value={location.value}>
														{location.value}
													</SelectItem>
												))}
											</Select>
										</div>
									</div>
									<div className='flex flex-col gap-4'>
										<Textarea
											className='w-[100%]'
											name='description'
											value={form.description}
											onChange={onChange}
											type='text'
											size='sm'
											labelPlacement='outside'
											label='Description'
											placeholder='Enter package description'
											isRequired
											minRows={10}
										/>
										<Textarea
											className='w-[100%]'
											name='notice'
											value={form.notice}
											onChange={onChange}
											type='text'
											size='sm'
											labelPlacement='outside'
											label='Notice'
											placeholder='Enter notice'
											minRows={4}
										/>
									</div>
									<div className='flex md:flex-row flex-col gap-4'>
										<Input
											value={form.duration}
											name='duration'
											onChange={onChange}
											type='text'
											size='sm'
											min='1'
											labelPlacement='outside'
											label='Package Duration (in hours)'
											placeholder='i.e. 12, 8-10'
											isRequired
										/>
										<Tooltip
											placement='top'
											delay={500}
											closeDelay={100}
											size='sm'
											content="Leave empty for 'No cancellation' policies."
										>
											<Input
												value={form.cancellation}
												name='cancellation'
												onChange={onChange}
												type='text'
												size='sm'
												labelPlacement='outside'
												label='Cancellation Policy (in hours)'
												placeholder='i.e. 24, 48'
												isRequired
											/>
										</Tooltip>
									</div>
									<div className='flex gap-4'>
										<Select
											label='Availability'
											labelPlacement='outside'
											selectionMode='multiple'
											placeholder='Select Availability'
											selectedKeys={availability}
											size='sm'
											className='w-[50%]'
											onChange={availabilitySelectionChange}
										>
											{availabilityData.map((availability) => (
												<SelectItem key={availability.value} value={availability.value}>
													{availability.label}
												</SelectItem>
											))}
										</Select>
										<Select
											label='Language'
											labelPlacement='outside'
											selectionMode='multiple'
											placeholder='Select Language'
											selectedKeys={language}
											size='sm'
											className='w-[50%]'
											onChange={languageSelectionChange}
										>
											{languagesData.map((language) => (
												<SelectItem key={language.name} value={language.name}>
													{language.name}
												</SelectItem>
											))}
										</Select>
									</div>
									<Divider className='my-0' />
									<div className='flex md:flex-row flex-col gap-4'>
										<div className='flex w-full gap-4'>
											<TableRates onChange={onChange} form={form} />
										</div>
										<div className='flex flex-col w-full gap-4'>
											<TableInclusions onChange={onChange} form={form} />
											<TableExclusions onChange={onChange} form={form} />
										</div>
									</div>
									<Divider className='my-0' />
									<TableItinerary onChange={onChange} form={form} />
								</ScrollShadow>
							</ModalBody>
							<ModalFooter>
								<Button color='default' variant='light' onPress={onClose} className='font-semibold'>
									Close
								</Button>
								<Button color='secondary' onPress={handleActionClick}>
									Add
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
}
