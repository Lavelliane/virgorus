import NavbarGuest from '../../../components/Guest/NavbarGuest';
import ContactBar from '../../../components/Guest/ContactBar';
import SitemapFooter from '../../../components/Guest/Footer';
import PackageDetails from '../../../components/Guest/Booking/PackageDetails';

const Page = ({ params }: { params: { id: string } }) => {
	return (
		<main className='flex min-h-screen flex-col items-center justify-between bg-white'>
			<section className='flex flex-col w-full h-fit items-center'>
				<NavbarGuest />
				<ContactBar />
				<div className='flex max-w-5xl'>
					<PackageDetails />
				</div>
				<SitemapFooter />
			</section>
		</main>
	);
};

export default Page;
