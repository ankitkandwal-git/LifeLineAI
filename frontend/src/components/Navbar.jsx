import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare } from 'lucide-react'; // Importing icons for better UX

const Navbar = () => {
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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
