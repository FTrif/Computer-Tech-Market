import React from 'react';
import Slider from 'react-slick';
import './styles/Carousel.css';
import { productArr } from '../../assets/mockDataString';
import Card from '../Card/Card';

const ProductCarousel: React.FC<{}> = () => {
  function SampleNextArrow(props: any) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: 'flex',
          background:
            ' linear-gradient(90deg, rgba(255, 255, 255, 0) 5.74%, rgba(188, 188, 188, 0.15) 51.71%, rgba(188, 188, 188, 0.65) 100%)',
          height: '450px',
          width: '100px',
          position: 'absolute',
          top: '50%',
          zIndex: '30000',
        }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props: any) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: 'flex',
          background:
            ' linear-gradient(270deg, rgba(255, 255, 255, 0) 5.74%, rgba(188, 188, 188, 0.55) 51.71%, rgba(188, 188, 188, 0.65) 100%)',
          height: '450px',
          width: '100px',
          position: 'absolute',
          top: '50%',
          zIndex: '30000',
        }}
        onClick={onClick}
      />
    );
  }

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    prevArrow: <SamplePrevArrow />,
    nextArrow: <SampleNextArrow />,
    arrows: true,
    variableWidth: false,

    responsive: [
      {
        breakpoint: 2580,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 6,
        },
      },
      {
        breakpoint: 2300,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
        },
      },
      {
        breakpoint: 2000,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
        },
      },
      {
        breakpoint: 1760,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 1450,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },

      {
        breakpoint: 800,
        settings: {
          slideToShow: 3,
          slideToScroll: 3,
        },
      },

      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
    ],
  };

  return (
    <div>
      <Slider {...settings}>
        {productArr.map((item) => (
          <Card
            id={item.id}
            isYourProduct={item.isYourProduct}
            image={item.img}
            title={item.title}
            pret={item.pret}
            descriere={item.descriere}
            buttonAdd={item.button}
            buttonView={''}
            categorie={item.categorie}
            descriereTotala={item.descriereTotala}
            stare={item.stare}
          />
        ))}
      </Slider>
    </div>
  );
};

export default ProductCarousel;
