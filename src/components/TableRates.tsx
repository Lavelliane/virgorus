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
} from '@nextui-org/react';

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
			</TableBody>
		</Table>
	);
}
