import { useEffect, useState } from 'react';
import TaskForm from '../components/TaskForm';
import HabitForm from '../components/HabitForm';
import Navbar from '../components/Navbar';

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [habits, setHabits] = useState([]);
  const token = localStorage.getItem('token');

  const fetchData = async () => {
    const headers = { Authorization: `Bearer ${token}` };
    const [tasksRes, habitsRes] = await Promise.all([
      fetch('http://localhost:5000/api/tasks', { headers }),
      fetch('http://localhost:5000/api/habits', { headers }),
    ]);

    setTasks(await tasksRes.json());
    setHabits(await habitsRes.json());
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-8 space-y-6">
      <Navbar />
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
