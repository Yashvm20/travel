const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  serviceId: String,
  serviceName: String,
  customerName: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  date: { type: Date, required: true },
  address: String,
  status: { type: String, default: 'Pending' }, // Pending, Confirmed, etc.
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', BookingSchema);