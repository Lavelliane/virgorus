import React from 'react';
import {
	Table,
	TableHeader,
	TableColumn,
	TableBody,
	TableRow,
	TableCell,
	User,
	Chip,
	Tooltip,
	ChipProps,
	getKeyValue,
	Button,
	Input,
} from '@nextui-org/react';
import { IoAddCircleOutline } from 'react-icons/io5';

export default function TableRates() {
	const rows = [{ key: '1' }];
	const columns = [
		{ key: 'pax', label: 'No. of Pax' },
		{ key: 'rate', label: 'Rate' },
		{ key: 'actions', label: 'Actions' },
	];

	return (
		<Table aria-label='Rates table'>
			<TableHeader columns={columns}>
				{(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
			</TableHeader>
			<TableBody items={rows}>
				{(item) => (
					<TableRow key={item.key}>{(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}</TableRow>
				)}
				<TableRow>
					<TableCell>
						<Input
							type='text'
							value={activity.some((ac) => ac.isEditing) ? '' : newActivity}
							onChange={(e) => setNewActivity(e.target.value)}
							placeholder='Activity Name'
							disabled={activity.some((ac) => ac.isEditing)}
							className=' sm:text-sm text-xs mx-0'
						/>
					</TableCell>
					<TableCell>
						<Input
							type='text'
							value={activity.some((ac) => ac.isEditing) ? '' : newTimeSlot}
							onChange={(e) => setNewTimeSlot(e.target.value)}
							placeholder='Time Slot'
							disabled={activity.some((ac) => ac.isEditing)}
							className=' sm:text-sm text-xs mx-0'
						/>
					</TableCell>
					<TableCell className='justify-end flex items-center'>
						<Button
							onClick={addActivity}
							className='p-4 m-0 bg-transparent text-purple-600 hover:text-purple-400 text-xl hover:bg-transparent'
							disabled={activity.some((ac) => ac.isEditing)}
						>
							<IoAddCircleOutline />
						</Button>
					</TableCell>
				</TableRow>
			</TableBody>
		</Table>
	);
}
