import React from 'react';

function About() {
  return (
    <div>
      {/* Section 1: Why Choose Us */}
      <section className="py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0">
               <img 
                 src="https://images.unsplash.com/photo-1625246333195-551e51247100?auto=format&fit=crop&w=800" 
                 alt="Farmer" 
                 className="img-fluid rounded-3 shadow" 
               />
            </div>
            <div className="col-lg-6 ps-lg-5">
              <h6 className="text-success text-uppercase fw-bold">Why Choose Us</h6>
              <h2 className="fw-bold mb-4 display-6">More than 50 year experience in agriculture industry</h2>
              <p className="text-muted mb-4">
                Reprehenderit, odio laboriosam? Blanditiis quae ullam quasi illum minima nostrum perspiciatis error consequatur sit nulla.
              </p>
              
              {/* Feature List */}
              <div className="d-flex align-items-start mb-3">
                <div className="bg-success text-white rounded-circle p-2 me-3">🌧️</div>
                <div>
                  <h5 className="fw-bold mb-0">Plants needs rain</h5>
                  <small className="text-muted">Lorem ipsum dolor sit amet.</small>
                </div>
              </div>
              <div className="d-flex align-items-start mb-3">
                <div className="bg-success text-white rounded-circle p-2 me-3">❤️</div>
                <div>
                  <h5 className="fw-bold mb-0">Love organic foods</h5>
                  <small className="text-muted">Lorem ipsum dolor sit amet.</small>
                </div>
              </div>
              <div className="d-flex align-items-start">
                <div className="bg-success text-white rounded-circle p-2 me-3">🥬</div>
                <div>
                  <h5 className="fw-bold mb-0">Sell vegies</h5>
                  <small className="text-muted">Lorem ipsum dolor sit amet.</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Plants Make Life Better */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row align-items-center">
             <div className="col-lg-6 order-lg-2">
               <img 
                 src="https://images.unsplash.com/photo-1595814433015-e6f5ce69614e?auto=format&fit=crop&w=800" 
                 alt="Plants" 
                 className="img-fluid rounded-3 shadow" 
               />
             </div>
             <div className="col-lg-6 order-lg-1 pe-lg-5">
                <h2 className="fw-bold mb-3">Plants Make Life Better</h2>
                <figure className="bg-white p-3 border-start border-success border-4 mb-4">
                  <blockquote className="blockquote mb-0">
                    <p className="fs-6 fst-italic text-muted">
                      "Hamari zindagi badal gayi jab se humein sahi kheti ki jankari milne lagi. Pehle hum andaz se kaam karte the, ab har faisla data ke basis par karte hain."
                    </p>
                  </blockquote>
                </figure>
                
                <ul className="list-unstyled text-muted">
                  <li className="mb-2">✅ Lorem ipsum dolor sit amet</li>
                  <li className="mb-2">✅ Velit explicabo vitae repellendu</li>
                  <li className="mb-2">✅ Repellat aliquam nihil illo</li>
                </ul>
                
                <button className="btn btn-success rounded-pill px-4 mt-3">Get in Touch</button>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;