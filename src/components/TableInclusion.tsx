import React, { useEffect } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Input } from '@nextui-org/react';
import { IoAddCircleOutline, IoRemoveCircleOutline, IoCheckmarkCircleOutline } from 'react-icons/io5';
import { PiNotePencilLight } from 'react-icons/pi';
import IAddPackage from '@/types/types';

interface Inclusions {
	inclusions: string;
	isEditing: boolean;
	originalInclusions: string;
}

interface TableInclusionsProps {
	onChange: (e: any) => void;
	form: IAddPackage;
}

export default function TableInclusions({ onChange, form }: TableInclusionsProps) {
	const [inclusions, setInclusions] = React.useState<Inclusions[]>([]);
	const [newInclusions, setNewInclusions] = React.useState('');

	useEffect(() => {
		if (form.inclusions) {
			const inclusions = form.inclusions
				.filter((inclusion: string) => inclusion)
				.map((inclusion: string) => ({
					inclusions: inclusion,
					isEditing: false,
					originalInclusions: inclusion,
				}));
			setInclusions(inclusions);
		}
	}, [form.inclusions]);

	const addInclusions = () => {
		if (newInclusions) {
			const newEntry: Inclusions = {
				inclusions: newInclusions,
				isEditing: false,
				originalInclusions: newInclusions,
			};
			setInclusions([...inclusions, newEntry]);
			onChange({ target: { name: 'inclusions', value: [...inclusions, newEntry.inclusions] } });
			setNewInclusions('');
		}
	};

	const removeInclusions = (index: number) => {
		const updatedInclusions = [...inclusions];
		updatedInclusions.splice(index, 1);
		setInclusions(updatedInclusions);
		onChange({ target: { name: 'inclusions', value: updatedInclusions } });
	};

	const toggleEdit = (index: number) => {
		const updatedInclusions = [...inclusions];
		updatedInclusions[index].isEditing = !updatedInclusions[index].isEditing;
		setInclusions(updatedInclusions);
	};

	const handleEdit = (index: number) => {
		const updatedInclusions = [...inclusions];
		const newEditedInclusions = newInclusions || updatedInclusions[index].originalInclusions;
		updatedInclusions[index].inclusions = newEditedInclusions;
		updatedInclusions[index].isEditing = false;
		updatedInclusions[index].originalInclusions = newEditedInclusions;
		setInclusions(updatedInclusions);
		setNewInclusions('');
		onChange({ target: { name: 'inclusions', value: updatedInclusions } });
	};

	return (
		<div className='flex flex-col gap-4 w-full'>
			<Table aria-label='Rates table' removeWrapper isHeaderSticky className='max-h-40 overflow-auto'>
				<TableHeader>
					<TableColumn key='inclusions' className='table-cell w-full items-center'>
						Inclusions
					</TableColumn>
					<TableColumn key='action' className='justify-end w-full flex items-center'>
						Actions
					</TableColumn>
				</TableHeader>
				<TableBody>
					{inclusions.map((inclusions, index) => (
						<TableRow key={`${inclusions.inclusions}`}>
							<TableCell className='font-medium'>
								{inclusions.isEditing ? (
									<Input
										type='text'
										size='sm'
										value={newInclusions}
										onChange={(e) => setNewInclusions(e.target.value)}
										placeholder={inclusions.originalInclusions}
										className=' sm:text-sm text-xs mx-0'
									/>
								) : (
									inclusions.inclusions
								)}
							</TableCell>
							<TableCell className='justify-end flex items-center'>
								{inclusions.isEditing ? (
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
											onClick={() => removeInclusions(index)}
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
					value={inclusions.some((inclusions) => inclusions.isEditing) ? '' : newInclusions}
					onChange={(e) => setNewInclusions(e.target.value)}
					placeholder='Add Inclusion'
					disabled={inclusions.some((inclusions) => inclusions.isEditing)}
					className=' sm:text-sm text-xs mx-0'
				/>
				<Button
					onClick={addInclusions}
					size='sm'
					isIconOnly
					className='text-chocolate hover:text-opacity-60 text-xl bg-transparent transition-all'
					disabled={inclusions.some((inclusions) => inclusions.isEditing)}
				>
					<IoAddCircleOutline />
				</Button>
			</div>
		</div>
	);
}
