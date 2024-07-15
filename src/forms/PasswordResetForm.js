import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Formtitle from './Formtitle';
import { requestResetPassword } from '../actions/authActions'; // Import the correct action

const NavLinks = styled.div`
  margin-top: 2rem;
  text-align: center;

  a {
    text-decoration: none;
    color: #007bff;

    &:hover {
      color: #0056b3;
    }
  }
`;

const Container = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-weight: bold;
`;

const Input = styled.input`
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const Error = styled.p`
  color: red;
  font-size: 0.8em;
  margin-top: 0.25rem;
`;

const Success = styled.p`
  color: green;
  font-size: 0.8em;
  margin-top: 0.25rem;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }

  a {
    text-decoration: none;
    color: #fff;
  }
`;

const PasswordResetForm = () => {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const { loading, error, resetPasswordLinkSuccess } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(requestResetPassword(email));
    console.log('Email:', email);
  };

  return (
    <> 
      <Formtitle title="Password Reset" />
      <Container>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="email">Email:</Label>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <Button type="submit" disabled={loading}>
            {loading ? 'Sending reset link...' : 'Reset Password'}
          </Button>
          {error && <Error>{error}</Error>}
          {resetPasswordLinkSuccess && <Success>Password reset link sent! Check your email.</Success>}
        </Form>
      </Container>
      <NavLinks>
        <h4>Back to login</h4>
        <Link to="/">Log In</Link>
      </NavLinks>
    </>
  );
};

export default PasswordResetForm;
