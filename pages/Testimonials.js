import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/testimonials')
      .then(res => setTestimonials(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="bg-light py-5">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="fw-bold display-5">TESTIMONIALS</h2>
          <p className="text-muted">What our farmers and clients say</p>
        </div>

        <div className="row">
          {testimonials.map((t, i) => (
            <div className="col-md-6 mb-4" key={i}>
              <div className="card border-0 shadow-sm p-4 h-100">
                <div className="text-warning mb-3">★★★★★</div>
                <p className="fst-italic text-muted mb-4 fs-5">"{t.comment}"</p>
                <div className="d-flex align-items-center mt-auto border-top pt-3">
                   <div className="bg-success text-white rounded-circle d-flex align-items-center justify-content-center fw-bold fs-4" style={{width:'60px', height:'60px'}}>
                     {t.name.charAt(0)}
                   </div>
                   <div className="ms-3">
                     <h6 className="fw-bold mb-0 text-uppercase">{t.name}</h6>
                     <small className="text-success fw-bold">{t.role}</small>
                   </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Testimonials;