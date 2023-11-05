import React, { useEffect } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Input } from '@nextui-org/react';
import { IoAddCircleOutline, IoRemoveCircleOutline, IoCheckmarkCircleOutline } from 'react-icons/io5';
import { PiNotePencilLight } from 'react-icons/pi';
import IAddPackage from '@/types/types';

interface TableExclusionsProps {
	readonly onChange: (e: any) => void;
	readonly form: IAddPackage;
}

export default function TableExclusions({ onChange, form }: TableExclusionsProps) {
	const [exclusions, setExclusions] = React.useState<string[]>([]);
	const [newExclusions, setNewExclusions] = React.useState('');
	const [isEditingStates, setIsEditingStates] = React.useState<boolean[]>([]);
	const [originalExclusionsStates, setOriginalExclusionsStates] = React.useState<string[]>([]);

	useEffect(() => {
		if (form.exclusions) {
			setExclusions(form.exclusions.filter((exclusion: string) => exclusion));
			setIsEditingStates(Array(form.exclusions.length).fill(false));
			setOriginalExclusionsStates(form.exclusions.filter((exclusion: string) => exclusion));
		}
	}, [form.exclusions]);

	const addExclusions = () => {
		if (newExclusions && !exclusions.includes(newExclusions)) {
			setExclusions([...exclusions, newExclusions]);
			setIsEditingStates([...isEditingStates, false]);
			setOriginalExclusionsStates([...originalExclusionsStates, newExclusions]);
			onChange({ target: { name: 'exclusions', value: [...exclusions, newExclusions] } });
			setNewExclusions('');
		}
	};

	const removeExclusions = (index: number) => {
		const updatedExclusions = [...exclusions];
		updatedExclusions.splice(index, 1);
		setExclusions(updatedExclusions);

		const updatedIsEditingStates = [...isEditingStates];
		updatedIsEditingStates.splice(index, 1);
		setIsEditingStates(updatedIsEditingStates);

		const updatedOriginalExclusionsStates = [...originalExclusionsStates];
		updatedOriginalExclusionsStates.splice(index, 1);
		setOriginalExclusionsStates(updatedOriginalExclusionsStates);

		onChange({ target: { name: 'exclusions', value: updatedExclusions } });
	};

	const toggleEdit = (index: number) => {
		const updatedIsEditingStates = [...isEditingStates];
		updatedIsEditingStates[index] = !isEditingStates[index];
		setIsEditingStates(updatedIsEditingStates);
	};

	const handleEdit = (index: number) => {
		const updatedExclusions = [...exclusions];
		const newEditedExclusions = newExclusions || updatedExclusions[index];

		// Check if the edited exclusion already exists in the list
		if (updatedExclusions[index] !== newEditedExclusions) {
			updatedExclusions[index] = newEditedExclusions;
			setExclusions(updatedExclusions);

			const updatedIsEditingStates = [...isEditingStates];
			updatedIsEditingStates[index] = false;
			setIsEditingStates(updatedIsEditingStates);

			const updatedOriginalExclusionsStates = [...originalExclusionsStates];
			updatedOriginalExclusionsStates[index] = newEditedExclusions;
			setOriginalExclusionsStates(updatedOriginalExclusionsStates);

			setNewExclusions('');
			onChange({ target: { name: 'exclusions', value: updatedExclusions } });
		} else {
			// Content is the same as the original, exit the edit mode
			const updatedIsEditingStates = [...isEditingStates];
			updatedIsEditingStates[index] = false;
			setNewExclusions('');
			setIsEditingStates(updatedIsEditingStates);
		}
	};

	return (
		<div className='flex flex-col gap-4 w-full'>
			<Table aria-label='Exclusions table' removeWrapper isHeaderSticky className='max-h-40 overflow-auto'>
				<TableHeader>
					<TableColumn key='exclusions' className='table-cell w-full items-center'>
						Exclusions
					</TableColumn>
					<TableColumn key='action' className='justify-end w-full flex items-center'>
						Actions
					</TableColumn>
				</TableHeader>
				<TableBody>
					{exclusions.map((exclusion, index) => (
						<TableRow key={`${exclusion}`}>
							<TableCell className='font-medium'>
								{isEditingStates[index] ? (
									<Input
										type='text'
										size='sm'
										value={newExclusions}
										onChange={(e) => setNewExclusions(e.target.value)}
										placeholder={originalExclusionsStates[index]}
										className='sm:text-sm text-xs mx-0'
									/>
								) : (
									' ' + exclusion
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
											onClick={() => removeExclusions(index)}
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
					value={isEditingStates.some((isEditing) => isEditing) ? '' : newExclusions}
					onChange={(e) => setNewExclusions(e.target.value)}
					placeholder='Add Exclusion'
					disabled={isEditingStates.some((isEditing) => isEditing)}
					className='sm:text-sm text-xs mx-0'
				/>
				<Button
					onClick={addExclusions}
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
