import React from 'react';
import ImageGallery from 'react-image-gallery';
import './styles.scss';
import { images } from '../../../assets/mockDataImage';

interface IProps {
  position?: 'right' | 'top' | 'bottom' | 'left';
}

const ImageGalleryCarousel: React.FC<IProps> = ({ position = 'right' }) => {
  return (
    <ImageGallery
      items={images}
      lazyLoad={true}
      thumbnailPosition={position}
      slideDuration={500}
    />
  );
};
export default ImageGalleryCarousel;
