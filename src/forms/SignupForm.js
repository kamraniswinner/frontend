// src/SignupForm.js
import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Formtitle from './Formtitle';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../actions/authActions'; // Import the signup action

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

const Form = styled.form`
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
`;

const Error = styled.p`
  color: red;
  font-size: 0.8em;
  margin-top: 0.25rem;
`;

const Button = styled.button`
  display: block;
  width: 100%;
  padding: 0.75rem;
  background: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  &:hover {
    background: #0056b3;
  }
`;

const SignupForm = () => {
  const initialFormData = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const { loading, error, signupSuccess } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid';
    }
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      // Submit form
      dispatch(signup(formData.username, formData.email, formData.password));
      console.log('Form data:', formData);
      // Clear form fields
      setFormData(initialFormData);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <>
      <Formtitle title="Signup Form" />
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Username:</Label>
          <Input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          {errors.username && <Error>{errors.username}</Error>}
        </FormGroup>
        <FormGroup>
          <Label>Email:</Label>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <Error>{errors.email}</Error>}
        </FormGroup>
        <FormGroup>
          <Label>Password:</Label>
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <Error>{errors.password}</Error>}
        </FormGroup>
        <FormGroup>
          <Label>Confirm Password:</Label>
          <Input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && <Error>{errors.confirmPassword}</Error>}
        </FormGroup>
        <Button type="submit" disabled={loading}>
          {loading ? 'Signing up...' : 'Sign Up'}
        </Button>
        {error && <Error>{error}</Error>}
        {signupSuccess && <p>Signup successful! Please log in.</p>}
      </Form>
      <NavLinks>
        <h4>Already have an account?</h4>
        <Link to="/">Log In</Link>
      </NavLinks>
    </>
  );
};

export default SignupForm;
