import NavbarGuest from '../../../components/Guest/NavbarGuest';
import ContactBar from '../../../components/Guest/ContactBar';
import SitemapFooter from '../../../components/Guest/Footer';
import PackageDetails from '../../../components/Guest/Booking/PackageDetails';
import { PrismaClient } from '@prisma/client';
import Package from '../../../types/package';

const prisma = new PrismaClient();

let packageCache: { [key: number]: Package | null } = {};

async function getPackage(id: number) {
	if (packageCache[id]) {
	  	console.log('ALREADY EXISTS')
	  	return packageCache[id];
	}
	else {
		const packageData = await prisma.package.findUnique({
			where: {
				id: id
			}
		})
		packageCache[id] = packageData
		//console.log('CACHE: ', packageCache)
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
			<NavbarGuest />
			<ContactBar />
			<div className='flex max-w-5xl'>
			<PackageDetails packageData={packageData} />
			</div>
			<SitemapFooter />
		</section>
		</main>
	);
}

export default Page;
