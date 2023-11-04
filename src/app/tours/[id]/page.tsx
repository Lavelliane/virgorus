import NavbarGuest from '../../../components/Guest/NavbarGuest';
import ContactBar from '../../../components/Guest/ContactBar';
import SitemapFooter from '../../../components/Guest/Footer';
import PackageDetails from '../../../components/Guest/Booking/PackageDetails';
import { PrismaClient } from '@prisma/client';
import Package from '../../../types/package';
import { Spacer } from '@nextui-org/react'

const prisma = new PrismaClient();

let packageCache: { [key: number]: Package | null } = {};

async function getPackage(id: number) {
	if (packageCache[id]) {
	  	console.log('ALREADY EXISTS')
	  	return packageCache[id];
	}
	else {
		console.log('PRISMA QUERY')
		const packageData = await prisma.package.findUnique({
			where: {
				id: id
			}
		})
		prisma.$disconnect()
		console.log('QUERY DISCONNECTED')
		packageCache[id] = packageData
		console.log('ADDED TO CACHE')
		return packageData;	
	}
}

async function Page({ params }: { params: { id: number } }) {
	const id = params.id;
	const packageData = await getPackage(Number(id));
	if (!packageData) {
		return <div>Package not found</div>;
	}
	return (
		<main className='flex min-h-screen flex-col items-center justify-between bg-white'>
		<section className='flex flex-col w-full h-fit items-center'>
			<div className='flex flex-col w-full fixed z-30'>
			<NavbarGuest />
			<ContactBar />		
			</div>
			<div className='flex w-full max-w-7xl pt-24'>
			<PackageDetails packageData={packageData} />
			</div>
			<SitemapFooter />
		</section>
		</main>
	);
}

export default Page;
