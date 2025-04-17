import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
const API_BASE = import.meta.env.VITE_API_URL;


export default function Habits() {
  const [habits, setHabits] = useState([]);
  const [filter, setFilter] = useState('all');
  const [editingHabit, setEditingHabit] = useState(null);
  const [form, setForm] = useState({ title: '', frequency: '' });

  const fetchHabits = async () => {
    const res = await fetch('${API_BASE}/api/habits', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    const data = await res.json();
    setHabits(data);
    // console.log(data)
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  const handleDelete = async (id) => {
    // console.log(id)
    await fetch(`${API_BASE}/api/habits/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    fetchHabits();
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    await fetch(`${API_BASE}/api/habits/${editingHabit._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(form),
    });
    setEditingHabit(null);
    fetchHabits();
  };

  const filteredHabits = habits.filter(habit => {
    if (filter === 'daily') return habit.frequency === 'daily';
    if (filter === 'weekly') return habit.frequency === 'weekly';
    if (filter === 'monthly') return habit.frequency === 'monthly';
    return true;
  });

  return (
    <div>
      <Navbar />
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Your Habits</h2>
          <select
            className="border px-2 py-1 rounded"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>

        <ul className="space-y-2">
          {filteredHabits.map(habit => (
            <li key={habit._id} className="p-4 border rounded flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{habit.name}</h3>
                <p className="text-sm text-gray-500">Frequency: {habit.frequency}</p>
              </div>
              <div className="space-x-2">
                <button onClick={() => {
                  setEditingHabit(habit);
                  setForm({ ...habit });
                }} className="bg-yellow-400 px-3 py-1 rounded">Edit</button>
                <button onClick={() => handleDelete(habit._id)} className="bg-red-500 px-3 py-1 text-white rounded">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Edit Modal */}
      {editingHabit && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <form onSubmit={handleEditSubmit} className="bg-white p-6 rounded shadow-md space-y-4 w-96">
            <h3 className="text-lg font-bold">Edit Habit</h3>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full p-2 border rounded"
              placeholder="Title"
            />
            <select
              value={form.frequency}
              onChange={(e) => setForm({ ...form, frequency: e.target.value })}
              className="w-full p-2 border rounded"
            >
              <option value="">Select Frequency</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
            <div className="flex justify-between">
              <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Save</button>
              <button onClick={() => setEditingHabit(null)} className="px-4 py-2 border rounded">Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
