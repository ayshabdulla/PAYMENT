import React, {
  useEffect,
  useState,
} from 'react';

import axios from 'axios';

import './AdminAddProduct.css'

const AdminAddProduct = () => {
  const [form, setForm] = useState({
    name: '',
    price: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [products, setProducts] = useState([]); // Store products fetched from backend

  // Fetch products from the server on page load
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/products');
        setProducts(res.data); // Update products with the data from backend
      } catch (err) {
        console.error(err);
        alert('Error fetching products.');
      }
    };

    fetchProducts();
  }, []); // This will run only once when the component mounts

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageFile) {
      alert('Please select an image file.');
      return;
    }

    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('price', form.price);
    formData.append('image', imageFile);

    try {
      // Send the new product data to the backend
      const res = await axios.post('http://localhost:5000/api/products/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Product added successfully!');
      setForm({ name: '', price: '' });
      setImageFile(null);

      // Refetch the products list after adding the new product
      const updatedProducts = await axios.get('http://localhost:5000/api/products');
      setProducts(updatedProducts.data);
    } catch (err) {
      console.error(err);
      alert('Error adding product.');
    }
  };

  const handleDelete = async (productId) => {
    try {
      // Send a DELETE request to the backend to remove the product
      await axios.delete(`http://localhost:5000/api/products/delete/${productId}`);
      alert('Product deleted successfully!');

      // Remove the product from the state (local list)
      setProducts(products.filter(product => product._id !== productId));
    } catch (err) {
      console.error(err);
      alert('Error deleting product.');
    }
  };

  return (
    <div className="admin-container">
      <h2>Admin: Add Product</h2>

      {/* Form to add a new product */}
      <form className="admin-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Product name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          required
        />

        <button type="submit">Add Product</button>
      </form>

      <h3 style={{ textAlign: 'center', marginBottom: '15px' }}>Product List</h3>

      {/* Display list of products */}
      <div className="admin-list">
        {products.map((product) => (
          <div className="product-card" key={product._id}>
            <div>
              <h4>{product.name}</h4>
              <p>Price:₹{product.price}</p>
              {product.image && <img src={`http://localhost:5000${product.image}`} alt={product.name}/>}
              <button onClick={() => handleDelete(product._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminAddProduct;
