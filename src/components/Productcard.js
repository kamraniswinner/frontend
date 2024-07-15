import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const CardContainer = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  width: 300px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-5px);
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const CardContent = styled.div`
  padding: 1rem;
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  margin: 0;
  color: #333;
`;

const CardDescription = styled.p`
  font-size: 1rem;
  color: #666;
  margin: 0.5rem 0;
`;

const CardPrice = styled.p`
  font-size: 1.25rem;
  color: #000;
  font-weight: bold;
  margin: 0.5rem 0;
`;

const CardButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const ProductCard = ({ image, title, description, price, onAddToCart }) => {
  return (
    <CardContainer>
      <CardImage src={image} alt={title} />
      <CardContent>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <CardPrice>{price}</CardPrice>
        <CardButton onClick={onAddToCart}>Add to Cart</CardButton>
      </CardContent>
    </CardContainer>
  );
};

ProductCard.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  onAddToCart: PropTypes.func.isRequired,
};

export default ProductCard;
