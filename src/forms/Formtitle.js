import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
`;

function Formtitle({ title }) {
  return (
    <Container>
      <Title>{title}</Title>
    </Container>
  );
}

export default Formtitle;
  