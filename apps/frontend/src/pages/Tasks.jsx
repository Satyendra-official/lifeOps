import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [showCalendar, setShowCalendar] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [form, setForm] = useState({ title: "", description: "", dueDate: "" });

  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5000/api/tasks", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    const data = await res.json();
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/api/tasks/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    fetchTasks();
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:5000/api/tasks/${editingTask._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(form),
    });
    setEditingTask(null);
    fetchTasks();
  };


  const filteredTasks = tasks.filter(task => {
    if (filter === 'today') {
      const today = new Date().toISOString().split('T')[0];
      return task.dueDate?.startsWith(today);
    }
    if (filter === 'pending' || filter === 'in-progress' || filter === 'completed') {
      return task.status === filter;
    }
    return true;
  });
  // const filteredTasks = tasks.filter((task) => {
  //   if (filter === "today") {
  //     const today = new Date().toISOString().split("T")[0];
  //     return task.dueDate?.startsWith(today);
  //   }
  //   return true;
  // });

  return (
    <div>
      <Navbar />
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Your Tasks</h2>
          <div className="space-x-2">
            <select
              className="border px-2 py-1 rounded"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All</option>
              <option value="today">Today</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>

            {/* <select
              className="border px-2 py-1 rounded"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All</option>
              <option value="today">Today</option>
            </select> */}
            <button
              className="bg-indigo-600 text-white px-3 py-1 rounded"
              onClick={() => setShowCalendar(!showCalendar)}
            >
              {showCalendar ? "Hide Calendar" : "Calendar View"}
            </button>
          </div>
        </div>

        {/* TASK LIST */}
        <ul className="space-y-2">
          {filteredTasks.map((task) => (
            <li
              key={task._id}
              className="p-4 border rounded flex justify-between items-center"
            >
              <div>
                <h3 className="font-semibold">{task.title}</h3>
                <p className="text-sm">{task.description}</p>
                <p className="text-xs text-gray-500">
                  Due: {task.dueDate?.slice(0, 10)}
                </p>
                <p className="text-xs text-gray-500">
                  Status: <span className="font-semibold">{task.status}</span>
                </p>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => {
                    setEditingTask(task);
                    setForm({ ...task });
                  }}
                  className="bg-yellow-400 px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(task._id)}
                  className="bg-red-500 px-3 py-1 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>

        {/* <ul className="space-y-2">
          {filteredTasks.map(task => (
            <li key={task._id} className="p-4 border rounded flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{task.title}</h3>
                <p className="text-sm">{task.description}</p>
                <p className="text-xs text-gray-500">Due: {task.dueDate?.slice(0, 10)}</p>
              </div>
              <div className="space-x-2">
                <button onClick={() => {
                  setEditingTask(task);
                  setForm({ ...task });
                }} className="bg-yellow-400 px-3 py-1 rounded">Edit</button>
                <button onClick={() => handleDelete(task._id)} className="bg-red-500 px-3 py-1 text-white rounded">Delete</button>
              </div>
            </li>
          ))}
        </ul> */}

        {/* SIMPLE CALENDAR */}
        {showCalendar && (
          <div className="mt-8">
            <h3 className="text-xl font-semibold">Calendar View</h3>
            <div className="grid grid-cols-7 gap-4 mt-2 text-center">
              {filteredTasks.map((task) => (
                <div key={task._id} className="border p-2 rounded bg-blue-100">
                  <p className="text-sm">
                    {new Date(task.dueDate).toDateString()}
                  </p>
                  <p className="text-xs truncate">{task.title}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* EDIT MODAL */}
      {editingTask && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <form
            onSubmit={handleEditSubmit}
            className="bg-white p-6 rounded shadow-md space-y-4 w-96"
          >
            <h3 className="text-lg font-bold">Edit Task</h3>
            <input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full p-2 border rounded"
              placeholder="Title"
            />
            <input
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className="w-full p-2 border rounded"
              placeholder="Description"
            />
            <input
              type="date"
              value={form.dueDate?.slice(0, 10)}
              onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
              className="w-full p-2 border rounded"
            />

            {/* Status Dropdown */}
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
              className="w-full p-2 border rounded"
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>

            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Save
              </button>
              <button
                onClick={() => setEditingTask(null)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* {editingTask && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <form
            onSubmit={handleEditSubmit}
            className="bg-white p-6 rounded shadow-md space-y-4 w-96"
          >
            <h3 className="text-lg font-bold">Edit Task</h3>
            <input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full p-2 border rounded"
              placeholder="Title"
            />
            <input
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className="w-full p-2 border rounded"
              placeholder="Description"
            />
            <input
              type="date"
              value={form.dueDate?.slice(0, 10)}
              onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
              className="w-full p-2 border rounded"
            />
            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Save
              </button>
              <button
                onClick={() => setEditingTask(null)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )} */}
    </div>
  );
}
