// server/models/ContactInquiry.js
const { Schema, model } = require('mongoose');

const contactInquirySchema = new Schema({
  firstName:   { type: String, required: true },
  lastName:    { type: String, required: true },
  email:       { type: String, required: true },
  phone:       { type: String, required: true },
  subject:     { type: String, required: true },
  message:     { type: String, required: true },
  consent:     { type: Boolean,required: true },
  submittedAt: { type: Date,   default: Date.now }
});

module.exports = model('ContactInquiry', contactInquirySchema);
