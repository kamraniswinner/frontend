import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const TitleContainer = styled.div`
  margin-bottom: ${(props) => props.marginBottom || '1rem'};
  text-align: ${(props) => props.align || 'left'};
`;

const TitleText = styled.h1`
  font-size: ${(props) => {
    switch (props.level) {
      case 1:
        return '2.5rem';
      case 2:
        return '2rem';
      case 3:
        return '1.75rem';
      case 4:
        return '1.5rem';
      case 5:
        return '1.25rem';
      case 6:
        return '1rem';
      default:
        return '2rem';
    }
  }};
  color: ${(props) => props.color || '#333'};
  margin: 0;
`;

const Title = ({ level, children, color, align, marginBottom }) => {
  return (
    <TitleContainer align={align} marginBottom={marginBottom}>
      <TitleText as={`h${level}`} level={level} color={color}>
        {children}
      </TitleText>
    </TitleContainer>
  );
};

Title.propTypes = {
  level: PropTypes.number,
  children: PropTypes.node.isRequired,
  color: PropTypes.string,
  align: PropTypes.string,
  marginBottom: PropTypes.string,
};

Title.defaultProps = {
  level: 1,
  color: '#333',
  align: 'left',
  marginBottom: '1rem',
};

export default Title;
            