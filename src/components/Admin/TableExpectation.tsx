import React, { useEffect } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Input } from '@nextui-org/react';
import { IoAddCircleOutline, IoRemoveCircleOutline, IoCheckmarkCircleOutline } from 'react-icons/io5';
import { PiNotePencilLight } from 'react-icons/pi';
import IAddPackage from '@/types/types';

interface Expectations {
	expectations: string;
	isEditing: boolean;
	originalExpectations: string;
}

interface TableExpectationsProps {
	onChange: (e: any) => void;
	form: IAddPackage;
}

export default function TableExpectations({ onChange, form }: TableExpectationsProps) {
	const [expectations, setExpectations] = React.useState<Expectations[]>([]);
	const [newExpectations, setNewExpectations] = React.useState('');

	useEffect(() => {
		if (form.expectations) {
			const expectations = form.expectations
				.filter((expectation: string) => expectation)
				.map((expectation: string) => ({
					expectations: expectation,
					isEditing: false,
					originalExpectations: expectation,
				}));
			setExpectations(expectations);
		}
	}, [form.expectations]);

	const addExpectations = () => {
		if (newExpectations) {
			const newEntry: Expectations = {
				expectations: newExpectations,
				isEditing: false,
				originalExpectations: newExpectations,
			};
			setExpectations([...expectations, newEntry]);
			onChange({ target: { name: 'expectations', value: [...expectations, newEntry.expectations] } });
			setNewExpectations('');
		}
	};

	const removeExpectations = (index: number) => {
		const updatedExpectations = [...expectations];
		updatedExpectations.splice(index, 1);
		setExpectations(updatedExpectations);
		onChange({ target: { name: 'expectations', value: updatedExpectations } });
	};

	const toggleEdit = (index: number) => {
		const updatedExpectations = [...expectations];
		updatedExpectations[index].isEditing = !updatedExpectations[index].isEditing;
		setExpectations(updatedExpectations);
	};

	const handleEdit = (index: number) => {
		const updatedExpectations = [...expectations];
		const newEditedExpectations = newExpectations || updatedExpectations[index].originalExpectations;
		updatedExpectations[index].expectations = newEditedExpectations;
		updatedExpectations[index].isEditing = false;
		updatedExpectations[index].originalExpectations = newEditedExpectations;
		setExpectations(updatedExpectations);
		setNewExpectations('');
		onChange({ target: { name: 'expectations', value: updatedExpectations } });
	};

	return (
		<div className='flex flex-col gap-4 w-full'>
			<Table aria-label='Rates table' removeWrapper isHeaderSticky className='max-h-40 overflow-auto'>
				<TableHeader>
					<TableColumn key='expectations' className='table-cell w-full items-center'>
						Expectations
					</TableColumn>
					<TableColumn key='action' className='justify-end w-full flex items-center'>
						Actions
					</TableColumn>
				</TableHeader>
				<TableBody>
					{expectations.map((expectations, index) => (
						<TableRow key={`${expectations.expectations}`}>
							<TableCell className='font-medium'>
								{expectations.isEditing ? (
									<Input
										type='text'
										size='sm'
										value={newExpectations}
										onChange={(e) => setNewExpectations(e.target.value)}
										placeholder={expectations.originalExpectations}
										className=' sm:text-sm text-xs mx-0'
									/>
								) : (
									expectations.expectations
								)}
							</TableCell>
							<TableCell className='justify-end flex items-center'>
								{expectations.isEditing ? (
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
											onClick={() => removeExpectations(index)}
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
					value={expectations.some((expectations) => expectations.isEditing) ? '' : newExpectations}
					onChange={(e) => setNewExpectations(e.target.value)}
					placeholder='Add Expectation'
					disabled={expectations.some((expectations) => expectations.isEditing)}
					className=' sm:text-sm text-xs mx-0'
				/>
				<Button
					onClick={addExpectations}
					size='sm'
					isIconOnly
					className='text-chocolate hover:text-opacity-60 text-xl bg-transparent transition-all'
					disabled={expectations.some((expectations) => expectations.isEditing)}
				>
					<IoAddCircleOutline />
				</Button>
			</div>
		</div>
	);
}
