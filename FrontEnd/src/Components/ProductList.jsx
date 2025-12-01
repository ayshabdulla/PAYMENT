// src/components/ProductList.js
import React, {
  useContext,
  useEffect,
  useState,
} from 'react';

import axios from 'axios';

import './ProductList.css'

import { CartContext } from '../Context/CartContext';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="product-page">
      <h2 className="product-title">Available Products</h2>
      <div  className="product-grid">
        {products.map(prod => (
          <div
            key={prod._id}
            className="product-card">
            {prod.image && (
              <img
                src={`http://localhost:5000${prod.image}`}
                alt={prod.name}
              />
            )}

            <div className="product-info">
            <h3>{prod.name}</h3>
            <p>₹{prod.price}</p>
            {/* {prod.description && <p style={{ fontSize: '14px' }}>{prod.description}</p>} */}
            <button onClick={() => addToCart(prod)}>Add to Cart</button>
          </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
