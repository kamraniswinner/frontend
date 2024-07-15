// PasswordResetPage.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { confirmResetPassword } from '../actions/authActions';

const FormContainer = styled.div`
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
  display: block;
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  width: 100%;
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
  margin-top: 20px;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #aaa;
  }
`;

const ConfirmPasswordForm = () => {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const dispatch = useDispatch();
  const { loading, error, passwordResetSuccess } = useSelector((state) => state.auth);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!newPassword) newErrors.newPassword = 'Password is required';
    if (newPassword !== confirmNewPassword) {
      newErrors.confirmNewPassword = 'Passwords do not match';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      // Submit form
      dispatch(confirmResetPassword(token, newPassword));
      // Clear form fields
      setNewPassword('');
      setConfirmNewPassword('');
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <FormContainer>
      <h2>Reset Password</h2>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="newPassword">New Password:</Label>
          <Input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          {errors.newPassword && <Error>{errors.newPassword}</Error>}
        </FormGroup>
        <FormGroup>
          <Label htmlFor="confirmNewPassword">Confirm New Password:</Label>
          <Input
            type="password"
            id="confirmNewPassword"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            required
          />
          {errors.confirmNewPassword && <Error>{errors.confirmNewPassword}</Error>}
        </FormGroup>
        <Button type="submit" disabled={loading}>
          {loading ? 'Resetting Password...' : 'Reset Password'}
        </Button>
        {error && <Error>{error}</Error>}
        {passwordResetSuccess && <Success>Password Reset successful! Please log in.</Success>}
      </Form>
    </FormContainer>
  );
};

export default ConfirmPasswordForm;
