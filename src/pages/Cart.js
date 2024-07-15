import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCart, calculateCartTotal } from '../actions/cartActions.js'; // Adjust the import path as necessary
import styled from 'styled-components';

const CartContainer = styled.div`
  padding: 20px;
  background-color: #f8f8f8;
`;

const CartItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  margin: 10px 0;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const CartItemDetail = styled.div`
  display: flex;
  flex-direction: column;
`;

const Cart = () => {
  const dispatch = useDispatch();
  const userId = '123'; // Replace with the actual user ID
  
  const cartState = useSelector(state => state.cart);
  const { loading, cartitems, error, totalPrice, taxPrice, shippingPrice, cartAmount } = cartState;

  useEffect(() => {
    dispatch(getCart(userId));
    dispatch(calculateCartTotal());
  }, [dispatch, userId]);

  // Ensure cartitems is always an array
  const items = Array.isArray(cartitems) ? cartitems : [];

  return (
    <CartContainer>
      <h1>Shopping Cart</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          {items.map(item => (
            <CartItem key={item.product._id}>
              <CartItemDetail>
                <strong>{item.name}</strong>
                <span>{item.price}</span>
              </CartItemDetail>
              <span>Quantity: {item.quantity}</span>
            </CartItem>
          ))}
          <div>
            <p>Total Price: ${totalPrice.toFixed(2)}</p>
            <p>Tax: ${taxPrice.toFixed(2)}</p>
            <p>Shipping: ${shippingPrice.toFixed(2)}</p>
            <p><strong>Total Amount: ${cartAmount.toFixed(2)}</strong></p>
          </div>
        </>
      )}
    </CartContainer>
  );
};

export default Cart;
