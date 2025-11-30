import mongoose from 'mongoose';

const GameSchema = new mongoose.Schema({
  created: Date,
  host: mongoose.Types.ObjectId,
  active: Boolean,
  sheet: Array = [{
    player: mongoose.Types.ObjectId,
    buy_in: Number,
    checkout: Number,
  }]
});

export default mongoose.models.Game || mongoose.model('Game', GameSchema);