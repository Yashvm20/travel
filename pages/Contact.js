import React from 'react';

function Contact() {
  return (
    <div className="container py-5">
      {/* Header */}
      <div className="text-center mb-5">
        <h1 className="fw-bold display-4">Contact</h1>
        <p className="text-muted">Home / Contact</p>
      </div>

      <div className="row gy-5">
        {/* Left Side: Info */}
        <div className="col-lg-5">
          <h3 className="fw-bold mb-4">Get in touch</h3>
          <p className="text-muted mb-5">
            Et id es voluptaque enim in Tempire imenima sa at milli koито от.
          </p>

          <div className="d-flex mb-4">
            <div className="bg-light p-3 rounded text-success me-3 h4">📍</div>
            <div>
              <h5 className="fw-bold mb-1">Location:</h5>
              <p className="text-muted mb-0">A108 Adam Street, New York, NY 535022</p>
            </div>
          </div>

          <div className="d-flex mb-4">
             <div className="bg-light p-3 rounded text-success me-3 h4">📧</div>
            <div>
              <h5 className="fw-bold mb-1">Email:</h5>
              <p className="text-muted mb-0">info@example.com</p>
            </div>
          </div>

          <div className="d-flex">
             <div className="bg-light p-3 rounded text-success me-3 h4">📱</div>
            <div>
              <h5 className="fw-bold mb-1">Call:</h5>
              <p className="text-muted mb-0">+1 5589 55488 55</p>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="col-lg-7">
          <div className="p-4 shadow-sm bg-white rounded border">
            <form>
              <div className="row g-3 mb-3">
                <div className="col-md-6">
                  <input type="text" className="form-control p-3" placeholder="Your Name" />
                </div>
                <div className="col-md-6">
                  <input type="email" className="form-control p-3" placeholder="Your Email" />
                </div>
              </div>
              <div className="mb-3">
                <input type="text" className="form-control p-3" placeholder="Subject" />
              </div>
              <div className="mb-3">
                <textarea className="form-control p-3" rows="6" placeholder="Message"></textarea>
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-success rounded-pill px-5 py-3 fw-bold">Send Message</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;