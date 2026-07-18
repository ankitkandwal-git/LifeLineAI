import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MessageSquare, LogOut } from 'lucide-react'; // Importing icons for better UX

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the stored token
    navigate('/login'); // Navigate to the login page
  };

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-blue-700 to-blue-500 p-4 text-white shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/hero" className="text-3xl font-extrabold tracking-tight hover:text-blue-100 transition-colors duration-200">
          LifeLine AI
        </Link>
        <div className="flex items-center space-x-6">
          <Link 
            to="/hero" 
            className="flex items-center gap-2 text-lg font-medium hover:text-blue-100 transition-colors duration-200"
          >
            Home
          </Link>
          <Link 
            to="/chat" 
            className="flex items-center gap-2 text-lg font-medium hover:text-blue-100 transition-colors duration-200"
          >
            <MessageSquare size={20} />
            Chat
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 active:scale-95"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
