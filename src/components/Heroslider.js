import React from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';

const SliderContainer = styled.div`
  width: 100%;
  position: relative;
  overflow: hidden;
`;

const Slide = styled.div`
  position: relative;
  height: 400px; /* Adjust height as needed */
  background-size: cover;
  background-position: center;
`;

const SlideContent = styled.div`
  position: absolute;
  bottom: 20px;
  left: 20px;
  color: white;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
  padding: 1rem;
  border-radius: 8px;
`;

const SlideTitle = styled.h2`
  font-size: 2rem;
  margin: 0;
`;

const SlideDescription = styled.p`
  font-size: 1rem;
  margin: 0.5rem 0 0;
`;

const HeroSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  const slides = [
    {
      image: 'https://via.placeholder.com/1200x400', // Replace with your image URL
      title: 'Slide 1 Title',
      description: 'Slide 1 Description',
    },
    {
      image: 'https://via.placeholder.com/1200x400', // Replace with your image URL
      title: 'Slide 2 Title',
      description: 'Slide 2 Description',
    },
    {
      image: 'https://via.placeholder.com/1200x400', // Replace with your image URL
      title: 'Slide 3 Title',
      description: 'Slide 3 Description',
    },
  ];

  return (
    <SliderContainer>
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <Slide key={index} style={{ backgroundImage: `url(${slide.image})` }}>
            <SlideContent>
              <SlideTitle>{slide.title}</SlideTitle>
              <SlideDescription>{slide.description}</SlideDescription>
            </SlideContent>
          </Slide>
        ))}
      </Slider>
    </SliderContainer>
  );
};

export default HeroSlider;
