import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  status: { type: String, enum: ['complete', 'incomplete'], default: 'incomplete' },
  priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
  createdAt: { type: Date, default: Date.now },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const Task = mongoose.model('Task', taskSchema);
export default Task;
