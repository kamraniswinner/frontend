import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import Formtitle from './Formtitle';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../actions/authActions'; // Import the login action

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
  width: 100%;
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

const LoginForm = () => {
  const initialFormData = {
    email: '',
    password: ''
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      // Submit form
      dispatch(login(formData.email, formData.password));
      console.log('Form data:', formData);
      // Clear form fields
      setFormData(initialFormData);
    } else {
      setErrors(newErrors);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home');
    }
  }, [isAuthenticated, navigate]);


  return (
    <>
      <Formtitle title="Login Form" />
      <Form onSubmit={handleSubmit}>
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
        <Button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Log In'}
        </Button>
        {error && <Error>{error}</Error>}
        {isAuthenticated && <p>Log In successful!</p>}
      </Form>
      <NavLinks>
        <Link to="/passwordreset">Forgot password?</Link>
      </NavLinks>
      <NavLinks>
        <Link to="/signup">Sign up</Link>
      </NavLinks>
    </>
  );
};

export default LoginForm;

