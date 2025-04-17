import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';


export default function Navbar() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if the token exists when the component mounts
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token); // Update the authentication state
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false); // Set authentication state to false after logout
    navigate('/'); // Redirect to home page
  };

  return (
    <nav className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">LifeOps</h1>
      <div className="space-x-4">
        <Link to="/dashboard" className="hover:underline">Dashboard</Link>
        <Link to="/tasks" className="hover:underline">Tasks</Link>
        <Link to="/habits" className="hover:underline">Habits</Link>
        <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded">Logout</button>
      </div>
    </nav>
  );
}
