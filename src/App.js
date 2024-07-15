import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginForm from './forms/LoginForm';
import SignupForm from './forms/SignupForm';
import PasswordResetForm from './forms/PasswordResetForm';
import ConfirmPasswordForm from './forms/ConfirmPasswordForm';
import Home from './pages/Home';
import Orders from './pages/Orders';
import Cart from './pages/Cart';
import Favourites from './pages/Favourites';
import Men from './pages/Men';
import Women from './pages/Women';
import Kids from './pages/Kids';
import Contact from './pages/Contact';
import MainLayout from './MainLayout'; // Import the layout
import PrivateRoute from './PrivateRoute';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/signup" element={<SignupForm />} />
      <Route path="/passwordreset" element={<PasswordResetForm />} />
      <Route path="/resetPassword/:token" element={<ConfirmPasswordForm />} />

      {/* Routes that require Navbar and Sidebar */}
      <Route
        path="/home"
        element={
          <PrivateRoute>
            <MainLayout>
              <Home />
            </MainLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/orders"
        element={
          <PrivateRoute>
            <MainLayout>
              <Orders />
            </MainLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/cart"
        element={
          <PrivateRoute>
            <MainLayout>
              <Cart />
            </MainLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/favourites"
        element={
          <PrivateRoute>
            <MainLayout>
              <Favourites />
            </MainLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/men"
        element={
          <PrivateRoute>
            <MainLayout>
              <Men />
            </MainLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/women"
        element={
          <PrivateRoute>
            <MainLayout>
              <Women />
            </MainLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/kids"
        element={
          <PrivateRoute>
            <MainLayout>
              <Kids />
            </MainLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/contact"
        element={
          <PrivateRoute>
            <MainLayout>
              <Contact />
            </MainLayout>
          </PrivateRoute>
        }
      />
      {/* Add more routes that require Navbar and Sidebar in a similar manner */}
    </Routes>
  );
};

export default App;


