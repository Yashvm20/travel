import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Blog() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch posts from your backend
    axios.get('http://localhost:5000/api/posts')
      .then(res => setPosts(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h2 className="fw-bold text-uppercase">Recent Posts</h2>
        <div className="bg-success mx-auto" style={{width: '60px', height: '3px'}}></div>
      </div>

      <div className="row">
        {posts.map((post, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className="card h-100 border-0 shadow-sm">
              {/* Placeholder image since we don't have real files */}
              <div style={{height: '200px', backgroundColor: '#e9ecef'}} className="w-100 d-flex align-items-center justify-content-center text-muted">
                Blog Image
              </div>
              
              <div className="card-body">
                <div className="d-flex justify-content-between text-muted small mb-2">
                  <span>📅 {post.date}</span>
                  <span className="text-success">{post.category}</span>
                </div>
                <h5 className="card-title fw-bold mb-3">{post.title}</h5>
                <div className="d-flex align-items-center">
                  <div className="bg-light rounded-circle border d-flex align-items-center justify-content-center" style={{width:'30px', height:'30px'}}>
                    👤
                  </div>
                  <small className="text-muted ms-2">{post.author}</small>
                </div>
                <hr />
                <a href="#" className="text-decoration-none text-success fw-bold small">
                  Read More →
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Blog;