import React from 'react';
import useEmblaCarousel, { EmblaOptionsType, EmblaPluginType } from 'embla-carousel-react';
import { CarouselDot, useDotButton } from './CarouselDot';
import { IAddPackage } from '@/types/types';
import { CatalogCard } from '@/components/Guest/CatalogCard';

type PropType = {
	slides: number[];
	options?: EmblaOptionsType;
	plugins?: EmblaPluginType;
	packages: IAddPackage[];
};

export const Carousel: React.FC<PropType> = (props) => {
	const { slides, options, plugins, packages } = props;
	const [emblaRef, emblaApi] = useEmblaCarousel(options, plugins);
	const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi);

	return (
		<div className='embla'>
			<div className='embla__viewport' ref={emblaRef}>
				<div className='embla__container'>
					{slides.map((index) => (
						<div className='embla__slide' key={index}>
							<div className=''>
								<CatalogCard key={packages[index].id} catPackage={packages[index]} />
							</div>
						</div>
					))}
				</div>
			</div>

			<div className='embla__dots'>
				{scrollSnaps.map((_, index) => (
					<CarouselDot
						key={index}
						onClick={() => onDotButtonClick(index)}
						className={'embla__dot'.concat(index === selectedIndex ? ' embla__dot--selected' : '')}
					/>
				))}
			</div>
		</div>
	);
};
