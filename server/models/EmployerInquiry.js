// server/models/EmployerInquiry.js
const { Schema, model } = require('mongoose');

const employerInquirySchema = new Schema({
  companyName:    { type: String, required: true },
  contactPerson:  { type: String, required: true },
  email:          { type: String, required: true },
  phone:          { type: String, required: true },
  industry:       { type: String, required: true },
  positions:      { type: Number, required: true },
  details:        { type: String, required: true },
  submittedAt:    { type: Date,   default: Date.now }
});

module.exports = model('EmployerInquiry', employerInquirySchema);
