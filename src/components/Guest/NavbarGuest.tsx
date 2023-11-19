'use client';

import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	NavbarMenuToggle,
	NavbarMenu,
	NavbarMenuItem,
	Dropdown,
	DropdownTrigger,
	DropdownMenu,
	DropdownItem,
	DropdownSection,
	Link,
	Button,
} from '@nextui-org/react';
import Image from 'next/image';
import { IoMdHome, IoMdPerson } from 'react-icons/io';
import { RiArrowDownSLine } from 'react-icons/ri';
import { fetchPackages } from '@/queries/fetchPackages';

type Package = {
	id: number;
	name: string;
	type: string;
	location: string;
};

interface PackageItem {
	key: string;
	label: string;
	sublabel?: string;
}

interface PackageSection {
	key: string;
	label: string;
}

function getPackageSections(packages: Package[]): PackageSection[] {
	const packageSections: PackageSection[] = [];

	packages.forEach((ipackage) => {
		const { location } = ipackage;

		const existingPackageSection = packageSections.find((section) => section.label === location);
		if (!existingPackageSection) {
			packageSections.push({ key: location, label: location });
		}
	});

	return packageSections;
}

export default function NavbarGuest() {
	// ################### FETCH ALL PACKAGES

	const [packages, setPackages] = useState<Package[]>([]);
	const { data: packagesData, isLoading: packagesLoading } = useQuery({
		queryKey: ['packages'],
		queryFn: fetchPackages,
	});

	useEffect(() => {
		if (!packagesLoading && packagesData) {
			setPackages(
				packagesData.map((pd: any) => ({
					id: pd.id,
					name: pd.name,
					type: pd.type,
					location: pd.location,
				}))
			);
		}
	}, [packagesLoading, packagesData]);

	const packageSections = getPackageSections(packages);
	const renderDropdownItems = (packages: Package[]) => {
		return packages.map((ipackage) => (
			<DropdownItem key={ipackage.id} className='text-black' description={ipackage.type}>
				<div className='whitespace-normal'>{ipackage.name}</div>
			</DropdownItem>
		));
	};

	// ###################

	const [isMenuOpen, setIsMenuOpen] = React.useState(false);
	const menuItems = [
		{ text: 'Home', icon: <IoMdHome /> },
		{ text: 'Packages', icon: <RiArrowDownSLine /> },
		{ text: 'Rentals', icon: <RiArrowDownSLine /> },
		{ text: 'Contact Us', icon: <IoMdPerson /> },
	];

	return (
		<Navbar className='backdrop-blur-md' maxWidth='xl'>
			<NavbarBrand>
				<Image src='https://i.ibb.co/CBsp1wQ/virgorus-main-logo.png' alt='virgorus-main-logo' width={75} height={75} />
				<span className='font-bold font-efco text-3xl'>virgorus</span>
			</NavbarBrand>
			<NavbarContent className='hidden md:flex gap-4' justify='end'>
				<NavbarItem>
					<Button
						as={Link}
						href='/home'
						variant='light'
						endContent={<IoMdHome />}
						radius='sm'
						className='font-semibold md:text-xs lg:text-lg'
					>
						Home
					</Button>
				</NavbarItem>
				<NavbarItem>
					<Dropdown>
						<DropdownTrigger>
							<Button
								variant='light'
								endContent={<RiArrowDownSLine />}
								className='font-semibold md:text-xs lg:text-lg'
								radius='sm'
							>
								Tour Packages
							</Button>
						</DropdownTrigger>
						<DropdownMenu
							items={packageSections.map((section) => ({
								key: section.key,
								label: section.label,
							}))}
							aria-label='Tour Packages'
							className='w-[380px]'
							itemClasses={{
								base: 'gap-4',
							}}
						>
							{(item: object) => {
								const section: PackageSection = item as PackageSection;
								const packageItems: Package[] = packages.map((ipackage) => ({
									id: ipackage.id,
									name: ipackage.name,
									type: ipackage.type,
									location: ipackage.location,
								}));

								return (
									<DropdownSection title={section.label} showDivider>
										{renderDropdownItems(packageItems.filter((packageItem) => packageItem.location === section.key))}
									</DropdownSection>
								);
							}}
						</DropdownMenu>
					</Dropdown>
				</NavbarItem>
				<NavbarItem>
					<Button
						variant='flat'
						color='success'
						endContent={<IoMdPerson />}
						className='font-semibold md:text-xs lg:text-lg'
					>
						About Us
					</Button>
				</NavbarItem>
			</NavbarContent>
			<NavbarMenuToggle aria-label={isMenuOpen ? 'Close menu' : 'Open menu'} className='md:hidden text-black h-8 w-8' />
			<NavbarMenu className='items-end'>
				{menuItems.map((item, index) => (
					<NavbarMenuItem key={`${item}-${index}`}>
						<Link
							color={index === menuItems.length - 1 ? 'success' : 'foreground'}
							className='w-full'
							href='#'
							size='lg'
						>
							{item.text}&nbsp;{item.icon}
						</Link>
					</NavbarMenuItem>
				))}
			</NavbarMenu>
		</Navbar>
	);
}
