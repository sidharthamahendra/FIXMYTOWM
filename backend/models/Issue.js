const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
  category: { type: String, required: true },
  description: { type: String, required: true },
  reporterId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  address: { type: String },
  contact: { type: String, required: true }, // ✅ Added contact number
  status: { type: String, enum: ['Pending', 'In Progress', 'Resolved'], default: 'Pending' },
  assignedVolunteer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  photos: [String],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Issue', issueSchema);
