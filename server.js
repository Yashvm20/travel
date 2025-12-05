const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// --- MODELS ---
// Ensure these files exist in your 'backend/models' folder
const Service = require('./models/Service');
const Booking = require('./models/Booking');
const User = require('./models/User');
const Post = require('./models/Post');
const Testimonial = require('./models/Testimonial');

// --- CONFIGURATION ---
const app = express();
app.use(cors());
app.use(express.json());

const SECRET_KEY = "my_super_secret_key"; // In a real app, use a .env file

// --- DATABASE CONNECTION ---
mongoose.connect('mongodb://127.0.0.1:27017/agricultureDB')
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch(err => console.log("❌ MongoDB Connection Error:", err));

// --- MIDDLEWARE (Security Check) ---
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).json({ message: "No token provided" });
  
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(500).json({ message: "Failed to authenticate token" });
    req.userId = decoded.id;
    req.userRole = decoded.role;
    next();
  });
};

// ==========================================
//               ROUTES
// ==========================================

// --- AUTHENTICATION ---

// 1. Register User
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully!" });
  } catch (err) {
    res.status(500).json({ error: "Registration failed. Email might exist." });
  }
});

// 2. Login User (UPDATED WITH EMAIL)
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) return res.status(401).json({ message: "Invalid Password" });

    const token = jwt.sign({ id: user._id, role: user.role }, SECRET_KEY, { expiresIn: 86400 }); // 24 hours

    // Send EMAIL back too so frontend can use it for bookings
    res.json({ 
      auth: true, 
      token: token, 
      role: user.role, 
      name: user.name, 
      email: user.email 
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- PUBLIC DATA ROUTES ---

// Get All Services
app.get('/api/services', async (req, res) => {
  const services = await Service.find();
  res.json(services);
});

// Get Single Service
app.get('/api/services/:id', async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ message: "Service not found" });
    res.json(service);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create Booking (Public)
app.post('/api/bookings', async (req, res) => {
  try {
    const newBooking = new Booking(req.body);
    await newBooking.save();
    res.json({ message: "Booking Saved Successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Blog Posts
app.get('/api/posts', async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
});

// Get Testimonials
app.get('/api/testimonials', async (req, res) => {
  const testimonials = await Testimonial.find();
  res.json(testimonials);
});

// --- USER ROUTES (Protected) ---

// Get Logged-in User's Bookings
app.get('/api/my-bookings', verifyToken, async (req, res) => {
  try {
    // 1. Find the logged-in user to get their email
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // 2. Find bookings that match this email
    const bookings = await Booking.find({ email: user.email }).sort({ date: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- ADMIN ROUTES (Protected) ---

// 1. DASHBOARD STATISTICS
app.get('/api/admin/stats', verifyToken, async (req, res) => {
  if (req.userRole !== 'admin') return res.status(403).json({ message: "Admin only" });
  try {
    const bookingsCount = await Booking.countDocuments();
    const usersCount = await User.countDocuments();
    const servicesCount = await Service.countDocuments();
    const postsCount = await Post.countDocuments();
    
    res.json({ bookings: bookingsCount, users: usersCount, services: servicesCount, posts: postsCount });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. MANAGE BOOKINGS
app.get('/api/admin/bookings', verifyToken, async (req, res) => {
  if (req.userRole !== 'admin') return res.status(403).json({ message: "Admin only" });
  const bookings = await Booking.find().sort({ date: -1 });
  res.json(bookings);
});

app.put('/api/admin/bookings/:id', verifyToken, async (req, res) => {
  if (req.userRole !== 'admin') return res.status(403).json({ message: "Admin only" });
  try {
    const updatedBooking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedBooking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/admin/bookings/:id', verifyToken, async (req, res) => {
  if (req.userRole !== 'admin') return res.status(403).json({ message: "Admin only" });
  await Booking.findByIdAndDelete(req.params.id);
  res.json({ message: "Booking Deleted" });
});

// 3. MANAGE USERS
app.get('/api/admin/users', verifyToken, async (req, res) => {
  if (req.userRole !== 'admin') return res.status(403).json({ message: "Admin only" });
  const users = await User.find().select('-password');
  res.json(users);
});

app.delete('/api/admin/users/:id', verifyToken, async (req, res) => {
  if (req.userRole !== 'admin') return res.status(403).json({ message: "Admin only" });
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User Deleted" });
});

// 4. MANAGE SERVICES
app.post('/api/admin/services', verifyToken, async (req, res) => {
  if (req.userRole !== 'admin') return res.status(403).json({ message: "Admin only" });
  const newService = new Service(req.body);
  await newService.save();
  res.json(newService);
});

app.delete('/api/admin/services/:id', verifyToken, async (req, res) => {
  if (req.userRole !== 'admin') return res.status(403).json({ message: "Admin only" });
  await Service.findByIdAndDelete(req.params.id);
  res.json({ message: "Service Deleted" });
});

// 5. MANAGE BLOG POSTS
app.post('/api/admin/posts', verifyToken, async (req, res) => {
  if (req.userRole !== 'admin') return res.status(403).json({ message: "Admin only" });
  try {
    const newPost = new Post(req.body);
    await newPost.save();
    res.json(newPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/admin/posts/:id', verifyToken, async (req, res) => {
  if (req.userRole !== 'admin') return res.status(403).json({ message: "Admin only" });
  await Post.findByIdAndDelete(req.params.id);
  res.json({ message: "Post Deleted" });
});

// 6. MANAGE TESTIMONIALS
app.delete('/api/admin/testimonials/:id', verifyToken, async (req, res) => {
  if (req.userRole !== 'admin') return res.status(403).json({ message: "Admin only" });
  await Testimonial.findByIdAndDelete(req.params.id);
  res.json({ message: "Testimonial Deleted" });
});

// --- SEED ROUTE ---
app.get('/api/seed', async (req, res) => {
    res.send("Seed route exists. Use seed.js script for full reset.");
});

// --- START SERVER ---
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));