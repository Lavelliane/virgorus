import React from 'react';
import ReactDOM from 'react-dom/client';
import { Carousel } from './Carousel';
import { EmblaOptionsType } from 'embla-carousel-react';
import { IAddPackage } from '@/types/types';
import { CatalogCard } from '@/components/Guest/CatalogCard';

const OPTIONS: EmblaOptionsType = { loop: false, align: 'center', containScroll: false, dragFree: true };

export const CarouselWrapper = ({ packages }: { packages: IAddPackage[] }) => {
	const SLIDE_COUNT = packages.length;
	const SLIDES = Array.from(Array(SLIDE_COUNT).keys());
	return <Carousel slides={SLIDES} options={OPTIONS} packages={packages} />;
};
