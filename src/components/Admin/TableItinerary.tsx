import React, { useEffect } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Input } from '@nextui-org/react';
import { IoAddCircleOutline, IoRemoveCircleOutline, IoCheckmarkCircleOutline } from 'react-icons/io5';
import { PiNotePencilLight } from 'react-icons/pi';
import IAddPackage from '@/types/types';

interface Itinerary {
	time: string;
	activity: string;
	isEditing: boolean;
	originalTime: string;
	originalActivity: string;
}

interface DaySchedule {
	day: string;
	itineraries: [Itinerary];
}

interface TableItineraryProps {
	readonly onChange: (e: any) => void;
	readonly form: IAddPackage;
}

export default function TableItinerary({ onChange, form }: TableItineraryProps) {
	const [day, setDay] = React.useState<DaySchedule[]>([]);
	const [time, setTime] = React.useState<Itinerary[]>([]);
	const [newDay, setNewDay] = React.useState('');
	const [newTime, setNewTime] = React.useState('');
	const [newActivity, setNewActivity] = React.useState('');
	const [isAnyRowEditing, setIsAnyRowEditing] = React.useState(false);

	const addTime = () => {
		if (newTime && newActivity) {
			const newEntry: Itinerary = {
				time: newTime,
				activity: newActivity,
				isEditing: false,
				originalTime: newTime,
				originalActivity: newActivity,
			};
			setTime([...time, newEntry]);
			//	onChange({ target: { name: 'itinerary.DaySchedule.itineraries', value: [...time, newEntry] } });
			setNewTime('');
			setNewActivity('');
		}
	};

	const removePax = (index: number) => {
		const updatedPax = [...time];
		updatedPax.splice(index, 1);
		setTime(updatedPax);
		//onChange({ target: { name: 'itinerary.DaySchedule.itineraries', value: updatedPax } });
	};

	const toggleEdit = (index: number) => {
		if (!isAnyRowEditing) {
			const updatedPax = [...time];
			updatedPax[index].isEditing = !updatedPax[index].isEditing;
			setTime(updatedPax);
			setIsAnyRowEditing(true);
		}
	};

	const handleEdit = (index: number) => {
		const updatedPax = [...time];
		const newEditedPax = newTime || updatedPax[index].originalTime;
		const newEditedRate = newActivity || updatedPax[index].originalActivity;
		updatedPax[index].time = newEditedPax;
		updatedPax[index].activity = newEditedRate;
		updatedPax[index].isEditing = false;
		updatedPax[index].originalTime = newEditedPax;
		updatedPax[index].originalActivity = newEditedRate;
		setTime(updatedPax);
		setNewTime('');
		setNewActivity('');
		//onChange({ target: { name: 'itinerary.DaySchedule.itineraries', value: updatedPax } });
		setIsAnyRowEditing(false);
	};

	return (
		<div className='flex flex-col w-full gap-4'>
			<Table aria-label='Itineraries table' removeWrapper isHeaderSticky className='max-h-40 overflow-auto'>
				<TableHeader>
					<TableColumn key='time' className='table-cell items-center'>
						Time
					</TableColumn>
					<TableColumn key='activity' className=' table-cell items-center'>
						Activity
					</TableColumn>
					<TableColumn key='action' className='justify-end w-full flex items-center'>
						Actions
					</TableColumn>
				</TableHeader>
				<TableBody>
					{time.map((time, index) => (
						<TableRow key={`${time.time}-${time.activity}`}>
							<TableCell className='font-medium'>
								{time.isEditing ? (
									<Input
										type='text'
										size='sm'
										value={newTime}
										onChange={(e) => setNewTime(e.target.value)}
										placeholder={time.originalTime}
										className=' sm:text-sm text-xs mx-0'
									/>
								) : (
									' ' + time.time
								)}
							</TableCell>
							<TableCell>
								{time.isEditing ? (
									<Input
										type='text'
										size='sm'
										value={newActivity}
										onChange={(e) => setNewActivity(e.target.value)}
										placeholder={time.originalActivity}
										className=' sm:text-sm text-xs mx-0'
									/>
								) : (
									' ' + time.activity
								)}
							</TableCell>
							<TableCell className='justify-end flex items-center'>
								{time.isEditing ? (
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
											disabled={time.isEditing}
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
					value={time.some((time) => time.isEditing) ? '' : newTime}
					onChange={(e) => setNewTime(e.target.value)}
					placeholder='Time'
					disabled={time.some((time) => time.isEditing)}
					className=' sm:text-sm text-xs mx-0'
				/>
				<Input
					type='text'
					size='sm'
					value={time.some((time) => time.isEditing) ? '' : newActivity}
					onChange={(e) => setNewActivity(e.target.value)}
					placeholder='Activity'
					disabled={time.some((time) => time.isEditing)}
					className=' sm:text-sm text-xs mx-0'
				/>
				<Button
					onClick={addTime}
					size='sm'
					isIconOnly
					className='text-chocolate hover:text-opacity-60 text-xl bg-transparent transition-all'
					disabled={time.some((time) => time.isEditing)}
				>
					<IoAddCircleOutline />
				</Button>
			</div>
		</div>
	);
}
