import React, { useEffect, useState } from 'react'
import {  Navigate, Route, Routes } from 'react-router-dom';
import AdminAddProduct from './Components/AdminAddProduct';
import AdminLogin from './Components/AdminLogin';
import Cart from './Components/Cart';
import ProductList from './Components/ProductList';
import { CartProvider } from './Context/CartContext';
import Success from './Components/Success';


function App()  {
    const[isAdmin, setIsAdmin] = useState(false);

    //check if the admin token exists in localStorage on initial load
    useEffect(() => {
        if (localStorage.getItem('adminToken')) {
            setIsAdmin(true); //if token exists setIsAdmin to true
        }
    }, []);

  return (
    <CartProvider>
            <div>
                <Routes>

                    {/* USER SIDE */}
                    <Route
                    path="/"
                    element={
                        <>
                        <ProductList />
                        <Cart />
                        </>
                    }
                    />

                    <Route path='/success' element={<Success />} />

                    {/* ADMIN SIDE */}

                    <Route
                    path="/admin"
                    element={<AdminLogin/>}
                    />

                    <Route
                    path='/admin/addProduct'
                    element={
                        isAdmin ? (
                            <AdminAddProduct/>
                        ) : (
                            <Navigate to = "/admin" replace />
                        )
                    }
                    />   
                </Routes>
            </div>
    </CartProvider>
  );
}

export default App
