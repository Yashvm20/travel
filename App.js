import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import BookingPage from './pages/BookingPage';
import Testimonials from './pages/Testimonials';
import Blog from './pages/Blog';
import Contact from './pages/Contact';

// Auth Pages
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import UserBookings from './pages/UserBookings';

function AppContent() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const name = localStorage.getItem('name');
    if (token) {
      setUser({ role, name });
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    navigate('/login');
  };

  return (
    <div className="d-flex flex-column min-vh-100 font-sans">
      
      {/* --- NAVIGATION BAR --- */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white sticky-top shadow-sm py-3">
        <div className="container">
          <Link className="navbar-brand fw-bold text-success fs-3" to="/">AgriCulture</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto text-uppercase fw-bold small align-items-center">
              
              {/* FIXED: Added missing pages here */}
              <li className="nav-item"><Link className="nav-link px-3" to="/">Home</Link></li>
              <li className="nav-item"><Link className="nav-link px-3" to="/about">About Us</Link></li>
              <li className="nav-item"><Link className="nav-link px-3" to="/services">Services</Link></li>
              <li className="nav-item"><Link className="nav-link px-3" to="/testimonials">Testimonials</Link></li>
              <li className="nav-item"><Link className="nav-link px-3" to="/blog">Blog</Link></li>
              <li className="nav-item"><Link className="nav-link px-3" to="/contact">Contact</Link></li>
              
              {/* Login/Logout Logic */}
              {!user ? (
                <>
                  <li className="nav-item"><Link className="nav-link px-3" to="/login">Login</Link></li>
                  <li className="nav-item">
                    <Link className="btn btn-success btn-sm rounded-pill px-3" to="/register">Register</Link>
                  </li>
                </>
              ) : (
                <>
                  {/* Show Admin Dashboard if Admin */}
                  {user.role === 'admin' && (
                    <li className="nav-item"><Link className="nav-link px-3 text-danger" to="/admin">Dashboard</Link></li>
                  )}
                  
                  {/* Show "My Bookings" if Regular User */}
                  {user.role === 'user' && (
                    <li className="nav-item"><Link className="nav-link px-3 text-primary" to="/my-bookings">My Bookings</Link></li>
                  )}

                  <li className="nav-item ms-3">
                    <button onClick={handleLogout} className="btn btn-outline-danger btn-sm rounded-pill">Logout ({user.name})</button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:id" element={<ServiceDetail />} />
        <Route path="/book/:id" element={<BookingPage />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        
        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/my-bookings" element={<UserBookings />} />
      </Routes>

      <footer className="bg-dark text-white py-4 mt-auto text-center">
        <div className="container">
          <p className="mb-0 small">© Copyright <strong>AgriCulture</strong>. All Rights Reserved</p>
        </div>
      </footer>

    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;