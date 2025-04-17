import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import Habits from './pages/Habits';
import LandingPage from './pages/LandingPage';




// function App() {
//   const [isAuth, setIsAuth] = useState(false);

//   // Set the authentication state based on the token
//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     setIsAuth(!!token); // Set the auth state based on token presence
//   }, []);

  // const isAuth = localStorage.getItem('token');


  function App() {
    const [isAuth, setIsAuth] = useState(null);  // Set initial state to null to check for token
  
    useEffect(() => {
      const token = localStorage.getItem('token');
      setIsAuth(token ? true : false);  // Set auth state based on token presence
    }, []);  // This runs only once when the app first mounts
  
    // If `isAuth` is still null, we are in the process of determining if the user is authenticated.
    if (isAuth === null) {
      return <div>Loading...</div>;  // Optional: Add a loading state while checking auth
    }

  return (
    <Router>
      <Routes>
        
        
        {/* Protected routes */}
        <Route path="/dashboard" element={isAuth ? <Dashboard /> : <Navigate to="/" />} />
        <Route path="/tasks" element={isAuth ? <Tasks /> : <Navigate to="/" />} />
        <Route path="/habits" element={isAuth ? <Habits /> : <Navigate to="/" />} />
        
        
        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
