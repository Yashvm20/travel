import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('bookings'); // bookings, services, users, blog
  
  // Data State
  const [stats, setStats] = useState({ bookings: 0, users: 0, services: 0, posts: 0 });
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const [services, setServices] = useState([]);
  const [posts, setPosts] = useState([]);
  
  // Forms State
  const [newService, setNewService] = useState({ title: '', description: '', icon: '' });
  const [newPost, setNewPost] = useState({ title: '', category: '', author: '', date: new Date().toLocaleDateString() });

  const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return { headers: { 'Authorization': token } };
  };

  const fetchData = useCallback(async () => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (!token || role !== 'admin') {
      navigate('/login');
      return;
    }

    try {
      // Always fetch stats
      const statsRes = await axios.get('http://localhost:5000/api/admin/stats', getAuthHeader());
      setStats(statsRes.data);

      // Fetch Tab Data
      if (activeTab === 'bookings') {
        const res = await axios.get('http://localhost:5000/api/admin/bookings', getAuthHeader());
        setBookings(res.data);
      } else if (activeTab === 'users') {
        const res = await axios.get('http://localhost:5000/api/admin/users', getAuthHeader());
        setUsers(res.data);
      } else if (activeTab === 'services') {
        const res = await axios.get('http://localhost:5000/api/services');
        setServices(res.data);
      } else if (activeTab === 'blog') {
        const res = await axios.get('http://localhost:5000/api/posts');
        setPosts(res.data);
      }
    } catch (err) {
      console.error(err);
    }
  }, [activeTab, navigate]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // --- ACTIONS ---

  const updateBookingStatus = async (id, status) => {
    await axios.put(`http://localhost:5000/api/admin/bookings/${id}`, { status }, getAuthHeader());
    fetchData();
  };

  const deleteItem = async (type, id) => {
    if (window.confirm("Are you sure you want to delete this?")) {
      await axios.delete(`http://localhost:5000/api/admin/${type}/${id}`, getAuthHeader());
      fetchData();
    }
  };

  const handleAddService = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/admin/services', newService, getAuthHeader());
    setNewService({ title: '', description: '', icon: '' });
    fetchData();
  };

  const handleAddPost = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/admin/posts', newPost, getAuthHeader());
    setNewPost({ title: '', category: '', author: '', date: new Date().toLocaleDateString() });
    alert("Blog Post Published!");
    fetchData();
  };

  return (
    <div className="container py-5">
      <h2 className="text-center fw-bold mb-4">Admin Dashboard</h2>

      {/* --- STATS CARDS --- */}
      <div className="row mb-5">
        <div className="col-md-3">
          <div className="card bg-primary text-white text-center p-3 shadow-sm border-0">
            <h3>{stats.bookings}</h3>
            <span>Total Bookings</span>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-success text-white text-center p-3 shadow-sm border-0">
            <h3>{stats.services}</h3>
            <span>Active Services</span>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-warning text-dark text-center p-3 shadow-sm border-0">
            <h3>{stats.users}</h3>
            <span>Users</span>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card bg-info text-white text-center p-3 shadow-sm border-0">
            <h3>{stats.posts}</h3>
            <span>Blog Posts</span>
          </div>
        </div>
      </div>

      {/* --- TABS --- */}
      <ul className="nav nav-pills justify-content-center mb-5">
        <li className="nav-item">
          <button className={`nav-link px-4 ${activeTab === 'bookings' ? 'active bg-dark' : 'text-dark'}`} onClick={() => setActiveTab('bookings')}>Bookings</button>
        </li>
        <li className="nav-item mx-2">
          <button className={`nav-link px-4 ${activeTab === 'services' ? 'active bg-dark' : 'text-dark'}`} onClick={() => setActiveTab('services')}>Services</button>
        </li>
        <li className="nav-item mx-2">
          <button className={`nav-link px-4 ${activeTab === 'users' ? 'active bg-dark' : 'text-dark'}`} onClick={() => setActiveTab('users')}>Users</button>
        </li>
        <li className="nav-item">
          <button className={`nav-link px-4 ${activeTab === 'blog' ? 'active bg-dark' : 'text-dark'}`} onClick={() => setActiveTab('blog')}>Blog</button>
        </li>
      </ul>

      {/* --- TAB CONTENT --- */}

      {/* 1. BOOKINGS */}
      {activeTab === 'bookings' && (
        <div className="card shadow border-0">
          <div className="card-header bg-dark text-white"><h5>Manage Bookings</h5></div>
          <div className="card-body p-0">
            <table className="table table-striped mb-0">
              <thead><tr><th>Service</th><th>Customer</th><th>Date</th><th>Status</th><th>Actions</th></tr></thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b._id}>
                    <td>{b.serviceName}</td>
                    <td>{b.customerName}<br/><small>{b.email}</small></td>
                    <td>{new Date(b.date).toLocaleDateString()}</td>
                    <td><span className={`badge ${b.status === 'Confirmed' ? 'bg-success' : 'bg-warning text-dark'}`}>{b.status}</span></td>
                    <td>
                      <button onClick={() => updateBookingStatus(b._id, 'Confirmed')} className="btn btn-sm btn-success me-1">Confirm</button>
                      <button onClick={() => deleteItem('bookings', b._id)} className="btn btn-sm btn-danger">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 2. SERVICES */}
      {activeTab === 'services' && (
        <div>
          <div className="card shadow mb-4 border-0">
            <div className="card-body bg-light">
              <h5 className="mb-3">Add Service</h5>
              <form onSubmit={handleAddService} className="row g-2">
                <div className="col-md-3"><input className="form-control" placeholder="Title" value={newService.title} onChange={e => setNewService({...newService, title: e.target.value})} required /></div>
                <div className="col-md-2"><input className="form-control" placeholder="Icon (e.g. 🌱)" value={newService.icon} onChange={e => setNewService({...newService, icon: e.target.value})} required /></div>
                <div className="col-md-5"><input className="form-control" placeholder="Description" value={newService.description} onChange={e => setNewService({...newService, description: e.target.value})} required /></div>
                <div className="col-md-2"><button className="btn btn-success w-100">Add</button></div>
              </form>
            </div>
          </div>
          <div className="row">
            {services.map((s) => (
              <div className="col-md-4 mb-3" key={s._id}>
                <div className="card h-100 shadow-sm text-center p-3">
                  <h3>{s.icon}</h3>
                  <h5>{s.title}</h5>
                  <button onClick={() => deleteItem('services', s._id)} className="btn btn-outline-danger btn-sm mt-2">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. USERS */}
      {activeTab === 'users' && (
        <div className="card shadow border-0">
          <div className="card-header bg-dark text-white"><h5>Manage Users</h5></div>
          <div className="card-body p-0">
            <table className="table table-striped mb-0">
              <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Action</th></tr></thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u._id}>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td><span className={`badge ${u.role === 'admin' ? 'bg-danger' : 'bg-primary'}`}>{u.role}</span></td>
                    <td>{u.role !== 'admin' && <button onClick={() => deleteItem('users', u._id)} className="btn btn-sm btn-danger">Delete</button>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 4. BLOG POSTS */}
      {activeTab === 'blog' && (
        <div>
          <div className="card shadow mb-4 border-0">
             <div className="card-body bg-light">
              <h5 className="mb-3">Write New Post</h5>
              <form onSubmit={handleAddPost} className="row g-2">
                <div className="col-md-4"><input className="form-control" placeholder="Title" value={newPost.title} onChange={e => setNewPost({...newPost, title: e.target.value})} required /></div>
                <div className="col-md-3"><input className="form-control" placeholder="Category" value={newPost.category} onChange={e => setNewPost({...newPost, category: e.target.value})} required /></div>
                <div className="col-md-3"><input className="form-control" placeholder="Author" value={newPost.author} onChange={e => setNewPost({...newPost, author: e.target.value})} required /></div>
                <div className="col-md-2"><button className="btn btn-success w-100">Publish</button></div>
              </form>
            </div>
          </div>
          <div className="row">
             {posts.map((p) => (
               <div className="col-md-6 mb-3" key={p._id}>
                 <div className="card shadow-sm p-3">
                   <div className="d-flex justify-content-between">
                     <h5 className="fw-bold">{p.title}</h5>
                     <small>{p.date}</small>
                   </div>
                   <p className="text-muted mb-2">By {p.author} | {p.category}</p>
                   <button onClick={() => deleteItem('posts', p._id)} className="btn btn-sm btn-outline-danger">Delete Post</button>
                 </div>
               </div>
             ))}
          </div>
        </div>
      )}

    </div>
  );
}

export default AdminDashboard;