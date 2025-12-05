import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <header className="d-flex align-items-center justify-content-center text-center text-white" 
        style={{
            background: "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
            backgroundSize: "cover", 
            backgroundPosition: "center",
            height: "100vh"
        }}>
        <div className="container">
          <h1 className="display-2 fw-bold mb-4">Farming is the Best Solution to World Starvation</h1>
          <p className="lead mb-5 fs-4">
            We provide high-quality organic agricultural products and services to ensure food security and sustainable farming practices for a better future.
          </p>
          <Link to="/services" className="btn btn-success btn-lg rounded-pill px-5 py-3 fw-bold shadow">
            Discover Our Services
          </Link>
        </div>
      </header>
    </div>
  );
}

export default Home;