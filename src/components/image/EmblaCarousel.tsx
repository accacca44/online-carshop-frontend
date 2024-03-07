import useEmblaCarousel from 'embla-carousel-react';
import { CarImage } from '../../api/cars.api';

export type EmblaCarouselProps = {
  images: CarImage[];
};

export function EmblaCarousel({ images }: EmblaCarouselProps) {
  const [emblaRef] = useEmblaCarousel();

  return (
    <div className="embla" ref={emblaRef} style={{ width: '100%', height: '100%', borderRadius: '2%' }}>
      <div className="embla__container" style={{ width: '100%', height: '100%' }}>
        {images.map((image) => {
          const type = image.name.split('.')[1];
          return (
            <div key={image.name} className="embla__slide" style={{ width: '100%', height: '100%' }}>
              <img
                src={`data:image/${type};base64,${image.content}`}
                alt="car"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
