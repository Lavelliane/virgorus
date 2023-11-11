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
	Spacer,
} from '@nextui-org/react';
import { IoAddCircleOutline, IoRemoveCircleOutline, IoCheckmarkCircleOutline } from 'react-icons/io5';
import { PiNotePencilLight } from 'react-icons/pi';
import IAddPackage from '@/types/types';

interface Itinerary {
	time: string;
	activity: string;
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
	const [isEditingStates, setIsEditingStates] = React.useState<boolean[]>([]);
	const [originalTimeStates, setOriginalTimeStates] = React.useState<string[]>([]);
	const [originalActivityStates, setOriginalActivityStates] = React.useState<string[]>([]);
	const [newDay, setNewDay] = React.useState('Day 1');
	const [newTime, setNewTime] = React.useState('');
	const [newActivity, setNewActivity] = React.useState('');

	useEffect(() => {
		if (form?.itinerary) {
			const updatedItinerary = form.itinerary
				.filter((item) => item.day && item.itineraries)
				.map((item) => ({
					day: item.day,
					itineraries: item.itineraries
						.filter((innerItem) => innerItem.time && innerItem.activity)
						.map((innerItem) => ({
							time: innerItem.time,
							activity: innerItem.activity,
						})),
				}));

			// Assuming you're using some kind of state to store the form
			setDay(updatedItinerary);
			setIsEditingStates(Array(form.itinerary.length).fill(false));
			setOriginalTimeStates(
				updatedItinerary
					.map((day) => day.itineraries.map((time) => time.time))
					.flat()
					.filter((item: string) => item)
			);
			setOriginalActivityStates(
				updatedItinerary
					.map((day) => day.itineraries.map((time) => time.activity))
					.flat()
					.filter((item: string) => item)
			);
		}
	}, [form?.itinerary]);

	const addDay = () => {
		if (newDay) {
			const existingEntry = day.find((daySchedule) => daySchedule.day === newDay);

			if (existingEntry) {
				console.log('Entry already exists');
			} else {
				const newDaySchedule: DaySchedule = {
					day: newDay,
					itineraries: [],
				};

				setDay([...day, newDaySchedule]);
				const dayString = 'Day ' + String(Number(newDaySchedule.day.split(' ')[1]) + 1);
				setNewDay(dayString);
				setIsEditingStates([...isEditingStates, false]);
				onChange({ target: { name: 'itinerary', value: [...day, newDaySchedule] } });
			}
		}
	};

	console.log(day);
	const addItinerary = (dayIndex: number) => {
		if (newTime && newActivity) {
			const existingEntry = day[dayIndex].itineraries.find((itinerary) => itinerary.time === newTime);
			console.log(dayIndex);
			console.log(existingEntry);
			if (existingEntry) {
				console.log('Entry already exists for this time on the specified day');
			} else {
				const newEntry: Itinerary = {
					time: newTime,
					activity: newActivity,
				};

				const updatedDay = [...day];
				updatedDay[+dayIndex].itineraries.push(newEntry);

				setDay(updatedDay);
				setIsEditingStates([...isEditingStates, false]);
				setOriginalTimeStates([...originalTimeStates, newTime]);
				setOriginalActivityStates([...originalActivityStates, newActivity]);
				onChange({ target: { name: 'itinerary', value: updatedDay } });
				setNewTime('');
				setNewActivity('');
			}
		}
	};

	const removeDay = (dayIndex: number) => {
		const updatedDay = [...day];
		updatedDay.splice(dayIndex, 1);
		setNewDay('Day ' + String(Number(updatedDay[updatedDay.length - 1].day.split(' ')[1]) + 1));
		setDay(updatedDay);

		const updatedIsEditingStates = [...isEditingStates];
		updatedIsEditingStates.splice(dayIndex, 1);
		setIsEditingStates(updatedIsEditingStates);

		onChange({ target: { name: 'itinerary', value: updatedDay } });
	};

	const toggleEditItinerary = (dayIndex: number, timeIndex: number) => {
		const updateIsEditingStates = [...isEditingStates];
		updateIsEditingStates[timeIndex] = !updateIsEditingStates[timeIndex];
		setIsEditingStates(updateIsEditingStates);
	};

	const handleEditItinerary = (dayIndex: number, timeIndex: number) => {
		const updatedDay = [...day];
		const newEditedTime = newTime || updatedDay[dayIndex].itineraries[timeIndex].time;
		const newEditedActivity = newActivity || updatedDay[dayIndex].itineraries[timeIndex].activity;

		if (
			updatedDay[dayIndex].itineraries[timeIndex].time !== newEditedTime ||
			updatedDay[dayIndex].itineraries[timeIndex].activity !== newEditedActivity
		) {
			updatedDay[dayIndex].itineraries[timeIndex].time = newEditedTime;
			updatedDay[dayIndex].itineraries[timeIndex].activity = newEditedActivity;
			setDay(updatedDay);

			const updatedIsEditingStates = [...isEditingStates];
			updatedIsEditingStates[timeIndex] = false;
			setIsEditingStates(updatedIsEditingStates);

			const updatedOriginalTimeStates = [...originalTimeStates];
			updatedOriginalTimeStates[timeIndex] = newEditedTime;
			setOriginalTimeStates(updatedOriginalTimeStates);

			const updatedOriginalActivityStates = [...originalActivityStates];
			updatedOriginalActivityStates[timeIndex] = newEditedActivity;
			setOriginalActivityStates(updatedOriginalActivityStates);

			setNewTime('');
			setNewActivity('');
			onChange({ target: { name: 'itinerary', value: updatedDay } });
		} else {
			const updatedIsEditingStates = [...isEditingStates];
			updatedIsEditingStates[timeIndex] = false;
			setIsEditingStates(updatedIsEditingStates);
			setNewTime('');
			setNewActivity('');
		}
	};

	const removeItinerary = (dayIndex: number, timeIndex: number) => {
		const updatedDay = [...day];
		updatedDay[dayIndex].itineraries.splice(timeIndex, 1);
		setDay(updatedDay);

		const updatedIsEditingStates = [...isEditingStates];
		updatedIsEditingStates.splice(dayIndex, 1);
		setIsEditingStates(updatedIsEditingStates);

		const updatedOriginalTimeStates = [...originalTimeStates];
		updatedOriginalTimeStates.splice(dayIndex, 1);
		setOriginalTimeStates(updatedOriginalTimeStates);

		const updatedOriginalActivityStates = [...originalActivityStates];
		updatedOriginalActivityStates.splice(dayIndex, 1);
		setOriginalActivityStates(updatedOriginalActivityStates);

		onChange({ target: { name: 'itinerary', value: updatedDay } });
	};

	return (
		<div className='flex flex-col w-full gap-4'>
			<div className={`w-full h-fit ${day.length !== 0 ? 'flex' : 'hidden'}`}>
				<Accordion isCompact variant='bordered' defaultExpandedKeys={['0']}>
					{day.map((daySchedule, dayIndex) => (
						<AccordionItem
							key={`${dayIndex}`}
							aria-label={'day' + dayIndex}
							title={
								<div className='flex items-center gap-4'>
									<span className='text-sm h-8 items-center flex'>{daySchedule.day}</span>
									{day.length - 1 === dayIndex && dayIndex !== 0 && (
										<input
											className='bg-danger rounded-lg p-2 text-sm text-white shadow-sm cursor-pointer hover:bg-opacity-70 hover:shadow-md'
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
											<TableRow key={`${timeIndex}-${itinerary.time}-${itinerary.activity}`}>
												<TableCell className='font-medium'>
													{isEditingStates[timeIndex] ? (
														<Input
															type='text'
															size='sm'
															value={newTime}
															onChange={(e) => setNewTime(e.target.value)}
															placeholder={originalTimeStates[timeIndex]}
															className=' sm:text-sm text-xs mx-0'
														/>
													) : (
														' ' + itinerary.time
													)}
												</TableCell>
												<TableCell>
													{isEditingStates[timeIndex] ? (
														<Input
															type='text'
															size='sm'
															value={newActivity}
															onChange={(e) => setNewActivity(e.target.value)}
															placeholder={originalActivityStates[timeIndex]}
															className=' sm:text-sm text-xs mx-0'
														/>
													) : (
														' ' + itinerary.activity
													)}
												</TableCell>
												<TableCell className='justify-end flex items-center'>
													{isEditingStates[timeIndex] ? (
														<div className='flex'>
															<Button
																onClick={() => handleEditItinerary(dayIndex, timeIndex)}
																isIconOnly
																size='sm'
																className='bg-transparent text-green-700 hover:text-green-600 text-xl hover:bg-transparent'
															>
																<IoCheckmarkCircleOutline />
															</Button>
															<Button
																onClick={() => removeItinerary(dayIndex, timeIndex)}
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
																onClick={() => toggleEditItinerary(dayIndex, timeIndex)}
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
								<div className='flex gap-2 items-center'>
									<Input
										type='text'
										size='sm'
										value={isEditingStates.some((isEditing) => isEditing) ? '' : newTime}
										onChange={(e) => setNewTime(e.target.value)}
										placeholder='Time'
										disabled={isEditingStates.some((isEditing) => isEditing)}
										className=' sm:text-sm text-xs mx-0 w-40'
									/>
									<Input
										type='text'
										size='sm'
										value={isEditingStates.some((isEditing) => isEditing) ? '' : newActivity}
										onChange={(e) => setNewActivity(e.target.value)}
										placeholder='Activity'
										disabled={isEditingStates.some((isEditing) => isEditing)}
										className=' sm:text-sm text-xs mx-0'
									/>
									<Button
										onClick={() => addItinerary(parseInt(daySchedule.day.split(' ')[1]) - 1)}
										size='sm'
										isIconOnly
										className='text-chocolate hover:text-opacity-60 text-xl bg-transparent transition-all'
										disabled={isEditingStates.some((isEditing) => isEditing)}
										type='submit'
									>
										<IoAddCircleOutline />
									</Button>
									<Spacer x={2} />
								</div>
							</div>
						</AccordionItem>
					))}
				</Accordion>
			</div>
			<Button onClick={addDay} size='sm' variant='shadow' color='secondary'>
				ADD DAY
			</Button>
		</div>
	);
}
