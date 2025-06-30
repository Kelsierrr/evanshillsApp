const { Schema, model } = require('mongoose');

const serviceRequestSchema = new Schema({
  packageName:   { type: String, required: true },
  name:          { type: String, required: true },
  email:         { type: String, required: true },
  phone:         { type: String, required: true },
  requestedAt:   { type: Date,   default: Date.now }
});

module.exports = model('ServiceRequest', serviceRequestSchema);
