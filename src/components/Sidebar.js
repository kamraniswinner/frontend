import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types'; // Import PropTypes for prop type checking
import { useDispatch } from 'react-redux'; 
import { logout } from '../actions/authActions';

const StyledSidebar = styled.div`
  position: fixed;
  top: 0;
  left: ${(props) => (props.isOpen ? '-35px' : '-285px')};
  width: 250px;
  height: 100%;
  background-color: #f8f9fa;
  padding: 1rem;
  transition: left 0.3s ease-in-out;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  z-index: 100;
  background-color: pink;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  display: block;
  text-align: right;
  margin-bottom: 1rem;
  padding: 0.5rem;
  color: #555;
  padding-left: 50px;
`;

const SidebarList = styled.ul`
  list-style-type: none;
  padding: 0;
  padding-left: 50px;
`;

const SidebarLink = styled(Link)`
  text-decoration: none;
  color: #333;
  display: block;
  margin: 10px 0;
  font-size: 1rem;
  padding: 0.5rem;
  border-radius: 4px;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #e9ecef;
  }
`;

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    toggleSidebar();
  };

  return (
    <StyledSidebar isOpen={isOpen}>
      <CloseButton onClick={toggleSidebar} aria-label="Close Sidebar">&times;</CloseButton>
      <SidebarList>
        <li>
          <SidebarLink to="/orders" onClick={toggleSidebar}>Orders</SidebarLink>
        </li>
        <li>
          <SidebarLink to="/cart" onClick={toggleSidebar}>Cart</SidebarLink>
        </li>
        <li>
          <SidebarLink to="/favourites" onClick={toggleSidebar}>Favourites</SidebarLink>
        </li>
        <li>
          <SidebarLink to="/" onClick={handleLogout}>Logout</SidebarLink>
        </li>
        <li>
          <SidebarLink to="/men" onClick={toggleSidebar}>Men</SidebarLink>
        </li>
        <li>
          <SidebarLink to="/women" onClick={toggleSidebar}>Women</SidebarLink>
        </li>
        <li>
          <SidebarLink to="/contact" onClick={toggleSidebar}>Contact</SidebarLink>
        </li>
      </SidebarList>
    </StyledSidebar>
  );
};

Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
};

export default Sidebar;
