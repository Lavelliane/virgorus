import React, { useEffect } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Input } from '@nextui-org/react';
import { IoAddCircleOutline, IoRemoveCircleOutline, IoCheckmarkCircleOutline } from 'react-icons/io5';
import { PiNotePencilLight } from 'react-icons/pi';
import IAddPackage from '@/types/types';

interface TableInclusionsProps {
	readonly onChange: (e: any) => void;
	readonly form: IAddPackage;
}

export default function TableInclusions({ onChange, form }: TableInclusionsProps) {
	const [inclusions, setInclusions] = React.useState<string[]>([]);
	const [newInclusions, setNewInclusions] = React.useState('');
	const [isEditingStates, setIsEditingStates] = React.useState<boolean[]>([]);
	const [originalInclusionsStates, setOriginalInclusionsStates] = React.useState<string[]>([]);

	useEffect(() => {
		if (form?.inclusions) {
			setInclusions(form.inclusions.filter((inclusion: string) => inclusion));
			setIsEditingStates(Array(form.inclusions.length).fill(false));
			setOriginalInclusionsStates(form.inclusions.filter((inclusion: string) => inclusion));
		}
	}, [form?.inclusions]);

	const addInclusions = () => {
		if (newInclusions && !inclusions.includes(newInclusions)) {
			setInclusions([...inclusions, newInclusions]);
			setIsEditingStates([...isEditingStates, false]);
			setOriginalInclusionsStates([...originalInclusionsStates, newInclusions]);
			onChange({ target: { name: 'inclusions', value: [...inclusions, newInclusions] } });
			setNewInclusions('');
		}
	};

	const removeInclusions = (index: number) => {
		const updatedInclusions = [...inclusions];
		updatedInclusions.splice(index, 1);
		setInclusions(updatedInclusions);

		const updatedIsEditingStates = [...isEditingStates];
		updatedIsEditingStates.splice(index, 1);
		setIsEditingStates(updatedIsEditingStates);

		const updatedOriginalInclusionsStates = [...originalInclusionsStates];
		updatedOriginalInclusionsStates.splice(index, 1);
		setOriginalInclusionsStates(updatedOriginalInclusionsStates);

		onChange({ target: { name: 'inclusions', value: updatedInclusions } });
	};

	const toggleEdit = (index: number) => {
		const updatedIsEditingStates = [...isEditingStates];
		updatedIsEditingStates[index] = !isEditingStates[index];
		setIsEditingStates(updatedIsEditingStates);
	};

	const handleEdit = (index: number) => {
		const updatedInclusions = [...inclusions];
		const newEditedInclusions = newInclusions || updatedInclusions[index];

		// Check if the edited inclusion already exists in the list
		if (updatedInclusions[index] !== newEditedInclusions) {
			updatedInclusions[index] = newEditedInclusions;
			setInclusions(updatedInclusions);

			const updatedIsEditingStates = [...isEditingStates];
			updatedIsEditingStates[index] = false;
			setIsEditingStates(updatedIsEditingStates);

			const updatedOriginalInclusionsStates = [...originalInclusionsStates];
			updatedOriginalInclusionsStates[index] = newEditedInclusions;
			setOriginalInclusionsStates(updatedOriginalInclusionsStates);

			setNewInclusions('');
			onChange({ target: { name: 'inclusions', value: updatedInclusions } });
		} else {
			// Content is the same as the original, exit the edit mode
			const updatedIsEditingStates = [...isEditingStates];
			updatedIsEditingStates[index] = false;
			setNewInclusions('');
			setIsEditingStates(updatedIsEditingStates);
		}
	};

	return (
		<div className='flex flex-col gap-4 w-full'>
			<Table aria-label='Rates table' removeWrapper isHeaderSticky className='max-h-96 overflow-auto'>
				<TableHeader>
					<TableColumn key='inclusions' className='table-cell w-full items-center'>
						Inclusions
					</TableColumn>
					<TableColumn key='action' className='justify-end w-full flex items-center'>
						Actions
					</TableColumn>
				</TableHeader>
				<TableBody>
					{inclusions.map((inclusion, index) => (
						<TableRow key={`${inclusion}`}>
							<TableCell className='font-medium'>
								{isEditingStates[index] ? (
									<Input
										type='text'
										size='sm'
										value={newInclusions}
										onChange={(e) => setNewInclusions(e.target.value)}
										placeholder={originalInclusionsStates[index]}
										className='sm:text-sm text-xs mx-0'
									/>
								) : (
									' ' + inclusion
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
											onClick={() => removeInclusions(index)}
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
					value={isEditingStates.some((isEditing) => isEditing) ? '' : newInclusions}
					onChange={(e) => setNewInclusions(e.target.value)}
					placeholder='Add Inclusion'
					disabled={isEditingStates.some((isEditing) => isEditing)}
					className='sm:text-sm text-xs mx-0'
				/>
				<Button
					onClick={addInclusions}
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
