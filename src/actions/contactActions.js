import axios from 'axios';

export const submitContactForm = (formData) => async (dispatch) => {
  try {
    dispatch({ type: 'SUBMIT_CONTACT_FORM_REQUEST' });

    // Make API call to submit contact form data
    const response = await axios.post('http://localhost:5000/api/contact', formData);

    dispatch({ type: 'SUBMIT_CONTACT_FORM_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'SUBMIT_CONTACT_FORM_FAILURE', payload: error.message });
  }
};
