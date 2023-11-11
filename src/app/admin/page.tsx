'use client';

import NavbarAdmin from '@/components/Admin/NavbarAdmin';
import { SessionProvider } from 'next-auth/react';

export default function AdminPage() {
	return (
		<SessionProvider>
			<main className='flex min-h-screen flex-col items-center justify-between bg-white'>
				<section className='flex flex-col w-full h-fit items-center'>
					<NavbarAdmin />
					<div className='flex max-w-5xl py-10'>To add dashboard</div>
				</section>
			</main>
		</SessionProvider>
	);
}
