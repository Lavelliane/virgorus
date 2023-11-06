'use client';

import TablePackage from '../../components/Admin/TablePackage';
import { SessionProvider } from 'next-auth/react';
import Package from '@/types/package';
import NavbarAdmin from './NavbarAdmin';

export const defaultPackage: Package = {
	id: undefined,
	name: '',
	description: '',
	type: '',
	location: '',
	duration: '',
	cancellation: '',
	availability: '',
	language: '',
	notice: '',
	expectations: [],
	photos: [],
	inclusions: [],
	exclusions: [],
	ratesAndInclusions: [],
  };
  

export default function PackagesPage({ packages }: { packages: Package[] | null }) {
	packages = packages || [defaultPackage];
	return (
		<SessionProvider>
			<main className='flex min-h-screen flex-col items-center justify-between bg-white'>
				<section className='flex flex-col w-full h-fit items-center'>
					<NavbarAdmin />
					<div className='flex max-w-5xl py-10'>
						<TablePackage packages={packages} />
					</div>
				</section>
			</main>
		</SessionProvider>
	);
}
