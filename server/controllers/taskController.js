import Task from '../models/Task.js';

export const getTasks = async (req, res) => {
  const status = req.query.status;
  const filter = { userId: req.user._id };
  if (status && status !== 'All') filter.status = status.toLowerCase();

  const tasks = await Task.find(filter).sort({ createdAt: -1 });
  res.json(tasks);
};

export const createTask = async (req, res) => {
  const { title, description, priority } = req.body;
  const task = await Task.create({ title, description, priority, userId: req.user._id });
  res.status(201).json(task);
};

export const updateTask = async (req, res) => {
  const task = await Task.findOne({ _id: req.params.id, userId: req.user._id });
  if (!task) return res.status(404).json({ msg: 'Task not found' });

  Object.assign(task, req.body);
  await task.save();
  res.json(task);
};

export const deleteTask = async (req, res) => {
  const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
  if (!task) return res.status(404).json({ msg: 'Task not found' });

  res.json({ msg: 'Task deleted' });
};
