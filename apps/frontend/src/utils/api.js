const API_URL = 'http://localhost:5000/api';

export const getTasks = async () => {
  const res = await fetch(`${API_URL}/tasks`);
  return res.json();
};

export const createTask = async (data) => {
  const res = await fetch(`${API_URL}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
};
