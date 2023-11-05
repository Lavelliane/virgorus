import React, { useEffect } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Input } from '@nextui-org/react';
import { IoAddCircleOutline, IoRemoveCircleOutline, IoCheckmarkCircleOutline } from 'react-icons/io5';
import { PiNotePencilLight } from 'react-icons/pi';
import IAddPackage from '@/types/types';

interface TableExpectationsProps {
	readonly onChange: (e: any) => void;
	readonly form: IAddPackage;
}

export default function TableExpectations({ onChange, form }: TableExpectationsProps) {
	const [expectations, setExpectations] = React.useState<string[]>([]);
	const [newExpectations, setNewExpectations] = React.useState('');
	const [isEditingStates, setIsEditingStates] = React.useState<boolean[]>([]);
	const [originalExpectationsStates, setOriginalExpectationsStates] = React.useState<string[]>([]);

	useEffect(() => {
		if (form.expectations) {
			setExpectations(form.expectations.filter((expectation: string) => expectation));
			setIsEditingStates(Array(form.expectations.length).fill(false));
			setOriginalExpectationsStates(form.expectations.filter((expectation: string) => expectation));
		}
	}, [form.expectations]);

	const addExpectations = () => {
		if (newExpectations && !expectations.includes(newExpectations)) {
			setExpectations([...expectations, newExpectations]);
			setIsEditingStates([...isEditingStates, false]);
			setOriginalExpectationsStates([...originalExpectationsStates, newExpectations]);
			onChange({ target: { name: 'expectations', value: [...expectations, newExpectations] } });
			setNewExpectations('');
		}
	};

	const removeExpectations = (index: number) => {
		const updatedExpectations = [...expectations];
		updatedExpectations.splice(index, 1);
		setExpectations(updatedExpectations);

		const updatedIsEditingStates = [...isEditingStates];
		updatedIsEditingStates.splice(index, 1);
		setIsEditingStates(updatedIsEditingStates);

		const updatedOriginalExpectationsStates = [...originalExpectationsStates];
		updatedOriginalExpectationsStates.splice(index, 1);
		setOriginalExpectationsStates(updatedOriginalExpectationsStates);

		onChange({ target: { name: 'expectations', value: updatedExpectations } });
	};

	const toggleEdit = (index: number) => {
		const updatedIsEditingStates = [...isEditingStates];
		updatedIsEditingStates[index] = !isEditingStates[index];
		setIsEditingStates(updatedIsEditingStates);
	};

	const handleEdit = (index: number) => {
		const updatedExpectations = [...expectations];
		const newEditedExpectations = newExpectations || updatedExpectations[index];

		// Check if the edited expectation already exists in the list
		if (updatedExpectations[index] !== newEditedExpectations) {
			updatedExpectations[index] = newEditedExpectations;
			setExpectations(updatedExpectations);

			const updatedIsEditingStates = [...isEditingStates];
			updatedIsEditingStates[index] = false;
			setIsEditingStates(updatedIsEditingStates);

			const updatedOriginalExpectationsStates = [...originalExpectationsStates];
			updatedOriginalExpectationsStates[index] = newEditedExpectations;
			setOriginalExpectationsStates(updatedOriginalExpectationsStates);

			setNewExpectations('');
			onChange({ target: { name: 'expectations', value: updatedExpectations } });
		} else {
			// Content is the same as the original, exit the edit mode
			const updatedIsEditingStates = [...isEditingStates];
			updatedIsEditingStates[index] = false;
			setNewExpectations('');
			setIsEditingStates(updatedIsEditingStates);
		}
	};

	return (
		<div className='flex flex-col gap-4 w-full'>
			<Table aria-label='Expectations table' removeWrapper isHeaderSticky className='max-h-40 overflow-auto'>
				<TableHeader>
					<TableColumn key='expectations' className='table-cell w-full items-center'>
						Expectations
					</TableColumn>
					<TableColumn key='action' className='justify-end w-full flex items-center'>
						Actions
					</TableColumn>
				</TableHeader>
				<TableBody>
					{expectations.map((expectation, index) => (
						<TableRow key={`${expectation}`}>
							<TableCell className='font-medium'>
								{isEditingStates[index] ? (
									<Input
										type='text'
										size='sm'
										value={newExpectations}
										onChange={(e) => setNewExpectations(e.target.value)}
										placeholder={originalExpectationsStates[index]}
										className='sm:text-sm text-xs mx-0'
									/>
								) : (
									' ' + expectation
								)}
							</TableCell>
							<TableCell className='justify-end flex items-center'>
								{isEditingStates[index] ? (
									<div className='flex'>
										<Button
											onClick={() => handleEdit(index)}
											isIconOnly
											size='sm'
											className='bg-transparent text-green-700 hover:text-green-600 text-xl hover-bg-transparent'
										>
											<IoCheckmarkCircleOutline />
										</Button>
										<Button
											onClick={() => removeExpectations(index)}
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
											disabled={isEditingStates.some((isEditing) => isEditing)}
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
					value={isEditingStates.some((isEditing) => isEditing) ? '' : newExpectations}
					onChange={(e) => setNewExpectations(e.target.value)}
					placeholder='Add Expectation'
					disabled={isEditingStates.some((isEditing) => isEditing)}
					className='sm:text-sm text-xs mx-0'
				/>
				<Button
					onClick={addExpectations}
					size='sm'
					isIconOnly
					className='text-chocolate hover-text-opacity-60 text-xl bg-transparent transition-all'
					disabled={isEditingStates.some((isEditing) => isEditing)}
				>
					<IoAddCircleOutline />
				</Button>
			</div>
		</div>
	);
}
