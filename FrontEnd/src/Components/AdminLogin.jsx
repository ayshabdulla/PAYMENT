//src/components/AdminLogin.js




import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './AdminLogin.css';

const AdminLogin =() => {
    const [form, setForm] = useState({ email: '', password:''});

    const navigate = useNavigate();

    //handle input change
    const handleChange = e => {
        setForm({ ...form,[e.target.name]: e.target.value });
    };

    //Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            //Send login data to backend
            const res = await axios.post('https://payment-gpz6.onrender.com/api/admin/login', form);

            //if login successfull (backend sends token)
            if (res.data.token) {
                //stored token for later use
                localStorage.setItem('adminToken', res.data.token);

                alert(res.data.message); //"Login Successfull"
                navigate('/admin/addProduct'); //Go to admin page
            }
        } catch (err) {
            //Handle invalid credentials or other errors
            const msg = err.response?.data?.message || 'Login Filed';
            alert(msg);
            console.error(err);
        }
    };
    
    return(
        <div className="login-container">
        <form  className="login-form" onSubmit={handleSubmit}>
            
            <h2>Admin Login</h2>

            <input type="email"
            name="email"
            placeholder="Admin Email"
            value={form.email}
            onChange={handleChange}
            required
             />

             <input type="password"
             name="password"
             placeholder="Password"
             value={form.password}
             onChange={handleChange}
             required
              />

              <button type="submit">Login</button>
        </form>
        </div>
    );
};

export default AdminLogin;

