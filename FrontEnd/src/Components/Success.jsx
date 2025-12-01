// src/pages/Success.js
import React, {
  useContext,
  useEffect,
} from 'react';

import './Success.css'

import { useNavigate } from 'react-router-dom';

import { CartContext } from '../Context/CartContext';

const Success = () => {
  const { clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    clearCart();
    setTimeout(() => {
      navigate('/');
    }, 2000); // Go back home after 2 seconds
  }, []);

  return (
    <div className="success-page">
      <div className="success-card">
        <div className="success-icon">✅</div>
      <h2>Payment Successful!</h2>
      <p>Redirecting to home...</p>
      </div>
    </div>
  );
};

export default Success;
