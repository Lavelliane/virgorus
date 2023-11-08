'use client';
import React, { useEffect } from 'react';
import {
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Button,
	Input,
	Textarea,
	Tooltip,
	Select,
	SelectItem,
	Selection,
	Divider,
} from '@nextui-org/react';
import { MdLibraryAdd } from 'react-icons/md';
import IAddPackage from '../../types/types';
import addPackageDefault from '@/utils/defaults';
import { availabilityData, languagesData } from '@/utils/data';
import TableRates from './TableRates';
import TableInclusions from './TableInclusion';
import TableExclusions from './TableExclusion';
import TableItinerary from './TableItinerary';
import { useQuery } from '@tanstack/react-query';
import { fetchPackage } from '@/queries/fetchPackages';

async function editPackage(data: IAddPackage, id: any) {
	console.log(id);
	console.log(data);
	try {
		const response = await fetch(`/api/package/${id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});

		if (response.ok) {
			const updatedPackage = await response.json();
			return updatedPackage; // Return the updated data
		} else {
			console.error('Failed to update package:', response.statusText);
		}
	} catch (error) {
		console.error('An error occurred while updating package:', error);
	}
}

interface Props {
	readonly id: any;
}

export default function EditPackage({ id }: Props) {
	const [form, setForm] = React.useState<IAddPackage>(addPackageDefault);
	const [availability, setAvailability] = React.useState<Selection>(new Set([]));
	const [language, setLanguage] = React.useState<Selection>(new Set([]));

	const { data: packageData, isLoading: packageLoading } = useQuery({
		queryKey: ['packages', id.id],
		queryFn: () => fetchPackage(id.id),
	});

	useEffect(() => {
		if (!packageLoading && packageData) {
			const data = {
				id: packageData.id,
				name: packageData.name,
				description: packageData.description,
				type: packageData.type,
				location: packageData.location,
				duration: packageData.duration,
				cancellation: packageData.cancellation,
				notice: packageData.notice,
				availability: packageData.availability,
				language: packageData.language,
				ratesAndInclusions: packageData.ratesAndInclusions,
				inclusions: packageData.inclusions,
				exclusions: packageData.exclusions,
				itinerary: packageData.itinerary,
				photos: packageData.photos,
			};

			setForm(data);
		}
	}, [packageLoading, packageData]);

	console.log(form);
	const handleActionClick = () => {
		editPackage(form, packageData.id);
	};

	const handleReturn = () => {
		window.location.reload();
	};

	const availabilitySelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedValues = e.target.value.split(',');
		const sortedSelectedAvailability = availabilityData
			.filter((item) => selectedValues.includes(item.value))
			.map((item) => item.value);

		setAvailability(new Set(sortedSelectedAvailability));
		const availability = sortedSelectedAvailability.toString();
		setForm({ ...form, ['availability']: availability });
	};

	const languageSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedValues = e.target.value.split(',');
		const sortedSelectedLanguages = languagesData
			.filter((item) => selectedValues.includes(item.name))
			.map((item) => item.name);

		setLanguage(new Set(sortedSelectedLanguages));
		const language = sortedSelectedLanguages.join(', ');
		setForm({ ...form, ['language']: language });
	};

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	console.log(form);
	return (
		<Card>
			<CardHeader className='flex flex-col gap-1'>Edit Package</CardHeader>
			<CardBody>
				<div className='flex flex-col gap-4'>
					<div className='flex gap-4'>
						<Input
							value={form?.name || ''}
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
							value={form?.type}
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
							value={form?.location}
							onChange={onChange}
							type='text'
							size='sm'
							labelPlacement='outside'
							label='Location'
							placeholder='Enter location'
							isRequired
						/>
					</div>
					<div className='flex flex-col gap-4'>
						<Textarea
							className='w-[100%]'
							name='description'
							value={form?.description}
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
							value={form?.notice}
							onChange={onChange}
							type='text'
							size='sm'
							labelPlacement='outside'
							label='Notice'
							placeholder='Enter notice'
							minRows={4}
						/>
					</div>
					<div className='flex gap-4'>
						<Input
							value={form?.duration}
							className='w-[50%]'
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
						<Tooltip placement='top' delay={500} closeDelay={100} content="Leave empty for 'No cancellation' policies.">
							<Input
								value={form?.cancellation}
								className='w-[50%]'
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
							{availabilityData?.map((availability) => (
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
							{languagesData?.map((language) => (
								<SelectItem key={language.name} value={language.name}>
									{language.name}
								</SelectItem>
							))}
						</Select>
					</div>
					<Divider className='my-0' />
					<div className='flex flex-row gap-4'>
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
				</div>
			</CardBody>
			<CardFooter>
				<Button color='danger' variant='light' onPress={handleReturn}>
					Return
				</Button>
				<Button color='secondary' onPress={handleActionClick}>
					Save
				</Button>
			</CardFooter>
		</Card>
	);
}
