import React from 'react'
import NavBar from '../NavBar'
import ContactBar from '../ContactBar'
import { PackageDetails } from './PackageDetails'
import { Spacer } from "@nextui-org/react";
import SitemapFooter from '../Footer';

const BookingPage = () => {
  return (
    <div className='w-full bg-white'>
      <div className='w-full flex flex-col items-center'>
        <div className='fixed z-30 w-full'>
          <NavBar />
          <ContactBar />
        </div>
        <div className='flex flex-col max-w-5xl'>
          <Spacer y={24} />
          <PackageDetails />
        </div>
        <SitemapFooter />
      </div>
    </div>
  );
}

export default BookingPage