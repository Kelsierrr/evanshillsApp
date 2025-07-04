// server/models/Application.js
const { Schema, model } = require('mongoose');

const applicationSchema = new Schema({
  userId:      { type: Schema.Types.ObjectId, ref: 'User', required: true},
  jobId:       { type: Schema.Types.ObjectId, ref: 'Job', required: true },
  name:        { type: String, required: true },
  email:       { type: String, required: true },
  phone:       { type: String, required: true },
  coverLetter: { type: String, required: true },
  resumeUrl:   { type: String },
  appliedAt:   { type: Date, default: Date.now }
});

module.exports = model('Application', applicationSchema);
