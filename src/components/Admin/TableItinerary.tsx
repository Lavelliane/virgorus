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
	Accordion,
	AccordionItem,
} from '@nextui-org/react';
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
	itineraries: Itinerary[];
}

interface TableItineraryProps {
	readonly onChange: (e: any) => void;
	readonly form: IAddPackage;
}

export default function TableItinerary({ onChange, form }: TableItineraryProps) {
	const [day, setDay] = React.useState<DaySchedule[]>([]);
	const [time, setTime] = React.useState<Itinerary[]>([]);
	const [newDay, setNewDay] = React.useState('Day 1');
	const [newTime, setNewTime] = React.useState('');
	const [newActivity, setNewActivity] = React.useState('');
	const [isAnyRowEditing, setIsAnyRowEditing] = React.useState(false);

	// useEffect(() => {
	// 	// Sample data
	// 	const daySchedules: DaySchedule[] = [
	// 		{
	// 			day: 'Day 1',
	// 			itineraries: [
	// 				{
	// 					time: '10:00 AM',
	// 					activity: 'Breakfast',
	// 					isEditing: false,
	// 					originalTime: '',
	// 					originalActivity: '',
	// 				},
	// 				{
	// 					time: '02:00 PM',
	// 					activity: 'Sightseeing',
	// 					isEditing: false,
	// 					originalTime: '',
	// 					originalActivity: '',
	// 				},
	// 				// Add more itineraries as needed
	// 			],
	// 		},
	// 		{
	// 			day: 'Day 2',
	// 			itineraries: [
	// 				{
	// 					time: '09:30 AM',
	// 					activity: 'Hiking',
	// 					isEditing: false,
	// 					originalTime: '',
	// 					originalActivity: '',
	// 				},
	// 				{
	// 					time: '01:00 PM',
	// 					activity: 'Lunch',
	// 					isEditing: false,
	// 					originalTime: '',
	// 					originalActivity: '',
	// 				},
	// 				// Add more itineraries as needed
	// 			],
	// 		},
	// 		// Add more day schedules as needed
	// 	];

	// 	setDay(daySchedules);
	// }, []);

	const addDay = () => {
		if (newDay) {
			const newDaySchedule: DaySchedule = {
				day: newDay,
				itineraries: [],
			};

			setDay([...day, newDaySchedule]);
			const dayString = 'Day ' + String(Number(newDaySchedule.day.split(' ')[1]) + 1);
			setNewDay(dayString);
		}
	};
	const addTime = (dayIndex: string) => {
		if (newTime && newActivity) {
			const newEntry: Itinerary = {
				time: newTime,
				activity: newActivity,
				isEditing: false,
				originalTime: newTime,
				originalActivity: newActivity,
			};

			// Find the index of the day that matches the selected day (dayIndex)
			const matchingDayIndex = day.findIndex((daySchedule) => daySchedule.day === dayIndex);

			if (matchingDayIndex !== -1) {
				// Create a copy of the day state and update the itineraries for the matching day
				const updatedDay = [...day];
				updatedDay[matchingDayIndex].itineraries = [...updatedDay[matchingDayIndex].itineraries, newEntry];

				// Update the day state
				setDay(updatedDay);
			}

			setNewTime('');
			setNewActivity('');
		}
	};

	const removeTime = (dayIndex: number, timeIndex: number) => {
		const updatedTime = [...time];
		updatedTime.splice(timeIndex, 1);
		setTime(updatedTime);
		//onChange({ target: { name: 'itinerary.DaySchedule.itineraries', value: updatedItinerary } });
	};

	const removeDay = (dayIndex: number) => {
		const updatedDay = [...day];
		updatedDay.splice(dayIndex, 1);
		setNewDay('Day ' + String(Number(updatedDay[updatedDay.length - 1].day.split(' ')[1]) + 1));
		setDay(updatedDay);
	};

	const toggleEdit = (dayIndex: number, timeIndex: number) => {
		if (!isAnyRowEditing) {
			const updatedItinerary = [...day];
			updatedItinerary[dayIndex].itineraries[timeIndex].isEditing = !updatedItinerary[dayIndex].itineraries[timeIndex]
				.isEditing;
			setDay(updatedItinerary);
			setIsAnyRowEditing(true);
		}
	};

	const handleEdit = (dayIndex: number, timeIndex: number) => {
		const updatedItinerary = [...time];
		const newEditedItinerary = newDay || updatedItinerary[timeIndex].originalTime;
		const newEditedRate = newActivity || updatedItinerary[timeIndex].originalActivity;
		updatedItinerary[timeIndex].time = newEditedItinerary;
		updatedItinerary[timeIndex].activity = newEditedRate;
		updatedItinerary[timeIndex].isEditing = false;
		updatedItinerary[timeIndex].originalTime = newEditedItinerary;
		updatedItinerary[timeIndex].originalActivity = newEditedRate;
		setTime(updatedItinerary);
		setNewTime('');
		setNewActivity('');
		//onChange({ target: { name: 'itinerary.DaySchedule.itineraries', value: updatedItinerary } });
		setIsAnyRowEditing(false);
	};
	console.log(day);
	return (
		<div className='flex flex-col w-full gap-4'>
			<Accordion isCompact variant='bordered' defaultExpandedKeys={['0']}>
				{day.map((daySchedule, dayIndex) => (
					<AccordionItem
						key={daySchedule.day}
						aria-label={'day' + dayIndex}
						title={
							<div className='flex items-center gap-4'>
								<span className='text-sm'>{daySchedule.day}</span>
								{day.length - 1 === dayIndex && dayIndex !== 0 && (
									<input
										className='bg-red-600 rounded-lg p-2 text-sm text-white shadow-sm cursor-pointer hover:bg-red-500 hover:shadow-md'
										onClick={() => removeDay(dayIndex)}
										type='button'
										value='Remove'
									/>
								)}
							</div>
						}
						className='text-sm'
					>
						<div className='flex flex-col w-full gap-4 py-4 p-1'>
							<Table aria-label='Itineraries table' removeWrapper isHeaderSticky className='max-h-96 overflow-auto'>
								<TableHeader>
									<TableColumn key='time' className='table-cell w-1/2 items-center'>
										Time
									</TableColumn>
									<TableColumn key='activity' className=' table-cell w-1/2 items-center'>
										<span className='ml-4'>Activity</span>
									</TableColumn>
									<TableColumn key='action' className='justify-end w-full flex items-center'>
										Actions
									</TableColumn>
								</TableHeader>
								<TableBody>
									{daySchedule.itineraries.map((itinerary, timeIndex) => (
										<TableRow key={`${itinerary.time}-${itinerary.activity}`}>
											<TableCell className='font-medium'>
												{itinerary.isEditing ? (
													<Input
														type='text'
														size='sm'
														value={newTime}
														onChange={(e) => setNewTime(e.target.value)}
														placeholder={itinerary.originalTime}
														className=' sm:text-sm text-xs mx-0'
													/>
												) : (
													' ' + itinerary.time
												)}
											</TableCell>
											<TableCell>
												{itinerary.isEditing ? (
													<Input
														type='text'
														size='sm'
														value={newActivity}
														onChange={(e) => setNewActivity(e.target.value)}
														placeholder={itinerary.originalActivity}
														className=' sm:text-sm text-xs mx-0'
													/>
												) : (
													' ' + itinerary.activity
												)}
											</TableCell>
											<TableCell className='justify-end flex items-center'>
												{itinerary.isEditing ? (
													<div className='flex'>
														<Button
															onClick={() => toggleEdit(dayIndex, timeIndex)}
															isIconOnly
															size='sm'
															className='bg-transparent text-green-700 hover:text-green-600 text-xl hover:bg-transparent'
														>
															<IoCheckmarkCircleOutline />
														</Button>
														<Button
															onClick={() => toggleEdit(dayIndex, timeIndex)}
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
															disabled={itinerary.isEditing}
															onClick={() => toggleEdit(dayIndex, timeIndex)}
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
									onClick={() => addTime(daySchedule.day)}
									size='sm'
									isIconOnly
									className='text-chocolate hover:text-opacity-60 text-xl bg-transparent transition-all'
									disabled={time.some((time) => time.isEditing)}
								>
									<IoAddCircleOutline />
								</Button>
							</div>
						</div>
					</AccordionItem>
				))}
			</Accordion>
			<Button onClick={addDay} size='sm' variant='shadow' color='secondary'>
				ADD DAY
			</Button>
		</div>
	);
}
