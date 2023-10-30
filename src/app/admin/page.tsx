'use client';

import TablePackage from '../../components/TablePackage';

export default function AdminPage() {
	return (
		<main className='flex min-h-screen flex-col items-center justify-between p-10'>
			<section className='flex max-w-[960px] h-fit'>
				<TablePackage />
			</section>
		</main>
	);
}
