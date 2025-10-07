const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema(
  {
    name:      { type: String, required: true },
    firstName: { type: String, required: true},
    email:     { type: String },
    phone:     { type: String },
    userId:    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Contact', ContactSchema);
