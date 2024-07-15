import { jwtDecode } from 'jwt-decode';

const getUserIdFromToken = (token) => {
  try {
    const decodedToken = jwtDecode(token);
    console.log("token values:",decodedToken)
    return decodedToken.id; // Adjust this according to your token's structure
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

export default getUserIdFromToken;
