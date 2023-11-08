import React, { useEffect } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Input } from '@nextui-org/react';
import { IoAddCircleOutline, IoRemoveCircleOutline, IoCheckmarkCircleOutline } from 'react-icons/io5';
import { PiNotePencilLight } from 'react-icons/pi';
import IAddPackage from '@/types/types';

interface Pax {
	numberOfPax: string;
	ratePerPax: string;
	isEditing: boolean;
	originalPax: string;
	originalRate: string;
}

interface TableRatesProps {
	readonly onChange: (e: any) => void;
	readonly form: IAddPackage;
}

export default function TableRates({ onChange, form }: TableRatesProps) {
	const [numberOfPax, setNumberOfPax] = React.useState<Pax[]>([]);
	const [newPax, setNewPax] = React.useState('');
	const [newRate, setNewRate] = React.useState('');
	const [isAnyRowEditing, setIsAnyRowEditing] = React.useState(false);

	useEffect(() => {
		if (form?.ratesAndInclusions) {
			const numberOfPax = form.ratesAndInclusions
				.filter((item: { numberOfPax: string; ratePerPax: string }) => item.numberOfPax && item.ratePerPax)
				.map((item: { numberOfPax: string; ratePerPax: string }) => ({
					numberOfPax: item.numberOfPax,
					ratePerPax: item.ratePerPax,
					isEditing: false,
					originalPax: item.numberOfPax,
					originalRate: item.ratePerPax,
				}));
			setNumberOfPax(numberOfPax);
		}
	}, [form?.ratesAndInclusions]);

	const addPax = () => {
		if (newPax && newRate) {
			const newEntry: Pax = {
				numberOfPax: newPax,
				ratePerPax: newRate,
				isEditing: false,
				originalPax: newPax,
				originalRate: newRate,
			};
			setNumberOfPax([...numberOfPax, newEntry]);
			onChange({ target: { name: 'ratesAndInclusions', value: [...numberOfPax, newEntry] } });
			setNewPax('');
			setNewRate('');
		}
	};

	const removePax = (index: number) => {
		const updatedPax = [...numberOfPax];
		updatedPax.splice(index, 1);
		setNumberOfPax(updatedPax);
		onChange({ target: { name: 'ratesAndInclusions', value: updatedPax } });
	};

	const toggleEdit = (index: number) => {
		if (!isAnyRowEditing) {
			const updatedPax = [...numberOfPax];
			updatedPax[index].isEditing = !updatedPax[index].isEditing;
			setNumberOfPax(updatedPax);
			setIsAnyRowEditing(true);
		}
	};

	const handleEdit = (index: number) => {
		const updatedPax = [...numberOfPax];
		const newEditedPax = newPax || updatedPax[index].originalPax;
		const newEditedRate = newRate || updatedPax[index].originalRate;
		updatedPax[index].numberOfPax = newEditedPax;
		updatedPax[index].ratePerPax = newEditedRate;
		updatedPax[index].isEditing = false;
		updatedPax[index].originalPax = newEditedPax;
		updatedPax[index].originalRate = newEditedRate;
		setNumberOfPax(updatedPax);
		setNewPax('');
		setNewRate('');
		onChange({ target: { name: 'ratesAndInclusions', value: updatedPax } });
		setIsAnyRowEditing(false);
	};

	return (
		<div className='flex flex-col w-full gap-4'>
			<Table aria-label='Rates table' removeWrapper isHeaderSticky className='max-h-[48rem] overflow-auto'>
				<TableHeader>
					<TableColumn key='numberOfPax' className='table-cell w-1/2 items-center'>
						Pax
					</TableColumn>
					<TableColumn key='ratePerPax' className=' table-cell w-1/2 items-center'>
						Rate
					</TableColumn>
					<TableColumn key='action' className='justify-end w-full flex items-center'>
						Actions
					</TableColumn>
				</TableHeader>
				<TableBody>
					{numberOfPax?.map((numberOfPax, index) => (
						<TableRow key={`${numberOfPax.numberOfPax}-${numberOfPax.ratePerPax}`}>
							<TableCell className='font-medium'>
								{numberOfPax.isEditing ? (
									<Input
										type='text'
										size='sm'
										value={newPax}
										onChange={(e) => setNewPax(e.target.value)}
										placeholder={numberOfPax.originalPax}
										className=' sm:text-sm text-xs mx-0'
									/>
								) : (
									' ' + numberOfPax.numberOfPax
								)}
							</TableCell>
							<TableCell>
								{numberOfPax.isEditing ? (
									<Input
										type='text'
										size='sm'
										value={newRate}
										onChange={(e) => setNewRate(e.target.value)}
										placeholder={numberOfPax.originalRate}
										className=' sm:text-sm text-xs mx-0'
									/>
								) : (
									`₱ ${Number(numberOfPax.ratePerPax).toLocaleString('en-US', { minimumFractionDigits: 2 })}`
								)}
							</TableCell>
							<TableCell className='justify-end flex items-center'>
								{numberOfPax.isEditing ? (
									<div className='flex'>
										<Button
											onClick={() => handleEdit(index)}
											isIconOnly
											size='sm'
											className='bg-transparent text-green-700 hover:text-green-600 text-xl hover:bg-transparent'
										>
											<IoCheckmarkCircleOutline />
										</Button>
										<Button
											onClick={() => removePax(index)}
											isIconOnly
											size='sm'
											className='bg-transparent text-red-600 hover:text-red-400 text-xl hover-bg-transparent'
										>
											<IoRemoveCircleOutline />
										</Button>
									</div>
								) : (
									<div>
										<Button
											disabled={numberOfPax.isEditing}
											onClick={() => toggleEdit(index)}
											isIconOnly
											size='sm'
											className='bg-transparent text-blue-600 hover:text-blue-400 text-xl hover-bg-transparent'
										>
											<PiNotePencilLight />
										</Button>
									</div>
								)}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
			<div className='flex gap-4'>
				<Input
					type='text'
					size='sm'
					value={numberOfPax.some((numberOfPax) => numberOfPax.isEditing) ? '' : newPax}
					onChange={(e) => setNewPax(e.target.value)}
					placeholder='No. of Pax'
					disabled={numberOfPax.some((numberOfPax) => numberOfPax.isEditing)}
					className=' sm:text-sm text-xs mx-0'
				/>
				<Input
					type='text'
					size='sm'
					value={numberOfPax.some((numberOfPax) => numberOfPax.isEditing) ? '' : newRate}
					onChange={(e) => setNewRate(e.target.value)}
					placeholder='Rate/Pax'
					disabled={numberOfPax.some((numberOfPax) => numberOfPax.isEditing)}
					className=' sm:text-sm text-xs mx-0'
				/>
				<Button
					onClick={addPax}
					size='sm'
					isIconOnly
					className='text-chocolate hover:text-opacity-60 text-xl bg-transparent transition-all'
					disabled={numberOfPax.some((numberOfPax) => numberOfPax.isEditing)}
				>
					<IoAddCircleOutline />
				</Button>
			</div>
		</div>
	);
}
