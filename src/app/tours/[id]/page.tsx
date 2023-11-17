import NavbarGuest from '../../../components/Guest/NavbarGuest';
import { ContactBar } from '../../../components/Guest/ContactBar';
import SitemapFooter from '../../../components/Guest/Footer';
import PackageDetails from '../../../components/Guest/Booking/PackageDetails';
//import Package from '../../../types/package';

type Package = {
	id: number;
	name: string;
	description: string;
	type: string;
	location: string;
};

export function Page({ params }: { params: { id: number } }) {
	return (
		<main className='flex min-h-screen flex-col items-center justify-between bg-white'>
			<section className='flex flex-col w-full h-fit items-center'>
				<div className='flex flex-col w-full fixed z-30'>
					<NavbarGuest />
					<ContactBar />
				</div>
				<div className='flex w-full max-w-7xl pt-24'>
					<PackageDetails id={params.id} />
				</div>
				<SitemapFooter />
			</section>
		</main>
	);
}

export default Page;
