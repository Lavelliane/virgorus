import React from 'react'
import useEmblaCarousel, { EmblaOptionsType } from 'embla-carousel-react'
import { CarouselDot, useDotButton } from './CarouselDot'
import { CatalogPackage } from "@/types/package";
import { CatalogCard } from "@/components/Guest/CatalogCard";

type PropType = {
  slides: number[]
  options?: EmblaOptionsType
  packages: CatalogPackage[]
}

export const Carousel: React.FC<PropType> = (props) => {
  const { slides, options, packages } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options)
  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi)

  return (
    <div className="embla">

      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((index) => (
            <div className="embla__slide" key={index}>
              <div className=''>
                <CatalogCard key={packages[index].id} catPackage={packages[index]} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="embla__dots">
        {scrollSnaps.map((_, index) => (
          <CarouselDot
            key={index}
            onClick={() => onDotButtonClick(index)}
            className={'embla__dot'.concat(
              index === selectedIndex ? ' embla__dot--selected' : ''
            )}
          />
        ))}
      </div>
    </div>
  )
}
