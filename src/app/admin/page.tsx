
import { PrismaClient } from '@prisma/client';
import Package from '@/types/package';
import PackagesPage from '@/components/Admin/PackagesPage';

const prisma = new PrismaClient();

async function getPackages(): Promise<Package[] | null> {

    console.log('PRISMA QUERY');
	const packages = await prisma.package.findMany({
		select: {
		  id: true,
		  name: true,
		  description: true,
		  type: true,
		  location: true,
		  duration: true,
		  cancellation: true,
		  availability: true,
		  language: true,
		  notice: true,
		  inclusions: true,
		  exclusions: true,
		  expectations: true,
		  photos: true,
		  ratesAndInclusions: true,
		  itinerary: true
		},
	  });
    
    prisma.$disconnect(); 
 
	return packages;
}

async function Page() {
	const packages = await getPackages()
	return (
		<main className='flex min-h-screen flex-col items-center justify-between bg-white'>
			<section className='flex flex-col w-full h-fit items-center'>
				<div className='flex max-w-5xl py-10'>
					<PackagesPage packages={packages} />
				</div>
			</section>
		</main>
	);
}

export default Page;
