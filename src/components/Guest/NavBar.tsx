"use client"

import React from "react";
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
	Button
  } from "@nextui-org/react";
import Image from 'next/image'
import { IoMdHome, IoMdPerson } from 'react-icons/io'
import { RiArrowDownSLine } from 'react-icons/ri'
import { jomhuria } from '../../utils/fonts'
import ContactBar from './ContactBar'


interface PackageItem {
	key: string;
	label: string;
	sublabel?: string;
}

interface PackageSection {
	key: string;
	label: string;
}

export default function NavBar() {
	const [isMenuOpen, setIsMenuOpen] = React.useState(false);
	const menuItems = [
		{ text: "Home", icon: <IoMdHome /> },
		{ text: "Packages", icon: <RiArrowDownSLine /> },
		{ text: "Rentals", icon: <RiArrowDownSLine /> },
		{ text: "Contact Us", icon: <IoMdPerson /> },
	  ];
	
	// ################### TEMPS

	const northCebuPackages: PackageItem[] = [
		{ key: "1", label: "Private Cebu Safari and Adventure Park Tour Package", sublabel: "Private"},
		{ key: "2", label: "Kalanggaman Island Day Tour Package from Cebu City via Malapascua", sublabel: "Private"},
		{ key: "3", label: "Malapascua Island Day Tour Package from Cebu City", sublabel: "Shared"},
		{ key: "4", label: "Bantayan Island Day Tour with Virgin Island Hopping", sublabel: "Shared"},
	];
	const southCebuPackages: PackageItem[] = [
		{ key: "1", label: "Oslob Whale Shark + Sumilon Sandbar + Kawasan Falls Tour Package", sublabel: "Private"},
		{ key: "2", label: "Cebu Mountain Tour and Adventure", sublabel: "Shared"},
		{ key: "3", label: "Osmeña Peak and Badian Canyoneering Tour Package", sublabel: "Shared"},
		{ key: "4", label: "Pescador Island Hopping with Sardines & Turtle + Badian Canyoneering with Kawasan Falls Tour", sublabel: "Shared"},
	];
	const packageSections: PackageSection[] = [
		{ key: "1", label: "North Cebu Tours"},
		{ key: "2", label: "South Cebu Tours"},
	];

	// ###################

	const renderDropdownItems = (packageList: PackageItem[]) => {
		return packageList.map((item) => (
		  <DropdownItem key={item.key} className="text-black truncate" description={item.sublabel}>
			{item.label}
		  </DropdownItem>
		));
	};

  return (
	<Navbar className="bg-white" maxWidth="xl">
		<NavbarBrand>
			<Image 
			src="https://i.ibb.co/CBsp1wQ/virgorus-main-logo.png"
			alt="virgorus-main-logo"
			width={75}
			height={75}
			/>
			<p className={`${jomhuria.variable} font-serif text-6xl text-black pt-1`}>Virgorus</p>
		</NavbarBrand>
		<NavbarContent className="hidden md:flex gap-4" justify="end">
			<NavbarItem>
				<Button 
					variant="light" 
					endContent={<IoMdHome/>} 
					radius="sm"
					className="font-semibold md:text-xs lg:text-lg"
				>
					<Link color="foreground" href="/home" className="font-semibold md:text-xs lg:text-lg">Home</Link>
				</Button>				
			</NavbarItem>
			<NavbarItem>
				<Dropdown
					classNames={{
						base: "w-96"
					}}
				>
					<DropdownTrigger>
						<Button
							variant="light"
							endContent={<RiArrowDownSLine/>}
							className="font-semibold md:text-xs lg:text-lg"
							radius="sm"
						>
							Tour Packages
						</Button>
					</DropdownTrigger>
					<DropdownMenu items={packageSections}>
					{(section) => {
						let packageList: PackageSection[] = [];
						switch (section.key) {
						case "1":
							packageList = northCebuPackages;
							break;
						case "2":
							packageList = southCebuPackages;
							break;
						default:
							packageList = [];
						}

						return (
						<DropdownSection title={section.label} showDivider>
							{renderDropdownItems(packageList)}
						</DropdownSection>
						);
					}}
					</DropdownMenu>
				</Dropdown>
			</NavbarItem>
			<NavbarItem>
				<Dropdown>
						<DropdownTrigger>
							<Button
								variant="light"
								endContent={<RiArrowDownSLine/>}
								className="font-semibold md:text-xs lg:text-lg"
								radius="sm"
								disableRipple
								isDisabled
							>
								Rentals
							</Button>
						</DropdownTrigger>
						<DropdownMenu items={packageSections}>
							{(item) => (
							<DropdownSection title="South Cebu Tours" showDivider>
								<DropdownItem
									key={item.key}
									className="text-black"
								>
									{item.label}
								</DropdownItem>
							</DropdownSection>
							)}
						</DropdownMenu>
				</Dropdown>
			</NavbarItem>
			<NavbarItem>
				<Button 
					variant="shadow" 
					endContent={<IoMdPerson/>} 
					className="font-semibold md:text-xs lg:text-lg bg-olive text-white"
				>
					About Us
				</Button>
			</NavbarItem>
		</NavbarContent>
		<NavbarMenuToggle
			aria-label={isMenuOpen ? "Close menu" : "Open menu"}
			className="md:hidden text-black h-8 w-8"
			/>
		<NavbarMenu className="items-end">
			{menuItems.map((item, index) => (
			<NavbarMenuItem key={`${item}-${index}`}>
				<Link
				color={
					index === menuItems.length - 1 ? "success" : "foreground"
				}
				className="w-full"
				href="#"
				size="lg"
				>
				{item.text}&nbsp;{item.icon}
				</Link>
			</NavbarMenuItem>
			))}
		</NavbarMenu>
	</Navbar>
  );
}
