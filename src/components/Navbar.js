import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Sidebar from './Sidebar'; // Ensure Sidebar component is correctly imported
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/authActions'; // Adjust the import path as needed

const StyledNavBar = styled.nav`
  background-color: #f8f9fa;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 101;
`;

const SidebarToggle = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  aria-label: 'Toggle sidebar';
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  font-size: 1.25rem;
  font-weight: bold;
  justify-content: center;
  align-items: center;
`;

const LogoutButton = styled.button`
  background-color: #dc3545;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 1rem;
  border-radius: 4px;
  margin-left: 1rem;

  &:hover {
    background-color: #c82333;
  }
`;

const NavBar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
      <StyledNavBar>
        <SidebarToggle onClick={toggleSidebar}>☰</SidebarToggle>
        <StyledLink to="/home">Jewelry Store</StyledLink>
        {isAuthenticated && (
          <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
        )}
      </StyledNavBar>
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
    </div>
  );
};

export default NavBar;
