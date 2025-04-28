import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const Button = ({ children, className = "", ...props }) => (
  <button
    {...props}
    className={`bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl transition ${className}`}
  >
    {children}
  </button>
);

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-100">
      {/* Navbar */}
      <nav className="w-full flex items-center justify-between p-6 shadow-sm bg-white">
        <h1 className="text-2xl font-bold text-gray-800">LifeOps</h1>
        <div className="space-x-4">
          <Link to="/login">
            <Button variant="ghost">Login</Button>
          </Link>
          <Link to="/register">
            <Button>Get Started</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex flex-col lg:flex-row items-center justify-between px-10 py-20 gap-16">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8 }}
          style={{
            background: "linear-gradient(135deg, #d1f7e2 0%, #c9e2f7 100%)", // Light green to soft blue
          }}
          whileInView={{
            background: "linear-gradient(135deg, #c9e2f7 0%, #a7f3d0 100%)", // Soft blue to minty green
          }}
          className="flex-1 space-y-6 p-8 rounded-xl shadow-lg"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Organize your life, <br /> the smart way ✨
          </h2>
          <p className="text-lg text-gray-600 max-w-xl">
            LifeOps helps you manage tasks, track habits, automate routines, and
            stay on top of your goals — all in one clean, powerful app.
          </p>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-center gap-2">
              <CheckCircle className="text-green-500 w-5 h-5" /> Task & Habit
              Tracking
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="text-green-500 w-5 h-5" /> Email +
              Calendar Integration
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="text-green-500 w-5 h-5" /> Daily & Weekly
              Reviews
            </li>
          </ul>
          <div className="inline-flex">
            <motion.div whileHover={{ scale: 1.05 }} className="origin-center">
              <Link to="/register">
                <Button className="text-lg px-6 py-3">
                  Start Your Journey
                </Button>
              </Link>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 flex justify-center"
        >
          <img
            src="https://images.unsplash.com/photo-1676276375900-dd41f828c985?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="LifeOps Illustration"
            className="w-full max-w-md rounded-xl shadow-lg"
          />
        </motion.div>
      </main>
    </div>
  );
}
