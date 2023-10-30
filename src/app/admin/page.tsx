'use client';

import Navbar from '../../components/Admin/Navbar';
import TablePackage from '../../components/Admin/TablePackage';
import { SessionProvider } from 'next-auth/react';

export default function AdminPage() {
	return (
		<SessionProvider>
			<main className='flex min-h-screen flex-col items-center justify-between bg-white'>
				<section className='flex flex-col w-full h-fit items-center'>
					<Navbar />
					<div className='flex max-w-5xl py-10'>
						<TablePackage />
					</div>
				</section>
			</main>
		</SessionProvider>
	);
}
