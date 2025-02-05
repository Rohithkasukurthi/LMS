const mongoose = require('mongoose');

const TokenSchema = new mongoose.Schema({
  user_id: { type: String, required: true }, // Associate with a user
  access_token: { type: String, required: true },
  refresh_token: { type: String, required: true },
  expires_at: { type: Date, required: true }, // Calculate expiry based on `expires_in`
});

module.exports = mongoose.model('Token', TokenSchema);
