import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import ChatPage from './pages/chat';
import ProtectedRoute from './components/ProtectedRoute';
import ErrorBoundary from './components/ErrorBoundary'; // Import ErrorBoundary

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Set Home as the default route */}
        <Route path="/chat" element={<ErrorBoundary><ChatPage /></ErrorBoundary>} /> {/* Wrap ChatPage with ErrorBoundary */}
        <Route path="/hero" element={<Home />} /> {/* Render the Home component which includes Navbar, HeroSection, and Footer */}
      </Routes>
    </Router>
  );
};

export default App;