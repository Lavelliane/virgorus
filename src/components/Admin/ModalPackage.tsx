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
	Select,
	SelectItem,
	Selection,
	Divider,
	ScrollShadow,
} from '@nextui-org/react';
import { MdLibraryAdd } from 'react-icons/md';
import IAddPackage from '../../types/types';
import addPackageDefault from '@/utils/defaults';
import { availabilityData, languagesData } from '@/utils/data';
import TableRates from './TableRates';
import TableInclusions from './TableInclusion';
import TableExclusions from './TableExclusion';
import TableExpectations from './TableExpectation';

export default function ModalPackage() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [form, setForm] = React.useState<IAddPackage>(addPackageDefault);
	const [availability, setAvailability] = React.useState<Selection>(new Set([]));
	const [language, setLanguage] = React.useState<Selection>(new Set([]));

	const availabilitySelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedValues = e.target.value.split(',');

		// Map selected values to the corresponding labels
		const sortedSelectedAvailability = availabilityData
			.filter((item) => selectedValues.includes(item.value))
			.map((item) => item.value);

		setAvailability(new Set(sortedSelectedAvailability));

		const availability = sortedSelectedAvailability.toString();
		setForm({ ...form, ['availability']: availability });
	};

	const languageSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setLanguage(new Set(e.target.value.split(',')));
		const language = e.target.value.toString();
		setForm({ ...form, ['language']: language });
	};

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	console.log(form);
	return (
		<>
			<Button onPress={onOpen} color='primary' endContent={<MdLibraryAdd />}>
				Add New
			</Button>
			<Modal backdrop={'blur'} isOpen={isOpen} onClose={onClose} size='2xl'>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className='flex flex-col gap-1'>Add Package</ModalHeader>
							<ModalBody>
								<ScrollShadow size={40} className='flex flex-col gap-4 h-[70vh] pb-10'>
									<div className='flex gap-4'>
										<Input
											value={form.name}
											className='w-[50%]'
											name='name'
											onChange={onChange}
											type='text'
											size='sm'
											labelPlacement='outside'
											label='Package Name'
											placeholder='Enter package name'
											isRequired
										/>
										<Input
											value={form.type}
											className='w-[25%]'
											name='type'
											onChange={onChange}
											type='text'
											size='sm'
											labelPlacement='outside'
											label='Type'
											placeholder='Enter type'
											isRequired
										/>
										<Input
											name='location'
											className='w-[25%]'
											value={form.location}
											onChange={onChange}
											type='text'
											size='sm'
											labelPlacement='outside'
											label='Location'
											placeholder='Enter location'
											isRequired
										/>
									</div>
									<div className='flex gap-4'>
										<Textarea
											className='w-[50%]'
											name='description'
											value={form.description}
											onChange={onChange}
											type='text'
											size='sm'
											labelPlacement='outside'
											label='Description'
											placeholder='Enter package description'
											isRequired
										/>
										<Textarea
											className='w-[50%]'
											name='notice'
											value={form.notice}
											onChange={onChange}
											type='text'
											size='sm'
											labelPlacement='outside'
											label='Notice'
											placeholder='Enter notice'
										/>
									</div>
									<div className='flex gap-4'>
										<Input
											value={form.duration}
											className='w-[50%]'
											name='duration'
											onChange={onChange}
											type='text'
											size='sm'
											labelPlacement='outside'
											label='Package Duration'
											placeholder='i.e. 12 Hours'
											isRequired
										/>
										<Input
											value={form.cancellation}
											className='w-[50%]'
											name='cancellation'
											onChange={onChange}
											type='text'
											size='sm'
											labelPlacement='outside'
											label='Cancellation Policy'
											placeholder='i.e. 48-Hour Cancellation'
											isRequired
										/>
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
												<SelectItem key={language.code} value={language.name}>
													{language.name}
												</SelectItem>
											))}
										</Select>
									</div>
									<Divider className='my-0' />
									<div className='flex flex-col gap-4'>
										<div className='flex w-full gap-4'>
											<TableRates onChange={onChange} form={form} />
											<TableExpectations onChange={onChange} form={form} />
										</div>
										<div className='flex w-full gap-4'>
											<TableInclusions onChange={onChange} form={form} />
											<TableExclusions onChange={onChange} form={form} />
										</div>
									</div>
								</ScrollShadow>
							</ModalBody>
							<ModalFooter>
								<Button color='danger' variant='light' onPress={onClose}>
									Close
								</Button>
								<Button color='primary' onPress={onClose}>
									Action
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
}
