import React, { useEffect } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Input } from '@nextui-org/react';
import { IoAddCircleOutline, IoRemoveCircleOutline, IoCheckmarkCircleOutline } from 'react-icons/io5';
import { PiNotePencilLight } from 'react-icons/pi';
import IAddPackage from '@/types/types';

interface Exclusions {
	exclusions: string;
	isEditing: boolean;
	originalExclusions: string;
}

interface TableExclusionsProps {
	onChange: (e: any) => void;
	form: IAddPackage;
}

export default function TableExclusions({ onChange, form }: TableExclusionsProps) {
	const [exclusions, setExclusions] = React.useState<Exclusions[]>([]);
	const [newExclusions, setNewExclusions] = React.useState('');

	useEffect(() => {
		if (form.exclusions) {
			const exclusions = form.exclusions
				.filter((exclusion: string) => exclusion)
				.map((exclusion: string) => ({
					exclusions: exclusion,
					isEditing: false,
					originalExclusions: exclusion,
				}));
			setExclusions(exclusions);
		}
	}, [form.exclusions]);

	const addExclusions = () => {
		if (newExclusions) {
			const newEntry: Exclusions = {
				exclusions: newExclusions,
				isEditing: false,
				originalExclusions: newExclusions,
			};
			setExclusions([...exclusions, newEntry]);
			onChange({ target: { name: 'exclusions', value: [...exclusions, newEntry.exclusions] } });
			setNewExclusions('');
		}
	};

	const removeExclusions = (index: number) => {
		const updatedExclusions = [...exclusions];
		updatedExclusions.splice(index, 1);
		setExclusions(updatedExclusions);
		onChange({ target: { name: 'exclusions', value: updatedExclusions } });
	};

	const toggleEdit = (index: number) => {
		const updatedExclusions = [...exclusions];
		updatedExclusions[index].isEditing = !updatedExclusions[index].isEditing;
		setExclusions(updatedExclusions);
	};

	const handleEdit = (index: number) => {
		const updatedExclusions = [...exclusions];
		const newEditedExclusions = newExclusions || updatedExclusions[index].originalExclusions;
		updatedExclusions[index].exclusions = newEditedExclusions;
		updatedExclusions[index].isEditing = false;
		updatedExclusions[index].originalExclusions = newEditedExclusions;
		setExclusions(updatedExclusions);
		setNewExclusions('');
		onChange({ target: { name: 'exclusions', value: updatedExclusions } });
	};

	return (
		<div className='flex flex-col gap-4 w-full'>
			<Table aria-label='Rates table' removeWrapper isHeaderSticky className='max-h-40 overflow-auto'>
				<TableHeader>
					<TableColumn key='exclusions' className='table-cell w-full items-center'>
						Exclusions
					</TableColumn>
					<TableColumn key='action' className='justify-end w-full flex items-center'>
						Actions
					</TableColumn>
				</TableHeader>
				<TableBody>
					{exclusions.map((exclusions, index) => (
						<TableRow key={`${exclusions.exclusions}`}>
							<TableCell className='font-medium'>
								{exclusions.isEditing ? (
									<Input
										type='text'
										size='sm'
										value={newExclusions}
										onChange={(e) => setNewExclusions(e.target.value)}
										placeholder={exclusions.originalExclusions}
										className=' sm:text-sm text-xs mx-0'
									/>
								) : (
									exclusions.exclusions
								)}
							</TableCell>
							<TableCell className='justify-end flex items-center'>
								{exclusions.isEditing ? (
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
											onClick={() => removeExclusions(index)}
											isIconOnly
											size='sm'
											className='bg-transparent text-red-600 hover:text-red-400 text-xl hover:bg-transparent'
										>
											<IoRemoveCircleOutline />
										</Button>
									</div>
								) : (
									<div>
										<Button
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
			<div className='flex gap-4'>
				<Input
					type='text'
					size='sm'
					value={exclusions.some((exclusions) => exclusions.isEditing) ? '' : newExclusions}
					onChange={(e) => setNewExclusions(e.target.value)}
					placeholder='Add Exclusion'
					disabled={exclusions.some((exclusions) => exclusions.isEditing)}
					className=' sm:text-sm text-xs mx-0'
				/>
				<Button
					onClick={addExclusions}
					size='sm'
					isIconOnly
					className='text-chocolate hover:text-opacity-60 text-xl bg-transparent transition-all'
					disabled={exclusions.some((exclusions) => exclusions.isEditing)}
				>
					<IoAddCircleOutline />
				</Button>
			</div>
		</div>
	);
}
