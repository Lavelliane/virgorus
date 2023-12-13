import React from 'react';
import { Carousel } from './Carousel';
import { EmblaOptionsType, EmblaPluginType } from 'embla-carousel-react';
import { IAddPackage } from '@/types/types';
import AutoPlay from 'embla-carousel-autoplay';

const autoplayOptions = {
	delay: 4000,
	stopOnInteraction: false,
	AutoPlay: true,
	rootNode: (emblaRoot: HTMLElement) => emblaRoot.parentElement,
};

const OPTIONS: EmblaOptionsType = { loop: false, align: 'center', containScroll: false, dragFree: false };
const PLUGINS: EmblaPluginType = OPTIONS ? [AutoPlay(autoplayOptions)] : [];

export const CarouselWrapper = ({ packages }: { packages: IAddPackage[] }) => {
	const SLIDE_COUNT = packages.length;
	const SLIDES = Array.from(Array(SLIDE_COUNT).keys());
	return (
		<>{SLIDES.length > 0 && <Carousel slides={SLIDES} options={OPTIONS} plugins={PLUGINS} packages={packages} />}</>
	);
};
