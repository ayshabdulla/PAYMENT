// src/components/Cart.js
import React, {
  useContext,
  useState,
} from 'react';

import './Cart.css'

import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // If using react-router

import { loadStripe } from '@stripe/stripe-js';

import { CartContext } from '../Context/CartContext';

const stripePromise = loadStripe('pk_test_51SWAjTFPyvvqziq1N1QBAFImlKNAolM55oQRzHvNLXBY2ODa60TNNnywYstHvmwlqlv7MMrIxTWaghTbLgja3dXQ00FYR11lmd'); // Replace with your public key

const Cart = () => {
  const { cart, clearCart } = useContext(CartContext);
  const [paymentMethod, setPaymentMethod] = useState("stripe");
  const navigate = useNavigate(); // Redirect to home

  const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);

  const handleCheckout = async () => {
    if (paymentMethod === "stripe") {
      try {
        const cartItems = cart.map(item => ({
          productId: item._id,
          quantity: 1,
        }));

        const response = await axios.post('http://localhost:5000/api/payment/checkout', {
          cartItems,
        });
        window.location.href = response.data.url;


        // const stripe = await stripePromise;
        // await stripe.redirectToCheckout({
        //   sessionId: response.data.sessionId,
        // });

        // Stripe handles redirection after payment (via success_url)
      } catch (err) {
        console.error("Stripe error:", err);
        alert("Stripe checkout failed.");
      }
    }

    if (paymentMethod === "cod") {
      alert("Cash on Delivery order placed!");
      clearCart();
      navigate('/'); // Go back to homepage
    }
  };

  if (cart.length === 0) return <p>Your cart is empty.</p>;

  return (
    <div className="cart-page">
      <h2 className="cart-title">Your Cart</h2>

      <div className="cart-list">
        {cart.map((item, idx) => (
          <div key={idx} className="cart-card">
            {item.image && (
              <img
                src={`http://localhost:5000${item.image}`}
                alt={item.name}
              />
            )}
            <div className="cart-info">
              <h4>{item.name}</h4>
              <p>₹{item.price}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-total-box">
        <h3>Total: ₹{totalAmount}</h3>

        <div className="payment-methods">
          <label>
            <input
              type="radio"
              value="stripe"
              checked={paymentMethod === "stripe"}
              onChange={() => setPaymentMethod("stripe")}
            /> Pay with Stripe
          </label>

          <label style={{ marginLeft: '20px' }}>
            <input
              type="radio"
              value="cod"
              checked={paymentMethod === "cod"}
              onChange={() => setPaymentMethod("cod")}
            /> Cash on Delivery
          </label>
        </div>

        <button className="checkout-btn"  onClick={handleCheckout}>
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Cart;
