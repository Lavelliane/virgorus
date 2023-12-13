import React, { useState, useCallback, useEffect } from 'react';
import useEmblaCarousel, { EmblaOptionsType, EmblaPluginType } from 'embla-carousel-react';
import { CarouselDot, useDotButton } from './CarouselDot';
import { CarouselThumb } from './CarouselThumb'
import { IAddPackage } from '@/types/types';
import { CatalogCard } from '@/components/Guest/CatalogCard';
import Image from 'next/image';
import AutoPlay from 'embla-carousel-autoplay';

type PropType = {
	slides: number[];
	options?: EmblaOptionsType;
	plugins?: EmblaPluginType;
	packages: IAddPackage[];
};

const CarouselShowcase: React.FC<PropType> = (props) => {
	const { slides, options, plugins, packages } = props;
	const [emblaRef, emblaApi] = useEmblaCarousel(options, plugins);
	const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi);

	return (
		<div className='carousel'>
			<div className='carousel__viewport' ref={emblaRef}>
				<div className='carousel__container'>
					{slides.map((index) => (
						<div className='carousel__slide_100' key={index}>
							<div className=''>
								<CatalogCard key={packages[index].id} catPackage={packages[index]} />
							</div>
						</div>
					))}
				</div>
			</div>

			<div className='carousel__dots'>
				{scrollSnaps.map((_, index) => (
					<CarouselDot
						key={index}
						onClick={() => onDotButtonClick(index)}
						className={'carousel__dot'.concat(index === selectedIndex ? ' carousel__dot--selected' : '')}
					/>
				))}
			</div>
		</div>
	);
};

const CarouselList: React.FC<PropType> = (props) => {
	const { slides, options, plugins, packages } = props;
	const [emblaRef] = useEmblaCarousel(options, plugins);

	return (
		<div className='carousel'>
			<div className='carousel__viewport' ref={emblaRef}>
				<div className='carousel__container'>
					{slides.map((index) => (
						<div className='carousel__slide_30' key={index}>
							<div className=''>
								<CatalogCard key={packages[index].id} catPackage={packages[index]} />
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

const CarouselImage: React.FC<PropType> = (props) => {
	const { slides, options, packages } = props
	const [selectedIndex, setSelectedIndex] = useState(0)
	const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options)
	const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
	  containScroll: 'keepSnaps',
	  dragFree: true
	})
  
	const onThumbClick = useCallback(
	  (index: number) => {
		if (!emblaMainApi || !emblaThumbsApi) return
		emblaMainApi.scrollTo(index)
	  },
	  [emblaMainApi, emblaThumbsApi]
	)
  
	const onSelect = useCallback(() => {
	  if (!emblaMainApi || !emblaThumbsApi) return
	  setSelectedIndex(emblaMainApi.selectedScrollSnap())
	  emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap())
	}, [emblaMainApi, emblaThumbsApi, setSelectedIndex])
  
	useEffect(() => {
	  if (!emblaMainApi) return
	  onSelect()
	  emblaMainApi.on('select', onSelect)
	  emblaMainApi.on('reInit', onSelect)
	}, [emblaMainApi, onSelect])
  
	return (
	  <div className="carousel_image">
		<div className="carousel_image__viewport" ref={emblaMainRef}>
		  <div className="carousel_image__container">
			{slides.map((index) => (
			  <div className="carousel_image__slide" key={index}>
				<div className="carousel_image__slide__number">
				  <span>{index + 1}</span>
				</div>
				<img
				  className="carousel_image__slide__img"
				  src={String(packages[index]?.photos[0])}
				  alt="Your alt text"
				/>
			  </div>
			))}
		  </div>
		</div>
  
		<div className="carousel_image-thumbs">
		  <div className="carousel_image-thumbs__viewport" ref={emblaThumbsRef}>
			<div className="carousel_image-thumbs__container">
			  {slides.map((index) => (
				<CarouselThumb
				  onClick={() => onThumbClick(index)}
				  selected={index === selectedIndex}
				  index={index}
				  imgSrc={String(packages[index]?.photos[0])}
				  key={index}
				/>
			  ))}
			</div>
		  </div>
		</div>
	  </div>
	)
  }

export { CarouselShowcase, CarouselList, CarouselImage };

