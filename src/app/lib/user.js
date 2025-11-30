import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  user_id: String,
  first_name: String,
  last_name: String,
  user_name: String,
  photo: String,
  profit_loss: Number,
  balance: Number,
  last_updated: Date,
});

export default mongoose.models.User || mongoose.model('User', UserSchema);