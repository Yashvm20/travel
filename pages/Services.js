import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link

function Services() {
  const [services, setServices] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get('http://localhost:5000/api/services')
      .then(res => setServices(res.data))
      .catch(err => {
        console.error(err);
        setError("Could not load services.");
      });
  }, []);

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h2 className="fw-bold text-uppercase">Our Services</h2>
        <div className="bg-success mx-auto" style={{width: '60px', height: '3px'}}></div>
      </div>

      {error && <div className="alert alert-danger text-center">{error}</div>}

      <div className="row">
        {services.map((item) => (
          <div className="col-lg-3 col-md-6 mb-4" key={item._id}>
            {/* WRAP CARD IN LINK */}
            <Link to={`/services/${item._id}`} className="text-decoration-none text-dark">
              <div className="card h-100 border-0 shadow-sm p-4 text-center hover-shadow transition">
                <div className="display-4 mb-3">{item.icon}</div>
                <h4 className="fw-bold">{item.title}</h4>
                <p className="text-muted small">{item.description}</p>
                <div className="mt-auto text-success small fw-bold">View Details →</div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Services;