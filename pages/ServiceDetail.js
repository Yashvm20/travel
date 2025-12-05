import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function ServiceDetail() {
  const { id } = useParams(); // Get the ID from the URL
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch specific service details
    axios.get(`http://localhost:5000/api/services/${id}`)
      .then(res => {
        setService(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="text-center py-5">Loading...</div>;
  if (!service) return <div className="text-center py-5">Service not found</div>;

  return (
    <div>
      {/* Header */}
      <div className="bg-dark py-5 text-center text-white mb-5">
        <h1 className="fw-bold">{service.title}</h1>
        <p className="text-white-50">Home / Services / {service.title}</p>
      </div>

      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card border-0 shadow-lg p-5">
              <div className="text-center mb-4">
                <span className="display-1">{service.icon}</span>
              </div>
              <h2 className="fw-bold mb-4 text-center">{service.title}</h2>
              <hr />
              <p className="lead text-muted my-4">{service.description}</p>
              
              {/* Extra content in English */}
              <div className="bg-light p-4 rounded mt-4 text-start">
                <h4 className="fw-bold">Why this service is important?</h4>
                <p className="small text-muted">
                  Our professional agriculture team uses modern techniques to ensure the best results for your farm. 
                  We focus on sustainable practices that improve crop yields while maintaining the health of your soil.
                  By choosing this service, you ensure long-term productivity and efficiency for your agricultural land.
                </p>
                <ul className="list-unstyled mt-3">
                    <li>✅ Professional Equipment</li>
                    <li>✅ Expert Farmers</li>
                    <li>✅ 100% Organic Methods</li>
                </ul>
              </div>

              <div className="text-center mt-5">
                <Link to="/services" className="btn btn-outline-success rounded-pill px-4">
                  ← Back to Services
                </Link>
                
                {/* Book Now Button */}
                <Link to={`/book/${service._id}`} className="btn btn-success rounded-pill px-4 ms-3">
                  Book Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServiceDetail;