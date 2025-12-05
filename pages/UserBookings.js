import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UserBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  
  // Get the email stored in browser (Requires re-login if missing)
  const userEmail = localStorage.getItem('email'); 

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      navigate('/login');
      return;
    }

    // Fetch My Bookings
    axios.get('http://localhost:5000/api/my-bookings', {
      headers: { 'Authorization': token }
    })
    .then(res => {
      console.log("Bookings Data:", res.data); // See console (F12) for data
      setBookings(res.data);
      setLoading(false);
    })
    .catch(err => {
      console.error("Error fetching bookings:", err);
      setError("Could not load bookings. Is the server running?");
      setLoading(false);
    });
  }, [navigate]);

  if (loading) return <div className="text-center py-5">Loading your bookings...</div>;

  return (
    <div className="container py-5">
      <h2 className="text-center fw-bold mb-3">My Bookings</h2>
      
      {/* DEBUG INFO: Shows which email is being checked */}
      <div className="text-center mb-5">
        <span className="badge bg-light text-dark border p-2">
          Logged in as: <strong>{userEmail || "Unknown (Please Re-Login)"}</strong>
        </span>
      </div>

      {error && <div className="alert alert-danger text-center">{error}</div>}

      {bookings.length === 0 ? (
        <div className="text-center py-5">
          <h4 className="text-muted mb-3">No bookings found.</h4>
          <p className="text-muted">
            We couldn't find any bookings linked to <strong>{userEmail}</strong>.
          </p>
          <p className="small text-danger">
            (Note: If you booked with a different email, it won't appear here.)
          </p>
          <a href="/services" className="btn btn-success mt-3 px-4 rounded-pill">
            Browse Services & Book Now
          </a>
        </div>
      ) : (
        <div className="card shadow border-0">
          <div className="card-header bg-success text-white">
            <h5 className="mb-0">Booking History ({bookings.length})</h5>
          </div>
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-striped mb-0">
                <thead className="bg-light">
                  <tr>
                    <th>Service</th>
                    <th>Date Scheduled</th>
                    <th>Address</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((b) => (
                    <tr key={b._id}>
                      <td>
                        <strong>{b.serviceName}</strong>
                      </td>
                      <td>{new Date(b.date).toLocaleDateString()}</td>
                      <td>{b.address}</td>
                      <td>
                        <span className={`badge ${
                          b.status === 'Confirmed' ? 'bg-success' : 
                          b.status === 'Cancelled' ? 'bg-danger' : 
                          'bg-warning text-dark'
                        }`}>
                          {b.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserBookings;