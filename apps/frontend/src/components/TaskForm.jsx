import { useState } from 'react';

export default function TaskForm({ onCreated }) {
  const [task, setTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    status: 'pending',  // Default status set to 'pending'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const res = await fetch('http://localhost:5000/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(task),
    });
    
    if (res.ok) {
      setTask({ title: '', description: '', dueDate: '', status: 'pending' }); // Reset the form
      onCreated();  // Trigger the callback after successful creation
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <h3 className="text-lg font-semibold">Create Task</h3>
      
      <input
        className="p-2 border rounded w-full"
        placeholder="Title"
        value={task.title}
        onChange={(e) => setTask({ ...task, title: e.target.value })}
      />
      
      <input
        className="p-2 border rounded w-full"
        placeholder="Description"
        value={task.description}
        onChange={(e) => setTask({ ...task, description: e.target.value })}
      />
      
      <input
        type="date"
        className="p-2 border rounded w-full"
        value={task.dueDate}
        onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
      />
      
      {/* Status Dropdown */}
      <select
        value={task.status}
        onChange={(e) => setTask({ ...task, status: e.target.value })}
        className="p-2 border rounded w-full"
      >
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>

      <button className="bg-blue-600 text-white px-4 py-2 rounded">Add Task</button>
    </form>
  );
}



// import { useState } from 'react';

// export default function TaskForm({ onCreated }) {
//   const [task, setTask] = useState({ title: '', description: '', dueDate: '' });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const res = await fetch('http://localhost:5000/api/tasks', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${localStorage.getItem('token')}`,
//       },
//       body: JSON.stringify(task),
//     });
//     if (res.ok) {
//       setTask({ title: '', description: '', dueDate: '' });
//       onCreated();
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-2">
//       <h3 className="text-lg font-semibold">Create Task</h3>
//       <input
//         className="p-2 border rounded w-full"
//         placeholder="Title"
//         value={task.title}
//         onChange={(e) => setTask({ ...task, title: e.target.value })}
//       />
//       <input
//         className="p-2 border rounded w-full"
//         placeholder="Description"
//         value={task.description}
//         onChange={(e) => setTask({ ...task, description: e.target.value })}
//       />
//       <input
//         type="date"
//         className="p-2 border rounded w-full"
//         value={task.dueDate}
//         onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
//       />
//       <button className="bg-blue-600 text-white px-4 py-2 rounded">Add Task</button>
//     </form>
//   );
// }

