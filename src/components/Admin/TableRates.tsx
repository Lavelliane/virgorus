import React, { useEffect } from 'react';
import {
	Table,
	TableHeader,
	TableColumn,
	TableBody,
	TableRow,
	TableCell,
	Button,
	Input,
	Spacer,
} from '@nextui-org/react';
import { IoAddCircleOutline, IoRemoveCircleOutline, IoCheckmarkCircleOutline } from 'react-icons/io5';
import { PiNotePencilLight } from 'react-icons/pi';
import IAddPackage from '@/types/types';

interface Pax {
	numberOfPax: string;
	ratePerPax: string;
}

interface TableRatesProps {
	readonly onChange: (e: any) => void;
	readonly form: IAddPackage;
}

export default function TableRates({ onChange, form }: TableRatesProps) {
	const [paxRate, setPaxRate] = React.useState<Pax[]>([]);
	const [newPax, setNewPax] = React.useState('');
	const [newRate, setNewRate] = React.useState('');
	const [isEditingStates, setIsEditingStates] = React.useState<boolean[]>([]);
	const [originalPaxStates, setOriginalPaxStates] = React.useState<string[]>([]);
	const [originalRateStates, setOriginalRateStates] = React.useState<string[]>([]);

	useEffect(() => {
		if (form?.rates) {
			const paxRateData = form.rates
				.filter((item: { numberOfPax: string; ratePerPax: string }) => item.numberOfPax && item.ratePerPax)
				.map((item: { numberOfPax: string; ratePerPax: string }) => ({
					numberOfPax: item.numberOfPax,
					ratePerPax: item.ratePerPax,
				}));
			setPaxRate(paxRateData);
			setIsEditingStates(Array(form.rates.length).fill(false));
			setOriginalPaxStates(paxRateData.map((pax) => pax.numberOfPax).filter((item: string) => item));
			setOriginalRateStates(paxRateData.map((pax) => pax.ratePerPax).filter((item: string) => item));
		}
	}, [form?.rates]);

	const addPax = () => {
		if (newPax && newRate) {
			const existingEntry = paxRate.find((pax) => pax.numberOfPax === newPax);

			if (existingEntry) {
				console.log('Entry already exists');
			} else {
				const newEntry: Pax = {
					numberOfPax: newPax,
					ratePerPax: newRate,
				};
				setPaxRate([...paxRate, newEntry]);
				setIsEditingStates([...isEditingStates, false]);
				setOriginalPaxStates([...originalPaxStates, newPax]);
				setOriginalRateStates([...originalRateStates, newRate]);
				onChange({ target: { name: 'rates', value: [...paxRate, newEntry] } });
				setNewPax('');
				setNewRate('');
			}
		}
	};

	const removePaxRate = (index: number) => {
		const updatedPaxRate = [...paxRate];
		updatedPaxRate.splice(index, 1);
		setPaxRate(updatedPaxRate);

		const updatedIsEditingStates = [...isEditingStates];
		updatedIsEditingStates.splice(index, 1);
		setIsEditingStates(updatedIsEditingStates);

		const updatedOriginalPaxStates = [...originalPaxStates];
		updatedOriginalPaxStates.splice(index, 1);
		setOriginalPaxStates(updatedOriginalPaxStates);

		const updatedOriginalRateStates = [...originalRateStates];
		updatedOriginalRateStates.splice(index, 1);
		setOriginalRateStates(updatedOriginalRateStates);

		onChange({ target: { name: 'rates', value: updatedPaxRate } });
	};

	const toggleEdit = (index: number) => {
		const updatedIsEditingStates = [...isEditingStates];
		updatedIsEditingStates[index] = !updatedIsEditingStates[index];
		setIsEditingStates(updatedIsEditingStates);
	};

	const handleEdit = (index: number) => {
		const updatedPaxRate = [...paxRate];
		const newEditedPax = newPax || updatedPaxRate[index].numberOfPax;
		const newEditedRate = newRate || updatedPaxRate[index].ratePerPax;

		if (updatedPaxRate[index].numberOfPax !== newEditedPax || updatedPaxRate[index].ratePerPax !== newEditedRate) {
			updatedPaxRate[index].numberOfPax = newEditedPax;
			updatedPaxRate[index].ratePerPax = newEditedRate;
			setPaxRate(updatedPaxRate);

			const updatedIsEditingStates = [...isEditingStates];
			updatedIsEditingStates[index] = false;
			setIsEditingStates(updatedIsEditingStates);

			const updatedOriginalPaxStates = [...originalPaxStates];
			updatedOriginalPaxStates[index] = newEditedPax;
			setOriginalPaxStates(updatedOriginalPaxStates);

			const updatedOriginalRateStates = [...originalRateStates];
			updatedOriginalRateStates[index] = newEditedRate;
			setOriginalRateStates(updatedOriginalRateStates);

			setNewPax('');
			setNewRate('');
			onChange({ target: { name: 'rates', value: updatedPaxRate } });
		} else {
			// Content is the same as the original, exit the edit mode
			const updatedIsEditingStates = [...isEditingStates];
			updatedIsEditingStates[index] = false;
			setIsEditingStates(updatedIsEditingStates);
			setNewPax('');
			setNewRate('');
		}
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
					{paxRate?.map((paxRateData, index) => (
						<TableRow key={`${index}-${paxRateData.numberOfPax}-${paxRateData.ratePerPax}`}>
							<TableCell className='font-medium'>
								{isEditingStates[index] ? (
									<Input
										type='text'
										size='sm'
										value={newPax}
										onChange={(e) => setNewPax(e.target.value)}
										placeholder={originalPaxStates[index]}
										className=' sm:text-sm text-xs mx-0'
									/>
								) : (
									' ' + paxRateData.numberOfPax
								)}
							</TableCell>
							<TableCell>
								{isEditingStates[index] ? (
									<Input
										type='text'
										size='sm'
										value={newRate}
										onChange={(e) => setNewRate(e.target.value)}
										placeholder={originalRateStates[index]}
										className=' sm:text-sm text-xs mx-0'
									/>
								) : (
									`₱ ${Number(paxRateData.ratePerPax).toLocaleString('en-US', { minimumFractionDigits: 2 })}`
								)}
							</TableCell>
							<TableCell className='justify-center flex items-center'>
								{isEditingStates[index] ? (
									<div className='flex justify-center items-center'>
										<Button
											onClick={() => handleEdit(index)}
											isIconOnly
											size='sm'
											className='bg-transparent text-green-700 hover:text-green-600 text-xl hover:bg-transparent'
										>
											<IoCheckmarkCircleOutline />
										</Button>
										<Button
											onClick={() => removePaxRate(index)}
											isIconOnly
											size='sm'
											className='bg-transparent text-red-600 hover:text-red-400 text-xl hover:bg-transparent'
										>
											<IoRemoveCircleOutline />
										</Button>
									</div>
								) : (
									<div className='flex justify-center items-center'>
										<Button
											disabled={isEditingStates.some((isEditing) => isEditing)}
											onClick={() => toggleEdit(index)}
											isIconOnly
											size='sm'
											className='bg-transparent text-blue-600 hover:text-blue-400 text-xl hover:bg-transparent'
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
			<div className='flex items-center'>
				<Input
					type='text'
					size='sm'
					value={isEditingStates.some((isEditing) => isEditing) ? '' : newPax}
					onChange={(e) => setNewPax(e.target.value)}
					placeholder='No. of Pax'
					disabled={isEditingStates.some((isEditing) => isEditing)}
					className=' sm:text-sm text-xs mx-0'
				/>
				<Spacer x={2} />
				<Input
					type='text'
					size='sm'
					value={isEditingStates.some((isEditing) => isEditing) ? '' : newRate}
					onChange={(e) => setNewRate(e.target.value)}
					placeholder='Rate/Pax'
					disabled={isEditingStates.some((isEditing) => isEditing)}
					className=' sm:text-sm text-xs mx-0'
				/>
				<Spacer x={4} />
				<Button
					onClick={addPax}
					size='sm'
					isIconOnly
					className='text-chocolate hover:text-opacity-60 text-2xl bg-transparent transition-all'
					disabled={isEditingStates.some((isEditing) => isEditing)}
					type='submit'
				>
					<IoAddCircleOutline />
				</Button>
				<Spacer x={4} />
			</div>
		</div>
	);
}
