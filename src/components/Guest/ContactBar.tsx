import { Button } from '@nextui-org/react';
import { MdPhoneIphone, MdPhoneEnabled, MdEmail } from 'react-icons/md';
import { RiMessengerFill } from 'react-icons/ri';

export default function Header() {
	return (
		<div className='bg-chocolate w-full py-2'>
			<div className='flex flex-col sm:flex-row justify-center gap-0 sm:gap-4 lg:gap-10 mx-0 lg:mx-96'>
				<div className='flex justify-center gap-0 sm:gap-4 lg:gap-10'>
					<div>
						<Button
							variant='flat'
							endContent={<MdPhoneIphone />}
							className='font-medium text-xs lg:text-base h-5 sm:h-8'
						>
							+63 927 399 2421
						</Button>
					</div>
					<div>
						<Button
							variant='flat'
							endContent={<MdPhoneEnabled />}
							className='font-medium text-xs lg:text-base h-5 sm:h-8'
						>
							(032) 267 8923
						</Button>
					</div>
				</div>
				<div className='flex justify-center gap-0 sm:gap-4 lg:gap-10'>
					<div>
						<Button variant='flat' endContent={<MdEmail />} className=' font-medium text-xs lg:text-base h-4 sm:h-8'>
							info@virgorus.ph
						</Button>
					</div>
					<div>
						<Button
							variant='flat'
							endContent={<RiMessengerFill />}
							className=' font-medium text-xs lg:text-base h-4 sm:h-8'
						>
							Messenger
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
