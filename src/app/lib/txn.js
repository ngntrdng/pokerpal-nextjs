import mongoose from 'mongoose';

const TxnSchema = new mongoose.Schema({
  uid: mongoose.Types.ObjectId,
  txn: Object = {
    type: String,
    value: Number,
    game_id: mongoose.Types.ObjectId,
    datetime: Date,
  }
});

export default mongoose.models.Txn || mongoose.model('Txn', TxnSchema);