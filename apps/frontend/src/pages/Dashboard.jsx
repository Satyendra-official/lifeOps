import { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
import TaskForm from '../components/TaskForm';
import HabitForm from '../components/HabitForm';
import Navbar from '../components/Navbar';
const API_BASE = import.meta.env.VITE_API_URL;


export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [habits, setHabits] = useState([]);
  const [user, setUser] = useState(null);  // State for logged-in user details
  const token = localStorage.getItem('token');

  const fetchData = async () => {
    const headers = { Authorization: `Bearer ${token}` };
    const [tasksRes, habitsRes, userRes] = await Promise.all([
      fetch(`${API_BASE}/api/tasks`, { headers }),
      fetch(`${API_BASE}/api/habits`, { headers }),
      fetch(`${API_BASE}/api/users/me`, { headers }), // New endpoint to fetch user data
    ]);

    // Set the tasks, habits, and user data
    setTasks(await tasksRes.json());
    setHabits(await habitsRes.json());
    setUser(await userRes.json());  // Assume the user endpoint returns user details
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-8 space-y-6">
      <Navbar />

      {/* Display logged-in user details */}
      {user && (
        <div className="mb-6 p-4 border rounded bg-blue-50">
          <h3 className="text-lg font-semibold">Welcome, {user.name}!</h3>
          <p className="text-sm">Email: {user.email}</p>
        </div>
      )}

      <TaskForm onCreated={fetchData} />
      <HabitForm onCreated={fetchData} />

      <div className="grid grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold">Tasks</h2>
          <ul className="space-y-2 mt-2">
            {tasks.map((task) => (
              <li key={task._id} className="p-2 border rounded">{task.title}</li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold">Habits</h2>
          <ul className="space-y-2 mt-2">
            {habits.map((habit) => (
              <li key={habit._id} className="p-2 border rounded">{habit.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
