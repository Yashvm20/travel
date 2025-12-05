import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function BookingPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [service, setService] = useState(null);
  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    phone: '',
    date: '',
    address: ''
  });

  useEffect(() => {
    // 1. Fetch Service Details
    axios.get(`http://localhost:5000/api/services/${id}`)
      .then(res => setService(res.data))
      .catch(err => console.error("Error fetching service:", err));

    // 2. Auto-fill from Local Storage (if available)
    const savedName = localStorage.getItem('name') || '';
    const savedEmail = localStorage.getItem('email') || '';

    setFormData(prev => ({
      ...prev,
      customerName: savedName,
      email: savedEmail
    }));
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!service) {
      alert("Service data is missing. Please refresh.");
      return;
    }

    const bookingData = {
      ...formData,
      serviceId: service._id,
      serviceName: service.title
    };

    console.log("Submitting Booking Data:", bookingData); // Check Console (F12)

    try {
      await axios.post('http://localhost:5000/api/bookings', bookingData);
      
      alert("✅ Booking Confirmed! Redirecting to My Bookings...");
      navigate('/my-bookings');
    } catch (error) {
      console.error("Full Error Object:", error);
      // Extract the exact error message from the backend
      const serverMessage = error.response?.data?.error || error.message || "Unknown Server Error";
      alert(`❌ Booking Failed: ${serverMessage}`);
    }
  };

  if (!service) return <div className="text-center py-5">Loading Service...</div>;

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-lg border-0 rounded-3">
            <div className="card-header bg-success text-white text-center py-4">
              <h3>Book Service: {service.title}</h3>
            </div>
            <div className="card-body p-5">
              <form onSubmit={handleSubmit}>
                
                <div className="mb-3">
                  <label className="form-label fw-bold">Your Name</label>
                  <input 
                    type="text" 
                    name="customerName" 
                    className="form-control" 
                    required 
                    value={formData.customerName}
                    onChange={handleChange} 
                  />
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">Email</label>
                    <input 
                      type="email" 
                      name="email" 
                      className="form-control" 
                      required 
                      value={formData.email}
                      onChange={handleChange} 
                      placeholder="user@example.com"
                    />
                    <div className="form-text text-muted">
                      Must match your login email to appear in "My Bookings".
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">Phone</label>
                    <input type="tel" name="phone" className="form-control" required onChange={handleChange} />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Preferred Date</label>
                  <input type="date" name="date" className="form-control" required onChange={handleChange} />
                </div>

                <div className="mb-4">
                  <label className="form-label fw-bold">Service Address</label>
                  <textarea name="address" className="form-control" rows="3" required onChange={handleChange}></textarea>
                </div>

                <button type="submit" className="btn btn-success w-100 py-3 fw-bold rounded-pill shadow-sm">
                  Confirm Booking
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingPage;