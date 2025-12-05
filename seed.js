const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// --- 1. DEFINE SCHEMAS (Standalone for Seeding) ---
const ServiceSchema = new mongoose.Schema({ title: String, description: String, icon: String });
const UserSchema = new mongoose.Schema({ name: String, email: String, password: String, role: String });
const PostSchema = new mongoose.Schema({ title: String, category: String, author: String, date: String });
const TestimonialSchema = new mongoose.Schema({ name: String, role: String, comment: String });

// --- 2. CREATE MODELS ---
const Service = mongoose.models.Service || mongoose.model('Service', ServiceSchema);
const User = mongoose.models.User || mongoose.model('User', UserSchema);
const Post = mongoose.models.Post || mongoose.model('Post', PostSchema);
const Testimonial = mongoose.models.Testimonial || mongoose.model('Testimonial', TestimonialSchema);

// --- 3. DATA TO INSERT ---

const servicesData = [
  { title: "Planting", description: "Expert planting services using modern techniques to ensure high crop yield and healthy growth.", icon: "🌱" },
  { title: "Mulching", description: "Soil mulching to conserve moisture, improve soil fertility, and significantly reduce weed growth.", icon: "🍂" },
  { title: "Plowing", description: "Professional land preparation and plowing services to get your fields ready for the planting season.", icon: "🚜" },
  { title: "Mowing", description: "Regular maintenance and mowing services to keep your farm landscape clean and organized.", icon: "✂️" },
  { title: "Seeding", description: "High-quality seeding using the best varieties of seeds for optimal germination and harvest.", icon: "🌾" },
  { title: "Fresh Vegetables", description: "We provide a daily supply of fresh, organic vegetables harvested directly from our fields.", icon: "🥦" },
  { title: "Watering", description: "Advanced irrigation and watering solutions to ensure your crops receive the perfect amount of water.", icon: "💧" },
  { title: "Vegetable Selling", description: "Direct-to-market distribution services helping you sell your produce to a wider customer base.", icon: "🏪" }
];

const postsData = [
  { title: "New Agriculture Policies 2025", category: "Politics", author: "Julia Parker", date: "Dec 12" },
  { title: "Best Crops for Winter Season", category: "Farming", author: "Mario Douglas", date: "Dec 19" },
  { title: "How to Save Water in Farming", category: "Economics", author: "Lisa Hunter", date: "Dec 24" }
];

const testimonialsData = [
  { name: "James Smith", role: "Farmer", comment: "Using this app helped me increase my profits by 30%!" },
  { name: "Kate Smith", role: "Farmer", comment: "I learned about government subsidies I never knew about." },
  { name: "Claire Anderson", role: "Seller", comment: "Now I know the exact market rates before selling my crops." }
];

// --- 4. EXECUTION ---
mongoose.connect('mongodb://127.0.0.1:27017/agricultureDB')
  .then(async () => {
    console.log("✅ MongoDB Connected for Seeding!");

    // Clear old data
    console.log("🗑️  Clearing old data...");
    await Service.deleteMany({});
    await User.deleteMany({});
    await Post.deleteMany({});
    await Testimonial.deleteMany({});

    // Insert Data
    console.log("🌱 Inserting Services...");
    await Service.insertMany(servicesData);
    
    console.log("📰 Inserting Blog Posts...");
    await Post.insertMany(postsData);
    
    console.log("💬 Inserting Testimonials...");
    await Testimonial.insertMany(testimonialsData);

    // Create Users
    console.log("👤 Creating Admin & User...");
    const hashedAdmin = await bcrypt.hash("admin123", 10);
    const hashedUser = await bcrypt.hash("user123", 10);

    await User.insertMany([
      { name: "Admin", email: "admin@example.com", password: hashedAdmin, role: "admin" },
      { name: "User", email: "user@example.com", password: hashedUser, role: "user" }
    ]);

    console.log("🎉 SUCCESS! Database populated.");
    console.log("------------------------------------------------");
    console.log("🔑 Admin Login: admin@example.com | admin123");
    console.log("🔑 User Login:  user@example.com  | user123");
    console.log("------------------------------------------------");
    process.exit();
  })
  .catch(err => {
    console.error("❌ Error:", err);
    process.exit(1);
  });