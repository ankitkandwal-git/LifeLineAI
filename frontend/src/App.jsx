import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import ChatPage from './pages/chat';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Add other routes here as needed, e.g., <Route path="/features" element={<FeaturesPage />} /> */}
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
    </Router>
  );
};

export default App;