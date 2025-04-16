import mongoose from 'mongoose';

const habitSchema = new mongoose.Schema({
  name: String,
  frequency: { type: String, enum: ['daily', 'weekly', 'monthly'] },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Habit', habitSchema);
