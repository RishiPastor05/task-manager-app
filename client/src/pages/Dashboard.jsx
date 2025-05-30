import { useEffect, useState } from 'react';
import API from '../utils/api';
import TaskCard from '../components/TaskCard';
import Header from '../components/Header';
 
const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', priority: 'Low' });
  const [filter, setFilter] = useState('All');

  const getTasks = async () => {
    try {
      const res = await API.get('/tasks');
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await API.post('/tasks', form);
      setForm({ title: '', description: '', priority: 'Low' });
      getTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = async (id, updatedFields) => {
    try {
      // Send the update request to the backend
      await API.patch(`/tasks/${id}`, updatedFields);
  
      // Update the local task state to reflect the change
      setTasks(prevTasks =>
        prevTasks.map(task =>
          task._id === id ? { ...task, ...updatedFields } : task
        )
      );
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  // Delete task
  const handleDelete = async (id) => {
    try {
      // Send delete request to the backend
      await API.delete(`/tasks/${id}`);
  
      // Update local state to remove the deleted task
      setTasks(prevTasks => prevTasks.filter(task => task._id !== id));
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };
  

  useEffect(() => {
    getTasks();
  }, []);

  const filteredTasks = tasks.filter(task => {
    if (filter === 'All') return true;
    return filter === 'Completed' ? task.status === 'complete' : task.status !== 'complete';
  });

  return (
    <>
      <Header />
      <div className="max-w-3xl mx-auto py-6 px-4">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-6">
          <h2 className="text-xl font-semibold">Add New Task</h2>
          <input name="title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Title" required className="border p-2 rounded" />
          <textarea name="description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Description" required className="border p-2 rounded" />
          <select name="priority" value={form.priority} onChange={e => setForm({ ...form, priority: e.target.value })} className="border p-2 rounded">
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
          <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded">Add Task</button>
        </form>

        <div className="mb-4">
          <label className="mr-2 font-semibold">Filter:</label>
          {['All', 'Active', 'Completed'].map(f => (
            <button
              key={f}
              className={`px-3 py-1 mx-1 rounded ${filter === f ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid gap-4">
          {filteredTasks.length > 0 ? filteredTasks.map(task => (
            <TaskCard key={task._id} task={task} onUpdate={handleUpdate} onDelete={handleDelete}/>
          )) : <p>No tasks found.</p>}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
