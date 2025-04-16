import { useState } from 'react';

export default function HabitForm({ onCreated }) {
  const [habit, setHabit] = useState({ name: '', frequency: 'daily' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/api/habits', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(habit),
    });
    if (res.ok) {
      setHabit({ name: '', frequency: 'daily' });
      onCreated();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <h3 className="text-lg font-semibold">Create Habit</h3>
      <input
        className="p-2 border rounded w-full"
        placeholder="Habit Name"
        value={habit.name}
        onChange={(e) => setHabit({ ...habit, name: e.target.value })}
      />
      <select
        className="p-2 border rounded w-full"
        value={habit.frequency}
        onChange={(e) => setHabit({ ...habit, frequency: e.target.value })}
      >
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
      </select>
      <button className="bg-green-600 text-white px-4 py-2 rounded">Add Habit</button>
    </form>
  );
}
