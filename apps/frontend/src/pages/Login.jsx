import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Send a POST request to the login API
      const res = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
  
      // If the response status is not OK (e.g., 4xx or 5xx)
      if (!res.ok) {
        const errorData = await res.json();  // Get the error message from the response
        throw new Error(errorData.message || 'Something went wrong. Please try again.');
      }
  
      // Parse the JSON response
      const data = await res.json();
  
      // If login is successful and a token is received
      if (data.token) {
        localStorage.setItem('token', data.token);  // Store the token in localStorage
        navigate('/dashboard');  // Navigate to the home page or dashboard
      } else {
        // If no token is returned, display an error (e.g., invalid credentials)
        alert('Invalid credentials. Please try again.');
      }
    } catch (error) {
      // If an error occurs (network issue, invalid credentials, etc.), handle it here
      console.error('Login error:', error.message);
      alert(error.message);  // Show the error message to the user
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow w-96 space-y-4">
        <h2 className="text-2xl font-bold">Login</h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">Login</button>
        <p className='text-black-800 font-light'>If not Registered <Link to="/register" className='text-blue-900'>Register</Link></p>
      </form>
    </div>
  );
}
