import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/login', { email, password });
      
      // Save data to browser storage
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.role);
      localStorage.setItem('name', res.data.name);
      localStorage.setItem('email', res.data.email); // <--- CRITICAL FIX: Saves email for bookings

      alert("Login Successful!");
      
      if (res.data.role === 'admin') {
        navigate('/admin'); // Go to Dashboard
      } else {
        navigate('/'); // Go Home
      }
      
      // Reload to update navbar state immediately
      window.location.reload(); 
    } catch (err) {
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card shadow p-4">
            <h3 className="text-center mb-4">Login</h3>
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label>Email</label>
                <input 
                  type="email" 
                  className="form-control" 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                />
              </div>
              <div className="mb-3">
                <label>Password</label>
                <input 
                  type="password" 
                  className="form-control" 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                />
              </div>
              <button className="btn btn-success w-100">Login</button>
            </form>
            <p className="mt-3 text-center">
              Don't have an account? <a href="/register">Register</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;