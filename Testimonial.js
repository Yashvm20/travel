const mongoose = require('mongoose');

const TestimonialSchema = new mongoose.Schema({
  name: String,
  role: String,
  comment: String,
  image: String
});

module.exports = mongoose.model('Testimonial', TestimonialSchema);