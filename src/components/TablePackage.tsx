'use client';
import React from 'react';
import {
	Table,
	TableHeader,
	TableColumn,
	TableBody,
	TableRow,
	TableCell,
	Input,
	Button,
	DropdownTrigger,
	Dropdown,
	DropdownMenu,
	DropdownItem,
	Chip,
	Pagination,
	Selection,
	ChipProps,
	SortDescriptor,
} from '@nextui-org/react';
import { FaSearch, FaChevronDown } from 'react-icons/fa';
import { HiDotsVertical } from 'react-icons/hi';
import ModalPackage from './ModalPackage';

const INITIAL_VISIBLE_COLUMNS = ['package', 'type', 'location', 'actions'];

type Package = typeof packages[0];

const columns = [
	{ name: 'ID', uid: 'id', sortable: true },
	{ name: 'PACKAGE', uid: 'package', sortable: true },
	{ name: 'TYPE', uid: 'type', sortable: true },
	{ name: 'LOCATION', uid: 'location', sortable: true },
	{ name: 'ACTIONS', uid: 'actions' },
];

const packages = [
	{
		id: 1,
		name: 'Oslob - Badian',
		description: 'Oslob Whale Shark + Tumalog Falls + Badian Canyoneering in Kawasan Falls Tour Package',
		type: 'Private',
		location: 'South Cebu',
	},
	{
		id: 2,
		name: 'Simala Shrine',
		description: 'Miraculous Mama Mary Church or “Birhen sa Simala',
		type: 'Private',
		location: 'Sibonga Cebu',
	},
	{
		id: 3,
		name: 'Alegria Full Course Canyoneering Adventure',
		description:
			'This adventure are for those adventurous people who really want to jump, trek, water slide in the cold water source of the Kawasan falls which is currently under renovation since the typhoon Odette which damaged some of the building structures there',
		type: 'Private',
		location: 'Alegria',
	},
];

export default function TablePackage() {
	const [filterValue, setFilterValue] = React.useState('');
	const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]));
	const [visibleColumns, setVisibleColumns] = React.useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS));
	const [rowsPerPage, setRowsPerPage] = React.useState(5);
	const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
		column: 'name',
		direction: 'ascending',
	});

	const [page, setPage] = React.useState(1);

	const hasSearchFilter = Boolean(filterValue);

	const headerColumns = React.useMemo(() => {
		if (visibleColumns === 'all') return columns;

		return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
	}, [visibleColumns]);

	const filteredItems = React.useMemo(() => {
		let filteredPackages = [...packages];

		if (hasSearchFilter) {
			filteredPackages = filteredPackages.filter((Package) =>
				Package.name.toLowerCase().includes(filterValue.toLowerCase())
			);
		}

		return filteredPackages;
	}, [hasSearchFilter, filterValue]);

	const pages = Math.ceil(filteredItems.length / rowsPerPage);

	const items = React.useMemo(() => {
		const start = (page - 1) * rowsPerPage;
		const end = start + rowsPerPage;

		return filteredItems.slice(start, end);
	}, [page, filteredItems, rowsPerPage]);

	const sortedItems = React.useMemo(() => {
		return [...items].sort((a: Package, b: Package) => {
			const first = a[sortDescriptor.column as keyof Package] as number;
			const second = b[sortDescriptor.column as keyof Package] as number;
			const cmp = first < second ? -1 : first > second ? 1 : 0;

			return sortDescriptor.direction === 'descending' ? -cmp : cmp;
		});
	}, [sortDescriptor, items]);

	const renderCell = React.useCallback((Package: Package, columnKey: React.Key) => {
		const cellValue = Package[columnKey as keyof Package];

		switch (columnKey) {
			case 'package':
				return (
					<div className='flex flex-col'>
						<p className='font-bold capitalize'>{Package.name}</p>
						<p
							className='text-tiny text-default-400 max-w-[400px] overflow-hidden'
							style={{
								display: '-webkit-box',
								WebkitLineClamp: 2, // Number of lines before truncating
								WebkitBoxOrient: 'vertical',
								lineHeight: '1rem', // Adjust to control line height
								maxHeight: '2rem', // Maximum height before truncating
							}}
						>
							{Package.description}
						</p>
					</div>
				);
			case 'type':
				return (
					<div className='flex flex-col'>
						<p className='text-small capitalize'>{cellValue}</p>
					</div>
				);
			case 'location':
				return (
					<div className='flex flex-col'>
						<p className='text-small capitalize'>{cellValue}</p>
					</div>
				);
			case 'actions':
				return (
					<div className='relative flex justify-end items-center gap-2'>
						<Dropdown>
							<DropdownTrigger>
								<Button isIconOnly size='sm' variant='light'>
									<HiDotsVertical />
								</Button>
							</DropdownTrigger>
							<DropdownMenu>
								<DropdownItem>View</DropdownItem>
								<DropdownItem>Edit</DropdownItem>
								<DropdownItem>Delete</DropdownItem>
							</DropdownMenu>
						</Dropdown>
					</div>
				);
			default:
				return cellValue;
		}
	}, []);

	const onNextPage = React.useCallback(() => {
		if (page < pages) {
			setPage(page + 1);
		}
	}, [page, pages]);

	const onPreviousPage = React.useCallback(() => {
		if (page > 1) {
			setPage(page - 1);
		}
	}, [page]);

	const onRowsPerPageChange = React.useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
		setRowsPerPage(Number(e.target.value));
		setPage(1);
	}, []);

	const onSearchChange = React.useCallback((value?: string) => {
		if (value) {
			setFilterValue(value);
			setPage(1);
		} else {
			setFilterValue('');
		}
	}, []);

	const onClear = React.useCallback(() => {
		setFilterValue('');
		setPage(1);
	}, []);

	const topContent = React.useMemo(() => {
		return (
			<div className='flex flex-col gap-4'>
				<div className='flex justify-between gap-3 items-end'>
					<Input
						isClearable
						className=' w-full sm:max-w-[44%]'
						placeholder='Search by name...'
						startContent={<FaSearch />}
						value={filterValue}
						variant='bordered'
						onClear={() => onClear()}
						onValueChange={onSearchChange}
					/>
					<div className='flex gap-3'>
						<ModalPackage />
					</div>
				</div>
				<div className='flex justify-between items-center'>
					<span className='text-default-400 text-small'>Total {packages.length} Packages</span>
					<label className='flex items-center text-default-400 text-small'>
						Rows per page:
						<select className='bg-transparent outline-none text-default-400 text-small' onChange={onRowsPerPageChange}>
							<option value='5'>5</option>
							<option value='10'>10</option>
							<option value='15'>15</option>
						</select>
					</label>
				</div>
			</div>
		);
	}, [filterValue, onSearchChange, onRowsPerPageChange, onClear]);

	const bottomContent = React.useMemo(() => {
		return (
			<div className='py-2 px-2 flex justify-between items-center'>
				<span className='w-[30%] text-small text-default-400'></span>
				<Pagination
					isCompact
					showControls
					showShadow
					color='primary'
					variant='flat'
					page={page}
					total={pages}
					onChange={setPage}
				/>
				<div className='hidden sm:flex w-[30%] justify-end gap-2'>
					<Button isDisabled={pages === 1} size='sm' variant='flat' onPress={onPreviousPage}>
						Previous
					</Button>
					<Button isDisabled={pages === 1} size='sm' variant='flat' onPress={onNextPage}>
						Next
					</Button>
				</div>
			</div>
		);
	}, [page, pages, onPreviousPage, onNextPage]);

	return (
		<Table
			aria-sort='none'
			aria-label='Packages List'
			isHeaderSticky
			bottomContent={bottomContent}
			bottomContentPlacement='outside'
			classNames={{
				wrapper: 'max-h-[384px]',
			}}
			selectedKeys={selectedKeys}
			sortDescriptor={sortDescriptor}
			topContent={topContent}
			topContentPlacement='outside'
			onSelectionChange={setSelectedKeys}
			onSortChange={setSortDescriptor}
		>
			<TableHeader columns={headerColumns} aria-sort='none'>
				{(column) => (
					<TableColumn
						aria-sort='none'
						key={column.uid}
						align={column.uid === 'actions' ? 'center' : 'start'}
						allowsSorting={column.sortable}
					>
						{column.name}
					</TableColumn>
				)}
			</TableHeader>
			<TableBody emptyContent={'No package found'} items={sortedItems} aria-sort='none'>
				{(item) => (
					<TableRow key={item.id}>{(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}</TableRow>
				)}
			</TableBody>
		</Table>
	);
}