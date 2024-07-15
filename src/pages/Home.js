import React from 'react';
import Heroslider from '../components/Heroslider';
import Productcard from '../components/Productcard';
import Title from '../components/Title';

const Home = () => {
  return (
    <>
    <Heroslider />
    <Title level={1} color="#007bff" align="center" marginBottom="2rem">
        New Arrivals
      </Title>
    <Productcard />
    </>
  )
}

export default Home